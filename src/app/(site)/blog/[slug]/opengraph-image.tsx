import { getBlogPostBySlug } from "@/actions/blog-post";
import { ogCard, ogSize } from "@/lib/og-card";

export const alt = "Tulisan di blog Izzy";
export const size = ogSize;
export const contentType = "image/png";

// used when a post has no cover image (generateMetadata sets the cover otherwise)
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return ogCard({ title: post?.title ?? "Blog & tutorials", kicker: post?.tag ? `Blog, ${post.tag.toLowerCase()}` : "Blog" });
}
