import type { ShareCard } from "../api/generated/model";

export type { ShareCard };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** The card id from a /s/{id} link, or null: anything else never reaches the API's URL path. */
export function normalizeShareCardId(input: string): string | null {
  const id = input.trim().toLowerCase();
  return UUID.test(id) ? id : null;
}

/** The yellow card: whoever owes the time, and how much. Null when everyone is square. */
export function cardScore(
  card: ShareCard,
): { label: string; minutes: number } | null {
  if (card.kind === "GROUP") {
    const worst = card.rows[0];
    return worst ? { label: `${worst.name}’s tab`, minutes: worst.minutes } : null;
  }
  switch (card.balance?.direction) {
    case "THEY_OWE_YOU":
      return { label: `${card.otherName}’s tab`, minutes: card.balance.minutes };
    case "YOU_OWE_THEM":
      return { label: `${card.sharedByName}’s tab`, minutes: card.balance.minutes };
    default:
      return null;
  }
}

export function shareDescription(card: Pick<ShareCard, "sharedByName">): string {
  return `${card.sharedByName} keeps score on Ur Late: who kept whom waiting, in minutes.`;
}

/** The day the score was shared; it may have moved since. */
export function sharedOn(card: Pick<ShareCard, "createdAt">): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(card.createdAt));
}
