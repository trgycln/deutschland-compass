
export const gisData = {
  title: "Coğrafi Bilgi Sistemleri (GIS/CBS) Uzmanlığı Rehberi",
  description: "Mekansal verileri analiz etmek ve görselleştirmek için kullanılan CBS (GIS) uzmanlığı hakkında kapsamlı rehber. Eğitim, kariyer fırsatları, maaşlar ve sistem gereksinimleri.",
  videoUrl: "", // Admin panelinden güncellenebilir
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-green-500" },
    { label: "Dil Seviyesi", value: "B2 - C1", color: "bg-blue-500" },
    { label: "Başlangıç Maaşı", value: "2.900€ - 3.500€ (Brüt)", color: "bg-indigo-500" },
    { label: "Sektör", value: "Bilişim & Mühendislik", color: "bg-purple-500" }
  ],
  analogy: {
    title: "Meslek Analojisi",
    description: "GIS mesleği, konum bazlı verinin giderek önem kazandığı bir çağda, coğrafi bilgileri haritalama, analiz etme ve problem çözme becerileriyle birleştiren bir köprü gibidir; bu alanda ilerlemek, iyi bir teknik donanım ve akıcı Almanca bilgisi ile Almanya'daki büyüyen piyasada kariyer kapılarını açmaktadır."
  },
  sections: [
    {
      id: "tanim-kapsam",
      title: "Tanım ve Kapsam",
      content: [
        {
          subtitle: "GIS/CBS Nedir?",
          text: `Coğrafi Bilgi Sistemleri (CBS), mekânsal verileri analiz etmek ve görselleştirmek için kullanılan güçlü bir araçtır. CBS uzmanı (Almancası: GIS und Geodata Spezialist) mesleği, şehir planlamadan çevre yönetimine kadar geniş bir yelpazede uygulama alanı bulur.

**Temel Uygulama Alanları:**
CBS, uydu görüntüleri, hava fotoğrafçılığı ve anket verileri gibi çeşitli kaynaklardan veri entegrasyonu ve analizi yapılmasına olanak tanır. Bu analiz, geleneksel yöntemlerle tespit edilmesi zor olabilecek kalıpları ve ilişkileri belirlemede yardımcı olur.

**Kariyer Fırsatları:**
GIS profesyonellerinin kariyer fırsatları; şehir planlama, çevre yönetimi, lojistik, afet yönetimi, tarım ve enerji gibi geniş bir yelpazeyi kapsar. Ayrıca, CBS'nin Akıllı Şehir konseptleriyle ve altyapı projeleriyle de yakından ilişkili olduğu belirtilmiştir.`
        },
        {
          subtitle: "Spesifik Uygulama Örnekleri",
          text: `• **Fiber Optik Planlama (Glasfaserplanung):** GIS, fiber optik ve elektrik kablo hatları projelerinde planlayıcı olarak kolaylıkla iş bulma imkanı sunan revaçta bir alandır. Glasfaserplanung eğitimi kurs içeriklerinde yer almaktadır.
• **Mekansal Analizler:** CBS yazılımları, Harita Projeksiyonu, Koordinat Sistemleri (EPSG: 4326, EPSG: 3857), DEM (Sayısal Yükseklik Modelleri), Contour (eşyükselti) haritaları, Raster Analizleri (Hillshade, Aspect, Slope), Uzaktan Algılama (radyometrik, uzamsal, spektral ve zamansal çözünürlük) ve Çok Kriterli Karar Verme Yöntemleri gibi teknik çalışmaları içerir.
• **Ağ Analizi:** ArcGIS Network Analyst Extentions, özellikle ambulansların ve itfaiyelerin hizmet alanlarını mekan analiz yöntemleriyle hesaplamakta sıklıkla kullanılır.
• **Veritabanı Yönetimi:** GIS, verimli veri depolama ve alma için mekansal veritabanı yönetiminde güçlü bir temel oluşturur. PostgreSQL tabloları Excel'de açılabilir.`
        }
      ]
    },
    {
      id: "ilgili-alanlar-yetkinlikler",
      title: "İlgili Alanlar ve Gerekli Yetkinlikler",
      content: [
        {
          subtitle: "Mesleki Geçmiş ve Eğitim",
          text: `GIS/CBS mesleği genellikle belirli alanlardan mezun olanlara yöneliktir, ancak ilgi duyan ve emek göstermeye hazır olan herkesin bu alanda ilerleyebileceği belirtilmiştir.

**Özellikle İlgili Bölümler:**
• Coğrafyacılar.
• Şehir Plancıları.
• Jeoloji ve Jeofizik Mühendisleri.
• Harita veya İnşaat Teknikerleri/Mühendisleri.
• Yer Bilimleri Bilimi (Geowissenschaften, Jeofizik vb.).
• Biyoloji ve Su Ürünleri Mühendisliği gibi farklı branşlardan mezun olan kişiler de Weiterbildung programlarına katılabilmektedir.`
        },
        {
          subtitle: "Yazılım ve Teknik Bilgi",
          text: `Bir CBS uzmanının piyasada iş bulma şansını artırmak için üç ana program/beceriye en az %70 oranında vakıf olması tavsiye edilir:

• **ArcGIS:** Piyasada %80 oranında kullanılan ücretli bir yazılımdır. ArcGIS Pro'nun kişisel kullanım paket fiyatı bir yıllık lisans için vergi dahil 116 Euro'dur.
• **QGIS:** Açık kaynaklı (OpenSource) ve ücretsizdir. ArcGIS ile tamamen aynı mantıkta olup, birçok aracı ortaktır.
• **Programlama Dilleri:** Python veya Java bilgisi önemlidir.

**Kurs İçeriklerinde Yer Alan Diğer Konular:**
• Glasfaserplanung (Fiber Optik Planlama).
• Postgresql ve Postgis (Mekansal Veritabanı).
• FME.
• Bauleitung (Şantiye Yönetimi).
• WebMapping (QGIS Cloud ile yayın yapma).`
        },
        {
          subtitle: "Dil Yeterliliği",
          text: `Almanca seviyesi iş bulma konusunda çok önemli olup, kapıyı %60 oranında açar.

• **Minimum Şart:** Weiterbildung ve Ausbildung için en az B2 dil seviyesi istenmektedir.
• **Tavsiye Edilen Seviye:** İyi bir Almanca ve piyasaya giriş için C1 seviyesi şiddetle tavsiye edilir.`
        }
      ]
    },
    {
      id: "egitim-kariyer-yollari",
      title: "Eğitim ve Kariyer Yolları (Almanya)",
      content: [
        {
          subtitle: "Eğitim Seçenekleri",
          text: `GIS alanında kariyer yapmak isteyenler için Almanya'da çeşitli eğitim yolları mevcuttur:

**1. Weiterbildung (İş Eğitimi):**
• **Süre:** Genellikle 6-9 ay arası.
• **Açıklama:** Hızlı bir kariyer geçişi için tercih edilir. Eğitim süreci sonrası staj (praktikum) önemlidir.

**2. Umschulung (Meslek Değişikliği):**
• **Süre:** 24 ay.
• **Açıklama:** Paderborn'da Smallworld GIS gibi etkin yazılımları kullanan firmalar tarafından sunulan ve gençlere tavsiye edilen programlar mevcuttur; genellikle online değildir.

**3. Ausbildung (Mesleki Eğitim):**
• **Süre:** 3 yıl.
• **Açıklama:** Geomatiker mesleği GIS alanına en yakın Ausbildung dalıdır.`
        },
        {
          subtitle: "Staj ve Sertifikalar",
          text: `• **Staj (Praktikum) Önemi:** Almanya'da pratik bilgi ve tecrübe edinmek amacıyla en az iki adet 3'er aylık praktikum yapmak çok önemlidir. İş görüşmelerinde bu stajlara bakılır.
• **Özel Kurslar ve Sertifikalar:** Çeşitli kurumlar tarafından farklı kapsamda GIS kursları sunulmaktadır, örneğin GIS und Geodatenspezialist veya GIS Development. Bazı kurslar Job Center desteği (Bildungsgutschein) ile alınabilmektedir.`
        }
      ]
    },
    {
      id: "is-imkanlari-ucret",
      title: "İş İmkanları ve Ücret Beklentisi",
      content: [
        {
          subtitle: "Piyasa Durumu ve Maaşlar",
          text: `**İş Piyasası Durumu:**
Almanya piyasasında GIS uzmanlarına yönelik ciddi eleman açığı bulunmaktadır. B2 üstü Almanca bilen ve QGIS/ArcGIS'i belli bir seviyede kullanabilen kişilerin iş bulma şansının yüksek olduğu ifade edilmiştir.

**Ücretler:**
• **Başlangıç Maaşı (Net):** 1800 - 3500 Euro arasında değişir.
• **Tavsiye Edilen Brüt Ücret:** Minimum 2900 - 3000 Euro brüt ücret teklif eden firmalarla çalışılması önerilir.
• **Tecrübeli Maaşı:** 3-4 yıllık tecrübeye sahip bir uzmana 70 bin Euro brüt maaş teklif edilebildiği belirtilmiştir.

**Evden Çalışma (Home Office):**
Sektöre yeni giren ve hiç tecrübesi olmayan biri için direkt home office çalışmak çok zordur. Ancak bir iş yerinde en az 1 yıl tecrübe edinildikten sonra evden çalışma imkanı kolaylıkla mümkün olabilir.`
        }
      ]
    },
    {
      id: "sistem-gereksinimleri",
      title: "GIS Yazılım Sistemi Gereksinimleri",
      content: [
        {
          subtitle: "Donanım Tavsiyeleri",
          text: `GIS yazılımlarını sorunsuz kullanabilmek için minimum ve önerilen sistem gereksinimleri şöyledir:

**Minimum Sistem Gereksinimleri:**
• **İşlemci:** 9. Nesil Intel Core i5
• **RAM:** 8GB+
• **Depolama:** 256GB SSD
• **Ekran:** 14 inç FHD IPS (1920x1080)
• **Grafik Kartı:** 2GB NVIDIA GeForce MX350

**Önerilen Sistem Gereksinimleri:**
• **İşlemci:** 10. Nesil Intel Core i7
• **RAM:** 16GB+ (Optimal: 32GB+)
• **Depolama:** 512GB SSD
• **Ekran:** 15.6 inç FHD IPS (1920x1080)
• **Grafik Kartı:** 4GB NVIDIA GeForce GTX 1650 veya daha iyisi

**Genel Tavsiye:**
Minimum i5 işlemci, 8GB RAM, 4GB ekran kartı ve SSD sistemi ile çalışmak önerilir.`
        }
      ]
    }
  ],
  faq: [
    {
      question: "Coğrafi Bilgi Sistemleri (CBS/GIS) tam olarak nedir ve CBS uzmanı ne iş yapar?",
      answer: "Coğrafi Bilgi Sistemleri (CBS), mekânsal verileri analiz etmek ve görselleştirmek için kullanılan güçlü bir araçtır. CBS uzmanı (Almancası: GIS und Geodata Spezialist), uydu görüntüleri, hava fotoğrafçılığı ve anket verileri gibi çeşitli kaynaklardan gelen verilerin entegrasyonu ve analizini yapar. Bu analiz, geleneksel yöntemlerle tespit edilmesi zor olabilecek kalıpları ve ilişkileri belirlemede yardımcı olur."
    },
    {
      question: "CBS uzmanlarının kariyer fırsatları hangi sektörleri kapsar?",
      answer: "GIS profesyonellerinin kariyer fırsatları geniş bir yelpazeyi kapsar. Başlıca uygulama alanları şunlardır: Şehir Planlama, Çevre Yönetimi, Lojistik, Afet Yönetimi, Tarım, Enerji, Altyapı Projeleri (özellikle fiber optik ve elektrik kablo hatları) ve Akıllı Şehirler (Smart City) konseptleri."
    },
    {
      question: "CBS mesleği hangi temel teknik çalışmaları içerir?",
      answer: "CBS yazılımları, Harita Projeksiyonu, Koordinat Sistemleri (EPSG: 4326, EPSG: 3857), DEM (Sayısal Yükseklik Modelleri), Contour (eşyükselti) haritaları, Raster Analizleri (Hillshade, Aspect, Slope) ve Çok Kriterli Karar Verme Yöntemleri gibi teknik çalışmaları içerir. Ayrıca, ArcGIS Network Analyst Extentions kullanılarak ambulansların ve itfaiyelerin hizmet alanlarını mekan analiz yöntemleriyle hesaplama gibi ağ analizleri de sıkça kullanılır."
    },
    {
      question: "Hangi bölümlerden mezun olanlar CBS alanına yönelebilir?",
      answer: "GIS/CBS mesleği genellikle belirli alanlardan mezun olanlara yöneliktir, ancak ilgi duyan ve emek göstermeye hazır olan herkesin bu alanda ilerleyebileceği belirtilmiştir. Özellikle ilgili bölümler şunlardır: Coğrafyacılar, Şehir Plancıları, Jeoloji ve Jeofizik Mühendisleri, Harita veya İnşaat Teknikerleri/Mühendisleri, Yer Bilimleri Bilimi (Geowissenschaften, Jeofizik vb.). Biyoloji ve Su Ürünleri Mühendisliği gibi farklı branşlardan mezun olan kişiler de Weiterbildung programlarına katılabilmektedir."
    },
    {
      question: "Bir CBS uzmanının bilmesi gereken temel yazılımlar ve programlama dilleri nelerdir?",
      answer: "Piyasada iş bulma şansını artırmak için üç ana program/beceriye en az %70 oranında vakıf olunması tavsiye edilir: 1. ArcGIS (ESRI): Piyasada %80 oranında kullanılan ücretli bir yazılımdır. 2. QGIS: Açık kaynaklı (OpenSource) ve ücretsizdir. 3. Programlama Dilleri: Python veya Java bilgisi önemlidir. Python, GIS süreçlerini otomatikleştirmek için önemlidir. Ayrıca kurs içeriklerinde PostgreSQL ve Postgis (Mekansal Veritabanı) ve FME gibi konular da yer almaktadır."
    },
    {
      question: "Almanya'da CBS alanında kariyer yapmak için Almanca seviyesi ne kadar önemlidir?",
      answer: "Almanca seviyesi iş bulma konusunda çok önemlidir ve kapıyı %60 oranında açar. Minimum Şart: Weiterbildung ve Ausbildung gibi programlara katılmak için en az B2 dil seviyesi istenmektedir. Tavsiye Edilen Seviye: İyi bir Almanca ve piyasaya giriş için C1 seviyesi şiddetle tavsiye edilir. Tecrübeli uzmanlara yüksek maaş teklif edilmesinde iyi Almanca bilgisi büyük rol oynar."
    },
    {
      question: "Almanya'da CBS alanında hangi eğitim yolları mevcuttur ve süreleri nedir?",
      answer: "Almanya'da CBS alanında kariyer yapmak için üç ana yol mevcuttur: 1. Weiterbildung (İş Eğitimi): Genellikle 6-9 ay arası sürer. Hızlı bir kariyer geçişi için tercih edilir. 2. Umschulung (Meslek Değişikliği): 24 ay sürer. Paderborn'da Smallworld GIS gibi etkin yazılımları kullanan firmalar tarafından sunulan programlar mevcuttur. 3. Ausbildung (Mesleki Eğitim): Genellikle 3 yıl sürer. Bu alana en yakın Ausbildung dalı Geomatiker mesleğidir."
    },
    {
      question: "Almanya'da iş bulmada staj (Praktikum) ne kadar önemlidir?",
      answer: "Almanya'da pratik bilgi ve tecrübe edinmek amacıyla en az iki adet 3'er aylık praktikum yapmak çok önemlidir. İş görüşmelerinde ve özgeçmişte (Lebenslauf) bu stajlara bakılır."
    },
    {
      question: "Farklı GIS kursları (GIS und Geodatenspezialist, GIS Development, Webmapping) arasında ne gibi farklar vardır?",
      answer: "Kaynaklarda belirtilen farklı kurs türleri, içeriğe ve uzmanlık alanına göre değişir. Örneğin: GIS und Geodatenspezialist: Genel GIS ve coğrafi veri yönetimine odaklanan bir uzmanlık programıdır. GIS Development / GIS und Webmapping: GIS kavramları, araçları ve tekniklerinin yanı sıra, GIS süreçlerini otomatikleştirmek için programlama (Python) becerileri kazandırmaya ve Web tabanlı harita uygulamaları geliştirmeye odaklanır."
    },
    {
      question: "GIS kursu için Job Center'dan destek (Bildungsgutschein) almak mümkün müdür?",
      answer: "Evet, bazı GIS kursları için Job Center desteği (Bildungsgutschein) ile katılım mümkündür. Ancak Job Center, kursun pahalı olduğu gerekçesiyle veya iş garantisi isteyen bir yazı talep ederek zorluk çıkarabilir."
    },
    {
      question: "Almanya'da CBS uzmanları için iş piyasası durumu nasıldır?",
      answer: "Almanya piyasasında CBS uzmanlarına yönelik ciddi eleman açığı bulunmaktadır. B2 üstü Almanca bilen ve QGIS/ArcGIS'i belli bir seviyede kullanabilen kişilerin iş bulma şansının yüksek olduğu ifade edilmiştir."
    },
    {
      question: "CBS uzmanlarının başlangıç ve tecrübeli maaş beklentileri nelerdir?",
      answer: "Başlangıç Maaşı (Net): 1800 - 3500 Euro arasında değişebilir. Tavsiye Edilen Brüt Ücret: Minimum 2900 - 3000 Euro brüt ücret teklif eden firmalarla çalışılması önerilir. Tecrübeli Maaşı: 3-4 yıllık tecrübeye sahip bir uzmana 70 bin Euro brüt maaş teklif edilebildiği belirtilmiştir."
    },
    {
      question: "CBS uzmanı olarak evden çalışma (Home Office) imkanı ne kadar mümkündür?",
      answer: "Sektöre yeni giren ve hiç tecrübesi olmayan biri için direkt home office çalışmak çok zordur. Ancak bir iş yerinde en az 1 yıl tecrübe edinildikten sonra evden çalışma imkanı kolaylıkla mümkün olabilir."
    },
    {
      question: "CBS yazılımlarını sorunsuz kullanabilmek için bilgisayar gereksinimleri nelerdir?",
      answer: "GIS yazılımlarını sorunsuz kullanmak için önerilen sistem gereksinimleri şunlardır: İşlemci: 10. Nesil Intel Core i7, RAM: 16GB+ (Optimal: 32GB+), Depolama: 512GB SSD, Grafik Kartı: 4GB NVIDIA GeForce GTX 1650 veya daha iyisi. Genel tavsiye, minimum i5 işlemci, 8GB RAM, 4GB ekran kartı ve SSD sistemi ile çalışmaktır."
    },
    {
      question: "Açık kaynaklı ve ücretsiz GIS yazılımları mevcut mudur?",
      answer: "Evet, QGIS açık kaynaklı (OpenSource) ve ücretsizdir. Piyasada %80 oranında kullanılan ArcGIS ile tamamen aynı mantıkta olup, birçok aracı ortaktır."
    }
  ]
};
