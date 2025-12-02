import { ProfessionData } from './types';

export const cloudDevopsData: ProfessionData = {
  title: "Cloud & DevOps Uzmanlığı",
  slug: "cloud-devops",
  description: "Almanya'da Cloud ve DevOps alanında kariyer, teknik gereksinimler (AWS/Azure), eğitim stratejileri ve iş hayatı dinamikleri.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-green-500" },
    { label: "Odak", value: "AWS & Azure", color: "bg-blue-500" },
    { label: "Dil", value: "İngilizce (Teknik)", color: "bg-purple-500" },
    { label: "Çalışma", value: "Hibrit / Remote", color: "bg-orange-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Teknik Temeller ve Araçlar",
      description: "Cloud/DevOps dünyasına giriş için olmazsa olmaz teknolojiler.",
      details: [
        {
          title: "Bulut Sağlayıcıları",
          content: "AWS ve Azure en yaygın platformlardır. Özellikle Azure ağırlıklı eğitimler ve iş fırsatları mevcuttur."
        },
        {
          title: "Orkestrasyon ve Altyapı",
          content: "Kubernetes (K8s) ve Terraform kritik öneme sahiptir. Konteynerleştirme için Docker (K8s'ten önce öğrenilmeli), CI/CD için Jenkins, AzureDevops ve Git Actions bilinmelidir."
        }
      ]
    },
    {
      step: 2,
      title: "Eğitim ve Sertifikasyon",
      description: "Öğrenme yolları ve stratejik sertifikalar.",
      details: [
        {
          title: "Kurslar ve Kaynaklar",
          content: "Bootcamp'ler (Techpro vb.) ve YouTube (Önder Değer) kaynakları etkilidir. AZ-900 sertifikası başlangıç için mantıklıdır."
        },
        {
          title: "Stratejik Yaklaşım",
          content: "IT geçmişi olmayanlar için önce Tester eğitimi alıp sonra DevOps'a geçmek daha yumuşak bir geçiş sağlayabilir. FinOps gibi niş alanlar da değerlendirilebilir."
        }
      ]
    },
    {
      step: 3,
      title: "Dil ve İletişim",
      description: "Almanya pazarında dilin önemi.",
      details: [
        {
          title: "İngilizce Zorunluluğu",
          content: "Teknik dokümantasyon ve güncel kaynaklar İngilizce olduğu için okuma/anlama şarttır. İş İngilizce yapılabilir ancak Almanca entegrasyonu hızlandırır."
        },
        {
          title: "Teknik Terminoloji",
          content: "Dili teknik terimler üzerinden öğrenmek süreci kolaylaştırır. ChatGPT gibi araçlarla terim özetleri çıkarmak faydalıdır."
        }
      ]
    },
    {
      step: 4,
      title: "İş Hayatı ve Gelişim",
      description: "Çalışma kültürü ve kariyer basamakları.",
      details: [
        {
          title: "Çalışma Düzeni",
          content: "Genellikle hibrit çalışma (haftada 1 gün Home Office) yaygındır. Full Remote imkanı işe kabulden sonra pazarlık edilebilir."
        },
        {
          title: "Sürekli Gelişim",
          content: "Bireysel projeler üretmek, doğru soruları sormak ve mentorluk almak gelişimi hızlandırır. Siber Güvenlik gibi alanlar da yan dal olarak düşünülebilir."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Analoji: İnşaat Şantiyesi ve Lojistik",
    content: "DevOps süreci, devasa bir gökdelenin inşaat şantiyesine benzer. Yazılımcılar tuğlaları (kod) üretir, ancak bu tuğlaların doğru yere, zamanında ve sağlam şekilde ulaşmasını sağlayan lojistik ağı (CI/CD, Pipeline) DevOps uzmanının işidir. Bulut (Cloud) ise bu şantiyenin kurulduğu sonsuz genişlikteki arazidir. Siz hem arazinin sahibi (AWS/Azure) ile anlaşmalı hem de vinçlerin (Kubernetes/Docker) operatörü olmalısınız.",
    specialNeeds: "Sürekli öğrenme disiplini, soyut düşünme yeteneği ve sistemler arası bağlantı kurma becerisi gerektirir.",
    resources: "Azure/AWS Dokümantasyonları, YouTube (Önder Değer), Techpro Akademi, FinOps eğitimleri."
  },
  faq: [
    // I. Teknik Gereksinimler ve Eğitim Yolları
    {
      question: "Cloud/DevOps alanına yeni başlayanlar hangi bulut sağlayıcılarına (Cloud Provider) odaklanmalı?",
      answer: "Bu alanda ilerleyenler, ağırlıklı olarak AWS veya Azure platformlarına odaklanmaktadır. Eğitimler hem AWS (Linux ve AWS ağırlıklı) hem de Azure (Bootcamp'ler ve özel kurslar) ağırlıklı olarak mevcuttur."
    },
    {
      question: "Cloud/DevOps uzmanlarının bilmesi gereken temel araçlar (Tool'lar) ve teknolojiler nelerdir?",
      answer: "Tecrübeler, ağırlıklı olarak şu araçlara hakim olmayı önermektedir: Kubernetes (K8s), Terraform, Docker (Kubernetes'ten önce öğrenilmesi tavsiye edilir), Jenkins, AzureDevops ve Git Actions. Ayrıca, GitHub ve Linux bilgisi zaten temel kabul edilmektedir."
    },
    {
      question: "Hangi eğitim kaynakları ve kurslar tavsiye edilmektedir?",
      answer: "YouTube'da Önder Değer'in Azure anlatımları, Techpro Akademi gibi güncel Azure kursları ve AWS DevOps kursları popülerdir. Yeni açılan butik gruplar (batch), birebir ilgi açısından avantajlı olabilir."
    },
    {
      question: "Sertifika sınavlarına (örn. AZ 900) hazırlanırken hangi yöntem daha mantıklıdır?",
      answer: "AZ 900 sertifika sınavına online (çevrimiçi) girmek mantıklı bulunmaktadır."
    },
    {
      question: "Daha önce IT geçmişi olmayanlar Cloud/DevOps alanına doğrudan girmeli mi?",
      answer: "Daha önce IT alanında çalışmadıysanız, DevOps alanında iş bulmak zor olabilir çünkü bu alan hem bilgi hem tecrübe ister. Bu durumdaki kişilere, öncelikle Tester (Test Uzmanı) kursu almanın daha mantıklı olabileceği ve Tester kursu sonrası DevOps eğitimi almanın daha kolaylaşabileceği tavsiye edilmiştir."
    },
    // II. Kariyer ve İş Hayatı Dinamikleri
    {
      question: "Cloud/DevOps alanında uzaktan çalışma (remote) imkanları nasıldır?",
      answer: "Almanya'daki çalışma ortamında genellikle haftada bir gün home office (evden çalışma) imkanı sunulmaktadır ve ofise gelinmesi beklenmektedir. Tamamen uzaktan çalışma (full remote) imkanı için, iş kabul edildikten sonra özel olarak istekte bulunulup konuşulması gerekir. Leipzig gibi yerlerde offsite pozisyonlar mevcuttur."
    },
    {
      question: "İleriye dönük kapanması zor ve sürekli talep olan niş alanlar nelerdir?",
      answer: "İleriye dönük kariyer planlaması yaparken kapanması zor ve sürekli talep olan bir alan seçmek faydalıdır. Bu kapsamda, Cyber Security (Siber Güvenlik) alanı özellikle tavsiye edilmektedir."
    },
    {
      question: "Cloud sektöründe yeni ve niş alanlar var mıdır?",
      answer: "Evet, son zamanlarda Cloud sektörü içerisinde FinOps (Cloud Maliyet Optimizasyonu), nitelikli insan kaynağına ulaşılması zor olan çok yeni ve niş bir alan olarak ortaya çıkmıştır. Bu alanda uzman yetiştirmek üzere Avrupa özelinde 10 haftalık eğitimler düzenlenmiştir."
    },
    {
      question: "DevOps kariyerinde başarılı olmak için kişisel gelişim taktikleri nelerdir?",
      answer: "Kendi kendinize projeler üreterek iş dışında gelişim göstermek, doğru soruları doğru platformda sormak ve sağlam bir mentor bulmak önemlidir. Ayrıca her zaman en güncel bilgiyi bilmek şart değildir, zira çoğu büyük firma bir sisteme başlayınca onunla devam etmektedir."
    },
    // III. Dil ve Adaptasyon
    {
      question: "Almanya'da Cloud/DevOps işini yapabilmek için ileri düzey İngilizce şart mıdır?",
      answer: "Almanya'da bu işi İngilizce konuşmadan yapabilirsiniz. Ancak, Cloud ortamında her şey günlük değiştiği ve tüm yeni bilgiler İngilizce olduğu için, İngilizce kaynakları okuyup veya dinleyip anlamanız gerekmektedir. Çeviri programları teknik detaylarda yetersiz kalabilir."
    },
    {
      question: "Almanca öğrenme yeteneği IT alanına adapte olmayı kolaylaştırır mı?",
      answer: "Evet, Almanca öğrenebilen birinin IT'yi çok rahat halledebileceği düşünülmektedir. Eğer olaya dil olarak değil, dildeki özel isimlere (teknik kelimelere) odaklanılarak bakılırsa, IT öğrenmek kolaylaşır. ChatGPT gibi araçlar da teknik kelime özetleri için faydalıdır."
    },
    {
      question: "Tecrübeli Cloud/DevOps uzmanlarına hangi konularda danışılmaktadır?",
      answer: "Tecrübeli kişilere genellikle Azure AKS ile ACR attach etme, AWS üzerinde database tecrübesi, Azure Resource Manager ve AWS backend deploy sorunları gibi spesifik teknik konularda danışılmaktadır."
    }
  ]
};
