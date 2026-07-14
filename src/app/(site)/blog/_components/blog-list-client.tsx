"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SortAsc, SortDesc } from "lucide-react";
import type { BlogPost } from "../../../../../types";

interface Props {
  posts: BlogPost[];
}

function badgeClass(color?: BlogPost["tagColor"]) {
  if (color === "it") return "bg-[#00d4ff] text-black";
  if (color === "net") return "bg-accent2 text-black";
  return "bg-accent text-black";
}

export function BlogListClient({ posts }: Props) {
  const [activeTag, setActiveTag] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const tags = useMemo(
    () => Array.from(new Set(posts.map((p) => p.tag))),
    [posts]
  );

  const filteredSorted = useMemo(() => {
    const filtered =
      activeTag === "ALL" ? posts : posts.filter((p) => p.tag === activeTag);
    return [...filtered].sort((a, b) =>
      sortOrder === "desc"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date)
    );
  }, [posts, activeTag, sortOrder]);

  const featured = filteredSorted.find((p) => p.featured) ?? filteredSorted[0];
  const rest = filteredSorted.filter((p) => p !== featured);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="text-meta-2xs tracking-widest text-[#999999] dark:text-[#666666] mb-3">
            CATEGORIES
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag("ALL")}
              className={`text-meta-2xs tracking-widest px-3 py-1.5 border-2 transition-colors ${
                activeTag === "ALL"
                  ? "bg-black border-black text-white dark:bg-accent dark:border-accent dark:text-black"
                  : "bg-white border-[#d0d0d0] text-black/70 hover:border-black dark:bg-[#161616] dark:border-[#2a2a2a] dark:text-[#999999] dark:hover:border-accent"
              }`}
            >
              ALL
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-meta-2xs tracking-widest px-3 py-1.5 border-2 transition-colors ${
                  activeTag === tag
                    ? "bg-black border-black text-white dark:bg-accent dark:border-accent dark:text-black"
                    : "bg-white border-[#d0d0d0] text-black/70 hover:border-black dark:bg-[#161616] dark:border-[#2a2a2a] dark:text-[#999999] dark:hover:border-accent"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-meta-xs tracking-widest text-[#999999] dark:text-[#666666]">
          <span>Sort:</span>
          <button
            onClick={() => setSortOrder("desc")}
            className={`flex items-center gap-1 transition-colors ${
              sortOrder === "desc"
                ? "text-black dark:text-[#ffff00] font-bold"
                : "hover:text-black dark:hover:text-[#ffff00]"
            }`}
          >
            <SortDesc className="w-3 h-3" />
            Newest
          </button>
          <button
            onClick={() => setSortOrder("asc")}
            className={`flex items-center gap-1 transition-colors ${
              sortOrder === "asc"
                ? "text-black dark:text-[#ffff00] font-bold"
                : "hover:text-black dark:hover:text-[#ffff00]"
            }`}
          >
            <SortAsc className="w-3 h-3" />
            Oldest
          </button>
        </div>
      </div>

      {featured && (
        <Link
          href={featured.href}
          data-cursor-hover
          className="block bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] mb-8 no-underline group overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
            <div className="relative aspect-video md:aspect-auto md:min-h-[380px]">
              {featured.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full min-h-[220px] flex items-center justify-center ${badgeClass(
                    featured.tagColor
                  )}`}
                >
                  <span className="font-display font-extrabold text-[3rem] opacity-30">
                    {featured.num}
                  </span>
                </div>
              )}
              <span
                className={`absolute top-4 left-4 text-meta-2xs tracking-widest px-2.5 py-1 font-bold ${badgeClass(
                  featured.tagColor
                )}`}
              >
                {featured.tag}
              </span>
            </div>

            <div className="p-8 flex flex-col justify-center">
              <h3 className="font-display font-extrabold text-[1.6rem] tracking-tight leading-[1.2] mb-3 text-black dark:text-[#f0f0f0] group-hover:opacity-70 transition-opacity">
                {featured.title}
              </h3>
              <p className="text-meta-md text-[#555555] dark:text-[#999999] leading-[1.8] mb-6">
                {featured.description}
              </p>
              <div className="flex gap-4 text-meta-xs text-[#888888] dark:text-[#666666] tracking-[1px]">
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={post.href}
            data-cursor-hover
            className="bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] no-underline group overflow-hidden"
          >
            <div className="relative aspect-video">
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${badgeClass(
                    post.tagColor
                  )}`}
                >
                  <span className="font-display font-extrabold text-[2rem] opacity-30">
                    {post.num}
                  </span>
                </div>
              )}
              <span
                className={`absolute top-3 left-3 text-meta-2xs tracking-widest px-2 py-1 font-bold ${badgeClass(
                  post.tagColor
                )}`}
              >
                {post.tag}
              </span>
            </div>

            <div className="p-5">
              <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight mb-2 text-black dark:text-[#f0f0f0] group-hover:opacity-70 transition-opacity">
                {post.title}
              </h4>
              <p className="text-meta-xs text-[#666666] dark:text-[#999999] leading-[1.8] mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex justify-between items-center text-meta-2xs tracking-[1px] text-[#999999] dark:text-[#666666]">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredSorted.length === 0 && (
        <div className="py-16 text-center text-black/70 dark:text-[#999999] text-meta-sm tracking-widest">
          BELUM ADA TULISAN.
        </div>
      )}
    </div>
  );
}
