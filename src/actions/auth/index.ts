"use server";

import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  deleteSession,
  getSession,
  refreshSession,
} from "../session";
import { redirect } from "next/navigation";

export async function login(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { formData, error: "Email dan password harus diisi." };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return { formData, error: "Email atau password salah." };
  }

  const matchPassword = await compare(password, admin.password);

  if (!matchPassword) {
    return { formData, error: "Email atau password salah." };
  }

  await createSession(admin.id, admin.email);

  return { formData, error: null, success: "Login berhasil." };
}

export async function logOut() {
  await deleteSession();
  redirect("/login");
}

export async function changePassword(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const session = await getSession();
  if (!session) {
    return { formData, error: "Tidak punya akses." };
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { formData, error: "Semua field wajib diisi." };
  }

  if (newPassword.length < 6) {
    return { formData, error: "Password baru minimal 6 karakter." };
  }

  if (newPassword !== confirmPassword) {
    return { formData, error: "Konfirmasi password tidak cocok." };
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.adminId },
  });

  if (!admin) {
    return { formData, error: "Admin tidak ditemukan." };
  }

  const matchPassword = await compare(currentPassword, admin.password);
  if (!matchPassword) {
    return { formData, error: "Password saat ini salah." };
  }

  const hashedPassword = await hash(newPassword, 10);

  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: hashedPassword },
  });

  return { formData, error: null, success: "Password berhasil diubah." };
}

export async function changeEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const newEmail = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  const session = await getSession();
  if (!session) {
    return { formData, error: "Tidak punya akses." };
  }

  if (!newEmail || !password) {
    return { formData, error: "Semua field wajib diisi." };
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.adminId },
  });

  if (!admin) {
    return { formData, error: "Admin tidak ditemukan." };
  }

  const matchPassword = await compare(password, admin.password);
  if (!matchPassword) {
    return { formData, error: "Password salah." };
  }

  if (newEmail !== admin.email) {
    const existing = await prisma.admin.findUnique({
      where: { email: newEmail },
    });
    if (existing) {
      return { formData, error: "Email sudah digunakan." };
    }
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { email: newEmail },
  });

  await refreshSession(admin.id, newEmail);

  return { formData, error: null, success: "Email berhasil diubah." };
}
