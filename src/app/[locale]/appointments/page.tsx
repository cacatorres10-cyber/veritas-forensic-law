import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container, PageIntro } from '@/components/ui';
import { BookingForm } from '@/components/forms/BookingForm';

export default function AppointmentsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('appointments');

  return (
    <div className="pt-32 lg:pt-40">
      <Container>
        <PageIntro
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
        <div className="mx-auto my-16 grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="group hidden overflow-hidden rounded-[2rem] border border-white/10 lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/meeting.jpg"
              alt=""
              loading="lazy"
              className="h-full min-h-[28rem] w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          </div>
          <BookingForm />
        </div>
      </Container>
    </div>
  );
}
