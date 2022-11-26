import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('refreshToken');
    if (!cookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/profile', '/profile/:path*'],
};