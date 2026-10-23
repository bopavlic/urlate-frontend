/** This site's origin, for absolute URLs (OG images, sitemap, structured data). Read at build time. */
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://urlate.app");
