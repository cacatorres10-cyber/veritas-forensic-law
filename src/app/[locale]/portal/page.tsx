import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container, Eyebrow } from '@/components/ui';
import { ChatWidget } from '@/components/ChatWidget';
import { LogoutButton } from '@/components/forms/LogoutButton';
import { CASE_FILES, DEMO_CLIENT_NAME } from '@/lib/demo-data';

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
  IN_REVIEW: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  DISCOVERY: 'border-purple-400/30 bg-purple-400/10 text-purple-200',
  AWAITING_COURT: 'border-gold/40 bg-gold/10 text-gold-light',
  CLOSED: 'border-white/15 bg-white/5 text-white/50',
};

const DAY = 24 * 60 * 60 * 1000;

export default function PortalPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('portal');

  const dateFmt = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const statusLabel = (s: string) =>
    t.has(`status.${s}`) ? t(`status.${s}`) : s;

  return (
    <div className="pt-32 lg:pt-40">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{t('badge')}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl italic text-white">
              {t('welcome', { name: DEMO_CLIENT_NAME })}
            </h1>
            <p className="mt-3 text-white/55">{t('dashboardSubtitle')}</p>
          </div>
          <LogoutButton />
        </div>

        <div className="my-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <section>
            <h2 className="font-serif text-2xl italic text-white">
              {t('casesTitle')}
            </h2>
            <p className="mt-1 text-sm text-white/50">{t('casesSubtitle')}</p>

            <div className="mt-6 space-y-4">
              {CASE_FILES.map((c) => (
                <article key={c.caseNumber} className="glass glass-hover rounded-3xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40">
                        {t('caseNumber')} {c.caseNumber}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold text-white">
                        {c.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                        STATUS_STYLES[c.status] ?? STATUS_STYLES.CLOSED
                      }`}
                    >
                      {statusLabel(c.status)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {c.summary}
                  </p>
                  <p className="mt-4 text-xs text-white/35">
                    {t('lastUpdated', {
                      date: dateFmt.format(new Date(Date.now() - c.updatedDaysAgo * DAY)),
                    })}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-24">
            <ChatWidget />
          </aside>
        </div>
      </Container>
    </div>
  );
}
