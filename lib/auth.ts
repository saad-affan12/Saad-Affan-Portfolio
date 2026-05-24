import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function getSecret(): string {
  return process.env.SESSION_SECRET || 'dev-fallback-secret-do-not-use-in-production';
}

function getCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? '',
    password: process.env.ADMIN_PASSWORD ?? '',
  };
}

export function validateCredentials(email: string, password: string): boolean {
  const creds = getCredentials();
  return email === creds.email && password === creds.password;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  const expires = Date.now() + SESSION_DURATION_MS;
  const payload = JSON.stringify({ expires });
  const signature = await sign(payload, getSecret());
  const value = btoa(JSON.stringify({ payload, signature }));
  cookieStore.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(expires),
    path: '/admin',
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isValidSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    if (!raw) return false;
    const { payload, signature } = JSON.parse(atob(raw));
    const expected = await sign(payload, getSecret());
    if (signature !== expected) return false;
    const { expires } = JSON.parse(payload);
    if (Date.now() > expires) return false;
    return true;
  } catch {
    return false;
  }
}

async function sign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}
