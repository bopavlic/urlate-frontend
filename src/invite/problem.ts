import { isAxiosError } from "axios";

export type InviteProblem = "not-found" | "expired" | "used" | "unavailable";

/** What the invite page shows when the API can't give a preview. */
export function inviteProblem(error: unknown): InviteProblem {
  if (!isAxiosError(error) || !error.response) return "unavailable";
  const body = error.response.data as
    { error?: { code?: unknown } } | undefined;
  const code = body?.error?.code;
  if (error.response.status === 404) return "not-found";
  if (error.response.status === 410)
    return code === "INVITE_USED" ? "used" : "expired";
  return "unavailable";
}
