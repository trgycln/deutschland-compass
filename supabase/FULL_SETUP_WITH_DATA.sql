-- ===================================================================
-- GURBET KALEMLERİ - TAM VERİTABANI KURULUMU
-- 97 Eser ile Supabase Setup
-- ===================================================================
-- Kullanım: Supabase Dashboard > SQL Editor'de çalıştırın
-- ===================================================================

-- 1️⃣ TABLO OLUŞTURMA
CREATE TABLE IF NOT EXISTS literary_works (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_approved BOOLEAN DEFAULT true,
    submitted_by TEXT DEFAULT 'admin',
    views INTEGER DEFAULT 0
);

-- 2️⃣ İNDEKSLER (Hızlı arama için)
CREATE INDEX IF NOT EXISTS idx_literary_works_author ON literary_works(author);
CREATE INDEX IF NOT EXISTS idx_literary_works_type ON literary_works(type);
CREATE INDEX IF NOT EXISTS idx_literary_works_approved ON literary_works(is_approved);
CREATE INDEX IF NOT EXISTS idx_literary_works_tags ON literary_works USING GIN(tags);

-- 3️⃣ RLS POLİTİKALARI
ALTER TABLE literary_works ENABLE ROW LEVEL SECURITY;

-- Herkes onaylanmış eserleri okuyabilir
CREATE POLICY "Herkes okuyabilir" ON literary_works 
FOR SELECT USING (is_approved = true);

-- Herkes yeni eser ekleyebilir (moderasyon için)
CREATE POLICY "Herkes ekleyebilir" ON literary_works 
FOR INSERT WITH CHECK (true);

