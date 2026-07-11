import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";

  const sessionCookie = request.cookies.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
