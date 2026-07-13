import { getPlaylistBySlug } from "@/actions/playlist";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function tagClass(color?: string | null) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export async function PlaylistContent({ params }: Props) {
  const { slug } = await params;
  const playlist = await getPlaylistBySlug(slug);

  if (!playlist) {
    notFound();
  }

  return (
    <>
      <div className="mt-8 mb-6">
        <h1 className="font-display font-extrabold leading-[1.05] tracking-[-2px] text-[clamp(2rem,5vw,3.2rem)] mb-4">
          {playlist.name}
        </h1>
        {playlist.description && (
          <p className="text-meta-md text-black/80 dark:text-[#999999] leading-[1.8]">
            {playlist.description}
          </p>
        )}
      </div>

      {playlist.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-full border-2 border-black dark:border-[#2a2a2a] mb-10 object-cover"
        />
      )}

      <div className="flex flex-col divide-y divide-black/10 dark:divide-[#2a2a2a]">
        {playlist.posts.map(({ blogPost: post }) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            data-cursor-hover
            className="py-6 no-underline group"
          >
            <span className={`${tagClass(post.tagColor)} mb-3 block w-fit`}>
              {post.tag}
            </span>
            <h4 className="font-display font-bold text-meta-lg leading-[1.3] tracking-tight mb-2 text-[#ffff00] group-hover:text-white transition-colors duration-200">
              {post.title}
            </h4>
            <p className="text-meta-xs text-[#999999] leading-[1.8]">
              {post.description}
            </p>
          </Link>
        ))}
        {playlist.posts.length === 0 && (
          <div className="py-16 text-center text-black/70 dark:text-[#999999] text-meta-sm tracking-widest">
            BELUM ADA POST DI PLAYLIST INI.
          </div>
        )}
      </div>
    </>
  );
}
