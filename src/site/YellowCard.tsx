// The score as the app shows it: a referee's yellow card with scoreboard digits.
// `show` plays the one entrance on the site: the card is pulled out and held up.

export function YellowCard({
  label,
  minutes,
  show = false,
  className = "",
}: {
  label: string;
  minutes: number;
  show?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`flex w-fit -rotate-3 flex-col gap-1 rounded-3xl bg-accent px-9 pb-7 pt-6 text-on-accent shadow-[0_24px_48px_-16px_rgb(11_31_22/0.45)] ${
        show ? "animate-[card-out_700ms_cubic-bezier(.2,1.4,.4,1)_200ms_both]" : ""
      } ${className}`}
    >
      <figcaption className="text-xl font-semibold">{label}</figcaption>
      <p className="flex items-baseline gap-3">
        <span className="font-display text-[clamp(8rem,26vw,15rem)] font-black leading-[0.8] tabular-nums">
          {minutes}
        </span>
        <span className="font-display text-5xl font-extrabold uppercase">min</span>
      </p>
    </figure>
  );
}
