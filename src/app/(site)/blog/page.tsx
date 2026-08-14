import type { Metadata } from "next";
import { getLatestPosts } from "@/lib/data";
import { BlogListClient } from "./_components/blog-list-client";

export const metadata: Metadata = {
  title: "Blog & Tutorials — Izzy Dev",
  description:
    "Tulisan seputar networking, web development, dan IT support dari Muhamad Nur Fatahil Alim. Tutorial praktis buat developer dan IT support.",
  alternates: { canonical: "https://izzy.my.id/blog" },
  openGraph: {
    title: "Blog & Tutorials — Izzy Dev",
    description:
      "Tulisan seputar networking, web development, dan IT support dari Muhamad Nur Fatahil Alim.",
    type: "website",
    url: "https://izzy.my.id/blog",
  },
};

export default async function BlogIndexPage() {
  const posts = await getLatestPosts();

  return (
    <div
      className="-mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-3 py-20">
        <h2 className="section-label">Blog &amp; Tutorials</h2>
        <h1
          className="font-sans font-extrabold leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4rem)] mb-12"
          style={{ color: "var(--c-text)" }}
        >
          All
          <br />
          <span style={{ color: "var(--color-accent)" }}>Writes.</span>
        </h1>

        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
