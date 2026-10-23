import type { MetadataRoute } from "next";
import { posts } from "@/src/blog/posts";
import { sitemapEntries } from "@/src/seo/sitemap";
import { siteUrl } from "@/src/site/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(siteUrl, posts);
}
