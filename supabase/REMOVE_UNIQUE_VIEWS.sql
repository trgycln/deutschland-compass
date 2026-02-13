-- Görüntüleme sayısını takip eden tablolardaki UNIQUE constraints'i kaldır
-- Her ziyaret sayılsın, kullanıcı farkı gözetilmesin

-- 1. literary_work_views table (eğer varsa)
ALTER TABLE literary_work_views DROP CONSTRAINT IF EXISTS literary_work_views_work_id_user_identifier_key;
ALTER TABLE literary_work_views DROP CONSTRAINT IF EXISTS unique_work_user_view;

-- 2. user_view_history table (eğer varsa)
ALTER TABLE user_view_history DROP CONSTRAINT IF EXISTS unique_work_user;

-- Kontrol et
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name LIKE '%view%';
