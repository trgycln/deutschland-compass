export const careerGuideData = {
  title: "Ausbildung, Weiterbildung ve Kariyer Rehberi",
  description: "Almanya'da yeni bir meslek edinmek (Ausbildung), mevcut yeteneklerinizi geliştirmek (Weiterbildung) veya diplomanızı tanıtmak (Anerkennung) isteyenler için kapsamlı yol haritası.",
  videoUrl: "https://www.youtube.com/embed/hcik-vnk_cw",
  sections: [
    {
      id: "mesleki-taninma",
      title: "I. Mesleki Tanınma ve Denklik (Anerkennung)",
      content: "Almanya'da kariyerinize devam etmek için ilk adım, mevcut niteliklerinizin Alman sistemi tarafından nasıl görüldüğünü anlamaktır.",
      subsections: [
        {
          title: "A. Akademik ve Mesleki Denklik",
          items: [
            {
              subtitle: "ZAB (Zeugnisbewertung) Nedir?",
              text: "Bonn'daki ZAB (Zentralstelle für ausländisches Bildungswesen), üniversite diplomanızın Almanya'daki karşılığını gösteren resmi bir belge verir. Bu 'tam denklik' (Anerkennung) değildir, sadece mezuniyetinizin akademik seviyesini tescil eder. İş başvurularında ve vize süreçlerinde çok önemlidir."
            },
            {
              subtitle: "Öğretmenlik İçin Denklik (Anerkennung)",
              text: "Öğretmenlik 'düzenlenmiş' (reglementiert) bir meslektir. Tam denklik için eyalet bakanlıklarına (Lehrkräfteakademie) başvurulur. NRW'de genellikle C2 Almanca ve iki branş istenirken, Brandenburg gibi eyaletlerde B2 Almanca ve tek branş ile başlanabilir."
            },
            {
              subtitle: "Lise Diploması Denkliği",
              text: "Üniversite mezunu olsanız bile, bir Ausbildung'a (mesleki eğitim) başvururken lise diplomanızın denkliği istenebilir. Bu işlem eyaletinizdeki sorumlu kurum (Bezirksregierung vb.) tarafından yapılır ve 1 ay kadar sürebilir."
            }
          ]
        },
        {
          title: "B. Kritik Belgeler ve İpuçları",
          list: [
            "Anschreiben (Motivasyon Mektubu): Standart kalıplardan kaçının. Türkiye ve Almanya'daki tecrübelerinizi, neden bu işi istediğinizi anlatan size özel bir mektup yazın.",
            "Lebenslauf (Özgeçmiş): Alman formatına uygun, tarih boşluğu olmayan bir CV hazırlayın.",
            "Çeviri ve Apostil: Türkiye'de yapılan apostilli çeviriler geçerlidir. Eğer Jobcenter'dan yardım alıyorsanız ve çeviri masrafını kendiniz ödediyseniz, red alsanız bile faturayı saklayın; ileride geri ödeme talep edebilirsiniz.",
            "Arbeitszeugnis: Eski işyerlerinizden alacağınız referans mektupları çok değerlidir."
          ]
        }
      ]
    },
    {
      id: "ausbildung-weiterbildung",
      title: "II. Ausbildung ve Weiterbildung Fırsatları",
      content: "Kendi mesleğinizi yapamıyorsanız veya değiştirmek istiyorsanız, Almanya size birçok eğitim fırsatı sunar.",
      subsections: [
        {
          title: "A. Eğitim Türleri Arasındaki Farklar",
          table: {
            headers: ["Tür", "Nedir?", "Kimler İçin?", "Örnekler"],
            rows: [
              {
                type: "Ausbildung",
                areas: "Sıfırdan meslek öğrenimi (2-3 yıl). Hem okul hem iş.",
                desc: "Her yaş grubu. Genellikle B2 Almanca gerekir.",
                examples: "Erzieher, Pflege, Makinist, Elektrik"
              },
              {
                type: "Weiterbildung",
                areas: "Mevcut mesleği geliştirme veya yan dal ekleme.",
                desc: "Diploması olanlar. Süre daha kısadır.",
                examples: "GIS (Coğrafya), IT Güvenlik, Kalite Yönetimi"
              },
              {
                type: "Umschulung",
                areas: "Tamamen yeni bir mesleğe geçiş eğitimi.",
                desc: "İşsiz kalanlar veya mesleği geçersiz olanlar.",
                examples: "Yazılımcı (Fachinformatiker), LKW Şoförü"
              }
            ]
          }
        },
        {
          title: "B. Popüler Meslek Alanları",
          items: [
            {
              subtitle: "Erzieher/in (Eğitmen)",
              text: "Çok yüksek talep var. Genellikle C1 Almanca istenir ancak B2 ile başlayan yerler de vardır. Eğitim öncesi 240 saatlik 'Vorpraktikum' (ön staj) şartı olabilir. Alternatif olarak 2 yıllık 'Kinderpfleger' veya 'Sozialassistent' eğitimiyle başlayıp sonra Erzieherliğe geçmek daha kolay olabilir."
            },
            {
              subtitle: "Sağlık ve Bakım (Pflege)",
              text: "Hastanelerde ve bakımevlerinde büyük açık var. 'Pflegefachfrau/mann' eğitimi AB genelinde geçerlidir. B1/B2 seviyesiyle başlanabilir."
            },
            {
              subtitle: "Teknik ve IT Alanları",
              text: "Coğrafya/Biyoloji mezunları için GIS (Coğrafi Bilgi Sistemleri), diğerleri için Siber Güvenlik veya Web Tasarım 'Weiterbildung'ları popülerdir."
            }
          ]
        },
        {
          title: "C. İltica ve Red Durumunda Ausbildung",
          text: "İltica başvurusu reddedilenler için 'Ausbildungsduldung' hayat kurtarıcı olabilir. Bir Ausbildung sözleşmesi yapmak, deport sürecini durdurabilir (3 yıl eğitim + 2 yıl çalışma izni)."
        }
      ]
    },
    {
      id: "is-bulma-alternatifler",
      title: "III. Eğitim Sektöründe Alternatif İşler",
      content: "Öğretmenlik denkliğini beklerken veya alamazsanız okul ortamında çalışabileceğiniz başka pozisyonlar da vardır.",
      subsections: [
        {
          title: "A. Okul İçi Pozisyonlar",
          list: [
            "MPT (Multiprofessionelles Team): Okul psikologları, sosyal hizmet uzmanları ile birlikte çalışılan kadrolar.",
            "Schulbegleiter (Gölge Öğretmen): Özel gereksinimli bir öğrenciye birebir destek olmak. Genellikle yarı zamanlıdır (15-18 saat) ve 900-1000€ civarı gelir getirir.",
            "Honorararbeit (Ücretli Öğretmenlik): Okul müdürüyle görüşüp valilik onayıyla ders saati başına ücretli çalışmak.",
            "OGS / Hausaufgabenbetreuung: Okul sonrası etüt ve ödev yardımı."
          ]
        }
      ]
    },
    {
      id: "finansal-destek",
      title: "IV. Finansal Destekler (Jobcenter & BAföG)",
      content: "Eğitim alırken veya iş ararken devletin sunduğu maddi destekleri doğru kullanmak önemlidir.",
      subsections: [
        {
          title: "A. Jobcenter (Bürgergeld)",
          items: [
            {
              subtitle: "Haklar ve Ödemeler",
              text: "Kira, ısınma ve temel geçim (Regelleistung) karşılanır. Eğitim masraflarını (Umschulung/Weiterbildung) karşılaması için memurunuzu ikna etmeniz (iş arama çabası, red mektupları) gerekir."
            },
            {
              subtitle: "Yükümlülükler ve Yaptırımlar (Sanktionen)",
              text: "Randevulara gitmek (Meldepflicht) ve değişiklikleri bildirmek zorunludur. Kurallara uyulmazsa yardım %30'a kadar kesilebilir."
            }
          ]
        },
        {
          title: "B. Eğitim Destekleri (BAföG)",
          items: [
            {
              subtitle: "Aufstiegs-BAföG",
              text: "Erzieherlik gibi ileri mesleki eğitimler için verilir. Yaş sınırı yoktur. Üniversite mezunları da alabilir. Genellikle yarısı hibe, yarısı faizsiz kredidir."
            },
            {
              subtitle: "Berufsausbildungsbeihilfe (BAB)",
              text: "Ausbildung yaparken maaşınız yetmezse kira ve geçim için ek destek sağlar."
            }
          ]
        }
      ]
    },
    {
      id: "egitim-ipuclari",
      title: "V. Eğitim ve Pedagoji İpuçları",
      content: "Alman eğitim sistemine entegre olurken bilmeniz gereken pedagojik yaklaşımlar.",
      subsections: [
        {
          title: "A. Sınıf Yönetimi",
          text: "'Ring Modell' (Halka Modeli) uygulanır: 1. Önleme (Kurallar), 2. Erken Müdahale (Bakış/Uyarı), 3. Müdahale. Otizmli veya DEHB'li öğrenciler için net rutinler ve görsel destekler şarttır."
        },
        {
          title: "B. İletişim",
          text: "Veli şikayetlerinde savunmaya geçmeyin, 'Ben' dili kullanın ('Ben böyle hissettim...'). Çözüm odaklı olun ve somut örnekler verin."
        }
      ]
    }
  ],
  analogy: {
    title: "Kariyer Navigasyonu",
    text: "Almanya'daki kariyeriniz bir navigasyon cihazı gibidir. Konumunuz 'Anerkennung', hedefiniz 'Meslek'. Rotalarınız ise 'Ausbildung', 'Weiterbildung' veya 'Doğrudan İş'. Jobcenter ve BAföG sizin yakıt istasyonlarınızdır; kurallara uymazsanız ceza (Sanktion) yersiniz. Doğru rotayı seçmek için esnek olmalısınız."
  },
  faqs: [
    {
      question: "ZAB değerlendirmesi (Zeugnisbewertung) ile Denklik (Anerkennung) arasındaki fark nedir?",
      answer: "ZAB, diplomanızın akademik seviyesini (örneğin 'Alman lisans derecesine eşdeğerdir') belgeleyen bir tespittir. Anerkennung ise mesleğinizi icra etme yetkisi veren tam denkliktir. Öğretmenlik, doktorluk gibi düzenlenmiş mesleklerde ZAB yetmez, ilgili bakanlıktan Anerkennung (Berufserlaubnis) almak gerekir."
    },
    {
      question: "İltica başvurum reddedildi, yine de Ausbildung yapabilir miyim?",
      answer: "Evet, 'Ausbildungsduldung' (Eğitim Müsamahası) kuralı sayesinde, sınır dışı edilme (deport) kararı olan kişiler bir mesleki eğitim (Ausbildung) sözleşmesi imzalarlarsa, eğitim süresince (genellikle 3 yıl) ve sonrasında çalışmak için 2 yıl daha Almanya'da kalma hakkı kazanabilirler."
    },
    {
      question: "Ausbildung için yaş sınırı var mıdır?",
      answer: "Hayır, Almanya'da Ausbildung için yasal bir üst yaş sınırı yoktur. 30, 40 hatta 50 yaşındaki kişiler de Ausbildung yapabilir. Özellikle Erzieher (Eğitmen) ve Pflege (Bakım) alanlarında olgun adaylar tecrübeleri nedeniyle tercih bile edilebilir."
    },
    {
      question: "Üniversite mezunuyum, neden Ausbildung yapayım?",
      answer: "Diplomanızın tam denkliği yoksa veya alanınızda iş bulamıyorsanız, Ausbildung size garantili bir meslek ve B2/C1 seviyesinde Almanca pratiği kazandırır. Ayrıca Alman sistemine entegre olmanın ve sosyal çevre edinmenin en hızlı yoludur."
    },
    {
      question: "Jobcenter eğitim masraflarımı karşılar mı?",
      answer: "Evet, Jobcenter 'Bildungsgutschein' (Eğitim Çeki) ile Umschulung veya Weiterbildung masraflarını karşılayabilir. Ancak bu otomatik bir hak değildir; iş bulma şansınızı artıracağını memurunuza kanıtlamanız (iş başvuruları, red cevapları vb.) gerekir."
    },
    {
      question: "Schulbegleiter (Gölge Öğretmen) olarak ne kadar kazanırım?",
      answer: "Schulbegleiter pozisyonları genellikle yarı zamanlıdır (haftada 15-20 saat). Saat ücreti veya aylık maaş üzerinden, genellikle 900€ - 1200€ arasında bir gelir elde edilebilir. Bu iş, okul sistemini tanımak için harika bir başlangıçtır."
    },
    {
      question: "Erzieher (Anaokulu Öğretmeni) olmak için Almanca seviyesi ne olmalı?",
      answer: "Resmi olarak çoğu okul C1 seviyesi ister. Ancak personel açığı nedeniyle bazı kurumlar B2 seviyesi ile de kabul edebilir. Eğitim dili Almanca olduğu için B2'nin altında bir seviyeyle dersleri takip etmek çok zordur."
    },
    {
      question: "Aufstiegs-BAföG nedir, geri ödemesi nasıldır?",
      answer: "Mesleki yükselme eğitimidir (örneğin Erzieherlik). Yaş sınırı yoktur. Üniversite mezunları da başvurabilir. Genellikle verilen paranın bir kısmı hibe (geri ödenmez), bir kısmı ise düşük faizli kredidir. Başarıyla mezun olursanız kredi borcunun bir kısmı daha silinebilir."
    }
  ]
};
