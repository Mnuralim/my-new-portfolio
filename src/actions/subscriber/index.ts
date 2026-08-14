"use server";

import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeNewsletter(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const email = (formData.get("email") as string)?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return { formData, error: "Email tidak valid." };
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return { formData, error: "Email ini sudah terdaftar." };
    }

    await prisma.subscriber.create({ data: { email } });

    return { success: "Berhasil subscribe! Makasih ya.", error: null, formData: undefined };
  } catch (err) {
    console.error(err);
    return { formData, error: "Terjadi kesalahan, coba lagi." };
  }
}
