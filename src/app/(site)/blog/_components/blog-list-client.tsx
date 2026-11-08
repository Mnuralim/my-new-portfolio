"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "../../../../../types";
import Chip from "../../_components/ui/chip";
import ContentCard from "../../_components/ui/content-card";

interface Props {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: Props) {
  const [activeTag, setActiveTag] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const tags = useMemo(() => Array.from(new Set(posts.map((p) => p.tag))), [posts]);

  const filteredSorted = useMemo(() => {
    const filtered = activeTag === "ALL" ? posts : posts.filter((p) => p.tag === activeTag);
    return [...filtered].sort((a, b) =>
      sortOrder === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );
  }, [posts, activeTag, sortOrder]);

  const featured = filteredSorted.find((p) => p.featured) ?? filteredSorted[0];
  const rest = filteredSorted.filter((p) => p !== featured);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div className="flex flex-wrap gap-2">
          <Chip active={activeTag === "ALL"} onClick={() => setActiveTag("ALL")}>
            Semua
          </Chip>
          {tags.map((tag) => (
            <Chip key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag}
            </Chip>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[0.9rem]" style={{ color: "var(--c-muted)" }}>
          {(["desc", "asc"] as const).map((order) => (
            <button
              key={order}
              type="button"
              onClick={() => setSortOrder(order)}
              aria-pressed={sortOrder === order}
              className="px-3 h-10 rounded-full bg-transparent border-none cursor-pointer font-medium transition-colors"
              style={{ color: sortOrder === order ? "var(--c-text)" : "var(--c-muted)" }}
            >
              {order === "desc" ? "Terbaru" : "Terlama"}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Menampilkan {filteredSorted.length} tulisan{activeTag !== "ALL" ? ` di kategori ${activeTag}` : ""}.
      </p>

      {featured && (
        <Link
          href={featured.href}
          className={`group grid grid-cols-1 gap-6 lg:gap-12 items-center no-underline mb-16 ${
            featured.coverImage ? "lg:grid-cols-[7fr_5fr]" : "rounded-[24px] p-7 sm:p-12"
          }`}
          style={{ color: "inherit", background: featured.coverImage ? undefined : "var(--c-divider)" }}
        >
          {featured.coverImage && (
            <div className="aspect-[16/10] overflow-hidden rounded-[24px]" style={{ background: "var(--c-divider)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- ImageKit URLs aren't in next/image remotePatterns */}
              <img
                src={featured.coverImage}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          )}
          <div>
            <div className="font-mono text-meta-sm mb-3" style={{ color: "var(--c-muted)" }}>
              {featured.tag}
            </div>
            <h2
              className="font-semibold text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15] tracking-[-0.02em]"
              style={{ color: "var(--c-text)" }}
            >
              {featured.title}
            </h2>
            <p className="mt-3 text-[1.05rem] leading-[1.6] max-w-[60ch]" style={{ color: "var(--c-muted)" }}>
              {featured.description}
            </p>
            <div className="mt-4 font-mono text-meta-sm" style={{ color: "var(--c-muted3)" }}>
              {featured.date}, {featured.readTime}
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {rest.map((post) => (
          <ContentCard
            key={post.slug}
            href={post.href}
            cover={post.coverImage}
            eyebrow={post.tag}
            title={post.title}
            description={post.description}
            meta={`${post.date}, ${post.readTime}`}
          />
        ))}
      </div>

      {filteredSorted.length === 0 && (
        <p className="py-16 text-center" style={{ color: "var(--c-muted)" }}>
          Belum ada tulisan.
        </p>
      )}
    </div>
  );
}
