-- Seed Literary Works
-- 97 eser (şiir, deneme, öykü)

-- Önce mevcut verileri temizle (development için)
-- TRUNCATE TABLE literary_works RESTART IDENTITY CASCADE;

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
Davası büyük olanı imtihanı da büyük olmaz mı?
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
Durulmaz gayri bu yaban ellerde', true);

-- Devamı... (SQL dosyası çok uzun olacağı için parçalara ayıralım)
