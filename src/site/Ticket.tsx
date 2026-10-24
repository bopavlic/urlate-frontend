// Being late gets you a ticket, like a parking fine: the same ticket as the app
// (urlate-mobile/src/ui/Ticket.tsx). Colours come from the --ticket-* variables, so it follows
// the theme on marketing pages and the card's look on /s.

export type TicketTone = "owed" | "owing" | "clear";

/** The ticket number: the minutes, zero-padded like a printed serial. */
export function ticketNumber(minutes: number): string {
  return `No. ${String(Math.min(minutes, 999999)).padStart(6, "0")}`;
}

// Bars and gaps alternate, starting with a bar; each digit is a width. The same pattern as
// the app's ticket, stretched to the full width.
export const BARS = Array.from(
  "2112131121312211311212131123112113122131112131212311211312131121231121",
  Number,
);

const BAND: Record<TicketTone, { bg: string; fg: string }> = {
  owed: { bg: "var(--ticket-band)", fg: "var(--ticket-on-band)" },
  owing: { bg: "var(--ticket-ink)", fg: "var(--ticket-paper)" },
  clear: { bg: "var(--ticket-line)", fg: "var(--ticket-muted)" },
};

export function Ticket({
  tone = "owed",
  minutes,
  offender,
  waiter,
  label = tone === "clear" ? "ALL CLEAR" : "LATE NOTICE",
  prefix = "",
  tilt = tone === "clear" ? 0 : -2.5,
  land = false,
  size = "lg",
  className = "",
}: {
  tone?: TicketTone;
  minutes: number;
  offender: string;
  waiter: string;
  label?: string;
  prefix?: string;
  tilt?: number;
  /** Slide up and land on page load. */
  land?: boolean;
  /** `sm` for previews in a grid. */
  size?: "sm" | "lg";
  /** Sets the width, e.g. `w-full max-w-sm`. */
  className?: string;
}) {
  const band = BAND[tone];
  const sm = size === "sm";
  return (
    <figure
      className={`relative rounded-2xl shadow-[0_22px_40px_-20px_rgb(28_23_54/0.55)] ${className}`}
      style={{
        background: "var(--ticket-paper)",
        color: "var(--ticket-ink)",
        rotate: `${tilt}deg`,
        animation: land ? "ticket-land 800ms cubic-bezier(.2,1.3,.4,1) 150ms both" : undefined,
      }}
    >
      <div
        className={`flex items-center justify-between rounded-t-2xl ${sm ? "px-4 py-2.5" : "px-6 py-4"}`}
        style={{ background: band.bg, color: band.fg }}
      >
        <span className={`font-display tracking-wide ${sm ? "text-sm" : "text-lg"}`}>{label}</span>
        <span className={`font-mono ${sm ? "text-[10px]" : "text-xs"}`}>{ticketNumber(minutes)}</span>
      </div>
      <div className={sm ? "px-4 pb-4 pt-3" : "px-6 pb-6 pt-4"}>
        <dl className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono ${sm ? "text-[11px]" : "text-sm"}`}>
          <dt style={{ color: "var(--ticket-muted)" }}>OFFENDER</dt>
          <dd className="truncate text-right font-bold">{offender}</dd>
          <dt style={{ color: "var(--ticket-muted)" }}>KEPT WAITING</dt>
          <dd className="truncate text-right font-bold">{waiter}</dd>
        </dl>
        {/* The tear-off line. */}
        <div
          className={`border-t-2 border-dashed ${sm ? "my-3" : "my-4"}`}
          style={{ borderColor: "var(--ticket-line)" }}
        />
        <p className="flex items-baseline gap-2 font-display leading-none">
          <span
            className={`tabular-nums tracking-[-0.04em] ${sm ? "text-5xl" : "text-[clamp(4.5rem,14vw,6.5rem)]"}`}
          >
            {prefix}
            {minutes}
          </span>
          <span className={sm ? "text-base" : "text-2xl"}>MIN</span>
        </p>
        <div aria-hidden className={`flex ${sm ? "mt-3 h-6" : "mt-4 h-9"}`}>
          {BARS.map((weight, i) => (
            <span
              key={i}
              style={{
                flexGrow: weight,
                flexBasis: 0,
                background: i % 2 === 0 ? "var(--ticket-ink)" : "transparent",
              }}
            />
          ))}
        </div>
      </div>
    </figure>
  );
}
