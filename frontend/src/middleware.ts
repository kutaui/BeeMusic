import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const cookie = req.cookies.get("USER") ;

    console.log('middleware', cookie);

    if (req.nextUrl.pathname.startsWith('/home') && !cookie) {
        // Redirect to login page if the cookie is missing
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth`
        );
    }

    if (req.nextUrl.pathname.startsWith('/auth') && cookie) {
        // Redirect to dashboard if the cookie is present
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home`
        );
    }

    return response;
}

export const config = {
    matcher: ['/', '/home', '/auth']

};