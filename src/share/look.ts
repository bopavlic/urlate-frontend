import type { CSSProperties } from "react";
import type { ShareCard } from "../api/generated/model";

// The share card's looks: a background and the ticket's colour (premium in the app; the
// classic red ticket on paper is free). Same values as urlate-mobile/src/features/share/
// look.ts, so the page matches the image people posted. The API names (PITCH, DAYLIGHT,
// CHALK) are older than the looks: Night, Day and Paper.

export const STYLES = {
  CHALK: { background: "#EEF0F4", text: "#16182B", muted: "#5C6070", line: "#DDE0E8" },
  DAYLIGHT: { background: "#DDE9FF", text: "#111A3A", muted: "#56607F", line: "#C9D8F5" },
  PITCH: { background: "#111318", text: "#F1F2F5", muted: "#9A9EAD", line: "#2A2E39" },
} satisfies Record<
  ShareCard["style"],
  { background: string; text: string; muted: string; line: string }
>;

export const CARD_COLORS = {
  RED: { card: "#E8432A", onCard: "#FFFFFF" },
  PINK: { card: "#FF3D6E", onCard: "#FFFFFF" },
  ORANGE: { card: "#FF8A1F", onCard: "#2A1A0E" },
  YELLOW: { card: "#FFC81A", onCard: "#16182B" },
  BLUE: { card: "#2B5FEA", onCard: "#FFFFFF" },
  WHITE: { card: "#E6E8EE", onCard: "#16182B" },
} satisfies Record<ShareCard["cardColor"], { card: string; onCard: string }>;

export function cardLook(card: Pick<ShareCard, "style" | "cardColor">) {
  return { ...STYLES[card.style], ...CARD_COLORS[card.cardColor] };
}

/** Sets the page and ticket colour variables, so the /s page and its Ticket follow the card. */
export function lookVars(card: Pick<ShareCard, "style" | "cardColor">): CSSProperties {
  const look = cardLook(card);
  return {
    "--card-bg": look.background,
    "--card-text": look.text,
    "--card-muted": look.muted,
    "--card-line": look.line,
    "--ticket-paper": "#FFFFFF",
    "--ticket-ink": "#16182B",
    "--ticket-muted": "#5C6070",
    "--ticket-line": "#DDE0E8",
    "--ticket-band": look.card,
    "--ticket-on-band": look.onCard,
    "--ticket-page": look.background,
  } as CSSProperties;
}
