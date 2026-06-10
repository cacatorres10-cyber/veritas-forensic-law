'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { logoutAction } from '@/app/[locale]/portal/actions';

export function LogoutButton() {
  const t = useTranslations('portal');
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      await logoutAction();
      router.push('/portal/login');
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="btn-outline !px-5 !py-2 disabled:opacity-60"
    >
      {t('signOut')}
    </button>
  );
}
