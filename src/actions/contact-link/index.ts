"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";

export async function getAllContactLinksRaw() {
  "use cache";
  cacheTag("contact-links");
  cacheLife("weeks");

  return prisma.contactLink.findMany({ orderBy: { order: "asc" } });
}

export async function getAllContactLinks(params: ContactLinkParams) {
  "use cache";
  cacheTag("contact-links");
  cacheLife("weeks");

  const where: Prisma.ContactLinkWhereInput = {};

  if (params.search) {
    where.OR = [
      { label: { contains: params.search } },
      { href: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [contactLinks, totalCount] = await Promise.all([
    prisma.contactLink.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.contactLink.count({ where }),
  ]);

  return {
    contactLinks,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

export async function createContactLink(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const label = formData.get("label") as string;
    const href = formData.get("href") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!label || !href) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.contactLink.create({
      data: {
        label: label.trim(),
        href: href.trim(),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("contact-links");

    return { success: "Kontak berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat kontak." };
  }
}

export async function updateContactLink(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const label = formData.get("label") as string;
    const href = formData.get("href") as string;
    const order = formData.get("order") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id || !label || !href) {
      return { formData, error: "Semua field wajib diisi." };
    }

    await prisma.contactLink.update({
      where: { id },
      data: {
        label: label.trim(),
        href: href.trim(),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    updateTag("contact-links");

    return { success: "Kontak berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update kontak." };
  }
}

export async function deleteContactLink(
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

    await prisma.contactLink.delete({ where: { id } });

    updateTag("contact-links");

    return { success: "Kontak berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus kontak." };
  }
}
