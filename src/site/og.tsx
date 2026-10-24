import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The link preview for marketing pages, blog posts and share cards: wordmark, a headline,
// a yellow card.

export const ogSize = { width: 1200, height: 630 };

const INK = "#0B1F16";
const ACCENT = "#FFCC1A";
const PITCH = "#08140F";

const display = readFile(
  join(process.cwd(), "assets/fonts/BigShoulders_900Black.ttf"),
);

export async function ogCard({
  title,
  minutes = 18,
  look = { background: PITCH, text: "#EEF3EF", card: ACCENT, onCard: INK },
}: {
  title: string;
  /** A share card's colours; the classic night pitch by default. */
  look?: { background: string; text: string; card: string; onCard: string };
  /** null: no card, e.g. when everyone is square. */
  minutes?: number | null;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: look.background,
        color: look.text,
        fontFamily: "Big Shoulders",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            width: 44,
            height: 60,
            borderRadius: 6,
            background: look.card,
            transform: "rotate(6deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 56,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Ur Late
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 48 }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            fontSize: 92,
            lineHeight: 0.95,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        {minutes !== null && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            padding: "24px 40px",
            borderRadius: 20,
            background: look.card,
            color: look.onCard,
            transform: "rotate(-3deg)",
          }}
        >
          <div style={{ display: "flex", fontSize: 160, lineHeight: 1 }}>
            {minutes}
          </div>
          <div
            style={{ display: "flex", fontSize: 56, textTransform: "uppercase" }}
          >
            min
          </div>
        </div>
        )}
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Big Shoulders", data: await display, style: "normal", weight: 900 },
      ],
    },
  );
}
