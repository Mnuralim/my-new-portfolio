import { imagekit } from "@/lib/imagekit";
import { NextResponse } from "next/server";
import { getSession } from "@/actions/session";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized - No session found" },
      { status: 401 }
    );
  }

  const authenticationParameters = imagekit.getAuthenticationParameters();

  return NextResponse.json({
    ...authenticationParameters,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  });
}
