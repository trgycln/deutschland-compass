-- HELAL MEKANLAR SAYFA İYİLEŞTİRMELERİ İÇİN VERİTABANI ŞEMASI
-- Yeni özellikler: Kategoriler, Görseller, Check-ins, Emoji Reactions, Aktivite Feed

-- ====================================================
-- 1. PLACES TABLOSUNA YENİ KOLONLAR EKLE
-- ====================================================

-- Kategori sistemi için
ALTER TABLE places ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'restaurant' 
  CHECK (category IN ('restaurant', 'cafe', 'bakery', 'fast_food', 'market', 'butcher', 'other'));

-- Çalışma saatleri için (JSON formatında)
ALTER TABLE places ADD COLUMN IF NOT EXISTS working_hours JSONB;

-- Koordinatlar için (harita görünümü)
ALTER TABLE places ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
ALTER TABLE places ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Ortalama rating için (hesaplanacak)
ALTER TABLE places ADD COLUMN IF NOT EXISTS avg_rating DECIMAL(3,2) DEFAULT 0.00;

-- Toplam check-in sayısı (performans için cache)
ALTER TABLE places ADD COLUMN IF NOT EXISTS total_checkins INTEGER DEFAULT 0;

-- Toplam görsel sayısı
ALTER TABLE places ADD COLUMN IF NOT EXISTS total_images INTEGER DEFAULT 0;

-- Son aktivite zamanı (sorting için)
ALTER TABLE places ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ====================================================
-- 2. GÖRSELLER TABLOSU
-- ====================================================

CREATE TABLE IF NOT EXISTS place_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_slug TEXT NOT NULL,
  image_url TEXT NOT NULL,
  user_name TEXT,
  caption TEXT,
  is_approved BOOLEAN DEFAULT false, -- Moderasyon için
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_place_images_slug ON place_images(place_slug);
CREATE INDEX IF NOT EXISTS idx_place_images_approved ON place_images(is_approved);

-- RLS Politikaları
ALTER TABLE place_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes onaylanmış görselleri görebilir" ON place_images;
CREATE POLICY "Herkes onaylanmış görselleri görebilir"
ON place_images FOR SELECT
TO public
USING (is_approved = true);

DROP POLICY IF EXISTS "Herkes görsel ekleyebilir" ON place_images;
CREATE POLICY "Herkes görsel ekleyebilir"
ON place_images FOR INSERT
TO public
WITH CHECK (true);

-- ====================================================
-- 3. CHECK-IN TABLOSU (Buraya Gittim)
-- ====================================================

CREATE TABLE IF NOT EXISTS place_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_slug TEXT NOT NULL,
  user_name TEXT DEFAULT 'Misafir',
  visit_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_place_checkins_slug ON place_checkins(place_slug);
CREATE INDEX IF NOT EXISTS idx_place_checkins_date ON place_checkins(created_at DESC);

-- RLS Politikaları
ALTER TABLE place_checkins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes check-in'leri görebilir" ON place_checkins;
CREATE POLICY "Herkes check-in'leri görebilir"
ON place_checkins FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Herkes check-in yapabilir" ON place_checkins;
CREATE POLICY "Herkes check-in yapabilir"
ON place_checkins FOR INSERT
TO public
WITH CHECK (true);

-- ====================================================
-- 4. EMOJİ REAKSİYONLAR TABLOSU
-- ====================================================

CREATE TABLE IF NOT EXISTS place_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_slug TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('delicious', 'yummy', 'neutral', 'bad')),
  user_fingerprint TEXT, -- Browser fingerprint (basit duplicate önleme)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_place_reactions_slug ON place_reactions(place_slug);
CREATE INDEX IF NOT EXISTS idx_place_reactions_type ON place_reactions(reaction_type);

-- RLS Politikaları
ALTER TABLE place_reactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes reaksiyonları görebilir" ON place_reactions;
CREATE POLICY "Herkes reaksiyonları görebilir"
ON place_reactions FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Herkes reaksiyon verebilir" ON place_reactions;
CREATE POLICY "Herkes reaksiyon verebilir"
ON place_reactions FOR INSERT
TO public
WITH CHECK (true);

-- ====================================================
-- 5. DETAYLI RATING TABLOSU
-- ====================================================

CREATE TABLE IF NOT EXISTS place_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_slug TEXT NOT NULL,
  user_name TEXT DEFAULT 'Misafir',
  
  -- Detaylı puanlama
  taste_rating INTEGER CHECK (taste_rating >= 1 AND taste_rating <= 5),
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  price_rating INTEGER CHECK (price_rating >= 1 AND price_rating <= 5),
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  
  -- Genel puan (otomatik hesaplanabilir)
  overall_rating DECIMAL(3,2),
  
  -- Kimler için uygun?
  suitable_for TEXT[], -- ['families', 'students', 'business', 'halal_strict']
  
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_place_ratings_slug ON place_ratings(place_slug);
CREATE INDEX IF NOT EXISTS idx_place_ratings_overall ON place_ratings(overall_rating DESC);

-- RLS Politikaları
ALTER TABLE place_ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes rating'leri görebilir" ON place_ratings;
CREATE POLICY "Herkes rating'leri görebilir"
ON place_ratings FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Herkes rating verebilir" ON place_ratings;
CREATE POLICY "Herkes rating verebilir"
ON place_ratings FOR INSERT
TO public
WITH CHECK (true);

-- ====================================================
-- 6. AKTİVİTE FEED TABLOSU
-- ====================================================

