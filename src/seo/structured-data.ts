// schema.org data for search engines (brief: "SEO checklist"). Rendered with jsonLdHtml.

const CONTEXT = "https://schema.org";

export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    name: "Ur Late",
    url: siteUrl,
    email: "hello@urlate.app",
  };
}

export function softwareApplicationJsonLd(input: {
  siteUrl: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}) {
  const downloadUrl = [input.appStoreUrl, input.playStoreUrl].filter(
    (url): url is string => Boolean(url),
  );
  return {
    "@context": CONTEXT,
    "@type": "SoftwareApplication",
    name: "Ur Late",
    url: input.siteUrl,
    description:
      "Keeps a running score, in minutes, of who kept whom waiting. Like splitting a bill, except the currency is time.",
    operatingSystem: "iOS, Android",
    applicationCategory: "LifestyleApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    ...(downloadUrl.length > 0 ? { downloadUrl } : {}),
  };
}

export function faqPageJsonLd(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** JSON for a `<script type="application/ld+json">`, with `<` escaped so it can't end the tag. */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
