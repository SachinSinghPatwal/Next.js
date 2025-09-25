import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPaths =
    path == "/login" || path == "/signup" || path == "verifyEmail";

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPaths && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPaths && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verifyEmail",
    "/profile",
    "/profile/:path*",
  ],
};
