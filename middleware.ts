// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log all auth-related requests
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    console.log(`[${new Date().toISOString()}] Auth request:`, {
      path: request.nextUrl.pathname,
      method: request.method,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/auth/:path*",
};
