import { ProfessionData } from './types';

export const dataScienceData: ProfessionData = {
  title: "Veri Bilimi ve Analitiği (Data Science)",
  slug: "veri-bilimi",
  description: "Almanya'da Veri Bilimi, Veri Analizi ve Yapay Zeka alanlarında kariyer, eğitim ve iş fırsatları rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-red-500" },
    { label: "Maaş (Ort.)", value: "€65.000", color: "bg-purple-500" },
    { label: "Sektör", value: "Teknoloji & Finans", color: "bg-blue-500" },
    { label: "Dil", value: "İngilizce / Almanca", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Hazırlık ve Eğitim Seçenekleri",
      description: "Ücretli, ücretsiz ve devlet destekli kurs programları.",
      details: [
        {
          title: "Özel Kurslar ve Akademiler",
          content: "Clarusway (Data Science), Digitera IT (Data Analyst - 9 ay, ilk ay ücretsiz), neue fische (saygın bir kurum), Techpro (kampanyalı programlar)."
        },
        {
          title: "Devlet ve Sosyal Destekli",
          content: "Agentur für Arbeit (İş Ajansı) destekli kurslar. InfoTech Academy (Mültecilere ücretsiz Python/Web). Kiron (Mülteci kadınlar için THRIVE programı)."
        },
        {
          title: "Online Kaynaklar",
          content: "Deeplearning.ai (ChatGPT prompt engineering), ki-campus.org ve Türkçe YouTube kaynakları."
        }
      ]
    },
    {
      step: 2,
      title: "Dil Yetkinlikleri",
      description: "İngilizce ve Almanca'nın sektördeki yeri.",
      details: [
        {
          title: "İngilizce Gerekliliği",
          content: "Sadece Data Science için değil, tüm IT sektörü için dokümantasyon okuma ve rapor yazma seviyesinde İngilizce şarttır."
        },
        {
          title: "Almanca'nın Önemi",
          content: "Sadece Almanca bilerek iş bulmak zordur, ancak yerel iş piyasasına entegrasyon için Almanca da gereklidir. İngilizce teknik, Almanca sosyal iletişim için kritiktir."
        }
      ]
    },
    {
      step: 3,
      title: "Teknik Yetkinlikler",
      description: "Programlama, veritabanı ve özel araçlar.",
      details: [
        {
          title: "SAP ve Analitik Araçlar",
          content: "Bazı ilanlarda SAP bilgisi istenir. Genellikle SAP Analytics Cloud veya istatistiksel analiz yeteneği kastedilir. SAP HANA bilgisi de avantajdır."
        },
        {
          title: "Veritabanı ve ETL",
          content: "PostgreSQL tecrübesi, ETL (Extract-Transform-Load) süreçleri ve DevOps Exasol/Oracle DB deneyimi aranmaktadır."
        }
      ]
    },
    {
      step: 4,
      title: "İş Hayatı ve Kariyer",
      description: "Sektöre giriş, staj ve iş bulma dinamikleri.",
      details: [
        {
          title: "Alan Değiştirme (Career Switch)",
          content: "Sektöre girenlerin önemli bir kısmı başka alanlardan geçiş yapmıştır. Ancak tecrübesiz girişlerde iş bulma riski mevcuttur."
        },
        {
          title: "İş Arama ve Roller",
          content: "Data Analyst, Data Scientist, AI Developer/Architect rolleri popülerdir. MHP gibi firmalar deneyimli uzmanlar aramaktadır. Staj (Praktikum) bulmak üniversite öğrencileri için yaygındır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sektör Analojisi: Veri Rafinerisi",
    content: "Veri Bilimi kariyeri, ham petrolü işleyip değerli yakıta dönüştüren bir rafineri mühendisliğine benzer. Ham veri (petrol) tek başına değersizdir; onu çıkarmak (SQL/ETL), işlemek (Python/Pandas) ve rafine ederek (Machine Learning) iş kararlarına (yakıt) dönüştürmek gerekir. Bu süreçte İngilizce, rafinerinin uluslararası standartlardaki kullanım kılavuzu; Almanca ise rafinerinin bulunduğu ülkedeki çalışma izninizdir.",
    specialNeeds: "Analitik düşünme yeteneği, istatistik temeli ve sürekli öğrenme merakı gerektirir.",
    resources: "Deeplearning.ai, ki-campus.org, InfoTech Academy, Kiron, Clarusway, Techpro, neue fische."
  },
  faq: [
    {
      question: "Almanya'da Data Science/Data Analyst alanında hangi ücretli ve ücretsiz kurs programları mevcuttur?",
      answer: "• Ücretli/Özel Kurslar:\n  ◦ Clarusway: Data Science kursları mevcuttur.\n  ◦ Techpro: Data Science programları için kampanyalar düzenlemektedir.\n  ◦ Digitera IT: 9 aylık Data Analyst kursu sunar, ilk 3-4 hafta ücretsizdir.\n  ◦ neue fische: Almanya piyasasında saygın bir kurumdur.\n  ◦ InfoTech Academy: Cyber Security ve Automation Engineering kursları ücretlidir (€600).\n\n• Devlet/Sosyal Destekli Kurslar:\n  ◦ Agentur für Arbeit (İş Ajansı): Destekli Data Science kursları mevcuttur.\n  ◦ InfoTech Academy: Mültecilere yönelik ücretsiz Python ve Web Development kursları sunar.\n  ◦ Kiron: Mülteci kadınlara (18-40 yaş) yönelik THRIVE – Upskilling Programı (Data Analyst) bulunmaktadır."
    },
    {
      question: "Data Analyst olarak bilinmesi gerekenleri anlatan Türkçe kaynaklar var mıdır?",
      answer: "Şu an için Data Analyst olarak bilinmesi gerekenleri Türkçe anlatan spesifik bir video, YouTuber veya kitap tavsiyesi kaynaklarda öne çıkmamıştır. Ancak genel IT ve yazılım kanalları takip edilebilir."
    },
    {
      question: "Hangi ek öğrenim materyalleri paylaşılmıştır?",
      answer: "• Deeplearning.ai: ChatGPT prompt engineering kısa kursu (dönemsel ücretsiz).\n• ki-campus.org: Yapay zeka ve veri bilimi üzerine kaynaklar sunan bir platform."
    },
    {
      question: "Almanya'da IT ve Data Science alanında çalışmak için İngilizce bilgisi şart mıdır?",
      answer: "Evet, sadece Data Science için değil, Almanya IT alanı genelinde İngilizce şarttır. Dokümanları okuyup anlayacak, hatta rapor yazacak seviyede İngilizce gereklidir. Sadece Almanca ile bu alanda ilerlemek oldukça zordur."
    },
    {
      question: "Data Science/Analyst iş ilanlarında istenen SAP bilgisi neyi ifade eder?",
      answer: "Bu konuda farklı yorumlar vardır:\n• SAP HANA: Veri bilimine ilişkin modül.\n• SAP Analytics Cloud: Veriler üzerinde istatistiksel çalışma yapabilme yeteneği.\n• SAP FI/CO: Bazı finansal veri analizi rolleri için gerekebilir."
    },
    {
      question: "Data alanında hangi teknik terimler ve roller önem taşımaktadır?",
      answer: "• ETL (Extract-Transform-Load): Veri işleme süreçleri (Almanca karşılığı bazen EDI olarak geçebilir).\n• PostgreSQL: Sıkça aranan veritabanı yetkinliği.\n• Roller: Veritabanı Yöneticisi (Datenbank Admin), DevOps Exasol DB Engineer, Oracle DB User."
    },
    {
      question: "Data Analyst veya Scientist alanına farklı bir sektörden (Quereinsteiger) geçiş yapmanın güncel durumu nedir?",
      answer: "Sektör çalışanlarının önemli bir kısmı (yaklaşık yarısı) alan değiştirerek gelmiştir. Ancak, tecrübesiz (Junior) olarak iş bulmak rekabetlidir ve iş bulamama riski göz önünde bulundurulmalıdır."
    },
    {
      question: "Data alanında hangi pozisyonlar için iş arayışları veya ilanları paylaşılmıştır?",
      answer: "• Staj (Praktikum): Üniversite öğrencileri için.\n• Mesleki Eğitim (Ausbildung): IT alanında eğitim arayanlar için.\n• Profesyonel Roller: Veri Analisti (Datenanalyst), Data/AI Developer/Architect (örn. MHP firması), Veritabanı Yöneticisi."
    },
    {
      question: "Tecrübe paylaşımı platformlarının kullanım kuralları nelerdir?",
      answer: "Gruplar sadece tecrübe paylaşımı içindir. Firma reklamı veya izinsiz duyuru yapılması yasaktır ve gruptan uzaklaştırma sebebidir."
    }
  ]
};
