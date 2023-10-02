import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const cookie = req.cookies.get("USER") ;


    if (req.nextUrl.pathname.startsWith('/home') && !cookie) {
        // Redirect to login page if the cookie is missing
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth`
        );
    }

  /*  if ((req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname === '/') && cookie) {
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home`
        );
    }*/



    return response;
}

export const config = {
    matcher: ['/', '/home', '/login']

};