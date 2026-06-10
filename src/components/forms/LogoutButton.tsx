'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

// Demo build: no session — "Sign out" just returns to the login screen.
export function LogoutButton() {
  const t = useTranslations('portal');
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push('/portal/login')}
      className="btn-outline !px-5 !py-2"
    >
      {t('signOut')}
    </button>
  );
}
