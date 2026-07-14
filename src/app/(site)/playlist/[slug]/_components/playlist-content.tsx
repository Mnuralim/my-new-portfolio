import { getPlaylistBySlug } from "@/actions/playlist";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function badgeClass(color?: string | null) {
  if (color === "it") return "bg-[#00d4ff] text-black";
  if (color === "net") return "bg-accent2 text-black";
  return "bg-accent text-black";
}

export async function PlaylistContent({ params }: Props) {
  const { slug } = await params;
  const playlist = await getPlaylistBySlug(slug);

  if (!playlist) {
    notFound();
  }

  return (
    <>
      <div className="mt-6 mb-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-stretch">
        <div className="relative aspect-video md:aspect-auto md:min-h-[220px] border border-[#e5e5e5] dark:border-[#2a2a2a] overflow-hidden">
          {playlist.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={playlist.coverImage}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-accent flex items-center justify-center">
              <span className="font-display font-extrabold text-[2.5rem] text-black opacity-30">
                {playlist.posts.length}
              </span>
            </div>
          )}
          <span className="absolute top-3 left-3 text-meta-2xs tracking-widest px-2 py-1 font-bold bg-black text-white">
            {playlist.posts.length} POSTS
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-display font-extrabold leading-[1.05] tracking-[-2px] text-[clamp(1.8rem,4vw,2.6rem)] mb-3 text-black dark:text-[#f0f0f0]">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-meta-md text-black/70 dark:text-[#999999] leading-[1.8]">
              {playlist.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlist.posts.map(({ blogPost: post }) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}?playlist=${slug}`}
            data-cursor-hover
            className="bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] no-underline group overflow-hidden"
          >
            <div className="relative aspect-video">
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${badgeClass(
                    post.tagColor
                  )}`}
                >
                  <span className="font-display font-extrabold text-[2rem] opacity-30">
                    {post.num}
                  </span>
                </div>
              )}
              <span
                className={`absolute top-3 left-3 text-meta-2xs tracking-widest px-2 py-1 font-bold ${badgeClass(
                  post.tagColor
                )}`}
              >
                {post.tag}
              </span>
            </div>

            <div className="p-5">
              <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight mb-2 text-black dark:text-[#f0f0f0] group-hover:opacity-70 transition-opacity">
                {post.title}
              </h4>
              <p className="text-meta-xs text-[#666666] dark:text-[#999999] leading-[1.8] mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex justify-between items-center text-meta-2xs tracking-[1px] text-[#999999] dark:text-[#666666]">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
        {playlist.posts.length === 0 && (
          <div className="col-span-full py-16 text-center text-black/70 dark:text-[#999999] text-meta-sm tracking-widest">
            BELUM ADA POST DI PLAYLIST INI.
          </div>
        )}
      </div>
    </>
  );
}
