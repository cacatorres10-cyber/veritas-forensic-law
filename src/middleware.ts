import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Adds the locale prefix, negotiates locale, and persists the user's choice
// in the NEXT_LOCALE cookie (handled by next-intl automatically).
export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next internals and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
