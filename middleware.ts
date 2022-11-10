import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked async if using await inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('refreshToken');
    const cookieA = request.cookies.get('isAccessAlive');

    console.log('REFRESF', cookie);
    console.log('ACCESS', cookieA);
    if (!cookieA) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/profile', '/profile/:path*'],
};