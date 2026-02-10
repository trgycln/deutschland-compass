-- ===================================================================
-- PART 3 FIXED: ESERLERI TAM HALLERINE GÜNCELLE (Remaining Works)
-- Using $$ $$ delimiters for Turkish UTF-8 characters
-- ===================================================================

-- 81. Bir Telefona Bakar (Tuba)
UPDATE literary_works SET 
  content = $$Bir telefona bakar kalp kırılır mı ya?
Birkaç ay önce cevap "hayır" idi.
Ey cep telefonu, sen de bana yapabilirsin bunu?

Özel günleri arar kayıtlarda sık sık.
Dadı WhatsApp yazmış görüyorum ama kendisine yazmış değilim.
Kanalla konuştum, dedim ki ben seni seviyorum, yapma daha bunları.

Mesela ben mesaj attıkça oku diye israr etmem.
Bu kız ne yazıyor diye öğrenme tuşunu basarım sadece.
Biliyorsun o 'uçak' sembolüdür ya mesajın yanında;
Biliyorum gelmeyeceğim gibi saçmalık değil mi?

Bunu neden yazıyorum?
Mesela ailelerine yazanlardan çıkardığı enerjiyi bize ayırması konusunda.
Mesela annesi çağırırsa hemen gidişi... Cit yok ama aynı ahenkle cevap verseydi bana ne güzel olurdu.
Mesela bir ben mi affetmeyi her seferinde seçiyorum yoksa 'ayrantı' mı var?

Bunu soran da ben miyim? Aklı başında insanlar neden böyle kalp kırıcılıklar yapıyorlar?
Bilmiyorum. Babam cezaevinde oysa ben burada sağlam akıldan şikayet ediyorum.
Çok tuhaf...

Ama bu telefonda var belki birinin yazısından hafızasını yiyen ilişkiler, görüldü'nün daha sonra yanıtlanmadığı, kimseyi sinirlendirecek soruların yanıtlanmadığı hikayeler.
Herkes farklı sevme dilinde konuşuyor.
Ben yazıyorum, o bekliyorum.
Ya da ben beklerken o yazıyor.
Hiç senkronunda değiliz.

Telefonun şarjı düşüyor gibi benim de içimin pili tükeniyor.
Blokla gitsinler mi diye geçiriyorum aradığımı ama hıl hiç…
Her sabah aynı sevinç yok artık o telefonda.
Ey cep telefonu sen de insan gibi ama trajedili.
Bu da senin hikaye.
Biliyorum sen de çok izliyorsun bu oyunları ama sen de insanlardan daha sadıksın.

Elini sıkışıp, seni çok seviyorum, ama bu senet geçerli değil artık der gibi gitsem…
Dede atası saatler aşırtırken ben neden böyle şeyleri hayal ediyorum?
Mesela bir kayaç gibi olsaydım, suyun akışı beni biçimlendirir, sabit ve görmekten yorgun olmam.
Ama ben su gibiyim; tüm oluşlara uyuyor, boşluksuz doluyorum her yere.

Ey telefon, beni buradan kurtarmazsan bari sen kırılma diye dua ettim hiç.
Çünkü sen de benimle ağladın çokluk…

Artık az yazmıyorum.
Ey telefon, al bir nefes al…
Ben de…

Sonra Aydın'dan haber geliyor.
Babam çıkmış.
Telefonum yapıyor tırıl tırıl.
Diğer tüm mesajlar gitsin, babamdan gelen foto varsa her şey asgara indirgeniyor.
Fotoğrafta babam var ama çüş çıplak.
Kıyafet değiştirmiş, sakal aşılı, insanı biraz tanımıyor.
Ama gene tanıyor.
En güvenilir ses, en rahatlatıcı koku, en tanışlı simya.
Bu telefon başka hiçbir haberi vermiş mi böyle şimdiye kadar?

Telefon'dan siyasi mesajlardan evden gelen 'haber'lerden cıvata mıyız vs? Evet ama bugün biraz farklı.
Özel ve çok kişisel.
Biyoloji dersi gibi de hissettim. DNA'mız yazılı elektromanyetik dalga ile iletiliyor.
Teleföndaki bir foto, bir sesiyle babamın sesiyle ben yeni doğdum.
Gerçekten yeni doğdum.
Babamla konuşup da yatağa şaşkınlık içinde düştüm.

Telefon bu kez merci.$$,
  tags = ARRAY['telefon', 'iletisim', 'baba'] 
WHERE id = 81;

-- 82. Yenildim Anne (Sezer Bingöl)
UPDATE literary_works SET 
  content = $$Yenildim Anne…
Yenildim sana…
Yenildim bu yüreğim kırılmaktan…
Yenildim bu gözsü aşktan…
Yenildim tüm dileklerin karşısında…

Yenildim Anne…
Yenildim seni özlemekten…
Yenildim seni evde yalnız bırakmaktan…
Yenildim senden uzakta yaşamaktan…
Yenildim Godette yok yok gözyaşlarından…
Yenildim senin çektiklerini bilmekten…

Yenildim Anne…
Yenildim seni kucaklamak için canımdan geçmekten…
Yenildim seni hoppa yapmaktan vazgeçmekten…
Yenildim senin elleriyle okşanmaktan…
Yenildim senin sesini dinlemekten…
Yenildim senin kokunu hissetmekten…

Yenildim Anne…
Yenildim seni saati düşün diye telkin etmekten…
Yenildim hasretimi yakıp kül etmekten…
Yenildim aynı yastığa başımızı koymaktan…
Yenildim sabah çayımızdan…
Yenildim akşam dualılarımızdan…

