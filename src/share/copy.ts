import type { ShareCard } from "../api/generated/model";

export type { ShareCard };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** The card id from a /s/{id} link, or null: anything else never reaches the API's URL path. */
export function normalizeShareCardId(input: string): string | null {
  const id = input.trim().toLowerCase();
  return UUID.test(id) ? id : null;
}

/** What the ticket on the card says: who was late, who waited, and how many minutes. Null when everyone is square. */
export function cardTicket(
  card: ShareCard,
): { offender: string; waiter: string; minutes: number } | null {
  if (card.kind === "GROUP") {
    const worst = card.rows[0];
    return worst
      ? { offender: worst.name, waiter: card.groupName ?? "The group", minutes: worst.minutes }
      : null;
  }
  const other = card.otherName ?? "Them";
  switch (card.balance?.direction) {
    case "THEY_OWE_YOU":
      return { offender: other, waiter: card.sharedByName, minutes: card.balance.minutes };
    case "YOU_OWE_THEM":
      return { offender: card.sharedByName, waiter: other, minutes: card.balance.minutes };
    default:
      return null;
  }
}

export function shareDescription(card: Pick<ShareCard, "sharedByName">): string {
  return `${card.sharedByName} keeps track on Ur Late: who kept whom waiting, in minutes.`;
}

/** The day the card was shared; the minutes may have moved since. */
export function sharedOn(card: Pick<ShareCard, "createdAt">): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(card.createdAt));
}
