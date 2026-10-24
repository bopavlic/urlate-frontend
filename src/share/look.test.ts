import { describe, expect, it } from "vitest";
import { CARD_COLORS, STYLES, cardLook, lookVars } from "./look";

describe("card looks", () => {
  it("has the classic look in the site’s own colours", () => {
    expect(cardLook({ style: "PITCH", cardColor: "YELLOW" })).toEqual({
      background: "#08140F",
      text: "#EEF3EF",
      line: "rgb(238 243 239 / 0.09)",
      card: "#FFCC1A",
      onCard: "#0B1F16",
    });
  });

  it("covers every background and card colour the API can send", () => {
    expect(Object.keys(STYLES)).toEqual(["PITCH", "DAYLIGHT", "CHALK"]);
    expect(Object.keys(CARD_COLORS)).toEqual([
      "YELLOW",
      "RED",
      "ORANGE",
      "PINK",
      "BLUE",
      "WHITE",
    ]);
  });

  it("feeds the page’s colour variables", () => {
    expect(lookVars({ style: "CHALK", cardColor: "RED" })).toEqual({
      "--pitch": "#F2F5F2",
      "--chalk": "#0B1F16",
      "--pitch-line": "rgb(11 31 22 / 0.1)",
      "--accent": "#E5322D",
      "--on-accent": "#FFFFFF",
    });
  });
});
