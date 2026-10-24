import { isAxiosError } from "axios";

export type ShareProblem = "not-found" | "unavailable";

/** What the share page shows when the API can't give the card. */
export function shareProblem(error: unknown): ShareProblem {
  if (isAxiosError(error) && error.response?.status === 404) return "not-found";
  return "unavailable";
}
