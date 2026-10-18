"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { getSession } from "../session";

const KINDS = ["EDUCATION", "CERTIFICATION", "PUBLICATION"];

export async function getAllCredentialsRaw() {
  "use cache";
  cacheTag("credentials");
  cacheLife("weeks");

  return prisma.credential.findMany({ orderBy: { order: "asc" } });
}

export async function getAllCredentials(params: CredentialParams) {
  "use cache";
  cacheTag("credentials");
  cacheLife("weeks");

  const where: Prisma.CredentialWhereInput = {};

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { issuer: { contains: params.search } },
      { kind: { contains: params.search } },
    ];
  }

  const take = params.take ? parseInt(params.take) : 10;
  const skip = params.skip ? parseInt(params.skip) : 0;

  const [credentials, totalCount] = await Promise.all([
    prisma.credential.findMany({
      where,
      orderBy: {
        [params.sortBy ?? "order"]: params.sortOrder ?? "asc",
      },
      take,
      skip,
    }),
    prisma.credential.count({ where }),
  ]);

  return {
    credentials,
    totalCount,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(totalCount / take),
    itemsPerPage: take,
  };
}

function readFields(formData: FormData) {
  const kind = formData.get("kind") as string;
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const period = formData.get("period") as string;
  const note = formData.get("note") as string;
  const order = formData.get("order") as string;
  const url = (formData.get("url") as string)?.trim();

  if (!KINDS.includes(kind) || !title?.trim() || !issuer?.trim()) return null;
  // rendered as href on the public page, so only allow http(s)
  if (url && !/^https?:\/\//i.test(url)) return null;

  return {
    kind,
    title: title.trim(),
    issuer: issuer.trim(),
    period: period?.trim() || null,
    note: note?.trim() || null,
    url: url || null,
    order: order ? parseInt(order, 10) : 0,
  };
}

export async function createCredential(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    const data = readFields(formData);
    if (!data) {
      return { formData, error: "Kind, title, dan issuer wajib diisi. URL harus diawali http(s)://." };
    }

    await prisma.credential.create({ data });

    updateTag("credentials");

    return { success: "Credential berhasil dibuat.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat membuat credential." };
  }
}

export async function updateCredential(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;

    const session = await getSession();
    if (!session) {
      return { formData, error: "Tidak punya akses." };
    }

    const data = readFields(formData);
    if (!id || !data) {
      return { formData, error: "Kind, title, dan issuer wajib diisi. URL harus diawali http(s)://." };
    }

    await prisma.credential.update({ where: { id }, data });

    updateTag("credentials");

    return { success: "Credential berhasil diperbarui.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat update credential." };
  }
}

export async function deleteCredential(
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

    await prisma.credential.delete({ where: { id } });

    updateTag("credentials");

    return { success: "Credential berhasil dihapus.", error: null, formData };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan saat menghapus credential." };
  }
}
