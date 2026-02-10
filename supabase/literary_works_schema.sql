-- Gurbet Kalemleri (Literary Works) Schema
-- Edebiyat eserlerini saklamak için tablo

-- Literary Works tablosu oluştur
CREATE TABLE IF NOT EXISTS literary_works (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Şiir', 'Deneme', 'Öykü', 'Deneme/Şiir', 'Akrostiş Şiir', 'Kısa Öykü', 'Deneme/Not', 'Mensur Şiir', 'Aforizma/Deneme', 'Deneme (Yanıt)')),
    tags TEXT[] DEFAULT '{}',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_approved BOOLEAN DEFAULT true,
    submitted_by TEXT DEFAULT 'admin',
    views INTEGER DEFAULT 0
);

-- İndeksler oluştur (arama performansı için)
CREATE INDEX IF NOT EXISTS idx_literary_works_author ON literary_works(author);
CREATE INDEX IF NOT EXISTS idx_literary_works_type ON literary_works(type);
CREATE INDEX IF NOT EXISTS idx_literary_works_date ON literary_works(date);
CREATE INDEX IF NOT EXISTS idx_literary_works_approved ON literary_works(is_approved);
CREATE INDEX IF NOT EXISTS idx_literary_works_tags ON literary_works USING GIN(tags);

-- Full-text search için (Türkçe arama)
CREATE INDEX IF NOT EXISTS idx_literary_works_search 
ON literary_works USING GIN(
    to_tsvector('turkish', 
        coalesce(title, '') || ' ' || 
        coalesce(author, '') || ' ' || 
        coalesce(content, '')
    )
);

-- Updated_at otomatik güncelleme trigger'ı
CREATE OR REPLACE FUNCTION update_literary_works_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_literary_works_updated_at
    BEFORE UPDATE ON literary_works
    FOR EACH ROW
    EXECUTE FUNCTION update_literary_works_updated_at();

-- RLS (Row Level Security) politikaları
ALTER TABLE literary_works ENABLE ROW LEVEL SECURITY;

-- Herkes onaylanmış eserleri okuyabilir
CREATE POLICY "Herkes onaylanmış eserleri görebilir"
ON literary_works FOR SELECT
USING (is_approved = true);

-- Herkes yeni eser ekleyebilir (moderasyon için is_approved = false olacak)
CREATE POLICY "Herkes eser ekleyebilir"
ON literary_works FOR INSERT
WITH CHECK (true);

-- Sadece admin güncelleyebilir/silebilir (şimdilik service_role kullanacağız)
CREATE POLICY "Admin güncelleyebilir"
ON literary_works FOR UPDATE
USING (auth.role() = 'service_role');

CREATE POLICY "Admin silebilir"
ON literary_works FOR DELETE
USING (auth.role() = 'service_role');

-- Görüntülenme sayısını artırmak için güvenli fonksiyon
CREATE OR REPLACE FUNCTION increment_literary_work_views(work_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE literary_works
    SET views = views + 1
    WHERE id = work_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Yorum: Bu tablo şiirleri, denemeleri, öyküleri saklar
-- Tags array olarak saklanır, PostgreSQL'in GIN index'i ile hızlı arama
-- is_approved ile moderasyon sistemi kurulabilir
-- Full-text search Türkçe dil desteği ile