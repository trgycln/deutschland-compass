-- Muzdaribim şarkısının created_at tarihini bugüne güncelle
UPDATE literary_works
SET created_at = NOW()
WHERE title = 'Muzdaribim';

-- Kontrol et
SELECT id, title, author, created_at FROM literary_works WHERE title = 'Muzdaribim';
