import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

// Different key from lib/jwt.ts on purpose: the admin proxy only checks that the `session`
// cookie verifies, so a reader token signed with the admin key could be pasted in as an admin session.
const key = new TextEncoder().encode(`${process.env.SECRET_KEY}:reader`);
const COOKIE = "user_session";
const MAX_AGE = 60 * 60 * 24 * 30;

export async function setUserSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(key);

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function getUserId(): Promise<string | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null;
  }
}

export async function clearUserSession() {
  (await cookies()).delete(COOKIE);
}
