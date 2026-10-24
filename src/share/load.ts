import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { getShareCard } from "../api/generated/endpoints/share-cards/share-cards";
import { visitorIp } from "../invite/visitor";
import { normalizeShareCardId, type ShareCard } from "./copy";
import { shareProblem, type ShareProblem } from "./problem";

export type ShareCardResult = { card: ShareCard } | { problem: ShareProblem };

/**
 * One API call per request, shared by the page and its metadata (see loadInvite).
 * The visitor's IP is forwarded so the API's per-IP limit counts them, not this server.
 */
export const loadShareCard = cache(
  async (rawId: string): Promise<ShareCardResult> => {
    const id = normalizeShareCardId(rawId);
    if (!id) return { problem: "not-found" };
    const ip = visitorIp(await headers());
    try {
      const card = await getShareCard(id, {
        headers: ip ? { "X-Forwarded-For": ip } : undefined,
      });
      return { card };
    } catch (error) {
      return { problem: shareProblem(error) };
    }
  },
);
