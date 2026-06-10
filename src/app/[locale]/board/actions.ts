'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export type PostResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

const schema = z.object({
  // Name is optional — visitors may post anonymously.
  name: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => (v ? v : null)),
  question: z.string().trim().min(1, 'questionRequired').max(2000),
});

export async function createPost(formData: FormData): Promise<PostResult> {
  const parsed = schema.safeParse({
    name: formData.get('name') ?? undefined,
    question: formData.get('question'),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return { ok: false, errors };
  }

  try {
    await prisma.boardPost.create({
      data: { name: parsed.data.name, question: parsed.data.question },
    });
  } catch {
    return { ok: false, errors: { form: 'generic' } };
  }

  // Refresh the board so the new question appears.
  revalidatePath('/[locale]/board', 'page');
  return { ok: true };
}
