-- ===================================================================
-- SUPABASE KURULUM: Sadece bu dosyayı çalıştırın!
-- ===================================================================

-- 1. Tabloyu oluştur
CREATE TABLE IF NOT EXISTS literary_works (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_approved BOOLEAN DEFAULT true,
    submitted_by TEXT DEFAULT 'admin',
    views INTEGER DEFAULT 0
);

-- 2. İndeksler
CREATE INDEX IF NOT EXISTS idx_literary_works_author ON literary_works(author);
CREATE INDEX IF NOT EXISTS idx_literary_works_type ON literary_works(type);
CREATE INDEX IF NOT EXISTS idx_literary_works_approved ON literary_works(is_approved);
CREATE INDEX IF NOT EXISTS idx_literary_works_tags ON literary_works USING GIN(tags);

-- 3. RLS Politikaları
ALTER TABLE literary_works ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes okuyabilir" ON literary_works 
FOR SELECT USING (is_approved = true);

CREATE POLICY "Herkes ekleyebilir" ON literary_works 
FOR INSERT WITH CHECK (true);

-- 4. Görüntülenme fonksiyonu
CREATE OR REPLACE FUNCTION increment_literary_work_views(work_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE literary_works SET views = views + 1 WHERE id = work_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================================
-- ✅ Tablo hazır! 
-- Şimdi 97 eseri yüklemek için:
-- Terminal'de: npm run seed:literary-works
-- ===================================================================
