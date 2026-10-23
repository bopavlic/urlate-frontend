import { getPost, posts } from "@/src/blog/posts";
import { ogCard, ogSize } from "@/src/site/og";

export const alt = "A post from the Ur Late blog";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return ogCard({ title: getPost(slug)?.title ?? "On being late" });
}
