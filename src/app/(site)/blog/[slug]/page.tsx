import { Suspense } from "react";
import { PostContent } from "./_components/post-content";
import { BackLink } from "./_components/back-link";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ playlist?: string }>;
}

export default function BlogPostPage({ params, searchParams }: Props) {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] -mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen">
      <article className="max-w-3xl mx-auto px-3 py-20">
        <Suspense
          fallback={
            <div className="inline-flex items-center gap-2 text-meta-xs tracking-widest px-3 py-2 border border-[#e5e5e5] dark:border-[#2a2a2a] text-black/70 dark:text-[#999999]">
              ← BACK TO BLOG
            </div>
          }
        >
          <BackLink searchParams={searchParams} />
        </Suspense>

        <Suspense
          fallback={
            <div className="mt-8 text-black/70 dark:text-[#999999] text-meta-sm">
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
