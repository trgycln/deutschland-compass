
export const electricianData = {
  title: "Elektrikçi ve Elektronikçi Meslek Rehberi",
  description: "Almanya'da Endüstriyel Elektrikçi ve Elektronikçi (Enerji/Bina Tekniği) meslekleri, Ausbildung, denklik süreçleri ve uyum eğitimleri hakkında detaylı rapor.",
  videoUrl: "", 
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Eğitim Süresi", value: "3.5 Yıl", color: "bg-blue-500" },
    { label: "Sektör", value: "Sanayi & İnşaat", color: "bg-emerald-500" },
    { label: "Gelir", value: "€3.000 - €4.500", color: "bg-purple-500" }
  ],
  analogy: {
    title: "Elektrik Kariyeri: Bir Şebeke Kurmak Gibidir",
    description: "Almanya'da elektrikçi olmak, karmaşık bir enerji şebekesini sıfırdan kurmaya benzer. Temel eğitim (Ausbildung) ana trafo merkezinizdir; sağlam olmalıdır. Denklik süreci (Anerkennung), şebekenizin Alman standartlarına (VDE normları) uyumlu hale getirilmesidir. Eksik modüller (Anpassungsqualifizierung), voltaj uyumsuzluklarını gidermek için eklenen regülatörler gibidir. Sonunda, tüm sistem (kariyeriniz) güvenli ve kesintisiz bir şekilde enerji (gelir ve başarı) akışı sağlar."
  },
  sections: [
    {
      id: "temel-meslekler",
      title: "Elektrik Alanındaki Temel Meslekler ve Tanıtım",
      content: [
        {
          subtitle: "Genel Bakış",
          text: `Bu raporda, denklik süreçlerinde referans meslek olarak geçen Endüstriyel Elektrikçi (Industrieelektriker) ve Elektronikçi Enerji/Bina Tekniği (Elektroniker Energie/Gebäudetechnik) mesleklerine ilişkin detaylar incelenmiştir. Kaynaklarda iki ana meslek kolu, Almanya'daki denklik işlemleri bağlamında öne çıkmaktadır.`
        },
        {
          subtitle: "1. Endüstriyel Elektrikçi - İşletme Tekniği Uzmanlığı",
          text: `**Industrieelektriker Fachrichtung Betriebstechnik**
Bu meslek, yabancı bir mesleki yeterliliğin Alman referans mesleği ile eşdeğerliğini belirleme sürecinde bir referans noktası olarak kullanılmıştır. Bir denklik kararında, Türkiye'deki mesleki yeterliliklerin bu Alman referans mesleği ile eşdeğer olduğu tespit edilmiştir.`
        },
        {
          subtitle: "2. Elektronikçi - Enerji ve Bina Tekniği Uzmanlığı",
          text: `**Elektroniker FR Energie- und Gebäudetechnik**
Bu meslek kolu da bir denklik ve uyum kalifikasyon planının (Anpassungsqualifizierungsplan) konusu olmuştur. Türk mesleki kalifikasyonu için kısmi eşdeğerlik kararı alınmış ve tam eşdeğerliğe ulaşmak için bu referans mesleğe yönelik bir uyum süreci belirlenmiştir.`
        }
      ]
    },
    {
      id: "denklik-surecleri",
      title: "Mesleki Denklik Süreçleri ve Öğrenim Detayları",
      content: [
        {
          subtitle: "Yasal Çerçeve ve Türkiye Örneği",
          text: `Yabancı mesleki yeterliliklerin Almanya'daki referans mesleklerle eşdeğerliğinin tespiti, Berufsqualifikationsfeststellungsgesetz (BQFG) (§ 4) (Mesleki Kalifikasyon Tespit Yasası) hükümlerine dayandırılmıştır.

**Türkiye'deki Eğitimin İçeriği (Örnek Olay):**
Bir denklik sürecinde incelenen Türkiye'deki elektrik alanındaki mesleki eğitim, 3 yıl sürmüş ve bu süre yönetmelik süresine uygun bulunmuştur. Eğitim içeriği teori ve pratik olarak aktarılmış, pratik kısmı yaklaşık 1 yıl 2 ay sürmüştür.

Bu eğitimde alınan nitelikler ve dersler şunlardır:
• Matematik
• Doğa Bilimleri (Naturwissenschaften)
• Almanca (Deutsch)
• Teknik ve Elektrik Çizimleri (Technisches und elektrisches Zeichnen)
• Elektrik Makineleri ve İş (Elektrische Maschinen und Labor)
• Mesleki Bilgiler (Berufskunde)
• İşyeri ve Laboratuvar (Werkstatt und Labor)`
        },
        {
          subtitle: "Denklik Sonucu ve Uyum Kalifikasyonu",
          text: `Yabancı bir yeterliliğin Elektronikçi – FR Enerji- ve Bina Tekniği mesleğiyle tam eşdeğerliğine ulaşmak için Anpassungsqualifizierung (Uyum Kalifikasyonu) gerekebilmektedir.

• **Süre ve Yapı:** Uyum kalifikasyonu süresinin tahmini olarak 12 ila 18 ay olacağı belirtilmiştir. Bir uyum planına göre toplam kalifikasyon süresi 20 ay 2 hafta olup, bunun 19 ayı işletme içi (betriebliche Qualifizierung) ve 1 ay 2 haftası işletmeler arası (überbetriebliche – ÜBL) kurslarda geçmektedir.
• **İşletme İçi/Dışı Gereklilikler:** Tam kalifikasyonun sağlanabilmesi için, işletme içi uyum kalifikasyonunun yanı sıra, işletmeler arası (ÜBL) kurslara katılım zorunludur.`
        }
      ]
    },
    {
      id: "farklilik-alanlari",
      title: "Temel Farklılık Alanları (Gap Analysis)",
      content: [
        {
          subtitle: "Eksik Görülen Yetkinlikler",
          text: `Kısmi denklik durumunda, yabancı eğitim ile Alman referans mesleği arasındaki bazı önemli farklılıklar tespit edilmiştir. Bu farklılıklar, uyum kalifikasyonu yoluyla giderilmesi gereken, Alman mesleki eğitim yönetmeliği (§ 4 Absatz 2 Nummerları) kapsamında temel sayılan bilgi, yetenek ve becerilerdir:

• **Müşteri İlişkileri:** Müşterilere danışmanlık yapmak ve onları desteklemek.
• **Veri ve Bilgi Güvenliği:** Veri koruma ve bilgi güvenliği konseptlerinin kontrolü ve bunlara uyulması.
• **Koruma Önlemlerinin Kontrolü:** İlgili VDE ve TRBS Normlarına göre elektrik tesisatları ve cihazlardaki koruma önlemlerinin kontrolü ve değerlendirilmesi.
• **Hata Analizi ve Bakım:** İlgili VDE ve TRBS Normlarına göre cihaz ve sistemlerdeki hataların analizi, giderilmesi ve bakımlarının yapılması.
• **Montaj ve Kurulum:** Yapı bileşenlerinin, montaj gruplarının ve cihazların montajı ve kurulumu.
• **Ağ Sistemleri:** Ağların (Netzwerken) montajı ve kurulumu.
• **Enerji Dönüşüm Sistemleri:** İlgili VDE Normlarına göre enerji dönüşüm sistemlerinin ve ilgili kontrol cihazlarının kurulumu ve devreye alınması.
• **Bina Sistem Tekniği:** Bina sistem tekniğinin (Gebäudesystemtechnik) kurulumu ve konfigürasyonu.
• **İletişim Sistemleri:** İlgili DIN EN ve VDE Normlarına göre anten ve geniş bant iletişim sistemlerinin kurulumu ve kontrolü.
• **Tekrar Eden Kontroller:** Geçerli normlara uygun olarak tekrar eden kontrollerin yapılması ve bina teknik sistemlerinin bakımı.`
        }
      ]
    },
    {
      id: "egitim-icerigi",
      title: "Eğitim İçeriği ve Kurs Modülleri",
      content: [
        {
          subtitle: "Kurs Modülleri ve Amaçları",
          text: `Elektronikçi Enerji/Bina Tekniği alanında verilen eğitim/kurs içerikleri, spesifik pratik yeteneklerin kazanılmasına odaklanmaktadır. Bu kurslar genellikle müşteri siparişlerinin değerlendirilmesi, plan çizimi, montaj, devreye alma ve dokümantasyon aşamalarını içerir.

**Önemli Eğitim Modülleri:**

• **G-ETEM 2/03 (Ölçme ve Analiz):** Müşteri siparişinin değerlendirilmesi, kurulum ve akım şemalarının hazırlanması, cihaz/kabloların montajı, VDE0100 Bölüm 610'a göre devreye alma, kontrol (Besichtigen), deneme (Erproben) ve ölçme (Messen) işlemleri, dokümantasyon.
• **ET 1/04 (Elektrik Sistemlerinin Kurulumu ve Test Edilmesi):** Doğrudan ve dolaylı temasa karşı koruma, test/ölçüm cihazlarının seçimi/kullanımı, VDE0100 Bölüm 610/ VDE 701/702'ye göre devreye alma ve test işlemleri, teslim raporu ve test protokolü hazırlanması.
• **ET 2/04 (Sistem Bileşenleri ve Ağların Kurulumu):** Ağ tekniği temelleri ve ilgili sistem bileşenleri, ağ altyapısının konfigürasyonu ve devreye alınması.
• **ET 3/04 (Kontrol Sistemlerinin Kurulumu ve Test Edilmesi):** Kontrol tekniği temelleri, anahtarlama cihazlarının yapısı/işlevi, kontaktörler, sensörler ve aktüatörler ile kontrol sistemlerinin montajı ve devreye alınması, elektronik küçük kontrol sistemleri kullanılması.
• **ETE 2/04 (Bina İletişim Tesisatlarının Kurulumu ve Test Edilmesi):** Analog ve dijital alıcı tesisat tekniği temelleri, alıcı tesisat bileşenlerinin programlanması ve devreye alınması, ölçüm cihazları ve kabul ölçümleri.
• **ETE 3/04 (Bina Yönlendirme Sistemleri ve Uzaktan Kumanda Tesisatları):** EIB / LON / LCN sistemleri, bina leittechnik (yönlendirme tekniği) temelleri, bileşenlerin programlanması / parametrelenmesi ve devreye alınması.`
        },
        {
          subtitle: "Gerekli Çalışma Malzemeleri",
          text: `Bu meslek dalında eğitim alınırken katılımcıların yanlarında bulundurması gereken temel çalışma ve ölçüm araçları şunlardır:

• Şaftlı tornavida seti (Schraubendrehersatz) (özellikle 2,5 mm uçlu yarık başlı dahil).
• Yan keski (Seitenschneider).
• İzolasyon sıyırma pensesi (Abisolierzange).
• Kablo ucu yüksük pensesi (Aderendhülsenzange).
• Kablo bıçağı (Kabelmesser).
• Sivri burun pense (Spitzzange).
• Gerilim test cihazı (Duspol).
• Katlanır metre (Gliedermaßstab).
• Tablo kitabı (Tabellenbuch).
• Yazı gereçleri ve Rapor defterleri (Berichtshefte).
• Ağ kurulumu için LSA+ Anlegewerkzeug ve iletişim/bina sistemleri için özel ölçüm cihazları.

**Özetle:** Elektrik/Elektronik alanındaki bu meslekler, Alman standartlarına (özellikle VDE ve TRBS normları) uygun olarak kurulum, ölçüm, kontrol, bakım ve modern bina iletişim/yönlendirme sistemlerinin programlanması gibi geniş bir yelpazede uzmanlık gerektirmektedir.`
        }
      ]
    }
  ],
  faq: [
    {
      question: "Kaynaklarda denklik süreçlerinde hangi elektrik alanındaki meslekler referans olarak alınmıştır?",
      answer: "İki temel meslek kolu referans meslek olarak kullanılmıştır:\n1. **Endüstriyel Elektrikçi - İşletme Tekniği Uzmanlığı** (Industrieelektriker Fachrichtung Betriebstechnik).\n2. **Elektronikçi - Enerji ve Bina Tekniği Uzmanlığı** (Elektroniker FR Energie- und Gebäudetechnik)."
    },
    {
      question: "Yabancı mesleki yeterliliklerin Almanya'daki eşdeğerlik tespiti hangi yasal dayanağa göre yapılmaktadır?",
      answer: "Mesleki yeterliliklerin eşdeğerlik tespiti, **Berufsqualifikationsfeststellungsgesetz (BQFG)** (Mesleki Kalifikasyon Tespit Yasası) § 4 hükümleri temel alınarak gerçekleştirilmektedir."
    },
    {
      question: "Türkiye'de alınan mesleki elektrik eğitimi hakkında kaynaklarda hangi detaylar mevcuttur?",
      answer: "İncelenen bir örnekte, Türkiye'deki elektrik (orijinal: Elektrik) alanındaki mesleki eğitimin 3 yıl sürdüğü ve bunun yönetmelik süresine uygun olduğu belirtilmiştir. Bu eğitimin içeriği teori ve pratik olarak verilmiş olup, pratik kısmı yaklaşık 1 yıl 2 ay sürmüştür. Bu eğitimde alınan dersler arasında Matematik, Doğa Bilimleri (Naturwissenschaften), Almanca (Deutsch), Teknik ve Elektrik Çizimleri, Elektrik Makineleri ve İş ile Mesleki Bilgiler (Berufskunde), İşyeri ve Laboratuvar dersleri bulunmaktadır."
    },
    {
      question: "Endüstriyel Elektrikçi (İşletme Tekniği) mesleği için denklik sonucu ne olmuştur?",
      answer: "Yeterli mesleki tecrübe dikkate alınarak, yabancı eğitim ve ilgili 2 yıl 9 aylık (tam zamanlı) mesleki tecrübe sonrasında, kazanılan niteliklerin Alman referans mesleği olan Endüstriyel Elektrikçi FR Betriebstechnik ile tamamen eşdeğer (gleichwertig) olduğu tespit edilmiştir. Bu denklik tespit süreci, BQFG § 4 hükümlerine dayanmaktadır."
    },
    {
      question: "Elektronikçi – Enerji ve Bina Tekniği mesleği için kısmi denklik durumunda tam eşdeğerliğe ulaşmak için hangi süreç izlenmelidir?",
      answer: "Kısmi denklik kararı alındığında, tam eşdeğerliğe ulaşmak için bir **Anpassungsqualifizierungsplan** (Uyum Kalifikasyonu Planı) uygulanır. Bu plan, işletme içi (betriebliche Qualifizierung) ve işletmeler arası (überbetriebliche Lehrgänge – ÜBL) kursların ziyaret edilmesini zorunlu kılar."
    },
    {
      question: "Uyum Kalifikasyonu (Anpassungsqualifizierung) ne kadar sürmektedir?",
      answer: "Uyum kalifikasyonunun tahmini süresi 12 ila 18 ay olarak belirtilmiştir. Bir uyum planında ise toplam kalifikasyon süresi 20 ay 2 hafta olarak belirlenmiştir."
    },
    {
      question: "Kalifikasyon süresi işletme içi ve işletmeler arası kurslar arasında nasıl dağıtılmaktadır?",
      answer: "Toplam 20 ay 2 haftalık kalifikasyon süresinin büyük bir kısmı, 19 ayı işletme içi (betriebliche Qualifizierung) olarak bir işletmede gerçekleştirilirken, kalan 1 ay 2 hafta ise işletmeler arası (ÜBL) kurslarda geçirilmelidir."
    },
    {
      question: "Uyum Kalifikasyonu, yabancılar hukuku açısından nasıl bir öneme sahiptir?",
      answer: "Bu uyum kalifikasyonu, tam kalifiye bir uzman (volle Fachkraft) olmaya olanak tanıdığı için, ilgili kişinin § 16d Abs.1 AufenthG (Almanya İkamet Yasası) uyarınca değiştirilmiş bir ikamet unvanı almasını mümkün kılabilir."
    },
    {
      question: "Türk eğitimi ile Alman Elektronikçi – FR Enerji- ve Bina Tekniği mesleği arasındaki temel farklılıklar nelerdir?",
      answer: "Alman mesleki eğitim yönetmeliğine göre (§ 4 Absatz 2 Numaraları) belirlenen ve uyum kalifikasyonu gerektiren temel farklılık alanları şunlardır:\n• **Müşteri İlişkileri:** Müşterilere danışmanlık yapmak ve onları desteklemek.\n• **Veri ve Bilgi Güvenliği:** Veri koruma ve bilgi güvenliği konseptlerinin kontrolü ve bunlara uyulması.\n• **Normlara Uygun Kontrol:** İlgili VDE ve TRBS Normlarına göre elektrik tesisatları ve cihazlardaki koruma önlemlerinin test edilmesi ve değerlendirilmesi.\n• **Hata Analizi ve Bakım:** İlgili VDE ve TRBS Normlarına göre cihaz ve sistemlerdeki hataların analizi ve giderilmesi.\n• **Montaj ve Kurulum:** Yapı bileşenlerinin, montaj gruplarının ve cihazların montajı/kurulumu.\n• **Ağ Sistemleri:** Ağların (Netzwerken) montajı ve kurulumu.\n• **Enerji Dönüşüm Sistemleri:** İlgili VDE Normlarına göre enerji dönüşüm sistemlerinin ve kontrol cihazlarının kurulumu.\n• **Bina Sistem Tekniği:** Bina sistem tekniği (Gebäudesystemtechnik) kurulumu ve konfigürasyonu.\n• **İletişim Sistemleri:** İlgili DIN EN ve VDE Normlarına göre anten ve geniş bant iletişim sistemlerinin kurulumu ve kontrolü."
    },
    {
      question: "Elektronikçi Enerji/Bina Tekniği uyum kurslarında hangi spesifik konular işlenmektedir?",
      answer: "Uyum eğitiminde işlenen konular ve modüller, özellikle pratik becerilerin kazanılmasına odaklanır:\n• **Ölçme ve Analiz (G-ETEM 2/03):** Müşteri siparişlerini değerlendirme, kurulum ve akım şemaları hazırlama, VDE0100 Bölüm 610'a göre devreye alma ve ölçme işlemleri.\n• **Elektriksel Sistemlerin Kurulumu ve Test Edilmesi (ET 1/04):** Doğrudan ve dolaylı temasa karşı koruma, VDE0100 Teil 610/ VDE 701/702'ye göre testler ve teslim raporu hazırlama.\n• **Ağ Sistemlerinin Kurulumu (ET 2/04):** Network (Ağ) tekniği temelleri ve altyapısının konfigürasyonu ve devreye alınması.\n• **Kontrol Sistemlerinin Kurulumu (ET 3/04):** Şalt cihazlarının (kontaktörler, sensörler) ve elektronik küçük kontrol sistemlerinin montajı ve devreye alınması.\n• **Bina İletişim Tesisatları (ETE 2/04):** Analog ve dijital alıcı tesisat tekniği, bileşenlerin programlanması ve kabul ölçümleri.\n• **Bina Yönlendirme Sistemleri (ETE 3/04):** EIB / LON / LCN gibi Gebäudeleittechnik (Bina yönlendirme tekniği) temelleri ve bileşenlerin programlanması/parametrelenmesi."
    },
    {
      question: "Bu kurslar veya eğitimler sırasında katılımcıların yanlarında getirmesi gereken zorunlu çalışma araçları nelerdir?",
      answer: "Katılımcıların yanlarında bulundurması gereken temel araçlar şunlardır:\n• Tornavida seti (özellikle 2,5 mm uçlu yarık başlı dahil).\n• Yan keski, izolasyon sıyırma pensesi, kablo ucu yüksük pensesi.\n• Kablo bıçağı ve sivri burun pense.\n• Gerilim test cihazı (Duspol).\n• Katlanır metre (Gliedermaßstab), Tablo kitabı (Tabellenbuch).\n• Ağ kurulumu için LSA+ Anlegewerkzeug ve iletişim/bina sistemleri için koaksiyel kablo/absetzwerkzeug veya ölçüm cihazı (Messgerät)."
    },
    {
      question: "Mesleki kariyerle ilgili genel bilgi etkinlikleri mevcut mudur?",
      answer: "Okuldan sonra kariyer yolları hakkında bilgilendirme etkinlikleri mevcuttur. \"Wie geht es nach der Schule weiter?\" (Okuldan sonra nasıl devam edilir?) başlıklı bu etkinlikler ücretsizdir ve Türkçe dâhil olmak üzere farklı dillerde sunulmaktadır. Türkçe dilindeki toplantının tarihi Çarşamba, 09.10.2024, saat 17:00 olarak belirlenmiştir. Etkinlikler, Offenbach'ta, Berliner Straße 77 adresindeki Volkshochschule'de hem yüz yüze hem de çevrimiçi (online) yapılmaktadır."
    }
  ]
};