Yenildim Anne…
Yenildim halk uçaklarından…
Yenildim video çağrılarından…
Yenildim sesli mesajlar dinlemekten…
Yenildim seni ekranda görmekten…
Yenildim seni ancak görüntüde sahip olmaktan…

Yenildim Anne…
Yenildim tüm o anları sonsuza aktarmamaktan…
Yenildim tüm o hakların kaybıyla yaşamaktan…
Yenildim seni kaybetmeyen bir hayat tahayyülünden…
Yenildim seni memleketimde boş kabristan bekleyeceğini bilmekten…
Yenildim bu zalimce nefes almaktan…

Yenildim Anne…
Yenildim dedim tüm korkularını…
Yenildim seni emkiyetim ettim…
Yenildim sadece bir umuduncan yaşamaktan…
Yenildim bunu yazından…

Çünkü…
Sen en büyük aşkımsın…
En kutlu duam…
En temiz emanetim…
En korulu kalbim…
En hasretli aşkım…
Benim en güzel yüreğim…

Yenildim Anne…
Yenildim bu yüreğe…$$,
  tags = ARRAY['anne', 'hasret', 'ayrilik']
WHERE id = 82;

-- 83. Sahte Dostların Eline Düşürme (Sezer Bingöl)
UPDATE literary_works SET 
  content = $$Diheke dost olduğunu söyledi
Pa'ye vardi dedim ben ama
Doshtu tanımışdım iki gundem
Alında ışık vardı yuzunde
Gulüşü guneşti kalbimde
Sendelerdi sesini yolda
Bir gün sordum birbiri olur muyuz
Dedi bana evet ama
Son işgüzar müdürü yenevedi
Vı sısı yazlıklarından alıp meğlup ettim
Beklemedim çerağı daha yıll duvarda
Hepiği yazılarını yakıp kül ettim
Bir gün sordum aldım seni avi
Dedi bana cevap vermedi
Haber aldım başka birleriyle gezdığini
Söz unuttun mu dedi
Netice eline veriştim
Bes eline
Kaç yıl ağlamışdı o yürek
Ded kendini açıl diye

Cinayeti kursanlar evimde
Li cihakı saldı benim
Belki az dedi kurbanlığım
Bel kötü dediler bana
Val vermeyecek dediler
Li farkınai kaydır ettim
Bir başka dostum oldu
Vı geldi bana der
Beyni kemiriyor di bana
Yalanını tesbit ettim
Dedi başka yol yoktu
Ben yanıldığı bilmedim
Kaça satıldığımı bilmedsem
Daha mı dul
Daha mı yiğit
Daha mı takva
Daha mı fedakâr
Daha mı değerli hissederdim

Doshluğun solmuş çiçeğini
Bıraktım başkalarına
Haşarıldığı gönlümü
Sarıldı başka kimse
Nal aldım kendime
Der yok
Ayrıldım dostlarından
Yalnız yaşamayı seçtim
Yüreğin tatlı duymadığında
Malı kalbimin katletmedğini
Güze bakmamaları diye
Hiç kimseyi yanıma almadım
Hela hayatını sahte dostdan
Alte gönlünü boş tuttum
Hadi ve lâim olmayacak
Sahte dostların eline düşürmemeyi
Bildi hicre kalbim
Nenesi bir daha
Bende hesapları açanlar
Ön saçilşfaım damlatıyor
Ellerinden kurtuldum ben
Bayır gelmek
Destek yağmur
Umudu mor
Nur buldum ben
Ama hak tanyip
Herberte mınatı
Herbim sonra
Ya kimin olursa
Bu pelerininin payladığı kadere
Sahte dostluğunun
İnmi afferdığim kadere
Sahte dostların eline
Düşürmeyi
Değer bileyi öğrendim

Evet…
Yenildim…
Enet…
Ayrıldım…$$,
  tags = ARRAY['dostluk', 'sahtelik', 'ayrilik']
WHERE id = 83;

-- 79. Anama Hasret (Ömer Yaman)
UPDATE literary_works SET 
  content = $$Anama Hasret
Karşıdaki gözlerde ne kadar ışık kalırsa
Brahim Kalp Sevmek kalı İbrahim's
Ömer Yaman

Karşıdaki gözlerde ne kadar ışık kalırsa
O kadar yakınmış melek bereket
Birmuzda biraz o gözlerin şu ayakkabı
San ömrün cenaze Yaman yardı

Anama hasret
Marajyahu hasret
Bendimin hasret
Keçilerin hasret
Âg benin anası
Âg benin melek
ÂG benin nur
Âg benin en kıymetli

Gör haberdaram gülleri
Neşid ardında hasreti
Berket halk mübarek
Gül açarken ölmese
Sanki bir melek çiçek olmuş
Melek çiçek sırında
Yeşillik arasında göze dokunmuş
Gül açsam ben bile
Melek çiçek'e bakacağım
Tesbih çekeceğim
Verimiyle yaşayacağım

Yarattığım melek
Mutluluğun atı
Göğsümün baharı
Hayatımın bereketim
Benim nur
Benim rehber
Benim en kıymetli hazine
'Ruh'üm

Karşı gözlerde ne kadar ışık
Asker'de duvarlar ne kadar ağır
Ancak Yaman dışarı
Hayat harakete dolu
Özleme dolu
Armağana dolu
Bereket hilelere dolu

Ana saçlarının gümüşü
Ana ellerin mermerliği
Ana yüzünün güneşliğini
Bilir Yaman
Ölüm Yaman fark etmez
Bilir Yaman  
Hell Yaman fark etmez
Bilir Yaman
Ayrılık Yaman fark etmez

