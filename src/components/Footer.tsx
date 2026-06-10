import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const services = useTranslations('services');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand + social */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl font-bold italic text-white"
            >
              Veritas<span className="text-gold">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {t('tagline')}
            </p>
            <div className="mt-6 flex gap-3">
              {['in', 'X', '@'].map((s) => (
                <span
                  key={s}
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs text-white/50 transition-colors hover:border-gold hover:text-gold-light"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label={t('exploreTitle')}>
            <h3 className="eyebrow mb-4">{t('exploreTitle')}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-gold-light">
                  {nav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-light">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href="/board" className="hover:text-gold-light">
                  {nav('board')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-light">
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t('servicesTitle')}>
            <h3 className="eyebrow mb-4">{t('servicesTitle')}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>{services('forensicAccounting.title')}</li>
              <li>{services('digitalForensics.title')}</li>
              <li>{services('expertTestimony.title')}</li>
              <li>{services('litigationSupport.title')}</li>
            </ul>
          </nav>

          {/* Digest */}
          <div>
            <h3 className="eyebrow mb-4">{t('digestTitle')}</h3>
            <p className="mb-4 text-sm text-white/50">{t('digestSubtitle')}</p>
            <form className="flex items-center gap-2">
              <label htmlFor="digest-email" className="sr-only">
                {t('digestPlaceholder')}
              </label>
              <input
                id="digest-email"
                type="email"
                placeholder={t('digestPlaceholder')}
                className="field !rounded-full !py-2 text-xs"
              />
              <button
                type="submit"
                aria-label={t('digestSubmit')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold-light"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Veritas Forensic Law. {t('rights')}
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white/70">{t('privacy')}</span>
            <span className="hover:text-white/70">{t('terms')}</span>
          </div>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-white/30">
          {t('disclaimer')}
        </p>
      </div>
    </footer>
  );
}
