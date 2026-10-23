import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, posts } from "@/src/blog/posts";

export const metadata: Metadata = {
  title: "The Ur Late blog",
  description:
    "On lateness, waiting, and keeping score with people you like. Short reads from Ur Late.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-8 sm:px-8 md:pt-16">
      <div className="flex max-w-2xl flex-col gap-5">
        <h1 className="font-display text-[clamp(3.25rem,9vw,5.5rem)] font-black uppercase leading-[0.88]">
          On being late
        </h1>
        <p className="text-xl leading-relaxed text-muted">
          Short reads about waiting, lateness and keeping score with people you like.
        </p>
      </div>
      <ul className="flex max-w-3xl flex-col">
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-line py-7 last:border-b">
            <article className="flex flex-col gap-2">
              <h2 className="font-display text-4xl font-black uppercase leading-[0.95]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="max-w-[60ch] text-lg leading-relaxed text-muted">
                {post.description}
              </p>
              <time dateTime={post.date} className="text-sm text-muted">
                {formatPostDate(post.date)}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
