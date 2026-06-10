'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/board', key: 'board' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass border-x-0 border-t-0">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold italic tracking-tight text-white"
            onClick={() => setOpen(false)}
          >
            Veritas<span className="text-gold">.</span>
          </Link>

          {/* Center links (desktop) */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                      active ? 'text-gold-light' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right cluster (desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/portal"
              className="text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              {t('portal')}
            </Link>
            <Link href="/appointments" className="btn-solid !px-5 !py-2">
              {t('cta')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex h-6 w-6 flex-col items-center justify-center gap-1.5">
              <span
                className={`h-px w-5 bg-white transition-transform duration-300 ${
                  open ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-5 bg-white transition-transform duration-300 ${
                  open ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass border-x-0 border-t-0 lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {[...NAV_LINKS, { href: '/portal', key: 'portal' } as const].map(
              (link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm uppercase tracking-[0.2em] text-white/70 hover:text-gold-light"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              )
            )}
            <li className="mt-3 flex items-center justify-between">
              <LanguageSwitcher />
              <Link
                href="/appointments"
                onClick={() => setOpen(false)}
                className="btn-solid !px-5 !py-2"
              >
                {t('cta')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
