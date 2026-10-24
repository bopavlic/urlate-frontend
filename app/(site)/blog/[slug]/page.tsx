import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, posts } from "@/src/blog/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

// Every post is prerendered from generateStaticParams; blocking on params lets an unknown
// slug answer with a real 404 instead of a streamed "not found" with status 200.
export const instant = false;

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-24 pt-8 sm:px-8 md:pt-16">
      <header className="flex flex-col gap-4">
        <Link
          href="/blog"
          className="w-fit font-semibold text-muted underline-offset-4 hover:underline"
        >
          All posts
        </Link>
        <h1 className="text-balance font-display text-[clamp(3rem,8vw,5rem)] leading-[1.02] tracking-[-0.02em]">
          {post.title}
        </h1>
        <time dateTime={post.date} className="text-muted">
          {formatPostDate(post.date)}
        </time>
      </header>
      <div className="flex max-w-[65ch] flex-col gap-5 text-lg">
        <Body />
      </div>
    </article>
  );
}
