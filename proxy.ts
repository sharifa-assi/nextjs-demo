import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith('/books') ||
    pathname.startsWith('/authors') ||
    pathname.startsWith('/publishers');

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/books', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/books/:path*',
    '/authors/:path*',
    '/publishers/:path*',
    '/login',
  ],
};
