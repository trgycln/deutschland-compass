-- ====================================================
-- HIZLI ÇÖZÜM: SADECE GEREKLI TABLOLAR
-- place_reactions ve activity_feed tablolarını oluştur
-- ====================================================

-- 1. place_reactions tablosu
CREATE TABLE IF NOT EXISTS place_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_slug TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('delicious', 'yummy', 'neutral', 'bad')),
  user_fingerprint TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_place_reactions_slug ON place_reactions(place_slug);
CREATE INDEX IF NOT EXISTS idx_place_reactions_type ON place_reactions(reaction_type);

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

-- 2. activity_feed tablosu
CREATE TABLE IF NOT EXISTS activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_type TEXT NOT NULL CHECK (
    activity_type IN ('new_place', 'new_comment', 'new_rating', 'new_checkin', 'new_image')
  ),
  place_slug TEXT NOT NULL,
  place_name TEXT NOT NULL,
  city_name TEXT NOT NULL,
  user_name TEXT DEFAULT 'Kullanıcı',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_feed_created ON activity_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_feed_type ON activity_feed(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_feed_slug ON activity_feed(place_slug);

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
-- TEST: Tabloların başarıyla oluşturulduğunu kontrol et
-- ====================================================
SELECT 'place_reactions' as table_name, COUNT(*) as row_count FROM place_reactions
UNION ALL
SELECT 'activity_feed' as table_name, COUNT(*) as row_count FROM activity_feed;

-- Başarılı! Şimdi sayfa yenilendiğinde hatalar gitmeli.
