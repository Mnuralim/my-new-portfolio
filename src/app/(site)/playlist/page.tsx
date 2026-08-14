import { getPlaylists } from "@/lib/data";
import Link from "next/link";

export default async function PlaylistIndexPage() {
  const playlists = await getPlaylists();

  return (
    <div
      className="-mx-3 sm:mx-[calc(50%-50vw)] px-3 sm:px-0 min-h-screen"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-3 py-20">
        <h2 className="section-label">Blog Playlists</h2>
        <h1
          className="font-sans font-extrabold leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4rem)] mb-12"
          style={{ color: "var(--c-text)" }}
        >
          All
          <br />
          <span style={{ color: "var(--c-muted2)" }}>Playlists.</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Link
              key={playlist.slug}
              href={playlist.href}
              className="card-hoverable block rounded-[14px] no-underline overflow-hidden"
              style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)", color: "inherit" }}
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
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(180deg, var(--c-grad1), var(--c-grad2))" }}
                  >
                    <span
                      className="font-sans font-extrabold text-[2rem]"
                      style={{ color: "var(--c-divider)" }}
                    >
                      {playlist.postCount}
                    </span>
                  </div>
                )}
                <span
                  className="absolute top-3 left-3 font-mono text-meta-2xs tracking-widest px-2.5 py-1 rounded-[6px]"
                  style={{ color: "var(--color-accent)", background: "rgba(244,228,0,0.1)" }}
                >
                  {playlist.postCount} POSTS
                </span>
              </div>

              <div className="p-5">
                <h4
                  className="font-sans font-bold text-meta-lg leading-[1.3] tracking-tight mb-2"
                  style={{ color: "var(--c-text)" }}
                >
                  {playlist.name}
                </h4>
                {playlist.description && (
                  <p
                    className="text-meta-xs leading-[1.8] line-clamp-2"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {playlist.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
          {playlists.length === 0 && (
            <div
              className="col-span-full py-16 text-center text-meta-sm tracking-widest"
              style={{ color: "var(--c-muted2)" }}
            >
              BELUM ADA PLAYLIST.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
