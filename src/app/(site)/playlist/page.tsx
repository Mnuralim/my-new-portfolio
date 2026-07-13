import { getPlaylists } from "@/lib/data";
import Link from "next/link";

export default async function PlaylistIndexPage() {
  const playlists = await getPlaylists();

  return (
    <div className="px-3 py-20 mx-auto">
      <div className="section-label">BLOG PLAYLISTS</div>
      <h1 className="font-display font-extrabold leading-[0.95] tracking-[-2px] text-[clamp(2rem,5vw,3.5rem)] mb-12">
        ALL
        <br />
        <span className="text-outline-sm">PLAYLISTS.</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <Link
            key={playlist.slug}
            href={playlist.href}
            data-cursor-hover
            className="
              bg-black border-2 border-black dark:bg-transparent dark:border-[#2a2a2a] -mt-px -ml-px p-6
              no-underline group cursor-pointer
              transition-colors duration-200 hover:border-accent hover:bg-[#0a0a0a] dark:hover:bg-[#0d0d0d]
            "
          >
            {playlist.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-full aspect-video object-cover border-2 border-black dark:border-[#2a2a2a] mb-4"
              />
            )}
            <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight mb-2 text-[#ffff00] group-hover:text-white transition-colors duration-200">
              {playlist.name}
            </h4>
            {playlist.description && (
              <p className="text-meta-xs text-[#999999] leading-[1.8] mb-4">
                {playlist.description}
              </p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-meta-2xs tracking-[1px] text-[#444444]">
                {playlist.postCount} POSTS
              </span>
              <span className="text-[#999999] text-base group-hover:text-[#ffff00] transition-colors duration-200">
                ↗
              </span>
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
  );
}
