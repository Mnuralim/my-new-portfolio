import { getLatestPosts } from "@/lib/data";
import type { BlogPost } from "../../../../../types";
import Link from "next/link";

function tagClass(color?: BlogPost["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export default async function BlogSection() {
  const latestPosts = await getLatestPosts();
  const featured = latestPosts.find((p) => p.featured);
  const rest = latestPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="px-3 pb-20">
      <h2 className="section-label">06 / BLOG & TUTORIALS</h2>

      <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
        <h3 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(1.8rem,4vw,3rem)]">
          LATEST
          <br />
          <span className="text-outline-sm">WRITES.</span>
        </h3>
        <Link
          href="/blog"
          className="text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999] border-b border-[#d8d8d2] dark:border-[#2a2a2a] pb-0.5 no-underline transition-colors hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] hover:border-accent"
        >
          VIEW ALL POSTS →
        </Link>
      </div>

      {featured && (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] -mb-px">
          <div
            data-cursor-hover
            className="p-8 md:border-r-2 border-b-2 md:border-b-0 border-[#d8d8d2] dark:border-[#2a2a2a] group cursor-pointer relative overflow-hidden transition-colors duration-200 hover:bg-white dark:bg-[#161616]"
          >
            <span
              className="absolute bottom-[-10px] right-3 font-display font-extrabold text-[5rem] leading-none pointer-events-none opacity-100"
              style={{ WebkitTextStroke: "1px var(--stroke-color)", color: "transparent" }}
            >
              SRV
            </span>

            <div className="relative z-10">
              <span
                className={`${tagClass(featured.tagColor)} mb-4 block w-fit`}
              >
                FEATURED
              </span>
              <h3 className="font-display font-extrabold text-[1.3rem] tracking-tight leading-[1.2] mb-3">
                {featured.title}
              </h3>
              <p className="text-meta-sm text-[#6b6b66] dark:text-[#999999] leading-[1.9] mb-6">
                {featured.description}
              </p>
              <div className="flex gap-6 text-meta-xs text-[#6b6b66] dark:text-[#999999] tracking-[1px] flex-wrap mb-6">
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
                <span>{featured.views}</span>
              </div>
              <Link
                href={featured.href}
                className="
                  inline-flex items-center gap-2
                  text-meta-xs tracking-widest text-[#1a1a1a] dark:text-[#e8ff47]
                  border border-accent px-4 py-2
                  no-underline transition-all duration-200
                  hover:bg-accent hover:text-black
                "
              >
                BACA ARTIKEL ↗
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            {rest.slice(0, 2).map((post, i) => (
              <Link
                key={post.num}
                href={post.href}
                data-cursor-hover
                className={`
                  flex flex-col gap-2 p-6 no-underline
                  group cursor-pointer flex-1
                  transition-colors duration-200 hover:bg-white dark:bg-[#161616]
                  ${i < 1 ? "border-b-2 border-[#1a1a1a] dark:border-[#2a2a2a]" : ""}
                `}
              >
                <span className={`${tagClass(post.tagColor)} w-fit`}>
                  {post.tag}
                </span>
                <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight text-[#111111] dark:text-[#f0f0f0] group-hover:text-[#1a1a1a] dark:group-hover:text-[#e8ff47] transition-colors duration-200">
                  {post.title}
                </h4>
                <span className="text-meta-2xs tracking-[1px] text-[#6b6b66] dark:text-[#999999] mt-auto">
                  {post.date} · {post.readTime}
                </span>
                <span className="text-[1rem] text-[#6b6b66] dark:text-[#999999] self-end group-hover:text-[#1a1a1a] dark:group-hover:text-[#e8ff47] transition-colors duration-200">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rest.slice(featured ? 2 : 0).map((post) => (
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
      </div>

      <div className="border-2 border-[#1a1a1a] dark:border-[#2a2a2a] -mt-px p-8 flex justify-between items-center gap-8 flex-wrap">
        <div>
          <p className="text-meta-2xs tracking-widest text-[#1a1a1a] dark:text-[#e8ff47] mb-1">
            {"// NEWSLETTER"}
          </p>
          <p className="font-display font-bold text-[1.1rem]">
            Dapat notif tiap ada tutorial baru
          </p>
          <p className="text-meta-sm text-[#6b6b66] dark:text-[#999999] mt-1">
            No spam. Unsubscribe kapan aja.
          </p>
        </div>
        <div className="flex flex-1 max-w-sm min-w-[220px]">
          <input
            type="email"
            placeholder="email@domain.com"
            className="
              flex-1 bg-[#f2f2ee] dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] border-r-0
              text-[#111111] dark:text-[#f0f0f0] font-mono text-meta-sm px-4 py-2.5
              outline-none transition-colors duration-200
              focus:border-accent placeholder:text-[#75756c] dark:text-[#444444]
            "
          />
          <button className="btn-primary px-5 py-2.5 text-meta-xs whitespace-nowrap border-l-0">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
}
