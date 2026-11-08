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
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      // no cover: leave images out so ./opengraph-image.tsx is used
      ...(post.coverImage && { images: [{ url: post.coverImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export default function BlogPostPage({ params, searchParams }: Props) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 pb-24 sm:pt-16">
      <Suspense fallback={<div className="h-10" />}>
        <BackLink searchParams={searchParams} />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-10" style={{ color: "var(--c-muted)" }}>
            Memuat...
          </div>
        }
      >
        <PostContent params={params} searchParams={searchParams} />
      </Suspense>
    </article>
  );
}
