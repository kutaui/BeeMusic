import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const cookie = req.cookies.get("USER");

  if (req.nextUrl.pathname.endsWith("/user")) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home`
    );
  }

  if (req.nextUrl.pathname.startsWith("/user") && !cookie) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
    );
  }

  if (req.nextUrl.pathname.startsWith("/home") && !cookie) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
    );
  }

  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    cookie
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home`
    );
  }

  if (req.nextUrl.pathname.startsWith("/[username]") && !cookie) {
    // Redirect to login page if the cookie is missing
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
    );
  }

  return response;
}

export const config = {
  matcher: ["/", "/home", "/login", "/register", "/user", "/user/:username"],
};
