import { ProfessionData } from './types';

export const englishTeacherData: ProfessionData = {
  title: "İngilizce Öğretmenliği",
  slug: "ingilizce-ogretmenligi",
  description: "Almanya'da İngilizce öğretmenliği için denklik, vize, dil şartları ve kariyer rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Eğitim", value: "Denklik / Master", color: "bg-blue-500" },
    { label: "Sektör", value: "Eğitim", color: "bg-emerald-500" },
    { label: "Maaş", value: "€2.500 - €5.500", color: "bg-purple-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Hazırlık ve Almanya'ya Giriş Aşaması",
      description: "Dil yeterliliği, yasal zemin ve vize süreçleri.",
      details: [
        {
          title: "Dil Şartı (Sprachkenntnisse)",
          content: "Çoğu eyalette C1 seviyesi yeterlidir, ancak NRW ve Baden-Württemberg gibi eyaletler tam denklik için C2 isteyebilir. Denklik süreci devam ederken vekil öğretmenlik (Vertretungslehrer) için B2 seviyesi yeterli olabilir. Türkiye'de C1 almak yerine Almanya'da dil kursuna devam etmek gelişimi hızlandırabilir."
        },
        {
          title: "İngilizce Yeterliliğini Koruma",
          content: "Almanca öğrenirken İngilizce'de 'körelme' veya 'code switching' yaşanabilir. Konuşma kulüpleri, online dersler ve yüksek sesle okuma çalışmaları ile İngilizce canlı tutulmalıdır."
        },
        {
          title: "Vize ve Oturum",
          content: "Türkiye'den direkt öğretmenlik vizesi almak zordur. Genellikle Almanya'da oturum ve çalışma izni olanlar bu kariyere yönelir. İş teklifi almak oturum sürecini kolaylaştırır. Jobcenter, iş arayanlara dil kursu desteği verebilir."
        }
      ]
    },
    {
      step: 2,
      title: "Denklik Başvurusu (Anerkennung) ve Belgeler",
      description: "Diploma değerlendirmesi ve gerekli evrakların hazırlanması.",
      details: [
        {
          title: "Diploma Değerlendirmesi (ZAB)",
          content: "Mesleki denklik öncesi Bonn'daki ZAB'dan 'Zeugnisbewertung' (Diploma Değerlendirmesi) alınması tavsiye edilir. İşverenler için önemlidir. ZAB genellikle tercüme istemez, fotokopi yeterlidir."
        },
        {
          title: "Mesleki Denklik Başvurusu",
          content: "Eyalet bazlı kurumlara (Lehrkräftakademie) başvurulur (NRW için Detmold, Hessen için Giessen vb.). Gerekli belgeler: Başvuru formu, Lise diploması, Özgeçmiş, Üniversite diplomaları ve transkriptleri, Dil sertifikası, Doğum/Evlilik belgesi, Hizmet dökümleri, Stajyerlik kalktı belgesi ve varsa Müdür yazısı."
        },
        {
          title: "Denklik Sonucu",
          content: "Genellikle eksiklikler (Defizit) çıkar: İkinci branş eksikliği, Adaptasyon eğitimi (Anpassungslehrgang) veya Referendariat gerekliliği. Türkiye'deki tezler bitirme çalışması yerine sayılabilir."
        }
      ]
    },
    {
      step: 3,
      title: "İş Hayatına Giriş ve Alternatif Yollar",
      description: "Denkliksiz çalışma, köprü programları ve dil kursları.",
      details: [
        {
          title: "Vekil / Sözleşmeli Öğretmenlik",
          content: "Denklik belgesi olmadan, sadece ZAB onayı ile 'Vertretungslehrer' olarak çalışılabilir. Verena ve Leo (NRW) gibi platformlardan başvurulabilir. Maaş başlangıçta tam denkliklilere göre düşüktür (Brüt ~2500€), ancak tecrübe kazandırır."
        },
        {
          title: "Köprü Programları (Lehrkräfte Plus)",
          content: "Üniversitelerin (Köln, Bochum vb.) yürüttüğü programlardır. C1 Almanca, pedagoji dersleri ve staj içerir. Program sonunda 'Fachlehrer' olarak süresiz iş imkanı doğabilir."
        },
        {
          title: "Entegrasyon ve Dil Kursları",
          content: "C1 sertifikası ile VHS veya BAMF kurslarında DaF/DaZ öğretmenliği yapılabilir. BAMF, dil/edebiyat mezunlarına doğrudan sertifika (Zulassung) verebilir."
        }
      ]
    },
    {
      step: 4,
      title: "Tam Denklik ve Kariyer Gelişimi",
      description: "İkinci branş, memuriyet ve mülakat süreçleri.",
      details: [
        {
          title: "İkinci Branş (Zweites Fach)",
          content: "Tam kadrolu (Beamte) olmak için ikinci branş şarttır. Denklik sonucuna göre üniversitede eksik krediler tamamlanır (1.5 - 2 yıl). Bu süreçte Bafög desteği alınabilir. Etik, Din veya Türkçe gibi branşlar iyi seçeneklerdir."
        },
        {
          title: "Mülakatlar (Auswahlgespräch)",
          content: "Genellikle 30-35 dk sürer (20 dk Almanca, 10-15 dk İngilizce). Pedagoji, sınıf yönetimi ve disiplin soruları sorulur. Teorik değil, somut tecrübe örnekleri verilmelidir."
        },
        {
          title: "Alternatif Kariyerler",
          content: "Eğitim danışmanlığı, Jobcoach, Sosyal hizmetler, Okul asistanlığı (Schulbegleiter) veya özel sektörde TESOL ile öğretmenlik yapılabilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sınıf İçi Uygulama ve İpuçları",
    content: "Almanya'da İngilizce derslerinde genellikle Cornelsen, Klett gibi yayınlar kullanılır. İlkokulda (Grundschule) konular basittir (kelime ve kalıp).",
    specialNeeds: "Mülakatlarda 'Sınıfta çatışma çıkarsa ne yaparsın?', 'Veli şikayetinde tutumunuz ne olur?' gibi sorulara hazırlıklı olun. Cevaplar kısa, net ve tecrübe odaklı olmalıdır.",
    resources: "İşe başlamadan önce okullarda 'Hospitation' (gözlem) yapmak çok önemlidir. Bu, sistemi tanımanızı sağlar ve staj süresini kısaltabilir."
  },
  faq: [
    {
      question: "Almanya'da öğretmenlik yapabilmek için denklik (Anerkennung) almam şart mı?",
      answer: "Evet, öğretmenlik (Lehrkraft) kanun ve yönetmeliklerle düzenlenmiş (reglementiert) meslekler arasında yer aldığı için, mesleği tam anlamıyla icra edebilmek için denklik süreci zorunludur. Ancak, tam denklik (kadrolu öğretmenlik) olmadan da vekil öğretmenlik (Vertretungslehrer) gibi pozisyonlarda çalışmak mümkündür."
    },
    {
      question: "Denklik süreci hangi aşamalardan oluşur ve hangi kurumlar yetkilidir?",
      answer: "Denklik süreci iki ana aşamadan oluşur: 1. Üniversite Diploması Tanınması (ZAB): Bonn’daki ZAB'a başvurarak diplomalarınızın üniversite mezunu olarak tanınmasını (Zeugnisbewertung) sağlarsınız. 2. Mesleki Tanınma (Berufliche Anerkennung): Eyalet bazındaki Lehrkräfteakademie'lere (örn. NRW için Detmold) başvurulur. Bu kurum mesleğinizi hangi şartlarla yapabileceğinize dair detaylı bir rapor sunar."
    },
    {
      question: "Denklik başvurusu için hangi belgeler gereklidir?",
      answer: "Temel belgeler: Başvuru Formu, Özgeçmiş, Lise Diploması (Tercüme+Onaylı), Üniversite Diplomaları ve Transkriptleri (Tercüme+Onaylı), Hizmet Belgeleri (Hitap veya İlçe MEB), Stajyerlik Kalktı Belgesi, KPSS Sonuç Belgesi ve Müdür Yazısı (son 10 yılda 3 yıl öğretmenlik yapıldığına dair). ZAB için genellikle tercüme gerekmezken, mesleki denklik için resmi tercüme ve onay şarttır."
    },
    {
      question: "Tek branş mezunlarının (İngilizce Öğretmenliği) tam denklik alması mümkün müdür?",
      answer: "Türkiye mezunları genellikle tek branşa sahip oldukları için, denklik sonucunda tam tanınma yerine genellikle ikinci bir branş (Zweites Fach) okuma zorunluluğu (Nachstudium) tavsiyesi gelir. Bu ek eğitim genelde 60 kredi olup, C1 Almanca sertifikası sonrasında üniversitede yaklaşık 1,5-2 yıl sürer."
    },
    {
      question: "İkinci bir branş okurken finansal destek alabilir miyim?",
      answer: "Eğer ZAB'dan üniversite mezunu olarak tanınma belgeniz varsa, ikinci branş okurken Bafög (Federal öğrenimi teşvik yasası) kapsamında yaklaşık 700-800 Euro civarında destek alarak geçiminizi sağlayabilirsiniz."
    },
    {
      question: "Öğretmenlik için gereken Almanca seviyesi nedir ve B2 yeterli olur mu?",
      answer: "Tam denklik (kadrolu öğretmenlik) için çoğu eyalet C1, bazıları (NRW, BW) C2 ister. Ancak vekil öğretmenlik (Vertretungslehrer) için B2 seviyesi ile iş bulmak mümkündür, özellikle öğretmen ihtiyacının yüksek olduğu eyaletlerde."
    },
    {
      question: "Almanca öğrenirken İngilizce dil becerim körelir mi? Bunu nasıl önleyebilirim?",
      answer: "Evet, 'dil çatışması' yaygındır. Önlemek için konuşma kulüpleri oluşturmak, online gönüllü ders vermek ve düzenli yüksek sesle İngilizce okuma/yazma çalışmaları yapmak tavsiye edilir."
    },
    {
      question: "Tam denklik belgem olmadan devlet okulunda öğretmenlik yapabilir miyim?",
      answer: "Evet, ZAB'dan alınan denklik belgesi ile okullara doğrudan başvurarak vekil öğretmen (Vertretungslehrer) veya sözleşmeli olarak çalışabilirsiniz. Maaş tam zamanlı bir işte brüt 2500 Euro civarında olabilir."
    },
    {
      question: "Hangi eğitim ve adaptasyon programları avantaj sağlar?",
      answer: "Lehrkräfte Plus (LK+): Üniversiteler tarafından yürütülen, dil ve pedagoji eğitimi veren programlardır; mezunlarına süresiz iş imkanı sağlayabilir. Pädagogische Einführung (PE) / OBAS: Kadrolu öğretmenliğe geçişi sağlayan, hem çalışıp hem eğitim alınan süreçlerdir."
    },
    {
      question: "Devlet okulları dışında nerelerde çalışabilirim?",
      answer: "Entegrasyon Kursu Öğretmenliği (BAMF onaylı), Halk Eğitim Merkezleri (VHS), Yardımcı Öğretmenlik (Schulbegleiter), Eğitim Danışmanlığı, Jobcoach veya özel ders (Nachhilfe) alanlarında çalışılabilir."
    },
    {
      question: "TESOL sertifikası Almanya'da öğretmenlik için yeterli midir?",
      answer: "Özel okullar veya dil kursları için avantaj sağlar ancak kamu okullarında tam denklik (Anerkennung) almak için tek başına yeterli değildir."
    },
    {
      question: "Öğretmenlik programlarına kabul mülakatları nasıl işler?",
      answer: "30-35 dakika sürer (20 dk Almanca, 10-15 dk İngilizce). Pedagoji, sınıf yönetimi ve disiplin soruları sorulur. Teorik değil, somut tecrübe örnekleri verilmelidir. Kısa bir İngilizce metin düzeltme testi de yapılabilir."
    },
    {
      question: "Okulda gözlem (Hospitation) yapmanın faydaları nelerdir?",
      answer: "Sistemi tanımak ve gönüllü tecrübe kazanmak için önemlidir. Gözlem yapılan süre, ileride staj süresini kısaltabilir. Okuldan belge almayı unutmamak gerekir."
    },
    {
      question: "Başörtülü bir öğretmen Almanya’da devlet okulunda çalışabilir mi?",
      answer: "Eyaletten eyalete değişir. Genel yasak olmasa da işveren inisiyatifindedir. Özel okullarda ve bazı devlet okullarında çalışan örnekler mevcuttur."
    },
    {
      question: "Almanya'ya gelirken C1 Almanca seviyesini Türkiye'de mi tamamlamak daha mantıklıdır?",
      answer: "Almanya'ya gelip dili burada öğrenmek, pratik gelişimi ve yerel dile hakimiyet açısından daha çok tavsiye edilir. Türkiye'deki C1 ile buradaki konuşma dili arasında fark olabilir."
    },
    {
      question: "Mesleki tecrübe eksikliğim denklik sürecimi nasıl etkiler?",
      answer: "Genellikle son 10 yılda 2-3 yıl tecrübe istenir. Yoksa Adaptasyon Eğitimi (Anpassungslehrgang) gerekebilir. Lehrkräfte Plus gibi programlardaki ders verme süreleri tecrübe sayılabilir."
    }
  ]
};
