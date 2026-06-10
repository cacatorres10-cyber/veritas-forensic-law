import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container, PageIntro } from '@/components/ui';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('contact');

  const info = [
    { label: t('office'), value: t('officeValue') },
    { label: t('phoneLabel'), value: t('phoneValue') },
    { label: t('emailLabel'), value: t('emailValue') },
    { label: t('hoursLabel'), value: t('hoursValue') },
  ];

  return (
    <div className="pt-32 lg:pt-40">
      <Container>
        <PageIntro
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="my-20 grid gap-10 lg:grid-cols-2">
          {/* Firm info */}
          <div>
            <div className="group mb-10 overflow-hidden rounded-3xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/gavel.jpg"
                alt=""
                loading="lazy"
                className="h-56 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
            <h2 className="eyebrow mb-8">{t('infoTitle')}</h2>
            <dl className="space-y-6">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-white/10 pb-6"
                >
                  <dt className="text-xs uppercase tracking-wider text-white/40">
                    {item.label}
                  </dt>
                  <dd className="mt-2 whitespace-pre-line text-lg text-white/80">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
