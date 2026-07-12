import { getBlogPostBySlug } from "@/actions/blog-post";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

function tagClass(color?: string | null) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export async function PostContent({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="mt-8 mb-6">
        <span className={`${tagClass(post.tagColor)} mb-4 block w-fit`}>
          {post.tag}
        </span>
        <h1 className="font-display font-extrabold leading-[1.05] tracking-[-2px] text-[clamp(2rem,5vw,3.2rem)] mb-4">
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
          className="w-full border-2 border-black dark:border-[#2a2a2a] mb-10 object-cover"
        />
      )}

      <div className="prose-blog text-meta-lg text-black/80 dark:text-[#999999] leading-[1.9]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </>
  );
}
