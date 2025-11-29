
export type Section = {
  id: string;
  title: string;
  icon: string;
  content: string; // Markdown or HTML string
  subsections?: { title: string; content: string }[];
};

export type Faq = {
  question: string;
  answer: string;
};

export const mathTeacherData = {
  title: "Matematik Öğretmenliği",
  slug: "matematik-ogretmenligi",
  description: "Almanya'da matematik öğretmeni olmak isteyenler için kapsamlı kariyer ve adaptasyon rehberi.",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID", // Lütfen YouTube video linkini buraya yapıştırın veya bana gönderin
  stats: [
    { label: "İhtiyaç", value: "Yüksek", color: "bg-green-500" },
    { label: "Ortalama Süre", value: "1-3 Yıl", color: "bg-blue-500" },
    { label: "Dil Şartı", value: "B1 - C1", color: "bg-orange-500" },
  ],
  roadmap: [
    {
      step: 1,
      title: "Diploma Denkliği (Anerkennung)",
      description: "Almanya'da öğretmenlik reglementiert (düzenlenmiş) bir meslektir. İlk adım diplomanızı tanıtmaktır.",
      details: [
        {
          title: "Akademik Tanınma (ZAB)",
          content: "ZAB, Lisans, Yüksek Lisans ve Doktora dahil tüm akademik kariyeri değerlendirir. Amaç üniversite mezuniyetinin akademik düzeyini onaylamaktır. Ücretli bir işlemdir (~200€) ancak Jobcenter karşılayabilir. Diploma ve transkriptlerin Almanca tercümesi ve onayı (Beglaubigung) gereklidir.",
        },
        {
          title: "Mesleki Tanınma (Lehrkräftakademie)",
          content: "Eyalet bazlıdır (Örn: NRW için Detmold, Hessen için Gissen). Mesleği icra etme şartlarını belirler. Mülteciler için genellikle ücretsizdir. Sonuç raporunda hangi okul türünde çalışılabileceği ve eksik krediler (Hausarbeit, İkinci Branş vb.) belirtilir.",
        },
        {
          title: "Özel Durumlar & İkinci Branş",
          content: "İlköğretim Mat. mezunları bazen 'Grundschulbildung' olarak değerlendirilse de Sekundarstufe 1 (5-10. sınıf) derslerine girebilir. İkinci branş (Fizik, Kimya, Informatik) genellikle istenir. Felsefe/Sosyoloji dersleri kredi sayılabilir veya AÖF ile tamamlanabilir. Tek branşla çalışma NRW, Bremen ve Hessen'de mümkündür.",
        }
      ]
    },
    {
      step: 2,
      title: "Dil Yeterliliği",
      description: "Öğretmenlik için dil seviyesi hayati öneme sahiptir.",
      details: [
        {
          title: "Gerekli Seviyeler",
          content: "Lehrkräfte programları için minimum B1, süresiz/kadrolu (Beamter/Unbefristet) çalışma için genellikle C1 şarttır. Sachsen-Anhalt gibi bazı eyaletler B2 ile başlatabilir.",
        },
        {
          title: "Mesleki Almanca (Fachsprache)",
          content: "Ders anlatımı ve veli iletişimi için özel mesleki Almanca gereklidir. Nachhilfe (özel ders) vermek veya Hospitasyon (gözlem) yapmak gelişimi hızlandırır.",
        }
      ]
    },
    {
      step: 3,
      title: "Kariyer Yolları & Statüler",
      description: "Niteliklerinizi Alman sistemine uyarlamak için çeşitli yollar mevcuttur.",
      details: [
        {
          title: "Lehrkräfte Plus / RTP",
          content: "Mülteci öğretmenler için 1 yıl teorik + 2 yıl pratik eğitim içeren programlardır. Yoğun C1 kursu ve pedagoji eğitimi verilir. Sonunda süresiz sözleşme şansı yüksektir.",
        },
        {
          title: "Seiteneinstieg & Vekil Öğretmenlik",
          content: "Tam denklik almadan çalışmanın yollarıdır. Vekil öğretmenlik (Vertretungslehrer) 5 yıla kadar geçici sözleşme sunar, B2 ile başvurulabilir. Ders ücretli öğretmenlik (Honorararbeit) ise en basit başlama yoludur.",
        },
        {
          title: "MPT (Çok Profesyonelli Takımlar)",
          content: "Süresiz kadro (TVL-10) sunar. Ders sorumluluğu ve not verme yoktur, öğretmene destek ve öğrencilere bireysel yardım odaklıdır.",
        }
      ]
    },
    {
      step: 4,
      title: "Başvuru ve Mülakat",
      description: "Kişisel beceriler ve sunum durumu belirleyicidir.",
      details: [
        {
          title: "Evrak Hazırlığı",
          content: "Anschreiben (Ön yazı), Lebenslauf (CV), Denklik belgeleri, Sertifikalar. Motivasyon mektubunda 'Neden Almanya?' ve meslek aşkı vurgulanmalı. Gönüllü çalışmalardan (Ehrenamt) bahsedilmelidir.",
        },
        {
          title: "Mülakat Stratejileri",
          content: "Kendinizi tanıtırken hobilerinizden bahsedin. Pedagojik sorularda 'kahraman' olmayın; idare, sosyal pedagog ve veli işbirliğini vurgulayın. Kendi hazırladığınız bir ders planını sunmak etkileyicidir.",
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sınıf İçi ve Pedagoji",
    content: "Alman eğitim sisteminde ders planı standarttır: Anfang -> Einstieg (ilgi çekici giriş) -> Erarbeitung (işleme) -> Sicherung (pekiştirme) -> Abschluss (kapanış). Öğrenci merkezli yaklaşım esastır.",
    specialNeeds: "Otizm (OSB) veya DEHB olan öğrenciler için net kurallar, rutinler ve pozitif takviye önemlidir. Duyusal hassasiyetler için sessiz alanlar sağlanmalıdır. Sınıf yönetiminde 'Aktif Denetim' ile sorunlar erken fark edilmelidir.",
    resources: "Müfredat için 'klassenarbeiten.de', materyal için 'MeinUnterricht', terminoloji için 'mathe.wortschatz_tu.pdf' ve RWTH Aachen Vorkurs önerilir. Sözel problemlerde (Textaufgaben) basitten zora gidilmelidir."
  },
  alternatives: [
    {
      title: "Bilişim (IT/Informatik)",
      description: "Matematikçiler için Data Analyst pozisyonları uygundur. Fachinformatik Umschulung'a B2 ile başlanabilir."
    },
    {
      title: "Erzieher/in (Anaokulu)",
      description: "3 yıllık Ausbildung gerektirir, matematik mezunları için bir alternatiftir."
    },
    {
      title: "Schulbegleiter/in (Gölge Öğretmen)",
      description: "Engelli öğrencilere eşlik etme işidir (I-Kraft), B2 Almanca ile başlanabilir."
    }
  ],
  faqs: [
    {
      question: "ZAB başvurusu ücretli mi?",
      answer: "Evet, yaklaşık 200 Euro civarındadır. Ancak Jobcenter ile görüşülürse bu ücret karşılanabilir."
    },
    {
      question: "Stajyerlik (Referendariat) muafiyeti mümkün mü?",
      answer: "Evet. Adaylık kaldırma belgesi veya SGK dökümü (Hitap) ile tecrübenizi kanıtlayarak muafiyet alabilirsiniz."
    },
    {
      question: "İkinci branşım yok, ne yapmalıyım?",
      answer: "Fizik, Kimya, Informatik gibi alanlar veya transkriptinizdeki Felsefe/Sosyoloji dersleri değerlendirilebilir. AÖF ile kredi tamamlamak da bir seçenektir."
    },
    {
      question: "Tek branşla çalışabilir miyim?",
      answer: "NRW, Bremen ve Hessen gibi eyaletlerde mümkündür ancak Baden-Württemberg'de zordur."
    },
    {
      question: "Jobcenter dil kursunu karşılar mı?",
      answer: "Evet, işsizlik parası alma hakkı olanlar için Jobcenter C1/C2 kurslarını finanse edebilir."
    }
  ]
};
