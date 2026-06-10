import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container, PageIntro } from '@/components/ui';
import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('portal');

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