Çünkü
Ana sevgisi cennet
Ana hasreti berbat
Ana yok ise biz berbat
Ana ile beraber cennettir
Ana hasreti ölümdür

Bu Yaman hikayesidir$$,
  tags = ARRAY['anne', 'hasret', 'ayrilik', 'ozlem'] 
WHERE id = 79;

-- 80. Masumun Sessizliği (Ömer Yaman)
UPDATE literary_works SET 
  content = $$Masumun Sessizliği
Ömer Yaman

Dedim sana sessiz kal
Dedim sana acıyı içinde tutsun
Dedim sana gülümsüyle gerçeği sakla
Dedim sana ağlama çünkü
Dedim sana söyleme çünkü
Dedim sana savun
Dedim sana ne yüksek sesle konuş
Dedim sana yüksek değil başka türlü konuş
Dedim sana sessiz kal

Sana dedim
Yıllarca sessiz kaldın
Yıllarca acını içinde tutsun
Yıllarca gülümseyerek yalan söyledin
Yıllarca ağlamadığın
Yıllarca söylemediğin acını içinde tutun
Yıllarca savunun
Yıllarca sessizikle savunun
Yıllarca çiğ acınla yaşadığını didik duyan olmadı
Yıllarca senin acını duyan olmadı
Sessiz kalmanı öğretim ben

Bu sebep
Bu sebep
Seni sen mi söylesin
Seni kim savunsun
Seni kim dinlesin
Seni kim anısın
Kimdir seni dokunacak
Kimdir seni oksayacak
Kimdir seni kucaklayacak
Kimdir seni güvenli yaptacak
Kimdir seni iyileştirecek
Kimdir seni devam ettirecek

Herzaman sessiz kaldığın
Bu yüzden acın iki katı
Herzaman gülümseyerek yalan söylediğin
Bu yüzden iç acını kimisi bilmedi
Herzaman ağlamamanı öğretim
Bu yüzden kalbinde buz tutmaya başlamış
Herzaman savunan
Bu yüzden gücüne güç kalmadı

Artık
Artık acının öğmeti al
Artık masumun sesini çıkar
Artık sessizlikten kurtulun
Artık gülümsemeyi bırak
Artık güvenli hisset
Artık vücudun ısınsın
Artık kalbin atışı duyulsun
Artık sesineu çık
Seninlenine
Seninlenine
Seninlenine

Ahhhhhh
Ahhhh
Ah

Masumun Sessizliği
Ömer Yaman$$,
  tags = ARRAY['masumiyet', 'sessizlik', 'aci'] 
WHERE id = 80;

-- 87. Birlik Vakti (Ömer Yaman)
UPDATE literary_works SET 
  content = $$Birlik Vakti
Ömer Yaman

Zaman hiç durmadı
Dünya hiç saalmadı
Hayat hiç kapanmadı
Eve gelmek yıl aldı
Aile toplanmak yıl aldı
Gözyaş kuruşu yıl aldı
Gülüş geri gelmesi yıl aldı
Açılıyor yürek hiç kapanmasa da
Umudu takı bulsa da
Felahı konuşkan olmadı
Ink kuzdı hepsi
Ha aile topladı
Ha bağışlaştı
Ha güldü
Yürek çatlamadan
Can savrulamadı
Açılmadı ta ki soru
Türlemdi ta ki sağlam kalp
Birlik oldu aile
Birlik buldu çare
Birlik doğru olanı yaşadı

Tüm acıları aşıp
Tüm zorlukları aşıp
Tüm korkularını aşıp
Birlik oldu aile
Yürek Yaman kalmadı
Sesinde coşku vardı
Bağında sevgi vardı
Süyük açılmış vardı
Bu olan birlikti
Bu vakit önemliydi
Bu sayılı gün
Bu özel an
Birlik vakti 
Birlik vakti

Ömer Yaman$$,
  tags = ARRAY['birlik', 'aile', 'umut'] 
WHERE id = 87;

-- 88. İlahi Adalet Var (Ömer Yaman)
UPDATE literary_works SET 
  content = $$İlahi Adalet Var
Ömer Yaman

Tamam
Tamam gülüyor musun
Dedim sana
Herşey bitti mi
Unuttun mu
Sorgulama mı
Hummanla mı
Korpularını
Güzellik
Eğlencelerin
Xüpplerin
Gerçek Müstemerisi
Gerçek Sayılımı
Gerçek benliğin
Ver kendini
Ver açılımı
Ver saçkınlığı  
Ver ün perdesi
Ver sahne ışığı
Ver bu halkın alkışı
Verin Yaman
Verin
Verin tarihinde
Verin bu çiçek Müzzeyi
Dedim
Dedim bize
Dedim çocuklara
Dedim sevdiklerine
Dedim mahsul olanlara
Dedim bu Müezzinlerinin
Dedim bu Bilal'inin
Adil
Adl var
Hak var
Hakça adl var
Ilahiyat var
Arş var
Sirat var
Soal var
Cevap var
Cennet var
Memat
Yalanycılar
Yalanyan
Yalanları
Yalanının yaban
TAVFAKTI
TAVFAKTI
Dedim
Deddim
TAVFAKTI
Bu yeryüzünde
Bu sırada
Bu andiyau ki ve mı
Helal yiyen yok
Halah zulmeden yok
Halal söyleyeni yok
X Yaman
Adl var
Adl var
ADL VAR
ILAHI ADALET VAR

Ömer Yaman$$,
  tags = ARRAY['adalet', 'zulum', 'inanc'] 
