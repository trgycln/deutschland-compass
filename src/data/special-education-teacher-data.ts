import { ProfessionData } from './types';

export const specialEducationTeacherData: ProfessionData = {
  title: "Özel Eğitim Öğretmenliği",
  slug: "ozel-egitim-ogretmenligi",
  description: "Türkiye’den Almanya’ya göç eden Özel Eğitim Öğretmenlerinin mesleki entegrasyon, denklik süreçleri, kariyer fırsatları ve günlük yaşam rehberi.",
  videoUrl: "", 
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-green-500" },
    { label: "Dil", value: "C1/C2 (Öğretmenlik)", color: "bg-blue-500" },
    { label: "Sektör", value: "Eğitim & Pedagoji", color: "bg-purple-500" },
    { label: "Denklik", value: "Zorunlu", color: "bg-red-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Hazırlık Süreci: Dil ve Denklik",
      description: "Dil yeterliliği ve diploma denklik işlemleri.",
      details: [
        {
          title: "Dil Yeterliliği (C1/C2)",
          content: "Öğretmenlik mesleğine tam denklik alarak başlamak için genellikle C1 veya C2 seviyesi dil sertifikaları zorunlu tutulmaktadır (Örn: NRW'de C2 şartı). B2 seviyesi ile Schulbegleiter (Gölge Öğretmen) veya Teilhabeassistenz gibi pozisyonlara başvurulabilir."
        },
        {
          title: "Diploma Denklik Süreci (Anerkennung)",
          content: "Diplomanın ZAB (Zentralstelle für ausländisches Bildungswesen) kurumuna gönderilerek değerlendirilmesi (Zeugnisbewertung) önerilir. Özel eğitim alanında öğrenim görenler için hem Diploma Değerlendirmesi hem de Mesleki Tanınma (Berufliche Anerkennung) süreçleri mevcuttur."
        },
        {
          title: "Gerekli Belgeler",
          content: "Lisans/master diplomaları, transkriptler, dil belgesi, Orientierungkurs belgesi, hizmet dökümü ve iş referansları (Arbeitszeugnis). Eğitim Fakültesi diplomasının çevirisinin 'Sonderpädagogische Lehramt' şeklinde yapılması tavsiye edilir."
        }
      ]
    },
    {
      step: 2,
      title: "Vize ve Göç Süreci",
      description: "Almanya'ya geliş ve yasal prosedürler.",
      details: [
        {
          title: "Vize ve İş Arama",
          content: "Özel eğitim öğretmenleri için spesifik vize bilgisi olmamasına rağmen, genel yasal yollar geçerlidir. Anerkennung süreci tamamlandıktan sonra Vertretungslehrer (Sözleşmeli Öğretmen) veya tam kadro (Feststelle) başvurusu yapılabilir. Türkiye'den iş görüşmesi yaparak kabul alınması durumunda direkt gelebilme imkanı vardır."
        }
      ]
    },
    {
      step: 3,
      title: "Varış ve İlk Adımlar",
      description: "Uyum, sosyal destek ve istihdam.",
      details: [
        {
          title: "Uyum ve Sosyal Destek",
          content: "Integrationslotse ve Seelsorge gibi uzmanlar bilgilendirme ve moral desteği sağlar. Alman eğitim sistemini anlatan ücretsiz Türkçe bilgilendirme etkinliklerine katılabilirsiniz."
        },
        {
          title: "İstihdam ve Yaşam",
          content: "Jobcenter/Arbeitsagentur aracılığıyla devlet destekli Online Eğitim Programları (Weiterbildung) mevcuttur. Ücretli işe başlandığında Jobcenter'a bildirim zorunludur."
        }
      ]
    },
    {
      step: 4,
      title: "Kariyer ve Mesleki Entegrasyon",
      description: "Mesleki statüler, kadrolar ve iş fırsatları.",
      details: [
        {
          title: "Mesleki Statüler",
          content: "Beamter (Kadrolu): Geniş haklar ve yüksek maaş, çift branş şart. Vertretungslehrer: Sözleşmeli/Vekil öğretmenlik. Fachkraft / MPT: Çok profesyonelli ekiplerde uzman personel kadrosu (süresiz sözleşme, TVL-10 maaş)."
        },
        {
          title: "İlk Adım Pozisyonları",
          content: "Hospitation (Gözlem): Resmi değildir, alanı keşfetme amaçlıdır. Praktikum (Staj): Daha resmi, Förderschulelerde yapılabilir. Schulbegleiter (Gölge Öğretmen): Engelli öğrencilere birebir destek, ders anlatma yükümlülüğü yoktur, B2 ile başlanabilir."
        },
        {
          title: "Uzman Kadrolar",
          content: "MPT (Multiprofessionelles Team): Pedagojik eğitim yeterlidir, dil sertifikası zorunluluğu yoktur. Förderschule (Özel Eğitim Okulu): Sınıflar 7-8 kişilik, 2 öğretmen bulunur."
        },
        {
          title: "İş Arama Portalları (NRW)",
          content: "LOIS.NRW (Kalıcı kadrolar), ANDREAS (MPT, Fachlehrer), VERENA NRW (Geçici/Sözleşmeli). Ayrıca Indeed, StepStone, LinkedIn."
        }
      ]
    },
    {
      step: 5,
      title: "Özel Eğitim Gereksinimleri",
      description: "Tanı süreçleri ve destek mekanizmaları.",
      details: [
        {
          title: "Tanı ve Destek",
          content: "Almanya'da özel eğitim alanında ciddi açık vardır. Disleksi için Jobcenter desteği, Otizm için yapılandırılmış ortam, DEHB için net yapılar ve ödül sistemleri uygulanır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Özel Eğitimde Yaklaşım",
    content: "Özel eğitimde 'Ring Modell' (Halka Modeli) gibi sınıf yönetimi stratejileri önemlidir: 1. Önleme (Kurallar/Rutin), 2. Erken Müdahale (Sessiz uyarı), 3. Doğrudan Müdahale (Net uyarı/Deeskalasyon). Otizmli öğrenciler için yapılandırılmış ortam, görsel destekler ve sosyal hikayeler kullanılır.",
    specialNeeds: "Çocuklara dokunma, kızma veya tepki verme konusunda aşırı dikkatli olunmalıdır. Schulbegleiter pozisyonunda telefon kullanımı yasaktır.",
    resources: "LOIS.NRW, VERENA NRW, ZAB, Schulministerium NRW."
  },
  faq: [
    {
      question: "Özel eğitimde öğretmenlik için C1/C2 Almanca şart mı?",
      answer: "Evet, kadrolu öğretmenlik (Beamter) ve tam denklik için genellikle C1 veya C2 (örn. NRW) şarttır. Dil sadece belge değil, iletişim ve ders anlatımı için hayati önem taşır."
    },
    {
      question: "B2 seviyesi ile öğretmenlik yapılabilir mi?",
      answer: "B2 belge olarak bazı durumlarda yeterli sayılsa da, pratik yetkinlik (anlama, anlatma, gramer) çok önemlidir. B2 ile genellikle Schulbegleiter gibi yardımcı pozisyonlara başlanması önerilir."
    },
    {
      question: "Denklik için hangi belgeler gereklidir?",
      answer: "Lisans/Master diplomaları, transkriptler, dil belgesi, Orientierungskurs belgesi ve ZAB değerlendirmesi (Zeugnisbewertung) temel belgelerdir. Hizmet dökümü ve iş referansları da çevrilmelidir."
    },
    {
      question: "Schulbegleiter (Gölge Öğretmen) ne iş yapar?",
      answer: "Görevi tamamen çocuğa bağlıdır (not alma, sakinleştirme vb.). Ders anlatma yükümlülüğü %99 yoktur. Sınıf öğretmenine yardımcı olur."
    },
    {
      question: "Hospitation (Gözlem) nedir ve nasıl başvurulur?",
      answer: "Resmi olmayan, 2-3 günlük gözlem sürecidir. Okulu tanıma ve dil pratiği için faydalıdır. Okullara doğrudan başvurulabilir."
    },
    {
      question: "MPT kadrosunun avantajları nelerdir?",
      answer: "Süresiz sözleşme, TVL-10 maaş (Brüt ~3600€), uzun tatiller ve not verme sorumluluğunun olmaması gibi avantajları vardır."
    },
    {
      question: "Sınıfta davranış problemleriyle nasıl başa çıkılır?",
      answer: "Ring Modell (Halka Modeli) uygulanır: 1. Önleme (Kurallar/Rutin), 2. Erken Müdahale (Sessiz uyarı), 3. Doğrudan Müdahale (Net uyarı/Deeskalasyon)."
    },
    {
      question: "Otizmli öğrenciler için hangi stratejiler önerilir?",
      answer: "Yapılandırılmış ortam, görsel destekler, basit/net iletişim, duyusal hassasiyetlere dikkat etme ve sosyal hikayeler kullanılması önerilir."
    },
    {
      question: "Kendi alanım dışında hangi işleri yapabilirim?",
      answer: "Erzieher/in, Sosyal Çalışmacı, Yaşlı Bakımı, Entegrasyon Kursu Öğretmenliği veya Ausbildung ile tamamen farklı sektörlere (IT, Lojistik vb.) geçiş yapılabilir."
    }
  ]
};
