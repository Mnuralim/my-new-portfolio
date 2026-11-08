import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { authorizeUrl, isConfigured, isProvider, redirectUri } from "@/lib/oauth";
import { safeReturnTo } from "@/lib/safe-return";

// GET /api/auth/google?returnTo=/blog/slug  (same for github)
export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  if (!isProvider(provider)) return new Response("Not found", { status: 404 });
  if (!isConfigured(provider)) return new Response("Login ini belum dikonfigurasi.", { status: 503 });

  const state = crypto.randomUUID();
  const returnTo = safeReturnTo(req.nextUrl.searchParams.get("returnTo"));

  (await cookies()).set("oauth_state", `${state}.${encodeURIComponent(returnTo)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/api/auth",
  });

  redirect(authorizeUrl(provider, redirectUri(provider, req.nextUrl.origin), state));
}
