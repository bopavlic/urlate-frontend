import { ogCard, ogSize } from "@/src/site/og";

export const alt = "Ur Late: who’s been waiting on who?";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ title: "Who’s been waiting on who?" });
}