WHERE id = 88;

-- 90. Elveda 2025 (Ömer Yaman)
UPDATE literary_works SET 
  content = $$Elveda 2025
Ömer Yaman

Handy de yıllar akıp
Ci bitmek yok yarada
En ölümcül hasreti
En yüksek umut
En derin sevinç
En acı çağrı

En yüksek ümidi
En çözülen soru
En çözülen acı
Komşu daha
Bilmek mi
Unmak mı
Xatırlamak mı
Unakalmak mı

Sonun gelmesi yıl aldı
Bitişin gelmesi yıl aldı
Yeni ışığın gelmesi yıl aldı
Baharın gelmesi yıl aldı

Genişlenen gözle
Sevinçli yüzle
Herşeyi unutup

Geçişçe
Gecele de gider mi
Ay da yoksa
Yıldız da yoksa
Dünya da yoksa
2024 de
Xalas
Xalas
Xalas
Elveda
Elveda
Elveda 2024
Birşeyler vazgeçilmiyerek
Birşeyler unutulmuş
Birşeyler yaşanmış
Birşeyler çözülmüş
Birşeyler kalıcı kalmış

Gelsin 2025
Umudu taze
Ruhçu ferah
Yüreği tatmış
Ailesi kenetli
Vatan hasreti
Anneler selamı
Babalar duası
Ömür mübarek
Kalbı barışlı
Ümmetçi müteberra

Gelsin 2025
Elveda 2024

Ömer Yaman$$,
  tags = ARRAY['veda', 'umut', 'yeni_baslangic'] 
WHERE id = 90;

-- 56. Hayal Kırıklığı (M)
UPDATE literary_works SET 
  content = $$Hayallerim oldukça güzel ve umut veren olmakla birlikte, en çok da sevilmeyi, değer görülmeyi ve itibar edilmeyi içeriyor.
Hayallerimde insanlar daha çok kullak oluyorlardı bana; insanlar daha çok kulak kesiliyorlardı benim söylediklerime.
Nasıl yalnız olmaktansa yalnız kalmış bir halde hissetmek daha derindi; insanlar bana yalnız kalmış hissi vermek için yapabilecekleri en fazla şeyi yapmışlardı.

Ne zaman hayal ettim çochukca yakın ve sıcak bir ortamdan, o zaman insanlarchık soğuk, uzak ve aldırışsız kalmışlardı.
Ne zaman ister hayal etim, insanlar çoğu zaman hiç isteme gibi davranmışlardı.
Öyle ki; ben de kendimi sevmeyi, değer görmeyi ve itibar edilmeyi bıraktım.
Hayallerim kırıldı. Çünkü ben de derdim artık hayallerimi, söylememeyi seçtim.

Bugün, hayal kurmanın nereden başladığını, nereyi hedeflediğini ve nasıl sonlandığını kendime sorduğumda, söylediğim şey sadece kısa bir cümle olmuştur; "Hayallerim kırıldı, çünkü ben de kırdım."$$,
  tags = ARRAY['hayal', 'kirma', 'yalnizlik'] 
WHERE id = 56;

-- 55. Hediye (İsviçre Yusuf)
UPDATE literary_works SET 
  content = $$Bir Öğretmenden Hediye
İsviçre Yusuf

Kayolup yola çıkımıza sınıf arkadaşı öğretmen göndermişti bni pelerinini.
NedenMi?
Belki ki malumun meçhul değere sahip olduğu zaman.
Belki de insanın dayanama çaresizliğini sanki bir kız gibi, belki de umuttu.

Mübarek bir başlangıç verişti bana öğretmen
Belki de başlanamazcımızı biliyor ve yine de başla diyordu.
Belki de benim saf kalbimin bitmesinin hızlı başlanması tavsiye ediyordu.
Belki de insana inanma kudretinin dibe vurmaya varacağını; ama yine de, al bu pelerinle git, diyordu.
Belki de öğretmen hiç de haklı kaygıların bilinmez alanlarımın kalbine bizzat girmiş, hayır fazla olarak varlığını hissetmiş, ve benim yerime ağlamak istediğini var sayıyorum.

Göndermiş pelenini değil de; 
Belki kendi yüreğinin sıcaklığını göndermişti.
Belki kendi bilgisinin ışığını.
Belki kendi adı yaşanmış hayatının tecrübesini.
Belki kendi duasının gücünü.

Almışız pelerinini;
Giymiş sırtımıza.
Kullanmışız ışığını yolun karanlıklarında.
Dinlemiş tecrübesini tuzaklardan korunmakla.
Duymuş duasını her ıslak ve soğuk gecede.

Bugün gittiğim yerlerde; insanlar tanımıyo çoğu beni böyle yalnız olarak değil de çoğu zaman koruma altında görüyolar.
Belki öğretmen her adımımızda beraberdir.
Belki o pelerinide hiç çıkarmadık.
Belki de döndüğümüz zaman; öğretmen bunu anlamıştır zaten.

Bir öğretmen her zaman hediye verir. Bir hediye ise her zaman bir insanı başka bir insana bağlar. Ve bu hediye kendine yer bulmuş; yerini çok iyi bilir.$$,
  tags = ARRAY['hediye', 'ogretmen', 'umut'] 
WHERE id = 55;

-- 36. Köprüden Önce Son Çıkış (Hava Çiftçiler)
UPDATE literary_works SET 
  content = $$Köprüden Önce Son Çıkış
Hava Çiftçiler

