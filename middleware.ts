import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next();
  }

  const raw = request.cookies.get('admin_session')?.value;
  if (!raw) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const { payload, signature } = JSON.parse(atob(raw));
    const secret = process.env.SESSION_SECRET || 'dev-fallback-secret-do-not-use-in-production';
    if (!secret) throw new Error('no secret');
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (signature !== expected) throw new Error('invalid signature');
    const { expires } = JSON.parse(payload);
    if (Date.now() > expires) throw new Error('expired');
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
