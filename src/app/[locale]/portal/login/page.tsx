import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCurrentClient } from '@/lib/auth';
import { Container, PageIntro } from '@/components/ui';
import { LoginForm } from '@/components/forms/LoginForm';

export default async function LoginPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  // Already signed in → go straight to the portal.
  const client = await getCurrentClient();
  if (client) redirect(`/${locale}/portal`);

  const t = await getTranslations('portal');

  return (
    <div className="pt-32 lg:pt-40">
      <Container>
        <div className="mx-auto max-w-md">
          <PageIntro
            eyebrow={t('badge')}
            title={t('loginTitle')}
            subtitle={t('loginSubtitle')}
          />
          <div className="my-12">
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