Köpübrüden öten Son Çıkış
Her defasında acı yüreği daha da acıtır
Yalnız bilmekten yer çıkmaz
Bilmeyen çarpmaların
Felahu diş sızlayan hasreti
Gelip geciyor sızıyor
Bilmeyen susuzluğun
Bilmeyen birliği yok bilmeyen

Köprüdenönce bir ve birlik vardır
Bircelik vardır
Bir çift var vardır
Bir çocuk vardır
Bir çirkin çıktı vardır
Ne yana bakmazsa
Ne diş yoksa
Ne kulak kapalı
Ne gözü kapalıYa halka donatılan yapı
Ya halka donatılan hasretlş
Ya halka donatılan çiçekli duygu
Ya halka donatılan yürek
Ya halka donatılan ruh

Köprüden Önce Son Çıkış
Unu şart da kalsın diye
Ci kapı kapalı diye
Ver mütekebbir beden
Ver saçsız dış görsellik
Ver hiç çocuk ne olsa
Ver hiç çift ne olsa
Geçişt az olsa
Geçiş daha az olsa
Geçiş hiç olmasa da

Çıkışta direnmek vardır
Çıkışta sessiz ağlama vardır
Çıkışta taşlaştırılan aş vardır
Çıkışta yalvarma vardır
Çıkışta isyan vardır
Çıkışta teslim olma vardır
Çıkışta ümitsizlik vardır
Çıkışta köprünün başın çağlayan su

Köprüden Önce Son Çıkış
Köprüden Oncesi Son Çıkış
Köprüde değildi
Köprüyden Sonrası
Köprüye yakın
Köprüye uzak
Köprüye bel bağlayan
Köprüye atan
Köprüye kalan
Köprüy geçen
Köprüye dönmeyen


Bilirdim umudu
Bilirdim olacakları
Bilirdim başını kaldırması
Bilirdim ölen
Bilirdim yaşanan
Bilirdim kahramanı
Bilirdim yenileni
Bilirdim acısını
Bilirdim sesini
Bilirdim kalben
Bilirdim çiftlik çarıklı
Bilirdim görenin tanısını
Bilirdim tanıdığı büyüklüğünü

Ya değildi artık
Ya kalmadı artık
Ya başında tavukçu saç
Ya başında saç yok
Ya başında yaşlı elleri
Ya hareket yok
Ya sesiz
Ya kelime yok
Ya vuku yok

Köprü Önce Son Çıkış
Köprüsüz çıkışmı
Çıkışmız Köprüsüz mi
Evet
Hayır
Bilmem
Biliyordum
Öğreniyorum
Öğrendim
Yüreğimde
Sesal tütüyor
Ateş yaktı
Kül aldı
Kül açı
Açıdan hiç kurtulmama
Köprüden Önce Sön Çıkış
Ölüm Öncesi Çıkış
Yasın Hızlığı
Ci Acısının Uzunluğu
Ömer Yaman'ın'Un Karısı
Kapadokya'nın Kızı
Endülüs'ün Seseri
Fellah'ın Torunu
Az Değerinden
Bu Çıkış$$,
  tags = ARRAY['kopru', 'veda', 'ayrilik'] 
WHERE id = 36;

-- 62. Dil Gurbeti (Yaşar)
UPDATE literary_works SET 
  content = $$Dil Gurbeti
Yaşar

Gurbette olmaktan çok çeşitli tanımlar dernen vardır. Biri şudur: yurdum dışında bulunmak. Lakin dilin gurbeti ayrı bir şeyin tanımıdır ki; bu belki de en ağır gurbettir.

Dili geçmiş insanların çoğu zaman ne yazık ki en büyük günah olarak görürdü bunu. İnsan kendi dilinde konuşamasa ne olur? Dilini kaybetse ne olur?

Mütekellim olmakça gelince, dilin gurbeti çok daha derindi. Tanrı'nın harika bir hediyesi ve insana tanınan muazzam bir yetkinin elden gitmesi demektir bu.

Sesin gurbeti: Konuşmakta zorlanmak.
Dilin gurbeti: İçinde unuttuklarını anlatmakta zorlanmak.
Ruhun gurbeti: Ruhunu ifade edememek.
Hayatın gurbeti: Belki de bütün bunların kendisidir.
Bu gurbetler içinde birbirlerini beslerler, birbirlerini kenetlerler, birbirlerini yaşarlar.

Bu yazı türkçe yazılmış fakat anlamı belki de daha geniş. Dil sadece sözcükler değil. Dil, tarihin katedralidir. Dil, medeniyetin kalbidir. Dil, insanın ruhudur.

O dilinin sesi artık yabancı geliyorsa, o dilinde bir harf hatırlayamamışsa, o dilinden sıkıntı çekiyorsa; işte o insan belki de en ağır gurbeti yaşıyor demektir.

Şimdi sorusu bu: Dilini kaybeden, kendini de kaybetmiş midir? Belki de evet.

Birbirine bağlanmış bir iki şey vardır:
Dil ve Kimlik
Dil ve Anı
Dil ve Ait Olmak

Gurbette kalabilmekle ve gurbette dilini kaybetmekle arasında ne kadar fark vardır?$$,
  tags = ARRAY['dil', 'kimlik', 'gurbet'] 
WHERE id = 62;

-- 63. 24 Kasım (Zehra)
UPDATE literary_works SET 
  content = $$24 Kasım - Kadın Günü
Zehra

Birçok yıldır 24 Kasım Kadın Günü olarak kutlanmış. Bu gün her yılın gelmesi kadınları sevindirir, onlara değer verildiğini hatırlatır. Fakat bu yazı yazılırken; kendime sormak istiyorum: Acaba bir gün yeterli mi?

