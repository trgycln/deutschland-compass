/**
 * Route Resolver Utility
 * 
 * Maps categories, professions, aliases, and slugs to their correct canonical
 * URL paths under `/rehber/*` or `/meslekler/*`, preventing 404 broken links across
 * community pulse notifications, live update cards, and search features.
 */

// All verified directories under /src/app/rehber
export const REHBER_ROUTES: readonly string[] = [
  'aile-birlesimi',
  'anerkennung',
  'cevre-muhendisligi',
  'cografi-bilgi-sistemleri',
  'egitim-ve-kariyer',
  'elektrikci',
  'erzieherin',
  'hasta-yasli-bakimi',
  'helal-mekanlar',
  'kargo-posta-dagitim',
  'kariyer-yolu',
  'kurtce-ogretmenligi',
  'muhasebe',
  'muhendis-mimar',
  'myo-mezunlari',
  'ogs-calisanlari',
  'okul-oncesi-ogretmenligi',
  'otobus-soforlugu',
  'ozel-egitim-ogretmenligi',
  'schulbegleiter',
  'seelsorge',
  'sihhi-tesisat',
  'sinif-ogretmenligi',
  'sirket-kurma',
  'sosyal-bilgiler-ogretmenligi',
  'sozialarbeiter',
  'tagesmutter',
  'tarih-ogretmenligi',
  'taxi-fahrer',
  'teknik-ogretmenler',
  'turkce-ogretmenligi',
  'vergi-beyani',
  'veteriner-hekimligi',
  'yapay-zeka-kariyerleri',
  'ziraat-muhendisligi'
];

// All verified directories under /src/app/meslekler
export const MESLEKLER_ROUTES: readonly string[] = [
  'almanca-ogretmenligi',
  'beden-egitimi-ogretmenligi',
  'bilgisayar-ogretmenligi',
  'bilisim-it',
  'biyoloji-ogretmenligi',
  'cloud-devops',
  'cografya-ogretmenligi',
  'din-kulturu-ogretmenligi',
  'fen-bilgisi-ogretmenligi',
  'fizik-ogretmenligi',
  'fizyoterapist',
  'gida-muhendisligi',
  'guzel-sanatlar-ogretmenligi',
  'hemsire',
  'ingilizce-ogretmenligi',
  'insaat-muhendisligi',
  'isletme-iktisat',
  'it-donanim',
  'kimya-ogretmenligi',
  'kurtce-ogretmenligi',
  'lkw-soforlugu',
  'lokfuhrer',
  'matematik-ogretmenligi',
  'sap-uzmanligi',
  'siber-guvenlik',
  'veri-bilimi',
  'yazilim-gelistirici',
  'yazilim-test-uzmanligi'
];

