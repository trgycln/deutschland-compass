import { ProfessionData } from './types';

export const itData: ProfessionData = {
  title: "Bilişim (IT) Sektörü",
  slug: "bilisim-it",
  description: "Almanya'da yazılım, siber güvenlik ve veri bilimi alanlarında kariyer, eğitim ve iş bulma rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Maaş (Ort.)", value: "€67.000", color: "bg-purple-500" },
    { label: "Sektör", value: "Teknoloji", color: "bg-blue-500" },
    { label: "Dil", value: "İngilizce / Almanca", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Sektöre Giriş ve Alan Seçimi",
      description: "Kariyer yolunu belirleme ve dil gereklilikleri.",
      details: [
        {
          title: "Alan Seçimi",
          content: "IT sektörü geniştir (Developer, Tester, Data Scientist vb.). En çok aranan roller Full Stack, Backend ve Frontend geliştiricilerdir. Siber Güvenlik ve Veri Analitiği yüksek maaş potansiyeline sahiptir."
        },
        {
          title: "Dil Yeterliliği",
          content: "Uluslararası firmalarda İngilizce yeterli olabilir ancak Almanya genelinde kariyer için Almanca (C1 seviyesi ideal) çok önemlidir. Dil seviyesi, mülakat başarısını doğrudan etkiler."
        }
      ]
    },
    {
      step: 2,
      title: "Eğitim ve Nitelik Kazanma",
      description: "Ausbildung, Umschulung ve Bootcamp seçenekleri.",
      details: [
        {
          title: "Ausbildung ve Umschulung",
          content: "IHK onaylı resmi mesleki eğitimlerdir. 'Fachinformatiker' unvanı kazandırır. Umschulung 2 yıl sürer ve Agentur für Arbeit tarafından finanse edilebilir (yaklaşık 30.000€ değerinde)."
        },
        {
          title: "Bootcamp ve Kurslar (Weiterbildung)",
          content: "8-12 aylık yoğun eğitimlerdir (Clarusway, TechPro vb.). Jobcenter 'Bildungsgutschein' ile %100 finanse edebilir. AWS, DevOps, Cyber Security gibi alanlarda sertifikasyon (ISTQB, CompTIA) önemlidir."
        },
        {
          title: "Akademik Yollar",
          content: "Üniversite mezunları için ZAB denkliği (Gleichwertigkeit) gereklidir. Yazılımın karşılığı genellikle 'Informatik'tir."
        }
      ]
    },
    {
      step: 3,
      title: "İş Arama ve Başvuru",
      description: "CV hazırlama, portfolyo ve mülakat süreçleri.",
      details: [
        {
          title: "Başvuru Dosyası (Bewerbung)",
          content: "Alman işverenler pratik deneyime önem verir. Güçlü bir portfolyo ve GitHub profili kritiktir. CV, Niyet Mektubu ve sertifikalar düzenli bir dosya halinde sunulmalıdır."
        },
        {
          title: "İş Arama Kanalları",
          content: "StepStone, LinkedIn, Indeed ve Arbeitsagentur Jobsuche kullanılabilir. Kurs bitmeden iş aramaya başlamak tavsiye edilir."
        }
      ]
    },
    {
      step: 4,
      title: "Çalışma Hayatı ve Maaşlar",
      description: "Maaş beklentileri, uzaktan çalışma ve kamu sektörü.",
      details: [
        {
          title: "Maaşlar",
          content: "Yeni başlayanlar (0-2 yıl) ortalama 49.300€, 10+ yıl tecrübeliler 72.900€ kazanır. En yüksek maaşlar Baden-Württemberg ve Bavyera'dadır."
        },
        {
          title: "Çalışma Ortamı",
          content: "Uzaktan (Remote) ve hibrit çalışma yaygındır. Kamu sektöründe (Öffentlicher Sektor) maaşlar özel sektöre göre düşük olsa da iş güvencesi (Memuriyet/Beamte) yüksektir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sektör Kültürü ve İpuçları",
    content: "Almanya'da IT sektörü teknik beceri kadar disiplin ve dokümantasyona da önem verir. 'Junior' pozisyonlarda bile belirli bir otonomi beklenir. Hata yapmaktan korkmak yerine, hatayı raporlamak ve çözüm üretmek değerlidir.\n\nMetafor: Almanya'da IT kariyeri inşa etmek, hızlı bir 'Bootcamp' ile yapılan bir kulübe yerine, sağlam temeller (Umschulung/Ausbildung) üzerine inşa edilen veya titizlikle seçilmiş kaliteli malzemelerle (sertifikalar ve pratik projeler) desteklenen çok katlı bir gökdelene benzer. Çatıya çıkmak (yüksek maaşlı iş) için sadece hıza değil, yapının Alman piyasasına uygunluğuna ve sağlamlığına ihtiyacınız vardır.",
    specialNeeds: "Siber güvenlik gibi alanlarda teknik bilgiden çok, ekip uyumu ve stres yönetimi önemlidir. Kamu sektöründe çalışmak isteyenler için diploma denkliği ve Almanca şarttır.",
    resources: "Telegram grupları (bilgi paylaşımı için), Bund.de (kamu iş ilanları) ve Udemy/Coursera (ek sertifikalar) önemli kaynaklardır. Vergi iadesi (Steuererklärung) ile ev ofis masrafları geri alınabilir."
  },
  faq: [
    {
      question: "Almanya IT sektöründe en çok talep gören pozisyonlar ve uzmanlık alanları nelerdir?",
      answer: "Almanya teknoloji piyasasında geliştirici (Developer) pozisyonları yoğun talep görmektedir. En çok aranan roller sırasıyla Full Stack Developer, Backend Developer ve Frontend Developer olarak öne çıkmaktadır.\n\nAncak, yüksek düzeyde uzmanlaşmış ve yüksek maaş potansiyeli olan diğer alanlar da mevcuttur:\n• Data & Advanced Analytics (Data Scientist, Data Engineer).\n• ERP (Kurumsal Kaynak Planlaması), özellikle SAP Consultant/Berater pozisyonları.\n• Siber Güvenlik (Cyber Security)."
    },
    {
      question: "IT alanları arasında nasıl bir seçim yapmalıyım? Geliştiricilik mi yoksa Siber Güvenlik mi daha avantajlı?",
      answer: "IT alanı çok geniş bir yelpazeye sahiptir; bu nedenle kendi eğilimlerinizi (developer, tester, data scientist, system verification vb.) göz önünde bulundurarak karar vermeniz önerilir.\n\n• Siber Güvenlik (Cyber Security): IT geçmişi olmayan ancak ilgili olan ve İngilizcesi iyi olan biri, Siber Güvenlik alanında kısa sürede piyasada çalışmaya hazır hale gelebilir. Öğrenme eğrisi, yazılım geliştiriciliğe göre daha yataydır. Ancak bazı uzmanlar, bu alanda uzmanlaşmanın (özellikle İngilizce ve IT geçmişi olmayanlar için) zor olduğunu ve sertifika almanın zaman aldığını belirtmektedir.\n• Yazılım Geliştiriciliği (Software Development): Yazılım geliştiriciliğin öğrenme eğrisi daha dik olabilir; giriş seviyesinde bile birçok bilgiye sahip olmak gerekebilir."
    },
    {
      question: "Siber Güvenlik alanında hangi sertifikalar önemlidir?",
      answer: "Siber Güvenlik (Cyber Security) alanında uluslararası geçerliliği olan sertifikalar kariyer için kritiktir.\n• CompTIA Security+: Piyasada iş bulmak için geçerli kabul edilen yaygın bir sertifikadır. Birçok kurs, bu sertifikaya hazırlık sunar ve hatta bazıları sınav kuponunu (exam voucher) ücretsiz sağlar.\n• BSI IT-Grundschutz-Praktiker: Almanya Federal Bilgi Güvenliği Ofisi (BSI) tarafından akredite edilmiş önemli bir Alman sertifikasıdır. IHK (Sanayi ve Ticaret Odası) bu sertifikayı Fachinformatik System Integrasyon'un bir üst basamağı olarak görmektedir.\n• Ayrıca Certified Ethical Hacker (CEH) ve CompTIA PenTest+ gibi sertifikalar da bu alanda önem taşır."
    },
    {
      question: "Almanya'da IT alanında temel eğitim yolları (Ausbildung/Umschulung) ile kısa süreli kursların (Bootcamp/Weiterbildung) farkı nedir?",
      answer: "• Ausbildung/Umschulung (Mesleki Eğitim/Değiştirme): Genellikle 2 veya 3 yıl sürer ve zorunlu staj (Praktikum) içerir. Bu yollar, IHK (Sanayi ve Ticaret Odası) sınavına girme hakkı verir. Umschulung, Alman sisteminde daha kalıcı ve sağlam temeller attığı düşünülerek, işe girme oranlarının daha yüksek olabileceği belirtilmektedir. Bu programlar için Almanca dil seviyesinin yüksek olması gerekir.\n• Weiterbildung/Bootcamp (İleri Eğitim/Yoğun Kurs): Genellikle 6 ila 12 ay süren yoğun programlardır. Amaç, kısa sürede sektöre özgü pratik bilgi ve beceri kazandırmaktır. Bootcamp'ler, CV hazırlama, mülakat simülasyonu ve kariyer desteği gibi hizmetler sunar."
    },
    {
      question: "Jobcenter veya Agentur für Arbeit (İş Kurumu) IT kurslarını ücretsiz finanse eder mi?",
      answer: "Evet, Jobcenter veya Agentur für Arbeit (İş Kurumu) tarafından verilen Bildungsgutschein (Eğitim Çeki) ile IT kurslarına genellikle %100 ücretsiz katılım sağlanabilir. Bu destek, işsiz olanlar, işini kaybetme riski taşıyanlar veya iş gücü piyasasına entegre olmak isteyen göçmenler için uygundur."
    },
    {
      question: "Jobcenter'dan Bildungsgutschein alırken zorluk yaşanır mı?",
      answer: "Evet, bazı katılımcılar zorluk yaşayabilmektedir.\n1. Maliyet Sorunu: Danışmanlar (Memurlar), özellikle 15.000 Euro üzerindeki bootcamp ücretlerini 'ekonomik olarak mümkün değil' diyerek pahalı bulabilir.\n2. Nitelik Sorunu: Siber Güvenlik gibi alanlar için Studium (Üniversite) veya Ausbildung şart olduğunu söyleyip, kursları sadece ek bir yeterlilik (Zusatzqualifikation) olarak değerlendirip Gutschein vermeyi reddedebilir.\n\nBu durumda, danışmanla görüşmeye gitmeden önce Udemy veya Coursera gibi platformlardan IT alanına olan ilginizi gösteren sertifikalar almanız ve bunları sunmanız tavsiye edilir."
    },
    {
      question: "IT alanında eğitim dili olarak Almanca mı yoksa İngilizce mi tercih edilmeli?",
      answer: "Bu tercihin avantaj ve dezavantajları vardır.\n• Almanca: Kariyerin ilerleyen aşamaları, özellikle danışmanlık (Berater) rolleri, kamu sektörü ve Jobcenter'dan Umschulung almak için çok iyi Almanca (B2 veya C1) şarttır. Çalıştığınız ülkenin diline hakim olmak, iş arama ve iş bulduktan sonraki altı aylık deneme sürecinde (Probezeit) şirketler tarafından ciddiyetle takip edilir.\n• İngilizce: IT sektöründe İngilizce vazgeçilmezdir. Birçok IT kursu Türkçe veya İngilizce seçenekleriyle sunulmaktadır. Uluslararası şirketlerde ve özellikle yazılım geliştirme gibi alanlarda İngilizce kabul görebilir."
    },
    {
      question: "Eğitim aldığım kurumun basılı sertifikası önemli midir?",
      answer: "Bazı katılımcılar, dijital sertifikalar haricinde, Alman kurumsal kültüründeki bürokrasi takıntısı nedeniyle, gelecekte bir sorun yaşamamak için firma yetkililerinin açık ismi, mühürlü ve ıslak imzalı bir kurumsal belge (sertifika) almayı önermektedir."
    },
    {
      question: "Almanya'da IT alanına yeni giren (Junior) biri ne kadar maaş beklemelidir?",
      answer: "IT sektöründe deneyimsiz uzmanlar (Berufsanfänger) (2 yıldan az tecrübe), ortalama yıllık brüt 49.300 Euro ile işe başlarlar. 6-8 aylık kurstan sonra işe başlayan arkadaşlar için de başlangıç maaşları yıllık brüt 45.000 Euro ve üzeri olabilir. Genel olarak IT profesyonellerinin ortalama yıllık brüt maaşı ise 67.200 Euro'dur."
    },
    {
      question: "IT alanında iş bulma süresi ne kadar sürer ve güncel zorluklar nelerdir?",
      answer: "Son bir yıldır piyasa doygunluğa ulaştığı için işe girmekte ciddi güçlükler yaşanmaktadır. Firmaların teknik beceri ve iş tecrübesi (Berufserfahrung) beklentileri yükselmiştir.\n• Süreç: Kurs bitiminden sonra 6-8 ay iş arama sürecine kendinizi hazırlamanız gerekebilir. Bazı tecrübeler, işe giren arkadaşların 300-400 civarı başvuru yapmak zorunda kaldığını göstermektedir.\n• İş Bulma Oranları: Kurs firmalarının ilan ettiği %80-90 gibi işe yerleştirme oranlarının çoğu zaman doğru olmadığı, gerçekte işe yerleşme oranının %20-25 civarında olduğu, bu kişilerin de kursa Umschulung yapıyormuşçasına emek verenler olduğu belirtilmiştir."
    },
    {
      question: "Deneme süresi (Probezeit) boyunca işten çıkarılma riski var mıdır?",
      answer: "Evet, deneme sürecinde (Probezeit) işten çıkarılmalar yaşanmaktadır, özellikle dil ve teknik yetersizlik nedenlerinden dolayı. Umschulung ile IHK sertifikası almamış olmanın da bu süreçte firmaların kolayca fesih (Kündigung) vermesine neden olabileceği belirtilmiştir. Siber Güvenlik/Information Security alanında işe başlayan 350'den fazla kişinin tecrübesinde, 14 kişinin deneme sürecinde ayrıldığı, ancak 10'unun farklı şirketlerde tekrar çalışmaya başladığı görülmüştür."
    },
    {
      question: "Kamu sektöründe (Öffentlicher Sektor) IT kariyeri mümkün müdür?",
      answer: "Evet, kamu kurumları (Landesamt für Geoinformation und Landentwicklung gibi), IT Sistem Yöneticisi (IT-System-Administration Linux) veya Yazılım Geliştirme (Software-Entwicklung) pozisyonları için personel aramaktadır.\n• Şartlar: Genellikle Informatik, Wirtschaftsinformatik veya ilgili bir alanda Diplom (FH) veya Bachelor of Science düzeyinde üniversite diploması istenir. Yabancı mezuniyetler için ZAB (Zentralstelle für ausländisches Bildungswesen) kurumundan denklik belgesi (Gleichwertigkeit) istenmektedir.\n• Maaş: Kamu sektörü, özel sektöre göre daha düşük ortalama maaş öder (Ortalama 62.500 Euro iken, sanayi ortalaması 71.900 Euro'dur)."
    },
    {
      question: "Almancam kötü ise iş piyasasına girmeden önce ne yapmalıyım?",
      answer: "B1 Almanca seviyesiyle iş piyasasına girmemeniz, çok iyi bir B2 veya C1 seviyesi yapmanız tavsiye edilir. Dil bir engel (barrier) olmaktan çıkarılmalıdır. Dil çalışırken aynı zamanda basit IT kurslarını (HTML, CSS vb.) Udemy gibi platformlarda bitirmeniz önerilir."
    },
    {
      question: "Kariyerime başlamadan önce ne tür ön hazırlıklar yapabilirim?",
      answer: "• Sertifika Alın: Jobcenter veya Agentur für Arbeit ile görüşmeye gitmeden önce bile Udemy, Coursera veya Google/IBM gibi platformlardan ücretsiz IT kursları alıp sertifikalarını sunmanız, ilginizi göstermeniz açısından faydalı olur.\n• Portfolyo: Erken planlama yaparak güçlü bir portfolyo oluşturmak ve gerçek projeler üzerinde çalışmak kritiktir.\n• Uygulama: En güzel öğrenme şeklinin yaparak öğrenmek olduğunu unutmayın; irili ufaklı projeler yapmak yetkinliğinizi artırır.\n• İş Başvurusu Hazırlığı: Profesyonel bir özgeçmiş (Lebenslauf) ve motivasyon mektubu (Anschreiben) hazırlamak, kariyer merkezlerinden destek almak önemlidir."
    },
    {
      question: "IT kursu seçerken nelere dikkat etmeliyim?",
      answer: "• Sertifikalar: İlanlarda istenen uluslararası geçerliliğe sahip sertifikaları sağlayan kursları tercih edin.\n• Deneyim: Kursun sunduğu CV hazırlama, mülakat simülasyonları (Mock Interview) ve staj olanakları kritik öneme sahiptir.\n• Eğitim Kalitesi: Bazı katılımcılar, kurs içeriklerinin güncel olmayabileceği, eğitmenlerin yeterli donanıma sahip olmayabileceği ve sözleşmede vaatlerin yer almayabileceği konusunda uyarıda bulunmuştur. Sağlam temellerle, yani kökler ve gövde önemsenerek eğitim veren kursları seçmek, piyasada tutunmak için önemlidir."
    }
  ],
  specializations: [
    {
      title: "Software Developer",
      description: "Yazılım geliştirme (Frontend, Backend, Full Stack). En çok talep gören alandır.",
      skills: ["Java", "Python", "JavaScript/TypeScript", "React/Angular", "SQL"],
      salary: "€50.000 - €80.000",
      demand: "Çok Yüksek",
      link: "/meslekler/yazilim-gelistirici"
    },
    {
      title: "Cyber Security",
      description: "Sistemleri ve verileri siber tehditlere karşı koruma. Yüksek uzmanlık gerektirir.",
      skills: ["Network Security", "Penetration Testing", "CISSP", "CompTIA Security+", "Linux"],
      salary: "€60.000 - €90.000",
      demand: "Yüksek",
      link: "/meslekler/siber-guvenlik"
    },
    {
      title: "Data Scientist / Analyst",
      description: "Veri analizi, makine öğrenmesi ve iş zekası çözümleri.",
      skills: ["Python/R", "SQL", "Machine Learning", "Tableau/PowerBI", "Big Data"],
      salary: "€55.000 - €85.000",
      demand: "Yüksek",
      link: "/meslekler/veri-bilimi"
    },
    {
      title: "Cloud & DevOps Engineer",
      description: "Bulut mimarisi (AWS/Azure), CI/CD süreçleri ve altyapı otomasyonu.",
      skills: ["AWS/Azure", "Kubernetes", "Terraform", "Docker", "Jenkins"],
      salary: "€60.000 - €85.000",
      demand: "Çok Yüksek",
      link: "/meslekler/cloud-devops"
    },
    {
      title: "IT Hardware & System Support",
      description: "Donanım bakımı, sistem kurulumu ve teknik destek süreçleri.",
      skills: ["Donanım Tamiri", "Windows/Linux OS", "Network", "Troubleshooting", "Yazıcı Sistemleri"],
      salary: "€35.000 - €55.000",
      demand: "Normal",
      link: "/meslekler/it-donanim"
    },
    {
      title: "Software Tester (QA)",
      description: "Yazılım kalite kontrolü ve test otomasyonu.",
      skills: ["Selenium", "Java/Python", "ISTQB", "Jira", "Test Automation"],
      salary: "€40.000 - €65.000",
      demand: "Orta-Yüksek",
      link: "/meslekler/yazilim-test-uzmanligi"
    },
    {
      title: "SAP Consultant",
      description: "Kurumsal kaynak planlama (ERP) sistemleri danışmanlığı.",
      skills: ["SAP Modülleri (FI/CO, MM, SD)", "ABAP", "İş Süreçleri", "Almanca (Zorunlu)"],
      salary: "€60.000 - €90.000",
      demand: "Yüksek",
      link: "/meslekler/sap-uzmanligi"
    }
  ]
};
