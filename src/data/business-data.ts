import { ProfessionData } from './types';

export const businessData: ProfessionData = {
  title: "İşletme, İktisat ve Maliye",
  slug: "isletme-iktisat",
  description: "Almanya'da İİBF mezunları için kariyer, denklik, kamu sektörü fırsatları ve mesleki yönelim rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-green-500" },
    { label: "Sektör", value: "Kamu & Özel", color: "bg-blue-500" },
    { label: "Dil", value: "Almanca (B2/C1)", color: "bg-red-500" },
    { label: "Denklik", value: "Zeugnisbewertung", color: "bg-purple-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Dil ve Denklik Süreci",
      description: "Kariyerin temeli: Almanca ve diploma tanıma.",
      details: [
        {
          title: "Dil Yeterliliği",
          content: "İş piyasası için B2 asgari, C1 tavsiye edilen seviyedir. Kamu ve ofis işleri için akıcı Almanca şarttır. Gönüllü çalışmalar (Ehrenamt) dil pratiği için önerilir."
        },
        {
          title: "Diploma Tanıma (Zeugnisbewertung)",
          content: "İİBF mezunları için genellikle 'Zeugnisbewertung' (Üniversite Diploması Denklik Belgesi) yeterlidir. AÖF mezunları dahil, diplomalar genellikle 'Bachelor' (Lisans) olarak kabul edilir."
        }
      ]
    },
    {
      step: 2,
      title: "Mesleki Yönelim ve Eğitim",
      description: "Jobcenter destekli eğitimler ve kariyer yolları.",
      details: [
        {
          title: "Weiterbildung (İlerleme Eğitimi)",
          content: "Mevcut uzmanlığı artırmak için 6 aylık kurslar. Önerilen alanlar: Finansal Muhasebe (Finanzbuchhaltung), Vergi (Steuerlehre), SAP S/4 HANA ve DATEV."
        },
        {
          title: "Umschulung (Meslek Değiştirme)",
          content: "Yeni bir meslek için 2 yıllık eğitimler. 30-50 yaş arası için 'Verwaltungsfachangestellte' (İdari Memurluk) veya IT alanına geçiş mantıklı olabilir."
        }
      ]
    },
    {
      step: 3,
      title: "Kamu Sektörü (Öffentlicher Dienst)",
      description: "İİBF mezunları için en güvenli liman.",
      details: [
        {
          title: "Pozisyonlar",
          content: "'Sachbearbeiter' (Uzman/Dosya İşleyicisi) en yaygın pozisyondur. Lisans mezunları E9-E12 (Gehobener Dienst), Master mezunları E13-E15 (Höherer Dienst) maaş gruplarına başvurabilir."
        },
        {
          title: "Avantajlar",
          content: "İş güvencesi yüksektir, ekonomik krizlerden etkilenmez. Çalışma saatleri düzenlidir. AB vatandaşı olmayanlar 'Sözleşmeli Personel' (Angestellte) olarak çalışabilir."
        }
      ]
    },
    {
      step: 4,
      title: "Özel Sektör ve Alternatifler",
      description: "Muhasebe, Finans ve IT fırsatları.",
      details: [
        {
          title: "Muhasebe ve Finans",
          content: "Muhasebe bürolarında açık çoktur. Gönüllü stajlarla tecrübe kazanılabilir. Bankacılık için Deutsche Bank veya Socialbee programları takip edilebilir."
        },
        {
          title: "IT ve Siber Güvenlik",
          content: "Dil bariyerini aşamayanlar veya alan değiştirmek isteyenler için IT sektörü güçlü bir alternatiftir. Siber Güvenlik kursları Jobcenter tarafından desteklenebilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Analoji: Yapboz Stratejisi",
    content: "Kariyer stratejisi, bir yapbozun parçalarını birleştirmeye benzer: Türkiye'den getirdiğiniz lisans derecesi (Zeugnisbewertung) yapbozun çerçevesini oluşturur. Almanca (B2/C1) ve mesleki uzmanlık (Weiterbildung/Umschulung) ise bu çerçevenin içini dolduran ve sizi iş piyasasında görünür kılan temel parçalardır. Ne kadar çok parçayı doğru yere koyarsanız (çok başvuru yapmak, network kurmak), tablo o kadar hızlı tamamlanır.",
    specialNeeds: "Kamu sektörü başvurularında bürokrasiye hakimiyet ve detaycı bir başvuru dosyası (Bewerbungsunterlagen) hazırlamak kritiktir.",
    resources: "Interamt (Kamu ilanları), Jobcenter (Bildungsgutschein), Udemy (IT hazırlık), Yerel Kariyer Portalları."
  },
  faq: [
    // I. DİL YETERLİLİĞİ VE İŞ BULMA
    {
      question: "İşletme/İktisat mezunları için Almanya'da minimum Almanca (Deutsch) dil seviyesi ne olmalıdır?",
      answer: "Kariyer yapmak için B2 seviyesi genellikle yeterli olarak görülse de, dili daha da geliştirmek ve hedeflere ulaşmak için C1 seviyesi tavsiye edilmektedir. Kamu kurumlarında çalışmayı hedefleyen İİBF mezunları için, iş görüşmelerindeki sorulara iyi cevap verebilmek adına dilin ileri seviyede olması önemlidir. Piyasada konuşulan Almanca'nın genellikle C1 seviyesinin çok üzerinde olduğu belirtilmiştir."
    },
    {
      question: "Başlangıçta Türkçe veya İngilizce (Englisch) kullanılan bir işte çalışmak Almancamı nasıl etkiler?",
      answer: "Kaynaklar, Almanca temelli işlerde çalışmanın uzun vadede daha yararlı olacağını gösteriyor. Türkçe veya İngilizce ile girilen işlerde (başlangıçta kolay gözükse bile) Almanca seviyesinde gerileme olduğu ve bu durumun işten ayrılma sonrası yeni iş olanaklarını kısıtladığı deneyimlenmiştir."
    },
    {
      question: "Dilimi geliştirmek ve tecrübe edinmek için ne yapabilirim?",
      answer: "Dil pratiğini geliştirmek ve ağ (Network) kurmak için gönüllü çalışma (Ehrenamtlich arbeiten) şiddetle önerilmektedir. Gönüllü çalışma, özellikle C1 sözlü sınavında tam puan almaya katkı sağlamıştır. Gönüllü çalışma ilanlarına yerel gazetelerden, kiliselerden (Kirchen) veya sosyal kuruluşlardan (Kinderschutzbund dernekleri, Caritas, Diakonie vb.) ulaşılabilir."
    },
    // II. DİPLOMA DENKLİĞİ (ANERKENNUNG) VE EĞİTİM
    {
      question: "Türkiye'deki İşletme/İktisat/Maliye lisans diplomasının Almanya'daki karşılığı nedir? Denklik almam şart mı?",
      answer: "İşletme bölümünün Almanca karşılığı genellikle Betriebswirtschaftslehre (BWL)'dir. Kamu Yönetimi (Kamu Verwaltung) mezunları da bu gruba dahil kabul edilir. İİBF mezunları, uzaktan eğitim (AÖF) mezunları dahi dahil olmak üzere, diplomalarını Almanya'da lisans (Bachelor) olarak tanıtabilirler. Diplomaların tanınması (Zeugnisbewertung) işlemini Bonn'da bulunan Die Zentralstelle für ausländisches Bildungswesen (ZAB) yapar. Bu belge, kişinin Almanya'daki bir üniversite mezunu ile eşit statüde olduğunu gösterir."
    },
    {
      question: "Diploma denklik süreci (Anerkennung) için hangi belgeleri hazırlamalıyım ve tercüme zorunlu mu?",
      answer: "Denklik işlemleri için başvuru yapılması gerekmektedir. Başvuru süreci 4 ila 6 ay sürebilir. Gerekli belgeler arasında mezun olunan okulların belgeleri, transkriptler (ders notları) ve varsa tez özetlerinin çevirileri bulunmaktadır. Güncel tecrübelere göre, tercüme artık zorunlu değildir; belgelerin belediye onaylı (Beglaubigung) fotokopilerinin yeterli olduğu belirtilmiştir. Ancak bazı durumlarda noter onaylı Türkçe ve Almanca belgeler talep edilebilir. Diplomanızda evlenmeden önceki soyadınız yazıyorsa, Evlilik Cüzdanı fotokopisinin de eklenmesi gerekir."
    },
    {
      question: "Yüksek lisans (Master) yapmak veya mesleki eğitim (Weiterbildung/Umschulung) almak iş bulma şansımı artırır mı?",
      answer: "Evet. Diplomanız tanındıktan sonra, meslek ile ilgili ilerleme eğitimi (Weiterbildung) alıp iş aramak şansı artırır. Özellikle muhasebe alanında SAP veya DATEV gibi güncel programlar üzerine Weiterbildung yapmak tavsiye edilir. Finans alanında çalışmak isteyenler için CAMS Sertifikası hazırlığı içeren 'AML CFT Spezialist Training' gibi eğitimler bulunmaktadır. Kendi ilgi alanınıza uygun konularda Umschulung (genellikle 2 yıl) yapmak da önemli bir seçenektir."
    },
    // III. KARİYER YOLLARI VE İŞ BAŞVURUSU
    {
      question: "İİBF mezunları için Almanya'da en mantıklı ve kolay iş bulma yolu nedir?",
      answer: "İİBF mezunları için en kolay iş bulma yolu kamu kurumları (Öffentlicher Dienst) olarak görülmektedir. Kamuda işten çıkarma durumu ekonomik kriz dolayısıyla dahi yoktur ve ödemeler garantilidir. Kamuda çalışma koşullarının Türkiye ile kıyaslandığında daha rahat olduğu ve sosyal statüsünün iyi olduğu düşünülmektedir."
    },
    {
      question: "Kamuda hangi pozisyonlara başvurabilirim ve hangi maaş grupları hedeflenmelidir?",
      answer: "Kamuda çalışılabilecek ana pozisyon Sachbearbeiter (Uzman/Dosya İşleyicisi) pozisyonudur. Üniversite mezunları (Bachelorabschluss) Gehobener Dienst olarak adlandırılan E9 ila E12 maaş gruplarına başvurabilir. Yeni başlayan İİBF mezunlarının, deneyim kazanmak için, alan ayırmadan E6'dan E9b'ye kadar olan bütün işlere başvurmaları tavsiye edilir."
    },
    {
      question: "Hiç iş tecrübem (Erfahrung) olmamasına rağmen iş bulabilir miyim?",
      answer: "Evet, tecrübeniz olmasa bile iş bulmanız mümkündür. Tecrübe eksikliğini kapatmak için staj (Praktikum) yapmak veya gönüllü çalışma (Ehrenamt) faydalı olacaktır. Tecrübesi olmayanların bile, dile ve diğer eksikliklere takılmadan çok sayıda başvuru yapması (örneğin günlük 5-10, toplamda 300-500 başvuru) tavsiye edilmektedir."
    },
    {
      question: "Muhasebe ve finans alanlarında kariyer yapmak için hangi kurs ve programlar önemlidir?",
      answer: "Muhasebe ve vergi (Steuer) alanında eleman ihtiyacı yüksektir. İş bulma şansını artırmak için SAP (örn. SAP S/4 HANA FI/CO) veya DATEV gibi güncel muhasebe yazılımları üzerine Weiterbildung yapmak önemlidir. Finans alanında özellikle CAMS Zertifikat hazırlığı sunan eğitimler ile finans kurumlarında AML CFT Spezialist Training gibi alanlara yönlenilebilir."
    },
    {
      question: "İşletme/İktisat mezunu olarak, dil konusunda zorlanırsam Bilişim (IT) alanına yönelmem mantıklı bir alternatif midir?",
      answer: "Evet, eğer dil konusunda zorlanılıyorsa ve belli bir uzmanlık alanı yoksa IT alanı mantıklı bir yönelim olabilir. İşletme diploması olan ve IT geçmişi olmayan kişiler dahi Siber Güvenlik Mühendisi (Cybersecurity Engineer) kurslarına (Türkçe ders anlatımı ve mesleki Almanca dil desteği ile) katılabilmektedir. Bu kurslar genellikle Jobcenter tarafından desteklenmektedir."
    },
    {
      question: "Başörtülü (Tesettürlü) bir kadın, Almanya'da kamu kurumlarında veya büro alanında çalışabilir mi?",
      answer: "Kaynaklarda başörtülü çalışmanın yasak olmadığı ve bu konuda çalışanların olduğu ima edilmektedir. Ayrıca, 'Almanya'da Tesettürlü Kadınların Çalışması' konulu bilgilendirme videolarının paylaşıldığı görülmüştür."
    },
    // IV. JOB CENTER VE SOSYAL HAKLAR
    {
      question: "İş Merkezi (Jobcenter) bana Weiterbildung veya Umschulung konusunda nasıl yardımcı olabilir?",
      answer: "Jobcenter/Agentur für Arbeit, iş hayatına giriş yardımı (Eingliederung in Arbeit) kapsamında kursları Eğitim Kuponu (Bildungsgutschein) ile destekleyebilir. Görevlinin size iş yönlendirmesi yapmak için yeterli zamanı veya bilgisi olmayabileceği için, sizin aktif olarak bir kurs teklifi götürmeniz gerekir. Eğer bir işe başvurduğunuzda kurs eksikliği nedeniyle reddedilirseniz, bu belgeyi Jobcenter'a sunduğunuzda o kursu size vermek zorunda kalabilirler."
    },
    {
      question: "Jobcenter yardımı (Arbeitslosengeld II/Hartz IV) alırken Türkiye'deki mal varlığımı ve emekli maaşımı bildirmek zorunda mıyım?",
      answer: "Evet, Jobcenter'a mal varlığınızı (Vermögen) ve gelirinizi tam ve doğru olarak bildirmek zorundasınız. Emekli maaşı, ev veya arsa mülkiyeti dahil para ile ölçülebilir tüm varlıklar (yurtdışında olsa bile) mal varlığı sayılır. Eksik ya da yanlış bilgi verilmesi durumunda, haksız olarak alınan ödemeleri iade etmek zorunda kalabilirsiniz ve yasal yaptırımlarla karşılaşabilirsiniz."
    }
  ]
};
