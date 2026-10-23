import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { getInvitePreview } from "../api/generated/endpoints/invites/invites";
import { normalizeInviteCode } from "./code";
import type { InvitePreview } from "./copy";
import { inviteProblem, type InviteProblem } from "./problem";
import { visitorIp } from "./visitor";

export type InviteResult =
  { preview: InvitePreview } | { problem: InviteProblem };

/**
 * One API call per request, shared by the page, its metadata and its OG image.
 * The visitor's IP is forwarded so the API's per-IP limit counts them, not this server.
 */
export const loadInvite = cache(
  async (rawCode: string): Promise<InviteResult> => {
    const code = normalizeInviteCode(rawCode);
    if (!code) return { problem: "not-found" };
    const ip = visitorIp(await headers());
    try {
      const preview = await getInvitePreview(code, {
        headers: ip ? { "X-Forwarded-For": ip } : undefined,
      });
      return { preview };
    } catch (error) {
      return { problem: inviteProblem(error) };
    }
  },
);
