
export type ProfessionStatus = 'active' | 'coming-soon';

export interface ProfessionCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: ProfessionStatus;
  icon: 'Briefcase' | 'BookOpen' | 'Stethoscope' | 'Code2' | 'Map';
  demand: 'Yüksek Talep' | 'Çok Yüksek Talep' | 'Orta-Yüksek Talep' | 'Normal';
  readingTime: string;
  badgeColor: 'blue' | 'red' | 'green' | 'slate';
}

export const professionsList: ProfessionCardData[] = [
  {
    id: 'matematik-ogretmenligi',
    title: 'Matematik Öğretmenliği',
    slug: 'matematik-ogretmenligi',
    description: 'Denklik süreci, dil şartları ve okul sistemi hakkında detaylı rehber.',
    category: 'Eğitim',
    status: 'active',
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
    icon: 'Code2',
    demand: 'Yüksek Talep',
    readingTime: '-',
    badgeColor: 'slate'
  }
];
