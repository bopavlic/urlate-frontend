import Link from "next/link";

/** A tiny tilted ticket, the mark from the app icon. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-[18px] w-[26px] -rotate-[8deg] overflow-hidden rounded-[4px] bg-surface shadow-sm ${className}`}
    >
      <span className="block h-[6px] bg-accent" />
    </span>
  );
}

/** The wordmark with its ticket, linking home. */
export function Logo() {
  return (
    <Link href="/" className="flex w-fit items-center gap-2.5" aria-label="Ur Late home">
      <LogoMark />
      <span className="font-display text-xl">Ur Late</span>
    </Link>
  );
}
