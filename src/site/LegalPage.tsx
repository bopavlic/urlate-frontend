import type { ReactNode } from "react";

/** Frame for the privacy policy and terms: a title and readable long-form text. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-24 pt-8 sm:px-8 md:pt-16">
      <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-black uppercase leading-[0.9]">
        {title}
      </h1>
      <div className="flex max-w-[65ch] flex-col gap-5 text-lg">{children}</div>
    </article>
  );
}
