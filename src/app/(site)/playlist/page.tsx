import type { Metadata } from "next";
import { getPlaylists } from "@/lib/data";
import PageHeader from "../_components/ui/page-header";
import ContentCard from "../_components/ui/content-card";

export const metadata: Metadata = {
  title: "Blog Playlists — Izzy Dev",
  description:
    "Kumpulan playlist tutorial dan tulisan seputar networking, web development, dan IT support dari Muhamad Nur Fatahil Alim.",
  alternates: { canonical: "https://izzy.my.id/playlist" },
  openGraph: {
    title: "Blog Playlists — Izzy Dev",
    description:
      "Kumpulan playlist tutorial seputar networking, web development, dan IT support.",
    type: "website",
    url: "https://izzy.my.id/playlist",
    images: "/opengraph-image",
  },
};

export default async function PlaylistIndexPage() {
  const playlists = await getPlaylists();

  return (
    <div className="px-4 sm:px-8 pt-12 pb-24 sm:pt-16">
      <PageHeader
        title="Playlists"
        intro="Tulisan yang dikelompokkan jadi seri, enak dibaca berurutan dari awal."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {playlists.map((playlist) => (
          <ContentCard
            key={playlist.slug}
            href={playlist.href}
            cover={playlist.coverImage}
            title={playlist.name}
            description={playlist.description}
            meta={`${playlist.postCount} tulisan`}
          />
        ))}
        {playlists.length === 0 && (
          <p className="col-span-full py-16 text-center" style={{ color: "var(--c-muted)" }}>
            Belum ada playlist.
          </p>
        )}
      </div>
    </div>
  );
}
