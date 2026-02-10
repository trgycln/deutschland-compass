-- ===================================================================
-- RLS bypass - Service Role ile veri ekle
-- ===================================================================

-- Küçük test: 5 eser ekle
INSERT INTO literary_works (title, author, date, type, tags, content, is_approved, submitted_by) 
VALUES
('Test Şiir 1', 'Test Yazar', '10.02.2026', 'Şiir', ARRAY['Test'], 'Bu bir test eseridir.', true, 'admin'),
('Test Şiir 2', 'Test Yazar', '10.02.2026', 'Şiir', ARRAY['Test'], 'Bu ikinci test eseridir.', true, 'admin'),
('Test Deneme', 'Test Yazar', '10.02.2026', 'Deneme', ARRAY['Test'], 'Bu bir test denebesidir.', true, 'admin');

-- Doğrula
SELECT COUNT(*) as total_works, COUNT(*) FILTER (WHERE is_approved = true) as approved_works FROM literary_works;

-- İlk 3 eseri göster
SELECT id, title, author, is_approved FROM literary_works ORDER BY id DESC LIMIT 3;
