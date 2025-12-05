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
  Plane,
  Landmark
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TurkceOgretmenligiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Türkçe%,profession.ilike.%Edebiyat%,profession.ilike.%Dil%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const faqData = [
    {
      category: "Mesleki Yeterlilik ve Denklik (Anerkennung) Süreci",
      items: [
        {
          question: "Türkiye'deki diplomamı Almanya'da tanıtmak için hangi kuruma başvurmalıyım ve bu kurumun rolü nedir?",
          answer: "Almanya'da üniversite denkliği için temel olarak ZAB (Zentralstelle für ausländisches Bildungswesen) kurumuna (Bonn'da) başvurulmalıdır. ZAB, bütün Almanya için üniversite denkliği verir. ZAB'dan alınan belge (Zeugnisbewertung), diplomanın mesleki açıdan bir değerlendirmesini değil, sadece kariyerinizin değerlendirilmesini (Lisans/Master/Doktora) sağlar."
        },
        {
          question: "ZAB başvurusu için gerekli evrakların tasdikinde (Beglaubigung) neye dikkat edilmelidir?",
          answer: "Lisans, Master veya Doktora diplomaları ile transkriptlerin tercümelerinin, Belediye'de (beglaubigung - aslı gibidir onayı) yapılmış nüshaları gönderilmelidir. Sadece Almanca tercümeyi onaylatmak yanlıştır; tercüme nüshasında en üstte Almanca tercümesi ve altında diplomanın fotokopisinin de yer alması ve bu şekilde onaylatılması gerekir."
        },
        {
          question: "ZAB, diplomanın üzerinde 'Lisans' ifadesi net belirtilmediği için ek teyit yazısı isterse ne yapılmalıdır?",
          answer: "Mezun olunan üniversiteden, kazanılan akademik dereceyi (Lisans?) gösterir bir teyit yazısı gönderilmesi gerekir. Bu ifadeyi içeren bir belge (geçici mezuniyet belgesi veya zorlamayla alınan teyit) temin edilmelidir."
        },
        {
          question: "Farklı dillerde (Türkmence, Rusça) yazılmış diplomayı tercüme ettirirken nelere dikkat edilmelidir?",
          answer: "Şahsi kanaate göre belgede ne varsa hepsini tercüme ettirmek veya Türkmence ve Rusça metinlerin birebir aynı olduğunu belirten bir yazı eklemek önerilir ki, akıllarda bir şüphe kalmasın."
        },
        {
          question: "ZAB'dan gelen Zeugnisbewertung (diploma değerlendirmesi) belgesi ne anlama gelir ve mesleki denklik sağlar mı?",
          answer: "Bu belge, öğretmen denkliği alındığı anlamına gelmez. Ancak, mesleki tanınma şartı olmayan işler için bir üniversite mezunu olduğunuzu Almanya tanımış olur."
        },
        {
          question: "Öğretmenlik, Almanya’da düzenlenmiş (reglementiert) bir meslek midir?",
          answer: "Evet, Öğretmenlik; Tıp, Hukuk gibi insana dokunan, üniversite mezuniyeti sonrası çeşitli sınavlara tabi tutularak mesleğe geçilen, reglementiert (kanun ve yönetmeliklerle düzenlenmiş) bir meslektir. Bu mesleği yapmak için Anerkennung şarttır."
        },
        {
          question: "Asıl mesleki denklik (Anerkennung) kararını hangi kurum verir?",
          answer: "Asıl mesleki değerlendirmeyi, eyaletlerdeki kurumlar verir. Örneğin, NRW için Detmold'daki Lehrkräfteakademie veya diğer eyaletler için dengi kurumlar bu değerlendirmeyi yapar."
        },
        {
          question: "Eyalet Eğitim Bakanlığı'na (Lehramt) başvuru ne anlama gelir?",
          answer: "Bu başvuru, Bonn'dan alınan Zeugnisbewertung'tan sonra, eyalet kurumlarının (Detmold gibi) sizin aldığınız dersleri ve kredi sayılarını değerlendirerek, Almanya'daki öğretmenlik sistemi ile kıyaslama yapmasıdır. Eksik dersleriniz varsa tamamlanması istenir."
        },
        {
          question: "Türkiye'den gelen Türkçe öğretmenlerinin tam denklik alması kolay mıdır?",
          answer: "Tam Anerkennung şartları çok ağırdır: Genellikle çift branş, Referendariat (stajyerlik) ve iki merkezi devlet sınavını (Staatsexamen) kazanmak gerekir. Türkiye mezunları tek branş olduğu için tam denklik almak zordur."
        },
        {
          question: "Yan dal olarak okunan Sosyal Bilgiler, ikinci branş olarak kabul edilir mi?",
          answer: "Sosyal Bilgiler dersini yan alan olarak kabul etmiyorlar. Ancak, eğer yeterli kredi miktarı varsa (bazıları 60 kredi olduğunu söylüyor), eyaletten öğretmenliğinizin tanınması adına bu iyi bir avantajdır."
        },
        {
          question: "Türkiye'deki stajyerliğin (Referandariyet) kalktığı nasıl kanıtlanır?",
          answer: "Türkiye'deki hizmet cetvelinin tercümesi (e-devletten 'hitap hizmet dökümü' indirilebilir) kanıt olarak sunularak referandariyetten muafiyet sağlanabilir. Hizmet Cetvelinde çalıştığınız 1. yılın sonunda açıklama bölümünde stajyerliğin kalktığı belirtilir."
        },
        {
          question: "E-Devlet şifrem yoksa Hizmet Dökümüne nasıl ulaşabilirim?",
          answer: "Vekaletle bir yakınına aldırılabilir. Veya PTT'de çalışan bir tanıdık vasıtasıyla Hizmet Dökümüne ulaşılabilir. En son çalıştığınız ilin Milli Eğitim Müdürlüğü Özel Öğretim Kurumları Bölümüne bizzat giderek veya vekalet yoluyla Hizmet Cetveli alınabilir."
        },
        {
          question: "Jobcenter, diploma denklik işlemi (Anerkennung) ücretini karşılar mı?",
          answer: "Evet, belgeler tercümana tercüme ettirilirken Jobcenter ücreti karşılar. Ancak bu süreci Jobcenter ile başlatmak ve onlarla anlaşmak gerekir."
        },
        {
          question: "Baden-Württemberg (BW) Eyaletinde Türkçe öğretmenliği denkliği alınabiliyor mu?",
          answer: "Malesef, BW'de Türkçe veya Edebiyat öğretmeni olarak Anerkant (tanınmış) olunamıyor. Eğitim Bakanlığı Türkçe mezunlarını branş olarak tanımıyor ve burada öğretmenlik yapmak isteniyorsa buradaki bir üniversitede iki branş okunması öneriliyor."
        },
        {
          question: "Baden-Württemberg'de ikamet eden, denklik almak için NRW'ye taşınmalı mı?",
          answer: "NRW'ye taşınmak, Anerkennung süreci için daha kolay bir yol olabilir, zira BW'de Türkçe öğretmenliği branş olarak tanınmamaktadır."
        }
      ]
    },
    {
      category: "Almanca ve Türkçe Dil Şartları",
      items: [
        {
          question: "Türkçe öğretmenliği kadrolarına başvurmak için istenen Almanca dil seviyesi nedir?",
          answer: "Okullarda görev yapmak için C1 Almanca olmadan gerçekten çok zordur. İlanlarda genellikle tam C1 ifadesi yerine 'hochschulzueingang' (üniversiteye giriş yeterliliği) veya Goethe sertifikası yazmaktadır."
        },
        {
          question: "C1 Almanca sertifikası olmayan bir Türkçe öğretmeni işe alınabilir mi?",
          answer: "C1 Almanca, HSU için çok gerekli değildir ve C1 olmadan çalışanlar vardır. Müracaat edenler arasında C1 olan yoksa diğerleri arasından alım yapılabilir. Ancak mülakata çağrılma (Auswahlgespräch) oranı düşüktür."
        },
        {
          question: "C1 Almanca şartının bu kadar zorlanmasının sebebi nedir?",
          answer: "C1 istenmesinin bir diğer sebebi, seçilen Türkçe öğretmenlerinin Türkçe dersleri dışında Team saatlerinde (örneğin 4. sınıf Almanca anlatmak gibi) Vertretung (vekaleten ders) yapmak zorunda olmalarıdır."
        },
        {
          question: "HSU Türkçe öğretmenliği için Türkçe C1 sertifikası gerekli midir?",
          answer: "Eğer branşınız Türkçe ise (Türk Dili ve Edebiyatı mezunuysanız) hayır, Türkçe C1 sertifikası gerekli değildir. Ancak, Türkiye dışında yükseköğrenimini tamamlayanlar için, ilgili ülkede Türkçe öğretimi hususunda akredite kuruluşlarca verilmiş en az C1 düzeyinde Türkçe belgesi istenebilir."
        },
        {
          question: "Türkçe öğretmeni olmayan (başka branştan) biri Türkçe öğretmenliğine başvuracaksa hangi Türkçe belgesi istenir?",
          answer: "Branşı Türkçe olmayanların, başvurularda avantaj sağlamak için TELC Türkçe C1 Sınavı'na girmesi tavsiye edilir."
        }
      ]
    },
    {
      category: "Türkçe Öğretmenliği (HSU) Kariyeri ve İmkanları",
      items: [
        {
          question: "Türkçe öğretmenleri Almanya'da hangi alanlarda çalışabilirler?",
          answer: "NRW Eyaletinde, Türkçe, Fransızca, İspanyolca, Latince gibi ikinci yabancı dil (zweite Fremdsprache) kabul edilmektedir. Türkiye mezunu öğretmenler için en iyi alternatif, Köken Dili Dersi Öğretmenliği (HSU) olarak görülmektedir. Ayrıca Halk Eğitim Merkezi (VHS) bünyesinde Almanlara yönelik A1 seviyesi Türkçe kursları açılabilmektedir."
        },
        {
          question: "HSU Türkçe öğretmenliği için tam mesleki denklik (Anerkennung) şartı aranıyor mu?",
          answer: "Hayır, HSU Türkçe öğretmenliği için tam Anerkennung şartı aranmaz. ZAB'dan alınan diploma değerlendirmesi (Zeugnisbewertung) yeterli görülmektedir."
        },
        {
          question: "Türkçe öğretmenliği kadrolarında öncelik sıralaması nasıldır?",
          answer: "Öncelik sıralaması şöyledir: 1. Almanya mezunu Türkçe Öğretmenleri. 2. Türkiye Mezunu Türkçe Öğretmenleri (C1 Almanca sertifikası olanlar). 3. TELC C1 sahibi diğer kişiler (lisans mezunu olmayanlar)."
        },
        {
          question: "Türkçe öğretmenliği ilanları nereden takip edilebilir?",
          answer: "Türkçe öğretmenleri illerdeki Schulamt'a (İl Milli Eğitim) bağlı çalışır, alım bölgeseldir. İlanlar genellikle Bezierksregierung (Valilik) sitelerinden takip edilmelidir. Köln'de tam ve yarım kadro ilanları Bezreg-koeln.nrw.de gibi adreslerde yayınlanmaktadır."
        },
        {
          question: "Köln'deki Türkçe öğretmenliği kadrolarına kaç kişi başvuruyor ve iş bulma şansı nedir?",
          answer: "Köln'deki ilanlara en az 100 kişi başvurabilmektedir. Köln'de mecburi Türkçe dersi olan sadece 4 okul vardır. Genel olarak 4 kişilik bir pozisyon için 200 müracaat olabilmektedir."
        },
        {
          question: "HSU Türkçe öğretmenlerinin maaş durumu ve çalışma şartları nasıldır?",
          answer: "Net maaş 2200 Euro civarıdır. Çalışma saatleri genellikle herkes okuldan ayrıldıktan sonra başlar. Öğretmenler dört beş ayrı okulda çalışmak zorunda kalabilir. Sistem öğrenilene kadar çok fazla evrak işi, toplantı ve hazırlık gereklidir."
        },
        {
          question: "VHS'de (Halk Eğitim Merkezi) Türkçe kursu vermek için hangi kaynaklar önerilir?",
          answer: "Almanlara yönelik A1 kursları için Hueber'in A1 Türkçe kitabı kullanılabilir, ancak çok güzel olmadığı söylenmiştir. Lale Türkçe ve Tömer'in kitapları da önerilmektedir."
        },
        {
          question: "VHS'de ders verirken ders işleyişi nasıl olmalıdır?",
          answer: "Ders işleyişi tamamen Türkçe ile devam etmeli, gramer fazla boğulmamalıdır. Basit cümleler, resimler ve görseller kullanılarak ders anlatılmalıdır."
        },
        {
          question: "Türkiye'den gelen bir Türkçe öğretmeni (okul stajı hariç tecrübesi yoksa) NRW'de çalışabilir mi?",
          answer: "NRW'de KPSS veya belirli bir yıl okulda çalışma tecrübesi şartı istenmemektedir. Ancak kadro az açıldığı ve rekabet yüksek olduğu için tecrübesiz birinin kadro bulması zordur. Mümkünse Schulbegleiter gibi alanlarda tecrübe toplanmalıdır."
        },
        {
          question: "Konsolosluklar (MEB) tarafından açılan sözleşmeli öğretmenlik ilanlarına başvurmanın şartları nelerdir?",
          answer: "İlgili ülke vatandaşlığına veya süresiz oturma ve çalışma iznine sahip olmak ve başvurulan ataşelik görev bölgesinde ikamet etmek gerekir. Lisans düzeyinde YÖK denkliği kabul edilen fakülte mezunu olup pedagojik formasyon belgesine sahip olmak şarttır."
        },
        {
          question: "Konsolosluk sözleşmeli öğretmenlik sınavları kaç aşamalı ve hangi konuları kapsar?",
          answer: "Sınavlar iki aşamalı ve sözlü yapılır: 1. Mesleki Yeterlik Sınavı (Türkçe, Türk Kültürü, Öğretmenlik Meslek Bilgisi vb.), 2. Temsil Yeteneği Sınavı (Temsil Kabiliyeti, Genel Kültür, Türkçeyi Kullanma Becerisi)."
        },
        {
          question: "Konsolosluk sözleşmeli öğretmenlik sözleşme süresi ne kadardır?",
          answer: "Sözleşme süresi bir yıl olup mali yıl ile sınırlıdır. Üç aylık deneme süresi sonunda başarısız bulunanların sözleşmeleri feshedilebilir. Görevlerinde başarılı olmaları halinde süre uzatılabilir."
        }
      ]
    },
    {
      category: "Alternatif Kariyer ve Entegrasyon Yolları",
      items: [
        {
          question: "Türkçe öğretmenleri için A ve B kariyer planları ne olmalıdır?",
          answer: "A planı, Türkçe Öğretmeni olmak için C1'i tamamlayıp tüm ilanlara başvurmaktır. B planı ise, az kadro açıldığı gerçeğini göz önünde bulundurarak, uygun yan alanlara yönelmek, Almancayı geliştirmek ve okul/iş hayatına atılmaya çalışmaktır (Pratikum, Schulbegleiter vb.)."
        },
        {
          question: "Türkçe öğretmenliği diplomasına sahip biri Erzieherin (Anaokulu Öğretmeni) olabilir mi?",
          answer: "Evet, Erzieher/in en çok düşünülen alternatiftir. Quereinsteiger (yatay geçiş) olarak başvurulabilir. B2 seviyesiyle bir Kita (kreş) ile anlaşıp Praktikantin olarak başlanabilir."
        },
        {
          question: "Erzieherin olmak için yaş sınırı var mıdır?",
          answer: "Yaş sınırı yoktur. Ancak 2-6 yaş çocuklarla uğraşılan ve iş tanımında bez değiştirmek bile olan bu meslek için 40 yaş üstü uygun olmayabilir."
        },
        {
          question: "Türkçe öğretmenlerinin eğitim alanında alternatif olarak yönelebileceği kalifiye kadrolar nelerdir?",
          answer: "NRW eyaletinde öne çıkan alternatifler şunlardır: 1. Multi Professional Team (MPT), 2. Entegrasyon Kurs Öğretmenliği, 3. Schulbegleiter/in (Okul Destek Personeli), 4. Pädagogische Fachkraft."
        },
        {
          question: "MPT (Multi Professional Team) kadrosunun avantajları nelerdir?",
          answer: "En önemli avantajları arasında süresiz sözleşme (unbefristet), TVL-10 kadrosu (iyi ücret), uzun tatil imkanı, ön hazırlık gerektirmemesi, not verilmemesi ve dil gelişimine katkısı sayılabilir."
        },
        {
          question: "MPT kadrosunun zorlukları nelerdir?",
          answer: "Belirli bir iş tanımının olmaması ve zaman zaman kendi alanından uzaklaşmak zorunda kalmak. Vertretungsunterricht (vekaleten ders) yapmak ve farklı zorlukları olan öğrencilerle çalışmak da zorlukları arasındadır."
        },
        {
          question: "Okul ortamına girmeden önce (iş bulmadan önce) ne yapılmalıdır?",
          answer: "Almancayı geliştirmek ve okul sistemine aşina olmak için bir okul müdürüyle görüşerek Hospitation (gözlem) yapılabilir. Hospitation, staj yapan öğretmen adaylarının öğrenmek amacıyla derse dinleyici/izleyici/misafir olarak katılmasıdır."
        },
        {
          question: "Türkiye'deki Master (Yüksek Lisans) diplomasıyla Almanya’da Doktora (Dr.) yapabilir miyim?",
          answer: "Evet, Master yapmış olanlar kolayca doktoraya kayıt yaptırabilirler; prosedür sanıldığından daha basittir."
        },
        {
          question: "Doktora yapmaya başlamak için temel şartlar nelerdir?",
          answer: "Master yapmış olmak ve bir profesörün sizi doktoraya kabul etmesi (Betreuungszusage) gerekir."
        },
        {
          question: "Doktora yaparken Almanca yeterliliği şart mı?",
          answer: "Tüzüklerde Almanca yeterlilik belgesi şartı aranmayabilir. Ancak İngilizcesi iyi olanlar için, danışman profesörle anlaşılırsa, tez yazımını ve çalışma süresince iletişimi İngilizce yapmak mümkündür."
        },
        {
          question: "Doktora öğrencisi olmanın mali avantajları nelerdir?",
          answer: "Doktora öğrencileri, harç parası (bir dönem 200-300 Avro civarında) yatırarak Semesterticket (dönemlik bilet) alırlar. Bu biletle bulunulan eyaletteki tüm tren ve otobüslere ücretsiz binilebilir."
        }
      ]
    },
    {
      category: "İş Başvurusu ve Mülakat (Auswahlgespräch) Teknikleri",
      items: [
        {
          question: "İş mülakatına (Auswahlgespräch) hazırlanırken nasıl bir ön çalışma yapmalıyım?",
          answer: "1. Özel bir Türkçe Anschreiben hazırlayın. 2. Başvurulan kadroya uygun okul türünün müfredatını (Lehrplan) inceleyin. 3. Mülakata giderken yanınızda mutlaka kendi hazırladığınız bir blok ders planını götürün. 4. Arkadaşlarınızla mülakat provası yapın."
        },
        {
          question: "İyi bir öğretmende olması beklenen temel özellikler nelerdir?",
          answer: "Alan bilgisi, çeşitli öğretim yöntemlerini kullanma becerisi, net ve anlaşılır iletişim kurma, empati ve sabır, öğrencileri motive etme, iyi sınıf yönetimi, esneklik ve alana tutku gibi özellikler beklenir."
        },
        {
          question: "Sınıf yönetimi sorunları (disiplin) nasıl ele alınmalıdır?",
          answer: "Net kurallar ve düzenli rutinler oluşturarak önleme yapılmalıdır. Problemler başladığında sözel olmayan işaretler veya sessiz uyarılar ile erken müdahale edilmelidir. Ciddi durumlarda sakin ve net bir şekilde uyarma, 'Ben' dili kullanarak iletişim kurma ve ortak çözüm yolları arama teknikleri kullanılmalıdır."
        },
        {
          question: "Otizm Spektrum Bozukluğu (OSB) olan öğrencilere karşı yaklaşım nasıl olmalıdır?",
          answer: "Yapılandırılmış öğrenme ortamları (net yapılar, rutinler) ve görsel destekler (günlük programlar, resimli kartlar) sağlanmalıdır. İletişimde açık, basit ve net dil kullanılmalıdır."
        },
        {
          question: "Veli, çocuğunun notları konusunda suçlayıcı veya endişeli gelirse nasıl iletişim kurulmalıdır?",
          answer: "Sakin kalınmalı ve velinin endişeleri dikkatlice dinlenmelidir. Empati gösterilmeli. Durum, somut örneklerle objektif bir şekilde açıklanmalıdır. Pozitif, çözüm odaklı bir yaklaşım benimsenmeli ve veli işbirliğine teşvik edilmelidir."
        },
        {
          question: "Okuldaki bir öğretmen arkadaşla tartışma yaşanırsa nasıl çözülmelidir?",
          answer: "Tartışma anında sakin kalmaya çalışılmalı. Hatalı olunduğunda samimi bir şekilde özür dilenmeli. 'Ben' dili kullanılarak duygular net bir şekilde ifade edilmeli ve suçlamadan kaçınılmalıdır."
        },
        {
          question: "Almanya'da tecrübem yoksa mülakatta ne gibi tecrübeleri vurgulamalıyım?",
          answer: "Türkiye'deki çalışmalarınızı, kendi çocuklarınızın tecrübelerini, arkadaşlarınızın tecrübelerini veya internetten araştırılan eğitim bilgilerini kullanarak, tecrübenize dayalı kısa ve net cevaplar verin."
        }
      ]
    },
    {
      category: "Jobcenter ve Sosyal Haklar (ALG II / Sosyal Para)",
      items: [
        {
          question: "Jobcenter'den İşsizlik Parası II (ALG II) alma şartları nelerdir?",
          answer: "Çalışma yeteneğine sahip bir hak sahibi olmanız, yaşınızın 15 ile yasal kural emeklilik başlangıç yaşı arasında olması, mutat olarak Almanya’da oturmanız ve yardıma muhtaç olmanız gerekir."
        },
        {
          question: "İşsizlik Parası II almak için işsiz olmak şart mıdır?",
          answer: "Hayır, eğer bir işte çalışıyorsanız ve bu işten elde ettiğiniz gelir kendinizin ve ailenizin geçimini sağlamaya yetmiyorsa, İşsizlik Parası II alabilirsiniz."
        },
        {
          question: "Jobcenter yardımı alırken her işi kabul etme yükümlülüğüm var mıdır?",
          answer: "Evet, İşsizlik Parası II alınıyorsa, yasal istisnalar hariç, yapabilecek durumda olduğunuz her işi kabul etmekle yükümlüsünüz."
        },
        {
          question: "Hangi durumlarda işi kabul etmeme hakkım vardır (Önemli Sebep)?",
          answer: "Yaptırımlar, eğer davranışınız için önemli bir sebebiniz varsa, uygulanmaz. Önemli bir sebep, örneğin: bir işin yapılması, üç yaşın altındaki bir çocuğun yetiştirilmesini tehlikeye soktuğunda veya aile üyelerinden birinin bakımı başka şekilde temin edilemiyor ve bu iş ile uygun düşmüyorsa."
        },
        {
          question: "Jobcenter memuru nitelikli işler yerine basit işlere yönlendirirse ne yapılmalıdır?",
          answer: "Jobcenter memurları sizi kısa yoldan işe yerleştirmek isteyebilirler. Bu durumda memurla restleşmeden, ne istediğinizi net vurgulamak ve kararlı olmak önemlidir. Alanınızda bir iş istediğinizi belirterek, diplomanızı sunabilirsiniz."
        },
        {
          question: "Yurt dışındaki (Türkiye'deki) mal varlığı ve emekli maaşı Jobcenter'e bildirilmeli midir?",
          answer: "Evet, yurtiçi veya yurtdışı tüm varlıklar (nakit, tasarruf, ev, arsa mülkiyeti, emekli aylıkları) Jobcenter'a bildirilmelidir. Türkiye'deki kayıtlar artık Almanya'dan takip edilebilmektedir."
        },
        {
          question: "Jobcenter'dan yardım alırken şehir dışına veya yurt dışına çıkabilir miyim?",
          answer: "'İzne gitmek için' (yurt içi veya yurt dışı olması fark etmez) daima önceden sizin için yetkili Jobcenter’in olurunu almanız gerekir. Oturduğunuz yeri izinsiz terk etmek, İşsizlik Parası II’nin kesilmesini gerektirir."
        },
        {
          question: "Jobcenter'a hangi durum değişiklikleri derhal bildirilmelidir?",
          answer: "Bildirilmesi gerekenler arasında: bir işe başlanması, yakında bir eğitime başlama niyeti, oturma statüsündeki değişiklikler, adres değişikliği/taşınma, evlenme/boşanma, gelir veya varlık durumundaki değişiklikler yer alır."
        },
        {
          question: "Yükümlülük ihlali durumunda yaptırımlar nasıldır?",
          answer: "İlk İhlal: %30 kesinti. Tekrar İhlali: %60 kesinti. Sonraki Tekrarlar: Ödeme tamamen kesilir ve sağlık sigortası güvencesi ortadan kalkar."
        },
        {
          question: "Yaptırım sonucunda İşsizlik Parası II tamamen kesilirse, sağlık sigortası aidatları ne olur?",
          answer: "İşsizlik Parası II ödenmez ve böylece hastalık sigortası ve bakım sigortasında sigorta yükümlülüğü oluşmaz. Bu süre zarfında aidatları kendiniz karşılamak zorundasınız."
        },
        {
          question: "Jobcenter'dan Alınabilecek Diğer Yardımlar nelerdir?",
          answer: "Eğitim paketi (okul ihtiyaçları, geziler, sosyal yaşama katılım), özel ihtiyaç kredisi, çocuk zammı (Kinderzuschlag) gibi yardımlar mevcuttur."
        }
      ]
    },
    {
      category: "Kariyer Girişimi ve İş Arama Stratejileri",
      items: [
        {
          question: "İş arama sürecinde Initiativbewerbung (Spontane Başvuru) nedir?",
          answer: "Açık bir iş ilanı olmamasına rağmen, çalışmak istediğiniz kuruma doğrudan başvuru yapmaktır. Bu, işverenlerin henüz yayınlanmamış pozisyonlar için aday bulmasını sağlayan etkili bir yöntemdir."
        },
        {
          question: "Hangi branşlarda öğretmen açığı (kriz) olduğu söylenmektedir?",
          answer: "Şu anda kriz olan branşlar Fen, Matematik, İngilizce ve Spor olarak belirtilmiştir. Bu branşlarda Almanca yeterliliği varsa vekaleten öğretmenlik (Vertretung) yoluyla işe başlama tavsiye edilir."
        },
        {
          question: "Türkçe öğretmenliğinden vazgeçmek yerine, kariyerde dengeyi nasıl kurabilirim?",
          answer: "Türkçe öğretmenliğinden vazgeçmek yanlış olsa da, az istihdam nedeniyle bir B planı oluşturulmalıdır. Bir yandan Almanca geliştirilerek Schulbegleiter veya Praktikum gibi yan alanlara yönelmeli, bir yandan da açılan tüm kadrolara başvurulmalıdır."
        },
        {
          question: "Almanca öğrenme konusunda nasıl bir yol izlenmeli?",
          answer: "C1 sertifikası hedeflenmelidir. Ancak sadece sertifika almak yeterli değildir; piyasada konuşulan dil C1 seviyesinin çok üzerindedir. Dile çok önem verilmeli; film izleme, kitap okuma, sosyal çevrelerde olma gibi aktiviteler ihmal edilmemelidir."
        },
        {
          question: "Yabancı dil olarak Türkçe Öğretimi sertifika programları Almanya'da işe yarar mı?",
          answer: "Türkiye'deki üniversitelerin online kursları, Yabancı Dil olarak Türkçe Öğretimi konusunda yayınları ve yaklaşımları incelemesi açısından verimli olabilir ve sertifika edinmek bir avantaj sağlayabilir."
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
              <Languages className="w-12 h-12 text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-red-500/20 text-red-100 hover:bg-red-500/30 border-0">
                  Eğitim & Dil
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Orta-Yüksek Talep
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  14dk Okuma
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Türkçe Öğretmenleri
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                Türk Dili ve Edebiyatı öğretmenleri için Almanya'da kariyer, HSU öğretmenliği, denklik süreçleri ve alternatif yollar hakkında kapsamlı rehber.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="w-full justify-start h-auto p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <TabsTrigger value="guide" className="px-6 py-3 rounded-lg data-[state=active]:bg-red-50 dark:data-[state=active]:bg-red-900/20 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400">
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
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            
            {/* Bölüm 1: Hazırlık Süreci */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="w-6 h-6 text-red-500" />
                  I. Hazırlık Süreci: Mesleki Alan ve Temel Şartlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">1. Kariyer Hedefi ve Mesleki Durum</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Türkçe öğretmenliği, özellikle Kuzey Ren-Vestfalya (NRW) Eyaletinde, Fransızca veya İspanyolca gibi ikinci yabancı dil (zweite Fremdsprache) statüsündedir. 
                    Türkiye mezunu öğretmenler için en güçlü alternatif, <strong>Köken Dili Dersi Öğretmenliği (Herkunftssprachlicher Unterricht - HSU)</strong> olarak öne çıkar.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      Önemli İpucu
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Almanya genelinde Fen, Matematik, İngilizce ve Spor branşlarında yüksek açık vardır. Eğer Almancanız yeterliyse ve bu alanlara ilginiz varsa, vekaleten öğretmenlik (Vertretung) yoluyla sisteme giriş yapmak stratejik bir hamle olabilir.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">2. Dil Yeterliliği</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">Almanca Yeterliliği</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>Genellikle C1 seviyesi veya TestDaF/DSH belgesi istenir.</li>
                        <li>Devlet okullarında C1 olmadan çalışmak çok zordur.</li>
                        <li>B1 seviyesi, üniversite kursları ve Ausbildung için alt sınırdır.</li>
                        <li>Mülakatlarda sertifikadan ziyade konuşma becerisi belirleyicidir.</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">Türkçe Yeterliliği</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>Türkçe/Edebiyat mezunları için C1 sertifikası gerekmez.</li>
                        <li>Diğer branşlardan geçiş yapacaklar için TELC Türkçe C1 avantaj sağlar.</li>
                        <li>HSU öğretmenliği için anadil yetkinliği esastır.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">3. Evraklar ve Üniversite Denkliği</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="zab">
                      <AccordionTrigger>ZAB (Bonn) Başvurusu</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Türkiye'deki diplomanızın akademik denkliği için ZAB'a (Zentralstelle für ausländisches Bildungswesen) başvurmalısınız. Bu belge mesleki denklik değil, akademik derecenizin (Lisans/Master) tanınmasıdır.</p>
                        <p className="text-sm text-slate-500">Gerekli: Başvuru formu, diploma ve transkript tercümeleri (Belediye onaylı).</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="lise">
                      <AccordionTrigger>Lise Diploması ve Transkript</AccordionTrigger>
                      <AccordionContent>
                        <p>En garantili yol, mezun olunan liseye dilekçe ile başvurarak "Diploma Kayıt Örneği" almaktır. E-Devlet belgeleri imzasız olduğu için bazen sorun yaratabilir.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tecrube">
                      <AccordionTrigger>İş Tecrübesi Belgeleme</AccordionTrigger>
                      <AccordionContent>
                        <p>SGK hizmet dökümü veya Milli Eğitim'den alınacak Hizmet Cetveli ile tecrübenizi kanıtlayabilirsiniz. Stajyerliğin kalktığını gösteren belgeler önemlidir.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>

            {/* Bölüm 2: Varış ve Yaşam Uyumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plane className="w-6 h-6 text-blue-500" />
                  II. Varış ve Yaşam Uyumu (Jobcenter & Sosyal Haklar)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-600 dark:text-slate-400">
                  Almanya'ya yeni gelenler için Jobcenter, iş arama sürecinde hayati bir destek mekanizmasıdır.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Maddi Yardımlar</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Regelleistung:</strong> Temel yaşam giderleri için aylık ödeme.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Kira ve Isınma:</strong> Uygun ölçülerdeki konut masrafları karşılanır.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Ek İhtiyaçlar:</strong> Gebelik, tek ebeveynlik gibi durumlarda ek ödeme.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Yükümlülükler ve Dikkat Edilmesi Gerekenler</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span><strong>İşbirliği:</strong> İş görüşmelerine gitmek ve kurslara katılmak zorunludur.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span><strong>Bildirim:</strong> Gelir değişikliği, taşınma veya il dışına çıkışlar bildirilmelidir.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span><strong>Mal Varlığı:</strong> Türkiye'deki varlıklar gizlenmemelidir.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bölüm 3: Kariyer Yolları */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-6 h-6 text-purple-500" />
                  III. Kariyer Yolları ve Mesleki Entegrasyon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Mesleki Tanınma */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    1. Mesleki Tanınma (Anerkennung)
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Öğretmenlik düzenlenmiş (reglementiert) bir meslektir. Eyaletlerdeki <strong>Lehrkräfteakademie</strong> kurumlarına başvurulur (Örn: NRW'de Detmold).
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Karşılaşılan Zorluklar ve Çözümler</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li><strong>Tek Branş Sorunu:</strong> Türkiye mezunları genelde tek branşlıdır. NRW'de tam denklik için ikinci branş istenir.</li>
                      <li><strong>Muafiyetler:</strong> Doktora tezi "Hausarbeit" yerine, Türkiye'deki hizmet cetveli "Stajyerlik" yerine sayılabilir.</li>
                      <li><strong>Eksik Kredi:</strong> Transkriptteki sosyoloji, psikoloji gibi dersler ikinci branş tamamlama için kullanılabilir.</li>
                    </ul>
                  </div>
                </div>

                {/* HSU Öğretmenliği */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    2. HSU (Köken Dili) Öğretmenliği
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Kadrolu öğretmenlikten farklıdır, genellikle tam Anerkennung aranmaz. ZAB belgesi yeterli olabilir.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="bg-slate-50 dark:bg-slate-900 border-0">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Başvuru ve Alım</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          İllerdeki Schulamt (Milli Eğitim) üzerinden veya doğrudan okul müdürleriyle görüşerek (ücretli öğretmenlik) başvurulabilir. Öncelik Almanya mezunlarındadır.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50 dark:bg-slate-900 border-0">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Çalışma Şartları</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Genelde öğleden sonraları, farklı okullarda ders verilir. Net maaş 2200€ civarındadır. Evrak işi ve hazırlık süreci yoğundur.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Alternatif Kariyerler */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    3. Alternatif Kariyer Yolları
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="erzieher">
                      <AccordionTrigger>Eğitimci (Erzieher/in) & Pedagojik Personel</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Anaokulu öğretmenliği için ek eğitim gerekebilir. "Quereinsteiger" (yatay geçiş) ile başvuru yapılabilir. Pedagojik Uzman (Pädagogische Fachkraft) olarak kreşlerde veya gençlik merkezlerinde çalışılabilir.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="schulbegleiter">
                      <AccordionTrigger>Okul Destek & MPT (Çok Profesyonel Ekip)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2"><strong>Schulbegleiter:</strong> Öğrenme güçlüğü çeken öğrencilere birebir destek. Sistemi tanımak için harika bir başlangıçtır.</p>
                        <p><strong>MPT (NRW):</strong> Özel eğitim okullarında süresiz sözleşme ve iyi maaş (TVL-10) imkanı sunar. Not verme sorumluluğu yoktur.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="akademik">
                      <AccordionTrigger>Akademik Kariyer & VHS</AccordionTrigger>
                      <AccordionContent>
                        <p>Halk Eğitim Merkezlerinde (VHS) Türkçe kursları verilebilir. Ayrıca Master ve Doktora yapmak, akademik kariyer için en açık kapıdır. Doktora öğrenciliği, öğrenci avantajlarından (Semesterticket) yararlanmayı sağlar.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>

            {/* Bölüm 4: İş Başvurusu ve Mülakat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageSquare className="w-6 h-6 text-green-500" />
                  IV. İş Başvurusu ve Mülakat Teknikleri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Hazırlık Aşaması</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Özel Anschreiben:</strong> Standart ön yazının yanında, eğitim felsefenizi anlatan Türkçe bir metin hazırlayın.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Ders Planı:</strong> Görüşmeye mutlaka kendi hazırladığınız bir blok ders planı götürün.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Okul İncelemesi:</strong> Başvurduğunuz okul türünün müfredatını (Lehrplan) inceleyin.</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Mülakat İpuçları</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Sınıf Yönetimi:</strong> Disiplin sorunlarına karşı net kurallar ve erken müdahale tekniklerinden bahsedin.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Veli İletişimi:</strong> Çözüm odaklı, empatik ve pozitif yaklaşımı vurgulayın.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Özel İhtiyaçlar:</strong> DEHB veya Otizm gibi durumlarda yapılandırılmış öğrenme ortamı stratejilerini bilin.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ek Bilgi: Öğretmenlik Statüleri */}
            <Card className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Landmark className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  Ek Bilgi: Almanya'da Öğretmenlik Statüleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100">1. Memur (Beamter)</h5>
                    <p className="text-xs text-slate-500 mt-1">En yüksek statü. Alman vatandaşlığı, iki branş ve iki devlet sınavı gerektirir. Yabancılar için çok zordur.</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100">2. Sözleşmeli (Angestellter)</h5>
                    <p className="text-xs text-slate-500 mt-1">Süreli veya süresiz olabilir. Süresiz sözleşme (unbefristet) memurlukla benzer haklara sahiptir.</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100">3. Ders Ücretli (Honorar)</h5>
                    <p className="text-xs text-slate-500 mt-1">En basit başlangıç. Müdür inisiyatifiyle başlanır, tecrübe için iyidir ancak geliri düşüktür.</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100">4. Vekaleten (Vertretung)</h5>
                    <p className="text-xs text-slate-500 mt-1">İzinli öğretmenlerin yerine geçici çalışma. İyi ücretlidir ve kadro yolunu açabilir.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Türkçe öğretmenlerinin Almanya'daki kariyer ve yaşam süreçlerinde karşılaştığı prosedürler, deneyimler ve teknik detaylar hakkında kapsamlı soru-cevap veritabanı.
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
                        <AccordionTrigger className="text-left hover:no-underline py-4 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
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
                  Türkçe öğretmenlerinin Almanya'daki deneyimleri
                </p>
              </div>
              <ShareExperienceDialog defaultProfessionName="Türkçe Öğretmeni" />
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
                  <ShareExperienceDialog defaultProfessionName="Türkçe Öğretmeni" />
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
        </Tabs>
      </div>
    </div>
  );
}