// Exact alias mappings for variations in DB, Telegram group IDs, or user inputs
export const ROUTE_ALIASES: Record<string, string> = {
  // Kargo & Posta Dağıtım
  'kargo-posta-dagitim': '/rehber/kargo-posta-dagitim',
  'kargo-ve-posta': '/rehber/kargo-posta-dagitim',
  'kargo-posta': '/rehber/kargo-posta-dagitim',
  'kargo': '/rehber/kargo-posta-dagitim',
  'dagitim': '/rehber/kargo-posta-dagitim',
  'posta': '/rehber/kargo-posta-dagitim',
  'post': '/rehber/kargo-posta-dagitim',
  'deutsche-post': '/rehber/kargo-posta-dagitim',
  'amazon-dagitim': '/rehber/kargo-posta-dagitim',

  // Eğitim & Kariyer
  'egitim-ve-kariyer': '/rehber/egitim-ve-kariyer',
  'egitim-kariyer': '/rehber/egitim-ve-kariyer',
  'egitim-abitur': '/rehber/egitim-ve-kariyer',
  'egitim-rehberi': '/rehber/egitim-ve-kariyer',
  'egitim': '/rehber/egitim-ve-kariyer',
  'abitur': '/rehber/egitim-ve-kariyer',

  // Şirket & Gewerbe
  'is-kurma': '/rehber/sirket-kurma',
  'sirket-kurma': '/rehber/sirket-kurma',
  'sirket': '/rehber/sirket-kurma',
  'gewerbe': '/rehber/sirket-kurma',

  // Kariyer Yolu & Öğretmenlik & Branş Tamamlama
  'brans-tamamlama': '/rehber/kariyer-yolu',
  'kariyer-yolu': '/rehber/kariyer-yolu',
  'ogretmenlik': '/rehber/kariyer-yolu',
  'ogretmen': '/rehber/kariyer-yolu',
  'gonulluluk': '/rehber/schulbegleiter',

  // Mühendis & Mimar
  'muhendis-mimar': '/rehber/muhendis-mimar',
  'muhendislik-ve-mimarlik': '/rehber/muhendis-mimar',
  'muhendislik': '/rehber/muhendis-mimar',
  'muhendis': '/rehber/muhendis-mimar',
  'mimar': '/rehber/muhendis-mimar',

  // Çevre ve Ziraat
  'cevre-muhendisleri': '/rehber/cevre-muhendisligi',
  'cevre-muhendisligi': '/rehber/cevre-muhendisligi',
  'ziraat-muhendisleri': '/rehber/ziraat-muhendisligi',
  'ziraat-muhendisligi': '/rehber/ziraat-muhendisligi',

  // Coğrafi Bilgi Sistemleri (GIS)
  'cografi-bilgi-sistemleri': '/rehber/cografi-bilgi-sistemleri',
  'cografi-bilgi': '/rehber/cografi-bilgi-sistemleri',
  'gis': '/rehber/cografi-bilgi-sistemleri',

  // Mekanlar
  'helal-mekanlar': '/rehber/helal-mekanlar',
  'mekanlar': '/rehber/helal-mekanlar',
  'restoran': '/rehber/helal-mekanlar',

  // Almanca & Sınav Hazırlığı
  'almanca': '/almanca',
  'almanca-sinav': '/almanca',
  'sinav-hazirlik': '/almanca/b2-sinav-hazirlik',
  'b2-sinav-hazirlik': '/almanca/b2-sinav-hazirlik',
  'b2-hazirlik': '/almanca/b2-sinav-hazirlik',
  'all-dosyasi': '/almanca/b2-sinav-hazirlik',
  'b2-all-dosyasi': '/almanca/b2-sinav-hazirlik',

  // Okul Öncesi & Kreş
  'okul-oncesi-ogretmeni': '/rehber/okul-oncesi-ogretmenligi',
  'okul-oncesi-ogretmenligi': '/rehber/okul-oncesi-ogretmenligi',
  'okul-oncesi': '/rehber/okul-oncesi-ogretmenligi',
  'erzieher': '/rehber/erzieherin',
  'erzieherin': '/rehber/erzieherin',

  // Veri Bilimi & IT
  'veri-bilimi-data-science': '/meslekler/veri-bilimi',
  'veri-bilimi': '/meslekler/veri-bilimi',
  'data-science': '/meslekler/veri-bilimi',
  'veri-analisti': '/meslekler/veri-bilimi',
  'yazilim-gelistirme': '/meslekler/yazilim-gelistirici',
  'yazilim-gelistirici': '/meslekler/yazilim-gelistirici',
  'yazilimci': '/meslekler/yazilim-gelistirici',
  'developer': '/meslekler/yazilim-gelistirici',
  'it-sektoru': '/meslekler/bilisim-it',
  'it-bilisim': '/meslekler/bilisim-it',
  'bilisim-it': '/meslekler/bilisim-it',
  'bilisim': '/meslekler/bilisim-it',
  'devops': '/meslekler/cloud-devops',
  'cloud': '/meslekler/cloud-devops',
  'qa': '/meslekler/yazilim-test-uzmanligi',
  'test-uzmanligi': '/meslekler/yazilim-test-uzmanligi',
  'sap': '/meslekler/sap-uzmanligi',

  // Sağlık
  'hemsirelik': '/meslekler/hemsire',
  'hemsire': '/meslekler/hemsire',
  'hasta-bakimi': '/rehber/hasta-yasli-bakimi',
  'yasli-bakimi': '/rehber/hasta-yasli-bakimi',
  'pfleger': '/rehber/hasta-yasli-bakimi',
  'fizyoterapi': '/meslekler/fizyoterapist',
  'veteriner': '/rehber/veteriner-hekimligi',

  // Şoförlük & Makinistlik
  'otobus-soforu': '/rehber/otobus-soforlugu',
  'otobus-soforlugu': '/rehber/otobus-soforlugu',
  'busfahrer': '/rehber/otobus-soforlugu',
  'tir-soforu': '/meslekler/lkw-soforlugu',
  'lkw-soforu': '/meslekler/lkw-soforlugu',
  'tir': '/meslekler/lkw-soforlugu',
  'lkw': '/meslekler/lkw-soforlugu',
  'makinist': '/meslekler/lokfuhrer',
  'makinistlik': '/meslekler/lokfuhrer',
  'lokfuehrer': '/meslekler/lokfuhrer',
  'taksici': '/rehber/taxi-fahrer',
  'taxi': '/rehber/taxi-fahrer',

  // Bürokratik Rehberler
  'diploma-denkligi': '/rehber/anerkennung',
  'denklik': '/rehber/anerkennung',
  'suresiz-oturum': '/rehber/anerkennung',
  'ev-arama': '/rehber/anerkennung',
  'vergi': '/rehber/vergi-beyani',
  'steuer': '/rehber/vergi-beyani',
  'aile-birlesim': '/rehber/aile-birlesimi',
  'muhasebeciler': '/rehber/muhasebe',
  'isletme': '/meslekler/isletme-iktisat',
  'iktisat': '/meslekler/isletme-iktisat',
  'maliye': '/meslekler/isletme-iktisat'
};

