'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { waLink } from '@/lib/config';

// Demo build: sending a message opens WhatsApp with the message prefilled.
export function ContactForm() {
  const t = useTranslations('contact');
  const c = useTranslations('common');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    const next: Record<string, boolean> = {};
    if (!get('name')) next.name = true;
    if (!/^\S+@\S+\.\S+$/.test(get('email'))) next.email = true;
    if (!get('message')) next.message = true;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const text =
      `Contact enquiry:\n` +
      `Name: ${get('name')}\n` +
      `Email: ${get('email')}\n` +
      `Message: ${get('message')}`;
    window.open(waLink(text), '_blank', 'noopener');
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
          {errors.name && <p className="field-error">{c('required')}</p>}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            {c('email')}
          </label>
          <input id="email" name="email" type="email" required className="field" />
          {errors.email && <p className="field-error">{c('required')}</p>}
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
          {errors.message && <p className="field-error">{c('required')}</p>}
        </div>

        <button type="submit" className="btn-solid w-full">
          {t('send')}
        </button>
      </div>
    </form>
  );
}
