"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";
import { deleteImageKitByUrl } from "@/lib/imagekit";

export async function getAllPlaylistsRaw() {
  "use cache";
  cacheTag("playlists");
  cacheLife("weeks");

  return prisma.playlist.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { posts: true } } },
  });
}

export async function getAllPlaylists(params: PlaylistParams) {
  "use cache";
  cacheTag("playlists");
  cacheLife("weeks");

  const where: Prisma.PlaylistWhereInput = {};

  if (params.search) {
    where.OR = [
      { name: { contains: params.search } },
      { description: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [playlists, totalCount] = await Promise.all([
    prisma.playlist.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.playlist.count({ where }),
  ]);

  return {
    playlists,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

export async function getPlaylistBySlug(slug: string) {
  "use cache";
  cacheTag("playlists");
  cacheLife("weeks");

  return prisma.playlist.findUnique({
    where: { slug },
    include: { posts: { include: { blogPost: true } } },
  });
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createPlaylist(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const coverImage = formData.get("coverImage") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!name) {
      return { formData, error: "Nama playlist wajib diisi." };
    }

    const slug = slugify(name);

    const existing = await prisma.playlist.findUnique({ where: { slug } });
    if (existing) {
      return { formData, error: "Nama menghasilkan slug yang sama dengan playlist lain." };
    }

    await prisma.playlist.create({
      data: {
        slug,
        name: name.trim(),
        description: description?.trim() || null,
        coverImage: coverImage?.trim() || null,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("playlists");

    return { success: "Playlist berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat playlist." };
  }
}

export async function updatePlaylist(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const coverImage = formData.get("coverImage") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !name) {
      return { formData, error: "Semua field wajib diisi." };
    }

    const playlist = await prisma.playlist.findUnique({ where: { id } });
    if (!playlist) {
      return { formData, error: "Playlist tidak ditemukan." };
    }

    if (playlist.coverImage && coverImage && playlist.coverImage !== coverImage) {
      await deleteImageKitByUrl(playlist.coverImage).catch(() => {});
    }

    await prisma.playlist.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        coverImage: coverImage?.trim() || null,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("playlists");

    return { success: "Playlist berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update playlist." };
  }
}

export async function deletePlaylist(
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

    const playlist = await prisma.playlist.findUnique({ where: { id } });
    if (!playlist) {
      return { formData, error: "Playlist tidak ditemukan." };
    }

    if (playlist.coverImage) {
      await deleteImageKitByUrl(playlist.coverImage).catch(() => {});
    }

    await prisma.playlist.delete({ where: { id } });

    updateTag("playlists");

    return { success: "Playlist berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus playlist." };
  }
}
