'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { loginAction } from '@/app/[locale]/portal/actions';

export function LoginForm() {
  const t = useTranslations('portal');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError(false);
    try {
      const res = await loginAction(new FormData(form));
      if (res.ok) {
        router.push('/portal');
        router.refresh();
      } else {
        setError(true);
        setSubmitting(false);
      }
    } catch {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-8 sm:p-10">
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="field-label">
            {t('emailLabel')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            defaultValue="client@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            {t('passwordLabel')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="field"
            defaultValue="password123"
          />
        </div>

        {error && (
          <p className="field-error" role="alert">
            {t('invalidCredentials')}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-solid w-full disabled:opacity-60"
        >
          {submitting ? t('signingIn') : t('signIn')}
        </button>

        <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center text-xs text-white/45">
          {t('demoHint')}
        </p>
      </div>
    </form>
  );
}
