-- ===================================================================
-- ÇÖZÜM 1: SADECE DUPLİKATLARI SİL (İlk 20 eseri sil)
-- Çünkü yeni INSERT_ALL_97_WORKS.sql aynı 20'yi de içine aldı
-- ===================================================================

DELETE FROM literary_works 
WHERE id <= 20;

-- Doğru sonuç: 97 eser kalmalı
SELECT COUNT(*) as toplam_eser FROM literary_works;
