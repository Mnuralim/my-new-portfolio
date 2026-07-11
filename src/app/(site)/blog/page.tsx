import { getLatestPosts } from "@/lib/data";
import type { BlogPost } from "../../../../types";
import Link from "next/link";

function tagClass(color?: BlogPost["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export default async function BlogIndexPage() {
  const posts = await getLatestPosts();

  return (
    <div className="px-3 py-20 max-w-5xl mx-auto">
      <div className="section-label">BLOG & TUTORIALS</div>
      <h1 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(2rem,5vw,3.5rem)] mb-12">
        ALL
        <br />
        <span className="text-outline-sm">WRITES.</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.num}
            href={post.href}
            data-cursor-hover
            className="
              border-2 border-[#1a1a1a] dark:border-[#2a2a2a] -mt-px -ml-px p-6
              no-underline group cursor-pointer
              transition-colors duration-200 hover:border-accent hover:bg-[#ececE6] dark:hover:bg-[#0d0d0d]
            "
          >
            <div
              className="font-display font-extrabold text-[2.5rem] leading-none mb-4"
              style={{ WebkitTextStroke: "1px var(--stroke-color)", color: "transparent" }}
            >
              {post.num}
            </div>
            <span className={`${tagClass(post.tagColor)} mb-3 block w-fit`}>
              {post.tag}
            </span>
            <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight mb-2 group-hover:text-[#1a1a1a] dark:group-hover:text-[#e8ff47] transition-colors duration-200">
              {post.title}
            </h4>
            <p className="text-meta-xs text-[#6b6b66] dark:text-[#999999] leading-[1.8] mb-4">
              {post.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-meta-2xs tracking-[1px] text-[#75756c] dark:text-[#444444]">
                {post.date}
              </span>
              <span className="text-[#6b6b66] dark:text-[#999999] text-base group-hover:text-[#1a1a1a] dark:group-hover:text-[#e8ff47] transition-colors duration-200">
                ↗
              </span>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full py-16 text-center text-[#6b6b66] dark:text-[#999999] text-meta-sm tracking-widest">
            BELUM ADA TULISAN.
          </div>
        )}
      </div>
    </div>
  );
}
