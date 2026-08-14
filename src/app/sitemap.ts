import type { MetadataRoute } from "next";
import { getAllBlogPostsRaw } from "@/actions/blog-post";
import { getAllPlaylistsRaw } from "@/actions/playlist";

const BASE_URL = "https://izzy.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, playlists] = await Promise.all([
    getAllBlogPostsRaw(),
    getAllPlaylistsRaw(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/playlist`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const playlistRoutes: MetadataRoute.Sitemap = playlists.map((playlist) => ({
    url: `${BASE_URL}/playlist/${playlist.slug}`,
    lastModified: playlist.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...playlistRoutes];
}
