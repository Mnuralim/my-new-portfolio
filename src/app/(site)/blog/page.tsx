import { getLatestPosts } from "@/lib/data";
import { BlogListClient } from "./_components/blog-list-client";

export default async function BlogIndexPage() {
  const posts = await getLatestPosts();

  return (
    <div className="bg-white dark:bg-[#0a0a0a] -mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 py-20">
        <div className="text-meta-xs tracking-[4px] text-black dark:text-[#ffff00] uppercase flex items-center gap-3 mb-12">
          BLOG & TUTORIALS
          <span className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#2a2a2a]" />
        </div>
        <h1 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(2rem,5vw,3.5rem)] mb-12 text-black dark:text-[#f0f0f0]">
          ALL
          <br />
          <span className="text-[#999999] dark:text-[#666666]">WRITES.</span>
        </h1>

        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
