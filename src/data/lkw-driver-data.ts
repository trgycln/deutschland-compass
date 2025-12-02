export const lkwDriverData = {
  title: "LKW Fahrer (Tır Şoförlüğü)",
  description: "Almanya'da tır şoförü (LKW Fahrer) olmak isteyenler için ehliyet sınıfları, Kod 95, vize süreçleri ve çalışma şartlarını kapsayan detaylı rehber.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Eğitim Süresi", value: "9 Ay - 3 Yıl", color: "bg-blue-500" },
    { label: "Dil Şartı", value: "B1 (Önerilen)", color: "bg-green-500" },
    { label: "Ortalama Maaş", value: "2.200€ - 2.700€ Net", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Yasal Zemin ve Ehliyet",
      description: "Gerekli ehliyet sınıfları ve mesleki yeterlilik belgeleri.",
      details: [
        {
          title: "Ehliyet Sınıfları",
          content: "Almanya'da kamyon sürmek için C1, C1E, C ve CE sınıfları vardır. CE sınıfı, brüt ağırlık sınırlaması olmadığı için 'birinci sınıf' kabul edilir ve büyük tırlar için gereklidir."
        },
        {
          title: "Mesleki Yeterlilik (Kod 95)",
          content: "Ticari taşımacılık yapabilmek için 'Grundqualifikation' (Temel Nitelik) belgesi şarttır. Bu belge, ehliyete işlenen 'Kod 95' (Schlüsselzahl 95) ile kanıtlanır ve her 5 yılda bir 35 saatlik eğitimle yenilenmesi zorunludur."
        },
        {
          title: "Hızlandırılmış Temel Nitelik",
          content: "IHK sınavı ile alınan 'Beschleunigte Grundqualifikation', güvenlik kuralları, rasyonel sürüş ve yasal mevzuatları kapsar."
        }
      ]
    },
    {
      step: 2,
      title: "Eğitim ve Sertifikalar",
      description: "Dil şartı, kurs içerikleri ve ek belgeler.",
      details: [
        {
          title: "Dil Yeterliliği",
          content: "Genellikle B1 seviyesi istenir. IHK sınavları Almanca olduğu için sadece sertifika değil, gerçek bir anlama ve konuşma becerisi önemlidir."
        },
        {
          title: "Kurs İçeriği (TQ1-Plus)",
          content: "Yaklaşık 9 ay süren kapsamlı eğitimlerde; Mesleki Almanca, C/CE Ehliyeti, Kod 95, Yük Emniyeti, ADR (Tehlikeli Madde) ve Forklift ehliyeti verilir."
        },
        {
          title: "ADR ve Diğer Belgeler",
          content: "Tehlikeli madde taşımak için ADR belgesi şarttır. Ayrıca vinç (Ladekran) veya forklift (Gabelstapler) kullanımı için ek sertifikalar iş bulma şansını artırır."
        }
      ]
    },
    {
      step: 3,
      title: "Vize ve Almanya'ya Giriş",
      description: "Türkiye'den gelecekler için kolaylaştırılmış prosedürler.",
      details: [
        {
          title: "Kolaylaştırılmış Giriş (§24a BeschV)",
          content: "AB dışından gelen şoförler için özel bir düzenleme vardır. İş sözleşmesi olması şartıyla, gerekli belgeleri (Kod 95 vb.) Almanya'da tamamlamak üzere 15 aylık çalışma izni verilebilir."
        },
        {
          title: "Gerekli Belgeler",
          content: "Türkiye'de geçerli LKW ehliyeti, mesleki tecrübe kanıtı ve Almanya'dan bir işverenden alınmış iş teklifi (Einstellungszusage) gereklidir."
        },
        {
          title: "Ehliyet Denkleştirme",
          content: "Türk ehliyetinin Almanya'da geçerli sayılması için denklik (Umschreibung) işlemi yapılmalıdır. Bu süreçte Jobcenter desteği (Bildungsgutschein) mümkündür ancak garanti değildir."
        }
      ]
    },
    {
      step: 4,
      title: "İş Hayatı ve Rutinler",
      description: "Çalışma saatleri, maaşlar ve günlük görevler.",
      details: [
        {
          title: "Çalışma Saatleri ve Molalar",
          content: "Günde en fazla 9-10 saat sürüş yapılabilir. 4.5 saatlik sürüşten sonra 45 dakika mola zorunludur. Haftalık ve günlük dinlenme süreleri sıkı takip edilir (Takograf)."
        },
        {
          title: "Maaş ve Ek Ödemeler",
          content: "Bekar biri için net maaş ortalama 2.200€ - 2.700€ arasındadır. Gece (%25), Pazar (%50) ve fazla mesai (%25) zamları ile gelir artabilir. Ayrıca harcırah (Spesen) ödenir."
        },
        {
          title: "Kalkış Kontrolü (Abfahrtskontrolle)",
          content: "Her sürüş öncesi lastik, fren, ışık ve yük emniyeti kontrolü yasal zorunluluktur. Sürücü, aracın ve yükün güvenliğinden doğrudan sorumludur."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Lojistik Operasyonu Yönetmek",
    content: "Almanya'da LKW şoförlüğü kariyeri, sadece bir TIR çekmekten ibaret değildir; çok katmanlı bir lojistik operasyonu yönetmeye benzer. CE ehliyeti (çekici) size aracı kullanma izni verirken; Kod 95 (Mesleki Yeterlilik) ve ADR (Tehlikeli Madde) belgeleri, bu operasyonun rotasını, yükünü ve güvenlik prosedürlerini yönetme kılavuzunuzdur. Başarı, sadece direksiyonda değil, aynı zamanda Almanca dilinde, yasal belgelerde ve kurallara olan güvenilirlik ve doğruluk (Verlässlichkeit und Genauigkeit) ile kurulan profesyonel imajda gizlidir.",
    specialNeeds: "Dikkat ve konsantrasyon, stres yönetimi, yalnız çalışabilme, düzensiz çalışma saatlerine uyum, teknik temel bilgi.",
    resources: "IHK (Sınav Merkezi), BAG (Federal Yük Taşımacılığı Dairesi), Jobcenter (Bildungsgutschein), TÜV/DEKRA (Eğitim Kurumları)."
  },
  faq: [
    {
      question: "Almanya'da LKW ehliyeti (Führerschein) masraflarını devlet karşılıyor mu?",
      answer: "Evet, Jobcenter (İş Merkezi) veya Arbeitsagentur (İş ve İşçi Bulma Kurumu) tarafından, uygun görülmesi halinde Bildungsgutschein (Eğitim Çeki) aracılığıyla masraflar karşılanabilir. Ancak bu eğitimler pahalı olduğu için (bir kaynakta Jobcenter'ın 35.000 Euro civarında masraf yaptığı belirtilmiştir), Gutschein alma süreci uzun ve zorlu olabilir."
    },
    {
      question: "Jobcenter'dan Gutschein (Eğitim Çeki) alabilmek için Almanca (Deutschkenntnisse) seviyesi şartı nedir?",
      answer: "Bu durum memurun inisiyatifine (keyfine) ve eyalete (Eyalet) göre büyük ölçüde değişmektedir.\n• Resmi ve Kurs Şartları: Bir kursa (Maßnahme) katılmak için B1 seviyesinde Almanca bilgisi talep edilebilir.\n• Jobcenter Uygulaması: Bazı Jobcenter memurları kesinlikle B2 yapılması gerektiğini söyleyebilir. Ancak, A2 dil sertifikası olanlara bile mesleki dil takviyeli eğitim çeki (Gutschein) verildiği, hatta B1'i geçemeyen arkadaşlara bile LKW desteği verildiği tecrübe edilmiştir. Yeni göç yasasıyla dil seviyesinin düşürüldüğüne dair bilgiler olsa da, memurlar uygulamada zorluk çıkarabilmektedir."
    },
    {
      question: "Jobcenter'ın Gutschein vermesini kolaylaştırmak için hangi adımları atmalıyım?",
      answer: "• İş Teklifi (Einstellungszusage): Bir taşımacılık firmasından sizi işe alacağına dair taahhütname (Einstellungszusage veya Anstellungsvertrag Stellenangebotsschreiben) almak bu süreci büyük ölçüde hızlandırır ve Jobcenter'ın kabul etme ihtimalini artırır.\n• Sürücü Kursu Desteği (Fahrschule): Bazı sürücü kursları (Fahrschule) firmalarla bağlantılı çalışır ve bu işe alım taahhüdü belgesini (Einstellungszusage) sizin için ayarlayabilir.\n• İtiraz Hakkı: Eğer Gutschein talebiniz reddedilirse, memurun üst amirine (Şef) şikayette bulunmak (Beschwerde maili atmak) veya yasal yollara başvurmayı hissettirmek faydalı olabilir."
    },
    {
      question: "Ehliyet kursu öncesinde Jobcenter tarafından psikolojik test (Psychologisches Gutachten) veya uygunluk testi yapılıyor mu?",
      answer: "Evet. Jobcenter, eğitim (Weiterbildung) vermeden önce mesleğe uygunluğunuzu ölçmek ve değerlendirmek amacıyla Eignungsfeststellungsmaßnahme (Uygunluk Ölçme Önlemi) adlı bir deneme kursuna veya psikolojik teste yönlendirebilir.\n• İçerik: Bu testler matematik, zekâ, dikkat testi ve Almanca seviyesi gibi konuları içerebilir ve 1,5 saate kadar sürebilir.\n• Sağlık Muayenesi: LKW ehliyeti (Führerschein) için göz, kulak, koordinasyon, tansiyon ve genel vücut muayenesinden oluşan bir sağlık kontrolü (ärztliches Gutachten) gereklidir. Bu ücret (yaklaşık 83-117 Euro) Jobcenter tarafından geri ödenebilir. Bazı yerlerde idrar testi de istenmiştir."
    },
    {
      question: "Hangi LKW ehliyeti sınıfları mevcuttur ve ticari olarak çalışmak için hangisi idealdir?",
      answer: "Almanya'da kamyon sürme hakkı veren CE, C, C1 ve C1E olmak üzere 4 ehliyet sınıfı vardır. CE sınıfı ehliyet (Führerschein CE), brüt araç ağırlığı (Bruttogewicht) açısından pratik bir sınırlama getirmediği için büyük ve ağır kamyon/tır (Sattelzug) kullanmak isteyenler için tavsiye edilen \"birinci sınıf\" ehliyettir."
    },
    {
      question: "Profesyonel sürücü olarak çalışmak için hangi sertifikalara ihtiyacım var?",
      answer: "Ticari yük taşımacılığı (gewerblich fahren) yapabilmek için 3 temel belgeye ihtiyacınız vardır:\n1. Führerschein (CE Ehliyeti).\n2. Fahrerkarte (Sürücü Kartı): Takografa (Tachograph) takılan ve sürüş sürelerini kaydeden karttır. Ehliyet ve IHK sınavından sonra 5 yıl için verilir.\n3. Kod 95 Karte (N95 Karte / Berufskraftfahrer-Qualifikation): Mesleki Sürücü Yeterlilik Yasası (BKrFQG) uyarınca Temel Yeterlilik (Grundqualifikation) veya Hızlandırılmış Temel Nitelik (Beschleunigte Grundqualifikation) belgesidir."
    },
    {
      question: "Kod 95 (BKrFQG) yeterliliği nasıl elde edilir ve yenilenir?",
      answer: "• Elde Etme Yolları (3 Olasılık): Temel yeterlilik (Grundqualifikation) şunlardan biriyle elde edilebilir: BBiG'ye göre tanınmış bir meslekte mesleki eğitim (Ausbildung), Temel Yeterlilik (Grundqualifikation) veya Hızlandırılmış Temel Nitelik (Beschleunigte Grundqualifikation).\n• Sürekli Eğitim (Weiterbildung): Kod 95 belgesi her beş yılda bir yenilenmelidir. Bu yenileme, final sınavı olmaksızın, her biri en az 7 saat olmak üzere 5 modülde toplam 35 saatlik dersten oluşur."
    },
    {
      question: "LKW eğitimi (Weiterbildung) genellikle ne kadar sürer?",
      answer: "Kapsamlı bir eğitim programı (Teilqualifizierung TQ1-Plus), genellikle C/CE ehliyeti, IHK sınavı, ADR ve Forklift eğitimlerini içerir ve toplamda dokuz ay sürebilir. Bazı hızlı kurslar praktikumsuz 3 ay gibi kısa süreler de verebilir."
    },
    {
      question: "IHK Sınavı (Beschleunigte Grundqualifikation) ile ilgili önemli noktalar nelerdir?",
      answer: "• Sınav Formatı: Toplam 60 puan üzerinden en az 30 puan alarak başarılı olunur. Sınavda yaklaşık 60 soru sorulur ve 90 dakika sürer. Bazı sorularda 2 doğru cevap işaretlenmesi gerekebilir.\n• Dil: Sınav Almanca olarak yapılmaktadır. Ancak, IHK sınav sorularının (Türkçeye çevrilmiş) PDF'leri veya App'leri üzerinden çalışmanın (ezberlemenin) çok kolay geçmeyi sağladığı tecrübe edilmiştir.\n• Sürüş Sınavları: C ve CE pratik sınavları, teoriye göre daha zor olabilir. Stresi yönetmek önemlidir."
    },
    {
      question: "Tehlikeli Madde (ADR) ve Forklift (Gabelstapler) sertifikaları zorunlu mudur?",
      answer: "ADR belgesi, tehlikeli madde (Gefahrgut) veya tanker (Tank) taşımacılığı yapacaksanız gereklidir ve iş başvurularında ciddi bir etkisi olduğu için şiddetle tavsiye edilir. ADR sertifikası 5 yıl geçerlidir ve yenilenmelidir.\nKamu trafiğinde kamyona monteli forklift (Mitnahme-Stapler) kullanmak için Flurförderschein (Endüstriyel Kamyon Ehliyeti) zorunludur ve forkliftin StVZO'ya uygun donatılmış olması gerekir."
    },
    {
      question: "Yeni Göç Yasası kapsamında Türkiye'den gelen bir LKW şoförünün Almanya'da çalışma şartları nedir?",
      answer: "• Kod 95 ve Dil Muafiyeti (2023 Kasım): Kasım 2023 itibarıyla, AB üyesi olmayan ülkelerden gelen tır şoförleri (Türkiye vatandaşları dahil) için Kod 95 belgesi ve A1 seviyesinde Almanca dil yeterliliği şartı kaldırılmıştır.\n• Süreç ve Süre: İşvereninizden bir iş teklifi alarak vize başvurusu yapabilirsiniz (Ön onay süreci yaklaşık 2 ay sürer). Almanya'ya giriş yaptıktan sonra, İstihdam Yönetmeliği Madde 24a uyarınca, 15 ay içinde (haklı görülen bireysel durumlarda toplam 21 aya kadar) AB sürücü ehliyetini ve ilgili yeterlilikleri (Kod 95) edinmeniz beklenir.\n• Kullanım Kısıtlaması: Yasa yeni olsa da, pratikte birçok firma, Kod 95 olmadan sürücünün Alman plakalı LKW ile trafiğe çıkmasına izin vermez ve bu süre zarfında firma içinde alternatif bir işte (alternativen Tätigkeit) çalışmasını sağlayabilir."
    },
    {
      question: "Türk CE sınıfı ehliyetimi Almanya'da nasıl denkleştirebilirim (Umschreibung)?",
      answer: "Türkiye'den alınan CE ehliyetinin doğrudan tanınmaması nedeniyle, bunu Alman ehliyetine çevirmek için teorik ve pratik sınavlara girmeniz gerekir."
    },
    {
      question: "LKW şoförlüğü (Nahverkehr - yerel taşımacılık) için ortalama net maaş beklentisi nedir?",
      answer: "Maaşlar eyalete, tecrübeye, yük türüne ve vergi sınıfına (Steuerklasse) göre değişir.\n• Ortalama Net Maaş (Steuerklasse 1): En düşük net maaş 2200 Euro, en yüksek net maaş ise 2700 Euro civarındadır.\n• Yüksek Maaşlar: Tecrübeli şoförler için veya Fernverkehr (uzun mesafe) / Schichtarbeit (vardiyalı çalışma) ile bu rakam 2800-3000 Net Euro'ya kadar çıkabilir (örneğin Edeka, Rewe, Aldi gibi yerlerde)."
    },
    {
      question: "LKW şoförlerinin uyması gereken yasal çalışma süreleri (Lenk- und Ruhezeiten) hangi kanunlarda belirtilmiştir?",
      answer: "3,5 tonun üzerindeki araçlar için sürüş ve dinlenme süreleri, Verordnung (EG) Nr. 561/2006 (AB Sosyal Düzenlemeleri) ve işverenlerin uymak zorunda olduğu Arbeitszeitgesetz (ArbZG - Çalışma Saatleri Yasası) tarafından düzenlenir."
    },
    {
      question: "Bir sürücünün her yolculuktan önce yapması gereken \"Kalkış Kontrolü\" (Abfahrtskontrolle) neleri içerir?",
      answer: "Kalkış kontrolü, tehlikeli madde taşıyan araçlar dahil, her sürüşten önce veya günlük yapılmalıdır. Kontrol maddeleri arasında şunlar bulunur:\n• EG Kontrol Cihazı (Takograf): Sürücü kartının takılması ve cihazın kontrolü. Dijital takografta sürüş sonunda çıkış (Ausgang) yapılmalıdır.\n• Fren Sistemi: İşletme ve park freninin görsel muayenesi, fren testi sırasında 0,7 bar'dan fazla basınç kaybı olup olmadığının kontrolü.\n• Lastikler/Tekerlekler: Lastik boyutunun araç ruhsatına göre kontrolü, lastik basıncının, profil derinliğinin (minimum 1,6 mm) ve hasarın kontrolü. Lastik basıncı çok yüksekse lastiğin ortasının aşındığı bilinmelidir.\n• Güvenlik Malzemeleri: Uyarı lambası, uyarı üçgeni, uyarı yeleği, ilk yardım çantası (Verbandskasten) kontrolü. İki akslı LKW'ler için takoz (Unterlegkeil) zorunludur."
    },
    {
      question: "Bir aracın aşırı yüklü (Überladung) olduğunu nasıl anlarım?",
      answer: "Tartım sertifikası (Wiegebescheinigung) veya taşıma belgesi ile ruhsat belgesi (Zulassungsbescheinigung Teil I) karşılaştırılarak anlaşılabilir. Teknik olmayan belirtiler ise şunlardır:\n• Lastiklerin aşırı derecede sıkışmış görünmesi.\n• Lastikler ve çamurluklar arasındaki mesafenin normalden çok az olması.\n• Süspansiyon hareketinin normalden daha az olması.\n• Aracın arka tarafının ön taraftan daha alçak eğimli durması.\n• Direksiyonun normalden daha ağır olması."
    },
    {
      question: "Yük Emniyeti (Ladungssicherung) kimin sorumluluğundadır?",
      answer: "Yükün yeterli şekilde emniyete alınmasından taşımaya dahil olan herkes (sürücü, gönderici/yükleyici, taşıyıcı) sorumludur. Gönderici, sürücüye yükü emniyete almak için gerekli tüm araçları sağlamalı ve aracın yüklemesini kontrol etmelidir."
    },
    {
      question: "Yurtdışı taşımacılıkta (Uluslararası) hangi belgeler zorunludur?",
      answer: "• AB İçinde Ticari Taşımacılık: AB ruhsatının (EU-Lizenz) onaylı bir kopyası (beglaubigte Abschrift) her yolculukta taşınmalıdır, orijinali şirket merkezinde kalır.\n• Uluslararası Karayolu Yük Taşımacılığı: Almanya'dan Fransa'ya gibi uluslararası taşımalar için CMR (Eşyaların Karayolundan Uluslararası Nakliyatı İçin Mukavele Sözleşmesi) şartları zorunludur. CMR sevk irsaliyesi 3 orijinal nüsha olarak düzenlenir (Gönderen, Taşıyıcı, Sürücü/Eşlik Eden Belge)."
    },
    {
      question: "LKW ve Otobüs (Bus) ehliyetlerini aynı anda almak veya arka arkaya almak mümkün müdür?",
      answer: "Kaynaklar, hem LKW (C/CE) hem de Bus (D) ehliyetini aynı anda veya arka arkaya yapmak için hiçbir Jobcenter'ın onay vermediğini belirtmektedir. LKW ehliyeti alındıktan sonra otobüs ehliyeti istenirse Jobcenter genellikle 6 ila 8 bin Euro arasında bir meblağın kişinin kendisi tarafından ödenmesi gerektiğini söyler."
    },
    {
      question: "Bir LKW şoförü, yolculuk sırasında yükü ve varış yeri hakkında nasıl davranmalıdır?",
      answer: "Hırsızların bilgi edinmesini önlemek için, yabancılarla yük, rota ve varış yeri hakkında konuşulmamalı ve nakliye belgeleri araç içinde açıkta (dışarıdan görülebilir şekilde) bırakılmamalıdır. Bir otoyol servis istasyonunda tanımadığınız diğer sürücülerle konuşurken, yükünüz ve yolculuğunuzun nereye gittiği sorulursa hiçbir bilgi verilmemesi ve başka bir konuya geçilmesi doğru davranıştır"
    }
  ]
};
