import { getLatestPosts } from "@/lib/data";
import type { BlogPost } from "../../../../../types";
import Link from "next/link";
import Reveal from "@/app/_components/reveal";
import { NewsletterForm } from "./newsletter-form";

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
    <section
      id="blog"
      className="px-4 sm:px-8 py-16 sm:py-20"
      style={{ borderTop: "1px solid var(--c-divider)" }}
    >
      <div className="flex justify-between items-baseline flex-wrap gap-4 mb-12">
        <h2 className="section-label !mb-0 !flex-none">06 / Blog &amp; Tutorials</h2>
        <div className="flex gap-6 flex-wrap">
          <Link
            href="/blog"
            className="text-meta-sm font-medium no-underline"
            style={{ color: "var(--c-text)" }}
          >
            View all posts →
          </Link>
          <Link
            href="/playlist"
            className="text-meta-sm font-medium no-underline"
            style={{ color: "var(--c-text)" }}
          >
            View all playlists →
          </Link>
        </div>
      </div>

      {featured && (
        <Reveal className="mb-6">
          <a
            href={featured.href}
            className="card-hoverable block rounded-[14px] p-8 sm:p-11 no-underline"
            style={{
              border: "1px solid var(--c-cardborder)",
              background: "linear-gradient(180deg, var(--c-grad1), var(--c-grad2))",
              color: "inherit",
            }}
          >
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="font-mono text-meta-sm px-2.5 py-1 rounded-[6px]"
                style={{ color: "var(--color-accent)", background: "rgba(244,228,0,0.1)" }}
              >
                FEATURED
              </span>
              <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
                SRV
              </span>
            </div>
            <h3
              className="font-sans font-bold text-[1.5rem] mb-3.5"
              style={{ color: "var(--c-text)" }}
            >
              {featured.title}
            </h3>
            <p
              className="text-meta-lg leading-[1.6] max-w-[680px] mb-5"
              style={{ color: "var(--c-muted)" }}
            >
              {featured.description}
            </p>
            <div className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
              {featured.date} · {featured.readTime}
            </div>
          </a>
        </Reveal>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {rest.slice(0, 2).map((post, i) => (
          <Reveal key={post.num} delay={i * 0.06}>
            <Link
              href={post.href}
              className="card-hoverable block rounded-[14px] p-7 no-underline"
              style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)", color: "inherit" }}
            >
              <div
                className="font-mono text-meta-xs mb-3.5"
                style={{ color: "var(--color-accent)" }}
              >
                {post.tag}
              </div>
              <h3
                className="font-sans font-bold text-[1.2rem] mb-3.5"
                style={{ color: "var(--c-text)" }}
              >
                {post.title}
              </h3>
              <div className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
                {post.date} · {post.readTime} ↗
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        {rest.slice(2).map((post, i) => (
          <Reveal key={post.num} delay={i * 0.06}>
            <Link
              href={post.href}
              className="card-hoverable block rounded-[14px] p-7 no-underline"
              style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)", color: "inherit" }}
            >
              <div
                className="font-mono text-meta-sm mb-3.5"
                style={{ color: "var(--c-muted2)" }}
              >
                {post.num} · <span className={tagClass(post.tagColor)}>{post.tag}</span>
              </div>
              <h3
                className="font-sans font-bold text-[1.1rem] mb-3"
                style={{ color: "var(--c-text)" }}
              >
                {post.title}
              </h3>
              <p
                className="text-meta-md leading-[1.6] mb-4"
                style={{ color: "var(--c-muted)" }}
              >
                {post.description}
              </p>
              <div className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
                {post.date} ↗
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div
        className="flex items-center justify-between rounded-[14px] p-8 sm:px-10 gap-6 flex-wrap"
        style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)" }}
      >
        <div>
          <div
            className="font-mono text-meta-sm mb-2"
            style={{ color: "var(--color-accent)" }}
          >
            {"// NEWSLETTER"}
          </div>
          <div
            className="font-sans font-semibold text-meta-lg"
            style={{ color: "var(--c-text)" }}
          >
            Dapat notif tiap ada tutorial baru
          </div>
          <div className="text-meta-sm mt-1" style={{ color: "var(--c-muted2)" }}>
            No spam. Unsubscribe kapan aja.
          </div>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
