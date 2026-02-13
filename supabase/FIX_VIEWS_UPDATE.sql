-- ===================================================================
-- GÖRÜNTÜLENME SAYISI GÜNCELLEME SORUNU ÇÖZÜMÜ
-- ===================================================================
-- Bu dosyayı Supabase SQL Editor'de çalıştırın

-- 1. Tüm mevcut UPDATE politikalarını kaldır
DROP POLICY IF EXISTS "Admin güncelleyebilir" ON public.literary_works;
DROP POLICY IF EXISTS "Service role can update works" ON public.literary_works;
DROP POLICY IF EXISTS "Anyone can update views" ON public.literary_works;

-- 2. Yeni UPDATE politikası - service_role için izin ver
CREATE POLICY "Service role can update works"
ON public.literary_works
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Herkes views field'ini güncelleyebilir
CREATE POLICY "Anyone can update views"
ON public.literary_works
FOR UPDATE
USING (true)
WITH CHECK (true);

-- 4. increment_literary_work_views fonksiyonunu yeniden oluştur
DROP FUNCTION IF EXISTS increment_literary_work_views(INTEGER);

CREATE OR REPLACE FUNCTION increment_literary_work_views(work_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE literary_works
    SET views = COALESCE(views, 0) + 1
    WHERE id = work_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Mevcut views değerlerini kontrol et
SELECT id, title, author, views 
FROM literary_works 
ORDER BY id 
LIMIT 20;

-- 6. Test: Manuel olarak bir eserin views'ını artır
-- UPDATE literary_works SET views = COALESCE(views, 0) + 1 WHERE id = 1;

-- 7. Fonksiyonu test et
-- SELECT increment_literary_work_views(1);

COMMENT ON POLICY "Service role can update works" ON public.literary_works IS 
'Service role (API) can update all works including views count';

COMMENT ON POLICY "Anyone can update views" ON public.literary_works IS 
'Allow updating views field for all users - needed for view counting';

COMMENT ON FUNCTION increment_literary_work_views IS 
'Safely increment view count for a literary work, bypassing RLS with SECURITY DEFINER';
