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

function badgeClass(color?: string | null) {
  if (color === "it") return "bg-[#00d4ff] text-black";
  if (color === "net") return "bg-accent2 text-black";
  return "bg-accent text-black";
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

  return (
    <>
      <div className="mt-8 mb-6">
        <span
          className={`mb-4 inline-block text-meta-2xs tracking-widest px-2 py-1 font-bold ${badgeClass(
            post.tagColor
          )}`}
        >
          {post.tag}
        </span>
        <h1 className="font-display font-extrabold leading-[1.05] tracking-[-2px] text-[clamp(2rem,5vw,3.2rem)] mb-4 text-black dark:text-[#f0f0f0]">
          {post.title}
        </h1>
        <div className="flex gap-6 text-meta-xs text-black/70 dark:text-[#999999] tracking-[1px] flex-wrap">
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
          className="w-full border border-[#e5e5e5] dark:border-[#2a2a2a] mb-10 object-cover"
        />
      )}

      <div className="prose-blog text-meta-lg text-black/80 dark:text-[#999999] leading-[1.9]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {showPlaylistNav && (
        <div className="mt-16 pt-8 border-t border-[#e5e5e5] dark:border-[#2a2a2a]">
          <Link
            href={`/playlist/${playlistSlug}`}
            className="text-meta-2xs tracking-widest text-[#999999] dark:text-[#666666] hover:text-black dark:hover:text-[#ffff00] no-underline transition-colors"
          >
            PART OF PLAYLIST: {adjacent.playlistName}
          </Link>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adjacent.prev ? (
              <Link
                href={`/blog/${adjacent.prev.slug}?playlist=${playlistSlug}`}
                className="bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] p-5 no-underline group hover:border-black dark:hover:border-accent transition-colors"
              >
                <div className="text-meta-2xs tracking-widest text-[#999999] dark:text-[#666666] mb-2">
                  ← PREVIOUS
                </div>
                <div className="font-display font-bold text-meta-md text-black dark:text-[#f0f0f0] group-hover:opacity-70 transition-opacity">
                  {adjacent.prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next ? (
              <Link
                href={`/blog/${adjacent.next.slug}?playlist=${playlistSlug}`}
                className="bg-white dark:bg-[#161616] border border-[#e5e5e5] dark:border-[#2a2a2a] p-5 no-underline group hover:border-black dark:hover:border-accent transition-colors sm:text-right"
              >
                <div className="text-meta-2xs tracking-widest text-[#999999] dark:text-[#666666] mb-2">
                  NEXT →
                </div>
                <div className="font-display font-bold text-meta-md text-black dark:text-[#f0f0f0] group-hover:opacity-70 transition-opacity">
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
