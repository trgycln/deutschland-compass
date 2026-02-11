-- ===================================================================
-- GURBET KALEMLERİ: SES (AUDIO) DESTEĞI EKLE
-- ===================================================================

-- literary_works tablosuna audio_url alanı ekle
ALTER TABLE public.literary_works 
ADD COLUMN IF NOT EXISTS audio_url TEXT;

-- İndeks (performans için)
CREATE INDEX IF NOT EXISTS idx_literary_works_audio_url 
ON public.literary_works(audio_url) 
WHERE audio_url IS NOT NULL;
