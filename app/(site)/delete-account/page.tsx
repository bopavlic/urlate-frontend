import type { Metadata } from "next";
import { DeleteAccountForm } from "./DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "Delete your Ur Late account and its data. We’ll email you a code to confirm it’s you.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-8 sm:px-8 md:pt-16">
      <div className="flex max-w-2xl flex-col gap-5">
        <h1 className="font-display text-[clamp(3.25rem,9vw,5.5rem)] font-black uppercase leading-[0.88]">
          Delete your account
        </h1>
        <p className="text-xl leading-relaxed text-muted">
          You can also do this in the app, under Profile. Here, we’ll email you a code
          to make sure it’s really you.
        </p>
      </div>

      <DeleteAccountForm />

      <section aria-labelledby="what-happens" className="flex max-w-2xl flex-col gap-4">
        <h2
          id="what-happens"
          className="font-display text-3xl font-black uppercase leading-none"
        >
          What gets deleted
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-6 leading-relaxed">
          <li>Your profile: name, username, email, photo and sign-in methods.</li>
          <li>
            Every tally where nobody else has an account, with its history and the
            placeholder people in it.
          </li>
          <li>
            In tallies shared with people who have an account, you become a placeholder
            again, so their score and history stay as they were. Your name in those
            tallies goes back to what they called you before you joined, or “Deleted
            account”.
          </li>
        </ul>
        <p className="leading-relaxed text-muted">
          Deletion is immediate and can’t be undone. Questions? Write to{" "}
          <a
            href="mailto:privacy@urlate.app"
            className="font-semibold text-ink underline underline-offset-4"
          >
            privacy@urlate.app
          </a>
          .
        </p>
      </section>
    </div>
  );
}
