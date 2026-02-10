-- ===================================================================
-- RLS'yi TAMAMEN DEVRE DIŞ BIR (Herkese tam erişim - TEST için)
-- ===================================================================

-- RLS'yi kapat
ALTER TABLE literary_works DISABLE ROW LEVEL SECURITY;

-- Kontrol et
SELECT COUNT(*) as "Toplam Eser" FROM literary_works WHERE is_approved = true;
