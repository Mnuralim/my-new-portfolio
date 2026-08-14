import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
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
      images: playlist.coverImage ? [{ url: playlist.coverImage }] : undefined,
    },
  };
}

export default function PlaylistDetailPage({ params }: Props) {
  return (
    <div
      className="-mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen"
      style={{ background: "var(--c-bg)" }}
    >
      <article className="max-w-7xl mx-auto px-3 py-20">
        <Link
          href="/playlist"
          className="inline-flex items-center gap-2 text-meta-xs tracking-widest px-3 py-2 rounded-[8px] no-underline transition-colors"
          style={{ border: "1px solid var(--c-border)", color: "var(--c-muted2)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO PLAYLISTS
        </Link>

        <Suspense
          fallback={
            <div className="mt-8 text-meta-sm" style={{ color: "var(--c-muted2)" }}>
              Loading...
            </div>
          }
        >
          <PlaylistContent params={params} />
        </Suspense>
      </article>
    </div>
  );
}
