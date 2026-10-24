import type { InvitePreview } from "../api/generated/model";

export type { InvitePreview };

// Friendly tease, always on the side of the person who waited (brief: "Brand and tone").

function minutes(n: number): string {
  return `${n} ${n === 1 ? "minute" : "minutes"}`;
}

function pairHeadline({ inviterName, balance }: InvitePreview): string {
  switch (balance?.direction) {
    case "YOU_OWE_THEM":
      return `${inviterName} says you owe them ${minutes(balance.minutes)}.`;
    case "THEY_OWE_YOU":
      return `${inviterName} owes you ${minutes(balance.minutes)}.`;
    default:
      return `You and ${inviterName} are all square.`;
  }
}

function groupStanding(balance: InvitePreview["balance"]): string {
  switch (balance?.direction) {
    case "YOU_OWE_THEM":
      return `you owe the group ${minutes(balance.minutes)}`;
    case "THEY_OWE_YOU":
      return `the group owes you ${minutes(balance.minutes)}`;
    default:
      return "you’re all square";
  }
}

export function inviteCopy(preview: InvitePreview): {
  headline: string;
  detail: string;
} {
  const { inviterName, ledgerKind, ledgerName, placeholderName, balance } =
    preview;
  if (preview.kind === "PERSON") {
    return {
      headline: `${inviterName} wants to add you on Ur Late.`,
      detail:
        "From now on, every minute either of you keeps the other waiting counts.",
    };
  }
  if (ledgerKind === "GROUP") {
    return {
      headline: `${inviterName} invited you to ${ledgerName ?? "their group"}.`,
      detail: placeholderName
        ? `You’re “${placeholderName}” there, and ${groupStanding(balance)}.`
        : "Join the group and find out who’s always late.",
    };
  }
  const headline = pairHeadline(preview);
  if (placeholderName) {
    return {
      headline,
      detail: `They’ve been calling you “${placeholderName}”. Join to see every minute.`,
    };
  }
  return {
    headline,
    detail:
      balance?.direction === "ALL_SQUARE" || !balance
        ? "Enjoy it while it lasts."
        : "Join to see every minute.",
  };
}

export function inviteTitle({
  inviterName,
}: Pick<InvitePreview, "inviterName">): string {
  return `${inviterName} invited you to Ur Late`;
}
