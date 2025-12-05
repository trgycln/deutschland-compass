"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sprout, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Globe, 
  FileText, 
  Building2, 
  Languages,
  School,
  Search,
  MessageSquare,
  AlertCircle,
  Users,
  HelpCircle,
  Info,
  ArrowRight,
  Plane,
  Landmark,
  Tractor,
  Leaf,
  Map,
  Cpu,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';
import { DocumentSection } from '@/components/document-section';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ZiraatMuhendisligiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Ziraat%,profession.ilike.%Tarım%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const faqData = [
    {
      category: "Dil Yeterliliği ve Eğitim",
      items: [
        {
          question: "Almanya'da Ziraat Mühendisi olarak çalışmak için beklenen minimum Almanca dil düzeyi nedir?",
          answer: "Meslekte başarılı olmak ve kendini iyi ifade edebilmek için genel tavsiye edilen Almanca seviyesi C1'dir. Ancak bu, yapılacak işin niteliğine göre değişebilir. Uluslararası tohum, ilaç veya ekipman satan firmalar genellikle C1 Almanca ve akıcı İngilizce talep etmektedir."
        },
        {
          question: "İş arama sürecinde dil eğitimi dışında mesleki hazırlık olarak neler yapılmalıdır?",
          answer: "İklim değişikliği (Klimawandel), gıda güvenliği (Lebensmittelsicherheit), karbon tarımı ve tarımda yapay zeka kullanımı (Künstliche Intelligenz) gibi gelecekte önemi artacak konulara dair niteliklerinizi düzenlemeniz tavsiye edilir. Ayrıca, kariyerinizi destekleyecek bilişim veya yazılım programlama dillerini öğrenmeniz şiddetle tavsiye edilir."
        },
        {
          question: "Sektörde çalışabilmek için İngilizce dili ile çalışılabilen firmalar var mıdır?",
          answer: "Evet, uluslararası tohum, ilaç ve ekipman satan büyük firmalar hem C1 Almanca hem de akıcı İngilizce talep etmektedir."
        },
        {
          question: "Jobcenter, dil kursu (C1) için mesleki kabul veya randevu vermekte zorluk çıkarır mı?",
          answer: "Evet, bir deneyime göre, Jobcenter'daki danışmanlar, mesleki kabul (denklik) belgesi alınmadıkça C1 kursuna göndermeyi veya randevu vermeyi geciktirebilir veya reddedebilir. Bazı danışmanlar acele edilmemesini, bekleme sürecinin normal olduğunu belirterek randevu vermeyebilir."
        },
        {
          question: "Ziraat Mühendisliği alanında katılabileceğimiz sertifikalı kurslar/eğitimler var mıdır?",
          answer: "Evet, Landwirtschaftsamt'a müracaat edilerek ziraat ile ilgili temel bilgileri içeren, genellikle 600 saatlik, akşam dersleri şeklinde sertifikalı kurslar alınabilir. Özellikle oturum bekleyen arkadaşların B1 seviyesinden sonra bu kurslara müracaat etmeleri önerilir."
        },
        {
          question: "Türkiye'de ziraat eğitimi devam eden (lisans derslerinin bir kısmı kalan) bir öğrenci, Almanya'da eğitimine nasıl devam edebilir?",
          answer: "Ziraat teknikerliği eğitimi devam eden biri için, Almanya'da Land- und Baumaschinenmechatroniker/in (Tarım ve İş Makineleri Mekatroniği) alanında Ausbildung (Mesleki Eğitim) yapmak veya C1 seviyesi alıp Landtechnik Ingenieur bölümünde üniversiteye başlamak bir şans olabilir."
        }
      ]
    },
    {
      category: "Denklik (Anerkennung) ve Yasal Zemin",
      items: [
        {
          question: "Ziraat Mühendisliği diploması için Almanya'da denklik (Anerkennung) almak zorunlu mudur?",
          answer: "Ziraat Mühendisliği mesleği yasal düzenlemeye tabi olmayan (unreguliert) bir meslektir. Bu nedenle, genel olarak denklik almadan da diplomanız Almanya'da geçerlidir ve uygun işlere başvurabilirsiniz. Ancak, Alman mühendis unvanı ('Ingenieur') yasal düzenlemeye tabi (reguliert) olduğu için, bu unvanı kullanmak isterseniz denklik için başvurmanız ZORUNLUDUR. Eğer bir işveren sizi 'Ingenieur' olarak işe alırsa, yine unvanın tanınması için başvurmanız GEREKİR."
        },
        {
          question: "Mühendis unvanı tanınması için başvuru hangi kurumlara yapılmalıdır ve hangi belgeler gereklidir?",
          answer: "Ingenieur unvanı tanınması için eyaletlerin Mühendisler Odası'na (Ingenieurkammer) başvurulmalıdır. Örneğin, Baden-Württemberg eyaleti için yetkili kurum Ingenieurkammer Baden-Württemberg (ingBW)'dir."
        },
        {
          question: "Denklik başvurusunda kredim yetersiz gelirse veya reddedilirse ne olur?",
          answer: "Başvurunuzun kabul edilmesi için lisans derecenizdeki öğrenim konularının en az %50'sinin sözde 'MINT-konuları'nda (Matematik, Bilgisayar Bilimleri, Doğa Bilimleri—fizik, kimya vb.—veya Mühendislik) olması gerekir. Eğer dereceniz Alman mühendislik derecesine eşdeğer değilse, başvuru reddedilir. Bu durumda profesyonel alanınızda çalışmaya devam edebilirsiniz ancak kendinize 'Ingenieur' demenize izin verilmez."
        },
        {
          question: "Denklik reddedilirse veya hiç başvuru yapılmazsa hangi unvanlar kullanılabilir?",
          answer: "Bu durumda kendinize 'Ingenieur' demenize izin verilmez. Ancak unvanınızı eğitim aldığınız ülkeden kullanmanıza izin verilir. Başvurularınızda ve kartvizitinize şu formatı yazabilirsiniz: 'Orijinal atama / Üniversite / Orijinal atamanın Almanca çevirisi'."
        },
        {
          question: "Denklik başvuru süreci yaklaşık ne kadar sürer?",
          answer: "Denklik başvuru süreci yaklaşık 6 ay sürebilir."
        },
        {
          question: "Hangi Ziraat Mühendisliği bölümleri (örn. Tarımsal Mekanizasyon vs. Tarım Ekonomisi) denklik alma konusunda farklılık gösterir?",
          answer: "Alınan derslerin mühendislikle ve üretimle ilgili toplam kredisi önemlidir. Tarımsal Mekanizasyon mezunları denklik ve mühendislik unvanı alabilirken, Tarım Ekonomisi mezunlarının mühendislik unvanını alamadığı deneyimlenmiştir."
        },
        {
          question: "Bitki Koruma (Pflanzenschutz), bitki yetiştirme, ıslah veya meyvecilik mezunları hangi kuruma başvurmalıdır?",
          answer: "Bu gibi alanlar Mühendisler Odası (Ingenieurkammer) yerine daha çok eyaletlerin Tarım Odası'nın (Landwirtschaftskammer) ilgi alanına girer. Tanınma için Landwirtschaftskammer ile irtibata geçilmesi tavsiye edilmiştir. Bitki Koruma mezunları, ayrıca Hamburg bitki koruma servisi (Pflanzenschutzdienst Hamburg) ile de irtibata geçebilirler."
        },
        {
          question: "Zab belgesi ile alınan lisans denklik cevabından sonra, Mühendisler Odası'ndan mühendis unvanı almak için ne yapılmalıdır?",
          answer: "Lisans diplomasının tanındığı cevabını aldıktan sonraki adım, Mühendisler Odası'ndan (Ingenieurkammer) mühendis unvanı (Ingenieur) almaktır. Her bölge ayrı bir kurumdan bu unvanı vermektedir (Örn: Baden Württemberg için ingBW)."
        },
        {
          question: "Jobcenter, diploma tercümeleri ve denklik işlemlerini karşılıyor mu?",
          answer: "Evet, denklik başvurusu için gerekli belgelerin tercüme parası (Übersetzung) Jobcenter tarafından ödenebilir. Ancak tercüme parası için önden onay alınması ve ödemenin yapılıp faturanın sonradan ibraz edilmesi gerekebilir. Jobcenter, sadece akademik denklik (ZAB) değil, mesleki unvan tanıma sürecinin de ödemesini yapabilir."
        },
        {
          question: "Yüksek lisans ve doktora diplomaları denklik yaptırılırken kullanılmalı mı?",
          answer: "Denklik yaptırırken master ve doktora diplomaları da kullanılabilir ve bu konuda faydalı olabilecek paylaşımlar mevcuttur."
        },
        {
          question: "Türkiye'deki bir kişi, Almanya'da denklik (Anerkennung) işlemlerini Türkiye'den yapabilir mi?",
          answer: "Evet, denklik işlemleri Büyükelçilikler ve Konsolosluklar aracılığıyla yaptırılabilir."
        },
        {
          question: "Denklik aldıktan sonra, ziraat mühendisi unvanını kullanmak için herhangi bir meslek odasına (Ingenieurkammer) kayıt yaptırmak gerekiyor mu?",
          answer: "Denklik (tanınma) işlemi tamamlandıktan sonra, Alman 'Ingenieur' unvanına sahip olunur ve Almanya'nın her yerinde bu unvan kullanılabilir. Ancak unvanın kullanımı için herhangi bir odaya kayıt yaptırma zorunluluğu olup olmadığı bilgisi tam olarak kesinleşmemiştir, ancak AWO danışmanlık firmaları en net bilgiyi verebilir."
        },
        {
          question: "İşveren, iş sözleşmesine veya bordroya 'mühendis' yazsa, firma için ek bir yükümlülük veya masraf çıkar mı?",
          answer: "İşveren, işçi yerine 'mühendis' (Ingenieur) yazabilir mi ve bunun kanuni bir yükümlülüğü veya firmaya ilave bir masrafı olup olmadığı grup üyelerine sorulmuş ancak kaynaklarda kesin bir cevabı bulunmamaktadır."
        }
      ]
    },
    {
      category: "Kariyer Fırsatları ve İş Arayışı",
      items: [
        {
          question: "Ziraat Mühendisleri hangi sektörlerde veya alanlarda iş arayabilir (özellikle Tarla Bitkileri mezunları)?",
          answer: "Tarla bitkileri mezunları için çalışılabilecek potansiyel sektörler: Tohum araştırma enstitüleri (örn. Hohenheim Üniversitesi'ne bağlı Landessaatzuchtanstalt), İklim değişikliği ve gıda güvenliği ile ilgili pozisyonlar, Kamuya bağlı Landwirtschaftsamt gibi Tarım Bakanlığı destekli projeler, Özel sektörde tohum, ilaç veya ekipman satan uluslararası firmalar, Coğrafi Bilgi Sistemleri (GIS) gerektiren haritalama projeleri."
        },
        {
          question: "Almanya'da Ziraat Mühendisleri için iş bulmak kolay mıdır?",
          answer: "Grup üyelerinin deneyimlerine göre, Ziraat Mühendisi olarak çalışmak imkansız değil ama zordur. Tek istenen unsurun Almanca olduğu belirtilse de, geleneksel tarım işlerinde Ziraat Mühendisleri bazen 'kalifiye tarım işçisi' gibi görülebilir. Başarı, Almanca seviyesine (C1 tavsiye edilir) ve ileri teknik uzmanlıklara (IT, GIS) yönelmeye bağlıdır."
        },
        {
          question: "Zootekni bölümü mezunları için Almanya'da iş imkanları nasıldır ve hangi tür işler teklif edilmektedir?",
          answer: "Zootekni mezunları için iş imkanları konusunda bilgi arayışı sürmektedir. Gelen iş teklifleri genellikle çiftliklerdeki hayvanların bakımından sorumlu personel, yemleme, tımar, ahır temizliği veya at bakıcılığı işleridir. Domuz ve at üzerine ilanlar yaygındır."
        },
        {
          question: "Ziraat Mühendisi olarak iş ararken diploma denkliği dışında ibraz edilmesi gereken başka belgeler var mı?",
          answer: "Geleneksel tarım ve mekanizasyon işlerinde, büyük traktörleri römorku ile sürmek için CE ehliyeti ve hatta fidancılık işleri için dahi CE ehliyeti talep edilmektedir. Bu ehliyetin tonajlı araçları sürmek için gerekli olduğu ve ehliyet alındıktan sonra sadece Kod 95 sınavına girilmesi gerektiği belirtilmiştir."
        },
        {
          question: "GIS (Coğrafi Bilgi Sistemleri) bilmek Ziraat Mühendisleri için neden önemlidir?",
          answer: "GIS, yeryüzüne ait bilgileri toplama, depolama, analiz etme ve görüntüleme gibi işlemlere olanak sağlayan bir karar destek sistemidir. Yüksek lisans tez konusunu yazılım (örneğin GIS) ile birleştirmek tavsiye edilmiş. GIS, ziraat mühendisliği, biyoloji, harita mühendisliği gibi alanlarda eğitim görmüş kişiler için uygun bir ileri eğitim konusudur."
        },
        {
          question: "Tarım makineleri (Landtechnik) bölümü mezunları için ileri eğitim olarak hangi alanlar önerilir ve hangi teknik yetenekler aranır?",
          answer: "Tarım makineleri alanı otonom sistemler, görüntü işleme sistemleri, dronlar ile analiz ve tam otonom sera sistemleri gibi teknoloji ile ilerlemektedir. Gereken Teknik Yetenekler: Python (OpenCV, NumPy, TensorFlow), C++, ROS/ROS2, Linux bilgisi, CAN-BUS, GPS, RTK, IMU sensör bilgisi, Siemens NX, CATIA, SolidWorks gibi CAD programları ve ISOBUS standartları."
        },
        {
          question: "Tarım teknolojileri alanında iş ararken hangi firmaları kontrol etmeliyim?",
          answer: "John Deere, CLAAS, AGCO/Fendt, Same Deutz-Fahr gibi traktör ve tarım makinesi üreticileri, Naïo Technologies, Ecorobotix gibi otonom tarım startupları ve Fraunhofer, DFKI gibi araştırma kurumları kontrol edilmelidir."
        },
        {
          question: "Gıda kontrolörü olarak Türkiye'de çalışmış biri, Almanya'da Lebensmittelkontrolorin (Gıda Kontrolörü) olarak iş bulabilir mi?",
          answer: "Evet, Türkiye'de tarım bakanlığında gıda kontrolörü olarak çalışanlar, Almanya'da Lebensmittelkontrolorin olarak başvuru yapabilmektedirler (Jobcenter yönlendirmesiyle başvurular mevcuttur)."
        },
        {
          question: "İş arama sürecini hızlandırmak için hangi online iş portalları ve kaynaklar kullanılmalıdır?",
          answer: "İş ilanları için Jobbörse (arbeitsagentur.de), Agrar-jobportal.de, Stepstone.de, Indeed.de, LinkedIn Jobs ve Jobtensor kullanılabilir. Ayrıca Alman Ziraatçiler Konfederasyonu (DLG) gibi güçlü STK'ların gündemleri takip edilmelidir."
        },
        {
          question: "Ziraat Mühendisleri için kamu kurumlarında iş imkanları var mıdır?",
          answer: "Evet, Baden-Württemberg Eyaleti Tarım Bakanlığına bağlı Landesamt für Geoinformation und Landentwicklung gibi kurumlarda bilişim (IT) ve yazılım geliştirme alanında uzman personel (Sachbearbeiterin/er) pozisyonları açılabilmektedir."
        },
        {
          question: "Karbon tarımı veya tarımda yapay zeka kullanımı konusunda kariyer fırsatları var mıdır?",
          answer: "Evet, bu konular gelecekteki iş ilanlarında önemle aranacak alanlardır. Bu konularda bilgisi ve tecrübesi olan kişilerin irtibata geçmesi önerilmiştir."
        }
      ]
    },
    {
      category: "Uzmanlaşma ve Alternatif Kariyer Yolları",
      items: [
        {
          question: "Ziraat Mühendisleri, meslekte zorluk çekerlerse hangi alternatif sektörlere yönelebilirler?",
          answer: "Denklik alan ancak tarım sektöründe zorlanan birçok mühendis, IT sektörüne yönelmiştir. Örnek verilen alanlar: backend developer ve data analistlik."
        },
        {
          question: "Ziraat Mühendisleri hangi bilgisayar programlarını veya yazılımlarını öğrenirse daha rahat iş bulur?",
          answer: "İyi bir Auto Cad, Coreldraw veya Photoshop bilmek, ayrıca yazılım dillerinden Python, MATLAB ve tasarım programlarından Siemens NX veya SolidWorks bilmek tavsiye edilmiştir."
        },
        {
          question: "İş arama sürecini kolaylaştırmak için gönüllü ekolojik gönüllü (Ökologischen Bundesfreiwilligendienst) olarak çalışmak tavsiye edilir mi?",
          answer: "Evet, gönüllü ekolojik gönüllü olarak çalışmak, çevre edinmeyi ve iş bulma sürecini oldukça kolaylaştırdığı için şiddetle tavsiye edilmektedir."
        },
        {
          question: "Landwirtschaftsamt'a müracaat ederek alınabilecek temel ziraat bilgileri kursu (600 saatlik) kimler için uygundur?",
          answer: "Özellikle oturum bekleyen arkadaşların B1 seviyesinden sonra müracaat edebileceği, ziraat ile ilgili temel bilgileri içeren bir alternatif olarak önerilmiştir."
        },
        {
          question: "Münih'te Tarım Makinaları bölümü mezunuyum, iş bulabilme konusunda ileri eğitim olarak ne önerilir?",
          answer: "Tarım makineleri sektörü Almanya'da otonom sistemler ve görüntü işleme üzerinde ilerlediği için, Python, MATLAB, Siemens NX, Solidworks gibi yazılım ve tasarım programlarını geliştirmeniz önerilir."
        }
      ]
    },
    {
      category: "Staj (Praktikum) ve Deneyim Kazanma",
      items: [
        {
          question: "Hohenheim Üniversitesi'nde staj (Praktikum) yapmak mümkün müdür?",
          answer: "Evet, Hohenheim Üniversitesi'ne bağlı Bitki Islahı Enstitüsü'nden (Landessaatzuchtanstalt) Prof. Dr. Friedrich Longin, Pflanzenzüchtung (tohum yetiştirme ve araştırma) ile ilgili staj yapmak isteyenlere yardımcı olmaktadır."
        },
        {
          question: "Staj için en uygun başvuru zamanı nedir?",
          answer: "Staj yapmak isteyenlerin şimdilerde başvurması tavsiye edilmiştir, çünkü Mayıs'tan itibaren işler artmaktadır."
        },
        {
          question: "Hohenheim Üniversitesi'ndeki Prof. Dr. Friedrich Longin'e staj için nasıl başvurulur?",
          answer: "Prof. Dr. Friedrich Longin'e (e-posta adresi: friedrich.longin@uni-hohenheim.de) Herr Yildirim'ın tavsiyesi üzerine yazdığınızı belirterek staj yapmak istediğinizi iletebilirsiniz. Özgeçmişinizi de eklemeniz önerilir."
        },
        {
          question: "Staj başvurusu için dil seviyesi şartı var mı?",
          answer: "Dil seviyesi şartı aranmamaktadır, ancak söylenenleri anlamak yeterli olur."
        },
        {
          question: "Staj yapmanın temel amaçları nelerdir?",
          answer: "Staj yapmanın farklı amaçları vardır: Dil ve meslek sistemi öğrenme, meslek terimleri (Fachwörter) öğrenme ve meslek bölümlerini tanıma."
        },
        {
          question: "Staj yaparken karşılaşılabilecek zorluklar nelerdir?",
          answer: "Stajyerler bazen 'işçi' gibi veya vasıfsız işçilerle çalıştırılma muamelesi görebilirler."
        },
        {
          question: "Tarım Bakanlığına bağlı Genel Müdürlüklerde staj yapılabilir mi?",
          answer: "Evet, eyaletlerin Tarım Bakanlığına bağlı Genel Müdürlüklere (Landwirtschaftsamt gibi) doğrudan müracaat edilerek staj (Praktikum) yapmak istenildiği belirtilebilir."
        }
      ]
    },
    {
      category: "Günlük Yaşam ve Sosyal Ağ",
      items: [
        {
          question: "Almanya'da Ziraat Mühendisleri dayanışma grupları var mıdır?",
          answer: "Evet, Ziraat Mühendisleri için oluşturulmuş bir Telegram grubu ve ayrıca 'Anerkennung Grubu', 'Coğrafi Bilgi Sistemleri (GIS) Grubu' ve 'Bewerbung Hazırlık Grubu' gibi İdeal Akademi bünyesinde kurulmuş birçok ilgili grup mevcuttur."
        },
        {
          question: "Stuttgart şehri ya da civarında bilgi ve deneyim noktasında yardımcı olabilecek birisi var mı?",
          answer: "Evet, Stuttgart veya civarında olan arkadaşlara bilgi ve deneyim noktasında yardımcı olabilecek bir Beyefendi olduğu belirtilmiştir."
        },
        {
          question: "NRW (Kuzey Ren-Vestfalya) eyaletinde denklik yapan veya çalışan Ziraat Mühendisi var mıdır?",
          answer: "Evet, NRW'de denklik yapan, çalışan veya mesleki eğitimine devam eden Ziraat Mühendisleri mevcuttur ve bu kişiler IT alanına yönelmiştir."
        },
        {
          question: "Hobi bahçesi nasıl bulunur veya kiralanır?",
          answer: "Kendi mesleğini hobi olarak sürdürmek isteyenler, uzun vadeli kiralık arazi aramaktadır (ideal olarak 8-10 dönüm, tek parça tercih edilir)."
        },
        {
          question: "Hobi bahçesinde görülen delikler fareye mi, köstebeğe mi aittir?",
          answer: "Eğer bahçede toprak yığını varsa bu köstebek (Maulwurf) olabilir. Ancak arazide köstebek dolaşmışsa ve galerileri kullanarak küçük fareler bahçeyi delik deşik etmiş olabilir."
        },
        {
          question: "Almanya'da ev bulma konusunda yardımcı olabilecek bir grup var mıdır?",
          answer: "Evet, 'Almanya Geneli Ev Arama ve İkinci El Eşya Hediye Grubu' ile 'NRW 2. El Ücretsiz Eşya & Ev Bulmada Yardımcı Olma Grubu' gibi gruplar mevcuttur."
        },
        {
          question: "Vize başvuruları için bilgi veren özel bir sayfa var mıdır?",
          answer: "Vize başvuruları için özel bir sayfa olup olmadığı sorulmuştur. Ayrıca, eğitim amaçlı (lisans, yüksek lisans, doktora) Almanya'ya gelmek isteyenlere yönelik DAAD linkleri ve burs imkanları sunan web adresleri paylaşılmıştır."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Sprout className="w-12 h-12 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-green-500/20 text-green-100 hover:bg-green-500/30 border-0">
                  Mühendislik & Tarım
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Orta-Yüksek Talep
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  18dk Okuma
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ziraat Mühendisliği
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                Almanya'da Ziraat Mühendisi olarak kariyer yapmak, denklik süreçleri, tarım teknolojileri (GIS) ve yaşam rehberi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="w-full justify-start h-auto p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <TabsTrigger value="guide" className="px-6 py-3 rounded-lg data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400">
              <BookOpen className="w-4 h-4 mr-2" />
              Rehber
            </TabsTrigger>
            <TabsTrigger value="technical" className="px-6 py-3 rounded-lg data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <Cpu className="w-4 h-4 mr-2" />
              Teknik & GIS
            </TabsTrigger>
            <TabsTrigger value="faq" className="px-6 py-3 rounded-lg data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/20 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400">
              <HelpCircle className="w-4 h-4 mr-2" />
              Sıkça Sorulan Sorular
            </TabsTrigger>
            <TabsTrigger value="experiences" className="px-6 py-3 rounded-lg data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tecrübeler
              <Badge className="ml-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-100 border-0">
                {experiences.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="documents" className="px-6 py-3 rounded-lg data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400">
              <FileText className="w-4 h-4 mr-2" />
              Dokümanlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            
            <ProfessionVideoPlayer professionSlug="ziraat-muhendisligi" />

            {/* Bölüm 1: Hazırlık */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  I. Hazırlık Aşaması: Dil, Denklik ve Uzmanlaşma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">1. Dil Yeterliliği (Sprachkenntnisse)</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Almanya'da Ziraat Mühendisleri için iş piyasasında en kritik unsur Almancadır. Kendini ve mesleğini iyi ifade edebilmek esastır.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Genel Tavsiye:</strong> C1 seviyesi.</li>
                    <li><strong>Uluslararası Firmalar:</strong> C1 Almanca + Akıcı İngilizce.</li>
                    <li><strong>Başlangıç:</strong> B1/B2 seviyesi ile de başvurular yapılabilir ancak rekabet zordur.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">2. Mesleki ve Akademik Denklik (Anerkennung)</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Önemli Ayrım: Reguliert vs Unreguliert</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Ziraat Mühendisliği mesleği <strong>unreguliert</strong> (düzenlenmemiş) bir meslektir. Yani diplomanızla doğrudan çalışabilirsiniz. ANCAK, <strong>"Ingenieur" (Mühendis)</strong> unvanı koruma altındadır. Kendinize "Mühendis" diyebilmek için denklik şarttır.
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="ingenieurkammer">
                      <AccordionTrigger>Mühendisler Odası (Ingenieurkammer) Başvurusu</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">"Ingenieur" unvanı için eyaletinizdeki Mühendisler Odası'na başvurmalısınız (Örn: ingBW Baden-Württemberg).</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <li><strong>Kriter:</strong> Eğitiminizin en az %50'sinin MINT (Matematik, Fen, Mühendislik) konularından oluşması gerekir.</li>
                          <li><strong>Süre:</strong> Yaklaşık 6 ay.</li>
                          <li><strong>Sonuç:</strong> Onay alırsanız "Ingenieur" unvanını kullanabilirsiniz. Red alırsanız mesleği yapabilir ama unvanı kullanamazsınız.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="zab">
                      <AccordionTrigger>Akademik Denklik (ZAB)</AccordionTrigger>
                      <AccordionContent>
                        <p>Lisans diplomanızın akademik olarak tanınması için Bonn'daki ZAB (Zentralstelle für ausländisches Bildungswesen) üzerinden "Zeugnisbewertung" alabilirsiniz. Bu belge iş başvurularında diplomanızın Alman sistemindeki karşılığını gösterir.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">3. Uzmanlaşma ve İleri Eğitim (Weiterbildung)</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Klasik tarım işleri dışında, teknoloji odaklı alanlarda iş bulma şansı çok daha yüksektir.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-slate-50 dark:bg-slate-900">
                      <CardHeader className="pb-2"><CardTitle className="text-base">Geleceğin Konuları</CardTitle></CardHeader>
                      <CardContent className="text-sm">
                        İklim değişikliği, Gıda güvenliği, Karbon tarımı ve Yapay Zeka.
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50 dark:bg-slate-900">
                      <CardHeader className="pb-2"><CardTitle className="text-base">GIS & IT</CardTitle></CardHeader>
                      <CardContent className="text-sm">
                        Coğrafi Bilgi Sistemleri (GIS), Python, Veri Analizi ve Otonom Sistemler.
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gerekli Belgeler Listesi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="w-6 h-6 text-orange-500" />
                  Gerekli Belgeler Listesi
                </CardTitle>
                <CardDescription>
                  Denklik (Anerkennung) ve iş başvuruları için hazırlamanız gereken temel belgeler.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Diploma (Diplom) - Almanca Tercüme & Apostil",
                    "Transkript (Notenspiegel) - Almanca Tercüme & Apostil",
                    "Lise Diploması (Abiturzeugnis) - Bazı eyaletlerde istenir",
                    "Özgeçmiş (Lebenslauf) - Tablo şeklinde, Almanca",
                    "Niyet Mektubu (Motivationsschreiben)",
                    "Dil Sertifikası (Sprachzertifikat - B1/B2/C1)",
                    "Pasaport Fotokopisi",
                    "Varsa İş Sözleşmesi veya İş Teklifi",
                    "Varsa Mesleki Referanslar (Arbeitszeugnisse)",
                    "Varsa Staj Belgeleri"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span><strong>Önemli:</strong> Belgelerin "Aslı Gibidir" (Beglaubigung) onaylı kopyaları gerekebilir. Bu işlemi Alman konsolosluklarında veya Almanya'da Bürgeramt/Rathaus'ta yaptırabilirsiniz.</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bölüm 2: Vize ve Varış */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plane className="w-6 h-6 text-blue-500" />
                  II. Vize, Varış ve Yaşam
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Konaklama
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Almanya'da ev bulmak oldukça zordur. Özellikle büyük şehirlerde aylar sürebilir. "Vitamin B" (Tanıdık vasıtasıyla) ev bulmak yaygındır.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Sosyal Çevre
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Ziraat Mühendisleri dayanışma grupları ve Zoom toplantıları mevcuttur. Ayrıca "Hobby Bahçesi" (Kleingarten) kiralayarak tarımsal faaliyetlere hobi olarak devam edebilirsiniz.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bölüm 3: İş Hayatı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-6 h-6 text-purple-500" />
                  III. İş Hayatı ve Kariyer Fırsatları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">İş Arama Stratejileri</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Online Portallar</h4>
                      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Jobbörse (arbeitsagentur.de)</li>
                        <li>• Agrar-jobportal.de</li>
                        <li>• Stepstone.de, Indeed.de</li>
                        <li>• LinkedIn Jobs</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Networking & Fuarlar</h4>
                      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Grüne Woche (Berlin Fuarı)</li>
                        <li>• Landwirtschaftmesse Deutschland</li>
                        <li>• DLG (Alman Ziraatçiler Konfederasyonu)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Alternatif Kariyer Yolları</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="it">
                      <AccordionTrigger>IT ve Yazılım Sektörü</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Ziraat mühendisleri arasında IT sektörüne (Data Analist, Backend Developer) geçiş yaygındır. Python, SQL ve GIS bilgisi bu geçişi kolaylaştırır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="public">
                      <AccordionTrigger>Kamu Kurumları (Sachbearbeiter)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Tarım Bakanlığına bağlı kurumlarda (Örn: LGL Baden-Württemberg) uzman personel olarak çalışılabilir. Özellikle yazılım ve proje yönetimi bilgisi aranır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="field">
                      <AccordionTrigger>Saha ve Çiftlik İşleri</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Zootekni mezunları için çiftlik yönetimi, hayvan bakımı; Tarım makineleri mezunları için operatörlük işleri mevcuttur. Bu işler için genellikle <strong>CE Ehliyeti</strong> (Tır/Römork) şarttır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Map className="w-6 h-6 text-blue-500" />
                  Coğrafi Bilgi Sistemleri (GIS) ve Teknoloji
                </CardTitle>
                <CardDescription>
                  Modern tarımın vazgeçilmezi olan teknolojik yetkinlikler.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Neden GIS?</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Ziraat mühendisleri için en önemli uzmanlık alanlarından biridir. Arazi yönetimi, rekolte tahmini ve hassas tarım uygulamalarında kullanılır. Online ve Türkçe kurslar mevcuttur.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Tarım Teknolojileri (Landtechnik) İçin Gerekenler</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> Yazılım & Programlama
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Python (OpenCV, NumPy, TensorFlow)</li>
                        <li>C++ (Gömülü Sistemler)</li>
                        <li>ROS/ROS2 (Robot Operating System)</li>
                        <li>Linux (Ubuntu, Terminal)</li>
                      </ul>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Tractor className="w-4 h-4" /> Donanım & Tasarım
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>CAD (Siemens NX, CATIA, SolidWorks)</li>
                        <li>Sensörler (CAN-BUS, GPS, RTK, IMU)</li>
                        <li>ISOBUS Standartları</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Languages className="w-6 h-6 text-purple-500" />
                  Mesleki Terimler (Fachbegriffe)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400">
                      <tr>
                        <th className="px-6 py-3">Almanca</th>
                        <th className="px-6 py-3">Türkçe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Landwirtschaft', 'Tarım / Ziraat'],
                        ['Pflanzenschutz', 'Bitki Koruma'],
                        ['Pflanzenzüchtung', 'Bitki Islahı'],
                        ['Tierzucht / Zooteknie', 'Hayvan Yetiştiriciliği / Zootekni'],
                        ['Landtechnik', 'Tarım Teknolojileri / Mekanizasyon'],
                        ['Lebensmittelsicherheit', 'Gıda Güvenliği'],
                        ['Klimawandel', 'İklim Değişikliği'],
                        ['Nachhaltigkeit', 'Sürdürülebilirlik'],
                        ['Bodenkunde', 'Toprak Bilimi'],
                        ['Düngung', 'Gübreleme'],
                        ['Ernte', 'Hasat'],
                        ['Gewächshaus', 'Sera'],
                        ['Schädling', 'Zararlı (Böcek vb.)'],
                        ['Unkraut', 'Yabani Ot'],
                        ['Bewässerung', 'Sulama']
                      ].map(([de, tr], i) => (
                        <tr key={i} className="bg-white border-b dark:bg-slate-900 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{de}</td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{tr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HelpCircle className="w-6 h-6 text-orange-500" />
                  Sıkça Sorulan Sorular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((category, i) => (
                    <div key={i} className="mb-6 last:mb-0">
                      <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">{category.category}</h3>
                      {category.items.map((item, j) => (
                        <AccordionItem key={j} value={`item-${i}-${j}`}>
                          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                          <AccordionContent className="text-slate-600 dark:text-slate-400">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Almanya'daki ziraat mühendislerinin gerçek deneyimleri.
                </p>
              </div>
              <ShareExperienceDialog professionSlug="ziraat-muhendisligi" defaultProfessionName="Ziraat Mühendisliği" />
            </div>

            <div className="grid gap-6">
              {experiences.length > 0 ? (
                experiences.map((exp) => (
                  <Card key={exp.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{exp.title}</CardTitle>
                          <CardDescription>{exp.author_name} • {exp.duration}</CardDescription>
                        </div>
                        <Badge>{exp.city}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{exp.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Henüz tecrübe paylaşılmamış</h3>
                    <p className="text-slate-500 max-w-md mb-6">
                      Bu alanda tecrübesi olan ilk kişi siz olun. Deneyimleriniz başkalarına yol gösterecektir.
                    </p>
                    <ShareExperienceDialog professionSlug="ziraat-muhendisligi" defaultProfessionName="Ziraat Mühendisliği" />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentSection professionSlug="ziraat-muhendisligi" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
