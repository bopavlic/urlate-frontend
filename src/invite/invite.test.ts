import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";
import { formatInviteCode, initials, normalizeInviteCode } from "./code";
import { inviteCopy, inviteTitle, type InvitePreview } from "./copy";
import { inviteProblem } from "./problem";

const pair: InvitePreview = {
  code: "AB12CD34",
  kind: "LEDGER",
  ledgerKind: "PAIR",
  ledgerName: null,
  inviterName: "Borna",
  inviterAvatarUrl: null,
  placeholderName: "Brother",
  balance: { direction: "YOU_OWE_THEM", minutes: 18 },
  expiresAt: "2026-11-06T12:00:00.000Z",
};

describe("normalizeInviteCode", () => {
  it("accepts what people type: lowercase, dashes, spaces, look-alikes", () => {
    expect(normalizeInviteCode("ab12-cd34")).toBe("AB12CD34");
    expect(normalizeInviteCode(" ab12 cd34 ")).toBe("AB12CD34");
    expect(normalizeInviteCode("oIl2CD34")).toBe("0112CD34");
  });

  it("rejects anything that can't be a code, so it never reaches the API path", () => {
    expect(normalizeInviteCode("../ledgers")).toBeNull();
    expect(normalizeInviteCode("AB12CD3")).toBeNull();
    expect(normalizeInviteCode("AB12CD3U")).toBeNull();
    expect(normalizeInviteCode("")).toBeNull();
  });
});

describe("formatInviteCode", () => {
  it("splits the code in two halves for reading aloud", () => {
    expect(formatInviteCode("AB12CD34")).toBe("AB12-CD34");
  });
});

describe("initials", () => {
  it("takes the first letters of up to two words", () => {
    expect(initials("Borna Pavlic")).toBe("BP");
    expect(initials("borna")).toBe("B");
    expect(initials("  ")).toBe("?");
  });
});

describe("inviteCopy", () => {
  it("tells you what you owe, from your side", () => {
    expect(inviteCopy(pair)).toEqual({
      headline: "Borna says you owe them 18 minutes.",
      detail: "They’ve been calling you “Brother”. Join to see every minute.",
    });
  });

  it("says when they owe you", () => {
    expect(
      inviteCopy({
        ...pair,
        balance: { direction: "THEY_OWE_YOU", minutes: 1 },
      }).headline,
    ).toBe("Borna owes you 1 minute.");
  });

  it("says all square", () => {
    expect(
      inviteCopy({
        ...pair,
        placeholderName: null,
        balance: { direction: "ALL_SQUARE", minutes: 0 },
      }),
    ).toEqual({
      headline: "You and Borna are all square.",
      detail: "Enjoy it while it lasts.",
    });
  });

  it("invites you to a group with an open invite", () => {
    expect(
      inviteCopy({
        ...pair,
        ledgerKind: "GROUP",
        ledgerName: "Friday lunch",
        placeholderName: null,
        balance: null,
      }),
    ).toEqual({
      headline: "Borna invited you to Friday lunch.",
      detail: "Join the group and find out who’s always late.",
    });
  });

  it("offers to connect from someone's profile code", () => {
    expect(
      inviteCopy({
        ...pair,
        kind: "PERSON",
        placeholderName: null,
        balance: null,
        expiresAt: null,
      }),
    ).toEqual({
      headline: "Borna wants to add you on Ur Late.",
      detail: "From now on, every minute either of you keeps the other waiting counts.",
    });
  });

  it("gives your standing in a group you were already tracked in", () => {
    expect(
      inviteCopy({
        ...pair,
        ledgerKind: "GROUP",
        ledgerName: "Friday lunch",
        placeholderName: "Ana",
        balance: { direction: "THEY_OWE_YOU", minutes: 7 },
      }),
    ).toEqual({
      headline: "Borna invited you to Friday lunch.",
      detail: "You’re “Ana” there, and the group owes you 7 minutes.",
    });
  });
});

describe("inviteTitle", () => {
  it("names the inviter", () => {
    expect(inviteTitle(pair)).toBe("Borna invited you to Ur Late");
  });
});

function apiError(status: number, code?: string) {
  return new AxiosError("failed", "ERR_BAD_REQUEST", undefined, undefined, {
    status,
    statusText: "",
    headers: {},
    config: { headers: new AxiosHeaders() },
    data: code ? { error: { code, message: "" } } : "",
  });
}

describe("inviteProblem", () => {
  it("maps the API's answers to what the page shows", () => {
    expect(inviteProblem(apiError(404, "INVITE_NOT_FOUND"))).toBe("not-found");
    expect(inviteProblem(apiError(410, "INVITE_EXPIRED"))).toBe("expired");
    expect(inviteProblem(apiError(410, "INVITE_USED"))).toBe("used");
  });

  it("treats rate limits, outages and network errors as temporarily unavailable", () => {
    expect(inviteProblem(apiError(429, "RATE_LIMITED"))).toBe("unavailable");
    expect(inviteProblem(apiError(503))).toBe("unavailable");
    expect(inviteProblem(new AxiosError("socket hang up", "ECONNRESET"))).toBe(
      "unavailable",
    );
    expect(inviteProblem(new Error("boom"))).toBe("unavailable");
  });
});
