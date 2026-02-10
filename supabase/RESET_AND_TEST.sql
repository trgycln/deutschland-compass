-- ===================================================================
-- SEÇENEK 1: Tüm verileri sıfırla ve yeniden yükle
-- ===================================================================

-- Adım 1: Eski verileri sil
TRUNCATE TABLE literary_works RESTART IDENTITY CASCADE;

-- Adım 2: Yeni eserleri ekle
INSERT INTO literary_works (title, author, date, type, tags, content, is_approved) 
VALUES
('Bazen', 'Yusuf Salih', '06.01.2022', 'Şiir', ARRAY['Hayat','İmtihan','Sabır','Kader'], 'Hayat yolu düz değildir. İnişleri çıkışları vardır.', true),
('Gemilerin Karada Yürütülmesi', 'Yusuf Salih', '06.01.2022', 'Şiir', ARRAY['İmtihan','Hudeybiye','Sabır','Sıddıkiyet'], 'Gemilerin bazen karada yürütülmesi gerekebilir', true),
('Şimdi Ayrılık Vakti', 'Yusuf Salih', '06.01.2022', 'Deneme/Şiir', ARRAY['Ayrılık','Kader','Helal','Veda'], 'İnsan, Bir garip varlık. Kader, Bilinmezler yumağı.', true),
('Sessiz Sedasız', 'Süleyman Sargın / Deruni', '06.01.2022', 'Şiir', ARRAY['Gurbet','Göç','Ayrılık','Sabır'], 'Bir seher vaktinde koparıp bağı', true),
('Taş Kesilen Vicdanlar', 'Banu Elvangil', '08.01.2022', 'Deneme', ARRAY['Zulüm','Vicdan','Adalet','Unutmamak'], 'Yeni bir yıla girdik.', true);

-- Adım 3: Kontrol et
SELECT COUNT(*) as toplam FROM literary_works WHERE is_approved = true;
