-- ===================================================================
-- Fonksiyon kontrol et
-- ===================================================================

-- Functions listesi
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%view%';

-- Ya da
SELECT * FROM pg_proc WHERE proname = 'increment_literary_work_views';
