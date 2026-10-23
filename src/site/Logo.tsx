import Link from "next/link";

/** The wordmark with its yellow card, linking home. */
export function Logo() {
  return (
    <Link href="/" className="flex w-fit items-center gap-2" aria-label="Ur Late home">
      <span
        aria-hidden
        className="h-7 w-5 rotate-6 rounded-[3px] bg-accent shadow-sm"
      />
      <span className="font-display text-2xl font-black uppercase tracking-wide">
        Ur Late
      </span>
    </Link>
  );
}
