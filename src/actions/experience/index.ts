"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";

export async function getAllExperiencesRaw() {
  "use cache";
  cacheTag("experiences");
  cacheLife("weeks");

  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getAllExperiences(params: ExperienceParams) {
  "use cache";
  cacheTag("experiences");
  cacheLife("weeks");

  const where: Prisma.ExperienceWhereInput = {};

  if (params.search) {
    where.OR = [
      { company: { contains: params.search } },
      { role: { contains: params.search } },
      { period: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [experiences, totalCount] = await Promise.all([
    prisma.experience.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.experience.count({ where }),
  ]);

  return {
    experiences,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

function parseTags(formData: FormData): string[] {
  const raw = formData.get("tags") as string;
  return raw
    ? raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
}

export async function createExperience(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const num = formData.get("num") as string;
    const period = formData.get("period") as string;
    const company = formData.get("company") as string;
    const type = formData.get("type") as string;
    const role = formData.get("role") as string;
    const description = formData.get("description") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!num || !period || !company || !type || !role || !description) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.experience.create({
      data: {
        num: num.trim(),
        period: period.trim(),
        company: company.trim(),
        type: type.trim(),
        role: role.trim(),
        description: description.trim(),
        tags: parseTags(formData),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("experiences");

    return { success: "Pengalaman berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat pengalaman." };
  }
}

export async function updateExperience(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const num = formData.get("num") as string;
    const period = formData.get("period") as string;
    const company = formData.get("company") as string;
    const type = formData.get("type") as string;
    const role = formData.get("role") as string;
    const description = formData.get("description") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !num || !period || !company || !type || !role || !description) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.experience.update({
      where: { id },
      data: {
        num: num.trim(),
        period: period.trim(),
        company: company.trim(),
        type: type.trim(),
        role: role.trim(),
        description: description.trim(),
        tags: parseTags(formData),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("experiences");

    return {
      success: "Pengalaman berhasil diperbarui.",
      error: null,
      formData,
    };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update pengalaman." };
  }
}

export async function deleteExperience(
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

    await prisma.experience.delete({ where: { id } });

    updateTag("experiences");

    return {
      success: "Pengalaman berhasil dihapus.",
      error: null,
      formData,
    };
  } catch (err) {
    console.error(err);
    return {
      formData,
      error: "Terjadi kesalahan saat menghapus pengalaman.",
    };
  }
}
