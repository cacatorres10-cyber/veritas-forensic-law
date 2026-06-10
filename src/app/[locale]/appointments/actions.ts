'use server';

import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { TIME_SLOTS } from '@/lib/content';

export type BookingResult =
  | { ok: true; data: { name: string; email: string; date: string; time: string } }
  | { ok: false; errors: Record<string, string> };

const schema = z.object({
  name: z.string().trim().min(1, 'nameRequired'),
  email: z.string().trim().email('emailInvalid'),
  phone: z.string().trim().min(1, 'phoneRequired'),
  date: z.string().trim().min(1, 'dateRequired'),
  time: z.enum(TIME_SLOTS, { errorMap: () => ({ message: 'timeRequired' }) }),
  reason: z.string().trim().min(1, 'reasonRequired'),
});

/**
 * Books a consultation. Validation runs server-side; a unique (date, time)
 * constraint in the schema guarantees the same slot can't be double-booked,
 * even under concurrent requests.
 */
export async function createAppointment(
  formData: FormData
): Promise<BookingResult> {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    date: formData.get('date'),
    time: formData.get('time'),
    reason: formData.get('reason'),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return { ok: false, errors };
  }

  const { name, email, phone, date, time, reason } = parsed.data;

  // Reject dates in the past (compare on the date string in YYYY-MM-DD form).
  const today = new Date().toISOString().slice(0, 10);
  if (date < today) {
    return { ok: false, errors: { date: 'datePast' } };
  }

  try {
    await prisma.appointment.create({
      data: { name, email, phone, date, time, reason },
    });
  } catch (err) {
    // P2002 = unique constraint violation → the slot is already taken.
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return { ok: false, errors: { time: 'slotTaken' } };
    }
    return { ok: false, errors: { form: 'generic' } };
  }

  return { ok: true, data: { name, email, date, time } };
}

/** Returns the already-booked times for a given date (used to disable slots). */
export async function getBookedSlots(date: string): Promise<string[]> {
  if (!date) return [];
  const taken = await prisma.appointment.findMany({
    where: { date },
    select: { time: true },
  });
  return taken.map((t) => t.time);
}
