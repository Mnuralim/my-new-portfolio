"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";
import { deleteImageKitByUrl } from "@/lib/imagekit";

export async function getAllCvsRaw() {
  "use cache";
  cacheTag("cvs");
  cacheLife("weeks");

  return prisma.cv.findMany({ orderBy: { order: "asc" } });
}

export async function getAllCvs(params: CvParams) {
  "use cache";
  cacheTag("cvs");
  cacheLife("weeks");

  const where: Prisma.CvWhereInput = {};

  if (params.search) {
    where.title = { contains: params.search };
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [cvs, totalCount] = await Promise.all([
    prisma.cv.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.cv.count({ where }),
  ]);

  return {
    cvs,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

// fileUrl is rendered as href/iframe src: only http(s) uploads or site-relative files (e.g. /cv.pdf)
function readFields(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const fileUrl = (formData.get("fileUrl") as string)?.trim();
  const order = formData.get("order") as string;

  if (!title || !fileUrl || !/^(https?:\/\/|\/(?!\/))/i.test(fileUrl)) return null;

  return { title, fileUrl, order: order ? parseInt(order, 10) : 0 };
}

// only remote uploads live in ImageKit; never look up local files like /cv.pdf there
async function deleteUploaded(url: string) {
  if (/^https?:\/\//i.test(url)) await deleteImageKitByUrl(url).catch(() => {});
}

export async function createCv(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    const data = readFields(formData);
    if (!data) {
      return { formData, error: "Judul dan file PDF wajib diisi." };
    }

    await prisma.cv.create({ data });

    updateTag("cvs");

    return { success: "CV berhasil ditambahkan.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menambah CV." };
  }
}

export async function updateCv(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const id = formData.get("id") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    const data = readFields(formData);
    if (!id || !data) {
      return { formData, error: "Judul dan file PDF wajib diisi." };
    }

    const cv = await prisma.cv.findUnique({ where: { id } });
    if (!cv) {
      return { formData, error: "CV tidak ditemukan." };
    }

    await prisma.cv.update({ where: { id }, data });

    if (cv.fileUrl !== data.fileUrl) await deleteUploaded(cv.fileUrl);

    updateTag("cvs");

    return { success: "CV berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update CV." };
  }
}

export async function deleteCv(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const id = formData.get("id") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    if (!id) {
      return { formData, error: "ID tidak valid." };
    }

    const cv = await prisma.cv.delete({ where: { id } });
    await deleteUploaded(cv.fileUrl);

    updateTag("cvs");

    return { success: "CV berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus CV." };
  }
}
