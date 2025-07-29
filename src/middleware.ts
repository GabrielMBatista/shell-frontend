import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = [
  '/auth/signin',
  '/register',
  '/about',
  '/home',
  '/about',
  '/contact',
  '/projects',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[Middleware] Request pathname:', pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  console.log('[Middleware] Token:', token);

  const isAuthenticated = !!token;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (publicPath) => pathname === publicPath || pathname.startsWith(`${publicPath}/`),
  );

  if (!isPublicRoute && !isAuthenticated) {
    console.log('[Middleware] Não autenticado. Redirecionando para /auth/signin');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
