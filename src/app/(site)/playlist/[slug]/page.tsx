import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PlaylistContent } from "./_components/playlist-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function PlaylistDetailPage({ params }: Props) {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] -mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen">
      <article className="max-w-7xl mx-auto px-3 py-20">
        <Link
          href="/playlist"
          className="inline-flex items-center gap-2 text-meta-xs tracking-widest px-3 py-2 border border-[#e5e5e5] dark:border-[#2a2a2a] text-black/70 dark:text-[#999999] no-underline hover:border-black dark:hover:border-accent hover:text-black dark:hover:text-[#ffff00] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO PLAYLISTS
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
    </div>
  );
}
