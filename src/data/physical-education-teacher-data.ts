
export const physicalEducationTeacherData = {
  title: "Beden Eğitimi Öğretmenliği",
  slug: "beden-egitimi-ogretmenligi",
  description: "Almanya'ya yeni gelmiş eğitimcilerin mesleki kariyerlerine yönelik oluşturulan detaylı yol haritası rehberi.",
  videoUrl: "", // Video URL eklenecek
  stats: [
    { label: "İhtiyaç", value: "Orta-Yüksek", color: "bg-green-500" },
    { label: "Ortalama Süre", value: "1-3 Yıl", color: "bg-blue-500" },
    { label: "Dil Şartı", value: "B1 - C1", color: "bg-orange-500" },
  ],
  roadmap: [
    {
      step: 1,
      title: "Mesleki Denklik (Anerkennung)",
      description: "Almanya'da öğretmenlik düzenlenmiş (reglementiert) bir meslektir. Mesleki tanınma süreci zorunludur.",
      details: [
        {
          title: "Diploma Değerlendirilmesi (ZAB)",
          content: "ZAB değerlendirmesi (Zeugnisbewertung), yabancı bir üniversite yeterliliğini tanımlayan resmi bir belgedir. Lisans, Yüksek Lisans ve Doktora diploma ve transkriptlerinin ZAB'a gönderilmesi gerekir. Ücreti 200 Euro'dur ve işlem 4-6 ay sürebilir.",
        },
        {
          title: "Mesleki Tanınma (Lehrkräftakademie)",
          content: "Öğretmenlik kökenli herkesin, kendi eyaletlerinde bulunan Lehrkräfteakademie kurumlarına başvurması gerekir. Bu kurumlar, adayın mesleğini Almanya'da hangi şartlar dahilinde yapabileceğini belirten bir rapor verir. Çift branş, Referendariyet ve Hausarbeit gibi eksiklikler çıkabilir.",
        },
        {
          title: "Başlangıç: Agentur für Arbeit",
          content: "İşlemlere başlamadan önce Job Center kariyer danışmanından randevu alınmalı ve Anerkennungberater ile görüşülmelidir. Mesleği yapmak için C1-C2 düzeyinde dile ihtiyaç olduğu rapora yazdırılmalıdır.",
        }
      ]
    },
    {
      step: 2,
      title: "İş İmkanları ve Statüler",
      description: "Almanya'da tek tip öğretmenlik yoktur, çeşitli statülerde çalışma imkanı bulunur.",
      details: [
        {
          title: "Öğretmenlik Statüleri",
          content: "Kadrolu (Beamter), Sözleşmeli (Angestellte), Yan Giriş (Seiteneinstieg), Branş Öğretmeni (Fachlehrer), Ücretli (Honorararbeit) ve Anadil Dersi (HSU) öğretmeni gibi farklı statüler mevcuttur.",
        },
        {
          title: "Alternatif Pozisyonlar",
          content: "Multiprofessionelles Team (MPT) kadroları, Eğitim Asistanı, OGS-Betreuer/in, Özel Eğitim Asistanı (Gölge Öğretmen), Erzieher ve DaZ öğretmeni gibi pozisyonlarda da çalışılabilir.",
        }
      ]
    },
    {
      step: 3,
      title: "Başvuru ve Mülakat",
      description: "İşe alım süreci kişisel kariyer ve yetenek odaklıdır, merkezi atama yoktur.",
      details: [
        {
          title: "Dosya Hazırlığı",
          content: "Anschreiben, Lebenslauf, ZAB değerlendirmesi, Transkriptler, Dil belgesi zorunludur. Çalışılan kurumlardan alınan Arbeitszeugnis avantaj sağlar. Evrakları mümkünse elden teslim etmek ve müdürle tanışmak faydalıdır.",
        },
        {
          title: "Mülakat (Auswahlgespräch)",
          content: "15-30 dakika sürer. Komisyon karşısında yapılır. Alan bilgisi, didaktik, sınıf yönetimi, veli iletişimi gibi konularda sorular sorulur. Mutlaka prova yapılmalı ve hazırlıklı gidilmelidir.",
        }
      ]
    },
    {
      step: 4,
      title: "Dil Yeterliliği",
      description: "Dil yeterliliği işe alım sürecinde en önemli konudur.",
      details: [
        {
          title: "Gereken Seviye",
          content: "Lehrkräfte programları için minimum B1, üniversite kursları için C1 şarttır. Piyasa dili C1 seviyesinin üzerindedir. Akıcı konuşma belgeden daha önemlidir.",
        },
        {
          title: "Dil Kursları",
          content: "Job Center desteğiyle C1/C2 kurslarına katılınabilir. Üniversitelerin hazırlık kursları kalitelidir. Türkçe öğretmenliği düşünenler için Türkçe C1 sertifikası da gereklidir.",
        }
      ]
    }
  ],
  pedagogy: {
    title: "Almanya Eğitim Sistemine Uyum",
    content: "Kapsayıcı Eğitim (Inklusion) ve Ortak Öğrenme (Gemeinsames Lernen) mülakatlarda önemlidir. Farklılaştırma (Differenzierung) ile öğrencilerin seviyelerine uygun ders tasarlanmalıdır. İdeal öğretmen; alan bilgisi, empati, sabır ve esnekliğe sahip olmalıdır.",
    specialNeeds: "Kapsayıcı bir ortam oluşturmak, özel ihtiyaçları olan öğrencileri entegre etmek ve farklı yeteneklere uygun öğretim stratejileri kullanmak beklenir.",
    resources: "Ders Yapısı (45 dk): 1. Selamlama (5dk), 2. Giriş (5dk), 3. Ana Bölüm (20-25dk), 4. Pekiştirme (10dk), 5. Kapanış (5dk)."
  },
  alternatives: [
    {
      title: "Lehrkräfte Programları (LK Plus)",
      description: "Mülteci öğretmenler için 1 yıl teorik + 2 yıl pratik eğitim. İş bulma şansı yüksektir."
    },
    {
      title: "Erzieher/in (Eğitimci)",
      description: "3 yıllık Ausbildung ile okul öncesi eğitimcisi olunabilir. B2/C1 dil ve staj şartı vardır."
    },
    {
      title: "Akademik Kariyer",
      description: "Master veya Doktora (Promotion) yapmak kariyer için avantaj sağlar."
    },
    {
      title: "İş Koçu / Eğitim Danışmanı",
      description: "C1 Almanca ve staj ile sertifika alarak bu alanda çalışılabilir."
    },
    {
      title: "Yetişkin Eğitimi (VHS)",
      description: "Halk eğitim merkezlerinde veya dil kurslarında eğitmenlik yapılabilir."
    }
  ],
  faqs: [
    {
      question: "Türkiye'deki diplomalar Almanya'da doğrudan geçerli midir ve denklik süreci nasıl başlar?",
      answer: "Türkiye'deki devlet üniversitelerinden alınan diplomaların Bologna süreci gereği uluslararası geçerliliği olsa da, Alman makamları ve iş dünyası genellikle Bonn'daki Yabancı Eğitim Merkezi Ofisi'nin (ZAB – Zentralstelle für ausländisches Bildungswesen) değerlendirmesini (Zeugnisbewertung) dikkate alır. ZAB Değerlendirmesi, yabancı bir üniversite yeterliliğini tanımlayan ve Alman işgücü piyasasına erişimi kolaylaştıran resmi bir belgedir. Lisans, Yüksek Lisans ve Doktora diploma ve transkriptlerinin muhakkak ZAB'a gönderilmesi elzemdir. ZAB ücreti 200 Euro'dur ve bu ücret Job Center aracılığıyla ödenebilir. İşlem süresi yaklaşık 4-6 ay sürebilmektedir."
    },
    {
      question: "Öğretmenlik mesleği için asıl denklik başvurusu nereye yapılır ve bu zorunlu mudur?",
      answer: "Evet, öğretmenlik kanun ve yönetmeliklerle düzenlenmiş (reglementiert) meslekler arasında yer aldığı için, mesleki tanınma (Berufliche Anerkennung) zorunludur. Öğretmenlik kökenli herkesin, kendi eyaletlerinde bulunan Lehrkräfteakademie kurumlarına başvurması gerekir (Örn: Hessen'de Gissen, NRW'de Detmold). Bu kurumlar, adayın mesleğini Almanya'da hangi şartlar dahilinde yapabileceğini belirten 3-4 sayfalık bir rapor ile bildirir."
    },
    {
      question: "Öğretmenlik denkliğinde genellikle hangi eksiklikler ortaya çıkar ve bunlar nasıl tamamlanır?",
      answer: "Almanya'da öğretmen olmak için genellikle çift branş zorunluluğu, Referendariyet (stajyerlik) ve Hausarbeit (bitirme çalışması) gibi şartlar aranır. Doktora veya Master tezi, Hausarbeit yerine sayılabilir. Türkiye'deki hizmet cetveli tercümesi (e-devletten 'hitap hizmet dökümü') sunularak Referendariyetten muaf tutulma şansı olabilir. Lisans/Master/Doktora transkriptlerindeki felsefe, sosyoloji, etik gibi derslerin, ikinci branşı tamamlamada sayılması mümkün olabilir."
    },
    {
      question: "Almanya'daki kamu okullarında öğretmen olarak çalışabileceğim kadro türleri ve statüleri nelerdir?",
      answer: "Almanya'da tek tip öğretmenlik bulunmamaktadır. Kadrolu Öğretmen (Beamter) için genellikle çift branş ve AB vatandaşlığı gerekir. Sözleşmeli Öğretmen (Angestellte) süreli veya süresiz olabilir ve VERENA üzerinden başvurulur. Yan Giriş (Seiteneinstieg) tek branş mezunlarına olanak sağlar (LOIS üzerinden). Branş Öğretmeni (Fachlehrer) olarak tek branşla çalışılabilir. Ayrıca Anadil Dersi (HSU) öğretmeni olarak da çalışılabilir."
    },
    {
      question: "Öğretmenliğe alternatif veya denklik süreci devam ederken değerlendirilebilecek pozisyonlar nelerdir?",
      answer: "Multiprofessionelles Team (MPT) kadroları (TVL 10 maaş grubu, süresiz), Eğitim Asistanı (Lehrassistent), OGS-Betreuer/in, Özel Eğitim Asistanı (Gölge öğretmenlik) gibi pozisyonlar mevcuttur. Bu pozisyonlara genellikle B2 Almanca ile başlanabilir. Ayrıca Erzieher, Öğrenci Danışmanı ve DaZ öğretmeni olarak da çalışılabilir."
    },
    {
      question: "Öğretmenler için iş ilanları hangi portallarda yayınlanmaktadır?",
      answer: "NRW için: LOIS (Seiteneinstieg için), VERENA (Sözleşmeli öğretmenlik için), ANDREAS (MPT ve diğer kadrolar için). Ayrıca Schulministerium/Bezirksregierung siteleri, Indeed, StepStone, Arbeitsagentur ve LinkedIn de kullanılabilir."
    },
    {
      question: "İş mülakatına (Auswahlgespräch) hazırlanırken hangi temel konulara odaklanmalıyım?",
      answer: "Mülakatlarda kişisel sorular (motivasyon), alan bilgisi, didaktik ve metodik (ders planı), sınıf yönetimi ve disiplin, kapsayıcı eğitim (Inklusion), işbirliği ve iletişim, ve pedagojik konsept konularına odaklanılmalıdır."
    },
    {
      question: "Sınıfta disiplin sorunları (Unterrichtsstörungen) ortaya çıktığında hangi metodoloji izlenmelidir?",
      answer: "Ring Modeli izlenebilir: 1. Önleme (Kurallar ve rutinler), 2. Erken Müdahale (Sessiz uyarılar), 3. Doğrudan Müdahale (Net uyarı ve talimat), 4. Yoğun Müdahale (Bireysel görüşme, veli işbirliği), 5. Takip ve Yansıtma."
    },
    {
      question: "Kapsayıcı Eğitim (Inklusion) ve Ortak Öğrenme (Gemeinsames Lernen) nedir?",
      answer: "Inklusion, özel ihtiyaçları olan öğrencileri derslere entegre etmek ve tüm öğrencilerin başarılı olabileceği bir ortam sağlamaktır. Gemeinsames Lernen ise tüm öğrencilerin birlikte öğrenebilmesi için dersin düzenlenmesi ve işbirliğinin teşvik edilmesidir."
    },
    {
      question: "Otizm, Duygusal/Sosyal Gelişim Sorunları ve DEHB olan öğrenciler için ne tür destekler sağlanmalıdır?",
      answer: "Otizm (OSB) için net yapılar, rutinler ve görsel araçlar kullanılmalı. Duygusal sorunlar için destekleyici ve öngörülebilir bir ortam sağlanmalı. DEHB için net kurallar, kısa talimatlar verilmeli, görevler parçalara bölünmeli ve pozitif pekiştirme kullanılmalıdır."
    },
    {
      question: "Eleştiri yönelten veya şikayetçi bir veliyle görüşmede nasıl bir yaklaşım sergilenmelidir?",
      answer: "Sakinlik ve empati ile dinlenmeli, durum objektif olarak somut örneklerle açıklanmalı ve çözüm odaklı bir yaklaşım sergilenmelidir. Veliyi işbirliğine teşvik ederek ortak çözüm yolları aranmalıdır."
    },
    {
      question: "Meslektaşlar arasında bir tartışma yaşanırsa ne yapılmalıdır?",
      answer: "Sakin kalınmalı, durum değerlendirilmeli, hatalıysanız sorumluluk alınmalı, 'Ben' dili kullanılarak açık iletişim kurulmalı ve ortak çözüm yolları aranmalıdır."
    },
    {
      question: "Öğretmenlik başvuruları için Almanca dilinde aranan minimum seviye nedir?",
      answer: "Lehrkräfte programları için minimum B1, üniversite kursları için C1 şarttır. İşe alımda belgeden çok akıcı konuşma önemlidir. Türkçe öğretmenliği (HSU) için Türkçe C1 sertifikası da gerekebilir."
    },
    {
      question: "Üniversitelerin sunduğu uygun fiyatlı Almanca kurslarına nasıl kayıt yaptırılabilir?",
      answer: "Üniversitenin bir bölümüne kayıt başvurusu yaparak öğrenci statüsü kazanılabilir. Giriş sınavı için B1 bitirmiş olmak gerekir. Öğrenci kimliği ile toplu taşıma ücretsiz olabilir ve Job Center kursu finanse edebilir."
    }
  ]
};
