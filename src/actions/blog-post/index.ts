"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";
import { deleteImageKitByUrl } from "@/lib/imagekit";

export async function getAllBlogPostsRaw() {
  "use cache";
  cacheTag("blog-posts");
  cacheLife("weeks");

  return prisma.blogPost.findMany({
    orderBy: { order: "asc" },
    include: { playlists: { include: { playlist: true } } },
  });
}

export async function getAllBlogPosts(params: BlogPostParams) {
  "use cache";
  cacheTag("blog-posts");
  cacheLife("weeks");

  const where: Prisma.BlogPostWhereInput = {};

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { description: { contains: params.search } },
      { tag: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [blogPosts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
      include: { playlists: { include: { playlist: true } } },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    blogPosts,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

export async function getBlogPostBySlug(slug: string) {
  "use cache";
  cacheTag("blog-posts");
  cacheLife("weeks");

  return prisma.blogPost.findUnique({
    where: { slug },
    include: { playlists: { include: { playlist: true } } },
  });
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createBlogPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const num = formData.get("num") as string;
    const tag = formData.get("tag") as string;
    const tagColor = formData.get("tagColor") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as string;
    const date = formData.get("date") as string;
    const readTime = formData.get("readTime") as string;
    const views = formData.get("views") as string;
    const featured = formData.get("featured") === "on";
    const order = formData.get("order") as string;
    const playlistIds = formData.getAll("playlistIds") as string[];

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!num || !tag || !title || !description || !content || !date || !readTime || !views) {
      return { formData, error: "Semua field wajib diisi." };
    }

    const slug = slugify(title);

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return { formData, error: "Judul menghasilkan slug yang sama dengan post lain." };
    }

    await prisma.blogPost.create({
      data: {
        slug,
        num: num.trim(),
        tag: tag.trim(),
        tagColor: tagColor?.trim() || null,
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        coverImage: coverImage?.trim() || null,
        date: date.trim(),
        readTime: readTime.trim(),
        views: views.trim(),
        featured,
        order: order ? parseInt(order, 10) : 0,
        playlists: {
          create: playlistIds.map((playlistId) => ({ playlistId })),
        },
      },
    });

    updateTag("blog-posts");
    updateTag("playlists");

    return { success: "Post berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat post." };
  }
}

export async function updateBlogPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const num = formData.get("num") as string;
    const tag = formData.get("tag") as string;
    const tagColor = formData.get("tagColor") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as string;
    const date = formData.get("date") as string;
    const readTime = formData.get("readTime") as string;
    const views = formData.get("views") as string;
    const featured = formData.get("featured") === "on";
    const order = formData.get("order") as string;
    const playlistIds = formData.getAll("playlistIds") as string[];

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !num || !tag || !title || !description || !content || !date || !readTime || !views) {
      return { formData, error: "Semua field wajib diisi." };
    }

    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return { formData, error: "Post tidak ditemukan." };
    }

    if (post.coverImage && coverImage && post.coverImage !== coverImage) {
      await deleteImageKitByUrl(post.coverImage).catch(() => {});
    }

    await prisma.blogPost.update({
      where: { id },
      data: {
        num: num.trim(),
        tag: tag.trim(),
        tagColor: tagColor?.trim() || null,
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        coverImage: coverImage?.trim() || null,
        date: date.trim(),
        readTime: readTime.trim(),
        views: views.trim(),
        featured,
        order: order ? parseInt(order, 10) : 0,
        playlists: {
          deleteMany: {},
          create: playlistIds.map((playlistId) => ({ playlistId })),
        },
      },
    });

    updateTag("blog-posts");
    updateTag("playlists");

    return { success: "Post berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update post." };
  }
}

export async function deleteBlogPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id) {
      return { formData, error: "ID tidak valid." };
    }

    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return { formData, error: "Post tidak ditemukan." };
    }

    if (post.coverImage) {
      await deleteImageKitByUrl(post.coverImage).catch(() => {});
    }

    await prisma.blogPost.delete({ where: { id } });

    updateTag("blog-posts");
    updateTag("playlists");

    return { success: "Post berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus post." };
  }
}
