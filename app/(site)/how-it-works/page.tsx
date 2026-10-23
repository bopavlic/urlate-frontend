import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { exampleEntries, exampleTotals } from "@/src/content/worked-example";
import { PitchMarkings } from "@/src/site/PitchMarkings";
import { StoreLinks, StoreLinksFallback } from "@/src/site/StoreLinks";
import { YellowCard } from "@/src/site/YellowCard";

export const metadata: Metadata = {
  title: "How the score works",
  description:
    "Log who was late and by how many minutes. Ur Late nets it out into one number: who owes whom. Here’s the whole system, with a worked example.",
  alternates: { canonical: "/how-it-works" },
};

const totals = exampleTotals(exampleEntries);

// The rules, in the order you meet them when you use the app.
const RULES = [
  {
    title: "Start a tally",
    body: "With one person or a group. They don’t need the app yet: type their name and start counting. When they join through your invite, the tally and its history become theirs too.",
  },
  {
    title: "Log who was late",
    body: "Pick who was late, tap the minutes, add a note like “football” if you want, save. The person who waited can log it, and so can the person who was late. Minutes are always whole minutes.",
  },
  {
    title: "It counts straight away",
    body: "The other person gets notified and has 48 hours to dispute an entry. If you’d both rather approve every entry first, switch the tally to confirm mode.",
  },
  {
    title: "Edits leave a trail",
    body: "You can change or delete your own entries, but they’re marked as edited and the old values stay in the history. Nobody can quietly rewrite the score.",
  },
  {
    title: "Forgive or reset",
    body: "Only the person who’s owed can let minutes go: forgive a few, or reset to zero. It’s logged like everything else, and the score never resets on its own.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-8 md:grid-cols-[1.2fr_1fr] md:pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-[clamp(3.25rem,9vw,6rem)] font-black uppercase leading-[0.88]">
            How the score works
          </h1>
          <p className="max-w-[46ch] text-xl leading-relaxed text-muted">
            Every time someone keeps someone else waiting, it goes on the tally in
            minutes. Ur Late nets out what you’ve waited for each other, so there’s only
            ever one number to argue about.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <YellowCard label="Your brother owes you" minutes={totals.owed} />
        </div>
      </section>

      <section
        aria-labelledby="example-heading"
        className="relative overflow-hidden bg-pitch text-chalk"
      >
        <PitchMarkings />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-8">
          <h2
            id="example-heading"
            className="max-w-3xl font-display text-5xl font-black uppercase leading-[0.9]"
          >
            The worked example
          </h2>
          <p className="max-w-[60ch] text-lg leading-relaxed text-chalk/75">
            You drive your brother to football. He’s a minute or two late almost every
            time. Sometimes you are too. Over three weeks, he kept you waiting{" "}
            {totals.brother} minutes and you kept him waiting {totals.you}.
          </p>
          <dl className="grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-1 border-t border-pitch-line pt-4">
              <dt className="text-chalk/75">You waited for him</dt>
              <dd className="font-display text-7xl font-black tabular-nums">
                {totals.brother} min
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-pitch-line pt-4">
              <dt className="text-chalk/75">He waited for you</dt>
              <dd className="font-display text-7xl font-black tabular-nums">
                {totals.you} min
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-accent pt-4">
              <dt className="text-chalk/75">He owes you</dt>
              <dd className="font-display text-7xl font-black tabular-nums text-accent">
                {totals.owed} min
              </dd>
            </div>
          </dl>
          <p className="max-w-[60ch] leading-relaxed text-chalk/75">
            In a group, each pair of people has its own score, and the leaderboard
            adds them up: who’s owed the most minutes overall, and who owes the most.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="rules-heading"
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20 sm:px-8"
      >
        <h2
          id="rules-heading"
          className="font-display text-5xl font-black uppercase leading-[0.9]"
        >
          The rules
        </h2>
        <ol className="flex max-w-3xl flex-col">
          {RULES.map((rule, index) => (
            <li
              key={rule.title}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-line py-6"
            >
              <span
                aria-hidden
                className="font-display text-4xl font-black leading-none text-muted tabular-nums"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-3xl font-black uppercase leading-none">
                  {rule.title}
                </h3>
                <p className="text-lg leading-relaxed text-muted">{rule.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-lg">
          More questions?{" "}
          <Link href="/faq" className="font-semibold underline underline-offset-4">
            Read the FAQ
          </Link>
          .
        </p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-20 sm:px-8">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.9]">
            All square. Enjoy it while it lasts.
          </h2>
          <Suspense fallback={<StoreLinksFallback />}>
            <StoreLinks />
          </Suspense>
        </div>
      </section>
    </>
  );
}
