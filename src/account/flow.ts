import { isAxiosError } from "axios";
import { deletionErrorMessage, parseCode, parseEmail } from "./deletion";

// /delete-account in two steps: email → emailed code → deleted. Pure so it can be tested;
// the server action supplies the API calls.

export type DeletionState =
  | { step: "email"; error?: string }
  | { step: "code"; email: string; error?: string }
  | { step: "done"; error?: undefined };

export interface DeletionApi {
  request: (email: string) => Promise<unknown>;
  confirm: (email: string, code: string) => Promise<unknown>;
}

function errorCode(error: unknown): string | undefined {
  if (!isAxiosError(error)) return undefined;
  const code = (error.response?.data as { error?: { code?: unknown } } | undefined)?.error
    ?.code;
  return typeof code === "string" ? code : undefined;
}

export async function deletionStep(
  api: DeletionApi,
  state: DeletionState,
  form: FormData,
): Promise<DeletionState> {
  if (form.get("intent") === "restart") return { step: "email" };

  if (state.step === "email") {
    const email = parseEmail(form.get("email"));
    if (!email) return { step: "email", error: "Enter the email you signed in with." };
    try {
      await api.request(email);
      return { step: "code", email };
    } catch (error) {
      return { step: "email", error: deletionErrorMessage(errorCode(error)) };
    }
  }

  if (state.step === "code") {
    const code = parseCode(form.get("code"));
    if (!code) {
      return { step: "code", email: state.email, error: "Enter the 6-digit code from the email." };
    }
    try {
      await api.confirm(state.email, code);
      return { step: "done" };
    } catch (error) {
      return { step: "code", email: state.email, error: deletionErrorMessage(errorCode(error)) };
    }
  }

  return state;
}
