import { ImageResponse } from "next/og";
import { initials } from "@/src/invite/code";
import { inviteCopy } from "@/src/invite/copy";
import { loadInvite } from "@/src/invite/load";
import { OG_CLASSIC, OgTicket, OgWordmark, ogFonts } from "@/src/site/og";

// The card messengers show for an invite link: who invited you and the balance.

export const alt = "An invite to Ur Late";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
  const owed = preview?.balance?.direction !== "YOU_OWE_THEM";
  const look = OG_CLASSIC;

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
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {preview && (
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
              }}
            >
              {initials(preview.inviterName)}
            </div>
          )}
          <div style={{ display: "flex", fontSize: 60, lineHeight: 1.05, letterSpacing: -1 }}>
            {headline}
          </div>
        </div>
      </div>
      {preview && minutes > 0 && (
        <OgTicket
          minutes={minutes}
          offender={(owed ? preview.inviterName : "You").toUpperCase()}
          waiter={(owed ? "You" : preview.inviterName).toUpperCase()}
          look={look}
          width={400}
        />
      )}
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
