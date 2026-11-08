import { getLatestPosts } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/app/_components/reveal";
import { NewsletterForm } from "./newsletter-form";

export default async function BlogSection() {
  const posts = await getLatestPosts();
  // featured first, then the rest; the home page shows a short list only
  const latest = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 4);

  return (
    <section id="blog" className="px-4 sm:px-8 py-16 sm:py-24">
      <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
        <h2 className="section-label !mb-0">Blog &amp; Tutorials</h2>
        <div className="flex gap-3 flex-wrap">
          <Link href="/playlist" className="btn-ghost btn-tactile">
            Playlists
          </Link>
          <Link href="/blog" className="btn-ghost btn-tactile">
            All posts
          </Link>
        </div>
      </div>

      <div className="flex flex-col">
        {latest.map((post, i) => (
          <Reveal key={post.href} delay={i * 0.05}>
            <Link
              href={post.href}
              className="group grid grid-cols-1 sm:grid-cols-[150px_1fr_auto] lg:grid-cols-[180px_1fr_auto] gap-x-8 gap-y-1.5 py-7 no-underline"
              style={{ color: "inherit", borderTop: i > 0 ? "1px solid var(--c-border)" : undefined }}
            >
              <div className="font-mono text-meta-sm pt-1.5" style={{ color: "var(--c-muted)" }}>
                {post.date}
              </div>
              <div>
                <h3
                  className="font-semibold text-[1.25rem] sm:text-[1.4rem] leading-[1.25] tracking-[-0.01em] transition-colors"
                  style={{ color: "var(--c-text)" }}
                >
                  {post.title}
                </h3>
                <p className="mt-1.5 leading-[1.6] max-w-[60ch] line-clamp-2" style={{ color: "var(--c-muted)" }}>
                  {post.description}
                </p>
                <div className="mt-2 font-mono text-meta-sm" style={{ color: "var(--c-muted3)" }}>
                  {post.tag}, {post.readTime}
                </div>
              </div>
              <ArrowUpRight
                size={22}
                aria-hidden="true"
                className="hidden sm:block mt-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "var(--c-muted)" }}
              />
            </Link>
          </Reveal>
        ))}
      </div>

      <div
        className="mt-12 flex items-center justify-between rounded-[24px] p-6 sm:p-10 gap-6 flex-wrap"
        style={{ background: "var(--c-divider)" }}
      >
        <div>
          <h3 className="font-semibold text-[1.25rem]" style={{ color: "var(--c-text)" }}>
            Dapat notif tiap ada tutorial baru
          </h3>
          <p className="mt-1" style={{ color: "var(--c-muted)" }}>
            No spam. Unsubscribe kapan aja.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
