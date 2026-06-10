import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container, PageIntro } from '@/components/ui';
import { AskForm } from '@/components/forms/AskForm';
import { BOARD_POSTS } from '@/lib/demo-data';

const PAGE_SIZE = 5;
const DAY = 24 * 60 * 60 * 1000;

export default function BoardPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { page?: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('board');
  const c = useTranslations('common');

  const total = BOARD_POSTS.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(searchParams.page) || 1), totalPages);
  const posts = BOARD_POSTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const dateFmt = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formatDate = (daysAgo: number) =>
    dateFmt.format(new Date(Date.now() - daysAgo * DAY));

  return (
    <div className="pt-32 lg:pt-40">
      <Container>
        <PageIntro
          eyebrow={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="my-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <AskForm />
          </div>

          <div>
            <ul className="space-y-5">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="glass glass-hover rounded-3xl p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gold-light">
                      {post.name ?? t('anonymous')}
                    </span>
                    <span className="text-xs text-white/40">
                      {t('askedOn', { date: formatDate(post.daysAgo) })}
                    </span>
                  </div>

                  <p className="mt-3 text-white/85">{post.question}</p>

                  {post.answer ? (
                    <div className="mt-5 rounded-2xl border-l-2 border-gold/50 bg-white/[0.02] p-4">
                      <p className="eyebrow mb-2">{t('answeredBy')}</p>
                      <p className="text-sm leading-relaxed text-white/65">
                        {post.answer}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/35">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                      {t('awaitingAnswer')}
                    </p>
                  )}
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="mt-10 flex items-center justify-between"
                aria-label="Pagination"
              >
                {page > 1 ? (
                  <Link
                    href={{ pathname: '/board', query: { page: page - 1 } }}
                    className="btn-outline !px-5 !py-2"
                  >
                    ← {c('previous')}
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-sm text-white/50">
                  {c('page', { current: page, total: totalPages })}
                </span>
                {page < totalPages ? (
                  <Link
                    href={{ pathname: '/board', query: { page: page + 1 } }}
                    className="btn-outline !px-5 !py-2"
                  >
                    {c('next')} →
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
