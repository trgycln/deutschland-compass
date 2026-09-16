-- ============================================================
-- telc B2 Beruf – Sınav Hazırlık Veritabanı Şeması
-- Supabase Dashboard > SQL Editor'da çalıştırın
-- ============================================================

-- 1. Soru Arşivi Tablosu
-- Gemini API (temperature:0) tarafından PDF'den yapılandırılan sorular
CREATE TABLE IF NOT EXISTS b2_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  modul TEXT NOT NULL CHECK (modul IN ('lesen', 'hoeren', 'schreiben', 'sprechen')),
  aufgabe INTEGER NOT NULL, -- Aufgabe 1, 2, 3, 4 (modüle göre)
  aufgabe_typ TEXT NOT NULL, -- 'multiple_choice', 'true_false', 'gap_fill', 'matching', 'writing_prompt', 'speaking_card'
  
  -- Ana içerik (JSON olarak saklanır)
  inhalt JSONB NOT NULL,
  -- Lesen/Hören için: { text, fragen: [{id, frage, optionen, korrekt, erklaerung}] }
  -- Schreiben için: { aufgabe_text, hilfsmittel, bewertungskriterien, beispiel_loesung }
  -- Sprechen için: { thema, vorbereitungszeit_min, sprechzeit_min, leitfragen, bewertungskriterien }
  
  -- Hören modülü için ses timestamp bilgisi
  audio_start_sec INTEGER, -- MP3 dosyasında başlangıç saniyesi
  audio_end_sec INTEGER,   -- MP3 dosyasında bitiş saniyesi
  audio_transkript TEXT,   -- Dinleme metni transkripsiyonu
  
  -- Metadata
  schwierigkeit TEXT DEFAULT 'B2',
  thema TEXT, -- 'Arbeitsrecht', 'Betriebsrat', 'Bewerbung', vb.
  punkte_max INTEGER DEFAULT 5, -- Bu görevin maksimum puanı
  
  aktiv BOOLEAN DEFAULT true,
  erstellt_am TIMESTAMPTZ DEFAULT NOW(),
  aktualisiert_am TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Sınav Oturumu Tablosu (anonim, session bazlı)
CREATE TABLE IF NOT EXISTS b2_exam_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL, -- localStorage'dan gelen anonim token
  
  -- Modül puanları (her biri max 60)
  lesen_punkte INTEGER DEFAULT 0,
  hoeren_punkte INTEGER DEFAULT 0,
  schreiben_punkte INTEGER DEFAULT 0,
  sprechen_punkte INTEGER DEFAULT 0,
  
  -- Hesaplanan sonuçlar
  gesamt_punkte INTEGER GENERATED ALWAYS AS 
    (lesen_punkte + hoeren_punkte + schreiben_punkte + sprechen_punkte) STORED,
  bestanden BOOLEAN GENERATED ALWAYS AS (
    (lesen_punkte + hoeren_punkte + schreiben_punkte + sprechen_punkte) >= 144
    AND lesen_punkte >= 36
    AND hoeren_punkte >= 36
    AND schreiben_punkte >= 36
    AND sprechen_punkte >= 36
  ) STORED,
  
  -- Sınav detayları
  modus TEXT DEFAULT 'vollpruefung' CHECK (modus IN ('vollpruefung', 'modul_uebung', 'schnelltest')),
  dauer_minuten INTEGER, -- Kaç dakika sürdü
  abgeschlossen BOOLEAN DEFAULT false,
  
  erstellt_am TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Kullanıcı Yanıtları (session bazlı, anonim)
CREATE TABLE IF NOT EXISTS b2_antworten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES b2_exam_sessions(id) ON DELETE CASCADE,
  frage_id UUID REFERENCES b2_questions(id),
  
  nutzer_antwort TEXT, -- Kullanıcının verdiği cevap
  korrekt BOOLEAN,
  punkte_erhalten INTEGER DEFAULT 0,
  
  -- Schreiben için AI değerlendirme
  ki_bewertung JSONB, -- { inhalt: 0-5, sprache: 0-5, format: 0-5, gesamtnote: 'gut/befriedigend/ausreichend', feedback: '...' }
  
  erstellt_am TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Hata Havuzu (Spaced Repetition için)
CREATE TABLE IF NOT EXISTS b2_fehler_pool (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL, -- Anonim kullanıcı tanımlayıcısı
  frage_id UUID REFERENCES b2_questions(id),
  
  -- SM-2 Spaced Repetition Algoritması değerleri
  naechste_wiederholung DATE DEFAULT CURRENT_DATE + 1,
  intervall_tage INTEGER DEFAULT 1,
  ease_faktor NUMERIC(3,2) DEFAULT 2.5,
  wiederholungen INTEGER DEFAULT 0,
  
  -- İstatistik
  falsch_zaehler INTEGER DEFAULT 1,
  richtig_zaehler INTEGER DEFAULT 0,
  
  erstellt_am TIMESTAMPTZ DEFAULT NOW(),
  aktualisiert_am TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(session_token, frage_id) -- Aynı kişi-soru çifti tekrarlasın
);

-- ============================================================
-- İndeksler (Performans)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_b2_questions_modul ON b2_questions(modul);
CREATE INDEX IF NOT EXISTS idx_b2_questions_aufgabe ON b2_questions(modul, aufgabe);
CREATE INDEX IF NOT EXISTS idx_b2_questions_aktiv ON b2_questions(aktiv);
CREATE INDEX IF NOT EXISTS idx_b2_sessions_token ON b2_exam_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_b2_fehler_token ON b2_fehler_pool(session_token);
CREATE INDEX IF NOT EXISTS idx_b2_fehler_wiederholung ON b2_fehler_pool(naechste_wiederholung);

-- ============================================================
-- Row Level Security (RLS) – Herkes okuyabilir, yazabilir (anonim)
-- ============================================================
ALTER TABLE b2_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2_exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2_antworten ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2_fehler_pool ENABLE ROW LEVEL SECURITY;

-- Sorular: Herkes okuyabilir (public)
CREATE POLICY "b2_questions_public_read" ON b2_questions
  FOR SELECT USING (aktiv = true);

-- Sorular: Sadece service role yazabilir (API route üzerinden)
CREATE POLICY "b2_questions_service_write" ON b2_questions
  FOR ALL USING (auth.role() = 'service_role');

-- Sessions ve yanıtlar: Herkes kendi session_token'ı ile yazabilir/okuyabilir
CREATE POLICY "b2_sessions_anon_all" ON b2_exam_sessions
  FOR ALL USING (true);

CREATE POLICY "b2_antworten_anon_all" ON b2_antworten
  FOR ALL USING (true);

CREATE POLICY "b2_fehler_anon_all" ON b2_fehler_pool
  FOR ALL USING (true);

-- ============================================================
-- Trigger: aktualisiert_am otomatik güncelleme
-- ============================================================
CREATE OR REPLACE FUNCTION update_aktualisiert_am()
RETURNS TRIGGER AS $$
BEGIN
  NEW.aktualisiert_am = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER b2_questions_updated
  BEFORE UPDATE ON b2_questions
  FOR EACH ROW EXECUTE FUNCTION update_aktualisiert_am();

CREATE TRIGGER b2_fehler_updated
  BEFORE UPDATE ON b2_fehler_pool
  FOR EACH ROW EXECUTE FUNCTION update_aktualisiert_am();
