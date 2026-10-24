import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";
import { cardScore, normalizeShareCardId, shareDescription, sharedOn, type ShareCard } from "./copy";
import { shareProblem } from "./problem";

const pair: ShareCard = {
  id: "0199f0f0-1234-7000-8000-00000000abcd",
  url: "https://urlate.app/s/0199f0f0-1234-7000-8000-00000000abcd",
  kind: "PAIR",
  headline: "My brother owes me 18 minutes.",
  sharedByName: "Borna",
  otherName: "My brother",
  groupName: null,
  balance: { direction: "THEY_OWE_YOU", minutes: 18 },
  rows: [],
  createdAt: "2026-10-24T09:30:00.000Z",
};

const group: ShareCard = {
  ...pair,
  kind: "GROUP",
  headline: "Ana owes Football 20 minutes.",
  otherName: null,
  groupName: "Football",
  balance: null,
  rows: [
    { name: "Ana", minutes: 20 },
    { name: "Ivo", minutes: 5 },
  ],
};

describe("normalizeShareCardId", () => {
  it("accepts a card id in any case", () => {
    expect(normalizeShareCardId(pair.id.toUpperCase())).toBe(pair.id);
  });

  it("rejects anything else, so it never reaches the API path", () => {
    expect(normalizeShareCardId("../ledgers")).toBeNull();
    expect(normalizeShareCardId("0199f0f0-1234")).toBeNull();
    expect(normalizeShareCardId("")).toBeNull();
  });
});

describe("cardScore", () => {
  it("puts the pair's minutes on the tab of whoever owes them", () => {
    expect(cardScore(pair)).toEqual({ label: "My brother’s tab", minutes: 18 });
    expect(
      cardScore({ ...pair, balance: { direction: "YOU_OWE_THEM", minutes: 7 } }),
    ).toEqual({ label: "Borna’s tab", minutes: 7 });
  });

  it("puts a group's worst offender on the card", () => {
    expect(cardScore(group)).toEqual({ label: "Ana’s tab", minutes: 20 });
  });

  it("has no card when everyone is square", () => {
    expect(
      cardScore({ ...pair, balance: { direction: "ALL_SQUARE", minutes: 0 } }),
    ).toBeNull();
    expect(cardScore({ ...group, rows: [] })).toBeNull();
  });
});

describe("shareDescription", () => {
  it("says who shared it and what Ur Late is", () => {
    expect(shareDescription(pair)).toBe(
      "Borna keeps score on Ur Late: who kept whom waiting, in minutes.",
    );
  });
});

describe("sharedOn", () => {
  it("dates the score, since it can change after sharing", () => {
    expect(sharedOn(pair)).toBe("24 October 2026");
  });
});

function axiosError(status?: number): AxiosError {
  const response =
    status === undefined
      ? undefined
      : {
          status,
          statusText: "",
          headers: {},
          config: { headers: new AxiosHeaders() },
          data: {},
        };
  return new AxiosError("failed", "ERR", undefined, undefined, response);
}

describe("shareProblem", () => {
  it("tells a missing card from the API being down", () => {
    expect(shareProblem(axiosError(404))).toBe("not-found");
    expect(shareProblem(axiosError(500))).toBe("unavailable");
    expect(shareProblem(axiosError())).toBe("unavailable");
    expect(shareProblem(new Error("boom"))).toBe("unavailable");
  });
});
