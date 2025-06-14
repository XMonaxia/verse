import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/article"];
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const token = req.cookies.get("token")?.value;
  if (!isProtected) return NextResponse.next();
  if (!token) {
    console.warn("Akses tanpa token, redirect ke halaman utama.");
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/article/:path*", "/article"],
};