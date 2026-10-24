import { describe, expect, it } from "vitest";
import { CARD_COLORS, STYLES, cardLook, lookVars } from "./look";

describe("card looks", () => {
  it("has the classic look: a red ticket on paper", () => {
    expect(cardLook({ style: "CHALK", cardColor: "RED" })).toEqual({
      background: "#EEF0F4",
      text: "#16182B",
      muted: "#5C6070",
      line: "#DDE0E8",
      card: "#E8432A",
      onCard: "#FFFFFF",
    });
  });

  it("covers every background and card colour the API can send", () => {
    expect(Object.keys(STYLES).sort()).toEqual(["CHALK", "DAYLIGHT", "PITCH"]);
    expect(Object.keys(CARD_COLORS).sort()).toEqual([
      "BLUE",
      "ORANGE",
      "PINK",
      "RED",
      "WHITE",
      "YELLOW",
    ]);
  });

  it("feeds the page’s and the ticket’s colour variables", () => {
    expect(lookVars({ style: "PITCH", cardColor: "RED" })).toEqual({
      "--card-bg": "#111318",
      "--card-text": "#F1F2F5",
      "--card-muted": "#9A9EAD",
      "--card-line": "#2A2E39",
      "--ticket-paper": "#FFFFFF",
      "--ticket-ink": "#16182B",
      "--ticket-muted": "#5C6070",
      "--ticket-line": "#DDE0E8",
      "--ticket-band": "#E8432A",
      "--ticket-on-band": "#FFFFFF",
      "--ticket-page": "#111318",
    });
  });
});
