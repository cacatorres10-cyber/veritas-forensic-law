'use server';

import { z } from 'zod';

export type ContactResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

const schema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

/**
 * Handles a contact enquiry. Kept intentionally simple — validates the input
 * and returns success. Wire this to email/CRM/DB as needed later.
 */
export async function submitContact(
  formData: FormData
): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return { ok: false, errors };
  }

  // Simulate intake processing.
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
