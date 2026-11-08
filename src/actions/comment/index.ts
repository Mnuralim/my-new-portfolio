"use server";

import { prisma } from "@/lib/prisma";
import { sortComments } from "@/lib/comment-sort";
import { getSession } from "../session";
import { getCurrentUser } from "../user";

export type CommentSort = "relevant" | "newest";

export type CommentItem = {
  id: string;
  parentId: string | null;
  content: string;
  createdAt: string;
  author: { name: string; image: string | null };
  likeCount: number;
  likedByMe: boolean;
  canDelete: boolean;
  replies: CommentItem[];
};

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const MAX_LENGTH = 2000;
const MAX_PER_MINUTE = 5;
const NEED_LOGIN = "Login dulu pakai Google atau GitHub.";

const isUniqueViolation = (e: unknown) => (e as { code?: string })?.code === "P2002";

type Row = {
  id: string;
  parentId: string | null;
  userId: string;
  content: string;
  createdAt: Date;
  user: { name: string; image: string | null };
  _count: { likes: number };
  likes: unknown[];
};

function toItem(row: Row, viewerId: string | null, isAdmin: boolean): CommentItem {
  return {
    id: row.id,
    parentId: row.parentId,
    content: row.content,
    createdAt: row.createdAt.toISOString(),
    author: { name: row.user.name, image: row.user.image },
    likeCount: row._count.likes,
    likedByMe: row.likes.length > 0,
    canDelete: isAdmin || row.userId === viewerId,
    replies: [],
  };
}

const rowInclude = (viewerId: string | null) => ({
  user: { select: { name: true, image: true } },
  _count: { select: { likes: true } },
  // empty id matches nothing, so anonymous viewers get likedByMe = false
  likes: { where: { userId: viewerId ?? "" }, select: { userId: true } },
});

// shortcut: loads up to 1000 comments of a post in one query and builds the tree in memory; paginate beyond that
export async function getComments(slug: string, sort: CommentSort = "relevant"): Promise<CommentItem[]> {
  const [viewer, admin] = await Promise.all([getCurrentUser(), getSession()]);
  const rows = await prisma.comment.findMany({
    where: { blogPost: { slug } },
    orderBy: { createdAt: "asc" },
    take: 1000,
    include: rowInclude(viewer?.id ?? null),
  });

  const items = rows.map((r) => toItem(r, viewer?.id ?? null, Boolean(admin)));
  const top = items.filter((i) => !i.parentId);
  const byId = new Map(top.map((t) => [t.id, t]));
  for (const i of items) if (i.parentId) byId.get(i.parentId)?.replies.push(i); // already oldest-first

  return sortComments(top, sort);
}

export async function addComment(slug: string, content: string, parentId?: string): Promise<Result<{ comment: CommentItem }>> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: NEED_LOGIN };

  const text = content.trim();
  if (!text) return { ok: false, error: "Komentar tidak boleh kosong." };
  if (text.length > MAX_LENGTH) return { ok: false, error: `Maksimal ${MAX_LENGTH} karakter.` };

  const post = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return { ok: false, error: "Tulisan tidak ditemukan." };

  let rootId: string | null = null;
  if (parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId }, select: { blogPostId: true, parentId: true } });
    if (!parent || parent.blogPostId !== post.id) return { ok: false, error: "Komentar yang dibalas tidak ditemukan." };
    rootId = parent.parentId ?? parentId; // a reply to a reply stays under the top-level comment
  }

  const recent = await prisma.comment.count({
    where: { userId: user.id, createdAt: { gte: new Date(Date.now() - 60_000) } },
  });
  if (recent >= MAX_PER_MINUTE) return { ok: false, error: "Terlalu cepat, coba lagi sebentar." };

  const row = await prisma.comment.create({
    data: { blogPostId: post.id, userId: user.id, parentId: rootId, content: text },
    include: rowInclude(user.id),
  });
  return { ok: true, comment: toItem(row, user.id, Boolean(await getSession())) };
}

// the author or the admin can delete; replies go with it (cascade)
export async function deleteComment(id: string): Promise<Result> {
  const [user, admin] = await Promise.all([getCurrentUser(), getSession()]);
  if (!user && !admin) return { ok: false, error: NEED_LOGIN };

  const comment = await prisma.comment.findUnique({ where: { id }, select: { userId: true } });
  if (!comment) return { ok: true };
  if (!admin && comment.userId !== user?.id) return { ok: false, error: "Tidak punya akses." };

  await prisma.comment.delete({ where: { id } });
  return { ok: true };
}

export async function toggleCommentLike(commentId: string): Promise<Result<{ liked: boolean; likeCount: number }>> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: NEED_LOGIN };

  const exists = await prisma.comment.findUnique({ where: { id: commentId }, select: { id: true } });
  if (!exists) return { ok: false, error: "Komentar tidak ditemukan." };

  const { count } = await prisma.commentLike.deleteMany({ where: { commentId, userId: user.id } });
  const liked = count === 0;
  if (liked) {
    try {
      await prisma.commentLike.create({ data: { commentId, userId: user.id } });
    } catch (e) {
      if (!isUniqueViolation(e)) throw e; // double click: the like already exists
    }
  }
  return { ok: true, liked, likeCount: await prisma.commentLike.count({ where: { commentId } }) };
}
