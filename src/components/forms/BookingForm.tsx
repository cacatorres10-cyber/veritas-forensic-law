'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { waLink } from '@/lib/config';
import { TIME_SLOTS } from '@/lib/content';

// Demo build: confirming a booking opens WhatsApp with the request prefilled.
export function BookingForm() {
  const t = useTranslations('appointments');
  const c = useTranslations('common');

  const today = new Date().toISOString().slice(0, 10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    const next: Record<string, string> = {};
    if (!get('name')) next.name = 'nameRequired';
    if (!/^\S+@\S+\.\S+$/.test(get('email'))) next.email = 'emailInvalid';
    if (!get('phone')) next.phone = 'phoneRequired';
    if (!get('date')) next.date = 'dateRequired';
    if (!get('time')) next.time = 'timeRequired';
    if (!get('reason')) next.reason = 'reasonRequired';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const text =
      `Consultation request:\n` +
      `Name: ${get('name')}\n` +
      `Email: ${get('email')}\n` +
      `Phone: ${get('phone')}\n` +
      `Date: ${get('date')} at ${get('time')}\n` +
      `Reason: ${get('reason')}`;
    window.open(waLink(text), '_blank', 'noopener');
  }

  const fieldError = (key: string) =>
    errors[key] ? <p className="field-error">{t(`errors.${errors[key]}`)}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-8 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="field-label">
            {t('dateLabel')}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            required
            className="field [color-scheme:dark]"
          />
          {fieldError('date')}
        </div>

        <div>
          <label htmlFor="time" className="field-label">
            {t('timeLabel')}
          </label>
          <select
            id="time"
            name="time"
            required
            defaultValue=""
            className="field [color-scheme:dark]"
          >
            <option value="" disabled>
              {t('selectTime')}
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {fieldError('time')}
        </div>

        <div>
          <label htmlFor="name" className="field-label">
            {c('name')}
          </label>
          <input id="name" name="name" type="text" required className="field" />
          {fieldError('name')}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            {c('email')}
          </label>
          <input id="email" name="email" type="email" required className="field" />
          {fieldError('email')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="field-label">
            {c('phone')}
          </label>
          <input id="phone" name="phone" type="tel" required className="field" />
          {fieldError('phone')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="reason" className="field-label">
            {t('reasonLabel')}
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={4}
            required
            placeholder={t('reasonPlaceholder')}
            className="field resize-none"
          />
          {fieldError('reason')}
        </div>
      </div>

      <button type="submit" className="btn-solid mt-8 w-full">
        {t('submit')}
      </button>
    </form>
  );
}
