'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  createAppointment,
  getBookedSlots,
} from '@/app/[locale]/appointments/actions';
import { TIME_SLOTS } from '@/lib/content';

type Success = { name: string; email: string; date: string; time: string };

export function BookingForm() {
  const t = useTranslations('appointments');
  const c = useTranslations('common');
  const locale = useLocale();

  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState('');
  const [booked, setBooked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);

  // Refresh the list of taken slots whenever the chosen date changes.
  useEffect(() => {
    if (!date) {
      setBooked([]);
      return;
    }
    let active = true;
    getBookedSlots(date).then((slots) => {
      if (active) setBooked(slots);
    });
    return () => {
      active = false;
    };
  }, [date]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setErrors({});
    try {
      const res = await createAppointment(new FormData(form));
      if (res.ok) {
        setSuccess(res.data);
        form.reset();
        setDate('');
      } else {
        setErrors(res.errors);
        // If a slot was just taken, refresh availability.
        if (res.errors.time === 'slotTaken' && date) {
          getBookedSlots(date).then(setBooked);
        }
      }
    } catch {
      setErrors({ form: 'generic' });
    } finally {
      setSending(false);
    }
  }

  if (success) {
    const formattedDate = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${success.date}T00:00:00`));

    return (
      <div className="glass rounded-3xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-400/15 text-2xl text-green-400">
          ✓
        </div>
        <h3 className="mt-6 font-serif text-3xl italic text-white">
          {t('successTitle')}
        </h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/65">
          {t('successBody', {
            name: success.name,
            email: success.email,
            date: formattedDate,
            time: success.time,
          })}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="btn-outline mt-8"
        >
          {t('bookAnother')}
        </button>
      </div>
    );
  }

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className="field-error">{t(`errors.${errors[key]}`)}</p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-8 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Date */}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field [color-scheme:dark]"
          />
          {fieldError('date')}
        </div>

        {/* Time */}
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
            {TIME_SLOTS.map((slot) => {
              const taken = booked.includes(slot);
              return (
                <option key={slot} value={slot} disabled={taken}>
                  {slot}
                  {taken ? ' —' : ''}
                </option>
              );
            })}
          </select>
          {fieldError('time')}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="field-label">
            {c('name')}
          </label>
          <input id="name" name="name" type="text" required className="field" />
          {fieldError('name')}
        </div>

        {/* Email */}
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
          {fieldError('email')}
        </div>

        {/* Phone */}
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="field-label">
            {c('phone')}
          </label>
          <input id="phone" name="phone" type="tel" required className="field" />
          {fieldError('phone')}
        </div>

        {/* Reason */}
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

      {errors.form && <p className="field-error mt-4">{t('errors.generic')}</p>}

      <button
        type="submit"
        disabled={sending}
        className="btn-solid mt-8 w-full disabled:opacity-60"
      >
        {sending ? c('sending') : t('submit')}
      </button>
    </form>
  );
}
