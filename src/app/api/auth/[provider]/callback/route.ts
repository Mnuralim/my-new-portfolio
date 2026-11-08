import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchProfile, isProvider, redirectUri } from "@/lib/oauth";
import { safeReturnTo } from "@/lib/safe-return";
import { setUserSession } from "@/lib/user-session";

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  if (!isProvider(provider)) return new Response("Not found", { status: 404 });

  const jar = await cookies();
  const saved = jar.get("oauth_state")?.value ?? "";
  const dot = saved.indexOf(".");
  const savedState = dot === -1 ? "" : saved.slice(0, dot);
  const savedReturn = dot === -1 ? "/" : saved.slice(dot + 1);
  jar.delete({ name: "oauth_state", path: "/api/auth" });

  const returnTo = safeReturnTo(decodeURIComponent(savedReturn));
  const fail = `${returnTo}${returnTo.includes("?") ? "&" : "?"}authError=1`;

  const q = req.nextUrl.searchParams;
  const code = q.get("code");
  // state must match the cookie set when login started (CSRF); user cancel arrives as ?error=access_denied
  if (!code || q.get("error") || !savedState || q.get("state") !== savedState) redirect(fail);

  let userId: string;
  try {
    const profile = await fetchProfile(provider, code, redirectUri(provider, req.nextUrl.origin));
    const user = await prisma.user.upsert({
      where: { provider_providerId: { provider, providerId: profile.providerId } },
      update: { name: profile.name, email: profile.email, image: profile.image },
      create: { provider, ...profile },
    });
    userId = user.id;
  } catch (err) {
    console.error(err);
    redirect(fail);
  }

  await setUserSession(userId);
  redirect(returnTo);
}
