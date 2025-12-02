export const physicsTeacherData = {
  title: "Fizik Öğretmenliği",
  slug: "fizik-ogretmenligi",
  description: "Almanya'da Fizik Öğretmenliği (Physik Lehrkräfte) için denklik süreci, Lehrkräfte programları, dil gereksinimleri ve kariyer fırsatları hakkında kapsamlı rehber.",
  videoUrl: "", // Video URL'si varsa buraya eklenebilir
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Eğitim", value: "Denklik / Tamamlama", color: "bg-blue-500" },
    { label: "Sektör", value: "Eğitim & Bilim", color: "bg-emerald-500" },
    { label: "Maaş", value: "€3.500 - €5.500", color: "bg-purple-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Yasal Zemin: Diploma Değerlendirme ve Mesleki Tanınma",
      description: "Göç sürecinin başlangıcında diplomaların Almanya'da geçerlilik kazanması.",
      details: [
        {
          title: "ZAB Değerlendirmesi (Bewertung)",
          content: "Diplomaların (Lisans, Master, Doktora) ilk olarak Bonn'daki Yabancı Eğitim Merkez Ofisi'ne (ZAB) gönderilmesi şarttır. ZAB'ın yaptığı işlem 'Değerlendirme'dir ve mesleki 'Tanınma' (Anerkennung) yerine geçmez. Bu işlem, diplomanızın Alman eğitim sistemindeki karşılığını gösterir."
        },
        {
          title: "Mesleki Tanınma (Anerkennung)",
          content: "Öğretmenlik düzenlenmiş (reglementiert) bir meslek olduğu için, Anerkennung olmadan çalışmak mümkün değildir. Eyaletlerdeki Öğretmen Akademilerine (Lehrkräfteakademie) başvurulmalıdır (Örn: Hessen'de Gießen, NRW'de Detmold, BW'de Tübingen). Bu kurumlar, adayın mesleğini hangi koşullarda yapabileceğine dair bir rapor hazırlar."
        },
        {
          title: "Gerekli Evraklar ve Onay (Beglaubigung)",
          content: "Diplomalar ve transkriptlerin tercümeleri, Belediyede (Beglaubigung - aslı gibidir onayı) yapılmış nüshalar olarak gönderilmelidir. Tercümeler, diplomanın fotokopisiyle birlikte zımbalanmış halde onaylatılmalıdır. Fen-Edebiyat mezunları, formasyonları varsa 'Öğretmenlik (Lehramt)' mezunu statüsünde başvurabilir."
        }
      ]
    },
    {
      step: 2,
      title: "Dil Yeterliliği ve İkinci Branş",
      description: "Resmi öğretmenlik için dil ve branş şartları.",
      details: [
        {
          title: "Dil Seviyesi (C1/C2)",
          content: "Resmi öğretmen (amtlich Lehrer) olmak için Almanca C1 (hatta C2) seviyesi gereklidir. Lehramt için C2 sertifikası veya kurum sınavı istenebilir. Ancak sözleşmeli öğretmenlik için B2 (bazen B1) ile başlanabilir; mülakattaki motivasyon sertifikadan daha etkili olabilir."
        },
        {
          title: "İkinci Branş Zorunluluğu",
          content: "Fizik öğretmenlerinin sene kaybı yaşamaması için C1 seviyesinden sonra ikinci branş için pedagoji üniversitesine kayıt yaptırmaları önerilir. Türkiye'deki Master/Doktora transkriptlerindeki sosyoloji, felsefe, psikoloji gibi dersler ikinci branş tamamlamada sayılabilir."
        }
      ]
    },
    {
      step: 3,
      title: "Kariyer Yolları ve İş Bulma Stratejileri",
      description: "Lehrkräfte programları ve alternatif giriş yolları.",
      details: [
        {
          title: "Mesleki Hazırlık Programları (Lehrkräfte Programme)",
          content: "ILF, Lehrkräfte_Plus, Inter Teach, OBAS gibi programlar, mülteci/uluslararası öğretmenlerin sisteme uyumunu sağlar. Başvuru için en az lisans derecesi ve 2 yıl deneyim gerekir. Başarılı mezuniyet, süresiz sözleşmeli (unbefristet) öğretmenlik yolunu açar. Başvuru tarihleri üniversitelere göre değişir (Örn: Bochum 1 Ekim-11 Kasım, Bielefeld 15 Ocak-28 Şubat)."
        },
        {
          title: "Alternatif Giriş Yolları",
          content: "Ücretli Öğretmenlik (Honorararbeit), Girişim Başvurusu (Initiativbewerbung) ve Yarı Zamanlı (Teilzeit) çalışma mümkündür. MPT (Alternatif Kadro) pozisyonları, süresiz çalışma, uzun tatil ve not verme zorunluluğu olmaması gibi avantajlar sunar. Ayrıca Öğretmen Asistanlığı veya Okul Eşlikçiliği de seçenekler arasındadır."
        }
      ]
    },
    {
      step: 4,
      title: "Başvuru Belgeleri ve Mülakat Süreci",
      description: "İşe alım sürecinde başarı için ipuçları.",
      details: [
        {
          title: "Gerekli Belgeler ve CV",
          content: "Anschreiben (Başvuru Yazısı), Lebenslauf (Özgeçmiş), ZAB/Anerkennung belgeleri, Transkriptler, Dil ve Uyum Kursu belgeleri şarttır. CV'de tüm çalışmalar, kurslar ve özellikle 'Gönüllü (Ehrenamtlich)' çalışmalar yer almalıdır. Motivasyon mektubunda meslek sevgisi ve Türkiye'deki proje/olimpiyat tecrübeleri vurgulanmalıdır."
        },
        {
          title: "Mülakat (Auswahlgespräch) Stratejileri",
          content: "Kendinizi doğal tanıtın, hobilerinizden bahsedin. Ulaşımın sorun olmayacağını belirtin. Pedagojik sorularda (huzur bozan öğrenci) 'kahraman olmayın'; idare, sosyal pedagog ve veli işbirliğini vurgulayın. Fizik branşı için deney tecrübenizi mutlaka anlatın."
        }
      ]
    },
    {
      step: 5,
      title: "Varış ve Sosyal Güvence",
      description: "Jobcenter yardımları ve yaşam.",
      details: [
        {
          title: "Jobcenter Yardımları",
          content: "Çalışma yeteneği olan, yardıma muhtaç kişiler İşsizlik Parası II (Bürgergeld) alabilir. Temel ihtiyaçlar ve kira karşılanır. Türkiye'deki mal varlığı (emekli maaşı dahil) mutlaka bildirilmelidir; gizlenmesi durumunda yaptırımlar uygulanır."
        },
        {
          title: "Eğitim Alternatifleri",
          content: "Denklik süreci uzayanlar için 'Ausbildung/Umschulung' (Erzieher, Makinist, Fizyoterapi vb.) veya Doktora (Promotion) seçenekleri mevcuttur. Doktora öğrencileri dönem harcı ödeyerek toplu taşımayı ücretsiz kullanabilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Fizik Öğretiminde Pedagoji ve Sınıf Yönetimi",
    content: "Almanya'da fizik dersleri, Türkiye'den farklı olarak daha az formül ve hesaplama içerir; temel seviyede ve kavramsal işlenir. Derslerde deney yapmak (Experimente) çok önemlidir ve dersin merkezindedir. Anlatım, tartışma ve grup çalışması yöntemleri sıkça kullanılır.",
    specialNeeds: "OSB veya DEHB olan öğrencilerle çalışırken net yapılar, rutinler, görsel destekler ve kısa talimatlar kullanılmalıdır. Görevler küçük parçalara bölünmeli ve pozitif pekiştirme sağlanmalıdır.",
    resources: "Disiplin problemlerinde 5 aşamalı müdahale (Uyarma -> Tecrit -> Yazı Yazdırma -> Sınıftan Çıkarma -> Veli İrtibatı) uygulanabilir. Veli iletişiminde sakin, empatik ve çözüm odaklı olunmalı; meslektaşlarla iletişimde 'Ben' dili kullanılmalıdır."
  },
  faq: [
    {
      question: "Türkiye’den alınan Fizik diploması Almanya’da doğrudan öğretmenlik yapmaya yeterli midir?",
      answer: "Hayır, doğrudan yeterli değildir. Öğretmenlik Almanya'da düzenlenmiş (reglementiert) bir meslektir. Öncelikle ZAB'dan diploma değerlendirmesi (Bewertung) alınmalı, ardından eyaletlerdeki Öğretmen Akademilerine (Lehrkräfteakademie) başvurarak mesleki tanınma (Anerkennung) süreci başlatılmalıdır. Fen-Edebiyat mezunları, formasyonları varsa 'Öğretmenlik' mezunu olarak başvurabilir."
    },
    {
      question: "Öğretmenlik Programlarına ve resmi öğretmenliğe kabul için gerekli Almanca düzeyi nedir?",
      answer: "Lehrkräfte Programları (ILF, Lehrkräfte_Plus vb.) için genellikle B2 seviyesi istenir. Resmi öğretmenlik (amtlich Lehrer) için ise C1 ve hatta C2 seviyesi hedeflenmelidir. Ancak sözleşmeli öğretmenlik için B1/B2 sertifikası ile başvurup, mülakattaki motivasyonu sayesinde kabul alan adaylar da mevcuttur."
    },
    {
      question: "Fizik öğretmenleri için Lehrkräfte Programlarına kabul şansı nedir?",
      answer: "Fizik, Matematik, Kimya gibi branşlar bu programlarda önceliklidir. Ancak kontenjanlar sınırlıdır (Örn: Bochum'da 350 başvurudan 25 kişi). Programı bitirenlerin iş bulma şansı %90'ın üzerindedir ve süresiz sözleşme (unbefristet) imkanı sunar."
    },
    {
      question: "Mülakat (Auswahlgespräch) sırasında Fizik Öğretmenlerine ne gibi sorular sorulur?",
      answer: "Fizik alanında 'en sevdiğiniz konular', 'fiziğin alt alanları' gibi soruların yanı sıra, 'kız öğrencilerin ilgisini nasıl çekersiniz?', 'öğrenme güçlüğü çeken öğrenciye yaklaşımınız' gibi pedagojik sorular sorulur. Gönüllü çalışmalarınızdan bahsetmek büyük avantaj sağlar."
    },
    {
      question: "Fizik Öğretmenleri için öğretmenlik dışında hangi alternatif kariyer yolları mevcuttur?",
      answer: "Fizikçiler; Finans ve Sigortacılık (aktüerya, risk analizi), IT ve Yazılım (Software test analyst, veri analizi), Mühendislik (otomasyon, optik, fotonik) gibi alanlarda çalışabilirler. Bu alanlar genellikle Master derecesi ve iyi derecede İngilizce/Almanca gerektirir."
    },
    {
      question: "Almanya’da Fizik dersinin içeriği Türkiye’deki müfredatla kıyaslandığında nasıldır?",
      answer: "Almanya'da (özellikle Gymnasium dışındaki okullarda) fizik dersleri daha temel seviyededir ve ağır matematiksel işlemler (türev, integral) içermez. Dersin merkezinde 'deney yapmak' (Experimente) vardır. Konular kavramsal düzeyde ve günlük hayatla ilişkilendirilerek işlenir."
    },
    {
      question: "Deneyimi olmayan veya dil süreci devam eden bir Fizik Öğretmeni sisteme nasıl adım atabilir?",
      answer: "İlk etapta ücreti önemsemeden tecrübe kazanmak (Gönüllü/Ehrenamtlich çalışma) çok önemlidir. Okullarda gözlemci (Hospitation) olarak bulunmak veya yardımcı öğretmen (Schulbegleiter) olarak çalışmak, sisteme giriş için etkili yollardır."
    },
    {
      question: "Sınıfı rahatsız eden bir öğrenciye karşı hangi pedagojik adımları izlemelidir?",
      answer: "Aşamalı bir disiplin yöntemi izlenir: 1. Sözlü Uyarı, 2. Tecrit Etme (yer değiştirme), 3. Yazı Yazdırma (Abschreiben), 4. Sınıftan Çıkarma (varsa Trainingsraum'a gönderme), 5. Veli İletişimi. Olağan dışı durumlarda idare ve sosyal pedagog ile işbirliği yapılmalıdır."
    }
  ]
};
