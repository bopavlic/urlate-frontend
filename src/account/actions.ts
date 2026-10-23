"use server";

import { headers } from "next/headers";
import {
  confirmAccountDeletion,
  requestAccountDeletion,
} from "../api/generated/endpoints/account/account";
import { visitorIp } from "../invite/visitor";
import { deletionStep, type DeletionState } from "./flow";

/** One form, two steps; the API rate-limits per visitor, so their IP is forwarded. */
export async function deleteAccountAction(
  state: DeletionState,
  form: FormData,
): Promise<DeletionState> {
  const ip = visitorIp(await headers());
  const options = ip ? { headers: { "X-Forwarded-For": ip } } : undefined;
  return deletionStep(
    {
      request: (email) => requestAccountDeletion({ email }, options),
      confirm: (email, code) => confirmAccountDeletion({ email, code }, options),
    },
    state,
    form,
  );
}
