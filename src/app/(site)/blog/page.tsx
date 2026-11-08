import type { Metadata } from "next";
import { getLatestPosts } from "@/lib/data";
import { BlogListClient } from "./_components/blog-list-client";
import PageHeader from "../_components/ui/page-header";

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
    images: "/opengraph-image",
  },
};

export default async function BlogIndexPage() {
  const posts = await getLatestPosts();

  return (
    <div className="px-4 sm:px-8 pt-12 pb-24 sm:pt-16">
      <PageHeader
        title="Blog & tutorials"
        intro="Catatan praktis soal jaringan, server, dan web development. Ditulis dari kerjaan sehari-hari."
      />
      <BlogListClient posts={posts} />
    </div>
  );
}
