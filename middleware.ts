// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const url = req.nextUrl.clone();

    if (!token) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    const { role } = token;

    // /admin → only admin
    if (url.pathname.startsWith('/admin') && role !== 'admin') {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
    }

    // /dashboard → admin and user
    if (
        url.pathname.startsWith('/dashboard') &&
        !(typeof role === 'string' && ['admin', 'user'].includes(role))
    ) {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'],
};
