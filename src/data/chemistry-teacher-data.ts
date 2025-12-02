import { ProfessionData } from './types';

export const chemistryTeacherData: ProfessionData = {
  title: "Kimya Öğretmenliği ve Kimyagerlik",
  slug: "kimya-ogretmenligi",
  description: "Almanya'da Kimya Öğretmenleri ve Kimyagerler için kariyer, denklik, dil gereksinimleri ve sektör fırsatları rehberi.",
  videoUrl: "", // Video URL can be added later if available
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-green-500" },
    { label: "Dil", value: "C1 (Öğretmenlik)", color: "bg-blue-500" },
    { label: "Sektör", value: "Eğitim & Sanayi", color: "bg-purple-500" },
    { label: "Denklik", value: "Zorunlu (Öğretmenlik)", color: "bg-red-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Dil ve Denklik (Anerkennung)",
      description: "Kariyerin temeli: C1 Almanca ve diploma denkliği.",
      details: [
        {
          title: "Dil Yeterliliği (C1)",
          content: "Öğretmenlik ve profesyonel kariyer için C1 seviyesi şarttır. Kimya terimlerine hakimiyet için mesleki Almanca kursları önerilir. Sanayide B2 ile başlanabilse de C1 hedeflenmelidir."
        },
        {
          title: "Diploma Denkliği",
          content: "Öğretmenlik için Eyalet Öğretmen Akademisi'ne (Lehrkräfteakademie) başvurulmalıdır. Kimyagerlik için ZAB üzerinden Zeugnisbewertung yeterlidir. Formasyon belgesinin denkliği ayrıca gerekebilir."
        }
      ]
    },
    {
      step: 2,
      title: "Eğitim ve Sertifikasyon",
      description: "Sisteme entegrasyon ve mesleki gelişim.",
      details: [
        {
          title: "Lehrkräfte Programları",
          content: "Mülteci öğretmenler için üniversitelerde (özellikle NRW'de) sunulan 'Lehrkräfte Plus' programları, dil eğitimi ve staj içerir. Bu programlar sisteme girişin en kestirme yoludur."
        },
        {
          title: "Sektörel Sertifikalar (Weiterbildung)",
          content: "Kimya sektörü için GMP (İyi Üretim Uygulamaları), HPLC veya SAP sertifikaları almak iş bulma şansını ciddi oranda artırır. Jobcenter bu eğitimleri destekleyebilir."
        }
      ]
    },
    {
      step: 3,
      title: "Kariyer Yolları",
      description: "Öğretmenlik veya Kimya Sektörü seçenekleri.",
      details: [
        {
          title: "Öğretmenlik (Lehrkraft)",
          content: "Sözleşmeli öğretmenlik, ders ücretli öğretmenlik veya tek branşla atama seçenekleri mevcuttur. Sayısal alanlarda açık olduğu için tek branşla başlama şansı vardır."
        },
        {
          title: "Kimya Sektörü (Chemiker/Chemikant)",
          content: "Laborant, CTA (Kimya Teknik Asistanı) veya Chemikant pozisyonlarına başvurulabilir. Tecrübe kazanmak için başlangıçta düşük pozisyonlar kabul edilebilir."
        }
      ]
    },
    {
      step: 4,
      title: "İş Başvurusu ve Mülakat",
      description: "Profesyonel başvuru dosyası ve mülakat stratejileri.",
      details: [
        {
          title: "Başvuru Dosyası",
          content: "Motivasyon mektubu (Anschreiben) ve CV (Lebenslauf) Alman standartlarına uygun olmalıdır. Boşluklar eğitim veya gönüllü çalışmalarla doldurulmalıdır."
        },
        {
          title: "Mülakat Stratejileri",
          content: "Pedagojik sorulara (zor öğrenci vb.) yapıcı yaklaşılmalı, motivasyon yüksek tutulmalı ve mülakat sonunda mutlaka karşı tarafa soru sorulmalıdır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Kariyer Yolu Metaforu: Kimyasal Reaksiyon",
    content: "Almanya’daki kariyer yolculuğu, tıpkı kimyasal bir reaksiyon gibidir. Başlangıçta dil bariyeri ve denklik işlemleri (aktivasyon enerjisi) yüksektir. Ancak doğru katalizörleri (mesleki Almanca, Weiterbildung sertifikaları, Praktikum gibi pratik tecrübeler) kullanarak bu enerjiyi aşabilir ve arzu edilen ürüne (süresiz sözleşmeli öğretmenlik veya kimyagerlik pozisyonu) ulaşabilirsiniz.\n\nİlk başta düşük verimli bir reaksiyon (düşük maaşlı bir başlangıç pozisyonu) kabul etmek, ileride daha yüksek verimli ve tatmin edici sonuçlara ulaşmanız için bir zorunluluktur. Bu süreçte sabır ve gayret kritik öneme sahiptir.",
    specialNeeds: "Kimya laboratuvarlarında güvenlik kurallarına (tehlikeli maddeler) tam uyum ve dil hakimiyeti hayati önem taşır.",
    resources: "Lehrkräfte Plus Programları, Labor.de (iş ilanları), Otto Benecke Stiftung (danışmanlık)."
  },
  faq: [
    // I. Dil Yeterliliği ve Mesleğe Hazırlık
    {
      question: "Almanya’da kimya öğretmeni veya kimyager olarak çalışmak için gerekli minimum Almanca seviyesi nedir?",
      answer: "C1 seviyesi Almanca, öğretmenlik ve genel olarak profesyonel kariyer için her zaman gereklidir. Dil seviyenizi B2 plus veya C1 yapmadan iyi bir yerde iş bulmak için acele etmemeniz tavsiye edilir. Bazı Lehrkraft Programları için başlangıçta B2 seviyesi istenir ve altı ay içinde C1 almanız için destek verilir. Kimya sektöründe (Kimyagerlikte) C1 şart olsa da, iş arkadaşlarıyla diyalog kurarak mesleki terimlerin zamanla öğrenildiği deneyimlenmiştir."
    },
    {
      question: "Genel Almanca bilgisine ek olarak mesleki Almanca eğitimi gerekli midir?",
      answer: "Evet, gereklidir. Kimya tabirleri, hatta hidrojen ve oksijen gibi elementlerin bile Almancası (Kimyanın Almancası) olduğu için, 3 aylık bir mesleki Almanca kursuna ihtiyaç duyulabilir. Kimyagerlikte, elementlerin bile farklı isimde olduğunu dikkate alarak mesleki Almanca şarttır."
    },
    {
      question: "C1 Türkçe Sertifikası (TELC Türkçe C1) Kimya Öğretmenleri için faydalı mıdır?",
      answer: "Evet, faydalıdır. Ana branşı Türkçe olmayan, anadili Türkçe olan arkadaşlar bu sertifikayı alabilirler. Bu sertifika, okullarda ders ücretli öğretmenlik (Honorararbeit) yapma imkanı sunar ve en azından kimyacı olarak başladığınız bir okulda Türkçe derslerine girme şansınız olur. Jobcenter sınav ücretini ödeyebilir."
    },
    // II. Diploma Denkliği (Anerkennung) ve Kariyer Yolu
    {
      question: "Kimya Öğretmenliği diplomamın denkliğini (Anerkennung) nerede ve hangi amaçla yaptırmalıyım?",
      answer: "Öğretmenlik yapmak istiyorsanız: Öğretmenlik 'reglementiert' (düzenlenmiş) bir meslek olduğu için denklik zorunludur. Eyaletlerdeki Lehrkraftakademie'lere (Öğretmen Akademileri) başvurmanız gerekir. Genel diploma değerlendirmesi (Zeugnisbewertung) için ise Bonn'daki ZAB kurumu diploma ve transkriptlerinizi değerlendirir."
    },
    {
      question: "Kimyager olarak çalışmak istediğimde denklik yaptırmam zorunlu mudur?",
      answer: "Bazı Jobcenter görevlileri, kimya bölümü düzenlenmemiş olduğu için öğretmenlik yapılmayacaksa denklik yaptırmaya gerek olmadığını belirtmiştir. Ancak, kimya tehlikeli bir branş olduğu için, iş başvurularında Anerkennung belgesini eklemeniz pozitif bir görüş oluşturur. Özellikle Pharma firmaları denklik belgesi sorabilmektedir."
    },
    {
      question: "Denklik başvurusunda hangi evraklar gereklidir ve bu evrakların onayını nerede yaptırabilirim?",
      answer: "Diplomaların ve transkriptlerin tercümeleri gereklidir. Onay (Beglaubigung) işlemleri noter yerine belediyelerde (Bezirksregierung), Diakoni'de veya Bürgerbüro’larda ücretsiz veya düşük bir ücretle yapılabilir. Referandariyetten muafiyet için hizmet cetvelinizin tercümesi gerekebilir."
    },
    // III. Kariyer Alternatifleri ve Öğretmenlik Programları
    {
      question: "Kimya öğretmenleri için Almanya’daki kariyer yolları nelerdir?",
      answer: "Üç ana yol vardır: 1. Öğretmenlik (Lehrkraft): Lehrkräfte Programları veya ders ücretli öğretmenlik. 2. Kimyagerlik (Chemiker): Fen Edebiyat mezunları için kimya sektörü. 3. Alternatif Meslekler: Umschulung ile Program testçiliği, Erzieherlik veya Laborantlık."
    },
    {
      question: "Almanya'da öğretmenliğe başlamak için hangi programlar mevcuttur?",
      answer: "Yabancı üniversite diplomasına sahip öğretmenlere yönelik Lehrkräfte Programları (Öğretmen Programları) mevcuttur. Özellikle NRW Eyaleti'nde (Essen, Köln, Bochum vb.) 'Lehrkräfte Plus' programları vardır. Genellikle 6 ay dil eğitimi, 6 ay staj ve ardından 2 yıl ILF aşamalarını içerir."
    },
    {
      question: "Öğretmenlik kariyerine başlamanın farklı statüleri nelerdir?",
      answer: "1. Memur (Beamter): Yabancılar için zordur. 2. Sözleşmeli Öğretmenlik (Angestellte): Süreli veya süresiz olabilir. Süresiz sözleşmeli öğretmenlik memurluğa yakındır. 3. Ders Ücretli Öğretmenlik (Honorararbeit): En basit başlanabilecek yoldur."
    },
    {
      question: "Kimya öğretmenleri için ikinci branş şartı veya yaş sınırı var mıdır?",
      answer: "Genellikle iki branş istense de, Kimya gibi sayısal alanlarda büyük açık olduğu için tek branşla da başlanabilir. Yaş meselesi çok önemli değildir; 50 yaşına yaklaşan öğretmenler bile programlara kabul edilmektedir."
    },
    {
      question: "Kimyagerlik alanında (Chemiker) başarılı olmak için ne gibi eğitimler veya sertifikalar almalıyım?",
      answer: "Tecrübesi olmayanlar için HPLC ve GC kursları şansı yükseltir. Jobcenter karşılıyorsa GMP (İyi Üretim Uygulamaları) sertifikası almak faydalıdır. Ayrıca toksikoloji veya genel kimya alanlarında Weiterbildung alınabilir."
    },
    {
      question: "Deneyimi olmayanlar için kimya sektöründe işe başlarken nasıl bir strateji izlenmelidir?",
      answer: "Tecrübesi olmayanlar, ilk yıl beklentiyi düşük tutarak Chemikant (Kimya Teknisyeni) kadrolarına başvurmalıdır. 'Mesleğimi yapabileceğim boş olan bir pozisyon' talep etmek şansı artırır. Gönüllü çalışmak veya staj yapmak tecrübe için önemlidir."
    },
    // IV. İş Başvurusu ve Mülakat Süreci
    {
      question: "İş görüşmesi (Auswahlgespräch) için nasıl bir hazırlık yapmalıyım?",
      answer: "Kurumun internet sayfası incelenmeli. Kendinizi tanıtma dengeli olmalı. Motivasyonunuzu yüksek tutun. Pedagojik senaryolara (zor öğrenci vb.) yapıcı cevaplar verin (idareye haber verme, veliyle görüşme vb.). Mülakat sonunda mutlaka soru sorun."
    },
    {
      question: "İş başvurusu dosyam (Bewerbung) nasıl hazırlanmalı?",
      answer: "Anschreiben (motivasyon mektubu) ve Lebenslauf (CV) özenli hazırlanmalıdır. CV'de boşluk bırakmamak adına Weiterbildung veya gönüllü çalışmalar eklenmelidir. Belgelerin onaylı fotokopileri eklenmelidir."
    },
    {
      question: "Tecrübem ve Almancam yeterli değilse, işe girmek için nasıl bir yol izlemeliyim?",
      answer: "Dili geliştirmek için sosyal çevrelerde bulunun. CV'de boşluk bırakmamak için düşük maaşla dahi olsa bir işe girin veya gönüllü çalışın. Staj imkanlarını araştırın."
    },
    // V. Jobcenter ve Sosyal Destekler
    {
      question: "Jobcenter iş arayanlara hangi konularda finansal ve eğitim desteği sağlar?",
      answer: "İşsizlik Parası II, danışmanlık, işe giriş parası (Einstiegsgeld) ve gerekli kursların (Weiterbildung, dil kursu) ücretini karşılama gibi destekler sağlar. Ayrıca evin ilk donanımı için bir defaya mahsus ödemeler yapabilir."
    },
    {
      question: "Jobcenter’dan yardım alırken hangi yükümlülüklerimi yerine getirmeliyim?",
      answer: "Beyanları tam ve doğru yapma, gelir ve varlıklardaki değişiklikleri bildirme yükümlülüğünüz vardır. Dil kursuna gitmemek yaptırımlara yol açabilir. İzne gitmek için önceden onay almanız gerekir."
    },
    {
      question: "Eğitim fakültesi mezunlarının maaş beklentileri ne olmalıdır?",
      answer: "Öğretmenlerin genellikle Laborantlardan daha iyi maaş alacağı düşünülmektedir. Sözleşmeli öğretmenlikte maaş medeni durum ve kalifikasyona göre değişir. Kimya sektöründe tecrübesizler için başlangıçta Chemikant pozisyonları önerilir."
    }
  ]
};
