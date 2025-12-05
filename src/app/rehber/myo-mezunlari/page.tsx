"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
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
  BookOpen,
  Wrench,
  Hammer,
  Stethoscope,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MyoMezunlariPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%MYO%,profession.ilike.%Tekniker%,profession.ilike.%Önlisans%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const faqData = [
    {
      category: "Diploma Denklik (Anerkennung) ve Tanımlar",
      items: [
        {
          question: "MYO diplomasının (Önlisans/Associate Degree) Almanca tam karşılığı tam olarak ne oluyor?",
          answer: "MYO diplomasının tercüme olarak değil, Almanya'daki eğitim sistemindeki karşılığı olan okul türü ve adı Berufsfachschule (Mesleki Branş Okulu) olarak kabul edilir. Bu, alanı belli olan, okulda yapılan (uygulamalı olmayan) mesleki bir eğitim anlamına gelir."
        },
        {
          question: "MYO diploması Almanya’daki eğitim sisteminde tam olarak neye karşılık geliyor, Fachhochschule (FH) ile aynı mıdır?",
          answer: "Hayır, MYO diplomasının Almanya'daki karşılığı Fachhochschule (FH) DEĞİLDİR. FH'ler uygulamalı yüksekokul olarak kabul edilir ve Lisans (Bachelor) diploması verirken, MYO mezuniyeti Alman eğitim sisteminde Berufsfachschule (Mesleki Branş Okulu) olarak işlem görür ve kabul edilir. Türkiye'deki önlisans derecesi resmî olarak Türk üniversite sektörünün bir parçası olsa da, içerik açısından Alman meslek okulu eğitimleriyle (Berufsfachschulausbildungen) karşılaştırılabilir durumdadır."
        },
        {
          question: "MYO mezunlarının mesleki tanınma (Berufliche Anerkennung) işlemini nerede yaptırması gerekiyor?",
          answer: "MYO mezunları, diplomalarının mesleki tanınmasını ilgili meslek odasında veya kurumda yaptırmalıdır. Teknik bölümler için bu genellikle IHK FOSA (IHK FOreign Skills Approval) Nürnberg üzerinden yapılır. Bonn/ZAB ise sadece belge değerlendirmesi yapar, mesleki tanınma yeri değildir."
        },
        {
          question: "Bonn / ZAB ne işe yarar? Diploma tanınma yeri midir?",
          answer: "ZAB (Zentralstelle für ausländisches Bildungswesen), bir diploma tanınma yeri DEĞİLDİR. ZAB, Türk üniversite diplomalarının (Önlisans/Berufsfachschule, Lisans/Bachelor, Yüksek Lisans/Master) Alman kurumlarının istediği formattaki değerlendirmesini ve belgelendirmesini yapan merkezdir."
        },
        {
          question: "Otomotiv Teknolojisi/Motor Bölümü gibi teknik meslekler için denklik başvurusu IHK FOSA'ya mı yoksa HWK'ya mı yapılmalıdır?",
          answer: "Otomotiv/Motor Bölümü gibi zanaatkârlık (Handwerk) alanına giren meslekler genellikle HWK (Handwerkskammer)'nın sorumluluğuna girer. Başvurular IHK FOSA'ya gönderilse bile, IHK FOSA evrakları geri yollayarak ikamet edilen bölgedeki HWK ile iletişime geçilmesini isteyebilir."
        },
        {
          question: "Tornacılık gibi alanlarda eskiden HWK bakarken şimdi IHK mı bakıyor?",
          answer: "Tornacılık gibi bazı meslekler için eskiden HWK bakarken, artık evrensel torna kalmadığı için IHK'nın baktığına dair tecrübe paylaşımı mevcuttur. Ancak MYO mezunlarının lise mezuniyetinin eski olması gibi durumlarda, hangi kurumun yetkili olduğu eyalete göre değişkenlik gösterebilir."
        },
        {
          question: "Sosyal ve sağlık alanları gibi düzenlenmiş meslekler (reglementiert Meslekler) için mesleki tanınma nerede yapılır?",
          answer: "Bu tür düzenlenmiş meslekler (Öğretmenlik, Hukuk, Tıp-Sağlık, Psikoterapi, bazı Mühendislik dalları) için mesleki tanınmanın nerede yapılacağı www.anerkennung-in-deutschland.de sitesinde adım adım ilerlenerek öğrenilmelidir."
        },
        {
          question: "Diploma Anerkennung (Denklik) yaptıran oldu mu acaba? Olumlu dönüş olduğunda Ausbildung yapmış gibi mi sayılıyoruz?",
          answer: "Genellikle MYO mezunları, Almanya'daki Ausbildung (mesleki eğitim) yapmış gibi kabul edilmez, aksine Ausbildung'a denk bir mesleki yeterliliğe (Berufsfachschule) sahip oldukları yönünde bir değerlendirme alırlar. Alınan sonuç çoğunlukla kısmi denklik (Teilweise Gleichwertigkeit) olur. Tam denklik (Ausbildung yapmış gibi sayılma), ancak eksik görülen konuların tamamlanmasıyla elde edilir."
        },
        {
          question: "Kısmi denklik (Teilweise Gleichwertigkeit) alan MYO mezunu ne olarak çalışabilir?",
          answer: "Kısmi denklik alan mezunlar, mesleğin Almanyadaki birebir karşılığı olan pozisyonlarda ancak kalifiye personelin yardımcısı (Fachhelfer) olarak çalışabilirler. Bu durumda, mesleğine göre A2, B1 veya B2 seviyede Almanca bilgisi şarttır."
        },
        {
          question: "Tam denklik (Gleichfertig Anerkennung) nasıl alınır? Hangi uygulamalarla sağlanır?",
          answer: "Tam denklik almak için, mesleki tanınma kurumu tarafından eksik görülen derslerin veya tecrübelerin tamamlanması gerekir. Bu tamamlama, Oryantasyon Eğitimi (Anpassungslehrgang) veya çalışma/staj (Praktikum) uygulamasıyla sağlanır. Anpassungslehrgang genellikle 6 ay ile 1 yıl arasında sürer ve sonunda yazılı, sözlü ve uygulamalı Devlet Sınavları (Staatliche Prüfung) yapılır."
        },
        {
          question: "Anpassungslehrgang nedir ve ne kadar sürer?",
          answer: "Anpassungslehrgang, denklik sonucu eksik görülen konuları tamamlamak için gerekli görülebilen bir uyum eğitimidir. Bu eğitim 6 ay ile 1 yıl arası sürebilir."
        },
        {
          question: "Türkiye'deki iş tecrübesinin denklik işlemlerinde olumlu katkısı oluyor mu?",
          answer: "Evet, iş tecrübesi (örneğin 6 aylık aşçı olarak sigorta kaydı) denklik işlemlerinde olumlu anlamda katkı sağlayabilir. Ayrıca 15 yıl üzeri iş tecrübesi olan Elektronik güvenlik sistemleri uzmanının tecrübesini belgelediği takdirde Anpassungslehrgang'a gerek kalmayabileceği düşünülmüştür."
        },
        {
          question: "Sigortasız çalışılan iş tecrübesini belgelemek için alınacak 'şu kişi şu tarihler arası çalışmıştır' belgesinin geçerliliği var mıdır?",
          answer: "Böyle bir belgenin geçerliliği personele bağlı bir durumdur, ancak antetli kağıtta, kaşeli ve imzalı olduğu sürece kabul edilebileceği düşünülmektedir."
        },
        {
          question: "IHK meslek denkliği başvuru ücreti ne kadardır ve bu ücret Jobcenter tarafından karşılanıyor mu?",
          answer: "IHK denklik başvurusu için 550 Euro civarında bir ücret fatura edilmektedir (ZAB değerlendirmesi 208 Euro'dur, karıştırılmamalıdır). Bazı Jobcenter'lar bu 550 Euro'luk ödeme konusunda yardımcı olmaktadır."
        }
      ]
    },
    {
      category: "Belge Hazırlığı ve Tercümeler",
      items: [
        {
          question: "Denklik başvurusunda sertifikalar (ek belgeler) gönderilmeli midir?",
          answer: "Evet, elinizde işle ilgili ne varsa göndermekte fayda vardır. Ancak sertifikaların çok olması nedeniyle çeviri faturasının (Rechnung) yüksek çıkması durumunda, Job Center faturanın tamamını karşılamayabilir. Bu nedenle sadece mesleğiniz için özellikle önemli olan sertifikaları seçmeniz tavsiye edilir."
        },
        {
          question: "Denklik başvurusu için ders içerikleri (Lehrplan) tam olarak nedir ve neden istenir?",
          answer: "Lehrplan, yani müfredat, transkriptten farklı olarak hangi derste nelerin işlendiğini gösteren resmi bir belgedir. Meslek lisesi ve MYO mezunlarından denklik için bu müfredat istenmektedir. Müfredatı vermemek, yapılması gereken ödevlerin çoğalmasına neden olabilir."
        },
        {
          question: "E-devletten alınan mezuniyet belgesi diploma yerine geçer mi?",
          answer: "E-devletten alınan belgelerin geçerliliği konusunda net bir bilgi olmamakla birlikte, transkriptlerin üniversiteler tarafından kısa sürede e-devlete yükleneceği belirtilmiştir."
        },
        {
          question: "Çalıştığınızı belgeleyen hizmet dökümünü (yani çalıştığınızı belgeleyen döküman) çeviriye eklemek önemli midir?",
          answer: "Evet, çalıştığınızı belgeleyen hizmet dökümünün mutlaka çevrilecek belgeler arasına eklenmesi tavsiye edilir."
        },
        {
          question: "Belgelerin çeviri (Übersetzungen) ücretlerini Job Center'a karşılatmak için nasıl bir süreç izlenir?",
          answer: "Öncelikle Job Center'daki danışmanla konuşup onay alınır. Genellikle 2 veya 3 farklı tercüme şirketi teklifi (Angebot) istenir. En düşük teklifi veren yeminli tercüme (vereidigte Übersetzer) şirketini tercih etmeniz istenebilir."
        },
        {
          question: "Belgeleri tercüme ettirirken nelere dikkat edilmelidir?",
          answer: "Tercümeler mühürlenmeden önce, meslek ve ders isimlerinin yanlış yazılmadığından emin olmak için mutlaka kontrol edilmelidir."
        },
        {
          question: "Anerkennung için lise diploması gerekli mi? Eski mezunlar diplomasının aslı olmaması durumunda ne yapmalıdır?",
          answer: "Bazı danışmanlar Anerkennung için lise diplomasının da gerekli olduğunu belirtmektedir. Eğer lise diplomasının aslı elinizde yoksa veya eski mezuniyetler nedeniyle online kaydı bulunmuyorsa, okulla şahsen irtibata geçilebilir. Okullar vekalet kabul ediyorsa, Türkiye'deki birinci derece akrabanız noter vekaletiyle diplomayı okuldan alabilir. Ayrıca deprem gibi özel durumlarda diploma aslını kaybedenler için de bu yol izlenebilir."
        },
        {
          question: "Red alan ve çeviri parasını kendisi ödeyenler, bu parayı sonradan geri alabilir mi?",
          answer: "Eğer çeviri parası kişi tarafından ödenirse, banka dekontunun mutlaka saklanması gerekir. İlerde oturum izni geldiğinde Job Center'dan bu paranın geri alınabileceği belirtilmiştir."
        },
        {
          question: "Tıbbi Laboratuvar Teknikeri ve Sağlık Bakım Teknisyeni mezunları için denklik işlemleri nasıl yapılır?",
          answer: "Bu, sağlık alanı olduğu için düzenlenmiş meslekler (reglementiert Meslekler) kapsamına girer. Süreç için öncelikle www.anerkennung-in-deutschland.de sitesinden başvuru yeri belirlenmeli, ardından gerekli belgelerle (diploma, transkript, ders içerikleri vb.) denklik kurumuna başvurulmalıdır."
        }
      ]
    },
    {
      category: "Mesleki Alanlar ve Kariyer Yönlendirmeleri",
      items: [
        {
          question: "Doğalgaz, Isıtma ve Sıhhi Tesisat Teknolojisi MYO mezununun denklik sonucu nasıl gelmiştir ve tam denklik için ne istenmiştir?",
          answer: "Türkiye'de iş tecrübesi olan bir mezunun denklik sonucunda, 6 aylık çalışma (Praktikum) tecrübesi ve B2 Almanca sertifikası ile tam denklik alabileceği belirtilmiştir. Bu sürecin sonunda Fachtkraft (Uzman/Teknisyen) olabileceği ve Meister (Ustalık) sınavına girmeye hak kazanabileceği bilgisi paylaşılmıştır."
        },
        {
          question: "Meslek lisesi elektronik ve MYO endüstriyel elektronik mezunu, denkliğini hangi diplomaya göre yaptırmalıdır?",
          answer: "10 yıl üzeri iş tecrübesi olan bir kişi için, denkliğini hangi diplomaya göre yaptırmasının daha avantajlı olacağı sorulmuştur. Bu durumda, hem lise hem yüksekokul hem de 15 yıllık iş tecrübesinin belgelenmesi tavsiye edilmiştir."
        },
        {
          question: "Elektrik MYO mezunlarının Anabin'de direkt karşılığı neden Elektronik olarak görünüyor ve mesleki tanınma için ne yapmalıyım?",
          answer: "Almanya'da 2 yıllık MYO karşılığı tam olarak bulunmadığı için, denklik sonucu Elektronik olarak gelebilir. Bu durum, Türkiye'deki ve buradaki bölümler arasındaki uzmanlaşma yollarının farklı olmasından kaynaklanabilir. Mesleki tanınma için Elektrikçi olarak çalışmak isteniyorsa, IHK FOSA Nürnberg'e başvurulmalıdır."
        },
        {
          question: "2 yıllık raylı sistemler makinistlik programı mezunu, denklik ve dil şartıyla Ausbildung yapmadan veya Umschulung ile mesleğini icra edebilir mi?",
          answer: "Bu mesleği (Lokführer/Makinistlik) icra edebilme ihtimali araştırılmalı; denklik ve dil yeterliliği şartıyla Ausbildung yapmadan veya Umschulung (meslek değiştirme eğitimi) yoluyla mesleği icra etme imkanları değerlendirilmelidir."
        },
        {
          question: "2 yıllık Mekatronik mezunu nasıl bir yol izlemelidir?",
          answer: "Mekatronik mezunlarının da denklik süreçlerini başlatmaları ve çıkan sonuca göre Ausbildung, Weiterbildung veya Anpassungslehrgang yollarını izlemeleri tavsiye edilir."
        },
        {
          question: "Türkiye'de Elektrik Elektronik Mühendisliği 2. sınıfı bitirip Almanya'ya gelen biri üniversiteye devam etmek için ne yapmalıdır?",
          answer: "Bu kişi Almanya'da üniversiteye devam etmek istiyorsa, özellikle uygulamalı yüksekokul olan Fachhochschule'yi (FH) tavsiye edenler olmuştur."
        },
        {
          question: "Gıda Teknolojisi MYO mezunları diplomalarını nasıl tanıtır ve hangi denklik sonucu gelir?",
          answer: "Gıda Teknolojisi mezunları diplomalarını (önlisans ve transkript) Almanca tercüme ettirip IHK FOSA'ya gönderirler. Gelen denklik genellikle Fachkraft Lebensmitteltechnologie (Gıda Teknolojisi Uzmanı) olur ve çoğunlukla kısmi denklik (%75 civarı tanınma) gelir."
        },
        {
          question: "Gıda Teknolojisi bölümü için kısmi denklik alınırsa tam denklik için hangi eksiklikler belirtilmiştir?",
          answer: "Kısmi denklik alan bir mezun için IHK, genellikle iki konuda eksiklik belirtmiştir: 1) Üretim süreçlerinin yönetimi, 2) 9 aylık günde 8 saat çalışma ortamındaki staj (Vollzeitpraktikum)."
        },
        {
          question: "Kısmi denklik alan Gıda Teknolojisi mezunu, bu denklik ile nerelerde ilerleyebilir ve alternatif kariyer yolları nelerdir?",
          answer: "Kısmi denklik belgesi gösterilerek büyük firmaların (Aldi, Lidl, Rewe, Edeka) üretim geliştirme bölümlerine müracaat edilebilir. 9 aylık ücretli stajı tamamlayıp tam tanınma sağlanabilir. Alternatif kariyer yolları ise şunlardır: 1. Ernährungsberatung (Beslenme Danışmanlığı) veya Diyetisyenlik üzerine yoğunlaşmak. 2. Helal Gıda sektöründe ilerlemek."
        },
        {
          question: "Odyometri mezunları için Almanya'da iş imkanı nasıldır ve nasıl bir yol izlenir?",
          answer: "Odyometri mesleği Almanya'da HNO-Audiologieassistent (KBB Asistanı) olarak Ausbildung ve 2 yıl eğitim gerektirse de, Hörakustiker (İşitme Cihazı Akustiği Uzmanı) alanında da çalışılabilir. Bir Odyometrist, denklik süreci devam ederken Verkaufsassistentin (Satış Asistanı) olarak işe başlamış ve sahada mesleği öğrendiğini belirtmiştir. Hörakustiker Ausbildung'u sonrası Ustalık Sınavı (Meister) mevcuttur."
        },
        {
          question: "Tıbbi Görüntüleme Teknikleri (Radyoloji Teknikerliği) alanında Anerkennung, Weiterbildung ve işe başlama süreci nasıldır?",
          answer: "Bu alanda tecrübe edinme ve yol haritası hakkında bilgi arayışı mevcuttur, ancak kaynaklarda spesifik bir yol haritası paylaşılmamıştır."
        },
        {
          question: "Biyomedikal Cihaz Teknolojileri mezunları için durum nedir?",
          answer: "Biyomedikal Cihaz Teknolojileri mezunları grupta bilgi paylaşımı istemiş, ancak denklik süreci hakkında net bir bilgi veya tecrübe paylaşımı mevcut değildir."
        },
        {
          question: "Tıbbi Dokümantasyon ve Sekreterlik mezunları burada hangi alanda Ausbildung/Weiterbildung yapmalıdır?",
          answer: "Tıbbi Sekreterlik mezunları için Jobcenter danışmanları Weiterbildung (ileri eğitim) imkanı olduğunu belirtmiştir. Ayrıca Medizinische Kodierfachkraft (Kodirirung) mesleği hakkında bilgi arayışı da bulunmaktadır."
        },
        {
          question: "Aşçılık önlisans mezunu Almanya'da ne gibi bir çalışma imkanı bulur?",
          answer: "Aşçılık diploması Almanya'da çok işe yarayabilir. Özellikle mutfak, restoran ve catering işlerinde Jobcenter sizi meslek içi eğitime (Umschulung) ya da bir işe yönlendirebilir."
        },
        {
          question: "Liseden sağlık bakım teknisyeni ve üniversiteden tıbbi laboratuvar teknikeri mezunu için denklik işlemleri nasıl yapılır?",
          answer: "Bu alanlar düzenlenmiş meslekler kategorisindedir ve denklik işlemleri için yetkili kurumlar belirlenmelidir."
        },
        {
          question: "Meslek lisesi çocuk gelişimi ve önlisans mezunu, Almanya'da Ausbildung yapmış gibi bir hakka sahip oluyor mu?",
          answer: "Hayır, MYO diploması doğrudan Ausbildung yapmış gibi bir hak vermez. Bu kişi için izlenmesi gereken yol haritası hakkında danışmanlık alınması önerilmiştir."
        },
        {
          question: "Açıköğretim Sosyal Hizmetler bölümünü bitirenlerin diploması Almanya'da tanınıyor mu?",
          answer: "Evet, Anadolu Üniversitesi gibi kurumların Açık Öğretim (AÖ) diplomaları da Almanya'da akreditedir ve tanınmaktadır. MYO mezunları için genel kural geçerlidir: 2 yıllık önlisans mezuniyeti, Berufsfachschule (okullu Ausbildung) mezuniyetine denk gelir."
        },
        {
          question: "Halkla İlişkiler önlisans ve AÖ İlahiyat okuyan biri Almanya'da hangi mesleği yapabilir/nasıl bir yol izlemelidir?",
          answer: "Bu alanlarda mezun olan kişinin dil kursuna başladıktan sonra Ausbildung yapması gerekebilir. Sosyal hizmetler, manevi bakım (Seelsorge) veya eğitim alanlarındaki Weiterbildung imkanları değerlendirilebilir."
        },
        {
          question: "Önlisans bilgisayar programcılığı mezununun denklik sonucu ne gelmiştir ve ne yapabilir?",
          answer: "Bir MYO Bilgisayar Programcılığı mezunu, diplomasını Berufsfachschule olarak tanıtmış ve direkt bilgisayar programcılığı olarak tanınma almıştır. Bu sonuçla kişi ister Ausbildung yapsın, ister üniversiteye kayıt yaptırıp derslerini saydırabilir."
        },
        {
          question: "Bankacılık ve Sigortacılık MYO mezunu, açık öğretim işletme lisansını tamamladıysa ve 6 ay sigortacılıkta çalıştıysa Ausbildung yapabilir mi?",
          answer: "Evet, Ausbildung yapma imkanı mevcuttur. Kişinin mesleki tecrübe, kaynaklı ve yaşamdaki pratik karşılığı olan bilgileri edinmesi önemlidir."
        },
        {
          question: "Muhasebe MYO mezunu, Ausbildung/Umschulung bulamazsa nereden başlamalı ve Almanya'da geliri nedir?",
          answer: "Muhasebe MYO mezunu, Ausbildung veya Umschulung bulmakta zorlanabilir. Bu alanda Kauffrau/Mann (ön muhasebe, satış temsilciliği) eğitimi almış kişiler iş ilanlarında aranmaktadır."
        },
        {
          question: "Muhasebe iş ilanlarında istenen Kauffrau/Mann Ausbildung'unun Muhasebe MYO mezunları için önemi nedir?",
          answer: "İş ilanlarında istenen Kauffrau/Mann Ausbildung'u, muhasebe MYO mezunları için önemli bir gereklilik olarak karşımıza çıkabilir."
        },
        {
          question: "Harita Kadastro teknikerliği mezunu Almanya'da nerelerde çalışır ve çalışma şartları nasıldır?",
          answer: "Harita Kadastro teknikerliği mezunu, Almanya'daki çalışma alanları ve şartları hakkında bilgi arayışı mevcuttur, ancak kaynaklarda net bir cevap bulunmamaktadır."
        },
        {
          question: "Büro Yönetimi ve Sekreterlik mezunu burada denklik alan veya bu diploma ile çalışan var mı? Çalışma alanları nedir?",
          answer: "Büro yönetimi ve yönetici asistanlığı mezunlarının diplomasının geçerli sayılıp sayılmadığı veya bu alanda denklik alıp çalışan olup olmadığı hakkında bilgi arayışı mevcuttur."
        }
      ]
    },
    {
      category: "Kariyer Alternatifleri ve İleri Eğitim",
      items: [
        {
          question: "2 yıllık MYO mezunları Almanya'da 4 yıla tamamlama (lisans) yapabilir mi?",
          answer: "Hayır, Türkiye'deki 2 yıllık MYO'nun Almanya'da 4 yıla tamamlama (Lisans) imkanı olmadığı belirtilmiştir. Ancak mezunlar üniversiteye kayıt yaptırıp derslerini saydırma imkanını araştırmalıdırlar."
        },
        {
          question: "Lise veya 2 yıllık önlisans mezunları burada Fernstudium (uzaktan eğitim) yapabilir mi?",
          answer: "Lise veya 2 yıllık önlisans (TR) mezunlarının Almanya'da Fernstudium yapıp yapamayacağı sorulmuş, ancak kesin bir cevap kaynaklarda bulunmamaktadır."
        },
        {
          question: "İş tecrübesi olmadan sadece Tableau veya Power BI gibi tool'ları öğrenerek yıllık 50.000 € gelir ile Data Analist olarak iş bulunabilir mi?",
          answer: "Evet, bazı kurslar sadece Tableau veya Power BI gibi araçları öğrendikten sonra, iş tecrübesi olmasa dahi yıllık 50.000 € gelir ile uzaktan veya yerinde Data Analist olarak iş bulabileceği iddiasıyla tanıtım yapmaktadır."
        },
        {
          question: "Jobcenter, Weiterbildung (ileri eğitim) kurslarını finanse ediyor mu ve bu kurslar hangi alanlarda olabilir?",
          answer: "Evet, Jobcenter veya Arbeitsagentur tarafından tamamen devlet destekli 500'e yakın Online Eğitim Programı finanse edilebilir. Bu programlar Softwareentwicklung/Programlama, IT Sertifikaları, Pazarlama/Yönetim, Kalite Yönetimi, Tıp/Bakım/Sosyal Alanlar gibi çeşitli üst başlıklarda olabilir."
        },
        {
          question: "Jobcenter'dan kurslar için gutschein (kupon) alırken nelere dikkat edilmeli?",
          answer: "Jobcenter'dan kupon alırken nelere dikkat edilmesi gerektiği ve nasıl talep edileceği konusunda bilgilendirme programları yapılmıştır."
        },
        {
          question: "Yüksek nitelikli IT uzmanlarının 'iş sözleşmesi olmadan oturum yok, oturum olmadan iş sözleşmesi yok' döngüsünden kurtulmak için ne yapması gerekir?",
          answer: "Bu döngüden kurtulmanın yolu, uygun bir şirketle İş Sözleşmesi (Arbeitsvertrag) yapılması ve şirketin gerekli ek belgeyi (Beschäftigungsverhältnis kağıdı) sağlamasıdır."
        },
        {
          question: "Kendi mesleğini icra edemeyecek MYO mezunları için hangi alternatif meslekler öneriliyor?",
          answer: "Kendi mesleğini icra edemeyecekler için Raylı Sistemler (Lokführer/Makinistlik), LKW (Ağır Vasıta Şoförlüğü), Erzieherlik (Eğitimci) ve Fizyoterapi gibi meslekler alternatif olarak gösterilmiştir."
        },
        {
          question: "Denklik süreci devam ederken teknik meslek mezunları sahada kendilerini geliştirebilecekleri hangi pozisyonlarda çalışabilirler?",
          answer: "Teknik meslek mezunları, denklik işlemleri devam ederken bile, firmaların desteklediği Verkaufsassistentin (Satış Asistanı) gibi pozisyonlarda çalışarak mesleki olarak kendilerini sahada geliştirebilirler."
        },
        {
          question: "Okullarda 'Schulbegleiter' veya yardım kuruluşlarında 'Integrationsassistent' olarak çalışmak için nasıl bir Weiterbildung eğitimi alınabilir?",
          answer: "Bu pozisyonlar için Weiterbildung (ileri eğitim) kursları mevcuttur. Bu eğitimler engelli durumundan, dil yetersizliğinden veya sosyal uyum sorunlarından dolayı ihtiyacı olan çocuklara okullarda refakat etme imkanı sağlar."
        },
        {
          question: "Sosyal Hizmet alanında 'Pedagojik Asistanlık Eğitimi' nasıl alınır ve iş imkanları nelerdir?",
          answer: "EVB TRAINING gibi kurumlar tarafından 'Pedagojik Asistanlık Eğitimi' (Weiterbildung zur Pädagogischen Hilfskraft im Bereich Soziale Arbeit) sunulmaktadır. Bu eğitimler staj garantisi ile verilmekte olup, çok sayıda alternatif iş imkanı sunmaktadır."
        },
        {
          question: "Nasıl Entegrasyon Kursu Öğretmeni olunur ve bunun için gereken kriterler nelerdir?",
          answer: "Entegrasyon Kursu Öğretmeni olmak için öğretmen geçmişi şart değildir, başka bölüm mezunları da olabilir. İstenen kriterlerden biri 'Nachweise über Sprachlehrerfarung in der Erwachsenenbildug' (Yetişkin Eğitiminde Dil Öğretmenliği Tecrübesi Kanıtı) olup, yetişkin eğitimi 18 yaşından büyük öğrencileri kapsar."
        },
        {
          question: "Medizinische Kodierfachkraft (kodirirung) hakkında bilgisi veya tecrübesi olan var mı?",
          answer: "Tıbbi sekreterlik mezunları tarafından bu meslek hakkında bilgi arayışı mevcuttur."
        }
      ]
    },
    {
      category: "Güncel Yaşam ve Destek",
      items: [
        {
          question: "Gönüllü (Ehrenamtlich) çalışma ne gibi faydalar sağlar?",
          answer: "Gönüllü çalışma (Ehrenamtlich), uyum sürecinde tecrübe edinme ve sosyal ağ oluşturma açısından önemlidir. Malteser gibi kurumlarda insani yardım faaliyetlerine yardım çağrıları yapılmıştır."
        },
        {
          question: "İşe ilk giriş ödeneği (Einstiegsgeld) nedir?",
          answer: "İşe yeni başlayanlar için devlet tarafından sağlanan bir ödenek hakkında bilgilendirme videosu mevcuttur."
        },
        {
          question: "Ehliyet çevirisi ve diğer belgelerin çevirisi için hangi hizmetler mevcuttur?",
          answer: "Ehliyet çevirisi piyasada genelde 30-35 Euro iken, indirimli olarak 20 Euro'ya, 10 kişilik gruplarda ise kişi başı 15 Euro karşılığında yapılabilmektedir. Diploma, transkript, mahkeme dosyası vb. çevirileri için yeminli tercüme hizmetleri mevcuttur."
        },
        {
          question: "Anadolu Üniversitesi Açık Öğretim Bürosu ile ilgili iletişim bilgisi veya tecrübesi olan var mı?",
          answer: "Anadolu Üniversitesi Açık Öğretim diplomaları Almanya'da akreditedir ve tanınmaktadır. Köln'de müracaat yeri bulunmaktadır."
        },
        {
          question: "Eski mezunlar (2009 öncesi gibi) lise diploması veya karnelerini nasıl alabilir?",
          answer: "2009'dan önceki mezuniyetlerde lise diplomalarının online kaydı bulunmayabilir. Bu durumda, noter vekaletiyle birinci derece akrabanın okula gidip belgeyi alması en garanti yoldur."
        },
        {
          question: "Teknik lise ve Anadolu teknik liselerinin Almanca karşılıklarını nasıl öğrenebilirim?",
          answer: "Bu liselerin Almanca karşılıklarını öğrenmek için www.bq-portal.de/db/L%C3%A4nder-und-Berufsprofile/turkei adresinden bilgi alınabilir."
        },
        {
          question: "Dil öğrenme sürecinde konuşma korkusunu yenmek için psikolojik destek var mıdır?",
          answer: "Dil öğrenme psikolojisi ve konuşma korkusunu yenmeye yönelik teknikler içeren ücretsiz podcast serisi ve seminerler bulunmaktadır."
        }
      ]
    }
  ];

  const technicalData = [
    {
      category: "Teknik ve Zanaat Alanları",
      departments: [
        { 
          name: "Doğalgaz, Isıtma, Sıhhi Tesisat", 
          equivalent: "Sanitär Heizung Klimatechnik", 
          notes: "6 ay staj + sınav ile tam denklik mümkün. Sonrasında Meister (Ustalık) sınavına girilebilir." 
        },
        { 
          name: "Elektrik/Elektronik", 
          equivalent: "Elektroniker für Automatisierung", 
          notes: "IHK FOSA başvurusu. Kısmi denklik yaygın. 15 yıllık tecrübe sürece olumlu katkı sağlar." 
        },
        { 
          name: "Otomotiv Teknolojisi", 
          equivalent: "Kfz-Mechatroniker (HWK)", 
          notes: "HWK (Handwerkskammer) alanına girer. İkamet edilen şehirdeki HWK ile iletişime geçilmelidir." 
        },
        { 
          name: "Raylı Sistemler Makinistlik", 
          equivalent: "Lokführer", 
          notes: "Ausbildung yapmadan veya Umschulung ile mesleği icra etme imkanı araştırılmalıdır." 
        },
        { 
          name: "Harita ve Kadastro", 
          equivalent: "Vermessungstechniker", 
          notes: "Eyaletlerin ilgili kurumlarına başvurulabilir." 
        }
      ]
    },
    {
      category: "Gıda, Sağlık ve Sosyal Alanlar",
      departments: [
        { 
          name: "Gıda Teknolojisi", 
          equivalent: "Fachkraft für Lebensmitteltechnik", 
          notes: "IHK'dan kısmi denklik (%75) gelebilir. Tam denklik için staj eksikliği giderilmelidir." 
        },
        { 
          name: "Odyometri", 
          equivalent: "Hörakustiker", 
          notes: "Denklik sürecinde Satış Asistanı olarak çalışılabilir. Sonrasında Ustalık (Meister) yolu açıktır." 
        },
        { 
          name: "Aşçılık", 
          equivalent: "Koch / Köchin", 
          notes: "Diplomanın geçerliliği yüksektir. Jobcenter meslek içi eğitime yönlendirebilir." 
        },
        { 
          name: "Sosyal Hizmetler / Çocuk Gelişimi", 
          equivalent: "Sozialpädagogische Assistentin / Erzieher", 
          notes: "Düzenlenmiş mesleklerdir. Eyalet bazlı denklik kurumlarına (Regierungspräsidium vb.) başvurulmalıdır." 
        }
      ]
    },
    {
      category: "İdari ve Bilişim Alanları",
      departments: [
        { 
          name: "Bilgisayar Programcılığı", 
          equivalent: "Fachinformatiker", 
          notes: "Berufsfachschule olarak tanınır. IT alanında yüksek iş gücü açığı vardır. Sertifikalarla desteklenmelidir." 
        },
        { 
          name: "Muhasebe, İşletme", 
          equivalent: "Kauffrau/Mann für Büromanagement", 
          notes: "Doğrudan denklik zordur. Genellikle yeniden Ausbildung veya Umschulung önerilir." 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900/80 to-slate-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-x-3 text-blue-400 mb-6">
              <GraduationCap className="h-6 w-6" />
              <span className="font-semibold">Meslek Yüksek Okulu Mezunları</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              MYO Mezunları İçin Almanya Kariyer Rehberi
            </h1>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              Önlisans diplomanızla Almanya'da kariyer yapmanın yolları, denklik süreçleri ve mesleki fırsatlar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-10">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto p-2 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
            <TabsTrigger value="guide" className="py-4 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <div className="flex flex-col items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Rehber</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="technical" className="py-4 data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <div className="flex flex-col items-center gap-2">
                <Wrench className="h-5 w-5" />
                <span>Bölümler ve Karşılıkları</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="faq" className="py-4 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400">
              <div className="flex flex-col items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <span>Sıkça Sorulan Sorular</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="experiences" className="py-4 data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">
              <div className="flex flex-col items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Tecrübe Paylaşımları</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-8">
            
            <ProfessionVideoPlayer professionSlug="myo-mezunlari" />

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Info className="h-6 w-6 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Kariyer Yolu Metaforu</h3>
                    <p className="text-slate-600 dark:text-slate-300 italic">
                      "MYO diploması ile Almanya'ya gelmek, bir yapbozun sadece bir kısmını getirmeye benzer. Parçanız (diploma), Alman eğitim sistemindeki büyük yapbozda tam olarak eşleşmez (üniversite yerine Berufsfachschule olarak görülür). Ancak elinizdeki bu parça (kısmi denklik), size rehberlik eder. Hangi köşelerin eksik olduğunu belirler ve bu eksik parçaları tamamlamak için doğru araçlara başvurursunuz. Güçlü bir dil (B2) ise bu yapbozun birleştirilmesini sağlayan yapıştırıcıdır."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Plane className="h-6 w-6 text-blue-600" />
                  Göç Hazırlığı ve Temel Şartlar
                </h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dil Yeterliliği</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <strong>Vize İçin:</strong> Genellikle B2 seviyesi Almanca sertifikası şart koşulmaktadır.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <strong>İkamet Edenler İçin:</strong> B1 seviyesi başlangıç için yeterli olabilir ancak mesleki ilerleme için B2 gereklidir.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Gerekli Belgeler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileText className="h-4 w-4 text-blue-500" />
                        Diploma ve Transkript
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <strong>Ders İçerikleri (Lehrplan):</strong> Hangi derste ne işlendiğini gösteren resmi belge.
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileText className="h-4 w-4 text-blue-500" />
                        Lise Diploması
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileText className="h-4 w-4 text-blue-500" />
                        Hizmet Dökümü (SGK) ve İş Tecrübesi Belgeleri
                      </li>
                    </ul>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm text-amber-800 dark:text-amber-200 mt-4">
                      <p><strong>İpucu:</strong> Tercüme işlemleri için Jobcenter onayı almayı unutmayın. Genellikle en düşük fiyatlı teklifi kabul ederler.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-purple-600" />
                  Denklik ve Yasal Süreçler
                </h2>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Diploma Değerlendirmesi (ZAB)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      ZAB, diplomanızın Alman eğitim sistemindeki karşılığını gösteren bir belge verir. MYO diplomaları genellikle <strong>Berufsfachschule</strong> olarak değerlendirilir.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="https://zab.kmk.org/de/app" target="_blank">ZAB Başvurusu <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mesleki Tanınma (Anerkennung)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Teknik Bölümler</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Genellikle <strong>IHK FOSA</strong> (Nürnberg) üzerinden yapılır.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Zanaat ve Motor</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <strong>HWK (Handwerkskammer)</strong> ile iletişime geçilmelidir.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Sağlık ve Sosyal</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Eyalet bazlı kurumlara başvurulur. <Link href="https://www.anerkennung-in-deutschland.de" className="text-blue-500 hover:underline">anerkennung-in-deutschland.de</Link> üzerinden kontrol ediniz.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical" className="space-y-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Bölümler ve Almanya Karşılıkları</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Aşağıdaki tabloda yaygın MYO bölümlerinin Almanya'daki muhtemel karşılıkları ve denklik ipuçları yer almaktadır.
              </p>
            </div>

            <div className="grid gap-8">
              {technicalData.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 border-b pb-2">
                    {section.category}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {section.departments.map((dept, idx) => (
                      <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-bold text-blue-600 dark:text-blue-400">
                            {dept.name}
                          </CardTitle>
                          <CardDescription className="font-medium text-slate-700 dark:text-slate-300">
                            {dept.equivalent}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {dept.notes}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sıkça Sorulan Sorular</h2>
              <p className="text-slate-600 dark:text-slate-400">
                MYO mezunlarının Almanya sürecinde en çok merak ettiği konular.
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {faqData.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, itemIndex) => (
                        <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                          <AccordionTrigger className="text-left font-medium">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-600 dark:text-slate-300">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Almanya'daki MYO mezunlarının gerçek deneyimleri.
                </p>
              </div>
              <ShareExperienceDialog professionSlug="myo-mezunlari" defaultProfessionName="MYO Mezunu" />
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
                    <ShareExperienceDialog professionSlug="myo-mezunlari" defaultProfessionName="MYO Mezunu" />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
