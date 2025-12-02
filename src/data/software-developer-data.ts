import { ProfessionData } from './types';

export const softwareDeveloperData: ProfessionData = {
  title: "Yazılım Geliştirici (Software Developer)",
  slug: "yazilim-gelistirici",
  description: "Almanya'da yazılım geliştirici olmak için gereken eğitimler, çalışma kültürü ve kariyer ipuçları.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Maaş (Ort.)", value: "€65.000", color: "bg-purple-500" },
    { label: "Sektör", value: "Bilişim", color: "bg-blue-500" },
    { label: "Dil", value: "İngilizce / Almanca (B1+)", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Kariyer Ortamına Hazırlık",
      description: "İş pazarı, dil gereksinimleri ve eğitim yolları.",
      details: [
        {
          title: "İş Pazarı ve Dil",
          content: "Çok fazla eleman açığı vardır. Başlangıç maaşları siber güvenlikle benzerdir. Almanca (B1+) iş arama sürecinde büyük avantaj sağlar, ancak İngilizce de işe girmeyi kolaylaştırır."
        },
        {
          title: "Eğitim Yolları",
          content: "Bootcamp'ler (Clarusway, Cydeo, Eurotechstudy vb.) popülerdir. Kurumsal kurslar (WBS vb.) bazen yetersiz kalabilir. 2 yıllık Umschulung (IHK sertifikalı) sağlam bir alternatiftir."
        }
      ]
    },
    {
      step: 2,
      title: "İş Hayatının Doğası",
      description: "Çalışma şekli, otonomi ve görev yönetimi.",
      details: [
        {
          title: "Çalışma Şekli",
          content: "Aciliyet ve zaman baskısı azdır (HotFix hariç). AGILE yöntemle (Sprint) çalışılır. Developer, Ticket alır ve kendi temposunda çalışır. Otonomi yüksektir."
        },
        {
          title: "Öğrenme Eğrisi",
          content: "Öğrenme eğrisi diktir; Junior seviyede bile çok bilgi gerekir. Ancak işe girdikten sonra eksikleri tamamlamak için zaman vardır. Asıl iş kod yazmaktır, tool kullanımı araçtır."
        }
      ]
    },
    {
      step: 3,
      title: "İletişim ve Uzmanlık",
      description: "İletişim becerileri ve niş roller.",
      details: [
        {
          title: "İletişim Becerileri",
          content: "Aşırı iletişim becerisi gerektirmez. Müşteriyle muhatap olma durumu azdır. Kodunuz sizden çok konuşur. Siber güvenlikte ise iletişim daha yoğundur."
        },
        {
          title: "Öne Çıkan Alanlar",
          content: "Java/SQL, Full Stack Web, Mobile (iOS/Android), Flutter, .Net (C#), Salesforce, ETL/EDI, Game Developer."
        }
      ]
    },
    {
      step: 4,
      title: "Kariyer ve Gelecek",
      description: "Uzaktan çalışma ve kariyer sebatı.",
      details: [
        {
          title: "Çalışma Şekli",
          content: "Remote (uzaktan) çalışma imkanı yüksektir. Firmalar global yeteneklere açıktır."
        },
        {
          title: "Kariyer Tavsiyesi",
          content: "Meslekte sebat etmek ve iş-yaşam dengesini kurmak önemlidir. Yazılımı seçen biri, siber güvenlik alanına geçmek isterse de avantajlıdır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sektör Analojisi ve İpuçları",
    content: "Developer'lık kariyeri, bir maraton koşucusuna benzer. Pist (öğrenme eğrisi) başta çok diktir ve koşuya başlamak (Junior seviyesinde bilgi sahibi olmak) yüksek çaba gerektirir. Ancak bir kez yola çıktıktan sonra (işe girdikten sonra), koşunun temposunu (çalışma saatleri ve görevler) büyük ölçüde kendiniz belirlersiniz ve acil durum zili nadiren çalar. Siber Güvenlik ise bir itfaiyeci gibidir; öğrenme süreci daha yataydır, ancak sürekli nöbet tutulur ve her an yüksek acil durum baskısı altında hızlı tepki vermeniz (Rufbereitschaft) gerekir.",
    specialNeeds: "Bireysel çalışma disiplini çok önemlidir. Kursla birlikte kendi kendine öğrenme (self-study) başarının anahtarıdır.",
    resources: "Clarusway, Cydeo, Eurotechstudy (Bootcamp'ler). IHK sertifikası. Intellij, Eclipse (IDE'ler)."
  },
  faq: [
    {
      question: "İş bulma açısından Developer (Yazılım Geliştirme) mı yoksa Siber Güvenlik (Cyber Security) mi daha avantajlıdır?",
      answer: "İş bulma açısından çok büyük bir fark olmadığı düşünülmektedir. Almanya'da hem Developer hem de Siber Güvenlik alanlarında çok fazla eleman açığı bulunmaktadır. Başlangıç maaşları da her iki alanda da hemen hemen aynı seviyededir. İlerleyen yıllar için her ikisinde de uzmanlaşma imkanı mevcuttur."
    },
    {
      question: "Yazılım Geliştiriciliğin öğrenme eğrisi ve başlangıç bilgi gereksinimi nasıldır?",
      answer: "Yazılım geliştiriciliğin öğrenme eğrisi bence daha diktir. En basit seviyede (Junior) bir geliştirme işine girişte bile birçok bilgiye sahip olmak gereklidir. Ancak bu, öğrenilemeyecek bir şey değildir; işe girdikten sonra ve size görevler (Ticket) tahsis edildikçe eksik bilgiyi tamamlamak için yeterince zamanınız olacaktır."
    },
    {
      question: "Siber Güvenlik ve Developer rollerinin günlük iş akışı ve çalışma şekli arasındaki temel farklar nelerdir?",
      answer: "Çalışma şekli ve günlük iş akışı birbirinden oldukça farklıdır.\n\n• Developer: Asıl iş kod yazmaktır. Acil durum (HotFix) nadirdir. AGILE yöntemiyle (Sprint) çalışılır, otonomi yüksektir. İletişim ihtiyacı daha azdır.\n• Siber Güvenlik: Mevcut sistemleri kontrol etmek ve önlem almaktır. Acil durumlar ve vardiya (Rufbereitschaft) olabilir. Daha fazla yazılı/sözlü iletişim gerektirir."
    },
    {
      question: "Yazılım geliştirmeden hoşlanan ancak süreci zor bulanlar için hangi alternatif Developer rolleri tavsiye edilir?",
      answer: "Yazılım geliştirmeden hoşlanan ancak süreci zor ve uzun bulanlar için Test Automation (Test Otomasyonu) veya SDET (Software Development Engineer in Test) tam size göre olabilir. Bu rolde yazılım takımının içinde kalırsınız ancak ilk aşamada sizden beklenenler daha azdır. SDET alanında kendini geliştirmek, DevOps alanına göre nispeten daha kolaydır."
    },
    {
      question: "Developer alanından Siber Güvenlik alanına geçiş yapmak mümkün müdür?",
      answer: "Evet. Yazılım geliştirmeyi seçen birinin pişman olmasına gerek yoktur, zira en kötü senaryoda, Siber Güvenlik alanında tercih edilecek ilk kişi yine Developer alanından gelen aday olacaktır."
    },
    {
      question: "Almanya'da Developer olmak için hangi eğitim yolları veya kurslar öneriliyor?",
      answer: "Farklı bootcamp ve eğitim programları mevcuttur:\n1. Bootcamp'ler: Clarusway (Full Stack), Cydeo (Java), Eurotechstudy (Mobile) gibi kurumlar popülerdir.\n2. Kurumsal Kurslar: Bazı büyük firmaların kursları (örn. WBS) çok resmi ve içerik olarak zayıf bulunabilmektedir.\n3. Umschulung: İki yıllık mesleki yeniden eğitim de sağlam bir alternatiftir."
    },
    {
      question: "Kurs seçiminde dikkat edilmesi gereken en önemli nokta nedir?",
      answer: "Kurum dışından kurs alınmaması tavsiye edilir. Aksi durumda, verilen birçok sözün tutulmadığına ve kalitesiz bir eğitim alma ihtimalinin çok yüksek olduğuna dair tecrübeler mevcuttur. Ayrıca, kursun kalitesinden bağımsız olarak, bireyde güzel bir motivasyon ve kursla birlikte bireysel çalışmanın çok önemli olduğu vurgulanmıştır."
    },
    {
      question: "IHK sertifikası Developer pozisyonları için önemli midir?",
      answer: "IT gruplarında IHK (Industrie- und Handelskammer) sertifikası alıp almamak ya da sınav hazırlık grupları olup olmadığı sıkça konuşulmaktadır. Resmi bir yeterlilik belgesi olarak işe alımda avantaj sağlayabilir."
    },
    {
      question: "Developer pozisyonlarında Almanca dil bilgisi ne kadar gereklidir?",
      answer: "Almanca bilgisi işe girmeyi kolaylaştırmaktadır. Örneğin, tecrübeli bir Java/SQL developer pozisyonu için B1 Almanca seviyesi şartı aranmıştır. Hatta 13 yıllık iOS tecrübesi olan bir adayın bile iş bakarken B1 sınavına hazırlandığı belirtilmiştir."
    },
    {
      question: "Hangi spesifik developer veya IT rolleri kaynaklarda gündeme gelmiştir?",
      answer: "Kaynaklarda şu pozisyonlar tartışılmıştır:\n• Java/SQL Developer\n• Mobile Development (iOS ve Android)\n• Full Stack Web Developer\n• Mid level Flutter mobil geliştiricisi\n• Dot.net (C#)\n• Salesforce Admin ve Developer\n• ETL / EDI / SEEBURGER\n• Game Developer\n• 3D-Entwickler"
    },
    {
      question: "Developer pozisyonlarında uzaktan (Remote) çalışma imkanı var mıdır?",
      answer: "Evet, hem Developer hem de Siber Güvenlik alanlarında Remote imkanı (uzaktan çalışma) mevcuttur. Firmalar daha ucuz iş gücü talep ettiği için uzaktan çalışma olasılıkları yükselmektedir."
    },
    {
      question: "IT sektöründe kariyer sebatı hakkında genel bir gözlem var mıdır?",
      answer: "Üç yıl sonra meslekte ünsiyet (sıkılma) yaşanmaması pek mümkün görünmemektedir. Önemli olan sevilen işi yapmaktan ziyade, sebat etmek (gayret göstermek) ve iş yaşam dengesini kurabilmektir."
    }
  ]
};
