import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Authentication devre dışı - tüm sayfalara erişim serbest
export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
