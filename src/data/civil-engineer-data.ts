import { ProfessionData } from './types';

export const civilEngineerData: ProfessionData = {
  title: "İnşaat Mühendisliği",
  slug: "insaat-muhendisligi",
  description: "Almanya'da inşaat mühendisliği kariyeri için denklik, dil şartları, iş arama ve çalışma kültürü rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-red-500" },
    { label: "Eğitim", value: "Lisans + Denklik", color: "bg-blue-500" },
    { label: "Sektör", value: "İnşaat", color: "bg-orange-500" },
    { label: "Maaş", value: "€3.500 - €6.000", color: "bg-purple-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Hazırlık ve Dil Yeterliliği",
      description: "Almanya'ya göç öncesi dil hazırlığı ve yasal zemin.",
      details: [
        {
          title: "Dil Şartı (Sprachkenntnisse)",
          content: "Resmi kaynaklarda (örn. Niedersachsen Ingenieurkammer) bazen dil şartı belirtilmese de, iş bulmak için B2 sertifikası şarttır. C1 seviyesi tercih sebebidir. Mavi Kart için maaş sınırı (45.000€ civarı) veya Fırsat Kartı ile gelip dil kursuna devam etme seçenekleri mevcuttur."
        },
        {
          title: "Diploma Denkliği (Anerkennung)",
          content: "İki tür denklik vardır: 1. ZAB (Diploma Denkliği): Sadece mezuniyeti onaylar, resmi işlerde yetersiz kalabilir. 2. Ingenieurkammer (Mesleki Tanınma): 'Ingenieur' unvanını kullanmak için gereklidir. Başvuru için diploma, transkript, CV ve dil belgesi gibi evrakların 'aslı gibidir' onaylı kopyaları gerekir."
        },
        {
          title: "Maliyet ve Destek",
          content: "Denklik ücreti (Ingenieurkammer) yaklaşık 300 Euro'dur. Jobcenter bu ücreti karşılayabilir. IQ Netzwerk ücretsiz danışmanlık sunar."
        }
      ]
    },
    {
      step: 2,
      title: "İş Arama ve Başvuru Süreci",
      description: "CV hazırlama, iş arama platformları ve staj.",
      details: [
        {
          title: "Kapsamlı CV (Lebenslauf)",
          content: "Alman formatında CV, Niyet Mektubu (Anschreiben) ve belgelerle birlikte 13 sayfayı bulabilen detaylı bir dosyadır. Jobcenter, CV hazırlama (Job Coaching) desteği sunar."
        },
        {
          title: "Staj ve Gönüllü Çalışma",
          content: "Tecrübesiz adaylar için 3-6 aylık staj (Praktikum) veya gönüllü çalışma, hem mesleki Almanca'yı geliştirmek hem de referans edinmek için kritik öneme sahiptir."
        },
        {
          title: "İş Arama Kanalları",
          content: "Jobbörse, Xing, Stepstone ve Indeed yaygın platformlardır. İngilizce ile uluslararası firmalarda şans olsa da, yerel firmalar için Almanca şarttır."
        }
      ]
    },
    {
      step: 3,
      title: "Mesleki Eğitim ve İhtisaslaşma",
      description: "Yazılımlar, sertifikalar ve Weiterbildung.",
      details: [
        {
          title: "Gerekli Yazılımlar",
          content: "Proje ofisleri için Allplan, AutoCAD; Statik için Dlubal, Tekla, Scia, Frilo; İhale/Metraj için RIB-iTWO, Auer yaygındır. Bir alanda uzmanlaşmak önemlidir."
        },
        {
          title: "Sertifika Programları",
          content: "Bauleiter (Şantiye Şefliği), Proje Yönetimi, İnşaat Hukuku (Baurecht), VOB ve HOAI eğitimleri iş bulmayı kolaylaştırır. Kaynak Mühendisliği (SFI) sertifikası (yaklaşık 10.000€) köprü/çelik işlerinde büyük avantaj sağlar ve Jobcenter tarafından karşılanabilir."
        },
        {
          title: "Yüksek Lisans (Master)",
          content: "Türkiye'den gelen genç mühendisler için Almanya'da Master yapmak, kariyere girişte önemli bir kapı açıcıdır."
        }
      ]
    },
    {
      step: 4,
      title: "Çalışma Hayatı ve Yetkiler",
      description: "Saha, ofis, imza yetkisi ve girişimcilik.",
      details: [
        {
          title: "Çalışma Alanları",
          content: "Bauleiter (Saha Şefi) stresli olabilir. Kalkulator (Teknik Ofis) metraj/hakediş yapar. Statiker (Statikçi) hesap yapar, çizimi teknikerler yapar. Bauüberwacher (Yapı Denetimi) kontrol sağlar."
        },
        {
          title: "İmza Yetkisi",
          content: "Denklik ile 'Bauingenieur' unvanı alınır ancak statik projelere imza atmak için eyalete göre 4-5 yıl tecrübe ve ek yeterlilik (Qualifikation) gerekebilir."
        },
        {
          title: "Girişimcilik (Selbständigkeit)",
          content: "Mühendisler 'Freiberuflich' (Serbest Meslek) olarak şirket kurmadan fatura kesebilir. Jobcenter ofis kurulumu için 5000€'ya kadar hibe desteği verebilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Çalışma Kültürü ve Teknik Normlar",
    content: "Almanya'da inşaat sektörü, Türkiye'ye göre çok daha planlı ve kuralcıdır. Şantiyelerde uygulama projeleri en ince detaya kadar hazırdır, ustanın yorumuna yer bırakılmaz. 'Eşit işe eşit ücret' yoktur, maaş pazarlığa ve tecrübeye bağlıdır.",
    specialNeeds: "Saha mühendisliği (Bauleiter) stresli olabilir. Ofis ortamında ise yazılım hakimiyeti ve Alman normlarına (DIN, VOB) uyum beklenir. 'Göç yolda düzelir' mantığıyla, işe başladıktan sonra dil ve kültür adaptasyonu hızlanır.",
    resources: "HOAI (Ücret Yönetmeliği), VOB (İhale Yönetmeliği) ve DIN 1076 (Köprü Denetimi) gibi normlara hakim olunmalıdır. Teknik terimler için 'Deutsch für Architekten und Bauingenieure' gibi kaynaklar kullanılabilir."
  },
  faq: [
    {
      question: "Almanya'da İnşaat Mühendisi olarak çalışmak için gerekli olan asgari Almanca seviyesi nedir?",
      answer: "İş bulmanın ön şartı iyi derecede Almancadır (en az B2). C1 seviyesi tavsiye edilir. Ingenieurkammer gibi kurumlar denklik için her zaman dil şartı koşmasa da, yapı mevzuatını anlamak ve yerel firmalarda çalışmak için Almanca şarttır. Sadece İngilizce ile iş bulmak (uluslararası firmalar hariç) zordur."
    },
    {
      question: "Türkiye'de iken iş başvurusu yapmalı mıyım, yoksa Almanya'ya geldikten sonra mı aramalıyım?",
      answer: "Türkiye'den uzaktan iş bulmak, özellikle tecrübesizler için zordur. Ancak B2 seviyesini tamamladıysanız ve tecrübeniz varsa başvurmalısınız. Almanya'ya geldikten sonra Jobcenter destekli Job Coaching ile CV hazırlamak ve yerinde başvurmak süreci hızlandırabilir."
    },
    {
      question: "İş başvurusu yaparken CV (Lebenslauf) nasıl hazırlanmalı?",
      answer: "Alman formatında CV; Niyet Mektubu (Anschreiben), Lebenslauf, diploma ve denklik belgelerini içeren yaklaşık 13 sayfalık kapsamlı bir dosyadır. Tek sayfalık özet CV'ler yerine bu detaylı format tercih edilmelidir."
    },
    {
      question: "Yeni mezun veya tecrübesi olmayanlar işe nasıl başlamalı?",
      answer: "3-6 aylık staj (Praktikum) en mantıklı başlangıçtır. Bu süreçte hem mesleki Almanca gelişir hem de referans mektubu (Arbeitszeugnis) alınır. Bu referanslar iş bulmada kritiktir."
    },
    {
      question: "Almanya'daki İnşaat Mühendisleri için kaç çeşit denklik türü vardır?",
      answer: "İki ana tür vardır: 1. ZAB (Diploma Denkliği): Sadece mezuniyeti onaylar, resmi işlerde yetersiz kalabilir. 2. Ingenieurkammer (Mesleki Tanınma): 'Ingenieur' unvanını yasal olarak kullanmak için gereklidir ve asıl önemli olan budur."
    },
    {
      question: "Denklik belgesi aldıktan sonra projelerde imza yetkisine sahip olunur mu?",
      answer: "Hayır, denklik sadece unvanı kullanma hakkı verir. Statik projelere imza atmak için genellikle 4-5 yıl tecrübe ve eyalet odalarından ek yeterlilik (Qualifikation) belgesi gerekir. Şantiye şefliği (Bauleiter) için ise denklik yeterlidir."
    },
    {
      question: "İnşaat Mühendisleri hangi uzmanlık alanlarına yönelmelidir?",
      answer: "Bauleiter (Şantiye Şefliği), Kalkulator (Teknik Ofis/Hakediş), Bauwerksprüfer (Yapı Denetimi/Köprü Kontrolü) ve Statiker (Statik Hesap) popüler alanlardır. 'Her işi yaparım' mantığı yerine bir alanda uzmanlaşmak (örn. Köprü Denetimi) daha değerlidir."
    },
    {
      question: "İş bulmayı kolaylaştıracak hangi mesleki eğitimler (Weiterbildung) mevcuttur?",
      answer: "VOB, HOAI ve Baurecht (İnşaat Hukuku) eğitimleri, Allplan/QGIS yazılım kursları ve özellikle Kaynak Mühendisliği (SFI) sertifikası (Jobcenter karşılayabilir) büyük avantaj sağlar."
    },
    {
      question: "Almanya'daki Bauleiter (Saha Mühendisliği) işleri Türkiye'dekine göre daha az stresli midir?",
      answer: "Almanya'da mobbing azdır ve haklar korunur, ancak şantiyecilik yine de stresli ve yoğun iletişim gerektiren bir iştir. Alman firmalarında mesai saatlerine dikkat edilirken, bazı göçmen kökenli firmalarda yoğun mesailer görülebilir."
    },
    {
      question: "Kendi inşaat firmamı kurmak mümkün müdür?",
      answer: "Evet, mühendisler 'Freiberuflich' (Serbest Meslek) olarak çalışabilir. Jobcenter, iş kurma sürecinde ofis malzemeleri için 5000 Euro'ya kadar hibe desteği sağlayabilir."
    },
    {
      question: "Hangi temel norm ve yönetmeliklere hakim olmak gerekir?",
      answer: "HOAI (Ücret Yönetmeliği), VOB (İhale ve Sözleşme Yönetmeliği) ve DIN 1076 (Köprü Denetimi) en temel yönetmeliklerdir."
    },
    {
      question: "XM3 gibi beton sınıfları ne anlama gelir?",
      answer: "Betonun maruz kalacağı çevresel etkileri (Mekanik Aşınma) belirtir. XM3, ağır yük trafiğine maruz kalan zeminler içindir ve genellikle C40/C50 dayanım sınıfına karşılık gelir."
    }
  ]
};
