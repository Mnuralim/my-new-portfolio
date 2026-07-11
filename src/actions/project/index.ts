"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";

export async function getAllProjectsRaw() {
  "use cache";
  cacheTag("projects");
  cacheLife("weeks");

  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getAllProjects(params: ProjectParams) {
  "use cache";
  cacheTag("projects");
  cacheLife("weeks");

  const where: Prisma.ProjectWhereInput = {};

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { description: { contains: params.search } },
      { tag: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    projects,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

function parseStack(formData: FormData): string[] {
  const raw = formData.get("stack") as string;
  return raw
    ? raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
}

export async function createProject(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const num = formData.get("num") as string;
    const tag = formData.get("tag") as string;
    const tagColor = formData.get("tagColor") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const href = formData.get("href") as string;
    const filter = formData.get("filter") as string;
    const featured = formData.get("featured") === "on";
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!num || !tag || !title || !description || !href) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.project.create({
      data: {
        num: num.trim(),
        tag: tag.trim(),
        tagColor: tagColor?.trim() || null,
        title: title.trim(),
        description: description.trim(),
        stack: parseStack(formData),
        href: href.trim(),
        filter: filter?.trim() || null,
        featured,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("projects");

    return { success: "Project berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat project." };
  }
}

export async function updateProject(
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
    const href = formData.get("href") as string;
    const filter = formData.get("filter") as string;
    const featured = formData.get("featured") === "on";
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !num || !tag || !title || !description || !href) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.project.update({
      where: { id },
      data: {
        num: num.trim(),
        tag: tag.trim(),
        tagColor: tagColor?.trim() || null,
        title: title.trim(),
        description: description.trim(),
        stack: parseStack(formData),
        href: href.trim(),
        filter: filter?.trim() || null,
        featured,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("projects");

    return { success: "Project berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update project." };
  }
}

export async function deleteProject(
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

    await prisma.project.delete({ where: { id } });

    updateTag("projects");

    return { success: "Project berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus project." };
  }
}
