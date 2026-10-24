import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import {
  cardScore,
  shareDescription,
  sharedOn,
  type ShareCard,
} from "@/src/share/copy";
import { loadShareCard } from "@/src/share/load";
import { lookVars } from "@/src/share/look";
import type { ShareProblem } from "@/src/share/problem";
import { PitchMarkings } from "@/src/site/PitchMarkings";
import { StoreLinks } from "@/src/site/StoreLinks";
import { YellowCard } from "@/src/site/YellowCard";

// Share-card landing: the score someone posted, as it was when they shared it, and a way
// to start keeping your own. Rendered per request and kept out of search.

export async function generateMetadata(
  props: PageProps<"/s/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const result = await loadShareCard(id);
  const title =
    "card" in result ? result.card.headline : "Who’s been waiting on who?";
  const description =
    "card" in result
      ? shareDescription(result.card)
      : "Ur Late keeps score of who kept whom waiting. In minutes.";
  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, siteName: "Ur Late" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function SharePage(props: PageProps<"/s/[id]">) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense
        fallback={
          <Hero>
            <CardSkeleton />
          </Hero>
        }
      >
        <CardContent params={props.params} />
      </Suspense>

      <section className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-10">
        <h2 className="font-display text-4xl font-black uppercase leading-none">
          Keep your own score
        </h2>
        <p className="text-lg text-muted">
          Ur Late keeps a running tally of who kept whom waiting, in minutes.
          For friends, siblings, couples and carpools. Free.
        </p>
        <Suspense>
          <StoreLinks />
        </Suspense>
        <Link href="/how-it-works" className="w-fit font-semibold underline">
          How it works
        </Link>
      </section>
    </main>
  );
}

async function CardContent({
  params,
}: {
  params: PageProps<"/s/[id]">["params"];
}) {
  const { id } = await params;
  const result = await loadShareCard(id);
  if ("problem" in result) {
    return (
      <Hero>
        <Problem problem={result.problem} />
      </Hero>
    );
  }
  return (
    <Hero style={lookVars(result.card)}>
      <Card card={result.card} />
    </Hero>
  );
}

/** The card's own background (the night pitch unless the sharer picked another look). */
function Hero({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      style={style}
      className="relative overflow-hidden bg-pitch text-chalk"
    >
      <PitchMarkings />
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-10 px-4 pb-14 pt-8">
        <Link href="/" className="flex w-fit items-center gap-2">
          <span
            aria-hidden
            className="h-7 w-5 rotate-6 rounded-[3px] bg-accent shadow-sm"
          />
          <span className="font-display text-2xl font-black uppercase tracking-wide">
            Ur Late
          </span>
        </Link>
        {children}
      </div>
    </section>
  );
}

function Card({ card }: { card: ShareCard }) {
  const score = cardScore(card);
  return (
    <article className="flex flex-col gap-8">
      <h1 className="font-display text-6xl font-black uppercase leading-[0.9]">
        {card.headline}
      </h1>
      {score && <YellowCard label={score.label} minutes={score.minutes} show />}
      {card.kind === "GROUP" && card.rows.length > 1 && (
        <ol className="flex flex-col divide-y divide-pitch-line border-y border-pitch-line">
          {card.rows.map((row, index) => (
            <li
              key={`${row.name}-${index}`}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <span className="text-lg">
                <span className="mr-3 font-display text-xl font-black text-chalk/50 tabular-nums">
                  {index + 1}
                </span>
                {row.name}
              </span>
              <span className="font-display text-3xl font-black tabular-nums">
                {row.minutes} min
              </span>
            </li>
          ))}
        </ol>
      )}
      <p className="text-chalk/70">
        Shared by {card.sharedByName} on {sharedOn(card)}. The score may have
        moved since.
      </p>
    </article>
  );
}

const PROBLEMS: Record<ShareProblem, { headline: string; detail: string }> = {
  "not-found": {
    headline: "This card has left the pitch.",
    detail: "The link may be mistyped, or the card was removed.",
  },
  unavailable: {
    headline: "We’re running a little late.",
    detail: "We couldn’t load this card just now. Try again in a minute.",
  },
};

function Problem({ problem }: { problem: ShareProblem }) {
  const { headline, detail } = PROBLEMS[problem];
  return (
    <section className="flex flex-col gap-4">
      <h1 className="font-display text-5xl font-black uppercase leading-[0.95]">
        {headline}
      </h1>
      <p className="text-lg text-chalk/70">{detail}</p>
    </section>
  );
}

function CardSkeleton() {
  return (
    <section aria-busy className="flex flex-col gap-6">
      <span className="h-36 w-full animate-pulse rounded-lg bg-chalk/10" />
      <span className="h-56 w-60 animate-pulse rounded-3xl bg-chalk/10" />
    </section>
  );
}
