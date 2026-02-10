-- ===================================================================
-- DEBUG: Gurbet Kalemleri Tablosu Kontrolü
-- ===================================================================

-- 1. Kaç eser var?
SELECT COUNT(*) as "Toplam Eser Sayısı" FROM literary_works;

-- 2. Onaylı eserlerin sayısı
SELECT COUNT(*) as "Onaylı Eserler" FROM literary_works WHERE is_approved = true;

-- 3. İlk 5 eseri göster
SELECT id, title, author, is_approved FROM literary_works LIMIT 5;

-- 4. RLS politikalarını kontrol et
SELECT * FROM pg_policies WHERE tablename = 'literary_works';

-- 5. Tablo yapısını göster
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'literary_works';
