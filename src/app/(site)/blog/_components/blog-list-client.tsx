"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SortAsc, SortDesc } from "lucide-react";
import type { BlogPost } from "../../../../../types";

interface Props {
  posts: BlogPost[];
}

function tagClass(color?: BlogPost["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
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
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag("ALL")}
            aria-pressed={activeTag === "ALL"}
            style={{
              color: activeTag === "ALL" ? "#0b0b0c" : "var(--c-muted2)",
              background: activeTag === "ALL" ? "var(--color-accent)" : "transparent",
              border: activeTag === "ALL" ? "1px solid var(--color-accent)" : "1px solid var(--c-border)",
            }}
            className="font-mono text-meta-2xs tracking-widest px-4 py-2 rounded-full cursor-pointer transition-all duration-200"
          >
            ALL
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              style={{
                color: activeTag === tag ? "#0b0b0c" : "var(--c-muted2)",
                background: activeTag === tag ? "var(--color-accent)" : "transparent",
                border: activeTag === tag ? "1px solid var(--color-accent)" : "1px solid var(--c-border)",
              }}
              className="font-mono text-meta-2xs tracking-widest px-4 py-2 rounded-full cursor-pointer transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-meta-xs tracking-widest" style={{ color: "var(--c-muted2)" }}>
          <span>Sort:</span>
          <button
            onClick={() => setSortOrder("desc")}
            aria-pressed={sortOrder === "desc"}
            className="flex items-center gap-1 transition-colors bg-transparent border-none cursor-pointer font-sans"
            style={{ color: sortOrder === "desc" ? "var(--color-accent)" : "var(--c-muted2)" }}
          >
            <SortDesc className="w-3 h-3" aria-hidden="true" />
            Newest
          </button>
          <button
            onClick={() => setSortOrder("asc")}
            aria-pressed={sortOrder === "asc"}
            className="flex items-center gap-1 transition-colors bg-transparent border-none cursor-pointer font-sans"
            style={{ color: sortOrder === "asc" ? "var(--color-accent)" : "var(--c-muted2)" }}
          >
            <SortAsc className="w-3 h-3" aria-hidden="true" />
            Oldest
          </button>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Menampilkan {filteredSorted.length} tulisan{activeTag !== "ALL" ? ` di kategori ${activeTag}` : ""}.
      </p>

      {featured && (
        <Link
          href={featured.href}
          className="card-hoverable block rounded-[14px] mb-6 no-underline overflow-hidden"
          style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)", color: "inherit" }}
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
                  className="w-full h-full min-h-[220px] flex items-center justify-center"
                  style={{ background: "linear-gradient(180deg, var(--c-grad1), var(--c-grad2))" }}
                >
                  <span
                    className="font-sans font-extrabold text-[3rem]"
                    style={{ color: "var(--c-divider)" }}
                  >
                    {featured.num}
                  </span>
                </div>
              )}
              <span
                className={`${tagClass(featured.tagColor)} absolute top-4 left-4`}
              >
                {featured.tag}
              </span>
            </div>

            <div className="p-8 flex flex-col justify-center">
              <h3
                className="font-sans font-bold text-[1.5rem] tracking-tight leading-[1.2] mb-3"
                style={{ color: "var(--c-text)" }}
              >
                {featured.title}
              </h3>
              <p
                className="text-meta-lg leading-[1.6] mb-5"
                style={{ color: "var(--c-muted)" }}
              >
                {featured.description}
              </p>
              <div className="flex gap-4 font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={post.href}
            className="card-hoverable block rounded-[14px] no-underline overflow-hidden"
            style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)", color: "inherit" }}
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
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "linear-gradient(180deg, var(--c-grad1), var(--c-grad2))" }}
                >
                  <span
                    className="font-sans font-extrabold text-[2rem]"
                    style={{ color: "var(--c-divider)" }}
                  >
                    {post.num}
                  </span>
                </div>
              )}
              <span className={`${tagClass(post.tagColor)} absolute top-3 left-3`}>
                {post.tag}
              </span>
            </div>

            <div className="p-5">
              <h4
                className="font-sans font-bold text-meta-lg leading-[1.3] tracking-tight mb-2"
                style={{ color: "var(--c-text)" }}
              >
                {post.title}
              </h4>
              <p
                className="text-meta-xs leading-[1.8] mb-4"
                style={{ color: "var(--c-muted)" }}
              >
                {post.description}
              </p>
              <div className="flex justify-between items-center font-mono text-meta-2xs tracking-[1px]" style={{ color: "var(--c-muted2)" }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredSorted.length === 0 && (
        <div className="py-16 text-center text-meta-sm tracking-widest" style={{ color: "var(--c-muted2)" }}>
          BELUM ADA TULISAN.
        </div>
      )}
    </div>
  );
}
