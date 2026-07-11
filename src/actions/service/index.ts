"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";

export async function getAllServicesRaw() {
  "use cache";
  cacheTag("services");
  cacheLife("weeks");

  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function getAllServices(params: ServiceParams) {
  "use cache";
  cacheTag("services");
  cacheLife("weeks");

  const where: Prisma.ServiceWhereInput = {};

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { description: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [services, totalCount] = await Promise.all([
    prisma.service.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.service.count({ where }),
  ]);

  return {
    services,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

export async function createService(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const icon = formData.get("icon") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!icon || !title || !description) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.service.create({
      data: {
        icon: icon.trim(),
        title: title.trim(),
        description: description.trim(),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("services");

    return { success: "Layanan berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat layanan." };
  }
}

export async function updateService(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const icon = formData.get("icon") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !icon || !title || !description) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.service.update({
      where: { id },
      data: {
        icon: icon.trim(),
        title: title.trim(),
        description: description.trim(),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("services");

    return { success: "Layanan berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update layanan." };
  }
}

export async function deleteService(
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

    await prisma.service.delete({ where: { id } });

    updateTag("services");

    return { success: "Layanan berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus layanan." };
  }
}
