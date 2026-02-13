-- literary_works tablosunun created_at field'ını kontrol et
-- Eğer default value yoksa ekle
ALTER TABLE literary_works
ALTER COLUMN created_at SET DEFAULT now();

-- Kontrol: Şu anki schema'yı göster
SELECT column_name, column_default, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'literary_works' AND column_name = 'created_at';
