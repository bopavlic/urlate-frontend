// The blog's index. Each post's body is content/blog/<slug>.mdx; the metadata lives here so
// the index, sitemap and tests can read it without compiling MDX.

export interface Post {
  slug: string;
  title: string;
  /** Meta description and index blurb; keep it under 160 characters. */
  description: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
}

export const posts: readonly Post[] = [
  {
    slug: "what-to-do-when-a-friend-is-always-late",
    title: "What to do when a friend is always late",
    description:
      "Nagging doesn’t work and silent fuming is worse. A lighter way to deal with the friend who’s always ten minutes behind.",
    date: "2026-10-23",
  },
  {
    slug: "how-late-is-late",
    title: "How late is late? A fair rule for the grey zone",
    description:
      "Is two minutes late? Is five? A simple rule for when the clock starts, so nobody argues about the score.",
    date: "2026-10-23",
  },
  {
    slug: "keeping-score-without-keeping-grudges",
    title: "Keeping score without keeping grudges",
    description:
      "Tracking who’s late sounds petty. Done right, it does the opposite: it turns a sore point into a running joke.",
    date: "2026-10-23",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
