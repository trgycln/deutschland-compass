import { ProfessionData } from './types';

export const cyberSecurityData: ProfessionData = {
  title: "Siber Güvenlik (Cyber Security)",
  slug: "siber-guvenlik",
  description: "Almanya'da siber güvenlik uzmanı olmak için gereken eğitimler, sertifikalar ve kariyer ipuçları.",
  videoUrl: "",
  stats: [
    { label: "Talep", value: "Yüksek", color: "bg-red-500" },
    { label: "Maaş (Ort.)", value: "€60.000", color: "bg-purple-500" },
    { label: "Sektör", value: "Bilişim", color: "bg-blue-500" },
    { label: "Dil", value: "Almanca (B2) / İngilizce (C1)", color: "bg-emerald-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Dil Yeterliliği ve Ön Koşullar",
      description: "Almanca ve İngilizce gereklilikleri.",
      details: [
        {
          title: "Almanca (Sprachkenntnisse)",
          content: "Kariyer sürecini yönetmek için B2 seviyesi alt sınırdır. İşe girenlerin çoğunda C1 seviyesi görülmektedir. Başvuru ve mülakat süreçlerinde Almanca kritiktir."
        },
        {
          title: "İngilizce",
          content: "C1 seviyesinde İngilizce, kaynaklara erişim ve teknik gelişim için çok önemlidir. Birçok ücretsiz kaynak (Udemy, YouTube) İngilizcedir."
        },
        {
          title: "İletişim",
          content: "İşe girdikten sonraki ilk 6 ayda (Probezeit) ekip içi iletişim yakından izlenir. Teknik terimlere Almanca hakimiyet önemlidir."
        }
      ]
    },
    {
      step: 2,
      title: "Eğitim Yolları ve Finansman",
      description: "Bootcamp, Umschulung ve Jobcenter süreçleri.",
      details: [
        {
          title: "Bootcamp vs Umschulung",
          content: "Bootcamp mezunlarının iş bulma oranı düşmektedir (%20-25). IHK onaylı Umschulung veya Ausbildung yapmak, piyasada çok daha sağlam bir zemin sunar ve iş bulma şansını artırır."
        },
        {
          title: "Jobcenter ve Finansman",
          content: "Agentur für Arbeit'tan 'Bildungsgutschein' talep edilebilir. Ancak 15.000€ üzeri kurslar pahalı bulunabilir veya 'üniversite şart' denilerek reddedilebilir. Ret durumunda yazılı karar isteyip itiraz etmek haktır."
        }
      ]
    },
    {
      step: 3,
      title: "Teknik Yetkinlikler ve Sertifikalar",
      description: "Öğrenilmesi gereken araçlar ve sertifikalar.",
      details: [
        {
          title: "Temel Bilgiler ve Araçlar",
          content: "Network, Windows/Linux, Python temelleri şarttır. BurpSuite, NMAP, Wireshark, Splunk (SIEM) ve Microsoft Sentinel öğrenilmelidir. HackTheBox, TryHackMe gibi platformlarda pratik yapılmalıdır."
        },
        {
          title: "Sertifikalar",
          content: "CompTIA Security+ başlangıç için önemlidir. Cloud güvenliği için Microsoft AZ-900, SC-900, SC-200 önerilir. Sertifikalar mutlaka pratikle desteklenmelidir."
        }
      ]
    },
    {
      step: 4,
      title: "İş Arama ve Çalışma Hayatı",
      description: "Başvuru süreci, maaşlar ve çalışma ortamı.",
      details: [
        {
          title: "Başvuru Süreci",
          content: "Rekabet yüksektir; 300-400 başvuru gerekebilir. 'Anschreiben' (Niyet Mektubu) giderek önem kazanmaktadır. ISO/ISMS gibi yönetici rollerinde hareketlilik vardır."
        },
        {
          title: "Maaşlar",
          content: "Yeni başlayanlar için 45.000-50.000€, ortalama 60.000€, uzmanlar için 120.000€'ya kadar çıkabilir. Giriş seviyesinde maaş beklentisini makul tutmak şansı artırır."
        }
      ]
    }
  ],
  pedagogy: {
    title: "Sektör Analojisi ve İpuçları",
    content: "İş piyasası, tıpkı bir okyanus gibi, sürekli değişen akıntılara sahiptir. Sertifika ve teorik bilgiler suyun üstünde kalmanızı sağlayan can yelekleri gibidir. Ancak iş bulup kalıcı olmak için ihtiyacınız olan asıl şey; uygulamalı beceriler ve dil yeterliliğiyle inşa edilmiş olan motorunuzdur, aksi takdirde akıntı sizi istediğiniz limana değil, kıyıya sürükleyebilir.",
    specialNeeds: "Siber güvenlik pozisyonları genellikle daha az insan kontağı gerektirir ancak DevOps takımları yoğun toplantı yapabilir. Gece vardiyası teknik rollerde olasıdır.",
    resources: "HackTheBox, TryHackMe, LetsDefendIO, Coursera (Google/IBM), InfoTech Academy. Ücretsiz kaynaklar: Shodan.io, Zoomeye.org."
  },
  faq: [
    {
      question: "Almanya'da siber güvenlik kariyerine başlamak için Bootcamp mi yoksa Umschulung (Mesleki Yeniden Eğitim) mu daha çok tavsiye edilmektedir?",
      answer: "Genel kanı, IHK (Industrie- und Handelskammer) sertifikalı bir Umschulung almanın piyasada çok daha sağlam bir zemin sağladığı yönündedir. IHK sertifikası olan birinin iş bulma şansının %100'e yakın olduğu iddia edilirken, bootcamp mezunlarının sayısının artması ve profil benzerliği nedeniyle işe girme oranlarının %20-25 civarına düştüğü ve iş bulma sürecinin uzadığı belirtilmektedir. İyi bir Almanca ile (B2/C1) Umschulung yapanların iş problemi yaşamadığı düşünülmektedir."
    },
    {
      question: "Siber güvenlik kurslarının fiyatları ne durumdadır ve Jobcenter desteği almak zor mu?",
      answer: "Kurs fiyatlarının son bir yılda iki katına çıktığı ve bazı kursların 18.000 Euro civarında fiyat talep ettiği görülmüştür. Jobcenter memurları bu fiyatları (+15.000 Euro) pahalı bulabilir ve karşılanmasının ekonomik olarak mümkün olmadığını belirtebilir. Jobcenter'ın bu eğitimi bir Studium veya Ausbildung değil de yalnızca bir ek yeterlilik (Zusatzqualifikation) olarak görmesi de onayın reddedilme nedenlerindendir."
    },
    {
      question: "Jobcenter (Agentur für Arbeit) kurs talebimi reddederse ne yapmalıyım?",
      answer: "Eğer kurs talebiniz reddedilirse, memurunuzdan yazılı bir ret kararı (Ablehnungs) talep etmeniz önemlidir. Bu, yasal yollarla hakkınızı aramanın ilk adımıdır. Memurunuz yapıcı yaklaşmıyorsa, Hochschulteam gibi daha uzman bir birime yönlendirilme talep etmek bir çözüm olabilir. Eğer son 3-4 yıl içinde eski alanınızda çalışmadıysanız, Jobcenter'ın sizi o alanda iş bulmaya zorlayamayacağı belirtilmiştir."
    },
    {
      question: "Siber güvenlik alanında ücretsiz veya cüzi ücretli eğitim imkanları nelerdir?",
      answer: "• Coursera: Google IT Support ve IBM Cyber Security kursları Kiron üzerinden kimlik onayı ile ücretsiz alınabilir. Ancak IBM Cyber Security kursunun kalitesinin düşük, bilgisinin eski ve gereksiz uzun olduğu yönünde eleştiriler mevcuttur.\n• InfoTech Academy: Cyber Security kursunun ücreti bu yıl için €600 olarak belirlenmiştir ve bu kursu piyasada çalışan kişiler vermektedir.\n• INCO Academy: Mart 2024'te başlayan ilk gruptan itibaren %100 ücretsiz online Google Professional Certificate in Cybersecurity programı sunulmuştur."
    },
    {
      question: "Almanya'da siber güvenlik pozisyonları için hangi dil seviyeleri şarttır?",
      answer: "• Almanca: Kariyer sürecini yönetmek için en az B2 seviyesi önerilirken, işe girenlerin önemli bir kısmında Almanca'nın C1 seviyesinde olduğu belirtilmiştir. Almanca, Bewerbung (başvuru) ve Vorstellungsgespräch (iş görüşmesi) süreçlerini yönetebilmek için kritik öneme sahiptir.\n• İngilizce: İngilizce'nin de C1 seviyesinde olması, özellikle ücretsiz kaynaklardan (Udemy, YouTube, Chatgpt) kendi kendine öğrenme sürecini kolaylaştırmak için çok önemlidir."
    },
    {
      question: "Başlangıç seviyesinde hangi teknik konulara ve araçlara odaklanılmalıdır?",
      answer: "Temel olarak iyi bir network bilgisi, Windows/Linux işletim sistemleri hakimiyeti ve Python programlama dili öğrenimi tavsiye edilmektedir. Pratik yapılması önerilen spesifik araçlar ve platformlar şunlardır:\n• Araçlar: BurpSuite, NMAP, Gobuster, Wireshark.\n• SIEM/SOAR: Splunk (ücretsiz sürümü) veya Microsoft Sentinel (30 günlük Azure Subscription ile) kullanılabilir.\n• Pratik Platformları: HackXpert, RealTryHackMe, CyberSecLabs, LetsDefendIO (Blue Team için), HackTheBox ve PortSwigger (Web Sec)."
    },
    {
      question: "Hangi sertifikalar kariyer için avantaj sağlar ve sertifikaların sektördeki algısı nedir?",
      answer: "• Başlangıç: CompTIA Security+ başlangıç seviyesi için önemli kabul edilir.\n• Cloud Güvenliği: Microsoft'un AZ-900, SC-900 ve SC-200 sertifikaları Cloud Güvenliği alanına yönelmek isteyenler için ilgi çekicidir.\n• Algı: CompTIA sınavlarının büyük ölçüde çıkmış soru havuzundan ezberle geçilebildiği yönünde bir algı olduğu için, bu sertifikaları alırken mutlaka Azure Subscription gibi test ortamları üzerinde uygulamalı çalışılması ve mülakatlarda bu birikimi anlatabilmek gerektiği vurgulanmıştır."
    },
    {
      question: "Almanya'da siber güvenlik pozisyonlarında ortalama maaş beklentisi nedir?",
      answer: "Siber Güvenlik alanında yıllık brüt maaşlar 45.000 Euro ile 120.000 Euro arasında değişmekte olup, ortalama 60.000 Euro civarındadır. Yeni başlayanlar için 45.000–50.000 Euro ile işe başlamak ciddi bir başarı olarak değerlendirilmektedir."
    },
    {
      question: "İş bulma süreci ne kadar sürebilir ve kaç başvuru yapmak gerekebilir?",
      answer: "Piyasada daralma olduğu ve mezun sayısının arttığı için iş bulma sürecinin uzadığı belirtilmiştir. Başarılı olan bazı kişilerin bile 300-400 civarı başvuru yaptığı bir gerçektir. Bazı katılımcılar 5 ayda 200 başvuru yapıp sıfır sonuç aldığını paylaşmıştır."
    },
    {
      question: "Siber Güvenlik rollerinde sosyal iletişim (kontak) yoğunluğu nasıldır?",
      answer: "Siber Güvenlik pozisyonları, genel olarak Developer veya Testerlara göre daha az insan kontağı gerektirir. Ancak bu, role göre değişir. Özellikle DevOps takımlarında çalışan siber güvenlik uzmanları Scrum süreçleri nedeniyle günde 4 ila 8 toplantıya katılmak zorunda kalabilir; bu nedenle yoğun sosyal etkileşimden kaçınanlara DevOps takımlarına başvurmaması tavsiye edilmiştir."
    },
    {
      question: "ISMS/ISO 27001 gibi organizasyonel roller kimler için uygundur?",
      answer: "Bu roller, yönetici, organizasyon becerisi olan veya hukuk, bürokrat, güvenlik, denetim gibi geçmişi olan kişiler için uygundur. Bu pozisyonlarda teknik araçlar kullanılmaz; kurumdaki güvenlik işini yöneten, organize eden ve standartları takip eden kişi olunur. Bu roller için B2/C1 seviye Almanca yeterlidir."
    }
  ]
};
