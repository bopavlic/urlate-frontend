import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import {
  cardTicket,
  shareDescription,
  sharedOn,
  type ShareCard,
} from "@/src/share/copy";
import { loadShareCard } from "@/src/share/load";
import { lookVars } from "@/src/share/look";
import type { ShareProblem } from "@/src/share/problem";
import { StoreLinks } from "@/src/site/StoreLinks";
import { Ticket } from "@/src/site/Ticket";

// Share-card landing: the ticket someone posted, as it was when they shared it, and a way
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
      : "Ur Late keeps track of who kept whom waiting. In minutes.";
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
        <h2 className="text-balance font-display text-4xl leading-[1.02] tracking-[-0.02em]">
          Hand out your own tickets
        </h2>
        <p className="text-lg text-muted">
          Ur Late keeps track of who kept whom waiting, in minutes.
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

/** The card's own background (Night unless the sharer picked another look). */
function Hero({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section style={style} className="bg-card-bg text-card-text">
      <div className="mx-auto flex w-full max-w-md flex-col gap-10 px-4 pb-14 pt-8">
        <Link href="/" className="flex w-fit items-center gap-2">
          <span
            aria-hidden
            className="h-[18px] w-[26px] -rotate-[8deg] rounded-[4px]"
            style={{ background: "var(--ticket-band)" }}
          />
          <span className="font-display text-xl">Ur Late</span>
        </Link>
        {children}
      </div>
    </section>
  );
}

function Card({ card }: { card: ShareCard }) {
  const ticket = cardTicket(card);
  return (
    <article className="flex flex-col gap-8">
      <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em]">
        {card.headline}
      </h1>
      <Ticket
        tone={ticket ? "owed" : "clear"}
        minutes={ticket?.minutes ?? 0}
        offender={(ticket?.offender ?? "Nobody").toUpperCase()}
        waiter={(ticket?.waiter ?? "Nobody").toUpperCase()}
        land
      />
      {card.kind === "GROUP" && card.rows.length > 1 && (
        <ol className="flex flex-col divide-y divide-card-line border-y border-card-line">
          {card.rows.map((row, index) => (
            <li
              key={`${row.name}-${index}`}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <span className="text-lg">
                <span className="mr-3 font-display text-lg text-card-muted tabular-nums">
                  {index + 1}
                </span>
                {row.name}
              </span>
              <span className="font-display text-2xl tracking-tight tabular-nums">
                {row.minutes} min
              </span>
            </li>
          ))}
        </ol>
      )}
      <p className="text-card-muted">
        Shared by {card.sharedByName} on {sharedOn(card)}. The minutes may have
        moved since.
      </p>
    </article>
  );
}

const PROBLEMS: Record<ShareProblem, { headline: string; detail: string }> = {
  "not-found": {
    headline: "This card isn’t here any more.",
    detail: "The link may be mistyped, or the card was taken down.",
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
      <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em]">
        {headline}
      </h1>
      <p className="text-lg text-card-muted">{detail}</p>
    </section>
  );
}

function CardSkeleton() {
  return (
    <section aria-busy className="flex flex-col gap-6">
      <span className="h-36 w-full animate-pulse rounded-2xl bg-card-line" />
      <span className="mx-auto aspect-square w-[min(80vw,20rem)] animate-pulse rounded-full bg-card-line" />
    </section>
  );
}
