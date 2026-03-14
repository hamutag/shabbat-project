import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/onboarding",
  "/profile",
  "/progress",
  "/my-mitzvot",
  "/my-lessons",
];

// Routes that require admin/coordinator role
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get JWT token - try both Auth.js v5 (authjs) and legacy (next-auth) cookie names
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  let token = await getToken({
    req: request,
    secret,
    cookieName: "__Secure-authjs.session-token",
  });

  // Fallback: try without secure prefix (for non-HTTPS / development)
  if (!token) {
    token = await getToken({
      req: request,
      secret,
      cookieName: "authjs.session-token",
    });
  }

  // Fallback: try legacy next-auth cookie names
  if (!token) {
    token = await getToken({ req: request, secret });
  }

  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  // Check protected routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const adminRoles = ["CITY_COORD_MALE", "CITY_COORD_FEMALE", "NEIGHBORHOOD_HEAD", "CITY_HEAD", "REGION_HEAD", "NATIONAL_ADMIN"];
    if (!userRole || !adminRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
