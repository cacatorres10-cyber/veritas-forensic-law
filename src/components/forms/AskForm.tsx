'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { createPost } from '@/app/[locale]/board/actions';

export function AskForm() {
  const t = useTranslations('board');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setErrors({});
    try {
      const res = await createPost(new FormData(form));
      if (res.ok) {
        form.reset();
        setDone(true);
        // Jump back to page 1 to reveal the newest post.
        router.push('/board');
        router.refresh();
        setTimeout(() => setDone(false), 4000);
      } else {
        setErrors(res.errors);
      }
    } catch {
      setErrors({ form: 'generic' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8">
      <h2 className="font-serif text-2xl italic text-white">{t('askTitle')}</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="post-name" className="field-label">
            {t('nameLabel')}{' '}
            <span className="text-white/30">({t('namePlaceholder')})</span>
          </label>
          <input
            id="post-name"
            name="name"
            type="text"
            className="field"
            placeholder={t('namePlaceholder')}
          />
        </div>

        <div>
          <label htmlFor="post-question" className="field-label">
            {t('questionLabel')}
          </label>
          <textarea
            id="post-question"
            name="question"
            rows={4}
            required
            placeholder={t('questionPlaceholder')}
            className="field resize-none"
          />
          {errors.question && (
            <p className="field-error">{t('errors.questionRequired')}</p>
          )}
        </div>

        {errors.form && <p className="field-error">{t('errors.generic')}</p>}
        {done && (
          <p className="text-sm text-green-400" role="status">
            {t('successBody')}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-solid w-full disabled:opacity-60"
        >
          {submitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </form>
  );
}