// Friendly Turkish display titles
export const CATEGORY_TITLES: Record<string, string> = {
  // Rehberler
  'kargo-posta-dagitim': 'Kargo & Posta Dağıtım',
  'egitim-ve-kariyer': 'Eğitim & Kariyer',
  'egitim-abitur': 'Eğitim & Abitur',
  'otobus-soforlugu': 'Otobüs Şoförlüğü',
  'aile-birlesimi': 'Aile Birleşimi',
  'anerkennung': 'Diploma Denkliği',
  'vergi-beyani': 'Vergi Beyanı',
  'sirket-kurma': 'Şirket & Gewerbe',
  'is-kurma': 'Şirket & Gewerbe',
  'elektrikci': 'Elektrik & Ausbildung',
  'erzieherin': 'Erzieherin / Kreş',
  'hasta-yasli-bakimi': 'Hasta & Yaşlı Bakımı',
  'veteriner-hekimligi': 'Veteriner Hekimliği',
  'ogs-calisanlari': 'OGS Çalışanları',
  'okul-oncesi-ogretmenligi': 'Okul Öncesi Öğretmenliği',
  'muhendis-mimar': 'Mühendislik & Mimarlık',
  'cevre-muhendisligi': 'Çevre Mühendisliği',
  'ziraat-muhendisligi': 'Ziraat Mühendisliği',
  'cografi-bilgi-sistemleri': 'Coğrafi Bilgi Sistemleri (GIS)',
  'helal-mekanlar': 'Helal Mekanlar',
  'kariyer-yolu': 'Kariyer Yolu & Öğretmenlik',
  'brans-tamamlama': 'Branş Tamamlama & Seiteneinstieg',
  'gonulluluk': 'Gönüllü Çalışma & FSJ',
  'muhasebe': 'Muhasebe & Mali Müşavirlik',
  'myo-mezunlari': 'MYO Mezunları',
  'ozel-egitim-ogretmenligi': 'Özel Eğitim Öğretmenliği',
  'schulbegleiter': 'Schulbegleiter',
  'seelsorge': 'Manevi Rehberlik (Seelsorge)',
  'sihhi-tesisat': 'Sıhhi Tesisat',
  'sinif-ogretmenligi': 'Sınıf Öğretmenliği',
  'sosyal-bilgiler-ogretmenligi': 'Sosyal Bilgiler Öğretmenliği',
  'sozialarbeiter': 'Sosyal Hizmetler & Pedagoji',
  'tagesmutter': 'Tagesmutter / Evde Bakım',
  'tarih-ogretmenligi': 'Tarih Öğretmenliği',
  'taxi-fahrer': 'Taksi Şoförlüğü',
  'teknik-ogretmenler': 'Teknik Öğretmenler',
  'turkce-ogretmenligi': 'Türkçe Öğretmenliği',
  'yapay-zeka-kariyerleri': 'Yapay Zeka Kariyerleri',
  'almanca': 'Almanca & Dil Sınavları',
  'b2-sinav-hazirlik': 'B2 Sınav Hazırlığı (ALL DOSYASI)',
  'sinav-hazirlik': 'B2 Sınav Hazırlığı (ALL DOSYASI)',

  // Meslekler
  'lokfuhrer': 'Makinistlik (Lokführer)',
  'lkw-soforlugu': 'LKW / Tır Şoförlüğü',
  'hemsire': 'Hemşirelik',
  'veri-bilimi': 'Veri Bilimi',
  'yazilim-gelistirici': 'Yazılım Geliştirici',
  'bilisim-it': 'Bilişim & IT',
  'cloud-devops': 'Cloud & DevOps',
  'siber-guvenlik': 'Siber Güvenlik',
  'sap-uzmanligi': 'SAP Uzmanlığı',
  'yazilim-test-uzmanligi': 'Yazılım Testi',
  'it-donanim': 'IT & Donanım',
  'fizyoterapist': 'Fizyoterapi',
  'insaat-muhendisligi': 'İnşaat Mühendisliği',
  'gida-muhendisligi': 'Gıda Mühendisliği',
  'isletme-iktisat': 'İşletme & İktisat',
  'almanca-ogretmenligi': 'Almanca Öğretmenliği',
  'beden-egitimi-ogretmenligi': 'Beden Eğitimi Öğretmenliği',
  'bilgisayar-ogretmenligi': 'Bilgisayar Öğretmenliği',
  'biyoloji-ogretmenligi': 'Biyoloji Öğretmenliği',
  'cografya-ogretmenligi': 'Coğrafya Öğretmenliği',
  'din-kulturu-ogretmenligi': 'Din Kültürü Öğretmenliği',
  'fen-bilgisi-ogretmenligi': 'Fen Bilgisi Öğretmenliği',
  'fizik-ogretmenligi': 'Fizik Öğretmenliği',
  'guzel-sanatlar-ogretmenligi': 'Güzel Sanatlar Öğretmenliği',
  'ingilizce-ogretmenligi': 'İngilizce Öğretmenliği',
  'kimya-ogretmenligi': 'Kimya Öğretmenliği',
  'kurtce-ogretmenligi': 'Kürtçe Öğretmenliği',
  'matematik-ogretmenligi': 'Matematik Öğretmenliği'
};

