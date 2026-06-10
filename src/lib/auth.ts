import { cookies } from 'next/headers';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

/**
 * Modular auth layer.
 * --------------------
 * Intentionally small and self-contained so it can be hardened later
 * (e.g. swapped for NextAuth/Auth.js, JWT rotation, 2FA) without touching
 * the UI. Components only ever call the exported functions below.
 */

const COOKIE_NAME = 'veritas_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SECRET = process.env.AUTH_SECRET ?? 'insecure-dev-secret';

export type SessionClient = {
  id: string;
  email: string;
  name: string;
};

// --- Password helpers -------------------------------------------------------

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export function comparePassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// --- Cookie signing (HMAC) --------------------------------------------------

function sign(value: string): string {
  const sig = crypto
    .createHmac('sha256', SECRET)
    .update(value)
    .digest('base64url');
  return `${value}.${sig}`;
}

function unsign(token: string): string | null {
  const idx = token.lastIndexOf('.');
  if (idx === -1) return null;
  const value = token.slice(0, idx);
  const expected = sign(value);
  // Constant-time comparison to avoid timing attacks.
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return value;
}

// --- Session management -----------------------------------------------------

export async function createSession(clientId: string): Promise<void> {
  cookies().set(COOKIE_NAME, sign(clientId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}

/** Returns the authenticated client, or null if not signed in. */
export async function getCurrentClient(): Promise<SessionClient | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const clientId = unsign(token);
  if (!clientId) return null;

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { id: true, email: true, name: true },
  });
  return client;
}

/**
 * Verify email + password and start a session on success.
 * Returns the client on success, or null on invalid credentials.
 */
export async function login(
  email: string,
  password: string
): Promise<SessionClient | null> {
  const client = await prisma.client.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  if (!client) return null;

  const ok = await comparePassword(password, client.password);
  if (!ok) return null;

  await createSession(client.id);
  return { id: client.id, email: client.email, name: client.name };
}
