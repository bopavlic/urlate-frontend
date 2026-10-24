import { cardScore } from "@/src/share/copy";
import { cardLook } from "@/src/share/look";
import { loadShareCard } from "@/src/share/load";
import { ogCard, ogSize } from "@/src/site/og";

// The preview messengers show for a share link: the headline and the minutes on the card.

export const alt = "A score shared from Ur Late";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const result = await loadShareCard(id);
  if (!("card" in result)) return ogCard({ title: "Who’s been waiting on who?" });
  return ogCard({
    title: result.card.headline,
    minutes: cardScore(result.card)?.minutes ?? null,
    look: cardLook(result.card),
  });
}
