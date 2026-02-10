-- ===================================================================
-- RLS POLİTİKALARINI DÜZELT
-- ===================================================================

-- 1. Mevcut politikaları sil
DROP POLICY IF EXISTS "Herkes onaylanmış eserleri görebilir" ON literary_works;
DROP POLICY IF EXISTS "Herkes eser ekleyebilir" ON literary_works;
DROP POLICY IF EXISTS "Admin güncelleyebilir" ON literary_works;
DROP POLICY IF EXISTS "Admin silebilir" ON literary_works;

-- 2. Yeni politikaları ekle
-- HERKES onaylı eserleri okuyabilir (anonymous users dahil)
CREATE POLICY "select_approved_works"
ON literary_works FOR SELECT
USING (is_approved = true);

-- HERKES yeni eser ekleyebilir (onaysız olarak)
CREATE POLICY "insert_new_works"
ON literary_works FOR INSERT
WITH CHECK (true);

-- Service role güncelleyebilir/silebilir
CREATE POLICY "update_with_service_role"
ON literary_works FOR UPDATE
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "delete_with_service_role"
ON literary_works FOR DELETE
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- 3. Kontrol et
SELECT COUNT(*) as "Onaylı Eserler" FROM literary_works WHERE is_approved = true;
