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
        className="text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999] no-underline hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] transition-colors"
      >
        ← BACK TO BLOG
      </Link>

      <Suspense fallback={<div className="mt-8 text-[#6b6b66] dark:text-[#999999] text-meta-sm">Loading...</div>}>
        <PostContent params={params} />
      </Suspense>
    </article>
  );
}
