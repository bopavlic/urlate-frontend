import type { MetadataRoute } from "next";
import { robotsRules } from "@/src/seo/sitemap";
import { siteUrl } from "@/src/site/url";

export default function robots(): MetadataRoute.Robots {
  return robotsRules(siteUrl);
}
