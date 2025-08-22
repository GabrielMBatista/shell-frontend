import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = [
  '/auth/signin',
  '/about',
  '/home',
  '/contact',
  '/projects',
  '/Resume_Gabriel_Marques.pdf',
];

const BLOCKED_PATHS = [
  '/wp-admin',
  '/wordpress',
  '/phpmyadmin',
  '/xmlrpc.php',
  '/setup-config.php',
  '/robots.txt',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[Middleware] Request pathname:', pathname);

  //Bloquear scanners/bots
  const isBlockedPath = BLOCKED_PATHS.some((blockedPath) => pathname.startsWith(blockedPath));
  if (isBlockedPath) {
    console.warn(`[Middleware] Acesso bloqueado a rota suspeita: ${pathname}`);
    return new NextResponse('Not Found', { status: 404 });
  }

  //Proteção por autenticação
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

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
  matcher: [
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\.js|.*\\.css|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot|scripts\\.clarity\\.ms).*)',
  ],
};
