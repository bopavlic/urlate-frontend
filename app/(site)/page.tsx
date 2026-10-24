import Link from "next/link";
import { Suspense, type CSSProperties } from "react";
import { exampleEntries, exampleTotals } from "@/src/content/worked-example";
import {
  jsonLdHtml,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/src/seo/structured-data";
import { lookVars } from "@/src/share/look";
import { StoreLinks, StoreLinksFallback } from "@/src/site/StoreLinks";
import { Ticket } from "@/src/site/Ticket";
import { siteUrl } from "@/src/site/url";

export const metadata = { alternates: { canonical: "/" } };

const totals = exampleTotals(exampleEntries);

const FEATURES = [
  {
    title: "Log it before they arrive",
    body: "Pick the person, tap the minutes, save. It takes less than five seconds, so you can do it while you’re still waiting.",
  },
  {
    title: "They see it too",
    body: "Add someone who isn’t on the app yet. Send them the link, and the whole history becomes theirs as well.",
  },
  {
    title: "Forgive, or wipe the slate",
    body: "Only the person who waited can let minutes go. Nothing ever resets on its own.",
  },
  {
    title: "Groups get a leaderboard",
    body: "The carpool, Friday lunch, the book club. See who keeps everyone waiting, ranked.",
  },
];

// Three of the share-card looks, as people post them.
const SHARE_CARDS = [
  {
    headline: "My brother owes me 18 minutes.",
    offender: "MY BROTHER",
    waiter: "ME",
    minutes: 18,
    look: { style: "CHALK", cardColor: "RED" },
  },
  {
    headline: "Mom has kept me waiting 42 minutes.",
    offender: "MOM",
    waiter: "ME",
    minutes: 42,
    look: { style: "PITCH", cardColor: "PINK" },
  },
  {
    headline: "John keeps Friday lunch waiting the most.",
    offender: "JOHN",
    waiter: "FRIDAY LUNCH",
    minutes: 63,
    look: { style: "DAYLIGHT", cardColor: "BLUE" },
  },
] as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml([
            organizationJsonLd(siteUrl),
            softwareApplicationJsonLd({ siteUrl }),
          ]),
        }}
      />

      <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-20 pt-10 sm:px-8 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div className="flex flex-col gap-7">
          <h1 className="text-balance font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-[-0.02em]">
            Who’s been waiting on who?
          </h1>
          <p className="max-w-[36ch] text-xl leading-relaxed text-muted">
            Being late gets you a ticket. Ur Late keeps track, in minutes, of who
            kept whom waiting.
          </p>
          <Suspense fallback={<StoreLinksFallback />}>
            <StoreLinks />
          </Suspense>
        </div>
        <div className="flex flex-col items-center gap-6 md:items-end">
          <Ticket
            minutes={totals.owed}
            offender="YOUR BROTHER"
            waiter="YOU"
            land
            className="w-full max-w-[24rem]"
          />
          <p className="w-full max-w-[24rem] text-center">
            <span className="block text-balance font-display text-2xl">
              Your brother owes you {totals.owed} min
            </span>
            <span className="text-muted">Not that you’re counting.</span>
          </p>
        </div>
      </section>

      <section aria-labelledby="minutes-heading" className="bg-surface">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 py-20 sm:px-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2
              id="minutes-heading"
              className="text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl"
            >
              He was late 20 minutes. You were late 2.
            </h2>
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted">
              Every time someone’s late, it gets logged in whole minutes. The
              minutes net out, so there’s only ever one number: who owes whom,
              and how much.
            </p>
            <p
              aria-label={`${totals.brother} minus ${totals.you} equals ${totals.owed} minutes`}
              className="font-display text-6xl tracking-[-0.03em] tabular-nums sm:text-7xl"
            >
              {totals.brother} − {totals.you} ={" "}
              <span className="text-accent">{totals.owed}</span>
            </p>
            <Link
              href="/how-it-works"
              className="w-fit font-semibold text-accent underline underline-offset-4"
            >
              How it works
            </Link>
          </div>

          <table className="w-full self-start text-left">
            <caption className="pb-3 text-left text-muted">
              Three weeks of lifts with your brother
            </caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Who was late</th>
                <th scope="col">Minutes</th>
              </tr>
            </thead>
            <tbody>
              {exampleEntries.map((entry) => (
                <tr key={entry.day} className="border-t border-line">
                  <td className="py-3 pr-3 text-muted">{entry.day}</td>
                  <td className="py-3 pr-3 font-semibold">
                    {entry.late === "brother" ? "Your brother" : "You"}
                  </td>
                  <td className="w-16 py-3 text-right">
                    <span
                      className={`inline-block min-w-10 rounded-md px-2 py-1 text-center font-mono text-sm font-bold ${
                        entry.late === "brother"
                          ? "bg-accent text-on-accent"
                          : "bg-ink text-paper"
                      }`}
                    >
                      {entry.late === "brother" ? "+" : "−"}
                      {entry.minutes}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-label="What you can do"
        className="mx-auto grid w-full max-w-6xl gap-x-16 gap-y-12 px-4 py-24 sm:grid-cols-2 sm:px-8"
      >
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex max-w-md flex-col gap-3">
            <h2 className="font-display text-2xl leading-tight">{feature.title}</h2>
            <p className="text-lg leading-relaxed text-muted">{feature.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="share-heading" className="bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-8">
          <div className="flex max-w-xl flex-col gap-4">
            <h2
              id="share-heading"
              className="text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl"
            >
              Made for the group chat
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              Share who owes whom as a card for Instagram Stories or WhatsApp.
              It’s a running joke, so let everyone in on it.
            </p>
          </div>
          <ul className="grid grid-cols-[minmax(0,18rem)] justify-center gap-6 md:grid-cols-3">
            {SHARE_CARDS.map((card) => (
              <li
                key={card.headline}
                style={lookVars(card.look) as CSSProperties}
                className="flex aspect-[9/16] flex-col justify-between rounded-[2rem] bg-card-bg p-6 text-card-text"
              >
                <span className="flex items-center gap-2 font-display text-lg">
                  <span
                    aria-hidden
                    className="h-3.5 w-5 -rotate-[8deg] rounded-[3px]"
                    style={{ background: "var(--ticket-band)" }}
                  />
                  Ur Late
                </span>
                <span className="font-display text-2xl leading-tight">{card.headline}</span>
                <Ticket
                  size="sm"
                  minutes={card.minutes}
                  offender={card.offender}
                  waiter={card.waiter}
                  tilt={-3}
                />
                <span className="text-sm text-card-muted">urlate.app</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-24 sm:px-8">
        <h2 className="max-w-3xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] sm:text-6xl">
          No one’s late yet. Give it time.
        </h2>
        <Suspense fallback={<StoreLinksFallback />}>
          <StoreLinks />
        </Suspense>
      </section>
    </>
  );
}
