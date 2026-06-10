import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container, Eyebrow } from '@/components/ui';
import { HeroVisual } from '@/components/HeroVisual';
import {
  SERVICE_KEYS,
  SERVICE_ICON,
  SERVICE_IMAGE,
  STAT_KEYS,
  STAT_VALUES,
  CREDENTIAL_KEYS,
} from '@/lib/content';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const s = useTranslations('services');

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative pt-32 lg:pt-40">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Eyebrow>{t('badge')}</Eyebrow>
              {/* Live notification pill */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-green-400">
                  {t('live')}
                </span>
                <span className="text-xs text-white/70">{t('liveStatus')}</span>
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] italic leading-[1.05] text-white">
              {t('heroLineOne')}{' '}
              <span className="text-gradient-gold">{t('heroHighlight')}</span>{' '}
              {t('heroLineTwo')}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              {t('heroSubtitle')}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/appointments" className="btn-solid">
                {t('ctaPrimary')}
              </Link>
              <Link href="/about" className="btn-outline">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          <HeroVisual labels={SERVICE_KEYS.map((k) => s(`${k}.title`))} />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Trust stats                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24">
        <Container>
          <p className="text-center text-sm uppercase tracking-[0.25em] text-white/40">
            {t('trustTitle')}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-4">
            {STAT_KEYS.map((key) => (
              <div key={key} className="bg-base/80 px-6 py-10 text-center">
                <p className="font-serif text-4xl italic text-gradient-gold">
                  {STAT_VALUES[key]}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/50">
                  {t(`stats.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Services grid                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t('servicesTitle')}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl italic text-white sm:text-4xl">
              {t('servicesSubtitle')}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_KEYS.map((key) => (
              <div
                key={key}
                className="glass glass-hover group overflow-hidden rounded-3xl"
              >
                {/* Thematic photo */}
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SERVICE_IMAGE[key]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-xl text-gold-light transition-transform duration-300 group-hover:scale-110">
                    {SERVICE_ICON[key]}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {s(`${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {s(`${key}.summary`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Credentials                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24">
        <Container>
          <div className="glass rounded-[2.5rem] p-10 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <Eyebrow>{t('credentialsTitle')}</Eyebrow>
                <p className="mt-6 text-xl leading-relaxed text-white/70">
                  {t('credentialsSubtitle')}
                </p>
                <div className="group mt-8 overflow-hidden rounded-3xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/courthouse.jpg"
                    alt=""
                    loading="lazy"
                    className="h-56 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {CREDENTIAL_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <span className="mt-0.5 text-gold">◆</span>
                    <span className="text-sm leading-relaxed text-white/70">
                      {t(`credentials.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-12 pt-8">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-gradient-to-b from-white/[0.04] to-transparent p-12 text-center lg:p-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
            <h2 className="relative font-serif text-3xl italic text-white sm:text-4xl">
              {t('finalCtaTitle')}
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-white/60">
              {t('finalCtaSubtitle')}
            </p>
            <div className="relative mt-8 flex justify-center">
              <Link href="/appointments" className="btn-gold">
                {t('finalCtaButton')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
