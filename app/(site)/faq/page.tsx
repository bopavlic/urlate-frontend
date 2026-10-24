import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/src/content/faq";
import { faqPageJsonLd, jsonLdHtml } from "@/src/seo/structured-data";

export const metadata: Metadata = {
  title: "Questions, answered",
  description:
    "How it works, who can see what, what it costs and what happens when someone disagrees. Answers about Ur Late.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-8 sm:px-8 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqPageJsonLd(faqs)) }}
      />
      <h1 className="text-balance font-display text-[clamp(3rem,8vw,5.25rem)] leading-[1.02] tracking-[-0.02em]">
        Questions, answered
      </h1>
      <div className="flex max-w-3xl flex-col">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group border-t border-line py-5 last:border-b"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden
                className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-muted transition-transform group-open:rotate-45 group-open:bg-accent group-open:text-on-accent"
              >
                +
              </span>
            </summary>
            <p className="max-w-[65ch] pt-3 text-lg leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
      <p className="text-lg">
        Something else?{" "}
        <a href="mailto:support@urlate.app" className="font-semibold underline underline-offset-4">
          support@urlate.app
        </a>
        , or read{" "}
        <Link href="/how-it-works" className="font-semibold underline underline-offset-4">
          how it works
        </Link>
        .
      </p>
    </div>
  );
}
