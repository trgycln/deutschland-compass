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

  // Çevresel değişkenleri al
  const siteUser = process.env.SITE_USER;
  const sitePass = process.env.SITE_PASSWORD;
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // 1. Admin Paneli Erişimi (/admin ile başlayan yollar)
    if (path.startsWith('/admin')) {
      // Admin kullanıcısı tanımlıysa ve bilgiler eşleşiyorsa izin ver
      if (adminUser && adminPass && user === adminUser && pwd === adminPass) {
        return NextResponse.next();
      }
      // Admin bilgileri yanlışsa veya site kullanıcısı ile girmeye çalışıyorsa reddet (aşağıda 401 dönecek)
    } 
    // 2. Genel Site Erişimi (Diğer tüm yollar)
    else {
      // Site kullanıcısı VEYA Admin kullanıcısı giriş yapabilir
      const isSiteUser = siteUser && sitePass && user === siteUser && pwd === sitePass;
      const isAdminUser = adminUser && adminPass && user === adminUser && pwd === adminPass;

      if (isSiteUser || isAdminUser) {
        return NextResponse.next();
      }
    }
  }

  // Yetki yoksa veya bilgiler yanlışsa 401 döndür
  // Admin paneli için farklı bir "Realm" (Alan) adı kullanarak tarayıcının yeni şifre sormasını sağla
  const realm = path.startsWith('/admin') ? 'Admin Paneli' : 'Ozel Alan';

  return new NextResponse('Giris Yapmalisiniz', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${realm}"`,
    },
  });
}

export const config = {
  matcher: '/:path*',
};
