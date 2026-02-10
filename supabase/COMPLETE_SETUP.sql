-- ===============================================
-- GURBET KALEMLERİ - SUPABASE SETUP
-- Tablo oluşturma + 97 eser yükleme
-- ===============================================

-- 1. Tabloyu oluştur
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

-- 2. İndeksler
CREATE INDEX IF NOT EXISTS idx_literary_works_author ON literary_works(author);
CREATE INDEX IF NOT EXISTS idx_literary_works_type ON literary_works(type);
CREATE INDEX IF NOT EXISTS idx_literary_works_approved ON literary_works(is_approved);
CREATE INDEX IF NOT EXISTS idx_literary_works_tags ON literary_works USING GIN(tags);

-- 3. RLS Politikaları
ALTER TABLE literary_works ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes okuyabilir" ON literary_works FOR SELECT USING (is_approved = true);
CREATE POLICY "Herkes ekleyebilir" ON literary_works FOR INSERT WITH CHECK (true);

-- 4. Görüntülenme artırma fonksiyonu
CREATE OR REPLACE FUNCTION increment_literary_work_views(work_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE literary_works SET views = views + 1 WHERE id = work_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================================
-- 97 ESERİN YÜKLENMESİ
-- ===============================================

INSERT INTO literary_works (title, author, date, type, tags, content, is_approved) VALUES

('Bazen', 'Yusuf Salih', '06.01.2022', 'Şiir', ARRAY['Hayat', 'İmtihan', 'Sabır', 'Kader'], 
'Hayat yolu düz değildir. İnişleri çıkışları vardır.
Yunusvari deriz:
Bu yol uzundur
Menzili çoktur
Geçidi yoktur
Derin sular var.

Bu yolda hayal kırıklığı olur.
Bazen öz evladın sözünü dinlemez.
Adem babamız, Nuh babamız misali.
Bazen evin küçük oğlu olursunuz
Çekemez öz kardeşlerin.
Acımadan atarlar kuyuya,
Beklemek düşer.

Kuyudan kurtuldum diye sevinmek de var
Köle olarak satılmak da mukadder
Haksısız yere suçlanıp hapse düşmek de
Ve hakkındaki takdiri beklemek de var.', true),

('Gemilerin Karada Yürütülmesi', 'Yusuf Salih', '06.01.2022', 'Şiir', ARRAY['İmtihan', 'Hudeybiye', 'Sabır', 'Sıddıkiyet'], 
'Gemilerin bazen karada yürütülmesi gerekebilir
Bazen hapislerden geçmek icabeder
Malına mülküne el de koyabilirler.
Muhacirler giderken Medine''ye ne götürmüştü ki?

Vatan için yanıp tutuşurken vatan haini yaftası yemek de vardır bu işin kaderinde.
Sıddıkiyet neden en büyük mertebedir anladık mı şimdi?
Her şeye rağmen yerinde sabit kadem durabilmek.
Davası büyük olanın imtihanı da büyük olmaz mı?
Zahîri bir mağlubiyet gibi görülebilir
Ama bu sadece kutlu fetih için bir Hudeybiye''dir.', true),

('Şimdi Ayrılık Vakti', 'Yusuf Salih', '06.01.2022', 'Deneme/Şiir', ARRAY['Ayrılık', 'Kader', 'Helal', 'Veda'], 
'İnsan,
Bir garip varlık.
Kader,
Bilinmezler yumağı.
Ayrılık,
Herkes için mukadder.

İnsanın kaderinde ayrılık hep oldu.
Cesedimize ruhun üflendiği yerden,
Kalbimizin pıt pıt ilk attığı yerden,
Ana rahmi''nden ağlaya ağlaya ayrılmadık mı?

Yatılı okullara gittik bavulumuzu sürükleyerek.
Anadan, babadan, memleketten ayrıldık.
Sevenlerden ayrıldık.
Memleket, doğduğun yer değil doyduğun yer dediler.
Kimimiz dünya maişeti kimimiz bir sevda uğruna yaban ellere gittik.

Şimdi ayrılık vakti.
Her kimi bilerek ya da bilmeyerek kırdıysam, üzdüysem, Allah rızası için haklarını helal etsinler.', true),

('Sessiz Sedasız', 'Süleyman Sargın / Deruni', '06.01.2022', 'Şiir', ARRAY['Gurbet', 'Göç', 'Ayrılık', 'Sabır'], 
'Bir seher vaktinde koparıp bağı
Yurdundan çıktın mı hem de vedasız;
Adım adım arşınlayıp toprağı
Göçtüğün oldu mu sessiz sedasız...

Azminle çatlatıp sabır taşını
Ruhundan fışkırtıp gönül yaşını
Kendi ellerinle saçın başını
Yolduğun oldu mu sessiz sedasız...

Gecenin içinden gündüzü söküp
En taze çağında yapraklar döküp
Bir çiçek misali belini büküp
Solduğun oldu mu sessiz sedasız...', true),

('Taş Kesilen Vicdanlar', 'Banu Elvangil', '08.01.2022', 'Deneme', ARRAY['Zulüm', 'Vicdan', 'Adalet', 'Unutmamak'], 
'Yeni bir yıla girdik. Yine yeni bir yıla, farklı umutlarla merhaba dedik.
Birşeyler değişir mi, acaba kaybettiğimiz bazı değerler yerini bulur mu diye soramadan edemedik.
Yaşanan onca haksız, hukuksuz zulümler karşısında taş kesilen vicdanlar ihtizaza gelir mi?
Yitirilen onca can sebebiyle taş kesilen yürekler gözyaşı döker mi?

Unutulmayacak. Ne adınız ne de yaptıklarınız... Ne yüzünüz ne de ikiyüzlülüğünüz.
Hani siz hep dersiniz, unutursak kalbimiz kurusun.
Ben de diyorum ki... NE UNUTURSAK NE DE UNUTTURURSAK KALBİMİZ KURUSUN!!', true),

('Ufukta Bir Yol Var', 'Halil (İsimsizler)', '09.01.2022', 'Şiir', ARRAY['Gurbet', 'Yalnızlık', 'Dert', 'Acı'], 
'Ufukta bir yol var dikenli mi dikenli
Görünmez akşamin ufkundaydik sanki
Ne gelen var ne giden bu yokuşlu yollardan
Yalnız deliler gidermiş sonsuzluk kırlarindan

Ağrıdı elim kırıldı belim
Sen daha bizden neler istedin
Bilmezdim dostumu düşmanimi
Hepsini ama hepsini öğrendim.

Kuşlar bile ötmez artik bu elde
Yaralarını kimse sarmaz bu dertle
Herkesin derdi kendi kendine
Durulmaz gayri bu yaban ellerde', true),

('Bahtımıza Düştü', 'BMZ 4 (Deleted Account)', '09.01.2022', 'Şiir', ARRAY['Zulüm', 'Adalet', 'İman', 'Şikâyet'], 
'Bahtımıza düştü, zindanlar sürgünler
Feryat, çığlık, soğuk sularda ölümler
Geriye kalan gözü yaşlı yetimler, öksüzler
Ne çare, baktı seyrimize, milyonlarca gözsüzler

Zalimsiniz belli, yok gayrı gümanım,
Tek tesellim; işte sığındığım imanım
Şayet dünyada sorulmazsa bu hesap,
Elbet Ruzi mahşerde yakanızı tutarım.', true),

('Karanlık Sarmış', 'VBE4 (Deleted Account)', '09.01.2022', 'Şiir', ARRAY['Karanlık', 'Dert', 'Derman', 'Umut'], 
'Karanlık sarmış, perde perde
Dert de derman da hep iç içe
Sorma merhemini, hani nerde
Elem de sende şifa da sende

Değiliz yanlız, O bizi bilir
Görünür ufukta açılır bir bir
Ha gayret, sık dişini hele bir
Ansızın çözülür, aşılır bir bir', true),

('Ulaklar Yollarda', 'Deleted Account', '10.01.2022', 'Şiir', ARRAY['Yol', 'Hasret', 'Yolculuk', 'Kader'], 
'Ulaklar yollarda, ne keder.
Yolcu yorgun, yollarin ucu atide.
Hedefler hirpanilik ufkun da
Asil olan hep hasretlikler,

Ey aziz dostum.
Bekler bu fakir, hep heceler
Sen hasret, ben yetim.
Zira yoktur hulf-u Vahit.', true),

('Dün Gece Rüyamda', 'Halil (İsimsizler)', '09.01.2022', 'Şiir', ARRAY['Rüya', 'Hasret', 'Hapis', 'Dert'], 
'Dün gece rüyamda sizleri gördüm
Kalbimdeki ateşi kor gibi yaktim
Dört duvar arası zor imiş bildim
Geçip gidenlerin ardından baktım

Yahu bu dünya zor imir meğer
Gelip kalması da insana yeter
Duaya muhtaç bir garip seher
Dertlere dermanı eklemiş kader', true);

-- Devamı (kalan 87 eser)...
-- Dosya çok uzun olduğu için ayrı bir dosyaya geçiyorum
