import { latestPosts } from "@/lib/data";
import type { BlogPost } from "../../../../types";

function tagClass(color?: BlogPost["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export default function BlogSection() {
  const featured = latestPosts.find((p) => p.featured);
  const rest = latestPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="px-3 pb-20">
      <div className="section-label">06 / BLOG & TUTORIALS</div>

      <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
        <h2 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(1.8rem,4vw,3rem)]">
          LATEST
          <br />
          <span className="text-outline-sm">WRITES.</span>
        </h2>
        <a
          href="/blog"
          className="text-[0.65rem] tracking-widest text-muted border-b border-border pb-0.5 no-underline transition-colors hover:text-accent hover:border-accent"
        >
          VIEW ALL POSTS →
        </a>
      </div>

      {featured && (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border-2 border-border -mb-px">
          <div
            data-cursor-hover
            className="p-8 md:border-r-2 border-b-2 md:border-b-0 border-border group cursor-pointer relative overflow-hidden transition-colors duration-200 hover:bg-card"
          >
            <span
              className="absolute bottom-[-10px] right-3 font-display font-extrabold text-[5rem] leading-none pointer-events-none opacity-100"
              style={{ WebkitTextStroke: "1px #1e1e1e", color: "transparent" }}
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
              <p className="text-[0.72rem] text-muted leading-[1.9] mb-6">
                {featured.description}
              </p>
              <div className="flex gap-6 text-[0.62rem] text-muted tracking-[1px] flex-wrap mb-6">
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
                <span>{featured.views}</span>
              </div>
              <a
                href={featured.href}
                className="
                  inline-flex items-center gap-2
                  text-[0.65rem] tracking-widest text-accent
                  border border-accent px-4 py-2
                  no-underline transition-all duration-200
                  hover:bg-accent hover:text-black
                "
              >
                BACA ARTIKEL ↗
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            {rest.slice(0, 2).map((post, i) => (
              <a
                key={post.num}
                href={post.href}
                data-cursor-hover
                className={`
                  flex flex-col gap-2 p-6 no-underline
                  group cursor-pointer flex-1
                  transition-colors duration-200 hover:bg-card
                  ${i < 1 ? "border-b-2 border-border" : ""}
                `}
              >
                <span className={`${tagClass(post.tagColor)} w-fit`}>
                  {post.tag}
                </span>
                <h4 className="font-display font-bold text-[0.9rem] leading-[1.3] tracking-tight text-white group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </h4>
                <span className="text-[0.6rem] tracking-[1px] text-muted mt-auto">
                  {post.date} · {post.readTime}
                </span>
                <span className="text-[1rem] text-muted self-end group-hover:text-accent transition-colors duration-200">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rest.slice(2).map((post) => (
          <a
            key={post.num}
            href={post.href}
            data-cursor-hover
            className="
              border-2 border-border -mt-px -ml-px p-6
              no-underline group cursor-pointer
              transition-colors duration-200 hover:border-accent hover:bg-[#0d0d0d]
            "
          >
            <div
              className="font-display font-extrabold text-[2.5rem] leading-none mb-4"
              style={{ WebkitTextStroke: "1px #222", color: "transparent" }}
            >
              {post.num}
            </div>
            <span className={`${tagClass(post.tagColor)} mb-3 block w-fit`}>
              {post.tag}
            </span>
            <h4 className="font-display font-bold text-[0.88rem] leading-[1.3] tracking-tight mb-2 group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h4>
            <p className="text-[0.67rem] text-muted leading-[1.8] mb-4">
              {post.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[0.58rem] tracking-[1px] text-[#3a3a3a]">
                {post.date}
              </span>
              <span className="text-muted text-base group-hover:text-accent transition-colors duration-200">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="border-2 border-border -mt-px p-8 flex justify-between items-center gap-8 flex-wrap">
        <div>
          <p className="text-[0.6rem] tracking-widest text-accent mb-1">
            {"// NEWSLETTER"}
          </p>
          <p className="font-display font-bold text-[1.1rem]">
            Dapat notif tiap ada tutorial baru
          </p>
          <p className="text-[0.7rem] text-muted mt-1">
            No spam. Unsubscribe kapan aja.
          </p>
        </div>
        <div className="flex flex-1 max-w-sm min-w-[220px]">
          <input
            type="email"
            placeholder="email@domain.com"
            className="
              flex-1 bg-surface border-2 border-border border-r-0
              text-white font-mono text-[0.72rem] px-4 py-2.5
              outline-none transition-colors duration-200
              focus:border-accent placeholder:text-[#444]
            "
          />
          <button className="btn-primary px-5 py-2.5 text-[0.65rem] whitespace-nowrap border-l-0">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
}
