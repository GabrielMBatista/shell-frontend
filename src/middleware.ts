import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)'],
// };
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};