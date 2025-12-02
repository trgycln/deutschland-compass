import { ProfessionData } from './types';

export const nurseData: ProfessionData = {
  title: "Hemşirelik",
  slug: "hemsire",
  description: "Almanya'da hemşirelik mesleği için denklik, vize, dil şartları ve kariyer rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Eğitim", value: "Denklik / Ausbildung", color: "bg-blue-500" },
    { label: "Sektör", value: "Sağlık", color: "bg-emerald-500" },
    { label: "Maaş", value: "€2.500 - €4.900", color: "bg-purple-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Hazırlık Süreci: Dil, Denklik ve Evrak Toplama",
      description: "Almanya'ya gelmeden önce atılması gereken temel adımlar.",
      details: [
        {
          title: "Dil Yeterliliği (Sprachkenntnisse)",
          content: "B2 seviyesinde Almanca şarttır. Denklik başvurusu için ön şart olmasa da çalışmak için zorunludur. Genel Almanca'nın yanı sıra mesleki Almanca (Pflegedeutsch) kursları terminoloji için önemlidir. Bazı Altenheim'lar B1 ile de başlatabilir."
        },
        {
          title: "Mesleki Denklik (Berufliche Anerkennung)",
          content: "Türkiye diplomasının tanınması zorunludur. Başvuru eyaletlerin yetkili kurumlarına (örn. Regierungspräsidium) yapılır. ZAB sadece akademik değerlendirme yapar, mesleki tanınma değildir. Türkiye eğitiminde genellikle 500-1000 saatlik teori/pratik açığı (Defizit) çıkar."
        },
        {
          title: "Gerekli Evraklar",
          content: "Diploma, Transkript (ders saatleri ve içerikleri detaylı olmalı), Çalışma Belgeleri (Dienstzeugnis - detaylı görev tanımı içeren), CV, Dil Sertifikası. Tüm belgeler yeminli tercüman tarafından çevrilmeli ve noter onaylı/apostilli olmalıdır."
        }
      ]
    },
    {
      step: 2,
      title: "Vize Süreci ve Almanya'ya Göç",
      description: "Çalışma vizesi, aile birleşimi ve iş arama süreçleri.",
      details: [
        {
          title: "Vize Türleri (81a)",
          content: "Genellikle 81a maddesi (Hızlandırılmış Kalifiye İşgücü) ile ön onay alınarak vizeye başvurulur. İş sözleşmesi, denklik belgeleri ve dil sertifikası gereklidir."
        },
        {
          title: "Aile Birleşimi",
          content: "81a vizesi ile gelenler eş ve çocuklarını getirebilir. Eşler için A1 Almanca istenir ancak yüksekokul mezunu eşlerde muafiyet olabilir. Maaş yeterli değilse bloke hesap gerekebilir."
        },
        {
          title: "İş Arayışı ve Destekler",
          content: "Hastaneler, huzurevleri veya aracı kurumlar üzerinden iş bulunabilir. NRW eyaletinde denklik alanlara 1.500 Euro 'Hoş Geldin Ödeneği' (Willkommensgeld) verilmektedir."
        }
      ]
    },
    {
      step: 3,
      title: "Almanya'ya Varış ve Mesleki Uyum",
      description: "Kısmi denkliğin tamamlanması ve sisteme entegrasyon.",
      details: [
        {
          title: "Kısmi Denklik (Teil Anerkennung) Tamamlama",
          content: "İki yol vardır: 1) Uyum Eğitimi (Anpassungslehrgang): 6-12 ay sürer, hem çalışıp hem eğitim alınır, en çok tavsiye edilen yoldur. 2) Bilgi Sınavı (Kenntnisprüfung): Eksikleri kendi tamamlayıp sınava girmektir, daha zordur."
        },
        {
          title: "Helfer Olarak Çalışma",
          content: "Denklik süreci tamamlanana kadar 'Pflegehelfer' olarak çalışılabilir. Bu süreçte bakım işleri (yemek, temizlik vb.) yapılır, tıbbi müdahaleler (ilaç, iğne) yapılmaz. Dili geliştirmek ve sistemi tanımak için fırsattır."
        }
      ]
    },
    {
      step: 4,
      title: "İş Hayatı ve Kariyer Gelişimi",
      description: "Çalışma alanları, uzmanlıklar ve kariyer fırsatları.",
      details: [
        {
          title: "Çalışma Ortamları",
          content: "Hastaneler (daha yoğun, tıbbi odaklı), Huzurevleri (daha rutin, bakım odaklı) veya Mobil Bakım servislerinde çalışılabilir. Almanya'da hemşirelik daha çok bakım (Pflege) odaklıdır, invaziv işlemler (damaryolu vb.) genellikle doktorlardadır."
        },
        {
          title: "Kariyer ve Uzmanlık",
          content: "Yoğun Bakım, Anestezi, Solunum Uzmanlığı (Beatmungspflege) gibi alanlarda uzmanlaşılabilir (Weiterbildung). Ayrıca lisans+master ile eğitmen (Praxisanleiter/Lehrer) olunabilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Mesleki Uygulama ve Etik",
    content: "Almanya'da hemşirelik, Türkiye'den farklı olarak 'bakım' (Pflege) ağırlıklıdır. Hastanın yıkanması, beslenmesi ve temel bakımı hemşirenin asli görevidir. İnvaziv işlemler (kan alma, damaryolu) daha sınırlıdır.",
    specialNeeds: "Demanslı hastalarla iletişim (özellikle Altenheim'da) sabır gerektirir. Hata yapmamak için anlamadığınızı tekrar sormaktan çekinmeyin ('50 kere sormak 1 hatadan iyidir').",
    resources: "Geleneksel tıp uygulamaları (Hacamat, Sülük vb.) sadece doktorlar veya Heilpraktiker'ler tarafından yapılabilir. Hemşirelerin bunları izinsiz yapması suçtur."
  },
  faq: [
    {
      question: "Almanya'da hemşire olarak çalışmak için gerekli minimum Almanca seviyesi nedir?",
      answer: "Tam denklik ve çalışma için minimum B2 seviyesinde Almanca (Deutsch) bilgisi zorunludur. Denklik başvurusu (Anerkennung) sırasında zorunlu ön şart olmasa da, çalışmaya başlayabilmek ve tam denklik belgesi olan Urkunde'yi alabilmek için bu belge istenir."
    },
    {
      question: "Genel Almanca (Allgemein) mı yoksa Mesleki Almanca (Pflegedeutsch) mı öğrenmeliyim?",
      answer: "Hem genel B2 Almanca (Allgemein B2) hem de B2 Mesleki Almanca (Pflegedeutsch) kursları mevcuttur. Mesleki kurslar, mesleki terminolojiyi öğrenme ve pratik jargonu geliştirme açısından faydalı olarak tavsiye edilmektedir."
    },
    {
      question: "Mesleki denklik başvurusu (Berufliche Anerkennung) nereye yapılır?",
      answer: "Sağlık personeli olarak doğrudan çalışabilmek için denklik zorunludur. Denklik başvurusu, eyaletlerin yetkili kurumları (örneğin Hessen'de Regierungspräsidium, NRW'de Münster) tarafından yapılır. Bonn'daki ZAB ise sadece diploma değerlendirmesi (Zeugnisbewertung) yapar, bu mesleği yapma tanınması (Anerkennung) değildir."
    },
    {
      question: "Denklik sürecini hızlandırmak için hangi belgeler önemlidir?",
      answer: "Belgelerin eksiksiz ve düzenli olması süreci hızlandırır. En kritik belgeler: Diploma/Transkriptler, Ders İçerikleri ve Saatleri (teori ve pratik saatlerini detaylı gösteren belgeler) ve Çalışma Belgeleri (Dienstzeugnis). Uzun yıllar (5-7 yıl ve üstü) çalışmış olmak denklik sonucunu olumlu etkileyebilir."
    },
    {
      question: "Almanya'ya hemşire olarak hangi vize türü ile gelinir?",
      answer: "Genellikle İkamet Kanunu'nun 81a maddesi uyarınca ön onay (Vorabzustimmung) belgesi ile çalışma vizesine (Visum) başvurulur. Çalışma vizesiyle (81a) gelen kişi, ailesini (eş ve çocuklar) de getirebilir."
    },
    {
      question: "Kısmi denklik (Teil Anerkennung) çıktığında eksik saatler nasıl tamamlanır?",
      answer: "İki ana yol önerilir: 1. Uyum Eğitimi (Anpassungslehrgang): 6-12 ay sürer, hem çalışıp hem eğitim alınır. 2. Mesleki Yeterlilik Sınavı (Kenntnisprüfung): Yazılı, sözlü ve uygulamalı sınavdır. Uyum eğitimi, sistemi öğrenmek için daha çok tavsiye edilir."
    },
    {
      question: "Hemşirelerin çalışma ortamları nerelerdir ve maaşlar nasıldır?",
      answer: "Hastaneler (Krankenhaus), Yaşlı Bakım Evleri (Altenheim) ve Mobil Bakım Hizmetleri (Mobildienst) başlıca çalışma alanlarıdır. Tam denklik alan hemşirelerin brüt maaşları minimum 3000 Euro civarında olabilir. Solunum Uzmanlığı gibi alanlarda maaşlar 4.900 €'ya kadar çıkabilir."
    },
    {
      question: "Almanya'daki hemşirelik uygulamaları Türkiye'den farklı mıdır?",
      answer: "Evet. Almanya'da hemşirelik, Türkiye'deki gibi invaziv girişimlere odaklanmak yerine, daha çok bakım (Vollkörperpflege, ilaçların düzenlenmesi vb.) odaklıdır. Damaryolu açma gibi invaziv girişimler çoğunlukla doktorlar tarafından yapılır."
    },
    {
      question: "Sağlık memurluğu diploması hemşirelik denkliği alabilir mi?",
      answer: "Evet. Sağlık memurları, detaylı transkript ve tecrübe belgeleriyle hemşire (Krankenpfleger) statüsünde denklik alabilir. Belgelerde ünvanı 'hemşire' olarak yazdırmak önerilir."
    },
    {
      question: "Türkiye'de alınan hacamat, sülük, akupunktur gibi sertifikalar Almanya'da geçerli midir?",
      answer: "Hayır, bu uygulamaları Almanya'da sadece doktorlar ve Heilpraktiker eğitimi almış kişiler yapabilir. Hemşirelerin bu uygulamaları yapmasına müsaade edilmez ve izinsiz yapanlar yasal süreçlerle karşılaşabilir."
    },
    {
      question: "Hoş Geldin Ödeneği (Willkommensgeld) nedir?",
      answer: "Kuzey Ren-Vestfalya (NRW) eyaletinde denklik belgesi almış AB dışı üçüncü ülke vatandaşlarına, uyum sürecini kolaylaştırmak amacıyla 1.500 Euro tutarında Hoş Geldin Ödeneği sunulmaktadır."
    },
    {
      question: "Denklik ücretini kim karşılar?",
      answer: "Job Center'a bağlı iseniz, genellikle denklik başvurusunu yapacağınız bir diplomanın tanıtma ücretini karşılar."
    }
  ]
};
