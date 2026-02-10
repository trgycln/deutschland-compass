-- ===================================================================
-- ÇÖZÜM 2: TÜMEN TEMİZ BAŞLA (Tüm tabloyu sıfırla)
-- Eğer Çözüm 1'de sorun varsa bunu kullan
-- ===================================================================

-- Tüm mevcut eserleri sil
TRUNCATE TABLE literary_works RESTART IDENTITY CASCADE;

-- Doğrulama
SELECT COUNT(*) as toplam_eser FROM literary_works;

-- Sonra INSERT_ALL_97_WORKS.sql dosyasını çalıştır
