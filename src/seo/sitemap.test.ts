import { describe, expect, it } from "vitest";
import { robotsRules, sitemapEntries } from "./sitemap";

const posts = [
  { slug: "friend-always-late", date: "2026-10-20" },
  { slug: "how-late-is-late", date: "2026-10-10" },
];

describe("sitemapEntries", () => {
  it("lists the marketing pages and every blog post", () => {
    const urls = sitemapEntries("https://urlate.app", posts).map((e) => e.url);
    expect(urls).toEqual([
      "https://urlate.app",
      "https://urlate.app/how-it-works",
      "https://urlate.app/faq",
      "https://urlate.app/blog",
      "https://urlate.app/blog/friend-always-late",
      "https://urlate.app/blog/how-late-is-late",
      "https://urlate.app/privacy",
      "https://urlate.app/terms",
      "https://urlate.app/delete-account",
    ]);
  });

  it("dates blog posts by when they were published", () => {
    const entry = sitemapEntries("https://urlate.app", posts).find((e) =>
      e.url.endsWith("/friend-always-late"),
    );
    expect(entry?.lastModified).toEqual(new Date("2026-10-20"));
  });

  it("never lists invite or share-card pages", () => {
    const urls = sitemapEntries("https://urlate.app", posts).map((e) => e.url);
    expect(urls.some((url) => /\/(i|s)\//.test(url))).toBe(false);
  });
});

describe("robotsRules", () => {
  it("keeps invites and share cards out of search and points at the sitemap", () => {
    expect(robotsRules("https://urlate.app")).toEqual({
      rules: { userAgent: "*", allow: "/", disallow: ["/i/", "/s/"] },
      sitemap: "https://urlate.app/sitemap.xml",
    });
  });
});
