'use client';

import { useLocale, useTranslations } from 'next-intl';
import { WHATSAPP_NUMBER } from '@/lib/config';

// Floating WhatsApp contact button, fixed to the bottom-right on every page.
export function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  // useLocale ensures the prefilled message follows the active language.
  useLocale();

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('message')
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('label')}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      {/* Tooltip (desktop hover) */}
      <span className="hidden -translate-x-2 rounded-full border border-white/10 bg-base/80 px-4 py-2 text-sm text-white/80 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        {t('tooltip')}
      </span>

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:scale-105">
        {/* breathing ring */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        <svg
          viewBox="0 0 32 32"
          className="relative h-7 w-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 0h-.008C7.174 0 .006 7.17.006 16c0 3.5 1.13 6.74 3.05 9.38L1.06 31.4l6.22-1.99A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.83 32 16S24.83 0 16.004 0Zm9.31 22.6c-.386 1.09-1.92 1.99-3.14 2.25-.834.18-1.92.32-5.59-1.2-4.69-1.94-7.71-6.71-7.95-7.02-.23-.31-1.9-2.53-1.9-4.83 0-2.3 1.17-3.43 1.59-3.9.386-.43.84-.54 1.12-.54.28 0 .56.003.8.014.26.012.6-.098.94.72.386.93 1.31 3.23 1.43 3.46.117.23.196.5.04.81-.156.31-.234.5-.47.77-.235.27-.49.6-.7.81-.235.23-.48.49-.206.95.273.46 1.21 2 2.6 3.24 1.79 1.59 3.3 2.08 3.77 2.31.47.23.74.196 1.02-.117.273-.31 1.18-1.37 1.49-1.84.31-.47.62-.39 1.05-.235.43.156 2.72 1.28 3.19 1.51.47.235.78.351.9.546.117.196.117 1.13-.27 2.22Z" />
        </svg>
      </span>
    </a>
  );
}
