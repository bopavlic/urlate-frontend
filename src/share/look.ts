import type { CSSProperties } from "react";
import type { ShareCard } from "../api/generated/model";

// The share card's looks (premium in the app; the classic look is free). Same values as
// urlate-mobile/src/features/share/look.ts, so the page matches the image people posted.

export const STYLES = {
  PITCH: { background: "#08140F", text: "#EEF3EF", line: "rgb(238 243 239 / 0.09)" },
  DAYLIGHT: { background: "#1F7A43", text: "#FFFFFF", line: "rgb(255 255 255 / 0.18)" },
  CHALK: { background: "#F2F5F2", text: "#0B1F16", line: "rgb(11 31 22 / 0.1)" },
} satisfies Record<ShareCard["style"], { background: string; text: string; line: string }>;

export const CARD_COLORS = {
  YELLOW: { card: "#FFCC1A", onCard: "#0B1F16" },
  RED: { card: "#E5322D", onCard: "#FFFFFF" },
  ORANGE: { card: "#FF8A1F", onCard: "#0B1F16" },
  PINK: { card: "#FF7AB8", onCard: "#0B1F16" },
  BLUE: { card: "#2F7BFF", onCard: "#FFFFFF" },
  WHITE: { card: "#FFFFFF", onCard: "#0B1F16" },
} satisfies Record<ShareCard["cardColor"], { card: string; onCard: string }>;

export function cardLook(card: Pick<ShareCard, "style" | "cardColor">) {
  return { ...STYLES[card.style], ...CARD_COLORS[card.cardColor] };
}

/** Overrides the site's colour variables, so bg-pitch, text-chalk and bg-accent follow the card. */
export function lookVars(card: Pick<ShareCard, "style" | "cardColor">): CSSProperties {
  const look = cardLook(card);
  return {
    "--pitch": look.background,
    "--chalk": look.text,
    "--pitch-line": look.line,
    "--accent": look.card,
    "--on-accent": look.onCard,
  } as CSSProperties;
}
