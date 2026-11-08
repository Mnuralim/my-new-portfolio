"use server";

import { prisma } from "@/lib/prisma";
import { clearUserSession, getUserId } from "@/lib/user-session";

export type PublicUser = { id: string; name: string; image: string | null };

// email is never returned to the client
export async function getCurrentUser(): Promise<PublicUser | null> {
  const id = await getUserId();
  if (!id) return null;
  return prisma.user.findUnique({ where: { id }, select: { id: true, name: true, image: true } });
}

export async function signOut() {
  await clearUserSession();
}
