"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
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
  Wrench,
  Settings,
  Hammer,
  Mountain
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { DocumentSection } from '@/components/document-section';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TeknikOgretmenlerPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Teknik%,profession.ilike.%Mühendis%,profession.ilike.%Elektronik%,profession.ilike.%Otomotiv%,profession.ilike.%Metal%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const faqData = [
    {
      category: "Mesleki Denklik Prosedürleri (Anerkennung)",
      items: [
        {
          question: "Diplomaları ve mesleği tanıtmak (geçerli belge almak) için hangi kurumlardan onay almak gerekiyor?",
          answer: "Öğretmenlik, kanun ve yönetmeliklerle düzenlenmiş (reglementiert) bir meslektir. Bu mesleği icra edebilmek için tanıtma (Anerkennung) zorunludur. İki farklı işlem mevcuttur: 1) ZAB (Zentralstelle für ausländisches Bildungswesen) üzerinden üniversite diplomasının akademik tanınması, 2) İlgili eyaletin Lehrkräfteakademie’sine (Öğretmen Akademisi) mesleki tanınma için başvurulması. Mesleki tanınma mercii, eyaletten eyalete, hatta şehirlere göre farklılık gösterebilir."
        },
        {
          question: "Bonn'dan (ZAB) gelen tanınma yazısı ne anlama gelir ve bu yeterli midir?",
          answer: "Bonn’daki ZAB’dan gelen sonuç, yalnızca diplomanın akademik denkliği (Üniversitenin tanınması) anlamına gelir. Bu belge, mesleki denklik (Berufliche Anerkennung) değildir. Mesleğinizi yapabilmeniz için eyaletinizin Lehrkräfteakademie’sinden de onay almalısınız."
        },
        {
          question: "NRW eyaleti için teknik öğretmenlerin denklik süreci (adım adım) nasıldır?",
          answer: "NRW eyaleti için süreç şöyle işler: 1) Bonn ZAB Anerkennung, 2) Detmold'a transkript incelemesi. Detmold, incelemesi sonucu varsa eksik derslerin tespiti ve tavsiyelerini sunar. 3) Başlangıç olarak bir Berufskolleg'de (Meslek Koleji) sözleşmeli olarak başlama ve eş zamanlı olarak eksik derslerin tamamlanması tavsiye edilir."
        },
        {
          question: "Denklik başvurusunda sadece tek branş kabulü ve ek branş/dil seviyesi istenmemesi gibi bir sorunla karşılaşan var mı?",
          answer: "Bazı teknik öğretmenler, beklentilerinin öğretmenliğin tanınması, ikinci branş ve dil seviyesi istenmesi olduğu halde, bu şekilde bir sonuçla karşılaşmadıklarını belirtmiştir. Bu gibi sorunlarla karşılaşanların tavsiyelere ihtiyacı bulunmaktadır."
        },
        {
          question: "Tercümelerin onay (Beglaubigung) işlemi yapılırken nelere dikkat edilmelidir?",
          answer: "Onay işlemi (Beglaubigung), belediyeler (Belediyeler), Diakoni ya da Bürgerbüro'larda yaptırılabilir. Noter pahalı olacağı için bu kurumlarda yapılması önerilir. Tercüme nüshalarında, en üstte Almanca tercümesi ve altında diplomanın fotokopisi zımbalı olmalı ve onay bu zımbalı nüshaya yapılmalıdır. Yalnızca Almanca tercümeyi onaylatmak yanlıştır."
        },
        {
          question: "Lise/Üniversite diplomasının orijinali Türkiye'de kalmışsa veya transkript kaybolmuşsa nasıl temin edilir?",
          answer: "Eksik belgeleri temin etmek için iki yol mevcuttur: 1) E-Devlet üzerinden temin etmek (Ancak imzasız olduğu için sorun çıkarabilirler). 2) Mezun olunan liseye bir dilekçe ile başvurmak. Okul, 'DIPLOMA KAYIT ÖRNEĞİ' düzenleyebilir. Bu dilekçe, şehir dışında olunduğu için bir yakına (anne, baba, kardeş vs.) gönderilerek evraklar alınabilir."
        },
        {
          question: "Kendi eyaletinde meslek denkliği yaptıktan sonra başka bir eyalete gidilip tekrar denklik başvurusunda bulunulabilir mi?",
          answer: "Kendi eyaletinde meslek denkliği yaptıktan sonra başka bir eyalete gidip o eyalette de denkliği başvuran olup olmadığı sorulmuştur. Eğer varsa, önceki eyalette alınan denklik sonucunun yeni başvuruda istenip istenmediği ve karara herhangi bir etkisi olup olmadığı merak edilmektedir."
        }
      ]
    },
    {
      category: "Mühendislik Denkliği ve Teknik Kariyer Yolları",
      items: [
        {
          question: "Mühendislik denkliği nereye, nasıl yapılmalı ve tecrübesi olan var mı?",
          answer: "Mühendislik denkliği (Müh. denkli), her eyaletin Mühendis Odası'ndan (Ingenieurkammer) alınır. Gerekli evraklar sitelerde mevcuttur ve tüm eyaletlerde sistem benzerdir. NRW'de Teknik Öğretmenlerin Mühendislik belgesi için nereye ve nasıl başvurulması gerektiği sorulmuştur."
        },
        {
          question: "Mühendislik denkliği için ekstra ders almaya gerek var mı, yoksa direk alınıyor mu?",
          answer: "Bir arkadaş, önce öğretmenlik denkliği alıp (ZAB'tan), sonra Mühendisler Odası'na başvurarak mühendis olarak tanındığını, bu süreçte ekstra ders almaya gerek kalmadığını belirtmiştir."
        },
        {
          question: "Teknik öğretmenler mühendis olarak tanınabiliyor mu?",
          answer: "Bu sorunun cevabının çok geniş olduğu ve Almanya'da değil, her eyalette farklılık gösterdiği belirtilmiştir. Örneğin, Frankfurt'ta mühendis denkliği verilirken, NRW'de herkesin alamadığı, ancak alan arkadaşların da olduğu belirtilmiştir. Türkiye'deki mesleki deneyim, bilgi, beceri, yüksek lisans durumu ve Almanca/İngilizce seviyesi denklik durumunu etkiler."
        },
        {
          question: "Mühendislik başvuru ücreti (300 Euro) Jobcenter tarafından karşılanır mı?",
          answer: "Mühendislik başvuru ücreti olan 300 Euro'nun Jobcenter sorumlusu tarafından kabul edilmesi halinde, kişinin parayı kendisi yatırıp daha sonra Jobcenter'dan alması sürecin daha hızlı işlemesini sağlar."
        },
        {
          question: "Otomotiv öğretmenliği alanında tecrübem yokken Weiterbildung ile mesleğe adapte olabilir miyim?",
          answer: "Eğer kişi otomotiv alanı ile alakalı mesleki bilgisine güveniyorsa Weiterbildung (ilerleme eğitimi) yapması tavsiye edilir. Ancak var olan bilgiye güvenilmiyorsa, ya mesleğin yeniden Ausbildung şeklinde yapılması ya da alternatif meslek yapma fikrinin değerlendirilmesi önerilir."
        },
        {
          question: "Sürücü Okulu Öğretmenliği (Fahrllehrer/in) eğitimi ücreti ne kadar ve Jobcenter karşılıyor mu?",
          answer: "Sürücü Okulu Öğretmenliği eğitimi ücreti şehirden şehire farklılık göstermekle birlikte 7-8 bin ile 12 bin Euro arasında olabilir. Eğer Jobcenter veya Arbeitsamt'ta iseniz, bu kursun ücretini onlar karşılamaktadır."
        },
        {
          question: "Sürücü Okulu Öğretmenliği (Fahrllehrer/in) eğitimine başlama şartları nelerdir?",
          answer: "Eğitime başlama şartları şunlardır: En az 21 yaşında olmak, zihinsel ve bedensel rahatsızlığı olmamak, sabıka kaydı bulunmamak, en az lise mezunu olmak, eğitim verilecek düzeyde ehliyete sahip olmak (Klasse B için en az 3 sene sürüş deneyimi, diğerleri için 2 yıllık olması lazım), Türk ehliyetinin Alman ehliyeti ile değişmiş olması gerekir."
        }
      ]
    },
    {
      category: "Öğretmenlik Mesleğine Giriş (Lehrkräfte Programları ve Branş)",
      items: [
        {
          question: "Almanya'da öğretmenlik yapmak için hangi dil seviyesi gereklidir?",
          answer: "Öğretmenlik yapmak için akıcı Almanca konuşmak gerekir. Devlet memuru (Beamter) olarak tam denklik (voll Anerkennung) ile çalışmak için C2 sertifikası şartı aranmaktadır. Ancak bazı kişiler B2 sertifikası ve akıcı konuşmayla öğretmen olabilirken, C1 ile konuşamayanlar olabilir. Öğretmenlik yapabilmek için dil sertifikasından ziyade akıcı Almanca konuşmak önemlidir."
        },
        {
          question: "Hangi Lehrkraft Programları var?",
          answer: "NRW'de 5 tane benzer program bulunmaktadır. Bu programlarda amaç, mülteci öğretmenlerin devlet okullarında ihtiyaç görülen derslerde çalışabilmelerinin önünü açmaktır. Teknik öğretmenler için Siegen Üniversitesi ve Duisburg Essen Üniversitesi gibi üniversitelerde programlar mevcuttur."
        },
        {
          question: "Bu programlara başvuru şartları nelerdir? (Örn. RefTeach Brandenburg)",
          answer: "Genel programlar için istenen şartlar: Menşe ülkede ortaokul veya lisede öğretmen olarak çalışmayı sağlayan en az bir üniversite lisans derecesi, halihazırda sahip olunan branşın Brandenburg'daki okullarda öğrencilere öğretilen bir branş olması, ortaokul ve lise öğretmeni olarak en az iki yıllık mesleki deneyim ve tecrübe, ikinci branş okumaya ve akademik başarılar elde etmeye istekli ve hazır olma, öğretmenlik yeterliliğinin tanınmasına ilişkin bakanlık kararı, Almanca bilgisi (en az GER B2 seviyesi)."
        },
        {
          question: "NRW Lehrkräfte Programlarında olup da okullarda derslere giren kişiler haftada 10-12 saat derse girmislerse bu zamanı mesleki tecrübe olarak saydırabilirler mi?",
          answer: "Evet, NRW'deki Lehrkräfte programlarında olup da okullarda derslere giren kişilerin (haftada 10-12 saat derse girmişlerse) bu zamanı mesleki tecrübe olarak saydırabildikleri belirtilmiştir."
        },
        {
          question: "Okullarda ders ücretli öğretmenlik yapmak için Türkçe C1 sertifikası yeterli mi ve öncelik sıralaması nasıldır?",
          answer: "Evet, telc Türkçe C1 sertifikası ile okullarda ders ücretli öğretmenlik mümkündür. Öncelik sırası şöyledir: 1. Almanya mezunu Türkçe Öğretmeni, 2. Türkiye mezunu Türkçe Öğretmeni, 3. C1 Sertifikalı öğretmen."
        },
        {
          question: "Kendi branşında ders saatleri dolmadığında hangi dersler ders saatlerini doldurmak için destek sağlar?",
          answer: "Diğer branşlarda ders saatleri dolmadığında, Türkçe ve İslam dersleri ders saatlerini doldurmak için bir destek sağlayabilir. Bu iki derste hiçbir Alman rakip olamayacağı için bu derslere önem verilmesi tavsiye edilmiştir."
        }
      ]
    },
    {
      category: "Dil Yeterliliği ve Türkçe Sertifikası (Telc C1)",
      items: [
        {
          question: "TELC Türkçe C1 sertifikası ne yarıyor ve neler yapılabilir?",
          answer: "Ana branşı Türkçe olmadığı halde anadili Türkçe olan arkadaşlar bu sertifikayı alabilirler. Bu sertifika ile okullarda ders ücretli öğretmenlik yapmak mümkündür."
        },
        {
          question: "TELC Türkçe C1 sertifikası ikinci branş (Zweites Fach) olarak değerlendiriliyor mu?",
          answer: "Hayır, telc Türkçe C1 sertifikası maalesef ikinci branş (Zweites Fach) olarak değerlendirilmiyor."
        },
        {
          question: "TELC Türkçe C1 sınavının ücreti ne kadar ve bu ücret Jobcenter tarafından karşılanıyor mu?",
          answer: "Sınav ücretli bir sınavdır ve 180 Euro'dur. Bazı Jobcenter'lar ücreti karşılamaktadır."
        },
        {
          question: "telc Türkçe C1 sertifikasını alabilmek için kaç puana ulaşılması gerekiyor?",
          answer: "Sertifikayı alabilmek için katılımcının en az 128 puana ulaşması gerekmektedir. Ayrıca hem sözlü hem de yazılı sınavda en yüksek puanın %60’ına ulaşılmalıdır. Bu da sözlü sınavda 29 puan ve yazılı sınavda 99 puandır."
        },
        {
          question: "Almanya'da üniversitelerin verdiği hazırlık kurslarının ön şartı hangi dil seviyesidir?",
          answer: "Üniversitelerin verdiği hazırlık kurslarının ön şartı B1 seviyesinde Almanca bilgisidir."
        },
        {
          question: "Üniversitelerin verdiği hazırlık kurslarının avantajları nelerdir?",
          answer: "Üniversitelerin verdiği hazırlık kursları, en ucuz veya ücretsiz ama en kaliteli kurslar arasındadır. Kursa kayıt yaptıranlar öğrenci kimliği (Öğrenci belgesi) alır ve bu kimlikle bulundukları eyalette tüm toplu taşıma araçlarına (tren, otobüs - hızlı tren hariç) ücretsiz binebilirler (Semesterticket)."
        }
      ]
    },
    {
      category: "İş Arama ve Mülakat Süreçleri (Auswahlgespräch)",
      items: [
        {
          question: "İlk etapta maddiyat mı yoksa tecrübe/CV'de çalışıyor görünmek mi önemlidir?",
          answer: "İlk etapta maddiyatın önemli olmaması lazım (özellikle şu ana kadar Almanya'da hiçbir görev alınmadıysa). Tecrübe kazanmak ve CV'de bir yerde çalışıyor gözükmek önem arz etmektedir. Hatta gerekirse ilk işyerinde gönüllü (ehrenamtlich) çalışılması gerektiği belirtilmiştir."
        },
        {
          question: "Gönüllü çalışma (Ehrenamtlich) tecrübeleri mülakatta nasıl değerlendirilir?",
          answer: "Almanya gönüllü çalışmaya çok önem veren bir ülkedir. Eğer Almanya'da okullarda ya da başka kurumlarda yapılan gönüllü çalışmalar varsa, bu sizi kesinlikle ön sıralara taşıyacaktır. Eğer burada yoksa, Türkiye'deki yapılan gönüllü yardım faaliyetleri, veli ziyaretleri, ders harici sınava öğrenci hazırlama gibi çalışmalar anlatılmalıdır."
        },
        {
          question: "Lehrkraft programı mülakatında (Auswahlgespräch) hangi sorular sorulmuştur?",
          answer: "Mülakat esnasında muhtemel şu sorulara muhatap olunmaktadır: Kendinizi Tanıtma, Tecrübe, Pedagojik Enformasyon, Branş Bilgisi, Gönüllü Çalışmalarınız, Motivasyon, Bize sormak istediğiniz bir şey var mı? Ayrıca, 'Sınıfta çocuklar rahatsız ediyor naparsın?', 'Hala ara vermeye devam ediyorlarsa ne yaparsın?', 'Ders olarak kötü olduğunu söyledi bir veli ne yaparsın?' gibi sorular da sorulmuştur."
        },
        {
          question: "Sınıfta çocuklar rahatsız ediyorsa ve ara vermeye devam ediyorlarsa ne yapılmalıdır?",
          answer: "Bu tür bir durum için yapılanlar: idareye haber verme, sosyal pedagog ile görüşme, veli ile görüşme ve diğer ders öğretmenleri ile işbirliği gibi çözüm yolları sunulmalıdır. Kahraman olmaya kalkılmamalıdır. Erken müdahale olarak nonverbal işaretler, sessiz uyarılar ve önceden belirlenmiş sonuçlar (Konsekanlar) uygulanmalıdır."
        },
        {
          question: "Programı neden istediğiniz ve Almanya'ya ne katacağınız sorusuna nasıl cevap verilmelidir?",
          answer: "Mesleğinizi çok sevdiğiniz, başka iş imkanı olmasına rağmen öğretmenliği zor olduğunu bilerek tercih ettiğiniz ve meslek aşkınızdan bahsedilmelidir. Program kabul edilirse, Türkiye'deki üst düzey okullarda görev yaptığınız, bilgisayar/yabancı dil bilginiz, olimpiyat/proje hazırlama yeteneğiniz vurgulanmalıdır."
        },
        {
          question: "Mülakat sonunda 'Bize sormak istediğiniz bir şey var mı?' sorusu sorulduğunda nasıl davranılmalıdır?",
          answer: "Bu soru mutlaka yöneltilmektedir ve çoğu aday aceleyle 'HAYIR' cevabını verir. Basit de olsa bir soru yöneltilmelidir. Amaç, programa ilgili ve istekli olduğunuzu hissettirmektir (Örn: Program bitiminde hangi tür okullarda çalışabiliriz?)."
        },
        {
          question: "Özgeçmişe (CV) veya başvuru dosyasına neler eklenmelidir?",
          answer: "Türkiye'de ya da gelinen başka bir ülkede yapılan olimpiyat, proje çalışmaları, şehir-bölge-ülke-uluslararası yarışmalara öğrenci hazırlama, sergiler ve varsa kitap-dergi çalışmaları gibi her şey eklenmelidir. Ayrıca iş tecrübesi, deneyim, tavsiye/referans mektubu ve eğitimle ilgili sertifikalar da dosyaya eklenmelidir."
        },
        {
          question: "İş başvurusu için gerekli evrakların hazırlanmasında nelere dikkat edilmelidir?",
          answer: "İş başvurusu belgeleri DIN-A4 beyaz kağıt kullanılarak, 2,5 cm kenar boşluklarıyla bilgisayarda yazılmalıdır. Başvuru yazısı elle imzalanmalı ve başvuru belgelerinin fotokopileri (özgeçmiş, okul belgesi, staj/kurs belgeleri) temiz ve hatasız olmalıdır. Tercümelerin noter onaylı (Beglaubigung) olmasına dikkat edilmelidir."
        },
        {
          question: "Mülakatta kişisel hikaye anlatımı neden önemlidir ve nasıl bir denge kurulmalıdır?",
          answer: "Kişisel hikaye, konunuzdan ziyade sizi enteresan yapan şey olabilir. Anlatımın sizin motivasyonunuzun temelini oluşturduğu için, hocanın gözünün içine bakarak anlatılması gerekir. Eğer bir empati oluşmuşsa buradan devam edilebilir."
        }
      ]
    },
    {
      category: "Akademik Kariyer (Doktora)",
      items: [
        {
          question: "Almanya’da doktoraya giriş prosedürü nasıldır?",
          answer: "Almanya'da doktoraya giriş sanıldığından daha basit bir prosedüre sahiptir. Mastır yapmış olanlar veya doktorası bulunanlar kolayca doktoraya kayıt yaptırabilirler. Doktora öğrenciliği, katı giriş kuralları bulunmadığından üniversiteye girilebilecek en basit prosedüre sahip alandır."
        },
        {
          question: "Doktora yapmaya başlamak için hangi iki temel kriter zorunludur?",
          answer: "Doktora yapmak için iki önemli kriter vardır: 1. Master yapmış olmak. 2. Bir profesörün sizi doktoraya kabul etmesi (Betreuungszusage)."
        },
        {
          question: "Doktorada Almanca dil şartı zorunlu mudur ve dil sınavını geçmeden kayıt yapılabilir mi?",
          answer: "Doktora alanında istisnai olarak Almanca şartı danışman profesöre bağlıdır. Bir profesör, dil sınavını kazanmamış birini doktoraya kabul edebilir veya bu şartı doktora başladıktan sonrasına erteleyebilir. Yani önce kayıt, sonra dil eğitiminin devamı mümkündür."
        },
        {
          question: "Doktora öğrencisi olmanın (normal öğrencilik gibi) avantajları nelerdir?",
          answer: "Doktora öğrencileri, harç yatırarak dönem bileti (Semesterticket) alırlar. Bu biletle bulundukları eyalette tüm toplu taşıma araçlarına (hızlı tren hariç) ücretsiz binebilirler. Ayrıca üniversitenin kütüphane ve diğer tüm imkânlarından faydalanabilirler."
        },
        {
          question: "İşsizlik parası (Jobcenter yardımı) alınırken aynı anda doktora yapmak mümkün müdür?",
          answer: "İşsizlik parası alınırken diğer yandan doktora yapmak mümkün olabilir. Ancak bu durum biraz ihtilaflıdır. Jobcenter, öğrenci kaydı yapıldığı için yardımı kesme kararı alabilir. Mantıklı bir izahat ile ('Ben extern doktoraya başlayayım. İş arıyorum, Jobcenter iş gösterirse oraya da giderim.') memurun bunu kabul etme ihtimali vardır."
        },
        {
          question: "Doktora başvurusu için Expose ve CV nasıl hazırlanmalıdır?",
          answer: "Kesin bir konu varsa 8-10 sayfalık bir Expose (konuyu, fikirleri ve yapılacakları gösteren taslak) yazılmalıdır. CV ise güzel, sempatik bir fotoğrafla hazırlanmalı, kişinin pozitif yönlerini kolaylıkla gösterebilmeli ve fazla uzun olmamalıdır. Belgeler sade ve iç açıcı renkli bir dosyaya konulmalıdır."
        },
        {
          question: "Profesörlerle görüşmede nelere dikkat edilmeli ve nasıl hazırlanılmalıdır?",
          answer: "Görüşmeye hazırlıklı gidilmeli, kılık kıyafet abartılı ama paspal da olmamalıdır. Görüşmeye saatinden en az 15 dakika önce gidilmelidir. Konuşmayı planlayarak, ne söyleneceği ve hangi soruların sorulabileceği önceden düşünülmelidir. Almancası iyi olmayanlar, önemli kelime ve terimleri önceden çalışmalıdır."
        }
      ]
    },
    {
      category: "Jobcenter ve Sosyal Haklar (Arbeitslosengeld II/SGB II)",
      items: [
        {
          question: "Kimlerin İşsizlik Parası II (Arbeitslosengeld II) alma hakkı vardır?",
          answer: "İşsizlik Parası II'ye (ALG II), Federal Almanya Cumhuriyeti içinde ikamet etmeleri şartı ile, tüm kazanç sağlayabilir (erwerbsfähig), yardıma muhtaç (hilfebedürftig), 15 ile 65 yaş altı kişiler hak sahibidirler."
        },
        {
          question: "Yabancı uyruklu kişiler geçimin güvence altına alınmasına ilişkin ödemeleri hangi durumlarda alabilirler?",
          answer: "Yabancılar ödeme alabilmek için şu şartları sağlamalıdır: Mutat olarak Almanya’da oturmak, Almanya’da yasal olarak oturmak, bir işe başlamaya zaten izin verilmişse veya izin verilebilirse, sığınmacılara yardımları düzenleyen yasaya göre yardım hakkına sahip olmamak, Almanya’da ya işalan olarak ya da bağımsız olarak kendi işinde ciddi ve kazanç elde etme niyetiyle çalışıyorsanız."
        },
        {
          question: "Yardım alırken Türkiye'deki gelir ve mal varlığı (örneğin emekli maaşı, ev) beyan edilmeli mi?",
          answer: "Evet, İşbirliği ve bildirim yükümlülüğü gereği, edinilen tüm gelir ve mal varlığı (nakit para, tasarruf, gayrimenkul) yurtiçinde veya yurtdışında olmasından bağımsız olarak Jobcenter’e tam ve doğru olarak bildirilmelidir. Türkiye'deki emekli maaşını bildirmeyen bir kişinin parasının kesildiği ve tekrar bağlatmanın zor olduğu örneği mevcuttur."
        },
        {
          question: "Jobcenter yardımında dikkate alınmayacak (muaf) varlıklar nelerdir?",
          answer: "Aşağıdakiler varlık olarak dikkate alınmaz: Ölçülü ev eşyaları, kazanç sağlayabilir her yardıma muhtaç kişinin ölçülü bir motorlu taşıtı, yaşlılık güvencesi olarak belirlenmiş uygun mal varlığı ve haklar, kişinin ikamet ettiği ölçülü bir ev veya daire, gerekli ihtiyaçların giderilmesi için 750 Euro tutarındaki muaf meblağ."
        },
        {
          question: "Jobcenter yardımı alan bir kişi araba satın alabilir mi ve sınırları nelerdir?",
          answer: "Evet, yardım alınıyor olması hiç paranın olmayacağı anlamına gelmez. Makul bir fiyata araba alınabilir. Dört çocuklu bir aile için 7.500 Euro’ya kadar araba alımına izin verildiği yönünde bir tecrübe paylaşılmıştır, ancak bu rakamın çocuk sayısına göre bir tahmin olup olmadığı kesin değildir."
        },
        {
          question: "Bir işe başlandığında Jobcenter zamansal olarak sınırlı bir avans ödeyebilir mi (Einstiegsgeld)?",
          answer: "Evet, sosyal sigortaya tabi veya bağımsız bir kazanç sağlayıcı faaliyete başlanması durumunda, Jobcenter yardıma muhtaçlığın üstesinden gelebilmek için azami 24 ay İşsizlik Parası II'ye ilaveten 'Giriş Parası' (Einstiegsgeld) ödeyebilir."
        },
        {
          question: "Jobcenter’den istenen kursları (Weiterbildung) almak kolay mıdır? Red durumunda ne yapılmalıdır?",
          answer: "Mültecilerin ve yeni gelen yabancıların işe girmelerini sağlamak Jobcenter'ın hedefi haline gelmiştir. O nedenle talep edilen işe yönelik kursları zorlanmadan almak mümkündür. Eğer bir işe başvuru yapılır ve red alınırsa, red yazısı Jobcenter’a verilerek ('Şu kursum yokmuş, olsaydı bu işe girecektim') denildiğinde, Jobcenter'ın o kursu vermek zorunda olduğu belirtilmiştir."
        },
        {
          question: "Yurt Dışı/İl Dışı Çıkışlar Jobcenter'a bildirilmeli mi?",
          answer: "Hafta sonu dahil il dışına çıkış için kanunen Jobcenter'a bilgi verilmesi gerekir. Jobcenter'den olur (izinlilik) alınmadan oturulan yeri terk etmek, İşsizlik Parası II'nin kesilmesini ve muhtemelen yapılan ödemenin geri talep edilmesini gerektirir."
        },
        {
          question: "Gerekçesiz olarak iş veya eğitim teklifini reddetmek hangi yaptırımları getirir?",
          answer: "Gerekçesiz olarak teklif edilen bir işi, eğitimi veya iş hayatına giriş tedbirini (Maßnahme) reddetmek yaptırım sebebidir. İlk yükümlülük ihlalinde, aylık düzenli ödemenin %30'u kesilir. Tekrar edilen ilk yükümlülük ihlalinde bu kesinti %60 olur. Daha sonraki her yükümlülük ihlalinde ise ödeme %100 kesilir."
        },
        {
          question: "Yaptırım uygulanmayacak 'önemli sebepler' nelerdir?",
          answer: "Davranış için önemli bir sebebiniz varsa yaptırım uygulanmaz. Önemli sebepler şunlardır: İşin ifa edilmesi, üç yaşın altında bir çocuğun yetiştirilmesini tehlikeye sokuyorsa; aile üyelerinden birinin bakımı, bir işin icrası ile uygun düşmüyorsa ve bakım başka şekilde temin edilemiyorsa; belirli işler için bedensel, ruhsal veya zihinsel olarak yapabilecek durumda olmamak."
        },
        {
          question: "Jobcenter ile iletişimde (e-posta/telefon) nelere dikkat edilmelidir?",
          answer: "Jobcenter'ın e-postalara bakma veya mektuplara cevap verme gibi bir zorunluğu yoktur. Ancak kanunen telefonlara bakmak zorundadırlar. Memur ile arayı iyi tutmak önemlidir."
        }
      ]
    },
    {
      category: "Günlük Yaşam ve Teknik Detaylar",
      items: [
        {
          question: "Evimizdeki fırın 150 derece ve üzeri açınca hemen sigorta atıyor, sebebi nedir?",
          answer: "Bunun sebebi için elektrikçinizle görüşmeniz ve bu problemi halletmeleri tavsiye edilmiştir. Her ev bürosunun anlaştığı bir elektrikçisi ve sucusu bulunmaktadır."
        },
        {
          question: "SolidWorks'te .step veya .xt uzantılı dosyalar nasıl açılır?",
          answer: " .step veya .xt uzantılı dosyaları açarken dikkat edilmesi gereken, dosyaları tutup bırakma yöntemiyle direk SolidWorks'ün içine bırakmayı denemektir. Genellikle üzerine tıklandığında ya da dosya aç kısmından yapıldığında hata verebilir."
        },
        {
          question: "Bir devrenin (örneğin kondansatörlü transistör devresi) adım adım çalışması, akım yönü ve transistörlerin çalışma sıralaması nasıldır?",
          answer: "Bir arkadaş, sınavına hazırlanırken bir devrenin (kondansatör deşarj olduğu andan itibaren) adım adım tarifini, akımın yönünü ve transistörlerin çalışma sıralamasını sormuştur. (Cevap kaynaklarda detayıyla verilmemiştir, ancak devre analizinin adımları listelenmiştir: Kondansatör boş/yüklü durumları, T1 ve T2'nin iletken/yalıtkan olma durumları, akım yönü ve lamba durumu)."
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
              <Wrench className="w-12 h-12 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 border-0">
                  Eğitim & Teknik
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Yüksek Talep
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  16dk Okuma
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Teknik Öğretmenler
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                Teknik öğretmenler için Almanya kariyer rehberi, mühendislik denkliği, öğretmenlik programları ve alternatif kariyer yolları.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="w-full justify-start h-auto p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <TabsTrigger value="guide" className="px-6 py-3 rounded-lg data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <BookOpen className="w-4 h-4 mr-2" />
              Rehber
            </TabsTrigger>
            <TabsTrigger value="faq" className="px-6 py-3 rounded-lg data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400">
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
            {/* Analogy Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-2xl">
                    <Mountain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                      Kariyer Yolculuğu: Bir Dağ Tırmanışı
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      Teknik öğretmenlerin Almanya'daki kariyer yolculuğu, zorlu ama manzarası güzel bir dağa tırmanmaya benzer. 
                      Eteklerde dil öğrenimi ve denklik işlemleriyle başlarsınız (Anerkennung). Tırmandıkça, mühendislik tamamlama 
                      veya öğretmenlik formasyonu gibi patikalar karşınıza çıkar. Zirveye ulaştığınızda ise, hem teknik bilginizi 
                      hem de eğitimci kimliğinizi kullanabileceğiniz geniş bir ufuk sizi bekler. Bu yolculukta sabır, azim ve 
                      doğru ekipman (bilgi ve belge) en önemli yardımcınızdır.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    Mühendislik Yolu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    Teknik öğretmenler, belirli şartları sağladıklarında "Mühendis" unvanını kullanabilirler.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Ingenieurkammer (Mühendisler Odası) başvurusu</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Denklik (Anerkennung) süreci</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Tekniker olarak başlama imkanı</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5 text-purple-500" />
                    Öğretmenlik Yolu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    Meslek okullarında (Berufskolleg) teknik öğretmen olarak çalışma fırsatları.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Seiteneinstieg (Yandan Giriş) programları</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Pedagojik formasyon gereklilikleri</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>C1 seviyesinde Almanca şartı</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-orange-500" />
                  Alternatif Kariyerler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-semibold mb-2">Sanayi ve Üretim</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Otomotiv, makine, elektrik-elektronik sektörlerinde uzman, tekniker veya vardiya amiri olarak çalışma.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-semibold mb-2">Eğitmenlik (Ausbilder)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Şirketlerin eğitim departmanlarında veya özel kurslarda teknik eğitmenlik yapma (AdA Belgesi gerekebilir).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Teknik öğretmenlerin Almanya'daki kariyer ve yaşam süreçlerinde karşılaştığı prosedürler, deneyimler ve teknik detaylar hakkında kapsamlı soru-cevap veritabanı.
              </p>
            </div>
            
            {faqData.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                  <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {section.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`} className="px-6 border-b last:border-0 border-slate-100 dark:border-slate-800">
                        <AccordionTrigger className="text-left hover:no-underline py-4 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Teknik öğretmenlerin Almanya'daki deneyimleri
                </p>
              </div>
              <ShareExperienceDialog defaultProfessionName="Teknik Öğretmen" />
            </div>

            {experiences.length === 0 ? (
              <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Henüz tecrübe paylaşılmamış
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                    Bu alanda henüz kimse tecrübesini paylaşmamış. İlk paylaşan siz olun ve diğerlerine yol gösterin.
                  </p>
                  <ShareExperienceDialog defaultProfessionName="Teknik Öğretmen" />
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {experiences.map((exp) => (
                  <Card key={exp.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg mb-2">{exp.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{exp.profession}</Badge>
                            <Badge variant="outline">{exp.city}, {exp.state}</Badge>
                            <span className="text-xs text-slate-500 flex items-center mt-1">
                              {new Date(exp.created_at).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                        {exp.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentSection professionSlug="teknik-ogretmenler" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
