import Link from "next/link";
import { Suspense } from "react";
import { exampleEntries, exampleTotals } from "@/src/content/worked-example";
import {
  jsonLdHtml,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/src/seo/structured-data";
import { PitchMarkings } from "@/src/site/PitchMarkings";
import { StoreLinks, StoreLinksFallback } from "@/src/site/StoreLinks";
import { siteUrl } from "@/src/site/url";
import { YellowCard } from "@/src/site/YellowCard";

export const metadata = { alternates: { canonical: "/" } };

const totals = exampleTotals(exampleEntries);

const FEATURES = [
  {
    title: "Log it before they arrive",
    body: "Pick the person, tap the minutes, save. It takes less than five seconds, so you can do it while you’re still waiting.",
  },
  {
    title: "They see the score too",
    body: "Start a tally with someone who isn’t on the app yet. Send them the link, and the whole history becomes theirs as well.",
  },
  {
    title: "Forgive, or wipe the slate",
    body: "Only the person who waited can let minutes go. Nothing ever resets on its own.",
  },
  {
    title: "Groups get a leaderboard",
    body: "Football, the carpool, Friday lunch. See who keeps everyone waiting, ranked.",
  },
];

const SHARE_CARDS = [
  { line: "My brother owes me", minutes: 18, tilt: "-rotate-6", tone: "accent" },
  { line: "Ana has kept me waiting", minutes: 42, tilt: "rotate-2", tone: "ink" },
  { line: "Ivo tops the late table at football", minutes: 63, tilt: "-rotate-1", tone: "accent" },
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

      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-8 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-[clamp(3.75rem,11vw,7.5rem)] font-black uppercase leading-[0.86]">
            Who’s been waiting on who?
          </h1>
          <p className="max-w-[34ch] text-xl leading-relaxed text-muted">
            Ur Late keeps a running score, in minutes, of who kept whom waiting.
            Like splitting a bill, except the currency is time.
          </p>
          <Suspense fallback={<StoreLinksFallback />}>
            <StoreLinks />
          </Suspense>
        </div>
        <div className="flex justify-center md:justify-end">
          <YellowCard label="Your brother owes you" minutes={totals.owed} show />
        </div>
      </section>

      <section
        aria-labelledby="score-heading"
        className="relative overflow-hidden bg-pitch text-chalk"
      >
        <PitchMarkings />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 py-20 sm:px-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2
              id="score-heading"
              className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl"
            >
              He was late 20 minutes. You were late 2.
            </h2>
            <p className="max-w-[40ch] text-lg leading-relaxed text-chalk/75">
              Every time someone’s late, it goes on the tally in whole minutes.
              The score nets out, so there’s only ever one number: who owes whom,
              and how much.
            </p>
            <p
              aria-label={`${totals.brother} minus ${totals.you} equals ${totals.owed} minutes`}
              className="font-display text-7xl font-black tabular-nums sm:text-8xl"
            >
              {totals.brother} − {totals.you} ={" "}
              <span className="text-accent">{totals.owed}</span>
            </p>
            <Link
              href="/how-it-works"
              className="w-fit font-semibold text-accent underline underline-offset-4"
            >
              How the score works
            </Link>
          </div>

          <table className="w-full self-start text-left">
            <caption className="pb-3 text-left text-chalk/75">
              Three weeks of football drop-offs
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
                <tr key={entry.day} className="border-t border-pitch-line">
                  <td className="py-3 pr-3 text-chalk/75">{entry.day}</td>
                  <td className="py-3 pr-3 font-semibold">
                    {entry.late === "brother" ? "Your brother" : "You"}
                  </td>
                  <td className="w-12 py-3 text-right font-display text-3xl font-black tabular-nums">
                    {entry.minutes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-label="What you can do"
        className="mx-auto grid w-full max-w-6xl gap-x-16 gap-y-12 px-4 py-20 sm:grid-cols-2 sm:px-8"
      >
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex max-w-md flex-col gap-3">
            <h2 className="font-display text-4xl font-black uppercase leading-none">
              {feature.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted">{feature.body}</p>
          </div>
        ))}
      </section>

      <section
        aria-labelledby="share-heading"
        className="bg-surface"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-8">
          <div className="flex max-w-xl flex-col gap-4">
            <h2
              id="share-heading"
              className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl"
            >
              Made for the group chat
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              Share the score as a card for Instagram Stories or WhatsApp. It’s
              a running joke, so let everyone in on it.
            </p>
          </div>
          <ul className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-0">
            {SHARE_CARDS.map((card) => (
              <li
                key={card.line}
                className={`flex aspect-[9/14] w-64 flex-col justify-between rounded-3xl p-6 shadow-[0_24px_48px_-20px_rgb(11_31_22/0.5)] md:-mx-3 ${card.tilt} ${
                  card.tone === "accent"
                    ? "bg-accent text-on-accent"
                    : "bg-pitch text-chalk"
                }`}
              >
                <span className="font-display text-xl font-black uppercase">
                  Ur Late
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-xl font-semibold leading-snug">
                    {card.line}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-8xl font-black leading-[0.85] tabular-nums">
                      {card.minutes}
                    </span>
                    <span className="font-display text-3xl font-extrabold uppercase">
                      min
                    </span>
                  </span>
                </span>
                <span className="text-sm opacity-70">urlate.app</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-24 sm:px-8">
        <h2 className="max-w-3xl font-display text-6xl font-black uppercase leading-[0.88] sm:text-7xl">
          No one’s late yet. Give it time.
        </h2>
        <Suspense fallback={<StoreLinksFallback />}>
          <StoreLinks />
        </Suspense>
      </section>
    </>
  );
}
