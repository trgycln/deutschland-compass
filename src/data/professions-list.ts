
export type ProfessionStatus = 'active' | 'coming-soon';
export type ProfessionPathType = 'continuation' | 'new-path';

export interface ProfessionCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: ProfessionStatus;
  pathType: ProfessionPathType;
  customLink?: string;
  icon: 'Briefcase' | 'BookOpen' | 'Stethoscope' | 'Code2' | 'Map' | 'Train' | 'Bus' | 'Rocket' | 'Truck';
  demand: 'Yüksek Talep' | 'Çok Yüksek Talep' | 'Orta-Yüksek Talep' | 'Normal';
  readingTime: string;
  badgeColor: 'blue' | 'red' | 'green' | 'slate' | 'orange' | 'purple';
}

export const professionsList: ProfessionCardData[] = [
  {
    id: 'matematik-ogretmenligi',
    title: 'Matematik Öğretmenliği',
    slug: 'matematik-ogretmenligi',
    description: 'Denklik süreci, dil şartları ve okul sistemi hakkında detaylı rehber.',
    category: 'Eğitim',
    status: 'active',
    pathType: 'continuation',
    icon: 'Briefcase',
    demand: 'Yüksek Talep',
    readingTime: '15dk Okuma',
    badgeColor: 'blue'
  },
  {
    id: 'almanca-ogretmenligi',
    title: 'Almanca Öğretmenliği',
    slug: 'almanca-ogretmenligi',
    description: 'DaF/DaZ, entegrasyon kursları ve BAMF onay süreçleri rehberi.',
    category: 'Eğitim',
    status: 'active',
    pathType: 'continuation',
    icon: 'BookOpen',
    demand: 'Çok Yüksek Talep',
    readingTime: '12dk Okuma',
    badgeColor: 'red'
  },
  {
    id: 'bilgisayar-ogretmenligi',
    title: 'Bilgisayar Öğretmenliği',
    slug: 'bilgisayar-ogretmenligi',
    description: 'BÖTE mezunları için denklik, IT kariyer fırsatları ve alternatif roller.',
    category: 'Eğitim & IT',
    status: 'active',
    pathType: 'continuation',
    icon: 'Code2',
    demand: 'Yüksek Talep',
    readingTime: '14dk Okuma',
    badgeColor: 'blue'
  },
  {
    id: 'beden-egitimi-ogretmenligi',
    title: 'Beden Eğitimi Öğretmenliği',
    slug: 'beden-egitimi-ogretmenligi',
    description: 'Spor öğretmenleri için denklik, mülakat ve kariyer rehberi.',
    category: 'Eğitim',
    status: 'active',
    pathType: 'continuation',
    icon: 'Briefcase',
    demand: 'Orta-Yüksek Talep',
    readingTime: '14dk Okuma',
    badgeColor: 'green'
  },
  {
    id: 'biyoloji-ogretmenligi',
    title: 'Biyoloji Öğretmenliği',
    slug: 'biyoloji-ogretmenligi',
    description: 'Biyologlar ve öğretmenler için denklik, laboratuvar ve kariyer fırsatları.',
    category: 'Eğitim & Fen',
    status: 'active',
    pathType: 'continuation',
    icon: 'Briefcase',
    demand: 'Orta-Yüksek Talep',
    readingTime: '10dk Okuma',
    badgeColor: 'green'
  },
  {
    id: 'cografya-ogretmenligi',
    title: 'Coğrafya Öğretmenliği',
    slug: 'cografya-ogretmenligi',
    description: 'Coğrafya öğretmenleri için denklik, dil gereksinimleri ve kariyer fırsatları.',
    category: 'Eğitim & Sosyal',
    status: 'active',
    pathType: 'continuation',
    icon: 'Map',
    demand: 'Orta-Yüksek Talep',
    readingTime: '12dk Okuma',
    badgeColor: 'green'
  },
  {
    id: 'doktorluk',
    title: 'Doktorluk',
    slug: 'doktorluk',
    description: 'Approbation süreci, FSP sınavı ve uzmanlık eğitimi rehberi.',
    category: 'Sağlık',
    status: 'coming-soon',
    pathType: 'continuation',
    icon: 'Stethoscope',
    demand: 'Çok Yüksek Talep',
    readingTime: '-',
    badgeColor: 'slate'
  },
  {
    id: 'din-kulturu-ogretmenligi',
    title: 'Din Kültürü Öğretmenliği',
    slug: 'din-kulturu-ogretmenligi',
    description: 'Denklik süreci, Türkçe ve İslam dersleri fırsatları ve kariyer rehberi.',
    category: 'Eğitim',
    status: 'active',
    pathType: 'continuation',
    icon: 'BookOpen',
    demand: 'Yüksek Talep',
    readingTime: '10dk Okuma',
    badgeColor: 'green'
  },
  {
    id: 'yazilim-muhendisligi',
    title: 'Yazılım Mühendisliği',
    slug: 'yazilim-muhendisligi',
    description: 'Mavi Kart, iş arama süreci ve Almanya IT sektörü analizi.',
    category: 'Bilişim',
    status: 'coming-soon',
    pathType: 'continuation',
    icon: 'Code2',
    demand: 'Yüksek Talep',
    readingTime: '-',
    badgeColor: 'slate'
  },
  {
    id: 'cevre-muhendisligi',
    title: 'Çevre Mühendisliği',
    slug: 'cevre-muhendisligi',
    description: 'Almanya\'da çevre mühendisliği kariyeri, denklik süreçleri ve iş imkanları.',
    category: 'Mühendislik & Çevre',
    status: 'active',
    pathType: 'continuation',
    customLink: '/rehber/cevre-muhendisligi',
    icon: 'Briefcase',
    demand: 'Yüksek Talep',
    readingTime: '14dk Okuma',
    badgeColor: 'green'
  },
  // Yeni Kariyer Yolları
  {
    id: 'sirket-kurma',
    title: 'Şirket Kurma / Girişimcilik',
    slug: 'sirket-kurma',
    description: 'Almanya\'da kendi işinizi kurmak için kapsamlı rehber. Yasal süreçler ve ipuçları.',
    category: 'Girişimcilik',
    status: 'active',
    pathType: 'new-path',
    customLink: '/rehber/sirket-kurma',
    icon: 'Rocket',
    demand: 'Yüksek Talep',
    readingTime: '20dk Okuma',
    badgeColor: 'purple'
  },
  {
    id: 'kargo-posta-dagitim',
    title: 'Kargo ve Posta Dağıtım',
    slug: 'kargo-posta-dagitim',
    description: 'Deutsche Post, DHL ve Amazon gibi firmalarda dağıtım personeli olma rehberi.',
    category: 'Lojistik',
    status: 'active',
    pathType: 'new-path',
    customLink: '/rehber/kargo-posta-dagitim',
    icon: 'Truck',
    demand: 'Çok Yüksek Talep',
    readingTime: '15dk Okuma',
    badgeColor: 'orange'
  },
  {
    id: 'tren-makinistligi',
    title: 'Tren Makinistliği (Lokführer)',
    slug: 'tren-makinistligi',
    description: 'Deutsche Bahn ve özel şirketlerde makinistlik eğitimi (Ausbildung/Umschulung).',
    category: 'Ulaşım',
    status: 'coming-soon',
    pathType: 'new-path',
    icon: 'Train',
    demand: 'Çok Yüksek Talep',
    readingTime: '-',
    badgeColor: 'orange'
  },
  {
    id: 'tren-gorevlisi',
    title: 'Tren Görevlisi (Zugbegleiter)',
    slug: 'tren-gorevlisi',
    description: 'Demiryollarında müşteri hizmetleri ve seyahat güvenliği için kariyer fırsatları.',
    category: 'Ulaşım',
    status: 'coming-soon',
    pathType: 'new-path',
    icon: 'Train',
    demand: 'Yüksek Talep',
    readingTime: '-',
    badgeColor: 'orange'
  },
  {
    id: 'otobus-soforlugu',
    title: 'Otobüs Şoförlüğü',
    slug: 'otobus-soforlugu',
    description: 'Şehir içi ve şehirlerarası otobüs şoförlüğü için ehliyet ve sertifika süreçleri.',
    category: 'Ulaşım',
    status: 'active',
    pathType: 'new-path',
    customLink: '/rehber/otobus-soforlugu',
    icon: 'Bus',
    demand: 'Yüksek Talep',
    readingTime: '15dk Okuma',
    badgeColor: 'orange'
  },
  {
    id: 'yazilim-bootcamp',
    title: 'Yazılım (Bootcamp / Alaylı)',
    slug: 'yazilim-bootcamp',
    description: 'IT sektörüne geçiş yapmak isteyenler için bootcamp ve sertifika programları.',
    category: 'Bilişim',
    status: 'coming-soon',
    pathType: 'new-path',
    icon: 'Code2',
    demand: 'Yüksek Talep',
    readingTime: '-',
    badgeColor: 'blue'
  },
  {
    id: 'cografi-bilgi-sistemleri',
    title: 'Coğrafi Bilgi Sistemleri (GIS)',
    slug: 'cografi-bilgi-sistemleri',
    description: 'Mekansal veri analizi, haritalama ve şehir planlama alanında kariyer fırsatları.',
    category: 'Bilişim & Mühendislik',
    status: 'active',
    pathType: 'new-path',
    customLink: '/rehber/cografi-bilgi-sistemleri',
    icon: 'Map',
    demand: 'Yüksek Talep',
    readingTime: '12dk Okuma',
    badgeColor: 'blue'
  },
];