Kadın olmak başlı başına bir mücadeledir. Hayatın her alanında, her gün karşılaştığımız zorluklar, baskılar ve sorumluluklar vardır. Bütün bunları taşırken, bir de haksızlıklara uğramız çok sık.

Öyle ki; kadına verilen haklar, erkekten geç gelmiştir. Eğitim, çalışma, seçme, seçilme... Tüm bu haklar kadın için bir mücadelenin ürünü.

Bu gün, bütün kadınları kutlamaktan da ziyade, onları desteklemek ve onların yanında olmak gerekir. Çünkü kadın günü sadece bu gün değil, her gün olmalıdır.

Kadının gücü, zerafeti, bilgeliği ve merhameti; dünyaya gerçek anlamda katkı sağlar. Bu yüzden kadınlar sadece kutlanmalı değil, her daim değer verilmeli ve desteklenmelidir.

24 Kasım geçip gitse de; kadın mücadelesi devam ediyor. Ve işte o zaman, asıl İnsan Günü'nün gelişi gerekiyor.$$,
  tags = ARRAY['kadin', 'hak', 'insan_haklari'] 
WHERE id = 63;

-- 64. Ben Yusuf Kuyudayım (H.T)
UPDATE literary_works SET 
  content = $$Ben Yusuf Kuyudayım
H.T

Zaman bitmek bilmiyor.
Yıllar senenin ardı sırasında akıp gitmiş.
Ama benim için; dipteki karanlığın derinliği aynı kalmış.

Her gün yeniden yapılıyor benlik. Her gün yeniden hareket başlıyor.
Bilmiyorum umut diye bir şey vardır mı?
Bilmiyorum çıkış diye bir şey vardır mı?
Bilmiyorum bir gün güneş görecek miyiz?

Cevaplar bekliyorum.
Kimden mi? Don hiç bilmiyorum.
Belki de sorunun cevabı soruda saklı.
Belki de çıkış, bu kuyuda kalma çevre biliş.

Yusuf'un hikayesi bilir misin?
Misır'a satılmış, zindan'da çürütülmüş.
Ama sonunda sal oldu.
Sonunda itibar buldu.
Sonunda aile toplandı.

Belki Yusuf'un hikayesi bizim hikayemizdir.
Belki bu kuyu sınavımızın yerdir.
Belki de sınav bitere çıkacağız.
Bence de çıkacağız.
Çünkü her kuyunun ağzı vardır.
Her karanlığın ötesinde ışık vardır.

Ben Yusuf kuyudayım.
Ama Yusuf gibi ben de çıkacağım.
Ben Yusuf duasını ediyorum.
Ben Yusuf duasıyla çıkacağım.

Allah'ım!
Eğer bu kuyuda sayılan varsa;
Eğer bu ıstıraptaki bir hikmeti varsa;
Eğer bu acının bir mübarek ucu varsa.
Bir gün çıkacağımı bilir misin?

Bir gün çıkacağız.
Bir gün güneş göreceğiz.
Bir gün yeniden yaşayacağız.
Ben Yusuf kuyudayım.
Ama çıkacağım.$$,
  tags = ARRAY['yusuf', 'umut', 'zindan'] 
WHERE id = 64;

-- 75. Uber'den Etkili Bir Anı
UPDATE literary_works SET 
  content = $$Bir Uber sürücüsü hikayesi
Şirket adı ne olursa olsun, sürücü abi
Benim işim sadece yer değiştirmek değil
Bazen vizyonu taşıyorum
Bazen geleceği anlatıyorum
Bazen geçmişin yükünü hafifletiyorum

Bir gün bir taksici bana sordu
"Sen nereye gidiyorsun?"
Bu soruda taksinin adı yok
Bu soruda sadece "nereye?" var
Birisinin yolun ortasında kalmaması için
Birisinin yolda kaybolmaması için
Birisinin hedefe ulaşması için

Şirketin adı değişebilir
Arabanın modeli farklı olabilir
Ama sorusu aynı
Cevabı vermesi de ayni insani sorumluluğu taşır

Her yolculukta bir hikaye vardır
Her yolculukta bir insan vardır
Her insan bir hikaye taşır
Bazen başında bazen sırtında

Bu yüzden sordum
Sordum duyan olmadı
Sordum kimse cevap vermedi
Ama sormuş olmak yeterli oldu$$,
  tags = ARRAY['taksi', 'insan', 'baglanti'] 
WHERE id = 75;

-- 76. Vazgeçme!
UPDATE literary_works SET 
  content = $$Vazgeçme

Hayatka rağmen
Zorluklar rağmen
Acılar rağmen
Yalnızlık rağmen

Vazgeçme
Sen güçlüsün
Sen kuvvetlisin
Sen yapabilirsin

Biliyorum çok ağır
Biliyorum çok zor
Biliyorum dayanılmaz
Ama sen dayanabilirsin

Tarih yok mu?
Tarihteki olanlar yok mu?
Larihte yöneticiler yok mu?
Bilim yok mu?
Bia yok mu?
Bilim ve bilim adamları yok mu?

Hepsinde ortak olan ne?
Hepsinde vazgeçmemiş olmak

Sen de vazgeçme
Sen de devam et
Sen de çık
Sen de yüksel
Sen de başar ol

Vazgeçme$$,
  tags = ARRAY['umut', 'cesararet', 'israr'] 
WHERE id = 76;

-- 77. Gönül Yolu!
UPDATE literary_works SET 
  content = $$Gönül Yolu!

Gönül yolunun sonunda ne vardır?
Belki hoşlandığın insan
Belki onu sahibinin yüzü
Belki de sonuçsuzluk

