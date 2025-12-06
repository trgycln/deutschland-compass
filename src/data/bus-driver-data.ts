
export const busDriverData = {
  title: "Almanya Kariyer ve Yaşam Rehberi: Otobüs Şoförlüğü (Busfahrer)",
  description: "Bu rehber, Otobüs Şoförlüğü (Busfahrer) mesleği için kaynaklardaki yasal düzenlemeleri ve pratik tecrübeleri birleştirerek, Almanya'daki kariyer ve yaşam sürecinizi en kapsamlı şekilde sunmak amacıyla hazırlanmıştır.",
  videoUrl: "", // Admin panelinden güncellenebilir
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-green-500" },
    { label: "Dil Seviyesi", value: "A2-B1", color: "bg-blue-500" },
    { label: "Ortalama Maaş", value: "2.400€ - 2.600€ (Net)", color: "bg-indigo-500" },
    { label: "Sektör", value: "Ulaşım", color: "bg-orange-500" }
  ],
  analogy: {
    title: "Sürücünün Rolüne Dair Analoji",
    description: "Otobüs şoförlüğü mesleği, bir gemi kaptanının yolcu gemisini yönetmesine benzer. Kaptan sadece gemiyi sürmekle kalmaz (ehliyet ve sürüş), aynı zamanda gemideki kuralları (IHK/BOKraft), yolcuların güvenliğini ve konforunu (engelli yardımı, ani frenden kaçınma), geminin teknik durumunu (Abfahrtkontrolle) ve mürettebatın (yolcuların) uyumunu sağlamak zorundadır. LKW şoförlüğü ise daha çok tek başına yük taşıyan bir kargo gemisi kaptanı olmaya benzer; yük daha ağır, yol daha zorlu olabilir ancak yolcu yönetimi stresi yoktur. Otobüs şoförleri, şirketleri için bir hizmetin başında ve sonunda müşterilerle temas eden en önemli temsilcilerdir"
  },
  sections: [
    {
      id: "hazirlik-ve-kosullar",
      title: "1. Almanya'ya Göç Öncesi Hazırlık ve Temel Mesleki Koşullar",
      content: [
        {
          subtitle: "Yasal Zemin ve Ön Şartlar",
          text: `**B Sınıfı Ehliyet Süresi:** Otobüs (D/DE) ehliyeti almak için yasal olarak genellikle en az iki yıllık B sınıfı (otomobil) ehliyetine sahip olmak şartı aranır. Ancak, eğer kişinin B ehliyetinin üzerinden iki yıl geçmemişse, bu süre eksiği ek sürüş dersleri (ilave fahr) ile giderilebilir ve eğitime başlanabilir.

**Pratik Tecrübe ve İpuçları:** Almanya'ya gelindiğinde B sınıfı ehliyetler değiştiriliyorsa, 2 yıl stajyer olma zorunluluğu yoktur; bu zorunluluk sadece sıfırdan ehliyet alanlar için geçerlidir. Ancak bazı işverenler ya da memurlar, tam bilmediklerinden veya işlerine geldiğinden dolayı ehliyetinin 2 yılı dolmamış diyebilirler.

**Dil Yeterliliği (Almanca):** İstenen Almanca dil seviyesi, bulunulan eyalete ve ilgili Agentur für Arbeit/Jobcenter görevlisine göre değişiklik gösterebilir.
• Bazı eyaletlerde (örneğin Hessen) B1 seviyesi istenmekle birlikte, Jobcenter bazı durumlarda B2 seviyesini de talep edebilir.
• Bazı eyaletlerde (örneğin NRW) A2 dil seviyesi yeterli kabul edilmiştir.
• Birçok firma, işe alım sürecinde spesifik bir dil şartı yazmamaktadır, ancak mülakatta kendinizi ifade edebilmeniz için konuşma testi yapılır ve bu önemlidir.
• Pratikte, IHK (Sanayi ve Ticaret Odası) sınavına Almanca girmek zorunlu olduğu için, dil bilmek genel başarı için kritiktir.`
        },
        {
          subtitle: "Sağlık ve Psikoteknik Yeterlilikler",
          text: `Sürücülük için kapsamlı bir sağlık raporu şarttır. Bu testler genellikle Führerscheinstelle'ye (Sürücü Belgesi Kurumu) kayıt öncesinde gereklidir.
1. **Göz ve Duyma Testleri:** Göz ve duyma kontrolü yapılır. Gözlük kullanan bir kişi, rapor alırken zorlanabileceği konusunda uyarılabilir.
2. **Tahliller:** Kan ve idrar tahlili istenir.
3. **Kısıtlamalar:** Sağlık durumu kısıtlamaları olabilir; örneğin, Tip 2 diyabet hastası olan bir kişinin otobüs ehliyeti almasının zor olabileceği belirtilmiştir.
4. **Reaksiyon ve Psikolojik Testler:** Reaksiyon testi (bilgisayar başında pedala ve tuşlara basılarak yapılan bir test) psikolojik testin bir parçasıdır.
    ◦ Bu sınav zeka, dikkat ve hızlı reaksiyon testi niteliğindedir ve zordur.
    ◦ Psikolog, sınavla ilgili verdiğiniz cevaplarla ilgili sorular sorar ve Jobcenter'a hakkınızdaki görüşünü bildirir; karar buna göre verilir. Size gönderilen kâğıtta çıkacak sorularla ilgili örnekler olabilir, ancak bu sorular sadece örnektir.`
        },
        {
          subtitle: "Ek Bilgi: Resmi Belge Hazırlığı",
          text: `Almanya’ya geldikten sonraki prosedürler için hazırlık sırasında:
• **Hizmet Dökümü:** Çalıştığınızı belgeleyen hizmet dökümünüz varsa, mutlaka çevirilecek belgeler arasına eklenmesi tavsiye edilir.
• **Akademik Belgeler:** Yüksek lisans diploması ile beraber transkript çevirisi de önem arz eder; sadece diploma yeterli olmayabilir ve iş başvurusu sırasında istenebilir.`
        }
      ]
    },
    {
      id: "mesleki-yeterlilik",
      title: "2. Mesleki Yeterlilik Kazanma Süreci",
      content: [
        {
          subtitle: "Finansman ve Süreç Yönetimi (Jobcenter/Agentur für Arbeit)",
          text: `**Pratik Tecrübe ve İpuçları:**
• Jobcenter'dan Gutschein (Kupon/Ödeme Belgesi) alınabilir. Jobcenter’ın pahalı olduğu gerekçesiyle lokführer (makinist) eğitimine izin vermediği ve bu nedenle otobüs şoförlüğünün seçildiği tecrübesi mevcuttur.
• Sürecin Jobcenter tarafından yönetimi; şahsınıza, dil seviyenize, memurun bakış açısına, Jobcenter'ın bütçesine ve süreci yönetebilme kabiliyetinize göre değişir.
• Ehliyet ücretini kendi ödemeniz durumunda daha uygun fiyata kayıt yapılabileceği (5-6 bin Euro), IHK, doktor muayenesi ve teori sınavı dahil fiyatın 6800 Euro'yu bulabileceği belirtilmiştir.
• Ehliyet ücretinin büyük kısmını, işe alım karşılığında şirketin ödediği durumlar da mevcuttur.`
        },
        {
          subtitle: "Ehliyet ve Yeterlilik Sınavları Sıralaması",
          text: `Genel olarak sınav sıralaması şu şekildedir: Teori -> IHK -> Pratik. Ancak pratik sınav ile IHK sınavı yer değiştirebilir ve en son Anhenga (römork) sınavı olabilir.`
        },
        {
          subtitle: "2.1. Teori Sınavı (Fahrprüfung Theorie)",
          text: `**Pratik Tecrübe ve İpuçları:**
• Teori sınavına Türkçe girmek mümkündür ve konuları daha iyi anlamaya, stresi azaltmaya yardımcı olur.
• Ancak, bazı büyük kamusal firmalar (DB gibi) ehliyet sınavına Almanca girilmiş olmasını ister.
• Teori sınavı bildiğimiz normal sınavdır.
• Sınav, 10 hata puanı toplandığında kalınan zor bir sınavdır (maksimum 2 veya 3 yanlış hakkı demektir).
• Soruların çoğunluğu B ehliyeti sınavındaki sorularla aynıdır, ancak otobüse dair fren sistemleri gibi konular da içerir.`
        },
        {
          subtitle: "2.2. Mesleki Yeterlilik Sınavı (IHK - Industrie- und Handelskammer)",
          text: `Profesyonel olarak otobüs kullanmak için IHK sınavını geçmek zorunludur. Bu sınav, "Berufskraftfahrer-Qualifikationsgesetz (BKrFQG)" uyarınca yapılır.

**Yasal Zemin ve İçerik:**
• **Sınav Dili:** IHK sınavı genellikle Almanca yapılmaktadır.
• **Bilgi Alanları:** Sınav, BKrFQV Ek 1'de listelenen alanlara odaklanır:
    ◦ Güvenlik kuralları temelinde rasyonel sürüş davranışının iyileştirilmesi.
    ◦ Yönetmeliklerin uygulanması.
    ◦ Sağlık, trafik ve çevre güvenliği, hizmetler ve lojistik.
• **Geçme Kriteri:** Sınav toplam 60 puan üzerinden değerlendirilir ve geçmek için %51 başarı (yaklaşık 31 puan) yeterlidir. IHK sınavı, Türkçe girilebilen TÜV sınavından daha kolaydır.

**Sınav Formatı ve Pratik Tecrübeler:**
• **Soru Sayısı:** Soru sayısı eyaletten eyalete ve zamana göre değişiklik gösterebilir. Örneğin, Hessen'de 40 soru, Koblenz'de 49 soru, bazı yerlerde 51 soru çıkmıştır. Soru sayısı 45-58 arasında olabilir.
    ◦ **Güncel Durum:** Son güncellemelerle (2024 itibarıyla) soru sayısının 500 civarından 340'a kadar indiği ve sınavın sadece çoktan seçmeli (Test) olduğu, açık uçlu (yazılı) soruların kalktığı/çok azaldığı belirtilmiştir.
    ◦ Sınavda bazen çift cevaplı sorular çıkabilir.
• **Sınav Süresi:** Normalde 90 dakikadır, ancak sınava giren bazı arkadaşlar 15 dakikada bitirip çıkmıştır.
• **Çalışma Yöntemleri:** Sınavda çıkan soruların büyük çoğunluğu kursun verdiği uygulamadaki (App) veya paylaşılan PDF'lerdeki sorulardan gelir. Soruların ezberlenmesi tavsiye edilir.
    ◦ Ezberleme teknikleri olarak, doğru cevabı görene kadar tekrar etmek ve anlaması zor olan soruları kodlayarak veya içinden bazı kelimeler seçerek ezberlemeye çalışmak önerilmiştir.
    ◦ Çalışılan örnek soruların birebir aynısının çıktığı tecrübe edilmiştir.
    ◦ Kursun uygulama (App) vermemesi "malzemeden çalmak" olarak değerlendirilebilir, çünkü App'teki soruların aynısı sınavda çıkar.`
        },
        {
          subtitle: "Sürekli Mesleki Eğitim (Weiterbildung)",
          text: `Profesyonel sürücülerin (C ve D sınıfları), Mesleki Yeterlilik Yasası (Berufskraftfahrer-Qualifikationsgesetz - BKrFQG) uyarınca 5 yılda bir 35 saatlik ileri eğitim alması zorunludur.
• Bu ileri eğitim, her biri en az 7 saatlik 5 ünite halinde bölünebilir.
• Yol kenarındaki bir kontrol noktasında, yeterliliğinizi ehliyetinize girilen "95" kod numarası ile kanıtlamalısınız.
• Bu eğitimi tamamlamayan sürücüler ve araç kullanmasına izin veren işverenler büyük para cezası ile cezalandırılabilir.`
        }
      ]
    },
    {
      id: "is-arama-maas",
      title: "3. İş Arama, Mülakat ve Maaş Düzenlemeleri",
      content: [
        {
          subtitle: "İş Piyasası ve Görüşmeler",
          text: `**Pratik Tecrübe ve İpuçları:**
• **İş Açığı:** Otobüs şoförlüğü sektöründe çok ciddi açık olduğu için iş bulmak çok kısa sürer ve firmalar adayları rahatça kabul edebilir. Bazı adaylar iş görüşmesinde bile bulunamadan kabul edilmiştir.
• **Mülakatlar (Vorstellungsgespräch):** Görüşmelerde genellikle kendinizi tanıtmanız, neden bu işi istediğinizi açıklamanız ve CV (Cw) veya başvuru (Bewerbung) içinden birkaç soru sorulması beklenir.
    ◦ **Hazırlık:** Belediye otobüs firmaları bazen görüşme öncesinde bir giriş testi (Einstüfungtest) yapabilir. Bu test; şirket hakkında sorular, mantık soruları ve geçiş önceliklerinden oluşur.
    ◦ **Deneme Sürüşü:** Görüşmenin ardından bir buçuk saat araba sürdürülerek test sürüşü yapılabilir.`
        },
        {
          subtitle: "Çalışma Şartları ve Ücretlendirme",
          text: `**Pratik Tecrübe ve İpuçları:**
• **Saatlik Ücret (Brutto):** Saatlik brüt ücret firmaya göre değişiklik göstermekle birlikte, saatlik 17.40 Euro veya DB gibi büyük firmalarda 18 Euro civarında olduğu belirtilmiştir.
• **Çalışma Saatleri (Dienstplan):** Haftalık normal çalışma süresi 39 saattir; bunun üstü mesai (mesai) olarak sayılır.
    ◦ Günlük çalışma planları 3 ila 11 saat arasında farklılık gösterebilir.
    ◦ En erken başlangıç sabah 04:00, en geç bitiş gece 01:00 olabilir.
    ◦ Genellikle bir hafta 5 gün, bir hafta 6 gün çalışma olabilir.
• **Mola ve Boşluk Ücretleri:** Çalışma saatlerindeki (fahrplan) boşluklar bazen işveren tarafından ödenmek istenmez.
    ◦ Firma politikasına göre, bazı firmalar molayı öder ancak çalışma saatleri düzensiz (hafta sonu/gece çalışması) olur.
    ◦ Bazı firmalar ise molayı ödemez ancak şoför hafta sonu ailesiyle evde olur ve gece çalışmaz. Maaşınızı aylık (TR mantığı aylık) düşünürseniz psikolojik olarak sorun olmaz.
• **Ekstra Ücretler (Zuschläge):**
    ◦ Firmaya göre 170 saatin üzerindeki saatlere %25 ilave verilebilir.
    ◦ Pazar çalışmasına %50 veya %100 ilave verilebilir.
    ◦ Gece çalışmasına %50 ilave verilebilir.
    ◦ Resmi tatillerde çalışılmazsa 6.5 saat, çalışılırsa iki katı ödeme yapılabilir.`
        },
        {
          subtitle: "Ek Bilgi: Vergi İadesi (Steuererklärung)",
          text: `İş bakarken işyerinin 30-40 km uzaklıkta olması sorun teşkil etmez, çünkü yıl sonunda vergi beyanı yapılırken (vergi beyanı) bu masrafların yarısı vergi iadesi olarak geri ödenebilir. Vergi beyanına iş ve ev adresi ile araç sigortası masrafları girilir.`
        }
      ]
    },
    {
      id: "is-hayati-guvenlik",
      title: "4. İş Hayatı ve Güvenlik Yönetmelikleri",
      content: [
        {
          subtitle: "4.1. Kalkış Kontrolü (Abfahrtkontrolle)",
          text: `Kalkış kontrolü, profesyonel otobüs şoförleri için rutin bir zorunluluktur ve sürüş sınavının bir parçasıdır.

**Kontrol Edilmesi Gereken Temel Unsurlar:**

**Acil Durum Malzemeleri:**
İkaz ışığı (fonksiyonu, pil gücü min. 8 saat, CE işareti), ikaz üçgeni, ikaz yeleği (mevcut ve temiz). İlk yardım çantası (eksiksizliği, son kullanma tarihi). Tekerlek takozları (sayı ve konaklama). Yangın söndürücüler (tek katlı: en az 1 adet 6 kg; çift katlı: 2 adet - biri sürücü yanında, biri üst katta).

**Aydınlatma ve Sinyaller:**
Korna, flaşör, dörtlü flaşör (tehlike uyarı lambaları), yan işaret lambaları, kısa huzme, uzun huzme, arka lambalar, fren lambaları, plaka lambaları, geri vites lambaları. Lambaların fonksiyonunun kontrolü. Arızalı bir ampulün (spot/fren/sinyal/arka) nasıl değiştirileceğinin açıklanması/gösterilmesi.

**Kapılar ve Çıkışlar:**
Otobüs kapılarının içeriden ve dışarıdan manuel olarak açılıp kapanma işlevleri. Kapı kontrol sisteminin fonksiyonel testi. Kapıların acil durum çalışmasının gösterilmesi. Acil çıkışların ve acil durum çekiçlerinin kontrol edilmesi. Acil durum musluğu (Acil durum musluğu) çalıştırılarak kapıların elle açılması (kapılar düğme ile açılmadığında).

**Lastikler ve Jantlar:**
Lastiğin genel durumu (hasar), hava basıncı, diş derinliği (en az 1.6 mm), yabancı cisim (taş, vida vb.) kontrolü. Lastik ebadının, yük kapasitesinin ve maksimum hızının araç ruhsatı (araç tescil belgesi) ile kontrolü. Bijon somunlarının yuvasının görsel muayenesi. Jantlarda hasar kontrolü.

**Sıvı Seviyeleri:**
Fren hidroliği seviyesi. Motor yağı seviyesi. Soğutma sıvısı seviyesinin ve boruların görsel muayenesi. Yakıt sisteminin ve hatlarının sızdırmazlığı. Hidrolik direksiyon yağ seviyesi. Ön cam ve far yıkama sistemlerindeki sıvı seviyesi.

**Diğer Sistemler:**
Direksiyon yardımının işlevi ve direksiyon boşluğu. Pedal hareketinin serbest olup olmadığı (gaz/fren). Isıtma ve havalandırma sisteminin çalışması (klima, yardımcı ısıtma). EC kayıt cihazının (Takograf) kontrolü.`
        },
        {
          subtitle: "4.2. Yolcu Taşıma Yönetmelikleri ve Yolcu Güvenliği (BOKraft)",
          text: `**Yasal Zemin:** Yolcu Taşıma Yönetmeliği (BOKraft), karayolu yolcu taşımacılığı şirketlerinin işleyişine ilişkin bir yönetmeliktir. Sürücü, yolculuk sırasında yolcularla ilgili olarak Taşıma Ücretlerine İlişkin Düzenlemeleri ve Yetki Belgesini yanında bulundurmak ve talep üzerine yolcuya göstermek zorundadır.

**Sürüş Tarzı ve Güvenlik:**
• **Ani Hareketlerden Kaçınma:** Yolcuların düşmesini önlemek için ani kalkış ve ani fren yapılmamalı, duraklara yaklaşırken sarsıntılı direksiyon hareketlerinden kaçınılmalıdır. Ani fren yapılması durumunda yolcular düşebilir ve yaralanabilir.
• **Duraktan Kalkış Sorumluluğu:** Sürücünün görevi, duraktan ayrılmadan önce engelli (fiziksel engelli, ağır engelli, hamile, görme engelli) veya güçsüz (yaşlı) kişilerin oturduğundan veya güvenli bir yere tutunduğundan emin olmaktır. Bu kural, engel biniş sırasında açıkça görülebiliyorsa geçerlidir.
• **Yolcu Yardımı:** Şoförün görevleri arasında güçsüz kişilere inip binme sırasında yardım etmek yer alır. Bebek arabalı bir kadına yardım etmek için şoför kasayı güvence altına almalı ve yardım teklif etmelidir. Engelli yolcu için belirlenen koltuğun boşaltılmasını sağlamak da şoförün sorumluluğundadır.
• **Durak Anonsları:** Düzenli hatlarda (Linienverkehr) şoför tüm durakları zamanında anons etmek zorundadır.
• **Emniyet Kemeri:** Ara sıra yapılan seferlerde (Reisebus) otobüsün koltuklarında emniyet kemeri varsa, bunların takılması zorunludur ve sürücü yolcuları uyarmalıdır. Emniyet kemerleri sürüş sırasında çözülmemelidir (tuvalet ihtiyacı için kısa süreli açılabilir).

**Yolcu Reddi ve Çatışma Yönetimi:**
• **Taşıma Reddi Yetkisi:** Diğer yolcuların güvenliğini tehlikeye atan (sarhoş, kaba davranan) kişileri şoförün uygun yerde otobüsten indirme ve taşıma dışında bırakma yetkisi vardır. Geçerli bileti olmayan yolcular da reddedilebilir.
• **Çatışma Yönetimi:** Sarhoş ve agresif genç adamlar iki kez uyarılmalı ve ardından uygun bir yerde indirilmelidir; bu durumda polis çağrılabilir.
• **Ani Durma:** Yumruk yumruğa kavga eden iki yolcu varsa, hemen durulmalı, polis aranmalı ve tarafları sakinleştirmeye çalışılmalıdır. Ani duruş, durumu sakinleştirecek bir yöntem değildir.`
        },
        {
          subtitle: "4.3. Bagaj ve Yükleme Kuralları",
          text: `• **İstifleme:** Bagajlar, izin verilen toplam ağırlığı ve aks yüklerini aşmayacak şekilde, bagaj bölmesinde dağıtılmalı ve forma uygun şekilde istiflenmelidir.
• **Yasak Alanlar:** Bagajlar koridorda veya arka çıkış önünde taşınmamalıdır. Mutfak kullanılmayacaksa bile bavullar mutfak bölümüne bırakılmamalıdır.
• **Tehlikeli Maddeler:** Elinde benzin bidonu olan yolcu otobüste taşınamaz.
• **Aşırı Yükleme:** Yolcu otobüsünde izin verilen koltuk ve ayakta durma yeri sayısından daha fazla yolcu taşınamaz. İzin verilen toplam kütle (izin verilen toplam kütle) ve yüksüz kütle (yüksüz kütle) dikkate alınmalıdır. Aşırı yüklemeden kaçınmak için bagajın geride bırakılması veya daha hafif içecek ambalajları kullanılması önerilir. Aşırı yükleme riski en çok kış sporları gezilerinde ve okullar/spor tesisleri arasındaki taşımalarda yüksektir.`
        },
        {
          subtitle: "4.4. Sürüş Ekonomisi ve Teknik Arızalar",
          text: `**Ekonomik Sürüş İlkeleri:**
• Yakıt tüketimini en düşük seviyede tutmak için mümkün olan en yüksek vites kullanılmalı ve motor devri yeşil alanda tutulmalıdır.
• Zamanında vites yükseltme yapılmalı ve yuvarlanma (roll) aşamaları kullanılmalıdır.
• Debriyajın çabuk aşınmasını önlemek için, dururken vitesten çıkarılmalı ve debriyaj kaydırılarak sürülmemelidir.
• Motorun elastik aralığı (maksimum tork ve maksimum güç arasındaki bölge) bilinmelidir.

**Fren Sistemleri ve Yönetimi:**
• **Kalıcı Fren (Dauerbremse/Retarder):** İzin verilen toplam ağırlığı 5.5 tonun üzerindeki otobüslerde bulunması zorunludur. Aşınmaz ve servis frenini destekler. Uzun ve dik yokuşlarda kullanılır. Kalıcı frenler; hidrodinamik frenler ve dinamik (egzoz) frenlerdir.
• **Servis Freni:** Uzun süre kesintisiz kullanıldığında frenleme etkisinin azalması (solma) ve sistemin aşırı ısınması/arızalanması gibi zorluklar ortaya çıkabilir.
• **ABS/ABV Arızası:** Kilitlenme Önleyici Fren Sistemi (ABS) gösterge ışığı yanarsa (kablo kopması veya tekerlek sensörü arızası nedeniyle olabilir), bir sonraki uygun yerde durulmalı ve sorun giderilmelidir.

**Arıza Durumunda Yapılması Gerekenler:**
• **Patlak Lastik (Otoyolda):** Dörtlü flaşörler açılmalı, araç bankette (sert omuz) durdurulmalı, ikaz yeleği giyilmeli ve araç emniyete alınmalıdır.
• **Motor Aşırı Isınması:** Olası nedenler arasında hat arızası, su pompası arızası veya V kayışı arızası sayılabilir.
• **Fren Sistemi Basınç Kaybı:** Kalkış kontrolü sırasında 0,7 bar'dan fazla basınç kaybı fark edilirse olası nedenler; sızdıran fren hatları, arızalı tekerlek fren silindirleri, haznede su, kompresörün yetersiz performansı olabilir.`
        },
        {
          subtitle: "4.5. Çalışma Saatleri ve Dinlenme Süreleri Yönetmelikleri",
          text: `**Yasal Zemin (Çalışma Saatleri Yasası):**
• **Haftanın Başlangıcı/Bitişi:** Sürücüler için hafta, Pazartesi 00:00'da başlar ve Pazar 24:00'te biter.
• **Sürüş Süresi Sınırlamaları:**
    ◦ Bir haftada en fazla 56 saat araç kullanılabilir.
    ◦ Ardışık 2 hafta boyunca toplam sürüş süresi en fazla 90 saattir.
• **Çalışma Süresi Sınırlamaları:** Sürücünün haftada ortalama 48 saat çalışmasına izin verilir. Çalışma saatleri 60 saate kadar artırılabilir.
• **Fazla Mesai Telafisi:** Fazla mesai 4 ay içinde telafi edilmelidir.
• **Mola ve Dinlenme:**
    ◦ Kesintisiz 4 saat 30 dakikalık sürüşten sonra en az 45 dakikalık mola verilmelidir.
    ◦ Bu 45 dakikalık mola 15 ve 30 dakika olarak bölünebilir.
    ◦ Normal günlük dinlenme süresi 11 saattir, bu süre 3 ve 9 saat olarak iki parçaya bölünebilir. Günlük dinlenme süresi her gün bölünebilir.

**Takograf (Dijital ve Analog):**
• **Kullanım Zorunluluğu:** Almanya'da, 3.5 tondan fazla izin verilen toplam ağırlığa sahip ticari karayolu taşımacılığı yapan araçlarda (kamyon/otobüs) sürücü kartı kullanılmak zorundadır.
• **Gerekli Belgeler (Kontrol Sırasında):** Denetim sırasında sürücü, mevcut gün ve önceki 28 gün için kayıt sayfalarını/çıktıları sunmalıdır.
• **Kart Kaybı/Arızası:** Sürücü kartının kaybolması veya arızalanması durumunda, sürücü kartı olmadan en fazla 15 gün sürüşe devam edilebilir. Sürücü kartı hasarlıysa, yolculuğun başında ve sonunda çıktı alınmalı ve imzalanmalıdır.
• **Ülke Kodları:** Dijital takografa her iş günü, çalışma gününün başladığı ülke ve bittiği ülke için ülke kodu (sembol) girilmelidir.
• **Çalışma Sayılan Faaliyetler:** Sürüş süresi, araç bakımı, araç yükleme, evrak doldurma süreleri çalışma saatlerine dahildir. Molalar ve Uyku kabininde kalmak çalışma saatlerinin bir parçası değildir.
• **Bekleme Süresi (Bereitschaftszeit):** Yükleme sırasında beklerken (telefon izleme ve hemen araca gelme zorunluluğu varsa) takografta "bekleme süresi" ayarlanmalıdır. Bekleme süresi çalışma süresinin bir parçasıdır.`
        },
        {
          subtitle: "4.6. Lojistik ve Kurumsal İletişim",
          text: `• **Kurumsal İmaj:** Temiz ve bakımlı bir araç, şirketin özverisini ve operasyonel güvenliğini gösterir. Sürücüler, temiz kıyafetler ve kibar davranışlarla şirketi temsil etmelidir.
• **Sürücünün Önemi:** Şoför, müşterilerle çok fazla teması olduğu için (bir hizmetin başında ve sonunda) şirket için önemlidir. Sürücülerden beklenen önemli özellikler güvenilirlik ve doğruluktur.
• **Müşteri İletişimi:** Müşteri bir hizmetten memnun kalır ve başka hizmet sorarsa, sürücü firmanın hizmet yelpazesini açıklamalı ve ofis numarasını vermelidir.
• **Şikayet Yönetimi:** Müşteri şikayet ettiğinde, özür dilenmeli ve müşterinin iletişim bilgileri istenerek ofisin onu arayacağı söylenmelidir. Gecikme nedeniyle randevusunu kaçıran yolcuya şikayetinde yapıcı tepki verilmelidir.`
        },
        {
          subtitle: "4.7. Güvenlik, Kaza ve Hırsızlık Önleme",
          text: `• **Hırsızlık Önleme:** Sürücüler kargo, rota, varış noktası ve saatler hakkında yabancılarla veya diğer sürücülerle konuşmamalıdır. Mola yerinde hırsızlığa karşı gaz uyarı cihazı takılması faydalı olabilir.
• **Yasa Dışı Göçmenler:** Yasa dışı göçmen şüphesi varsa (özellikle sınır yakını veya feribot limanlarında), şüpheler liman yetkililerine bildirilmelidir. Sürücü, kasasının doğru kapatılıp kapatılmadığını kontrol etmelidir.
• **Kaza Durumunda İlk Yardım:** Kaza yerinde ilk olarak sakin olunmalı ve kendinizi güvene alınmalıdır. Baygın bir kişi bulunursa, başı geriye doğru bükülmeli ve yan yatırılmalıdır (dilin damağa kaçmasını önlemek için). Kalp masajı sert bir zeminde sırtüstü yatan kişiye yapılmalıdır.
• **Yangın:** Otobüste yangın çıkarsa (örneğin mutfakta), yolculara otobüsü hızlı ve sessiz bir şekilde terk etmeleri söylenmeli, acil tahliye için tüm kapılar/çatı kapakları açılmalı ve araç emniyete alınmalıdır. Yangın söndürücü ile yangın söndürmeye çalışmak, yolcular tahliye edilmeden önce yapılmamalıdır. Yangın söndürücüler 12 ayda bir uzman tarafından kontrol edilmelidir.`
        }
      ]
    },
  ],
  faq: [
    {
      question: "Otobüs şoförlüğü eğitimi (Weiterbildung) ne kadar sürer ve ne kadara mal olur?",
      answer: "Normal şartlar altında kurs süresi 4 ila 6 ay arasında değişebilir. Ancak pratik süreçte bu süre 8 veya 9 aya kadar uzayabilmektedir. Her şey yolunda giderse, ehliyet 2 ay gibi kısa bir sürede alınabilir; ancak işi iyice öğrenmek için 4-5 aylık bir süreç ideal görülmektedir. Masraflar Jobcenter tarafından karşılanmazsa, fiyatlar Fahrschule'ye göre 10.000€ ile 14.000€ arasında değişebilir."
    },
    {
      question: "Eğitime başlamak için gerekli Almanca dil seviyesi nedir?",
      answer: "Dil şartı eyaletten eyalete değişir. Bazı eyaletlerde (örneğin Hessen) B1 seviyesi istenirken, Jobcenter B2 seviyesini de talep edebilir. Ancak bazı eyaletlerde (örneğin NRW) A2 seviyesi yeterli kabul edilmiştir. Mülakatta kendinizi ifade edebilmeniz önemlidir."
    },
    {
      question: "B sınıfı (otomobil) ehliyeti için tecrübe süresi şartı var mıdır?",
      answer: "Otobüs ehliyeti (D/DE) almak için genellikle en az iki yıllık B sınıfı ehliyetine sahip olmak şartı aranır. Ancak, iki yıl dolmamışsa ek sürüş dersleri (ilave fahr) ile bu eksik süre giderilebilir ve eğitime başlanabilir."
    },
    {
      question: "D ve DE ehliyetleri arasındaki fark nedir ve hangisi tavsiye edilir?",
      answer: "Otobüs şoförlüğü için temel ehliyet D sınıfıdır. DE ehliyeti alınması tavsiye edilir, çünkü otobüsün arkasına römork (Anhänger) takma imkanı sağlar. Bu, özellikle Reisebus (tur otobüsü) ve uzun yol taşımacılığında avantaj yaratır ve işe girişte öncelik tanınmasına yardımcı olabilir."
    },
    {
      question: "Sağlık kontrolü ve psikolojik testler neleri içerir?",
      answer: "Kapsamlı bir sağlık raporu şarttır. Bu testler; göz, duyma, kan ve idrar tahlilini içerir. Ayrıca, bu işi yapan doktor tarafından psikolojik test de uygulanır; bu genellikle bilgisayar başında pedala ve tuşlara basılarak reaksiyon ve dikkat ölçülen bir testtir."
    },
    {
      question: "IHK (Mesleki Yeterlilik) sınavı nedir, kaç soru çıkar ve geçme notu nedir?",
      answer: "IHK sınavı, profesyonel olarak otobüs kullanmak için gereken mesleki yeterliliktir. Toplam 60 puan üzerinden değerlendirilir ve geçmek için %51 başarı (yaklaşık 31 puan) yeterlidir. Sınavda çıkan soruların büyük çoğunluğu kursun verdiği uygulamadaki sorulardan gelir."
    },
    {
      question: "IHK sınavı Almanca mıdır, yoksa Türkçe dil seçeneği var mıdır?",
      answer: "IHK sınavı genellikle Almanca yapılmaktadır. Ancak, TÜV (Teori) sınavına Türkçe girilebilir."
    },
    {
      question: "IHK sınavındaki soruların formatı nasıldır (yazılı/sözlü/test)?",
      answer: "Sınav çoktan seçmeli (test) sorulardan oluşur. Eskiden açık uçlu (yazılı) sorular olsa da, 2024 itibarıyla bazı yerlerde yazılı soruların kalktığı veya sayısının çok azaldığı (sadece 3 adet rakam yazma gibi) gözlemlenmiştir. IHK sınavında sözlü soru sorulmaz."
    },
    {
      question: "Eğitim masraflarını karşılamak için Jobcenter'dan Gutschein nasıl alınır?",
      answer: "Jobcenter'ı ikna etmek için bir otobüs firmasıyla iş garantisi (Vorabvertrag/Einstellungszusage) veren bir kağıt almak tavsiye edilir. Gutschein (çeki), eğitim ve Fahrschule masraflarının tamamının karşılanması anlamına gelir."
    },
    {
      question: "Kalkış Kontrolü (Abfahrtkontrolle) nedir ve neden önemlidir?",
      answer: "Kalkış kontrolü, sürüş sınavının bir parçasıdır. Bu kontrolü geçemeyen, sürüş sınavına giremez. Bu, aracın sürüş güvenliği için zorunlu kontrolleri içerir."
    },
    {
      question: "Kalkış kontrolünde hangi acil durum malzemeleri kontrol edilmelidir?",
      answer: "İkaz ışığı (fonksiyonu kontrol edilmeli, pil gücünün minimum 8 saat yeterli olduğu test edilmeli), ikaz üçgeni ve ikaz yeleği (mevcut ve temiz olmalı) kontrol edilir. Ayrıca, acil durum çekiçlerinin mevcut olup olmadığı ve acil çıkışların (pencereler ve çatı lüksleri) durumu kontrol edilmelidir."
    },
    {
      question: "Lastik kontrolünde nelere dikkat edilmelidir?",
      answer: "Lastiğin genel durumu (diş veya yan kanatta hasar), hava basıncı, diş derinliği (en az 1,6 mm olmalı) ve lastiklerin içinde veya arasında yabancı cisimler (taş, vida vb.) kontrol edilmelidir."
    },
    {
      question: "Otobüslerdeki yangın söndürücüler ne sıklıkla kontrol edilmelidir ve nerede bulunur?",
      answer: "Yangın söndürücüler her 12 ayda bir uzman tarafından kontrol edilmelidir. Son kontrolün tarihi yangın söndürücünün üzerindeki plakada görülebilir. Normal otobüslerde en az 1 adet (sürücünün yanında), çift katlı otobüslerde ise 2 adet (biri sürücünün yanında, biri üst katta) bulunmalıdır."
    },
    {
      question: "ABS/ABV gösterge ışığı yanarsa sürücü ne yapmalıdır?",
      answer: "Bu uyarı ışığının yanması, elektronik arıza, kablo kopması veya arızalı tekerlek sensörü gibi nedenlerle olabilir. Sürücü bu durumda bir sonraki olası yerde durmalıdır."
    },
    {
      question: "Debriyajın (Kupplung) aşınmasını azaltmak için ne yapılmalıdır?",
      answer: "Debriyajın az kaymasına izin verilmelidir. Trafik sıkışıklığında veya uzun bekleme sürelerinde vitesi takılı bırakmamak ve kalkışta gaz vermemek (debriyajı kaydırmamak) gerekir."
    },
    {
      question: "Bir motorun aşırı ısınmasının olası nedenleri nelerdir?",
      answer: "Olası nedenler arasında hat arızası, su pompası arızası ve V kayışı arızası sayılabilir."
    },
    {
      question: "Bir sürücü haftada ortalama ve maksimum kaç saat çalışabilir?",
      answer: "Sürücünün haftada ortalama 48 saat çalışmasına izin verilir. Maksimum çalışma süresi ise 56 saat ile sınırlandırılmıştır."
    },
    {
      question: "Sürücü kartı hasar görürse veya kaybolursa ne kadar süreyle araç kullanmaya devam edebilirim?",
      answer: "Sürücü kartı hasar görürse, kart olmadan en fazla 15 gün süreyle sürüşe devam edilebilir. Bu durumda yolculuğun başında ve sonunda çıktı alınıp imzalanmalıdır."
    },
    {
      question: "Günlük dinlenme süresi kaç saattir ve nasıl bölünebilir?",
      answer: "Normal günlük dinlenme süresi 11 saattir. Bu süre, en fazla iki parçaya bölünebilir; bu durumda parçalardan biri en az 3 saat, diğeri en az 9 saat olmalıdır."
    },
    {
      question: "Yükleme veya boşaltma için beklenilen süre (Bekleme Süresi) çalışma süresinden sayılır mı?",
      answer: "Yükleme için beklerken, sürücü mola verebildiği sürece bu bekleme süresi çalışma süresi olarak sayılmaz. Dijital takografta bu süre Bekleme Süresi (Bereitschaftzeit) olarak ayarlanmalıdır."
    },
    {
      question: "Otobüs şoförü, yolcuların düşmesini önlemek için araç kullanırken nelere dikkat etmelidir?",
      answer: "Yolcuların düşmesini ve yaralanmasını önlemek için ani kalkış ve ani fren yapılmamalıdır. Ayrıca duraklara yaklaşırken sarsıntılı direksiyon hareketlerinden kaçınılmalıdır."
    },
    {
      question: "Yardıma ihtiyacı olan (yaşlı/engelli) yolculara karşı sürücünün özel sorumlulukları nelerdir?",
      answer: "Şoför, güçsüz kişilere inip binme sırasında yardım etmelidir. Duraktan ayrılmadan önce, açıkça yardıma ihtiyacı olan kişinin (fiziksel engelli, hamile, görme engelli) güvenli bir yere oturduğundan veya tutunduğundan emin olmak şoförün sorumluluğundadır."
    },
    {
      question: "Otobüs şoförü hangi durumlarda yolcuyu taşımayı reddedebilir?",
      answer: "Sürücü, geçerli bir bileti olmayan veya davranışlarıyla diğer yolcuların güvenliğini ve otobüsün düzenini tehlikeye atan (örneğin sarhoş veya kaba davranan) kişileri taşıma dışında bırakma yetkisine sahiptir."
    },
    {
      question: "Emniyet kemeri takma zorunluluğu var mıdır ve ne zaman çözülmesine izin verilir?",
      answer: "Ara sıra yapılan seferlerde (Reisebus) koltuklarda emniyet kemeri varsa, bunların takılması zorunludur ve sürücü yolcuları uyarmalıdır. Sürüş sırasında çözülmemelidir; ancak tuvalet ihtiyacı gibi kısa süreli ayrılmalar için izin verilir."
    },
    {
      question: "Otobüs durakları nasıl anons edilmelidir?",
      answer: "Düzenli hatlarda (Linienverkehr) şoför tüm durakları zamanında anons etmek zorundadır."
    },
    {
      question: "Sürücü otobüsün kasasının (Kasse) çalınmasını önlemek için hangi önlemleri alabilir?",
      answer: "Mekanik güvenlik ve elektronik güvenlik (örneğin alarm sistemi veya GPS) kullanılabilir."
    },
    {
      question: "Dış görünüş ve kurumsal imaj için sürücünün dikkat etmesi gerekenler nelerdir?",
      answer: "Olumlu bir izlenim bırakmak için sürücünün kişisel hijyenine ve temiz iş kıyafetlerine dikkat etmesi gerekir. Genel olarak, sürücü nazik, yardımsever, kibar ve yetkin olmalıdır."
    },
    {
      question: "Yeni başlayan bir otobüs şoförü ne kadar net maaş kazanır?",
      answer: "Yeni başlayanlar için net maaşlar 1800€ ile 2200€ arasında değişebilir. Genel olarak net maaşın 2400€ - 2600€ civarında olduğu düşünülmektedir."
    },
    {
      question: "Otobüs şoförlüğü ve TIR (LKW) şoförlüğü arasındaki temel farklar nelerdir?",
      answer: "LKW şoförlüğü daha yüksek gelir sağlayabilir, ancak zorluk derecesi daha fazladır. Otobüs şoförlüğü ise LKW'ye kıyasla daha temiz, daha az stresli ve daha az yıpratıcı bir iş olarak görülmektedir; ancak sürekli insanlarla uğraşma ve dur-kalk yapma zorunluluğu vardır."
    },
    {
      question: "Otobüs şoförlüğünün dezavantajları nelerdir?",
      answer: "Şoförler sürekli insanlarla uğraşmak, dur-kalk yapmak zorundadır. Mesai saatleri kısıtlıdır; yemek yemeye veya telefonda vakit geçirmeye fırsat bulunamayabilir ve dakiklik baskısı stresi artırabilir."
    },
    {
      question: "Otobüs şoförlüğünün sektöründe iş bulmak kolay mıdır?",
      answer: "Evet, sektörde ciddi bir açık bulunmaktadır. Bu nedenle işe alım süreçleri genellikle kolaydır ve birçok firma rahatça kabul edebilmektedir."
    },
    {
      question: "Mesleğin zorluğu ve sorumluluğu hakkında genel bir benzetme yapabilir misiniz?",
      answer: "Otobüs şoförlüğü, tıpkı bir hava trafik kontrolörü gibi, sürekli dikkat ve yüksek düzeyde sorumluluk gerektirir. Uçaklar (yolcular) sürekli iniş-kalkış yaparken (dur-kalk), kontrolörün (şoförün) sadece kendi güvenliğini değil, aynı zamanda hava sahasındaki (otobüsteki) tüm birimlerin güvenliğini de anlık kararlarla sağlaması beklenir. Bu durum, maaş ve çalışma saatlerinin kısıtlılığına rağmen mesleğin gerektirdiği titizliği ve stresi açıklar."
    }
  ]
};
