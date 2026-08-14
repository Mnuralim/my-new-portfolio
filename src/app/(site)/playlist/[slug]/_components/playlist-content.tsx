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
      <div className="mt-6 mb-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-stretch">
        <div
          className="relative aspect-video md:aspect-auto md:min-h-[220px] rounded-[14px] overflow-hidden"
          style={{ border: "1px solid var(--c-cardborder)" }}
        >
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
                className="font-sans font-extrabold text-[2.5rem]"
                style={{ color: "var(--c-divider)" }}
              >
                {playlist.posts.length}
              </span>
            </div>
          )}
          <span
            className="absolute top-3 left-3 font-mono text-meta-2xs tracking-widest px-2.5 py-1 rounded-[6px]"
            style={{ color: "var(--color-accent)", background: "rgba(244,228,0,0.1)" }}
          >
            {playlist.posts.length} POSTS
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h1
            className="font-sans font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(1.8rem,4vw,2.6rem)] mb-3"
            style={{ color: "var(--c-text)" }}
          >
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-meta-md leading-[1.8]" style={{ color: "var(--c-muted)" }}>
              {playlist.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlist.posts.map(({ blogPost: post }) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}?playlist=${slug}`}
            className="card-hoverable block rounded-[14px] no-underline overflow-hidden"
            style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)", color: "inherit" }}
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
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "linear-gradient(180deg, var(--c-grad1), var(--c-grad2))" }}
                >
                  <span
                    className="font-sans font-extrabold text-[2rem]"
                    style={{ color: "var(--c-divider)" }}
                  >
                    {post.num}
                  </span>
                </div>
              )}
              <span className={`${tagClass(post.tagColor)} absolute top-3 left-3`}>
                {post.tag}
              </span>
            </div>

            <div className="p-5">
              <h4
                className="font-sans font-bold text-meta-lg leading-[1.3] tracking-tight mb-2"
                style={{ color: "var(--c-text)" }}
              >
                {post.title}
              </h4>
              <p className="text-meta-xs leading-[1.8] mb-4" style={{ color: "var(--c-muted)" }}>
                {post.description}
              </p>
              <div className="flex justify-between items-center font-mono text-meta-2xs tracking-[1px]" style={{ color: "var(--c-muted2)" }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
        {playlist.posts.length === 0 && (
          <div
            className="col-span-full py-16 text-center text-meta-sm tracking-widest"
            style={{ color: "var(--c-muted2)" }}
          >
            BELUM ADA POST DI PLAYLIST INI.
          </div>
        )}
      </div>
    </>
  );
}
