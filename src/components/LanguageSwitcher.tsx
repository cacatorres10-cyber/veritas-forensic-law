'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

// Toggle between EN / ES. Navigating via the locale-aware router lets the
// next-intl middleware persist the choice in the NEXT_LOCALE cookie.
export function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // Preserve any dynamic route params while swapping the locale.
      router.replace(
        // @ts-expect-error -- params are passed through unchanged
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t('language')}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px] font-medium uppercase tracking-wider"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 transition-colors duration-300 ${
              active
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-gold-light'
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
