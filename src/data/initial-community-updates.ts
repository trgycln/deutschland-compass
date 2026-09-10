export type UpdateType = 'official_rule' | 'tip' | 'experience' | 'warning' | 'faq';
export type ImportanceType = 'highlight' | 'normal';

export interface CommunityUpdate {
  id: number | string;
  category_slug: string;
  title: string;
  content: string;
  source_group: string;
  source_url?: string;
  update_type: UpdateType;
  badge_text: string;
  importance: ImportanceType;
  is_approved: boolean;
  likes_count?: number;
  created_at: string;
  updated_at?: string;
}

export const initialCommunityUpdates: CommunityUpdate[] = [
  {
    id: 1,
    category_slug: 'otobus-soforlugu',
    title: 'Jobcenter Bildungsgutschein ve IHK Teori Sınavı İpucu',
    content: 'Gruptaki son paylaşımlara göre bazı eyaletlerde (özellikle NRW) B1 belgesi yeterli görülürken, Hessen bölgesinde Jobcenter B2 talep edebiliyor. Kursa başlamadan önce IHK sınav sorularını Türkçe ve Almanca paralel çalışan arkadaşların başarı oranı çok daha yüksek.',
    source_group: 'BUSFAHRER GRUBU',
    source_url: 'https://t.me/+A-1HiIoQ19MwMjAy',
    update_type: 'tip',
    badge_text: 'Mart 2025',
    importance: 'highlight',
    is_approved: true,
    created_at: '2025-03-08T10:30:00Z',
  },
  {
    id: 2,
    category_slug: 'otobus-soforlugu',
    title: 'B Sınıfı Ehliyet 2 Yıl Kuralı Hakkında Pratik Bilgi',
    content: 'Almanya’ya gelindiğinde Türkiye B ehliyeti Umschreibung ile değiştirildiğinde 2 yıllık stajyerlik süresi şartı aranmamaktadır. Ancak bazı sürücü kursları ve memurlar mevzuatı tam bilmediğinden zorluk çıkarabiliyor; kanun maddesini önceden yanınızda bulundurmanız tavsiye edilir.',
    source_group: 'BUSFAHRER GRUBU',
    source_url: 'https://t.me/+A-1HiIoQ19MwMjAy',
    update_type: 'official_rule',
    badge_text: 'Mevzuat',
    importance: 'normal',
    is_approved: true,
    created_at: '2025-02-24T14:15:00Z',
  },
  {
    id: 3,
    category_slug: 'lokfuhrer',
    title: 'Makinistlik Mülakatlarında Dikkat Edilen Psikoteknik Kriterler',
    content: 'Lokführer adayları için yapılan psikoteknik testte (PKS) hızdan ziyade hata yapmama disiplinine ve stres altında soğukkanlı kalabilmeye bakılıyor. Jobcenter finansmanı onaylatırken Deutsche Bahn veya özel demiryolu şirketlerinden ön niyet mektubu (Vorvertrag) almak onay sürecini 2 kat hızlandırıyor.',
    source_group: 'LOKFÜHRER GRUBU',
    source_url: 'https://t.me/+G_h_z59ZYTM5NDBi',
    update_type: 'experience',
    badge_text: 'Taze Tecrübe',
    importance: 'highlight',
    is_approved: true,
    created_at: '2025-03-05T09:00:00Z',
  },
  {
    id: 4,
    category_slug: 'anerkennung',
    title: 'ZAB Başvurularında Yeni Dijital Süreç ve Mavi Kart İpuçları',
    content: 'ZAB artık doğrudan online portal üzerinden başvuru kabul ediyor. Noter ve apostil tercümelerinin PDF formatında net yüklenmesi onay süresini 4-6 haftaya kadar düşürüyor.',
    source_group: 'ANERKENNUNG GRUBU',
    source_url: 'https://t.me/+o9L43mwhPkZkYTQy',
    update_type: 'official_rule',
    badge_text: 'Yeni Süreç',
    importance: 'highlight',
    is_approved: true,
    created_at: '2025-03-02T16:45:00Z',
  },
  {
    id: 5,
    category_slug: 'aile-birlesimi',
    title: 'Konsolosluk Randevusu ve A1 Dil Belgesi Geçerlilik Süresi',
    content: 'Göte Enstitüsü veya ÖSD A1 belgesinin veriliş tarihinin üzerinden 1 yıl geçmesi durumunda bazı vize memurları mülakatta ek Almanca sorular sorabiliyor veya güncel belge isteyebiliyor. Randevu beklerken dil pratiklerine devam edilmesi şiddetle önerilir.',
    source_group: 'AİLE BİRLEŞİM GRUBU',
    source_url: 'https://t.me/+hQPqtt_SuKMxM2Uy',
    update_type: 'warning',
    badge_text: 'Kritik Uyarı',
    importance: 'highlight',
    is_approved: true,
    created_at: '2025-02-28T11:20:00Z',
  },
  {
    id: 6,
    category_slug: 'elektrikci',
    title: 'IHK FOSA Denklik Sürecinde Çalışma Belgelerinin Detaylandırılması',
    content: 'Türkiye’deki SGK dökümünün yanında meslek lisesi/teknik okul transkriptinde görülen atölye saatlerinin detaylı çevrilmesi, Anerkennung memurlarının tam denklik (Gleichwertigkeit) vermesinde en belirleyici faktör oluyor.',
    source_group: 'ELEKTRİK AUSBİLDUNG GRUBU',
    source_url: 'https://t.me/+ur-Lcuta12I2MDMy',
    update_type: 'tip',
    badge_text: 'Tavsiye',
    importance: 'normal',
    is_approved: true,
    created_at: '2025-02-20T13:10:00Z',
  },
  {
    id: 7,
    category_slug: 'erzieherin',
    title: 'Kreşlerde Quereinstieg ve Sprachniveau Şartı',
    content: 'Birçok eyalette Erzieher açığı nedeniyle diğer branş öğretmenlerine Quereinstieg (yan geçiş) imkanı sunuluyor. B2 seviyesini tamamlayıp C1 kursuna devam eden adayların Kita başvuruları olumlu sonuçlanıyor.',
    source_group: 'ERZIEHER/IN GRUBU',
    source_url: 'https://t.me/+V03ZgVzm6XAxNDVi',
    update_type: 'experience',
    badge_text: 'Kariyer Fırsatı',
    importance: 'highlight',
    is_approved: true,
    created_at: '2025-03-01T15:00:00Z',
  }
];
