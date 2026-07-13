import Link from "next/link";
import { Suspense } from "react";
import { PlaylistContent } from "./_components/playlist-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function PlaylistDetailPage({ params }: Props) {
  return (
    <article className="px-3 py-20 mx-auto">
      <Link
        href="/playlist"
        className="text-meta-xs tracking-widest text-black/70 dark:text-[#999999] no-underline hover:text-black dark:hover:text-[#ffff00] transition-colors"
      >
        ← BACK TO PLAYLISTS
      </Link>

      <Suspense
        fallback={
          <div className="mt-8 text-black/70 dark:text-[#999999] text-meta-sm">
            Loading...
          </div>
        }
      >
        <PlaylistContent params={params} />
      </Suspense>
    </article>
  );
}
