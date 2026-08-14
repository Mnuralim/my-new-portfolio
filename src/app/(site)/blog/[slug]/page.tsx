import { Suspense } from "react";
import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/actions/blog-post";
import { PostContent } from "./_components/post-content";
import { BackLink } from "./_components/back-link";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ playlist?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post tidak ditemukan — Izzy Dev" };
  }

  const url = `https://izzy.my.id/blog/${post.slug}`;

  return {
    title: `${post.title} — Izzy Dev`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default function BlogPostPage({ params, searchParams }: Props) {
  return (
    <div
      className="-mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen"
      style={{ background: "var(--c-bg)" }}
    >
      <article className="max-w-3xl mx-auto px-3 py-20">
        <Suspense
          fallback={
            <div
              className="inline-flex items-center gap-2 text-meta-xs tracking-widest px-3 py-2 rounded-[8px]"
              style={{ border: "1px solid var(--c-border)", color: "var(--c-muted2)" }}
            >
              ← BACK TO BLOG
            </div>
          }
        >
          <BackLink searchParams={searchParams} />
        </Suspense>

        <Suspense
          fallback={
            <div className="mt-8 text-meta-sm" style={{ color: "var(--c-muted2)" }}>
              Loading...
            </div>
          }
        >
          <PostContent params={params} searchParams={searchParams} />
        </Suspense>
      </article>
    </div>
  );
}
