import { ProfessionData } from './types';

export const sapData: ProfessionData = {
  title: "SAP Danışmanlığı ve Geliştirme",
  slug: "sap-uzmanligi",
  description: "Almanya'da SAP kariyeri, modüller, eğitim yolları ve iş fırsatları rehberi.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-red-500" },
    { label: "Maaş (Ort.)", value: "€70.000", color: "bg-purple-500" },
    { label: "Sektör", value: "Kurumsal Yazılım", color: "bg-blue-500" },
    { label: "Dil", value: "Almanca (B2+) / İngilizce", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Alan Seçimi ve Hazırlık",
      description: "Kariyer hedefine göre doğru SAP modülünü seçmek.",
      details: [
        {
          title: "Alanlar",
          content: "Sistem Yönetimi (BASIS), Yazılım Geliştirme (ABAP, FIORI) veya Danışmanlık (MM, EWM, HCM, FI/CO). ABAP bilgisi en çok aranan kriterlerden biridir."
        },
        {
          title: "Ön Koşullar",
          content: "Yazılım için Nesne Tabanlı Programlama (Java/C++) ve SQL bilgisi önerilir. Dil yeterliliği (Almanca/İngilizce) işi anlatabilmek için kritiktir."
        }
      ]
    },
    {
      step: 2,
      title: "Eğitim ve Kaynaklar",
      description: "Resmi kurslar, online platformlar ve sertifikalar.",
      details: [
        {
          title: "Eğitim Yolları",
          content: "Eğitime bağımlılık yüksektir. IAL (Gutschein ile), WBS (Umschulung), erp4students.de (öğrenciler için) ve Coursera önerilir. Resmi kaynaklar: open.sap.com, learning.sap.com."
        },
        {
          title: "Süre ve Yeterlilik",
          content: "3 aylık temel eğitim genellikle işe girmek için yetersizdir. Devam kursları veya Trainee programları ile desteklenmelidir."
        }
      ]
    },
    {
      step: 3,
      title: "İşe Giriş Yolları",
      description: "Sertifika, Trainee programları ve yetiştirme kontenjanları.",
      details: [
        {
          title: "Giriş Yöntemleri",
          content: "1. Sertifika alarak doğrudan başvuru. 2. Trainee Programları (6-18 ay, maaşlı eğitim). 3. Şirketlerin yetiştirme kontenjanları."
        },
        {
          title: "Kritik Bilgiler",
          content: "IDOC (Veri Paylaşımı) bilgisi çok önemlidir. SAP GTS, Analytics Cloud ve BTP alanları da değerlidir."
        }
      ]
    },
    {
      step: 4,
      title: "Kariyer ve İş Hayatı",
      description: "Maaşlar, çalışma koşulları ve yan haklar.",
      details: [
        {
          title: "Çalışma Koşulları",
          content: "Maaşlar ve koşullar tatmin edicidir. Remote çalışma yaygındır. Danışmanlık firmaları genellikle şirket aracı (Firmenwagen) sağlar."
        },
        {
          title: "İş Piyasası",
          content: "Büyük firmalar sürekli uzman arar. Kendini fazladan donatanlar (örn. ABAP + FIORI) daha başarılı olur."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sektör Analojisi ve İpuçları",
    content: "SAP kariyerine giriş, bir maraton koşmaya benzer. Temel bir ABAP kursu almak sadece koşu ayakkabılarınızı giymek gibidir; bu, başlangıç için yeterlidir ama yarışı bitirmek (işe girmek), yol boyunca sürekli antrenman (devam kursları) yapmayı, parkuru (modülleri) tanımayı ve doğru ekiplere (Trainee programlarına) katılmayı gerektirir. Dil yetkinliği ise maraton boyunca sizi motive eden ve rotayı görmenizi sağlayan oksijeninizdir.",
    specialNeeds: "Eğitime bağımlılık yüksektir (%90). Bireysel çalışma ve sürekli öğrenme gerektirir.",
    resources: "open.sap.com, learning.sap.com, erp4students.de, help.sap.com. YouTube: @saphanaacademy, Burak Kocaaslan."
  },
  faq: [
    {
      question: "SAP alanı çok geniş; kariyerime hangi modül veya alandan başlamalıyım?",
      answer: "SAP alanı oldukça geniş bir yelpazeye hitap etmektedir. Hangi alanın daha iyi olduğu konusunda kesin bir cevap vermek zordur, ancak ilgi alanınıza göre yönelmeniz önerilir:\n\n• Sistem Yönetimi (System Administration): Eğer yazılımcı (Entwickler) olmak istemiyor, sistem ile ilgilenmek istiyorsanız SAP BASIS eğitimi almalısınız.\n• Yazılım Geliştirme (Programmierung):\n  ◦ Web ile ilgilenmek istenmiyorsa SAP ABAP alanına yönelmek gerekir.\n  ◦ Web ile de ilgilenmek isteniyorsa SAP FIORI alanına yönelmek faydalıdır.\n• Danışmanlık (Beratung): Eğer programcı olmak istenmiyorsa, her bir alanın kendine ait modülleri (Module) bulunmaktadır; bunlara yönelip ilgili sertifikaları (Zertifikat) alarak danışmanlık alanına giriş yapabilirsiniz. Örneğin, lojistikle uğraşanlar MM veya EWM modülleri hakkında bilgi alabilir.\n\nÖnemli Not: ABAP bilgisi, tüm alanlar içerisinde en fazla aranan kriterlerden biridir."
    },
    {
      question: "SAP alanında işe giriş için hangi yollar tavsiye edilmektedir?",
      answer: "SAP alanına giriş yapmak için üç temel alternatif tavsiye edilmektedir:\n\n1. İlgili modülün sertifikalarını almak.\n2. Trainee programlarına (Stajyerlik) katılmak: Firmalar, çalıştıracakları elemanları kendi eğitim programları ile yetiştirmektedir. Bu programlar en az 6 ay, en fazla 18 ay sürer ve bu süreçte hem maaş alınır hem de eğitim görülür. Trainee programından sonra genellikle aynı firmada kalıcı sözleşme ile çalışılmaya devam edilir.\n3. Eğer alınan başlangıç eğitimi yeterli gelmezse, S/4 Hana gibi konularda ek kurslar almak ya da eleman yetiştirmek için kontenjan açan şirketlere başvuru yapmak gerekmektedir."
    },
    {
      question: "SAP programlamaya başlamadan önce hangi teknik ön bilgilere sahip olmak faydalıdır?",
      answer: "Programlama tecrübesi olmayanlar için tavsiyeler şunlardır:\n\n• SAP ABAP programlamaya başlamadan önce ilk olarak Object Oriented (Nesne Tabanlı) bir dilin (örneğin Java ya da C++) öğrenilmesi daha mantıklı olur.\n• Temel seviye SQL sorgularının öğrenilmesi güzel olur.\n• SAP'yi bilgisayara indirmek (özellikle Standalone kurulumu için) için en azından temel seviye Linux bilgisine sahip olmak gerekmektedir."
    },
    {
      question: "Almanya'da SAP kursu almak için hangi kurumlar ve yöntemler tavsiye edilmektedir?",
      answer: "• Almanya'da eğitim veren kurumlardan IAL firması Gutschein (eğitim çeki) ile kurs vermektedir ve bu kurslara giden arkadaşların memnun kaldığı belirtilmiştir.\n• WBS firması üzerinden Umschulung (mesleki yeniden eğitim) yapanlar vardır. Eğer eğitimi Almanca alacaksanız, kurs başlayana kadar bu alandaki Almanca terimleri öğrenmek işinizi kolaylaştırır.\n• Ücretli ve kaliteli bir eğitim arayanlar, özellikle üniversite öğrencileri için indirim sunan erp4students.de sitesinden kurslara katılabilirler.\n• Eurotechstudy firması da SAP ABAP Geliştirme kursları düzenlemektedir.\n• Münih'te (München) tavsiye edilebilecek SAP kurslarının genellikle bir merkezden remote (uzaktan) olarak anlatıldığı belirtilmiştir."
    },
    {
      question: "SAP öğrenmek için ücretsiz ve online kaynaklar nelerdir?",
      answer: "Ücretsiz temel bilgilere ulaşmak için:\n\n• SAP'nin kendi siteleri olan open.sap.com ve learning.sap.com ücretsiz kurslar sunmaktadır (en azından temel bilgiler - Basics ücretsizdir).\n• help.sap adresinden detaylı dokümanlara erişilebilir.\n• SAP'nin kendi YouTube hesabı ve özellikle SAP Hana ve BTP ile çalışanlar için @saphanaacademy kanalı takip edilebilir; On Boarding videoları ile başlanması önerilmiştir.\n• Türkçe YouTube kaynakları olarak Burak Kocaaslan ve Nevzat Yusan'ın videoları tavsiye edilmiştir."
    },
    {
      question: "ABAP programlama için ek kaynaklar ve egzersiz siteleri var mıdır?",
      answer: "ABAP ile ilgili üç önemli Open Source site paylaşılmıştır: dotabap.org, discoveringabap.com, ve zapyard.com. Ayrıca, ABAP öğrenmeye egzersizlerle başlamak isteyenler için Exercism sitesi önerilmiştir."
    },
    {
      question: "SAP eğitimi konusunda Coursera ve Kiron gibi platformlarda seçenekler var mı?",
      answer: "Evet, Coursera'da SAP Consultant ve SAP Basic kursları bulunmaktadır. Kiron üyeliği olanlar için de kaliteli bir SAP kursu olduğu belirtilmiştir. SAP Basic kursu için Türkçe altyazılı seçenekler bulunabilir."
    },
    {
      question: "Üç aylık kısa bir SAP ABAP eğitimi işe girmek için yeterli midir?",
      answer: "Hayır, tecrübelere göre kompleks bir konu olan ABAP için 3 aylık bir eğitim yeterli değildir. Bu süre, sadece temel bilgileri öğrenmek için yeterli olabilir. İş ilanları tarandığında, 3 aylık müfredatla kıyaslandığında istenenlerin az bir kısmının öğrenildiği görülmektedir. SAP alanı, Java ya da Python gibi yeterli bilgiye internetten ulaşılabilecek bir alan olmadığı için, eğitime bağımlılık yaklaşık %90 oranındadır."
    },
    {
      question: "SAP alanında çalışmak için hangi dil yetkinlikleri gereklidir?",
      answer: "SAP alanına hangi kısımdan girilirse girilsin, yapılan işi anlatma gibi bir sorumluluk olduğu için İngilizce veya Almanca dillerinden en az birinin iyi olması gerekmektedir. Dil, en önemli fonksiyonlardan biri olarak vurgulanmıştır."
    },
    {
      question: "SAP alanındaki çalışma koşulları ve maaşlar nasıldır?",
      answer: "Çalışma koşulları güzel ve maaşlar tatmin edicidir. Büyük firmalar sürekli SAP uzmanları aramaktadır. Çoğu SAP çalışanı Remote (uzaktan) çalışmaktadır. Ayrıca birçok danışmanlık firması çalışanlarına Firmwagen (şirket aracı) vermektedir."
    },
    {
      question: "İş hayatında sıkça karşılaşılan veya kritik öneme sahip özel SAP konuları/modülleri nelerdir?",
      answer: "• ABAP bilgisi, en çok aranan kriterdir.\n• IDOC'lar (International Data Sharing): Uluslararası firmaların hemen hemen hepsi birbirleriyle veri paylaşımı yapmak için IDOC kullandığından, iş ortamında bu konuyla karşılaşma olasılığı çok yüksektir ve bu nedenle IDOC ile ilgili mutlaka bir doküman bulundurulmalıdır.\n• SAP OpenText ile ilgili kaynak arayışları mevcuttur.\n• SAP GTS (Global Trade Services) alanında Türkçe'ye çevrilmiş kaynaklar olduğu belirtilmiştir.\n• SAP IDM (Identity Management) ve IAM (Identity Access Management) konularında uzmanlaşma planları olanlar vardır.\n• SAP Hana ve BTP (Business Technology Platform) platformları üzerinde çalışmalar ve eğitimler mevcuttur.\n• İnsan Kaynakları alanıyla ilgilenenler için HCM (Human Capital Management) modülünün araştırıldığı belirtilmiştir."
    },
    {
      question: "Lojistik alanından SAP'ye geçiş yapmak isteyenler için hangi modüller uygun olabilir?",
      answer: "Lojistik geçmişi olanlar, MM modülü (Materials Management) veya EWM modülü (Extended Warehouse Management) ile ilgilenen uzmanlar aramıştır. Bu modüller lojistik odaklı olabilir."
    }
  ]
};
