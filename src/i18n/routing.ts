import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Supported locales — English and Spanish.
  locales: ['en', 'es'],
  defaultLocale: 'en',
  // Always prefix URLs with the locale (e.g. /en/..., /es/...).
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
