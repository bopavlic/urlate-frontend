import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Long-form text (blog posts, legal pages): readable measure, scoreboard headings.
const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-6 font-display text-3xl font-black uppercase leading-none"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-2 text-xl font-bold" {...props} />,
  p: (props) => <p className="leading-relaxed" {...props} />,
  ul: (props) => <ul className="flex list-disc flex-col gap-2 pl-6" {...props} />,
  ol: (props) => <ol className="flex list-decimal flex-col gap-2 pl-6" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-semibold underline underline-offset-4" {...props} />
    ) : (
      <a href={href} className="font-semibold underline underline-offset-4" {...props} />
    ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-accent pl-5 text-lg italic" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
