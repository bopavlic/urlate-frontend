import type { MetadataRoute } from "next";

// Invite (/i) and share-card (/s) pages are personal and short-lived: never in search.

const MARKETING_BEFORE_BLOG = ["", "/how-it-works", "/faq", "/blog"];
const MARKETING_AFTER_BLOG = ["/privacy", "/terms", "/delete-account"];

export function sitemapEntries(
  siteUrl: string,
  posts: readonly { slug: string; date: string }[],
): MetadataRoute.Sitemap {
  return [
    ...MARKETING_BEFORE_BLOG.map((path) => ({ url: `${siteUrl}${path}` })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
    ...MARKETING_AFTER_BLOG.map((path) => ({ url: `${siteUrl}${path}` })),
  ];
}

export function robotsRules(siteUrl: string): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/i/", "/s/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