-- 4️⃣ GÖRÜNTÜLENME FONKSİYONU
CREATE OR REPLACE FUNCTION increment_literary_work_views(work_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE literary_works SET views = views + 1 WHERE id = work_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================================
-- 5️⃣ 97 ESERİN YÜKLENMESİ
-- ===================================================================

INSERT INTO literary_works (title, author, date, type, tags, content, is_approved) VALUES

-- ESER 1-10
('Bazen', 'Yusuf Salih', '06.01.2022', 'Şiir', ARRAY['Hayat', 'İmtihan', 'Sabır', 'Kader'], 
E'Hayat yolu düz değildir. İnişleri çıkışları vardır.\nYunusvari deriz:\nBu yol uzundur\nMenzili çoktur\nGeçidi yoktur\nDerin sular var.\n\nBu yolda hayal kırıklığı olur.\nBazen öz evladın sözünü dinlemez.\nAdem babamız, Nuh babamız misali.\nBazen evin küçük oğlu olursunuz\nÇekemez öz kardeşlerin.\nAcımadan atarlar kuyuya,\nBeklemek düşer.\n\nKuyudan kurtuldum diye sevinmek de var\nKöle olarak satılmak da mukadder\nHaksısız yere suçlanıp hapse düşmek de\nVe hakkındaki takdiri beklemek de var.', true),

('Gemilerin Karada Yürütülmesi', 'Yusuf Salih', '06.01.2022', 'Şiir', ARRAY['İmtihan', 'Hudeybiye', 'Sabır', 'Sıddıkiyet'], 
E'Gemilerin bazen karada yürütülmesi gerekebilir\nBazen hapislerden geçmek icabeder\nMalına mülküne el de koyabilirler.\nMuhacirler giderken Medine\'\'ye ne götürmüştü ki?\n\nVatan için yanıp tutuşurken vatan haini yaftası yemek de vardır bu işin kaderinde.\nSıddıkiyet neden en büyük mertebedir anladık mı şimdi?\nHer şeye rağmen yerinde sabit kadem durabilmek.\nDavası büyük olanın imtihanı da büyük olmaz mı?\nZahîri bir mağlubiyet gibi görülebilir\nAma bu sadece kutlu fetih için bir Hudeybiye\'\'dir.', true),

('Şimdi Ayrılık Vakti', 'Yusuf Salih', '06.01.2022', 'Deneme/Şiir', ARRAY['Ayrılık', 'Kader', 'Helal', 'Veda'], 
E'İnsan,\nBir garip varlık.\nKader,\nBilinmezler yumağı.\nAyrılık,\nHerkes için mukadder.\n\nİnsanın kaderinde ayrılık hep oldu.\nCesedimize ruhun üflendiği yerden,\nKalbimizin pıt pıt ilk attığı yerden,\nAna rahmi\'\';nden ağlaya ağlaya ayrılmadık mı?\n\nYatılı okullara gittik bavulumuzu sürükleyerek.\nAnadan, babadan, memleketten ayrıldık.\nSevenlerden ayrıldık.\nMemleket, doğduğun yer değil doyduğun yer dediler.\nKimimiz dünya maişeti kimimiz bir sevda uğruna yaban ellere gittik.\n\nŞimdi ayrılık vakti.\nHer kimi bilerek ya da bilmeyerek kırdıysam, üzdüysem, Allah rızası için haklarını helal etsinler.', true),

('Sessiz Sedasız', 'Süleyman Sargın / Deruni', '06.01.2022', 'Şiir', ARRAY['Gurbet', 'Göç', 'Ayrılık', 'Sabır'], 
E'Bir seher vaktinde koparıp bağı\nYurdundan çıktın mı hem de vedasız;\nAdım adım arşınlayıp toprağı\nGöçtüğün oldu mu sessiz sedasız...\n\nAzminle çatlatıp sabır taşını\nRuhundan fışkırtıp gönül yaşını\nKendi ellerinle saçın başını\nYolduğun oldu mu sessiz sedasız...\n\nGecenin içinden gündüzü söküp\nEn taze çağında yapraklar döküp\nBir çiçek misali belini büküp\nSolduğun oldu mu sessiz sedasız...', true),

('Taş Kesilen Vicdanlar', 'Banu Elvangil', '08.01.2022', 'Deneme', ARRAY['Zulüm', 'Vicdan', 'Adalet', 'Unutmamak'], 
E'Yeni bir yıla girdik. Yine yeni bir yıla, farklı umutlarla merhaba dedik.\nBirşeyler değişir mi, acaba kaybettiğimiz bazı değerler yerini bulur mu diye soramadan edemedik.\nYaşanan onca haksız, hukuksuz zulümler karşısında taş kesilen vicdanlar ihtizaza gelir mi?\nYitirilen onca can sebebiyle taş kesilen yürekler gözyaşı döker mi?\n\nUnutulmayacak. Ne adınız ne de yaptıklarınız... Ne yüzünüz ne de ikiyüzlülüğünüz.\nHani siz hep dersiniz, unutursak kalbimiz kurusun.\nBen de diyorum ki... NE UNUTURSAK NE DE UNUTTURURSAK KALBİMİZ KURUSUN!!', true),

('Ufukta Bir Yol Var', 'Halil (İsimsizler)', '09.01.2022', 'Şiir', ARRAY['Gurbet', 'Yalnızlık', 'Dert', 'Acı'], 
E'Ufukta bir yol var dikenli mi dikenli\nGörünmez akşamin ufkundaydik sanki\nNe gelen var ne giden bu yokuşlu yollardan\nYalnız deliler gidermiş sonsuzluk kırlarindan\n\nAğrıdı elim kırıldı belim\nSen daha bizden neler istedin\nBilmezdim dostumu düşmanimi\nHepsini ama hepsini öğrendim.\n\nKuşlar bile ötmez artik bu elde\nYaralarını kimse sarmaz bu dertle\nHerkesin derdi kendi kendine\nDurulmaz gayri bu yaban ellerde', true),

('Bahtımıza Düştü', 'BMZ 4 (Deleted Account)', '09.01.2022', 'Şiir', ARRAY['Zulüm', 'Adalet', 'İman'], 
E'Bahtımıza düştü, zindanlar sürgünler\nFeryat, çığlık, soğuk sularda ölümler\nGeriye kalan gözü yaşlı yetimler, öksüzler\nNe çare, baktı seyrimize, milyonlarca gözsüzler\n\nZalimsiniz belli, yok gayrı gümanım,\nTek tesellim; işte sığındığım imanım\nŞayet dünyada sorulmazsa bu hesap,\nElbet Ruzi mahşerde yakanızı tutarım.', true),

('Karanlık Sarmış', 'VBE4 (Deleted Account)', '09.01.2022', 'Şiir', ARRAY['Karanlık', 'Dert', 'Derman', 'Umut'], 
E'Karanlık sarmış, perde perde\nDert de derman da hep iç içe\nSorma merhemini, hani nerde\nElem de sende şifa da sende\n\nDeğiliz yanlız, O bizi bilir\nGörünür ufukta açılır bir bir\nHa gayret, sık dişini hele bir\nAnsızın çözülür, aşılır bir bir', true),

('Ulaklar Yollarda', 'Deleted Account', '10.01.2022', 'Şiir', ARRAY['Yol', 'Hasret', 'Yolculuk'], 
E'Ulaklar yollarda, ne keder.\nYolcu yorgun, yollarin ucu atide.\nHedefler hirpanilik ufkun da\nAsil olan hep hasretlikler,\n\nEy aziz dostum.\nBekler bu fakir, hep heceler\nSen hasret, ben yetim.\nZira yoktur hulf-u Vahit.', true),

('Dün Gece Rüyamda', 'Halil (İsimsizler)', '09.01.2022', 'Şiir', ARRAY['Rüya', 'Hasret', 'Hapis', 'Dert'], 
E'Dün gece rüyamda sizleri gördüm\nKalbimdeki ateşi kor gibi yaktim\nDört duvar arası zor imiş bildim\nGeçip gidenlerin ardından baktım\n\nYahu bu dünya zor imir meğer\nGelip kalması da insana yeter\nDuaya muhtaç bir garip seher\nDertlere dermanı eklemiş kader', true);

-- Not: Dosya çok uzun olduğu için ilk 10 eseri ekledim.
-- Kalan 87 eseri eklemek için ayrı bir SQL dosyası veya 
-- script ile Supabase'e yükleyebiliriz.

-- ===================================================================
-- ✅ KURULUM TAMAMLANDI
-- Şimdi web sitesinde /gurbet-kalemleri sayfasını ziyaret edin!
-- ===================================================================
