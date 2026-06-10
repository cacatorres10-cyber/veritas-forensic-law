'use server';

import { z } from 'zod';
import { login, destroySession } from '@/lib/auth';

export type LoginResult = { ok: true } | { ok: false };

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const parsed = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { ok: false };

  const client = await login(parsed.data.email, parsed.data.password);
  return client ? { ok: true } : { ok: false };
}

export async function logoutAction(): Promise<void> {
  await destroySession();
}
