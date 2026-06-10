'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { waLink } from '@/lib/config';

// Demo build: posting a question opens WhatsApp with the message prefilled.
export function AskForm() {
  const t = useTranslations('board');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!question.trim()) {
      setError(true);
      return;
    }
    const text = `Legal question${name.trim() ? ` (${name.trim()})` : ''}: ${question.trim()}`;
    window.open(waLink(text), '_blank', 'noopener');
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setError(false);
            }}
            rows={4}
            required
            placeholder={t('questionPlaceholder')}
            className="field resize-none"
          />
          {error && (
            <p className="field-error">{t('errors.questionRequired')}</p>
          )}
        </div>

        <button type="submit" className="btn-solid w-full">
          {t('submit')}
        </button>
      </div>
    </form>
  );
}
