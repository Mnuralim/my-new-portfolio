import { getBlogPostBySlug } from "@/actions/blog-post";
import { getAdjacentPlaylistPosts } from "@/actions/playlist";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ViewTracker } from "./view-tracker";
import { EngagementBar } from "./engagement-bar";
import { Comments } from "./comments";
import { getPostEngagement } from "@/actions/engagement";
import { getComments } from "@/actions/comment";
import { getCurrentUser } from "@/actions/user";

const compact = new Intl.NumberFormat("id-ID", { notation: "compact" });
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ playlist?: string }>;
}

export async function PostContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { playlist: playlistSlug } = await searchParams;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [user, stats, comments] = await Promise.all([getCurrentUser(), getPostEngagement(slug), getComments(slug)]);
  const url = `https://izzy.my.id/blog/${post.slug}`;

  const adjacent = playlistSlug
    ? await getAdjacentPlaylistPosts(playlistSlug, slug)
    : null;
  const showPlaylistNav =
    adjacent && (adjacent.prev || adjacent.next) && adjacent.playlistName;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.coverImage && { image: [post.coverImage] }),
    // `date` is free text in the DB; schema.org needs ISO 8601
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "id-ID",
    keywords: post.tag,
    author: {
      "@type": "Person",
      name: "Muhamad Nur Fatahil Alim",
      url: "https://izzy.my.id",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://izzy.my.id/blog/${post.slug}`,
    },
  };

  return (
    <>
      <ViewTracker slug={post.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mt-10 mb-10">
        <div className="font-mono text-meta-sm mb-4" style={{ color: "var(--c-muted)" }}>
          {post.tag}
        </div>
        <h1
          className="font-bold leading-[1.08] tracking-[-0.03em] text-[clamp(2.1rem,5vw,3.4rem)]"
          style={{ color: "var(--c-text)" }}
        >
          {post.title}
        </h1>
        <div className="mt-5 flex gap-x-6 gap-y-1 font-mono text-meta-sm flex-wrap" style={{ color: "var(--c-muted3)" }}>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
          <span>{compact.format(stats?.viewCount ?? 0)} dibaca</span>
          <a href="#comments" className="no-underline hover:text-[var(--c-text)]" style={{ color: "inherit" }}>
            {stats?.commentCount ?? 0} komentar
          </a>
        </div>
      </header>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full rounded-[24px] mb-12 object-cover"
        />
      )}

      <div className="prose-blog text-[1.075rem] leading-[1.85]" style={{ color: "var(--c-b5)" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <EngagementBar
        slug={post.slug}
        title={post.title}
        url={url}
        initialLiked={stats?.likedByMe ?? false}
        initialCount={stats?.likeCount ?? 0}
        loggedIn={Boolean(user)}
      />

      {showPlaylistNav && (
        <nav aria-label="Navigasi playlist" className="mt-16 pt-8" style={{ borderTop: "1px solid var(--c-border)" }}>
          <Link
            href={`/playlist/${playlistSlug}`}
            className="text-[0.95rem] no-underline transition-colors hover:text-[var(--c-text)]"
            style={{ color: "var(--c-muted)" }}
          >
            Bagian dari playlist <span className="font-semibold" style={{ color: "var(--c-text)" }}>{adjacent.playlistName}</span>
          </Link>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adjacent.prev ? (
              <Link
                href={`/blog/${adjacent.prev.slug}?playlist=${playlistSlug}`}
                className="group rounded-[24px] p-6 no-underline transition-colors"
                style={{ background: "var(--c-divider)" }}
              >
                <div className="text-[0.9rem] mb-1.5" style={{ color: "var(--c-muted)" }}>
                  Sebelumnya
                </div>
                <div className="font-semibold leading-[1.35]" style={{ color: "var(--c-text)" }}>
                  {adjacent.prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next ? (
              <Link
                href={`/blog/${adjacent.next.slug}?playlist=${playlistSlug}`}
                className="group rounded-[24px] p-6 no-underline sm:text-right transition-colors"
                style={{ background: "var(--c-divider)" }}
              >
                <div className="text-[0.9rem] mb-1.5" style={{ color: "var(--c-muted)" }}>
                  Selanjutnya
                </div>
                <div className="font-semibold leading-[1.35]" style={{ color: "var(--c-text)" }}>
                  {adjacent.next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      <Comments slug={post.slug} user={user} initialComments={comments} />
    </>
  );
}
