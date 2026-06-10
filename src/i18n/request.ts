import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Loads the right message catalog for the active request locale.
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Fall back to the default locale if the requested one is unsupported.
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