CREATE TABLE IF NOT EXISTS activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_type TEXT NOT NULL CHECK (
    activity_type IN ('new_place', 'new_comment', 'new_rating', 'new_checkin', 'new_image')
  ),
  place_slug TEXT NOT NULL,
  place_name TEXT NOT NULL,
  city_name TEXT NOT NULL,
  user_name TEXT DEFAULT 'Kullanıcı',
  description TEXT, -- "yeni bir mekan ekledi", "5 yıldız verdi"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_activity_feed_created ON activity_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_feed_type ON activity_feed(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_feed_slug ON activity_feed(place_slug);

-- RLS Politikaları
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes aktiviteleri görebilir" ON activity_feed;
CREATE POLICY "Herkes aktiviteleri görebilir"
ON activity_feed FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Sistem aktivite ekleyebilir" ON activity_feed;
CREATE POLICY "Sistem aktivite ekleyebilir"
ON activity_feed FOR INSERT
TO public
WITH CHECK (true);

-- ====================================================
-- 7. FAVORİLER TABLOSU (İsteğe bağlı - user system varsa)
-- ====================================================

CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_fingerprint TEXT NOT NULL, -- Browser fingerprint veya user_id
  place_slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_fingerprint, place_slug)
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_user_favorites_fingerprint ON user_favorites(user_fingerprint);
CREATE INDEX IF NOT EXISTS idx_user_favorites_slug ON user_favorites(place_slug);

-- RLS Politikaları
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes favorilerini görebilir" ON user_favorites;
CREATE POLICY "Herkes favorilerini görebilir"
ON user_favorites FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Herkes favori ekleyebilir" ON user_favorites;
CREATE POLICY "Herkes favori ekleyebilir"
ON user_favorites FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Herkes favorilerini silebilir" ON user_favorites;
CREATE POLICY "Herkes favorilerini silebilir"
ON user_favorites FOR DELETE
TO public
USING (true);

-- ====================================================
-- 8. TRİGGER FUNCTIONS (Otomatik güncellemeler)
-- ====================================================

-- Yeni check-in olduğunda places.total_checkins güncelle
CREATE OR REPLACE FUNCTION update_place_checkins_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE places 
  SET total_checkins = total_checkins + 1,
      last_activity_at = NOW()
  WHERE CONCAT(LOWER(city), '-', LOWER(REPLACE(name, ' ', '-'))) = NEW.place_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_checkins_count ON place_checkins;
CREATE TRIGGER trigger_update_checkins_count
AFTER INSERT ON place_checkins
FOR EACH ROW
EXECUTE FUNCTION update_place_checkins_count();

-- Yeni görsel eklendiğinde places.total_images güncelle
CREATE OR REPLACE FUNCTION update_place_images_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_approved = true THEN
    UPDATE places 
    SET total_images = total_images + 1,
        last_activity_at = NOW()
    WHERE CONCAT(LOWER(city), '-', LOWER(REPLACE(name, ' ', '-'))) = NEW.place_slug;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_images_count ON place_images;
CREATE TRIGGER trigger_update_images_count
AFTER INSERT OR UPDATE ON place_images
FOR EACH ROW
EXECUTE FUNCTION update_place_images_count();

-- Yeni rating eklendiğinde avg_rating hesapla
CREATE OR REPLACE FUNCTION update_place_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE places 
  SET avg_rating = (
    SELECT AVG(overall_rating)
    FROM place_ratings
    WHERE place_slug = NEW.place_slug
  ),
  last_activity_at = NOW()
  WHERE CONCAT(LOWER(city), '-', LOWER(REPLACE(name, ' ', '-'))) = NEW.place_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_avg_rating ON place_ratings;
CREATE TRIGGER trigger_update_avg_rating
AFTER INSERT ON place_ratings
FOR EACH ROW
EXECUTE FUNCTION update_place_avg_rating();

-- ====================================================
-- 9. HELPER VIEWS (Performans için)
-- ====================================================

-- Popüler mekanlar view
CREATE OR REPLACE VIEW popular_places AS
SELECT 
  p.*,
  ps.likes,
  ps.dislikes,
  (ps.likes - ps.dislikes) as popularity_score
FROM places p
LEFT JOIN place_stats ps ON CONCAT(LOWER(p.city), '-', LOWER(REPLACE(p.name, ' ', '-'))) = ps.place_slug
ORDER BY popularity_score DESC, p.total_checkins DESC, p.created_at DESC
LIMIT 10;

-- Son aktiviteler view
CREATE OR REPLACE VIEW recent_activities AS
SELECT *
FROM activity_feed
ORDER BY created_at DESC
LIMIT 20;

-- ====================================================
-- 10. TEST VERİLERİ (İsteğe bağlı)
-- ====================================================

-- Örnek kategoriler ekle
-- UPDATE places SET category = 'restaurant' WHERE food LIKE '%yemek%' OR food LIKE '%kebap%';
-- UPDATE places SET category = 'bakery' WHERE food LIKE '%simit%' OR food LIKE '%börek%';
-- UPDATE places SET category = 'cafe' WHERE food LIKE '%kahve%' OR name LIKE '%cafe%';

COMMENT ON TABLE places IS 'Ana mekanlar tablosu - kategori, konum ve aktivite bilgileri ile genişletildi';
COMMENT ON TABLE place_images IS 'Kullanıcıların yüklediği mekan görselleri';
COMMENT ON TABLE place_checkins IS 'Kullanıcı check-in kayıtları';
COMMENT ON TABLE place_reactions IS 'Hızlı emoji reaksiyonları';
COMMENT ON TABLE place_ratings IS 'Detaylı puanlama sistemi';
COMMENT ON TABLE activity_feed IS 'Canlı aktivite akışı';
COMMENT ON TABLE user_favorites IS 'Kullanıcı favorileri';
