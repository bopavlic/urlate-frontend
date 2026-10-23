import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { initials } from "@/src/invite/code";
import { inviteCopy } from "@/src/invite/copy";
import { loadInvite } from "@/src/invite/load";

// The card messengers show for an invite link: who invited you and the score.

export const alt = "An invite to Ur Late";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B1F16";
const ACCENT = "#FFCC1A";
const PAPER = "#08140F";

const display = readFile(
  join(process.cwd(), "assets/fonts/BigShoulders_900Black.ttf"),
);

export default async function Image(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;
  const result = await loadInvite(code);
  const preview = "preview" in result ? result.preview : null;
  const headline = preview
    ? inviteCopy(preview).headline
    : "Who’s been waiting on who?";
  const minutes = preview?.balance?.minutes ?? 0;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: PAPER,
        color: "#EEF3EF",
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
            background: ACCENT,
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
          style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}
        >
          {preview && (
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                background: ACCENT,
                color: INK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
              }}
            >
              {initials(preview.inviterName)}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            {headline}
          </div>
        </div>
        {minutes > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "24px 40px",
              borderRadius: 20,
              background: ACCENT,
              color: INK,
              transform: "rotate(-3deg)",
            }}
          >
            <div style={{ display: "flex", fontSize: 160, lineHeight: 1 }}>
              {minutes}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                textTransform: "uppercase",
              }}
            >
              min
            </div>
          </div>
        )}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Big Shoulders",
          data: await display,
          style: "normal",
          weight: 900,
        },
      ],
    },
  );
}
