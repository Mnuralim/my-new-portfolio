import { getPlaylists } from "@/lib/data";
import Link from "next/link";

export default async function PlaylistIndexPage() {
  const playlists = await getPlaylists();

  return (
    <div className="bg-white dark:bg-[#0a0a0a] -mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 py-20">
        <div className="text-meta-xs tracking-[4px] text-black dark:text-[#ffff00] uppercase flex items-center gap-3 mb-12">
          BLOG PLAYLISTS
          <span className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#2a2a2a]" />
        </div>
        <h1 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(2rem,5vw,3.5rem)] mb-12 text-black dark:text-[#f0f0f0]">
          ALL
          <br />
          <span className="text-[#999999] dark:text-[#666666]">PLAYLISTS.</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <Link
              key={playlist.slug}
              href={playlist.href}
              data-cursor-hover
              className="bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] no-underline group overflow-hidden"
            >
              <div className="relative aspect-video">
                {playlist.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={playlist.coverImage}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-accent flex items-center justify-center">
                    <span className="font-display font-extrabold text-[2rem] text-black opacity-30">
                      {playlist.postCount}
                    </span>
                  </div>
                )}
                <span className="absolute top-3 left-3 text-meta-2xs tracking-widest px-2 py-1 font-bold bg-black text-white">
                  {playlist.postCount} POSTS
                </span>
              </div>

              <div className="p-5">
                <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight mb-2 text-black dark:text-[#f0f0f0] group-hover:opacity-70 transition-opacity">
                  {playlist.name}
                </h4>
                {playlist.description && (
                  <p className="text-meta-xs text-[#666666] dark:text-[#999999] leading-[1.8] line-clamp-2">
                    {playlist.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
          {playlists.length === 0 && (
            <div className="col-span-full py-16 text-center text-black/70 dark:text-[#999999] text-meta-sm tracking-widest">
              BELUM ADA PLAYLIST.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
