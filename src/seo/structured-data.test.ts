import { describe, expect, it } from "vitest";
import {
  faqPageJsonLd,
  jsonLdHtml,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "./structured-data";

describe("organizationJsonLd", () => {
  it("names Ur Late and how to reach it", () => {
    expect(organizationJsonLd("https://urlate.app")).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ur Late",
      url: "https://urlate.app",
      email: "hello@urlate.app",
    });
  });
});

describe("softwareApplicationJsonLd", () => {
  it("describes a free iOS and Android app", () => {
    expect(
      softwareApplicationJsonLd({ siteUrl: "https://urlate.app" }),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Ur Late",
      url: "https://urlate.app",
      description: expect.stringContaining("minutes"),
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
  });

  it("links the store listings once they exist", () => {
    const data = softwareApplicationJsonLd({
      siteUrl: "https://urlate.app",
      appStoreUrl: "https://apps.apple.com/app/id1",
      playStoreUrl: "https://play.google.com/store/apps/details?id=app.urlate",
    });
    expect(data.downloadUrl).toEqual([
      "https://apps.apple.com/app/id1",
      "https://play.google.com/store/apps/details?id=app.urlate",
    ]);
  });
});

describe("faqPageJsonLd", () => {
  it("turns questions and answers into a FAQPage", () => {
    expect(
      faqPageJsonLd([{ question: "Is it free?", answer: "Yes." }]),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it free?",
          acceptedAnswer: { "@type": "Answer", text: "Yes." },
        },
      ],
    });
  });
});

describe("jsonLdHtml", () => {
  it("escapes < so the data can't close the script tag", () => {
    expect(jsonLdHtml({ name: "</script><b>" })).toBe(
      '{"name":"\\u003c/script>\\u003cb>"}',
    );
  });
});
