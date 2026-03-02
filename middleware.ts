import { NextResponse, type NextRequest } from "next/server";
import { createAuthMiddleware } from "@eximia/auth/server";

const handleAuth = createAuthMiddleware({
  publicRoutes: [],
  authRoutes: ["/login", "/auth/callback"],
  loginUrl: "/login",
  afterLoginUrl: "/",
  appId: "psyche-dashboard",
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".eximiaventures.com.br",
  authPortalUrl: process.env.NEXT_PUBLIC_AUTH_PORTAL_URL || "https://auth.eximiaventures.com.br",
});

export async function middleware(request: NextRequest) {
  return handleAuth(request, {
    createNextResponse: (req) => NextResponse.next({ request: req as NextRequest }),
    redirect: (url) => NextResponse.redirect(url),
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|favicon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
