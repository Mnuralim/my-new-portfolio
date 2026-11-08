import { getPlaylistBySlug } from "@/actions/playlist";
import { notFound } from "next/navigation";
import ContentCard from "../../../_components/ui/content-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function PlaylistContent({ params }: Props) {
  const { slug } = await params;
  const playlist = await getPlaylistBySlug(slug);

  if (!playlist) {
    notFound();
  }

  return (
    <>
      <header
        className={`mt-10 mb-14 grid grid-cols-1 gap-6 lg:gap-12 items-center ${playlist.coverImage ? "lg:grid-cols-[7fr_5fr]" : ""}`}
      >
        {playlist.coverImage && (
          <div className="aspect-[16/10] overflow-hidden rounded-[24px]" style={{ background: "var(--c-divider)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageKit URLs aren't in next/image remotePatterns */}
            <img src={playlist.coverImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <div className="font-mono text-meta-sm mb-3" style={{ color: "var(--c-muted)" }}>
            {playlist.posts.length} tulisan
          </div>
          <h1
            className="font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,4.5vw,3.2rem)]"
            style={{ color: "var(--c-text)" }}
          >
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="mt-4 text-[1.05rem] leading-[1.6] max-w-[44ch]" style={{ color: "var(--c-muted)" }}>
              {playlist.description}
            </p>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {playlist.posts.map(({ blogPost: post }, i) => (
          <ContentCard
            key={post.id}
            href={`/blog/${post.slug}?playlist=${slug}`}
            cover={post.coverImage}
            eyebrow={`Bagian ${i + 1}`}
            title={post.title}
            description={post.description}
            meta={`${post.date}, ${post.readTime}`}
          />
        ))}
        {playlist.posts.length === 0 && (
          <p className="col-span-full py-16 text-center" style={{ color: "var(--c-muted)" }}>
            Belum ada tulisan di playlist ini.
          </p>
        )}
      </div>
    </>
  );
}
