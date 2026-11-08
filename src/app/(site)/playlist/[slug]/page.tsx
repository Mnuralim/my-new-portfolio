import { Suspense } from "react";
import type { Metadata } from "next";
import { BackPill } from "../../_components/ui/page-header";
import { getPlaylistBySlug } from "@/actions/playlist";
import { PlaylistContent } from "./_components/playlist-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const playlist = await getPlaylistBySlug(slug);

  if (!playlist) {
    return { title: "Playlist tidak ditemukan — Izzy Dev" };
  }

  const url = `https://izzy.my.id/playlist/${playlist.slug}`;
  const description =
    playlist.description ??
    `Playlist "${playlist.name}" — kumpulan tulisan dari Izzy Dev.`;

  return {
    title: `${playlist.name} — Izzy Dev`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: playlist.name,
      description,
      type: "website",
      url,
      images: playlist.coverImage ? [{ url: playlist.coverImage }] : "/opengraph-image",
    },
  };
}

export default function PlaylistDetailPage({ params }: Props) {
  return (
    <article className="px-4 sm:px-8 pt-12 pb-24 sm:pt-16">
      <BackPill href="/playlist">Back to playlists</BackPill>

      <Suspense
        fallback={
          <div className="mt-10" style={{ color: "var(--c-muted)" }}>
            Memuat...
          </div>
        }
      >
        <PlaylistContent params={params} />
      </Suspense>
    </article>
  );
}
