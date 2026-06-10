import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container, PageIntro, Eyebrow } from '@/components/ui';
import { SERVICE_KEYS, SERVICE_ICON, SERVICE_IMAGE, VALUE_KEYS } from '@/lib/content';

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('about');
  const s = useTranslations('services');

  return (
    <div className="pt-32 lg:pt-40">
      <Container>
        <PageIntro
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('intro')}
        />

        {/* Banner image */}
        <div className="group mt-12 overflow-hidden rounded-[2.5rem] border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/columns.jpg"
            alt=""
            loading="lazy"
            className="h-64 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 sm:h-80 lg:h-96"
          />
        </div>

        {/* Approach */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="group overflow-hidden rounded-3xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/office-desk.jpg"
              alt=""
              loading="lazy"
              className="h-64 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          </div>
          <div>
            <Eyebrow>{t('missionTitle')}</Eyebrow>
            <p className="mt-6 font-serif text-2xl italic leading-relaxed text-white/80">
              {t('missionBody')}
            </p>
          </div>
        </div>

        {/* Values */}
        <section className="mt-24">
          <h2 className="font-serif text-3xl italic text-white">
            {t('valuesTitle')}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_KEYS.map((key) => (
              <div key={key} className="glass glass-hover rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-gold-light">
                  {t(`values.${key}Title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {t(`values.${key}Body`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services in detail */}
        <section className="mt-24">
          <h2 className="font-serif text-3xl italic text-white">
            {t('servicesTitle')}
          </h2>
          <div className="mt-10 space-y-5">
            {SERVICE_KEYS.map((key, i) => (
              <div
                key={key}
                className="glass glass-hover group grid gap-6 overflow-hidden rounded-3xl p-4 sm:p-6 lg:grid-cols-[220px_1fr] lg:items-center lg:gap-8"
              >
                {/* Thematic photo */}
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SERVICE_IMAGE[key]}
                    alt=""
                    loading="lazy"
                    className="h-40 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 lg:h-44"
                  />
                </div>
                <div className="px-2 pb-2 lg:px-0 lg:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-xl text-gold-light">
                      {SERVICE_ICON[key]}
                    </div>
                    <span className="font-serif text-2xl italic text-white/30">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {s(`${key}.title`)}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-white/55">
                    {s(`${key}.detail`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="my-24">
          <div className="glass flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
            <h2 className="font-serif text-2xl italic text-white">
              {t('ctaTitle')}
            </h2>
            <Link href="/appointments" className="btn-gold shrink-0">
              {t('ctaButton')}
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
