import { getAllBlogPosts } from "@/actions/blog-post";
import { BlogPostList } from "./list";

interface Props {
  searchParams: Promise<BlogPostParams>;
}

export async function BlogPostServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllBlogPosts(params);

  return (
    <BlogPostList
      blogPosts={data.blogPosts}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
