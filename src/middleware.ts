import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/login',
  '/api/login',
  '/api/authors/top',
  '/api/literary-works',
  '/api/comments',
  '/favicon.ico',
  '/robots.txt',
];

const STATIC_PREFIXES = ['/_next', '/static'];
const STATIC_EXTENSIONS = ['.ico', '.png', '.svg', '.jpg', '.jpeg', '.webp'];

const AUTH_COOKIE_NAME = 'auth_token';

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isStaticAsset(pathname: string) {
  return (
    STATIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    STATIC_EXTENSIONS.some((ext) => pathname.endsWith(ext))
  );
}

async function sha256(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyAuthToken(token: string | undefined, secret: string) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = await sha256(`${payload}:${secret}`);
  return signature === expected;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Statik ve herkese açık yolları atla
  if (isPublicPath(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET
    || process.env.SITE_PASSWORD
    || process.env.ADMIN_PASSWORD
    || 'default-secret';

  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isValid = await verifyAuthToken(token, secret);

  if (isValid) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = search ? `?returnTo=${encodeURIComponent(pathname + search)}` : `?returnTo=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/:path*',
};
