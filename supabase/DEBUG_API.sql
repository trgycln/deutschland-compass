-- ===================================================================
-- DEBUG: Neden eser bulunamıyor?
-- ===================================================================

-- 1. Kaç onaylı eser var?
SELECT COUNT(*) as "Onaylı Eserler" FROM literary_works WHERE is_approved = true;

-- 2. İlk 5 eseri göster (hangi ID'ler var?)
SELECT id, title, is_approved FROM literary_works ORDER BY id LIMIT 5;

-- 3. ID=1 olan eseri çek
SELECT id, title, content, is_approved FROM literary_works WHERE id = 1;

-- 4. ID=1 ve is_approved=true
SELECT id, title, is_approved FROM literary_works WHERE id = 1 AND is_approved = true;

-- 5. Tüm eserleri listele (ilk 10)
SELECT id, title, author, is_approved FROM literary_works ORDER BY id LIMIT 10;