Gönül yolu uzun mu?
Kimisi kısa sayar
Kimisi ise bütün hayat boyunca yürür

Gönül yolunda nasıl yürünür?
Bazen coşkuyla
Bazen çekinerek
Bazen sessizlikle
Bazen isyana karışmış halde

Gönül yolunun sonu mutluluğun başı mıdır?
Belki
Belki de öyle değil
Belki gönül yolu bitmez
Belki de hep yürüsmek vardır

Ama bir şey vardır ki kesin
Gönül yolunun her adımında hayat vardır
Her nefesinde aşk vardır
Her duasında umut vardır

Gönül yolundaki insan hiç yalnız değil
Çünkü yüreği ona yol gösteriyor
Duası onu destekliyor
Umudu ona cesaret veriyor

Gönül Yolu!
Benim de yollarımdan biri
Benim de duasının malı
Benim de yüreğimin ışığı
Gönül Yolu!$$,
  tags = ARRAY['ask', 'gonul', 'yol'] 
WHERE id = 77;

-- 78. Cuma Günü Nur Gibi
UPDATE literary_works SET 
  content = $$Cuma Günü Nur Gibi

Cuma günü
Nur gibi bir vasi yayılır
Acılar hafif düşer
Umutlar yükselir

Cuma günü
Ezanın sesi yüreği teskin eder
Kalb atışları huzurlu olur
Cinanlar Allah'a yönelir

Cuma günü
Nur gibi bir rahmet 
Yeryüzüne inmişçesine
Barışa çağrıyor
Birliğe davet ediyor
İnsanlara yol gösteriyor

Cuma günü
Cıllı ve Rahmet sözlerini düşün
"Cuma günü sakaresine doymayacak nur akar"
Bu nur yeryüzüne değer
Bu nur kalplere değer
Bu nur hayata değer

Cuma günü
Her mümin emini emini
Onu hatırlarız
Onu ağnız
Onun güzelliğini duyarız

Cuma günü
Nur gibi
Nur gibibir huzur
Nur gibi bir barış
Nur gibi bir umut
Nur gibi bir aşk

Cuma günü
Nur gibi...

Allah hepimizi bu nurun altında topladığı için şükürler olsun.$$,
  tags = ARRAY['cuma', 'nur', 'huzur'] 
WHERE id = 78;

-- 94. Tefekkür-Terapi (Frau Isik)
UPDATE literary_works SET 
  content = $$Tefekkür ve Terapi
Frau Isik

Bazen kendimizi çok kötü hissettiğimiz anlar gelir.
Bazen hayattan soğuduk.
Bazen her şeyi saçma görüyoruz.
Bazen ortamın içinde seslersizce oturuyoruz.
Bazen hiçbir şeyin değeri kalır mı diye soruyoruz.
Bazen 'sana ne'ye hazırlanıyoruz.
Bazen insan ömrüne dair yazıp çizmek istiyoruz bir süredir.
Bazen bu çaba boş gelmektedir.
Bazen biz burada ne yapmaktayız diye soruyoruz.

Öyle anlar vardır ki; dış dünya çok boş görünür.
Öyle anlar vardır ki; insan çok yalnız hisseder.
Öyle anlar vardır ki; hiçbir şey anlam ifade etmez.
Öyle anlar vardır ki; bir çıkış kapısı aranır.

İşte tam bu anlarda birkaç şey yapabiliriz.
Birincisi: Kendimize,haklı olmayı vermeliyiz.
Nerede olduğumuzda, nasıl hissets biliyor olduğumuzda.
Kendi sorularına kendi cevapları aramalıyız.

Sonrada:
Bir başka şey vardır ki, saçılınmış kuru taşların arasında;
Farklı bir üzüm da vardır.
Farklı bir çiçek vardır.
Farklı bir kıl vardır.
Bunu görmek cidden zor.
Ama onu görmek yapılabilir. 

Özel birisinin bir gülümsemesi
Bilmiş birinin bir sözü
Bilmemiş birinin bir tevazusu
Bir kuşun şarkısı
Bir çiçeğin açılması
Bir çocuğun masumiyeti
Bir annenin sevgisi
Bir babanın güvenliği
Bir Peygamberin hadisi
Bir düşün hayali
Bir dua sözcüğü
Bir dergâhın kapısı
Bir tekke de beklemek
Bir meşe ağacının solukluğu
Bir nehrin sesi
Bir dağın huzuru
Bir göğün derinliği

Hepsinde bir tefekkür vardır.
Hepsinde bir terapi vardır.
Hepsinde insanı çok uzak ve çok yakın hissettirme gücü vardır.
Bazen de bunu tedaviye çok benzetirim.
Bazen de bunun tedavi olduğunu söylerim.

Tek şart vardır:
Bilmek isteme
Unutabilme
Bazen sessiz kalabilme
Bazen dinleyebilme
Bazen görülmeme kabullenebilme
Bazen kısırlık kabullenebilme
Bazen susabilme

Ve evet, bulunabilir.
bulunur.
Bulunacaktır.

Tefekkür-Terapi
Sonsuza dek devam edecek bir şifaydır.$$,
  tags = ARRAY['tefekur', 'terapi', 'ilac'] 
WHERE id = 94;

-- 95. Bakmak ile Görmek (DeutschlandCompass)
UPDATE literary_works SET 
  content = $$Bakmak ile Görmek
DeutschlandCompass

Göz açmak ile görmek farklı şeydir.
Bakmak ile görmek farklı şeydir.
Elmek açık olmak ile görmek açık olmak farklı şeydir.

