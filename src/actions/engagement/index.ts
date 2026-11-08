"use server";

import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isBot } from "@/lib/bot";
import { getSession } from "../session";
import { getCurrentUser } from "../user";

export type PostEngagement = { viewCount: number; likeCount: number; commentCount: number; likedByMe: boolean };

const isUniqueViolation = (e: unknown) => (e as { code?: string })?.code === "P2002";
const UUID_RE = /^[0-9a-f-]{36}$/i;

// not cached: depends on the viewer and changes constantly
export async function getPostEngagement(slug: string): Promise<PostEngagement | null> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { id: true, viewCount: true, _count: { select: { likes: true, comments: true } } },
  });
  if (!post) return null;

  const user = await getCurrentUser();
  const mine = user
    ? await prisma.postLike.findUnique({ where: { blogPostId_userId: { blogPostId: post.id, userId: user.id } } })
    : null;

  return { viewCount: post.viewCount, likeCount: post._count.likes, commentCount: post._count.comments, likedByMe: Boolean(mine) };
}

export async function togglePostLike(slug: string): Promise<{ ok: true; liked: boolean; likeCount: number } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Login dulu pakai Google atau GitHub." };

  const post = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return { ok: false, error: "Tulisan tidak ditemukan." };

  const { count } = await prisma.postLike.deleteMany({ where: { blogPostId: post.id, userId: user.id } });
  const liked = count === 0;
  if (liked) {
    try {
      await prisma.postLike.create({ data: { blogPostId: post.id, userId: user.id } });
    } catch (e) {
      if (!isUniqueViolation(e)) throw e; // double click: the like already exists
    }
  }
  return { ok: true, liked, likeCount: await prisma.postLike.count({ where: { blogPostId: post.id } }) };
}

// Counts one view per visitor per article per day (visitor = long-lived cookie).
// Best-effort like most news sites: clearing cookies or forging ids can inflate it.
export async function recordView(slug: string): Promise<void> {
  if (isBot((await headers()).get("user-agent"))) return;
  if (await getSession()) return; // the admin previewing his own post does not count

  const post = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return;

  const jar = await cookies();
  let visitorId = jar.get("vid")?.value;
  if (!visitorId || !UUID_RE.test(visitorId)) {
    visitorId = crypto.randomUUID();
    jar.set("vid", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  try {
    await prisma.$transaction([
      prisma.postView.create({ data: { blogPostId: post.id, visitorId, day: new Date().toISOString().slice(0, 10) } }),
      // raw SQL so the @updatedAt column is not touched (it feeds sitemap lastmod)
      prisma.$executeRaw`UPDATE tb_blog_post SET viewCount = viewCount + 1 WHERE id = ${post.id}`,
    ]);
  } catch (e) {
    if (!isUniqueViolation(e)) throw e; // already counted today
  }
}
