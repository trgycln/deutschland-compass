import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Statik dosyaları ve Next.js sistem dosyalarını kontrol etme
  // Bu dosyalar herkese açık olabilir, içerik sayfaları korunmalı
  const path = req.nextUrl.pathname;
  if (
    path.startsWith('/_next') || 
    path.startsWith('/static') || 
    path.endsWith('.ico') || 
    path.endsWith('.png') || 
    path.endsWith('.svg')
  ) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.SITE_USER;
    const validPass = process.env.SITE_PASSWORD;

    // Hata ayıklama için konsola yazdır (Vercel Loglarında görünür)
    if (user !== validUser || pwd !== validPass) {
      console.log('Giriş Başarısız:', {
        girilenKullanici: user,
        beklenenKullanici: validUser ? 'TANIMLI' : 'TANIMSIZ (HATA!)',
        sifreDurumu: pwd === validPass ? 'Dogru' : 'Yanlis'
      });
    }

    if (user === validUser && pwd === validPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Giris Yapmalisiniz', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Ozel Alan"',
    },
  });
}

export const config = {
  matcher: '/:path*',
};
