import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/home', '/login', '/register', '/about', '/chatbot']; // 🔥 Adicione aqui as rotas públicas

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('🛡️ Middleware executando na rota:', pathname);

  const token = request.cookies.get('token')?.value;
  const isAuthenticated = Boolean(token);

  const isPublicRoute = PUBLIC_ROUTES.some(
    (publicPath) => pathname === publicPath || pathname.startsWith(`${publicPath}/`),
  );

  if (!isPublicRoute && !isAuthenticated) {
    console.log('🔒 Acesso não autorizado. Redirecionando para /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ Acesso permitido
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 🌟 Executa em todas as rotas, exceto API e arquivos estáticos
    '/((?!api|_next|.*\\..*).*)',
  ],
};
