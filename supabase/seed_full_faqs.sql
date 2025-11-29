-- Mevcut Matematik Öğretmenliği sorularını temizle
delete from public.faqs where profession_slug = 'matematik-ogretmenligi';

-- Yeni soruları ekle
insert into public.faqs (profession_slug, question, answer, display_order) values
(
  'matematik-ogretmenligi',
  'Almanya’da öğretmenlik yapabilmek için hangi denklik işlemlerini yapmam gerekir?',
  'Temel olarak iki işlem yapılması gerekmektedir:
1. ZAB (Bonn) Diploma Tanınma: Üniversite diplomanızın akademik olarak tanınmasıdır. ZAB değerlendirmesi ücretlidir (yaklaşık 200 Euro) ancak Jobcenter ile görüşülerek bu ücret karşılanabilir.
2. Mesleki Tanınma (Berufliche Anerkennung): Bu, ilgili eyaletin kurumları (Lehrkräftakademie) tarafından yapılır (örneğin NRW için Detmold). Bu işlem, hangi okul türünde öğretmenlik yapabileceğiniz ve varsa eksik kredilerinizin (ikinci branş gibi) ne olduğunu belirleyen 3-4 sayfalık bir değerlendirme raporu sunar.
Bu iki işlem birbirinden bağımsız olarak başlatılabilir; birinin sonucuna ihtiyaç duymadan diğerine başlanabilir.',
  1
),
(
  'matematik-ogretmenligi',
  'Denklik sürecinde Türkiye''deki öğretmenlik tecrübemi nasıl kanıtlamalıyım? Özellikle KPSS ve stajyerlik (Referendariat) durumları ne oluyor?',
  'Denklik kurumları bazen stajyerliğin kalktığına dair belge (adaylık kalktı belgesi) veya KPSS sınavına girmiş olma şartı isteyebilir. Ancak, KPSS''ye girme zorunluluğu yoktur. Referendariat’tan muaf tutulmak için kanıt olarak E-Devletten alınan Hitap Hizmet Dökümü (sigortalı olarak çalışılan kurumları gösteren hizmet cetvelinizin tercümesi) sunulmalıdır.',
  2
),
(
  'matematik-ogretmenligi',
  'Tek branş (Matematik) ile öğretmenlik yapabilir miyim? İkinci branş (Zweites Fach) edinmek zorunlu mudur?',
  'Tek branşla öğretmenlik yapmak mümkündür ve bazı eyaletler (NRW, Bremen, Hessen) buna olanak tanır. Ancak denklik raporunda genellikle ikinci bir branş okuması gerektiği belirtilir. İkinci branş tamamlanırsa maaşınız 1,5 katına kadar çıkabilir.',
  3
),
(
  'matematik-ogretmenligi',
  'İkinci branş olarak Matematik öğretmenleri hangi alanları tercih edebilir ve bunu nasıl tamamlarlar?',
  '• Alternatifler: Lisans/Yüksek Lisans transkriptlerindeki Sosyoloji, Felsefe, Psikoloji veya Etik gibi dersler kredi olarak sayılabilir.
• Zorlu Seçenek: Informatik (Bilgisayar Öğretmenliği) branşı, Türkiye’deki muadilinden farklı olup, Yazılım Mühendisliği''nin temel modüllerini (60 kredi) aldırmayı gerektirebilir ve oldukça zorlayıcı olduğu ifade edilmiştir.
• Tamamlama: İkinci branşı tamamlamak için üniversitede Anpassungslehrgang (uyum kursu) yapmak gerekir. Bu kurslar için genellikle C1 şartı aranır, ancak bazı bölümler B2 ile de kayıt yapabilmektedir.',
  4
),
(
  'matematik-ogretmenligi',
  'Öğretmenlik için kesinlikle C1 seviyesi şart mıdır?',
  'Süresiz sözleşmeli (unbefristet) veya kadrolu (Beamter) öğretmen olmak için genellikle C1 seviyesi şarttır. Ancak, mesleğe başlamanın farklı yolları mevcuttur:
• Lehrkräfte Programları: Başvuru için minimum B1 seviyesi yeterlidir.
• Nachhilfe (Özel Ders) / Vertretungslehrer (Vekil Öğretmen): B1/B2 seviyesi ile başlanabilir. B1 ile zor olsa da, tecrübenizi ve motivasyonunuzu anlatarak işvereni ikna edebilirsiniz.',
  5
),
(
  'matematik-ogretmenligi',
  'Dil eksiği varken bile bir okulda çalışmak neden önemlidir?',
  'Okullarda Hospitasyon (ders gözlemlemek) veya ücretli/vekil öğretmen olarak çalışmak, hem normal dili hem de alan dili (Fachsprache) gelişimine büyük katkı sağlar. Okul ortamına girmek, kafadaki kaygı, korku ve belirsizlikleri netleştirir. Düşük dil seviyesiyle derse başladığınızda, öğrencilere Almanca eksiklerinizi ifade ettiğinizde, onlara matematiklerinde yardımcı olunduğu için dilinize çok takılmadıkları tecrübe edilmiştir.',
  6
),
(
  'matematik-ogretmenligi',
  'Türkiye’den gelen öğretmenler için en kestirme ve en çok tavsiye edilen kariyer yolu nedir?',
  'Lehrkräfte Plus/RTP (Refugee Teachers Program) gibi üniversite tabanlı programlar, Almanya''da öğretmenliğe başlamak için en kestirme yol olarak görülmektedir.
• Avantajları: Öğretmenler, 1 yıl gibi kısa bir sürede pedagojik ve alanlarıyla ilgili yetiştirilir. Bu programlar C1 dil seviyesine ulaşmayı sağlar ve branş terminolojisini öğretir. Başvuru için en az B1 Almanca ve iki yıllık mesleki deneyim şartı aranır.
• Sonuç: Programı başarıyla bitirenler, en iyi ihtimalle süresiz sözleşmeli öğretmenlik (unbefristet Vertrag) statüsü kazanabilir.',
  7
),
(
  'matematik-ogretmenligi',
  'Matematik öğretmenleri için Almanya’daki farklı öğretmenlik statüleri nelerdir?',
  '1. Memur (Beamter): Yabancılar için imkansız denecek kadar zor olan, Alman vatandaşlığı ve merkezi devlet sınavı (Staatsexamen) gerektiren en yüksek statüdür.
2. Süresiz Sözleşmeli Öğretmen (Unbefristet Angestellter): Türkiye''deki memurluk gibidir. Memur öğretmenden tek farkı, vergi kesintileri nedeniyle biraz daha az maaş almasıdır. Tayin hakkı vardır.
3. Vekil Öğretmen (Vertretungslehrer): Kadrolu öğretmenlerin izinli olduğu durumlarda yapılan süreli sözleşmeli öğretmenliktir, iyi bir ücrete sahiptir ve kadrolu öğretmenliğe geçişi kolaylaştırabilir.
4. Ders Ücretli Öğretmen (Honorararbeit): En basit başlama yoludur, okul müdürünün onayıyla prosedürsüzce başlanabilir ancak ücreti geçim sağlamaya yetmez.
5. MPT (Multiprofessionelles Teams): Süresiz kadro (unbefristet, TVL-10) sunan bu pozisyonun avantajları arasında not vermeme ve ders ziyareti/değerlendirme zorunluluğunun olmaması bulunur.',
  8
),
(
  'matematik-ogretmenligi',
  'Lehrkräfte programlarında hangi branşlar öncelikli olarak kabul edilmektedir?',
  'Üniversiteler, bölgelerinde ihtiyaç duyulan branşlarla ilgili öğretmen kabul etmektedir. Matematik, Fizik, Kimya, Biyoloji, İngilizce ve Fransızca gibi sayısal ve yabancı dil branşları öncelikle alınmaktadır.',
  9
),
(
  'matematik-ogretmenligi',
  'Öğretmenlik başvurusu için bir dosyada hangi evraklar bulunmalıdır?',
  'Başvuru dosyasının eksiksiz, düzenli ve itinalı olması şansı artırır. Gerekli belgeler şunlardır:
• İş başvuru yazısı (Anschreiben).
• Tablolu özgeçmiş (Lebenslauf) (sempatik bir fotoğraf içermesi tavsiye edilir).
• Motivasyon Mektubu (Motivationsschreiben). Mektupta mesleği çok sevdiğinizi ve zor olmasına rağmen öğretmenliği tercih ettiğinizi vurgulayın.
• Son okul belgesi fotokopisi.
• Staj/kurs belgeleri (Zertifikalar).
• Türkiye''deki Başarılar: Olimpiyat, proje çalışmaları, yayınlar ve ders dışı öğrenci hazırlama gibi yardım faaliyetleri eklenmelidir.',
  10
),
(
  'matematik-ogretmenligi',
  'Mülakatta (Auswahlgespräch) öğretmen adaylarına hangi sorular sorulur?',
  'Mülakat soruları üniversitelerde birbirine yakın sorulardır. Olası sorular şunlardır:
• Kendinizi tanıtma (Hobileri unutmamak gerekir).
• Branşınızda zorlanan bir öğrenciye nasıl çözüm bulursunuz?.
• Ders esnasında kavga eden öğrencilere nasıl davranırsınız?.
• Bir Veli, dersinizin kötü olduğunu söylerse ne yaparsınız?.
• Öğrenciyi nasıl motive edersiniz?.
• Branş bilgisi (Kesirli veya sözel matematik problemleri sorulabilir).',
  11
),
(
  'matematik-ogretmenligi',
  'Pedagojik sorulara cevap verirken temel strateji ne olmalıdır?',
  'Cevap verirken kesinlikle "kahraman olmaya kalkmayın". Cevaplar Alman eğitim standartlarına uygun ve adım adım metotlarla açıklanmalıdır. Yapılması gerekenler listesi şunları içerir:
• İdareye haber verme.
• Sosyal pedagog ile görüşme.
• Veli ile görüşme.
• Diğer ders öğretmenleri ile işbirliği.
• Ring Model''e göre önleme (Prävention) ve erken müdahale (Frühe Intervention) adımlarını uygulamak.',
  12
),
(
  'matematik-ogretmenligi',
  'Almanya’daki Matematik derslerinde kullanılan bazı terminolojiler ve öğretim yöntemleri farklı mıdır?',
  'Evet, derslerin anlatılış dili ve mantığı kurslardaki konuşma dilinden farklıdır.
• Tahmini Hesaplama (Überschlag): Sayıları en yakın sayıya çevirme kuralı kullanılır; yüzler basamağı 500''ün altında olunca aşağı, üstünde olunca yukarı yuvarlanır.
• Eldeli Çıkarma: Türkiye’de bilinenden çok farklı anlatıldığı ve mantığının kavranmasının zor olduğu belirtilmiştir.
• Geometri: Küp (Würfel) her yüzeyi kare olan ve her kare kenar uzunlukları birbirine eşit dikdörtgenler (Rechtecke) olan bir cisimdir. Dikdörtgenler prizması (Quader) ise karşılıklı yüzeyleri eşit dikdörtgenlerden oluşur. Kare, aynı zamanda özel bir dikdörtgendir.',
  13
),
(
  'matematik-ogretmenligi',
  'Matematik müfredatına ve ders materyallerine nasıl ulaşılabilir?',
  '• Online Kaynaklar: Bütün okulların, sınıfların ve branşların müfredat ve çalışma kağıtlarına ulaşmak için klassenarbeiten.de sitesine bakılabilir.
• RWTH Aachen Vorkursu: RWTH Aachen Üniversitesi Matematik Hazırlık Kursu (Vorkurs) ücretsiz ve online olarak sunulmaktadır. Bu kurs, matematiksel tanımlara aşina olmak için çok güzel bir içerik sağlar, ancak tam verim almak için iyi düzeyde B2 Almanca bilgisi önerilmiştir.',
  14
),
(
  'matematik-ogretmenligi',
  'Matematik derslerinde öğrencilerin ilgisini çekmek ve dinlenmelerini sağlamak için hangi yöntemler kullanılıyor?',
  'Dersler genellikle 5 dakikalık teneffüslerle bloklar halinde işlenir ve bu sırada öğrenciler sınıfta rahatça gezip yiyip içebilir. Ayrıca yarışma tadında oyunlar oynatılmaktadır:
• Köşe Kapmaca: Çarpım tablosu tekrarı gibi konular için kullanılabilir; sınıfın dört köşesine öğrenci seçilir ve doğru cevap veren bir sonraki köşeye ilerler.',
  15
),
(
  'matematik-ogretmenligi',
  'Sınıfta disiplin sorunları veya olağan dışı davranışlarla başa çıkmak için Alman pedagojik yaklaşımı (Ring Model) nedir?',
  'Sınıf yönetimi (Classroommanagement) için aşamalı bir yaklaşım olan Ring Model kullanılır:
1. Önleme (Prävention): Net kurallar ve beklentiler belirleme, düzenli rutinler oluşturma ve sürekli gözlem (Aktif Denetim) yaparak pozitif ilişkiler geliştirme.
2. Erken Müdahale (Frühe Intervention): Nonverbal işaretler veya sessiz ve bireysel uyarılar kullanma.
3. Doğrudan Müdahale (Direkte Intervention): Sakin ve net bir şekilde uyarma ve spesifik talimatlar verme.
4. Yoğun Müdahale (Intensive Intervention): Sorun devam ederse bireysel görüşme yapma, veli ve okul uzmanlarıyla işbirliği yaparak bireysel bir destek/davranış planı oluşturma.',
  16
),
(
  'matematik-ogretmenligi',
  'Otizm Spektrum Bozuklukları (OSB) veya Duygusal/Sosyal Gelişim Sorunları olan öğrencilere nasıl destek sağlanmalıdır?',
  'Bu öğrenciler için yaklaşım bireyselleştirilmiş olmalıdır.
• Otizm: Sosyal iletişimde zorluklar, sınırlı/tekrarlayıcı davranışlar ve duyusal hassasiyetler görülebilir. Onlar için yapılandırılmış öğrenme ortamları, net yapılar ve rutinler önemlidir. Sessiz geri çekilme alanları sağlanarak duyusal aşırı yüklenme en aza indirilmelidir.
• Genel Destek: Öğrencinin bireysel ihtiyaçlarını anlamak, net ve öngörülebilir yapı oluşturmak, açık iletişim kurmak ve olumlu davranışları övüp ödüllendirmek (Pozitif Takviye) esastır.',
  17
),
(
  'matematik-ogretmenligi',
  'Jobcenter''dan yardım alırken doktora veya öğrenci programlarına kayıt olmak mümkün mü?',
  'Normal şartlarda işsizlik yardımı alan biri öğrenci olamaz, çünkü Jobcenter''dan yardım alan birinin iş arıyor ve iş bulduğu an işe başlayacak şekilde hazır olması gerekir. Jobcenter''ı ilgilendiren tek şey sizin iş arıyor olmanızdır.
• Alternatif: Eğer kişi extern doktora yaptığını, bunun iş şansını artırdığını ve üniversiteye gitme zorunluluğu olmadığını mantıklı bir şekilde izah ederse, memurun kabul etme ihtimali vardır (bu ihtilaflı bir konudur).',
  18
),
(
  'matematik-ogretmenligi',
  'Jobcenter''a karşı temel yükümlülüklerim nelerdir?',
  'Yardım alanlar Jobcenter''e karşı işbirliği ve bildirim yükümlülüğüne sahiptirler.
• Bildirim Yükümlülüğü: İşe başlama, adres değişikliği, evlenme veya partnerden ayrılma, gelir veya varlıklardaki her türlü değişikliği hemen ve talep edilmeden bildirmek zorunludur.
• Barınma Masrafları: Yeni bir konut sözleşmesi yapmadan önce Jobcenter''den masrafları üstlenme sözü (Kabul Açıklaması) almak zorunludur.
• Yaptırım (Sanktionen): İşbirliği yükümlülüğünün yerine getirilmemesi, yardımın kesilmesine veya düşürülmesine yol açar. İlk ihlalde İşsizlik Parası II genellikle yüzde 30 düşürülür.',
  19
),
(
  'matematik-ogretmenligi',
  'Öğretmenlik dışında Matematik mezunları için hangi alanlar alternatif olabilir?',
  'Sayısal alan mezunları için özel sektörde iş bulmak daha kolaydır.
• Bilişim (IT/Informatik): Sayısal alan mezunları için bilişim alanında, örneğin Data Analyst pozisyonları veya Fachinformatik Umschulung’ları (mesleki eğitim) önemli alternatiflerdir. Umschulung sonrası iş bulmak kolay olabilir.
• Türkçe/İslam Dersleri: Denklik süreci tamamlanana kadar Türkçe öğretmenliği kadrosu en kolay başvurulabilecek alandır. Türkçe C1 sertifikası olan herhangi bir öğretmen, bu derslere ücretli öğretmen olarak başlayabilir. İslam dersleri için Idschaza (izin) alınarak haftada 10 saate kadar ders verilebilir. Bu dersler, diğer branşlarda ders saatleri dolmadığında işe yarayabilir.',
  20
);
