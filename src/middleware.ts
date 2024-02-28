import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (["/signin", "/signup"].includes(request.nextUrl.pathname)) {
    if (session?.value) {
      NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/dashboard') {
    if (session?.value) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
