'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContact } from '@/app/[locale]/contact/actions';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact');
  const c = useTranslations('common');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setErrors({});
    try {
      const res = await submitContact(new FormData(form));
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setErrors(res.errors);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-400/15 text-green-400">
          ✓
        </div>
        <h3 className="mt-4 font-serif text-2xl italic text-white">
          {t('successTitle')}
        </h3>
        <p className="mt-2 text-sm text-white/60">{t('successBody')}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-outline mt-6"
        >
          {t('send')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-8">
      <h3 className="mb-6 font-serif text-2xl italic text-white">
        {t('formTitle')}
      </h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="field-label">
            {c('name')}
          </label>
          <input id="name" name="name" type="text" required className="field" />
          {errors.name && <p className="field-error">{t('errorGeneric')}</p>}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            {c('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field"
          />
          {errors.email && <p className="field-error">{t('errorGeneric')}</p>}
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            {t('messageLabel')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={t('messagePlaceholder')}
            className="field resize-none"
          />
          {errors.message && <p className="field-error">{t('errorGeneric')}</p>}
        </div>

        {status === 'error' && Object.keys(errors).length === 0 && (
          <p className="field-error">{t('errorGeneric')}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-solid w-full disabled:opacity-60"
        >
          {status === 'sending' ? c('sending') : t('send')}
        </button>
      </div>
    </form>
  );
}
