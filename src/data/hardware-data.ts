import { ProfessionData } from './types';

export const hardwareData: ProfessionData = {
  title: "IT Donanım ve Sistem Yönetimi",
  slug: "it-donanim",
  description: "Almanya'da IT donanım seçimi, sistem gereksinimleri, yazıcı maliyetleri ve teknik sorun çözme rehberi.",
  videoUrl: "",
  stats: [
    { label: "Önem", value: "Kritik", color: "bg-red-500" },
    { label: "Maliyet", value: "Değişken", color: "bg-blue-500" },
    { label: "Kategori", value: "Donanım & Altyapı", color: "bg-purple-500" },
    { label: "Odak", value: "Fiyat/Performans", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Bilgisayar Seçimi ve Performans",
      description: "Yazılım geliştirme ve eğitim için doğru donanım kriterleri.",
      details: [
        {
          title: "İşlemci ve RAM",
          content: "Yazılım kursları için i5 ve üzeri işlemci, en az 16 GB RAM önerilir. React gibi yoğun projelerde performans için bu kritiktir."
        },
        {
          title: "Depolama ve İşletim Sistemi",
          content: "Mutlaka SSD kullanılmalıdır. Linux Mint gibi hafif işletim sistemleri eski donanımlarda (örn. i5 4. Nesil) bile yüksek performans sağlar."
        }
      ]
    },
    {
      step: 2,
      title: "Yazıcı ve Maliyet Yönetimi",
      description: "Almanya'da yüksek kartuş maliyetlerine karşı çözümler.",
      details: [
        {
          title: "EcoTank Modelleri",
          content: "Epson EcoTank (örn. ET 1810, 2720) gibi doldurulabilir mürekkepli yazıcılar en ekonomik çözümdür."
        },
        {
          title: "Lazer ve İkinci El",
          content: "Lazer yazıcılar (Brother, HP) Media Markt'ta bulunabilir. İkinci el alırken 'Dram Ünitesi' ömrüne dikkat edilmelidir."
        }
      ]
    },
    {
      step: 3,
      title: "Tedarik ve Alışveriş",
      description: "Güvenilir donanım temin kanalları.",
      details: [
        {
          title: "Online ve Mağazalar",
          content: "İkinci el için eBay, yeni ürünler için Amazon ve Media Markt. Taksitli alışveriş için Alternate.de tercih edilebilir."
        },
        {
          title: "Yedek Parça",
          content: "Spesifik batarya ve parçalar için güvenilir satıcılar ve Amazon kullanılabilir."
        }
      ]
    },
    {
      step: 4,
      title: "Teknik Sorun Giderme",
      description: "Sık karşılaşılan donanım ve yazılım sorunları.",
      details: [
        {
          title: "Bakım ve Onarım",
          content: "Yazıcı kafa temizliği ve atık mürekkep haznesi bakımı önemlidir. SSD değişiminde sürücü uyumsuzluklarına (Wi-Fi) dikkat edilmelidir."
        },
        {
          title: "Sanallaştırma",
          content: "Virtual Box (Ücretsiz) veya VMware (Ücretli) ile sanal makine kurulumları yapılabilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Analoji: Maraton ve Malzeme Çantası",
    content: "Almanya'da donanım yönetimi, bir maraton koşusundaki 'hayati teknik malzeme çantası' gibidir. Göç süreci maratonun parkuruysa, bu rehber çantanızdaki ekipmanlardır. Hangi ayakkabının (İşlemci/RAM) sizi yarı yolda bırakmayacağını, susuz kaldığınızda (Yazıcı arızası) hangi istasyona (EcoTank) koşacağınızı ve kramp girdiğinde (Teknik sorunlar) nasıl ilk yardım (Driver/VirtualBox) uygulayacağınızı bilmek, yarışı tamamlamanızı sağlar.",
    specialNeeds: "Donanım uyumluluğu, güç tüketimi hesaplaması (Watt) ve maliyet analizi becerisi gerektirir.",
    resources: "eBay, Amazon.de, Media Markt, Alternate.de, Epson EcoTank serisi."
  },
  faq: [
    // A. Yazıcı Seçimi ve Mürekkep Maliyetleri
    {
      question: "Mürekkep maliyetleri yüksek olduğu için hangi tip yazıcılar (Drucker) tavsiye edilir?",
      answer: "Mürekkep (Tinte) maliyetlerini düşürmek için Epson markasının EcoTank modelleri şiddetle tavsiye edilir. Bu modeller normal doldurmalı olup, mürekkepleri çok ucuzdur ve daha az maliyetli bir çözüm görülmemiştir. Önerilen modeller arasında Epson ET 1810 ve Epson 2720 bulunmaktadır. Alternatif olarak, Brother ve HP lazer yazıcılar (Laserjet) Media Markt'ta 100-120 Euro aralığında bulunabilmektedir."
    },
    {
      question: "Kartuşları (Kartusche) kendimiz doldurmak pratik midir ve nelere dikkat etmeliyiz?",
      answer: "Şırınga (Spritze) ile doldurma yöntemi zahmetli görünse de, maliyeti 'bedavadan biraz pahalıya' getirmektedir. Mürekkep alırken, yazıcınızın kartuşuna uygun olduğundan emin olmalı ve uygunluğu ürün açıklamalarındaki modelden kontrol etmelisiniz. Örneğin, HP 4520 serisi için Amazon'dan uygun mürekkep temin edilmiştir."
    },
    {
      question: "İkinci el (2. el) lazer yazıcı almanın riskleri nelerdir?",
      answer: "İkinci el yazıcı alırken, kaç sayfa baskı (Ausdruck) yaptığı bilinmiyorsa, Dram ünitesinin (Dram Einheit) bitmiş veya az kalmış olma riski vardır. Dram ünitesi oldukça pahalıdır ve ikinci el satışlarda iade (Rückgabe) kolay kolay kabul edilmeyebilir. Örneğin, bir kullanıcı 120.000 sayfa çıktı alınmış bir yazıcıyı zor bela iade edebilmiştir."
    },
    {
      question: "EcoTank yazıcımda kağıdın sağ alt köşesinde mürekkep lekesi oluşuyor, nasıl temizleyebilirim?",
      answer: "Bu sorun genellikle yazıcının kafasının altındaki bölgede biriken atık mürekkepten (Abfall Tinte) kaynaklanır. Vida sökmeden peçete vb. yardımıyla yazıcının kafasını kaldırıp temizleyebilirsiniz. Ayrıca, atık mürekkebin toplandığı haznenin ve içindeki süngerlerin periyodik olarak serviste temizletilmesi gerekebilir."
    },
    // B. Bilgisayar ve Sistem Gereksinimleri
    {
      question: "Yazılım (Software) kursları ve programlama eğitimleri için minimum laptop (Leptop) gereksinimleri nelerdir?",
      answer: "Teorik olarak i3 işlemci ve 8 GB RAM yeterli olsa da, özellikle React gibi yoğun projelerle uğraşılırken yavaşlama olmaması için i5 ve üzeri işlemci (Prozessor) serileri tercih edilmelidir. 8 GB RAM yeterlidir. En önemli tavsiye ise mutlaka SSD (Solid State Drive) kullanılmasıdır."
    },
    {
      question: "Yüksek performanslı veya eski bilgisayarlar için hangi işletim sistemi (Betriebssystem) önerilir?",
      answer: "i5 4. Nesil, 16 GB RAM ve 512 GB SSD gibi bir donanım üzerine Linux Mint işletim sistemi kurulduğunda 'canavar gibi' çalıştığı belirtilmiştir."
    },
    {
      question: "Sanallaştırma (Virtualisierung) yapmak için hangi yazılımları kullanmalıyım?",
      answer: "Ücretsiz seçenek olarak Virtual Box tavsiye edilir. Ücretli profesyonel çözümler ise Windows için VMware Workstation ve Mac için VMware Fusion olarak belirtilmiştir."
    },
    {
      question: "Amd Ryzen 5 işlemciler, yazılım kursları için uygun mudur?",
      answer: "Kaynaklarda bu işlemcinin uygunluğu hakkında bir soru sorulmuş, ancak kesin bir performans bilgisi veya deneyimi paylaşılmamıştır."
    },
    // C. Gelişmiş Donanım ve Sorun Giderme
    {
      question: "Workstation kasasına (Gehäuse) birden fazla yüksek performanslı kart takılabilir mi?",
      answer: "Bu durum tamamen elektriksel hesaplama (Watt) meselesidir. Kasanın çıkış gücü (Ausgangsleistung) dahilinde kalındığı sürece sorun yaşanmaz. Eğer çoğaltıcılar kasanın çıkış gücünden daha fazla güç tüketirse, soğutma fayda vermez ve ekstra çözüm üretmek gerekir. Ayrıca, işlemcilerin ve kartların anakartın (Hauptplatine) desteğine bağlı olduğu unutulmamalıdır."
    },
    {
      question: "Bilgisayarı hızlandırmak için HDD çıkarılıp SSD takıldığında Wi-Fi çalışmazsa ne yapılmalıdır?",
      answer: "Kaynaklarda bu durum bir sorun olarak raporlanmıştır; SSD takıldığında Wi-Fi çalışmazken, HDD geri takıldığında çalışmıştır. Sürücüler (Driver) SSD’de yüklü görünse bile sorun çözülememiştir. Bu konuda Microsoft Answers forumlarında ilgili bir konu olduğu belirtilmiştir."
    },
    {
      question: "Orijinal olmayan (Crackli) Windows veya Office programlarını kullanmak etik midir?",
      answer: "Bu konuda, yazılımların pahalı olması nedeniyle 'fıkhi olarak emek hırsızlığı' yapılıp yapılmadığına dair etik bir tartışma mevcuttur. Kaynaklarda bu soruya yasal veya etik bir cevap verilmemiştir, sadece etik ikilem vurgulanmıştır."
    },
    // D. Tedarik ve Satın Alma İpuçları
    {
      question: "Taksitle veya vade farksız tablet (Tablet) ya da donanım alabileceğim bir site var mı?",
      answer: "Alternate.de sitesi tavsiye edilmiştir."
    },
    {
      question: "Belirli bir mobil cihazın (örneğin Note 10+) orijinal bataryası (Akku) gibi yedek parçaları nerede bulabilirim?",
      answer: "Güvenilir olduğu belirtilen ve sürekli ürün alınan bir tedarikçi numarası paylaşılmıştır: +49 177 6084726."
    },
    {
      question: "Dikey (ergonomik) fare (mouse) tavsiyesi var mı?",
      answer: "Bu konuda bir talep olmuş, ancak kaynaklarda spesifik bir model tavsiyesi sunulmamıştır."
    },
    {
      question: "Ebeveyn kontrolü (Elternkontrolle) için Android ile iPhone kontrol edilebilecek ücretsiz uygulamalar var mıdır?",
      answer: "Family Link genellikle Android tabanlı olduğu için bu ihtiyacı karşılamayabilir. FindMyKids - Handy GPS Tracker uygulaması ücretsiz bir alternatif olarak önerilmiştir."
    }
  ]
};
