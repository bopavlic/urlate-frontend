import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ticketNumber } from "./Ticket";

// The link preview for marketing pages, blog posts, invites and share cards: the wordmark,
// a headline and the late ticket.

export const ogSize = { width: 1200, height: 630 };

export interface OgLook {
  background: string;
  text: string;
  /** The ticket's band. */
  card: string;
  onCard: string;
}

/** The site's own look: a red ticket on paper. */
export const OG_CLASSIC: OgLook = {
  background: "#EEF0F4",
  text: "#16182B",
  card: "#E8432A",
  onCard: "#FFFFFF",
};

const TICKET_INK = "#16182B";
const TICKET_MUTED = "#5C6070";

const display = readFile(join(process.cwd(), "assets/fonts/ArchivoBlack_400Regular.ttf"));
const mono = readFile(join(process.cwd(), "assets/fonts/SpaceMono_400Regular.ttf"));
const monoBold = readFile(join(process.cwd(), "assets/fonts/SpaceMono_700Bold.ttf"));

export async function ogFonts() {
  return [
    { name: "Archivo Black", data: await display, style: "normal" as const, weight: 400 as const },
    { name: "Space Mono", data: await mono, style: "normal" as const, weight: 400 as const },
    { name: "Space Mono", data: await monoBold, style: "normal" as const, weight: 700 as const },
  ];
}

/** The wordmark: a tiny tilted ticket, then the name. */
export function OgWordmark({ look }: { look: OgLook }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div
        style={{
          display: "flex",
          width: 52,
          height: 36,
          borderRadius: 7,
          background: "#FFFFFF",
          overflow: "hidden",
          transform: "rotate(-8deg)",
        }}
      >
        <div style={{ display: "flex", width: "100%", height: 12, background: look.card }} />
      </div>
      <div style={{ display: "flex", fontSize: 40 }}>Ur Late</div>
    </div>
  );
}

const BARS = [3, 1, 4, 1, 2, 3, 1, 2, 1, 5, 2, 1, 3, 1, 2, 2, 4, 1, 2, 3, 1, 3, 1, 2, 4, 1, 2];

/** The late ticket, as in the app. */
export function OgTicket({
  minutes,
  offender,
  waiter,
  look,
  width = 440,
}: {
  minutes: number;
  offender: string;
  waiter: string;
  look: OgLook;
  width?: number;
}) {
  const field = (name: string, value: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18 }}>
      <div style={{ display: "flex", fontFamily: "Space Mono", color: TICKET_MUTED }}>{name}</div>
      <div style={{ display: "flex", fontFamily: "Space Mono", fontWeight: 700 }}>{value}</div>
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width,
        background: "#FFFFFF",
        color: TICKET_INK,
        borderRadius: 20,
        transform: "rotate(-3deg)",
        boxShadow: "0 30px 50px -24px rgba(28,23,54,0.55)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 28px",
          borderRadius: "20px 20px 0 0",
          background: look.card,
          color: look.onCard,
        }}
      >
        <div style={{ display: "flex", fontSize: 24 }}>LATE NOTICE</div>
        <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 16 }}>
          {ticketNumber(minutes)}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "20px 28px 26px", gap: 6 }}>
        {field("OFFENDER", offender)}
        {field("KEPT WAITING", waiter)}
        <div style={{ display: "flex", position: "relative", margin: "14px 0 6px" }}>
          <div style={{ display: "flex", width: "100%", borderTop: "3px dashed #DDE0E8" }} />
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: -44,
              top: -17,
              width: 32,
              height: 32,
              borderRadius: 16,
              background: look.background,
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: -44,
              top: -17,
              width: 32,
              height: 32,
              borderRadius: 16,
              background: look.background,
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 130, lineHeight: 1, letterSpacing: -5 }}>
            {minutes}
          </div>
          <div style={{ display: "flex", fontSize: 34 }}>MIN</div>
        </div>
        <div style={{ display: "flex", gap: 3, height: 40, marginTop: 10 }}>
          {BARS.map((w, i) => (
            <div
              key={i}
              style={{ display: "flex", width: w * 3.5, background: i % 2 === 0 ? TICKET_INK : "transparent" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function ogCard({
  title,
  ticket = { minutes: 18, offender: "YOUR BROTHER", waiter: "YOU" },
  look = OG_CLASSIC,
}: {
  title: string;
  /** null: no ticket, e.g. when everyone is square. */
  ticket?: { minutes: number; offender: string; waiter: string } | null;
  /** A share card's colours; the site's own by default. */
  look?: OgLook;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 56,
        padding: 72,
        background: look.background,
        color: look.text,
        fontFamily: "Archivo Black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          height: "100%",
        }}
      >
        <OgWordmark look={look} />
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, letterSpacing: -1 }}>
          {title}
        </div>
      </div>
      {ticket && <OgTicket {...ticket} look={look} />}
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
