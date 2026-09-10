-- =====================================================
-- Deutschlandcompass: community_updates Tablosu
-- Telegram Grupları ve AI Özetli Canlı Tecrübeler
-- =====================================================

CREATE TABLE IF NOT EXISTS public.community_updates (
  id BIGSERIAL PRIMARY KEY,
  category_slug TEXT NOT NULL,                  -- Örn: 'busfahrer', 'otobus-soforlugu', 'lokfuhrer', 'aile-birlesimi', 'anerkennung'
  title TEXT NOT NULL,                          -- Örn: '2025 Hessen B2 Dil Şartı ve Jobcenter Finansmanı'
  content TEXT NOT NULL,                        -- Özetlenmiş tecrübe, pratik bilgi veya mevzuat detayı
  source_group TEXT DEFAULT 'Telegram Topluluğu', -- Örn: 'BUSFAHRER GRUBU'
  source_url TEXT,                              -- Telegram grup veya kanal davet linki
  update_type TEXT DEFAULT 'tip',               -- 'official_rule' (Resmi Değişiklik), 'tip' (Pratik İpucu), 'experience' (Tecrübe), 'warning' (Uyarı)
  badge_text TEXT DEFAULT 'Yeni Bilgi',         -- Kart üstünde görünecek rozet (Örn: 'Mart 2025', 'Önemli', 'Taze Bilgi')
  importance TEXT DEFAULT 'normal',             -- 'highlight' | 'normal'
  is_approved BOOLEAN DEFAULT true,             -- Yayında mı?
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hızlı kategori filtreleme için indeks
CREATE INDEX IF NOT EXISTS idx_community_updates_category_slug ON public.community_updates(category_slug, is_approved);
CREATE INDEX IF NOT EXISTS idx_community_updates_created_at ON public.community_updates(created_at DESC);

-- RLS (Row Level Security) Politikaları
ALTER TABLE public.community_updates ENABLE ROW LEVEL SECURITY;

-- Herkes onaylanmış güncellemeleri okuyabilir
DROP POLICY IF EXISTS "Anyone can read approved community updates" ON public.community_updates;
CREATE POLICY "Anyone can read approved community updates" 
  ON public.community_updates 
  FOR SELECT 
  USING (is_approved = true);

-- Service role veya authenticated kullanıcılar ekleme/güncelleme yapabilir
DROP POLICY IF EXISTS "Service role can manage community updates" ON public.community_updates;
CREATE POLICY "Service role can manage community updates" 
  ON public.community_updates 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Örnek Başlangıç Verileri (Seed Data)
INSERT INTO public.community_updates (category_slug, title, content, source_group, source_url, update_type, badge_text, importance, is_approved)
VALUES
(
  'otobus-soforlugu',
  'Jobcenter Bildungsgutschein ve IHK Teori Sınavı Tavsiyesi',
  'Gruptaki son paylaşımlara göre bazı eyaletlerde (özellikle NRW) B1 belgesi yeterli görülürken, Hessen bölgesinde Jobcenter B2 talep edebiliyor. Kursa başlamadan önce IHK sınav sorularını Türkçe ve Almanca paralel çalışan arkadaşların başarı oranı çok daha yüksek.',
  'BUSFAHRER GRUBU',
  'https://t.me/+A-1HiIoQ19MwMjAy',
  'tip',
  'Mart 2025',
  'highlight',
  true
),
(
  'lokfuhrer',
  'Makinistlik Mülakatlarında Dikkat Edilen Psikoteknik Kriterler',
  'Lokführer adayları için yapılan psikoteknik testte (PKS) hızdan ziyade hata yapmama disiplinine ve stres altında soğukkanlı kalabilmeye bakılıyor. Jobcenter finansmanı onaylatırken Deutsche Bahn veya özel demiryolu şirketlerinden ön niyet mektubu (Vorvertrag) almak süreci 2 kat hızlandırıyor.',
  'LOKFÜHRER GRUBU',
  'https://t.me/+G_h_z59ZYTM5NDBi',
  'experience',
  'Güncel Tecrübe',
  'highlight',
  true
),
(
  'aile-birlesimi',
  'Konsolosluk Randevusu ve A1 Dil Belgesi Geçerlilik Süresi',
  'Göte Enstitüsü veya ÖSD A1 belgesinin veriliş tarihinin üzerinden 1 yıl geçmesi durumunda bazı vize memurları mülakatta ek Almanca sorular sorabiliyor veya güncel belge isteyebiliyor. Randevu beklerken dil pratiklerine devam edilmesi şiddetle önerilir.',
  'AİLE BİRLEŞİM GRUBU',
  'https://t.me/+hQPqtt_SuKMxM2Uy',
  'warning',
  'Kritik Uyarı',
  'normal',
  true
),
(
  'anerkennung',
  'ZAB Başvurularında Yeni Dijital Süreç ve Mavi Kart İpuçları',
  'ZAB artık doğrudan online portal üzerinden başvuru kabul ediyor. Noter ve apostil tercümelerinin PDF formatında net yüklenmesi onay süresini 4-6 haftaya kadar düşürüyor.',
  'ANERKENNUNG GRUBU',
  'https://t.me/+o9L43mwhPkZkYTQy',
  'official_rule',
  'Yeni Kural',
  'highlight',
  true
);
