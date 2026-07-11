"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";

export async function getAllSkillsRaw() {
  "use cache";
  cacheTag("skills");
  cacheLife("weeks");

  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function getAllSkills(params: SkillParams) {
  "use cache";
  cacheTag("skills");
  cacheLife("weeks");

  const where: Prisma.SkillWhereInput = {};

  if (params.search) {
    where.OR = [
      { category: { contains: params.search } },
      { name: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [skills, totalCount] = await Promise.all([
    prisma.skill.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.skill.count({ where }),
  ]);

  return {
    skills,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

export async function createSkill(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const category = formData.get("category") as string;
    const name = formData.get("name") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!category || !name) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.skill.create({
      data: {
        category: category.trim(),
        name: name.trim(),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("skills");

    return { success: "Skill berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat skill." };
  }
}

export async function updateSkill(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const category = formData.get("category") as string;
    const name = formData.get("name") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !category || !name) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.skill.update({
      where: { id },
      data: {
        category: category.trim(),
        name: name.trim(),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("skills");

    return { success: "Skill berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update skill." };
  }
}

export async function deleteSkill(
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

    await prisma.skill.delete({ where: { id } });

    updateTag("skills");

    return { success: "Skill berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus skill." };
  }
}