/**
 * Normalizes text to a clean alphanumeric slug without parenthetical extra info.
 */
export function normalizeSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\(\[\{][^\)\]\}]*[\)\]\}]/g, '') // remove parenthetical content like "(Data Science)"
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resolves any category slug, profession name, or alias to a valid site route.
 * Never returns a 404 path for existing categories.
 */
export function resolveCategoryRoute(slugOrText: string): string {
  const raw = (slugOrText || '').trim();
  if (!raw) return '/rehber';

  const slug = normalizeSlug(raw);

  // 1. Direct alias match
  if (ROUTE_ALIASES[slug]) return ROUTE_ALIASES[slug];
  if (ROUTE_ALIASES[raw]) return ROUTE_ALIASES[raw];

  // 2. Exact directory matches
  if (REHBER_ROUTES.includes(slug)) return `/rehber/${slug}`;
  if (MESLEKLER_ROUTES.includes(slug)) return `/meslekler/${slug}`;

  // 3. Teacher variation matching ("-ogretmeni" -> "-ogretmenligi")
  if (slug.endsWith('-ogretmeni')) {
    const asOgretmenligi = slug.replace(/-ogretmeni$/, '-ogretmenligi');
    if (REHBER_ROUTES.includes(asOgretmenligi)) return `/rehber/${asOgretmenligi}`;
    if (MESLEKLER_ROUTES.includes(asOgretmenligi)) return `/meslekler/${asOgretmenligi}`;
  }

  // 4. Substring heuristics
  if (slug.includes('kargo') || slug.includes('posta') || slug.includes('dagitim')) {
    return '/rehber/kargo-posta-dagitim';
  }
  if (slug.includes('egitim') && slug.includes('kariyer')) {
    return '/rehber/egitim-ve-kariyer';
  }
  if (slug.includes('muhendis') && slug.includes('mimar')) {
    return '/rehber/muhendis-mimar';
  }
  if (slug.includes('veri') || slug.includes('data')) {
    return '/meslekler/veri-bilimi';
  }
  if (slug.includes('hemsire')) {
    return '/meslekler/hemsire';
  }
  if (slug.includes('lok') || slug.includes('makinist')) {
    return '/meslekler/lokfuhrer';
  }
  if (slug.includes('lkw') || slug.includes('tir')) {
    return '/meslekler/lkw-soforlugu';
  }
  if (slug.includes('otobus') || slug.includes('busfahrer')) {
    return '/rehber/otobus-soforlugu';
  }

  // 5. Partial matches against existing folders
  for (const r of REHBER_ROUTES) {
    if (slug.includes(r) || r.includes(slug)) return `/rehber/${r}`;
  }
  for (const m of MESLEKLER_ROUTES) {
    if (slug.includes(m) || m.includes(slug)) return `/meslekler/${m}`;
  }

  // Fallback: default to /rehber/${slug} if it looks like a rehber slug, else /meslekler/${slug}
  return `/rehber/${slug}`;
}

/**
 * Returns a human-friendly Turkish display title for a slug or category name.
 */
export function resolveCategoryTitle(slugOrText: string): string {
  const raw = (slugOrText || '').trim();
  if (!raw) return 'Rehber';

  const slug = normalizeSlug(raw);

  if (CATEGORY_TITLES[slug]) return CATEGORY_TITLES[slug];
  if (CATEGORY_TITLES[raw]) return CATEGORY_TITLES[raw];

  // Capitalize and format dashes
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
