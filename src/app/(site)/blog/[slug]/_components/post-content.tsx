import { getBlogPostBySlug } from "@/actions/blog-post";
import { getAdjacentPlaylistPosts } from "@/actions/playlist";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ playlist?: string }>;
}

function tagClass(color?: string | null) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export async function PostContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { playlist: playlistSlug } = await searchParams;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const adjacent = playlistSlug
    ? await getAdjacentPlaylistPosts(playlistSlug, slug)
    : null;
  const showPlaylistNav =
    adjacent && (adjacent.prev || adjacent.next) && adjacent.playlistName;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Muhamad Nur Fatahil Alim",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://izzy.my.id/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mt-8 mb-6">
        <span className={`${tagClass(post.tagColor)} mb-4 inline-block`}>
          {post.tag}
        </span>
        <h1
          className="font-sans font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,3.2rem)] mb-4"
          style={{ color: "var(--c-text)" }}
        >
          {post.title}
        </h1>
        <div className="flex gap-6 font-mono text-meta-xs tracking-[1px] flex-wrap" style={{ color: "var(--c-muted2)" }}>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
          <span>{post.views}</span>
        </div>
      </div>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full rounded-[12px] mb-10 object-cover"
          style={{ border: "1px solid var(--c-cardborder)" }}
        />
      )}

      <div className="prose-blog text-meta-lg leading-[1.9]" style={{ color: "var(--c-muted)" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {showPlaylistNav && (
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--c-divider)" }}>
          <Link
            href={`/playlist/${playlistSlug}`}
            className="font-mono text-meta-2xs tracking-widest no-underline transition-colors"
            style={{ color: "var(--c-muted2)" }}
          >
            PART OF PLAYLIST: {adjacent.playlistName}
          </Link>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adjacent.prev ? (
              <Link
                href={`/blog/${adjacent.prev.slug}?playlist=${playlistSlug}`}
                className="card-hoverable rounded-[12px] p-5 no-underline"
                style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)" }}
              >
                <div className="font-mono text-meta-2xs tracking-widest mb-2" style={{ color: "var(--c-muted2)" }}>
                  ← PREVIOUS
                </div>
                <div className="font-sans font-bold text-meta-md" style={{ color: "var(--c-text)" }}>
                  {adjacent.prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next ? (
              <Link
                href={`/blog/${adjacent.next.slug}?playlist=${playlistSlug}`}
                className="card-hoverable rounded-[12px] p-5 no-underline sm:text-right"
                style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)" }}
              >
                <div className="font-mono text-meta-2xs tracking-widest mb-2" style={{ color: "var(--c-muted2)" }}>
                  NEXT →
                </div>
                <div className="font-sans font-bold text-meta-md" style={{ color: "var(--c-text)" }}>
                  {adjacent.next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </>
  );
}
