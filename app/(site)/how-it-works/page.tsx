import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { exampleEntries, exampleTotals } from "@/src/content/worked-example";
import { StoreLinks, StoreLinksFallback } from "@/src/site/StoreLinks";
import { Ticket } from "@/src/site/Ticket";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Log who was late and by how many minutes. Ur Late nets it out into one number: who owes whom. Here’s the whole system, with a worked example.",
  alternates: { canonical: "/how-it-works" },
};

const totals = exampleTotals(exampleEntries);

// The rules, in the order you meet them when you use the app.
const RULES = [
  {
    title: "Add someone",
    body: "One person or a group. They don’t need the app yet: type their name and start counting. When they join through your invite, every minute so far becomes theirs to see too.",
  },
  {
    title: "Log who was late",
    body: "Pick who was late, tap the minutes, add a note like “dinner” if you want, save. The person who waited can log it, and so can the person who was late. Minutes are always whole minutes.",
  },
  {
    title: "It counts straight away",
    body: "The other person gets notified and has 48 hours to dispute an entry. If you’d both rather approve every entry first, switch to confirm mode.",
  },
  {
    title: "Edits leave a trail",
    body: "You can change or delete your own entries, but they’re marked as edited and the old values stay in the history. Nobody can quietly rewrite what happened.",
  },
  {
    title: "Forgive or reset",
    body: "Only the person who’s owed can let minutes go: forgive a few, or reset to zero. It’s logged like everything else, and nothing ever resets on its own.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-8 md:grid-cols-[1.2fr_1fr] md:pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-balance font-display text-[clamp(3rem,8vw,5.25rem)] leading-[1.02] tracking-[-0.02em]">
            How it works
          </h1>
          <p className="max-w-[46ch] text-xl leading-relaxed text-muted">
            Every time someone keeps someone else waiting, they get a ticket for the
            minutes. Ur Late nets out what you’ve waited for each other, so there’s only
            ever one number to argue about.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Ticket
            minutes={totals.owed}
            offender="YOUR BROTHER"
            waiter="YOU"
            className="w-full max-w-[22rem]"
          />
        </div>
      </section>

      <section aria-labelledby="example-heading" className="bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-8">
          <h2
            id="example-heading"
            className="max-w-3xl text-balance font-display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl"
          >
            The worked example
          </h2>
          <p className="max-w-[60ch] text-lg leading-relaxed text-muted">
            You give your brother a lift a few times a week. He’s a minute or two late
            almost every time. Sometimes you are too. Over three weeks, he kept you waiting{" "}
            {totals.brother} minutes and you kept him waiting {totals.you}.
          </p>
          <dl className="grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-1 border-t-2 border-line pt-4">
              <dt className="text-muted">You waited for him</dt>
              <dd className="font-display text-6xl tracking-[-0.04em] tabular-nums">
                {totals.brother} min
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-t-2 border-line pt-4">
              <dt className="text-muted">He waited for you</dt>
              <dd className="font-display text-6xl tracking-[-0.04em] tabular-nums">
                {totals.you} min
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-t-2 border-accent pt-4">
              <dt className="text-muted">He owes you</dt>
              <dd className="font-display text-6xl tracking-[-0.04em] tabular-nums text-accent">
                {totals.owed} min
              </dd>
            </div>
          </dl>
          <p className="max-w-[60ch] leading-relaxed text-muted">
            In a group, each pair of people has its own balance, and the leaderboard
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
          className="text-balance font-display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl"
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
                className="font-display text-3xl leading-none text-muted tabular-nums"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl leading-tight tracking-[-0.02em]">
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
          <h2 className="text-balance font-display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">
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
