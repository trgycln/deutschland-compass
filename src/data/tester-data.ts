import { ProfessionData } from './types';

export const testerData: ProfessionData = {
  title: "Yazılım Test Uzmanlığı (Software Tester / QA)",
  slug: "yazilim-test-uzmanligi",
  description: "Almanya'da Yazılım Test Uzmanlığı (QA), otomasyon, sertifikalar ve kariyer fırsatları rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Orta-Yüksek", color: "bg-orange-500" },
    { label: "Maaş (Ort.)", value: "€55.000", color: "bg-purple-500" },
    { label: "Sektör", value: "Yazılım Kalite", color: "bg-blue-500" },
    { label: "Dil", value: "İngilizce (Öncelikli)", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Eğitim ve Hazırlık",
      description: "Kurs seçimi, teknolojik odak ve sertifikasyon.",
      details: [
        {
          title: "Kurslar ve Süreç",
          content: "Genellikle 6 aylık kurslar (Bootcamp) tercih edilir. Bazı programlar 2 aylık staj içerir. Jobcenter destekli kurslar da mevcuttur."
        },
        {
          title: "Teknolojiler",
          content: "Selenium, Java, Cucumber ve Test Otomasyonu (Automation) odaklı eğitimler yaygındır. SDET (Software Development Engineer in Test) eğitimi Avrupa'da geçerlidir."
        },
        {
          title: "Sertifikasyon",
          content: "ISTQB sertifikası (CTFL 2018) iş başvurularında kritik öneme sahiptir. Sınav içeriği uluslararası standartlardadır."
        }
      ]
    },
    {
      step: 2,
      title: "Dil Yeterliliği",
      description: "İngilizce ve Almanca'nın iş bulmadaki rolü.",
      details: [
        {
          title: "İngilizce'nin Gücü",
          content: "IT alanında İngilizce, mülakatlarda ve günlük iş akışında anahtar roldedir. İyi İngilizce, Almanca eksikliğini kapatabilir."
        },
        {
          title: "Almanca Durumu",
          content: "Sıfır Almanca ile iş bulanlar mevcuttur, ancak Almanca öğrenmek iş bulma sürecini hızlandırır ve kolaylaştırır."
        }
      ]
    },
    {
      step: 3,
      title: "Pratik Tecrübe ve Portfolyo",
      description: "Canlı projeler, staj ve GitHub kullanımı.",
      details: [
        {
          title: "Canlı Projeler",
          content: "Ücretsiz online projeler veya 'Live Projects' ile tecrübe kazanmak önemlidir. Takım çalışmaları motivasyonu artırır."
        },
        {
          title: "GitHub Yönetimi",
          content: "Projelerin GitHub'a yüklenmesi ve 'Contribution' (katkı) sayısının yüksek tutulması teknik profil için önemlidir."
        }
      ]
    },
    {
      step: 4,
      title: "İş Arama ve Mülakat",
      description: "Başvuru zamanlaması ve hazırlık ipuçları.",
      details: [
        {
          title: "Erken Başvuru",
          content: "Kurs bitimini beklemeden, 6. aydan itibaren başvurulara başlanması tavsiye edilir."
        },
        {
          title: "Yapay Zeka Desteği",
          content: "CV hazırlarken ve dil kontrolü için ChatGPT, DeepL gibi araçlar kullanılabilir, ancak hatalara karşı dikkatli olunmalıdır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sektör Analojisi: İnşaat Denetimi",
    content: "Yazılım Test Uzmanlığı, bir inşaat projesinin denetçisi olmaya benzer. Yazılımcılar binayı (kodu) inşa ederken, siz elinizdeki planlara (test senaryoları) ve araçlara (Selenium, Java) bakarak duvarların sağlamlığını, kapıların açılıp açılmadığını kontrol edersiniz. Sadece binanın bitmesini beklemek (kurs sonu) yetmez; inşaat sürerken denetimlere başlamak (erken başvuru) ve kullanılan malzemeleri (teknolojiler) iyi tanımak gerekir. İngilizce, bu şantiyenin uluslararası iletişim dilidir.",
    specialNeeds: "Detaylara dikkat, analitik düşünme ve sabır gerektirir. Hata bulma ve raporlama yeteneği esastır.",
    resources: "ISTQB.org, Selenium.dev, Cucumber.io, GitHub, Udemy (Test Automation kursları)."
  },
  faq: [
    {
      question: "Yazılım Testçisi (Software Tester) kursları genellikle ne kadar sürer ve hangi konuları kapsar?",
      answer: "Test otomasyonu (Test Automation) kursları genellikle 6 aylık bir süreyi kapsar. Bazı programlarda 6 aylık kursun ardından 2 aylık staj (Praktikum) dönemi de bulunabilir. Eğitimlerde sıklıkla Selenium, Java ve Cucumber gibi teknolojiler işlenmektedir. SDET (Software Development Engineer in Test) eğitimi, dünyada ve Avrupa'da geçerliliği olan ve tavsiye edilen bir alan olarak görülmektedir."
    },
    {
      question: "Almanca eğitim dili olan tester kursları var mı ve Jobcenter desteği sağlanıyor mu?",
      answer: "Evet, eğitim dili Almanca (Deutsch) olan tester kursları mevcuttur ve aktif olarak araştırılmaktadır. Ayrıca, Jobcenter destekli (Jobcenter unterstützt) Software Tester kurslarının hangileri olduğu da sıkça sorulan konular arasındadır."
    },
    {
      question: "Almanya'da Tester olarak çalışmak için Almanca (Deutsch) şart mı?",
      answer: "Almanca öğrenmek iş bulma sürecini daha kolay hale getirse de, kaynaklardaki deneyimler sıfır Almanca ile iş bulanların olduğunu ve bunun mümkün olduğunu göstermektedir."
    },
    {
      question: "İngilizce'nin (Englisch) rolü nedir?",
      answer: "Eğer İngilizce bilginiz iyiyse, Almancanız çok iyi olmasa bile aradaki fark kapatılabilmektedir. İngilizce; Türkiye'den gelenlerin daha aşina olduğu bir dil olduğu için, bazıları tarafından Almancaya göre daha tercih edilebilir olarak görülmektedir."
    },
    {
      question: "Kurs bitimini beklemeli miyim, yoksa iş başvurularına ne zaman başlamalıyım?",
      answer: "Kursun bitimini beklemeye gerek yoktur, çünkü iş arama ve mülakat (Interview) hazırlıkları zaman alan süreçlerdir. Tavsiye edilen, kursun 6. ayından sonra iş başvurusu yapmaya başlamaktır. Aynı zamanda interview hazırlıklarına da başlanmalıdır."
    },
    {
      question: "Başvuru sürecinde hangi sertifika önemli bir rol oynuyor?",
      answer: "İş başvurusu (Bewerbung) yaparken ISTQB sertifikası önemli bir noktadır. Adaylar, özellikle ISTQB CTFL 2018 sınavına dair tecrübeleri ve sınavın Türkiye'de veya Avrupa'da yapılmasının fark yaratıp yaratmayacağını (uygulamanın dünyada aynı olup olmadığı) merak etmektedirler."
    },
    {
      question: "İş başvurusu öncesi canlı projeler (live Projekte) veya pratik tecrübe nasıl edinilebilir?",
      answer: "İş tecrübesi olmayanlar için ücretsiz online projelere katılmak bir seçenektir. Ayrıca, kursu bitiren ancak iş tecrübesi olmayan kişilerden ekip kurularak şirketlerden alınan test işlerini tamamlamak suretiyle tecrübe kazanıldığı bir modelin varlığı da (örneğin ABD’de) tartışılmıştır."
    },
    {
      question: "Uzaktan Staj (Remote Internship) imkanları mevcut mu?",
      answer: "Evet, özellikle İngilizce ve Rusça gibi dilleri ileri seviyede bilen yetenekli gençler için Remote Internship imkanları sıkça araştırılan bir konudur."
    },
    {
      question: "GitHub’daki (contribution) aktifliğimi yönetirken nelere dikkat etmeliyim?",
      answer: "GitHub'da eski, kullanılmayan projeleri silerseniz, o projelerin yapıldığı günlerdeki görünen aktifliğiniz (contributions) de silinir. Aynı günde birden fazla push yapmış olsanız bile, silme işlemi contribution sayısını azaltacaktır. Ayrıca, geliştirme ortamından (örneğin IntelliJ) projeyi GitHub'a gönderirken sadece ilk repository açılışının katkı olarak sayılması ve sonraki dosya gönderimlerinin sayılmaması gibi teknik sorunlar yaşanabilmektedir."
    },
    {
      question: "Almanca CV (Lebenslauf) kontrolü için yapay zeka (Künstliche Intelligenz) araçlarını kullanmak güvenli midir?",
      answer: "DeepL, ChatGPT veya Gemini gibi yapay zeka dil modellerinin, Almanca CV'lerin dil açısından kontrol edilmesi sürecinde çok iyi iş çıkardığı belirtilmektedir. Ancak, bu araçlar kullanılırken dikkatli olunmalıdır, zira zaman zaman yanlışlar yapabildiği ve doğruymuş gibi görünen hatalı bilgiler verebildiği yönünde uyarılar bulunmaktadır."
    },
    {
      question: "Tecrübe paylaşımı ve motivasyon için neler yapılabilir?",
      answer: "Tecrübe paylaşımı, birlikte çalışma ve iş bulma sürecine kadar motivasyon sağlama gibi konularda çalışmak isteyenlerin bir araya gelerek takım oluşturması önerilmektedir."
    }
  ]
};