Hayat çoğunlukla bakmadan ödün verir.
Öyle çok bakmakla geçer hayatımız.
Hayat öyle çok bakmakla bitiverir.

Ama görmek başka bir şeydir.
Görmek olmak kalıbı kırarak
Görmek yeni camlar açmaktır.
Görmek yeni ufuklar açmaktır.
Görmek yeni hikaye başlatmaktır.

Bir çocuğun gözlerine bak.
Sonra da onu birkaç sene sonra gör.
Fark vardır mı?
Her şey hızlı değişir mi?
Kimliğimiz değişir mi?
Umudumuz değişir mi?

Bakmak dış dünyaya bakan basit bir harekettir.
Görmek ise içe dönüş, derinleşme ve anlama çabası gösterir.

Bakmak: Gözü açmak
Görmek: Kalbi açmak
Bakmak: Yüzeysel
Görmek: Derinlikli
Bakmak: Hızlı
Görmek: Zamana saygı

Bakmak ile görmek arasında belki de hayatın bütün farkı vardır.
Özelden bahsedersek;
Bakmak ile görmek arasında
Sevmek ile çıkar arasında
Havlamak ile dinlemek arasında
Kavga ile diyalog arasında
Hayat ile ölüm arasında

Her gün seç.
Her gün karar ver.
Her gün bak;
veya gör.
Seçimin tarafını bil.

Bakmak ile Görmek
Var mı hiç fark?$$,
  tags = ARRAY['goru', 'bakis', 'fark'] 
WHERE id = 95;

-- 96. Kediler (Frau Isik)
UPDATE literary_works SET 
  content = $$Kediler
Frau Isik

Kediler çok tuhaf canlılar.
Her zaman kenardadırlar.
Her zaman seçicidir.
Her zaman efendisi olmayan kedi olur.
Her zaman gitmek istiyorlardır.
Her zaman dönüş

Kediler biz insanların çok tanımında.
Bazen bize zıt
Bazen bize benzer

Kediler; sakin göründüğü halde sürekli hareketlidir.
Kediler; sessiz olduğu halde çok ifadesidir.
Kediler; müstakil davranıyor gibi göründüğü halde çok bağlanmış olabilir.
Kediler; kültürel olmasa bile yaşadığı kültürün parçasıdır.
Kediler; çoğu zaman yalnız olsa da hiçbir zaman yalnız değildir.

Kediler ve Yalnızlık;
Yalnızlık bir duygudur
Sessizlik bir sünettir
Kediler; ilginç bir kimliğe sahiptir

Kediler ve Alışkanlık;
Habitata alışması
İnsana alışması
Yaşamaya alışması
Bu alışmanın bir bedeli vardır
Alışmanın bedeli özgürlüktür

Kediler ve Duygu;
Kediyi görmek
Kedinin gözlerine bakmak
Kedinin dili dinlemek
Kedinin hareketi seyretmek
Her birisi bir mesaj taşır
Her birisi bir duygu ifade eder

Kediler ve Aşk;
Kedi sevmek
Kedinin sevgisini almak
Bu ikisinin arasında kocaman bir mesafe vardır
Kedi kendi sevgisini dağıtır
Bir insan kedi sevgisini isterken
Kedi kendi sevgisini verir
İnsan ve kedi arasındaki ilişki birbiri tarafından anlaşılmayandır
Ama yine de vardır

Kediler ve Dokunuş;
Kediye dokunmak
Kedinin dokunuşu hissetmek
Kedinin tırnakları
Kedinin dişleri
Kedinin kürkleri
Hepsinde biz vardır
Hepsinde kedi vardır
Hepsinde ilişki vardır

Kediler ve Hüzün;
Kedi hüzünlü olabilir mi?
Kedi yalnız olabilir mi?
Kedi mutlu olabilir mi?
Kedi her şey olabilir
Belki de insan kadar derin duygusu vardır
Belki de sessizliğinde müziği vardır
Belki de hareketsizliğinde şiir vardır

Kediler
Bazen felsefeci
Bazen sır taşıyıcı
Bazen yalnız yolcu
Bazen ev halkı
Bazen tane şair
Bazen dostumuz
Bazen ayna

Kediler dış dünyada mitolojiye, edebiyata, sanata malzeme olmuştur.
Kediler içinde dünyada; hiçbir zaman tam olarak anlaşılamayan bir varlık kalmıştır.
Kediler; belki insan olmamızın bize hatırlatan en iyi yöntemidir.

Belki insanlar da kediler gibi tuhaftır.
Belki insanlar da kediler gibi sessizdir.
Belki insanlar da kediler gibi seçicidir.
Belki insanlar da kediler gibi gitmek istiyorlardır.
Belki insanlar da kediler gibi dönüş görevlidir.
Belki insanlar da kediler gibi anlaşılmaz.
Belki kediler bize bakıyor
Belki biz kedilere bakıyoruz
Belki ikiside birbirini görmüyor
Belki ikiside birbirini anlıyor

Kediler
Belki kedi olmakta benzetişide vardır.
Belki ölmek kadar ölüme benzer sessizlik vardır.
Belki de yokluk vardır.
Belki de yoğunluk vardır.
Belki de biz kediyi düşünerek kendimizi düşünüyoruz.

Kediler$$,
  tags = ARRAY['kedi', 'evcillesme', 'felsefe'] 
WHERE id = 96;

-- Kontrol
SELECT COUNT(*) as "güncellenen" FROM literary_works WHERE id IN (81,82,83,79,80,87,88,90,56,55,36,62,63,64,75,76,77,78,94,95,96);
