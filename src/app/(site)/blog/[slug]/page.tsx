import Link from "next/link";
import { Suspense } from "react";
import { PostContent } from "./_components/post-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  return (
    <article className="px-3 py-20 max-w-3xl mx-auto">
      <Link
        href="/#blog"
        className="text-meta-xs tracking-widest text-black/70 dark:text-[#999999] no-underline hover:text-black dark:hover:text-[#ffff00] transition-colors"
      >
        ← BACK TO BLOG
      </Link>

      <Suspense fallback={<div className="mt-8 text-black/70 dark:text-[#999999] text-meta-sm">Loading...</div>}>
        <PostContent params={params} />
      </Suspense>
    </article>
  );
}
