-- Mevcut Almanca Öğretmenliği sorularını temizle (varsa)
delete from public.faqs where profession_slug = 'almanca-ogretmenligi';

-- Yeni soruları ekle
insert into public.faqs (profession_slug, question, answer, display_order) values
(
  'almanca-ogretmenligi',
  'Almanya''da entegrasyon kurslarında ders verebilmek için hangi dil sertifikasına ihtiyacım var?',
  'Entegrasyon kurslarında ders verebilmek için C1 Almanca Sertifikası neredeyse olmazsa olmaz bir şarttır. BAMF (Federal Göçmen ve Mülteciler Dairesi) tarafından kabul edilen C1 sertifikaları arasında genellikle Telc C1 Allgemein, TestDaf ve DSH bulunmaktadır. Ancak, bazı tecrübelere göre DSH-2 kabul edilmeyebilirken, güncel listede Telc C1 Allgemein ve DSH-3''ün yer aldığı görülmüştür.',
  1
),
(
  'almanca-ogretmenligi',
  'Diploma Denkliği (Anerkennung) süreci neden önemlidir ve bu süreçte hangi kurum yetkilidir?',
  'Almanya''da mesleği icra edebilmek için diplomaların tanınması (Anerkennung) önemlidir. Mutlaka olması gereken belgeler arasında ZAB''dan (Zentralstelle für ausländisches Bildungswesen) Anerkennung yaptırılmış diplomalarınız (Master, Lisans) ve Transkriptleriniz yer alır. Diplomanın yabancı bir Alman diplomasına eşdeğer olup olmadığı, üniversitenin anabin''de "H+" olarak listelenmesine, belirtilen çalışma süresine uyulmasına ve yeterliliğin "eşdeğer" veya "denk" olarak değerlendirilmesine bağlıdır.',
  2
),
(
  'almanca-ogretmenligi',
  'ZAB''a başvuru yaparken Türkçe belgeleri yeminli tercüme ettirmem gerekiyor mu?',
  'ZAB''a başvuru için Türkçe belgeler ve transkriptler genellikle yeterlidir, yeminli tercümeye hemen gerek olmayabilir.',
  3
),
(
  'almanca-ogretmenligi',
  'Entegrasyon kurslarında ders verebilmek için ilk adım ne olmalıdır?',
  'Sürece başlamadan önce en mantıklı yol, doğrudan BAMF''a başvurmak (Antrag formu 630-107 ile) ve evraklarınızı göndererek eksiklerinizi öğrenmektir. Başvuru belgeleri (C1 sertifikası, diploma, transkriptler, CV, tecrübe belgeleri vb.) posta yoluyla gönderilmelidir (fotokopi yeterlidir). BAMF, belgeleri inceledikten sonra size ek eğitim (Weiterbildung) almanız gerekip gerekmediğini veya doğrudan başlayıp başlayamayacağınızı bildirecektir.',
  4
),
(
  'almanca-ogretmenligi',
  'BAMF''tan doğrudan onay (Direktzulassung) kimlere verilebilir?',
  'Doğrudan onay (Direktzulassung) alma potansiyeli yüksek olanlar şunlardır:
• Almanca Öğretmenliği mezunları.
• Sınıf Öğretmenleri (okuma yazma öğretme tecrübesi nedeniyle).
• Diğer Dil Öğretmenliği (İngilizce, Türkçe) veya dil edebiyatı mezunları.
• Bazı kişilere 12 yıllık öğretmenlik deneyimi ve C1 sertifikası ile doğrudan Zulassung verildiği görülmüştür.
Ancak Fen-Edebiyat mezunları gibi bazı durumlarda, 100 saatlik DaF/DaZ Weiterbildung gerekli olabilir.',
  5
),
(
  'almanca-ogretmenligi',
  'Gönüllü çalışma tecrübesi (ehrenamtliche tätigkeit) veya staj (hospitation) Zulassung için kabul edilir mi?',
  'Hayır, gönüllü çalışma tecrübesi veya staj, Zulassung için gerekli mesleki tecrübe olarak kabul edilmez.',
  6
),
(
  'almanca-ogretmenligi',
  'Eğer doğrudan onay alamazsam (Direktzulassung), ne yapmam gerekir?',
  'Doğrudan onay alınamazsa, BAMF DaF/DaZ ZQ (Zusatzqualifizierung) eğitimine katılmanızı ister. Bu eğitim genellikle 140 saat sürer ve 5 modülden oluşur.',
  7
),
(
  'almanca-ogretmenligi',
  'ZQ kursunun maliyeti nedir ve BAMF bu ücreti geri ödüyor mu?',
  'Kurs ücreti (örneğin 1300 Euro civarı) ilk başta kişi tarafından ödenir. BAMF, bu ücreti 900 ders saati (UE) ders verdikten sonra kısmen (yaklaşık 800-1200 Euro) geri ödeyebilir, ancak bunun için kursa başlamadan önce BAMF onayı almış olmanız gerekir. BAMF''ın onay yazısı gelmeden kayıt olunursa ücret geri ödenmez.',
  8
),
(
  'almanca-ogretmenligi',
  'ZQ kursunu tamamlamak için ne tür bir şart istenir?',
  'ZQ sonunda genellikle 25 sayfalık bir Portfolio ödevi veya Abschlusstest (Goethe DLL için) istenir. Portfolio hazırlamak zorlayıcı ancak pedagojik ve metodik açıdan çok faydalı bir tecrübe olarak görülmüştür.',
  9
),
(
  'almanca-ogretmenligi',
  'Okuma yazma bilmeyen yetişkinlere (Alpha Kursu) ders verebilmek için ek bir izin gerekiyor mu?',
  'Evet, Alphabetisierungskurs (Alpha Kursu) verebilmek için ayrı bir Zulassung gerekir. Sınıf öğretmenleri, okuma yazma öğretme tecrübeleri nedeniyle Alpha kursu için de doğrudan onay alabilirler. Diğer branş öğretmenleri için ek eğitim (Fortbildung) alınması gerekebilir.',
  10
),
(
  'almanca-ogretmenligi',
  'DaF/DaZ öğretmenleri genellikle hangi statüde çalışır ve güncel ders saati (UE) ücreti ne kadardır?',
  'DaF/DaZ öğretmenliğinin büyük çoğunluğu Honorararbeit (serbest çalışma) veya Freiberufler olarak yapılmaktadır. BAMF kurslarında güncel ders saati ücreti (Unterrichtseinheit - UE) 41 Euro brüttür (bazı yerlerde 42 Euro olarak da belirtilmiştir).',
  11
),
(
  'almanca-ogretmenligi',
  'Honorararbeit (Serbest Çalışma) statüsünün finansal riskleri nelerdir?',
  'Honorar çalışmada, brüt ücret üzerinden sigorta, emeklilik ve vergi kesintileri tamamen öğretmenin sorumluluğundadır. Net ücretin yaklaşık 20-25 Euro civarında kalması beklenir. En büyük dezavantajı, hastalık, kaza, yaz tatili (Ostern, Weihnachten, Herbstferien) gibi çalışılmayan dönemlerde gelir elde edilememesidir. Bu durumlar için birikim yapmak zorunludur.',
  12
),
(
  'almanca-ogretmenligi',
  'Honorar çalışan olarak sigorta ve emeklilik işlemlerini nasıl yönetmeliyim?',
  'Honorar çalışanlar, sağlık sigortaları (Krankenkasse) ve emeklilik sigortaları (Deutsche Rentenversicherung) ile iletişime geçerek kazançlarını bildirmeli ve primlerini kendileri ödemelidir. Ayrıca yıllık kazanca göre Finanzamt''a vergi beyannamesi verilmelidir.',
  13
),
(
  'almanca-ogretmenligi',
  'Kadrolu çalışma (Festanstellung) imkanları var mıdır?',
  'Festanstellung (kadrolu/maaşlı çalışma) tercih edildiğinde, hastalık ve tatil gibi riskler kurum tarafından üstlenilir. Ancak Feststelle için teklif edilen brüt maaş (Honorar çalışmaya göre düşük olabilir (örneğin tek kurs için 1950 Euro brüt).',
  14
),
(
  'almanca-ogretmenligi',
  'BAMF entegrasyon kursları dışında okullarda öğretmenlik yapabilir miyim?',
  'Evet, Zulassung almasanız dahi:
1. Ücretli Öğretmen (Honorararbeit): Doğrudan çalışmak istediğiniz okulun müdürü ile görüşerek ve müdürün valilik (Bezierksregierung) onayıyla işe başlayabilirsiniz.
2. Başka meslek gruplarından olanlar (örneğin Fizik mezunu) da, okul müdürünün dilekçesi ve merkezin onayıyla okulda Fizik öğretmeni olarak işe başlama imkanına sahiptirler.
3. Denklik alamayanlar için alternatif olarak sosyal ve eğitim alanlarında Erzieher veya Sozialarbeiter gibi meslekler veya Jobcenter destekli Weiterbildung/Ausbildung programları mevcuttur.',
  15
),
(
  'almanca-ogretmenligi',
  'İş kurma veya işe başlama aşamasında Jobcenter''dan destek alabilir miyim?',
  'Evet. Sosyal sigortaya tabi veya bağımsız bir kazanç sağlayıcı faaliyete başlandığında Jobcenter, yardıma muhtaçlığın üstesinden gelinebilmesi için zamansal olarak sınırlı bir avans (Einstiegsgeld) ödeyebilir (azami 24 ay). Bu destek, işe başlamadan önce talep edilmelidir; işe başladıktan sonra talep edilirse ödenmeyebilir.',
  16
),
(
  'almanca-ogretmenligi',
  'Jobcenter ile çalışırken dikkat etmem gereken temel yükümlülükler nelerdir?',
  'İşe başlandığında veya gelir/mal varlığında değişiklik olduğunda Jobcenter''a derhal bilgi verilmesi zorunludur. Jobcenter, yardıma muhtaç kişilerin yapabileceği her işi kabul etmesini bekler (Zumutbarkeit). Yükümlülük ihlali (Meldepflicht veya Eingliederungsvereinbarung''a uyulmaması) durumunda İşsizlik Parası II kesilebilir (Sanktionen - %10''dan %100''e kadar).',
  17
),
(
  'almanca-ogretmenligi',
  'Mülakatlara nasıl hazırlanmalıyım ve hangi konulara odaklanmalıyım?',
  'Mülakat öncesi prova yapılması ve 2-3 kişilik çalışma grupları oluşturulması önerilir. Özgeçmiş (Lebenslauf) ve Motivasyon Mektubu (Anschreiben) detaylı hazırlanmalı; Türkiye ve Almanya''daki tüm çalışmalar, başarılar ve eğitim anlayışı belirtilmelidir. Mülakatlarda derste izlenecek yöntemler (heterojen sınıflar), takım çalışmasına bakış açısı, kurumun neden seçildiği ve önceki deneyimleriniz sorulabilir. Anschreiben hazırlarken yapay zeka araçlarından faydalanılabilir.',
  18
),
(
  'almanca-ogretmenligi',
  'Entegrasyon kurslarında yaygın olarak hangi ders kitapları kullanılır?',
  'Entegrasyon kurslarında yaygın olarak kullanılan ders kitapları Schritte plus neu, Linie 1, Pluspunkt gibi yayınevlerinin (Hueber, Cornelsen, Klett) kitaplarıdır. Yayınevleri, öğretmenlere talep üzerine kitapların dijital versiyon kodlarını ücretsiz gönderebilmektedir.',
  19
),
(
  'almanca-ogretmenligi',
  'Zulassung almadan tecrübe edinmek mümkün müdür?',
  'Evet, Zulassung olmadan da tecrübe edinmek mümkündür. VHS''lerde (Halk Eğitim Merkezleri) veya proje kurslarında (ADD, Mia Kursları) ders verilebilir. Yeni başlayanlara, ilk acemiliklerini atmak için A1 seviyesinden başlayarak bir kursu devam ettirmeleri tavsiye edilir.',
  20
);
