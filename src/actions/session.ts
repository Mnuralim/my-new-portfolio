import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { encrypt, decrypt } from "@/lib/jwt";

export { decrypt };

async function setSessionCookie(adminId: string, email: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ adminId, email, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function createSession(adminId: string, email: string) {
  await setSessionCookie(adminId, email);
  redirect("/admin");
}

export async function refreshSession(adminId: string, email: string) {
  await setSessionCookie(adminId, email);
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
