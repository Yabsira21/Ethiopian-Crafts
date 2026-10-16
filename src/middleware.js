import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/session";

// Runs before the matched routes below.
// - /login: logged-in users are sent home
// - /checkout, /order-success: any logged-in user
// - /admin: admin role only
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;

  if (pathname === "/login") {
    return session ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/checkout", "/order-success", "/admin/:path*"],
};
