-- ===================================================================
-- FULL RESET: Tablo sıfırla ve 97 eseri ekle
-- ===================================================================

-- 1. Tüm verileri sil
TRUNCATE TABLE literary_works RESTART IDENTITY CASCADE;

-- 2. Doğrula - boş olmalı
SELECT COUNT(*) as "Toplam" FROM literary_works;
