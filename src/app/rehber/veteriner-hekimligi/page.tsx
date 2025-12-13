"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
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
  Syringe,
  Dog,
  Activity,
  Scissors,
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

export default function VeterinerHekimligiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Veteriner%,profession.ilike.%Hekim%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const faqData = [
    {
      category: "Denklik (Anerkennung) ve Approbation Süreci",
      items: [
        {
          question: "Diploma denkliği (Approbation) konusunda izlenecek yol nedir?",
          answer: "Öncelikle Bonn’daki ZAB (Zentralstelle für ausländisches Bildungswesen) kurumunda diploma değerlendirmesi (Bewertung) yaptırılabilir, zira bu süreç Approbation’dan daha kısadır. Değerlendirmeden sonra dil şartı ve fark dersleri (Kenntnisprüfungen) süreci başlar."
        },
        {
          question: "Ankara, Dicle gibi üniversiteler Anabin sitesinde görünmüyorsa ne yapılmalıdır?",
          answer: "Anabin’de üniversitenin görünmemesi, o fakülteden daha önce başvuru yapılmamış olmasından kaynaklanabilir. Yine de Approbation sürecine başvuru yapılmalıdır."
        },
        {
          question: "Henüz B1 sertifikası yokken Approbation işlemlerini başlatmak doğru mudur?",
          answer: "Bu süreç 3 ila 6 ay sürdüğü için B1 sertifikası olmadan da başlatılabilir; bu durum çalışmaya engel teşkil etmez."
        },
        {
          question: "Diploma değerlendirmesi (Bewertung) için başvuru ücreti ne kadardır?",
          answer: "Başvuru ücreti yaklaşık 200-250 Euro civarındadır ve bu masraflar Jobcenter ile görüşülerek karşılanabilir."
        },
        {
          question: "Türkiye'de alınan yüksek lisans veya doktora diplomaları Almanya'da tanınır mı?",
          answer: "Klinik dışı alanlardaki (örneğin Cerrahi Yüksek Lisansı, Farmasötik Toksikoloji Doktorası) akademik derecelerin denkliği ZAB’da yaptırılsa da geçerli olmadığı görülmüştür. Eğer akademik unvanın (Doktor) Approbation belgesine dahil edilmesi istenirse, Bilim Bakanlığı'ndan (Wissenschaftsministerium) ücretli bir sertifika alınması gerekir."
        },
        {
          question: "Almanya'nın denklik işlemlerini kolaylaştırdığı yeni kanunlar veteriner hekimleri kapsıyor mu?",
          answer: "Hayır, bu yeni kanunlar genellikle hemşire, hasta bakıcı, kamyon şoförü gibi meslekler için geçerlidir. Veteriner hekimler, doktorlar gibi sağlık alanında karar verici meslek grupları bu kolaylaştırma kapsamına girmiyor."
        },
        {
          question: "Approbation işlemleri için hangi resmi belgeler gereklidir?",
          answer: "Diploma, transkript ve ders içerikleri gereklidir. Bütün belgelerin apostil edilmesi şarttır. Alternatif olarak, diploma değerlendirme işlemlerinde diploma ve transkriptin tercüme edilip Jobcenter'da 'Aslı gibidir' (Beglaubigung) yapılması kabul edilmiştir."
        },
        {
          question: "Transkriptte bulunan ders kodları ile okulun web sitesindeki ders kodlarının farklı olması denklik sürecini etkiler mi?",
          answer: "Evet, derslerin kodlarının uyuşması gerekir. Aksi takdirde, sahtekarlık olarak adledilebileceği belirtilmiştir."
        },
        {
          question: "Tam denklik (Approbation) için kaç adet fark dersi (Kenntnisprüfungen) alınması gerekiyor?",
          answer: "Bu, menşe ülkeye ve eğitimin kapsamına bağlı olarak değişir, ancak en fazla 15 sınava (bilgi testi) girilmesi gerekir. Klinik tecrübesi olanlardan 5 ders kaldırılarak 10 derse düşürüldüğü tecrübe edilmiştir."
        },
        {
          question: "Approbation için Almanya'daki fakültelerde tamamlanması gereken 10 hukuki ders hangileridir?",
          answer: "Bunlar: 1. Hayvan Yetiştiriciliği, 2. Hayvan Refahı ve Etoloji, 3. Hayvan Beslenmesi, 4. Hayvan Hastalıklarıyla Mücadele ve Enfeksiyon Epidemiyolojisi, 5. İlaç ve Narkotik Maddeler Hukuku, 6. Radyoloji, 7. Gıda Bilimi ve Gıda Hijyeni, 8. Et Hijyeni, 9. Süt Bilimi, 10. Adli Veteriner Hekimlik, Meslek ve Oda Hukuku."
        },
        {
          question: "EAEVE akreditasyonunun denklik sürecine bir faydası var mıdır?",
          answer: "Evet, Ankara Veteriner Hekimlik diplomasında görülen EAEVE akreditasyonu denkliği gösterir ve bu, denklik için büyük avantaj yaratır."
        },
        {
          question: "Fark dersleri için üniversiteye devam zorunluluğu var mı?",
          answer: "Dersler için üniversiteye devam zorunluluğu yoktur; sadece sınavlara girilir. Sınavlar genellikle sözlü yapılır."
        },
        {
          question: "Tam denkliği (Approbation) tamamlamak için ne kadar süre vardır?",
          answer: "Tam denkliği 4 sene içerisinde tamamlamak zorunludur. Aksi takdirde +4 sene daha süre verilebilse de, sınavları geçememe durumunda mesleki izin (Berufserlaubnis) elden alınabilir."
        },
        {
          question: "Klinik tecrübesi, Approbation için alınması gereken ders sayısını etkiler mi?",
          answer: "Evet, klinik tecrübesi varsa bazı derslerden muaf olunur. Türkiye'de veteriner olarak çalışılan sürenin 3 yılı geçmemesi denklik başvurusu için alınması gereken bazı derslerden muaf olmak açısından faydalıdır."
        }
      ]
    },
    {
      category: "Dil Şartları ve Eğitim",
      items: [
        {
          question: "Veteriner hekim olarak çalışabilmek için asgari Almanca dil şartı nedir?",
          answer: "Çalışmaya başlayabilmek (Berufserlaubnis) için B2 Almanca sertifikası yeterlidir. Ancak Tam denklik (Approbation) için resmi olarak C1 Almanca sertifikası ve iyi konuşma yeteneği şartı aranmaktadır."
        },
        {
          question: "B2 Almanca seviyesi ile çalışmak gerçekten zor mudur?",
          answer: "Evet, tecrübelere göre B2 ile çalışmak zordur. Bu nedenle C1 seviyesinin alınması tavsiye edilmiştir."
        },
        {
          question: "Klinikte çalışmak için B2 sertifikasının 'allgemein' mi yoksa 'Beruf' mu olması gerekir?",
          answer: "Çalışmak için genel B2 konuşma dilinden sertifika almak yeterlidir."
        },
        {
          question: "Almanya'daki resmi dil kurslarında tıbbi terminoloji eğitimi veriliyor mu?",
          answer: "Hayır, normal dil kurslarında tıp dili ve terminolojisine ilişkin öğrenme içeriği eksiktir. Bunların bağımsız olarak çözülmesi gerekir."
        },
        {
          question: "Yabancı veteriner hekimlere özel online dil eğitim paketi desteği var mıdır?",
          answer: "Evet, işe başladıktan sonra işveren, yabancı veteriner hekimlere özel, 900 Euro değerinde online bir dil eğitim paketi satın alabilir ve ödemesini üstlenebilir."
        }
      ]
    },
    {
      category: "Çalışma İzni (Berufserlaubnis) ve Vize",
      items: [
        {
          question: "Berufserlaubnis (Mesleki İzin) nedir ve ne işe yarar?",
          answer: "Bu izin, Approbation (Tam Denklik) gerekli olmadan veteriner hekim olarak başka bir hekimin yanında çalışmaya imkan tanıyan geçici bir izindir. Bu izinle kendi başına klinik açılamaz."
        },
        {
          question: "Mesleki İzin (Berufserlaubnis) kaç yılda bir yenilenir?",
          answer: "İzin süresi eyaletlere göre değişir; NRW'de 4 yılda bir, bazı eyaletlerde (örneğin Berlin) 2 yılda bir yenilenir ve bu süre sonunda yenilenebilir."
        },
        {
          question: "Mesleki İzin (Berufserlaubnis) başvurusu nereye yapılır?",
          answer: "İlgili eyaletin tarım bakanlığına/yetkili kurumuna yapılır. Örneğin, NRW'de LANUV'a başvurularak yaklaşık 167-170 Euro ödeme yapılır."
        },
        {
          question: "İş bulmak için etkili bir yöntem var mıdır?",
          answer: "İş arayanlar için, işverene doğrudan yapılan spekülatif başvuru olan Initiativbewerbung (İnisiyatif Başvurusu) etkili bir yöntem olarak tavsiye edilmiştir."
        },
        {
          question: "İş bulunduktan sonra çalışma ve oturma vizesi nasıl alınır?",
          answer: "İşveren, yabancılar dairesinden ön onay almak için eyaletin Veteriner Hekimler Odası'na başvurur. Oda tavsiyeyi Yabancılar Dairesi'ne bildirir. Daire resmi çalışma iznini verir ve Konsolosluk en fazla 14 gün içerisinde çalışma vizesini verir."
        },
        {
          question: "Vize başvurusu sırasında Türkiye'den gelen doktor raporu geçerli midir?",
          answer: "Hayır, vize için sunulan Türkiye'den alınan doktor raporu kabul edilmeyebilir; Alman bir doktordan sağlık raporu alınması gerekebilir."
        }
      ]
    },
    {
      category: "Mesleki Yaşam ve Kariyer",
      items: [
        {
          question: "Almanya'da veteriner hekimlerin ortalama maaşı nedir?",
          answer: "Ortalama Veteriner Hekim brüt maaşı 3000-4500 Euro arasındadır. Daha düşüğü olmaz ancak daha fazlası mesleki tecrübeye bağlıdır."
        },
        {
          question: "Klinik açmak için hangi izin gereklidir?",
          answer: "Klinik açabilmek için Approbation (Tam Denklik/Ruhsat) şarttır."
        },
        {
          question: "Gıda sektöründe çalışmak için hangi izin gereklidir?",
          answer: "Gıda sektöründe (Fleischhygiene, Lebensmittelkunde) çalışmak için Approbation (Tam Denklik) şarttır. Bazı eyaletlerde sadece Alman vatandaşlığı olan hekimler yapabilmektedir."
        },
        {
          question: "Tecrübesi olmayan veya uzun süre mesleğe ara veren hekimlerin iş bulma şansı nedir?",
          answer: "Klinikler genellikle tecrübeye güvenir. Tecrübesi olmayanlara hemen iş verilmez. Ancak, yaşı büyük olsa bile tecrübesi olan hekimlerin şansı yüksektir."
        },
        {
          question: "Tecrübe eksikliği nasıl giderilir?",
          answer: "B1 dil seviyesinden sonra bile veteriner kliniklerine gönüllü olarak başvurulup (Freiwillig / Ehrenamtlich) hem dil hem de tecrübe geliştirilebilir."
        },
        {
          question: "Büyükbaş hekimliği rutini Türkiye'den farklı mıdır?",
          answer: "Evet. Çiftlik sahipleri suni tohumlama ve tırnak bakımı işlemlerini genellikle özel şirketlere yaptırır. Hekimler daha çok senkronizasyon, doğum komplikasyonları ve buzağı hastalıklarıyla ilgilenir."
        },
        {
          question: "Klinik dışı alanlarda çalışmak için Approbation şart mıdır?",
          answer: "Hayır, post doktora veya ilaç firmasında araştırma gibi alanlar için de çalışma izni (Berufserlaubnis) alınabilir."
        }
      ]
    },
    {
      category: "Veteriner Sağlık Teknikerleri ve Teknisyenleri",
      items: [
        {
          question: "Veteriner Sağlık Teknikeri diploması ile Almanya'da çalışılabilir mi?",
          answer: "Maalesef, Türkiye'deki Veteriner Sağlık Teknikeri diplomaları ile doğrudan çalışma imkanı bulunmamaktadır."
        },
        {
          question: "Veteriner Sağlık Teknikerlerinin yetkileri nedir?",
          answer: "Almanya'da enjeksiyon, aşı ve serum uygulama yetkisi yoktur. Suni tohumlama tecrübesi varsa bazı işletmelerde çalışılabilir."
        },
        {
          question: "Teknikerlik için Almanya'da Ausbildung seçeneği var mıdır?",
          answer: "Evet, Tierpfleger olarak 3 yıllık Ausbildung mevcuttur. En az B2 dil seviyesi ve iyi bir lise diploması ortalaması gerekebilir."
        }
      ]
    },
    {
      category: "Yardım, Destek ve Kaynaklar",
      items: [
        {
          question: "Yabancı veteriner hekimlere yardımcı olan AB destekli projeler var mıdır?",
          answer: "Evet, 'Nitelik Yoluyla Entegrasyon (IQ)' programı kapsamında Support4Vetmed ve Fit4Vetmed projeleri mevcuttur. Bu kurumlar ücretsiz bilgi, sınav hazırlığı ve staj desteği sunar."
        },
        {
          question: "Hangi kaynak kitaplar tavsiye edilir?",
          answer: "'Köpek ve Kedilerin Klinik Hekimliği' kitabı, Almanca-Türkçe Tıp Sözlüğü ve Veteriner Cerrahi Dikiş Teknikleri gibi kaynaklar tavsiye edilmiştir."
        }
      ]
    },
    {
      category: "Günlük Yaşam ve Hukuki İpuçları",
      items: [
        {
          question: "Almanya'da veteriner hekim ihtiyacı nasıldır?",
          answer: "Kayıtlı 10 milyon köpek ve çok sayıda evcil hayvan mevcuttur. Evcil hayvanların periyodik sağlık muayenesi zorunludur, bu da veteriner hekim ihtiyacını artırır."
        },
        {
          question: "Hiç hekimlik yapmamış birinin Almanya'da çalışma şansı nedir?",
          answer: "Mesleği hiç yapmayanlardan burada çalışabilmek için en az üç yıl tecrübe istendiği belirtilmiştir."
        },
        {
          question: "Almanya'ya vardıktan sonraki ilk resmi adımlar nelerdir?",
          answer: "Belediyeye ikamet kaydı yapılır, ardından Yabancılar Dairesi'ne oturum kartı için başvuru yapılır."
        },
        {
          question: "Bilgi ve destek grupları var mıdır?",
          answer: "Evet, Telegram üzerinde Anerkennung, Ev Arama, Vergi Beyanı gibi konularda dayanışma grupları mevcuttur."
        }
      ]
    },
    {
      category: "Etik ve Hukuki Sorumluluk",
      items: [
        {
          question: "Sosyal medya gruplarında tedavi tavsiyesi verilebilir mi?",
          answer: "Hayır, uzaktan tedavi yanıltıcı olabileceği ve hukuki yaptırımlara yol açabileceği için tedavi tavsiyesi verilmemelidir."
        },
        {
          question: "Gönüllü çalışma başvurusunda 'test' ediliyor muyuz?",
          answer: "Evet, bazı yerlerde şefin adayı test edebileceği belirtilmiştir."
        },
        {
          question: "Latince hastalık bilgisi staj yapmayı kolaylaştırır mı?",
          answer: "Evet, A2-B1 dil seviyesiyle bile, hastalık isimlerinin Latince olması avantajıyla staj (praktikum) yapılabilir."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Stethoscope className="w-12 h-12 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-accent/20 text-accent hover:bg-accent/30 border-0">
                  Sağlık & Tıp
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Yüksek Talep
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  15dk Okuma
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Veteriner Hekimliği
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                Almanya'da veteriner hekim olarak çalışmak isteyenler için denklik (Approbation), mesleki izin (Berufserlaubnis), vize süreçleri ve klinik yaşam rehberi.
              </p>
            </div>
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              <ProfessionVideoPlayer professionSlug="veteriner-hekimligi" variant="hero" />
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
              <Activity className="w-4 h-4 mr-2" />
              Teknik Bilgiler & Terimler
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
            
            <ProfessionVideoPlayer professionSlug="veteriner-hekimligi" />

            {/* Bölüm 1: Hazırlık */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  I. Almanya'ya Göç Hazırlığı ve Ön Şartlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">1. Dil Yeterliliği (Sprachkenntnisse)</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Almanya'da veteriner hekim olarak çalışabilmek için yasal asgari şart <strong>B2 Almanca</strong> sertifikasıdır. Ancak mesleki pratik ve tam denklik (Approbation) süreci için <strong>C1 seviyesi</strong> şiddetle tavsiye edilir.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                      <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Neden C1?</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>Tam Denklik (Approbation) başvurusu için genellikle şarttır.</li>
                        <li>Hasta sahipleriyle iletişimde B2 yetersiz kalabilir.</li>
                        <li>Tıbbi terminoloji (Medizinische Terminologie) hakimiyeti gerektirir.</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                      <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Önemli İpuçları</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>Normal dil kurslarında tıbbi terimler eksiktir, ek çalışma gerekir.</li>
                        <li>Gießen Üniversitesi gibi bazı yerlerde B2 ile başvuru kabul edilebilmektedir.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">2. Denklik ve Diploma Değerlendirme</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Almanya'da mesleği icra etmek için iki ana yol vardır: <strong>Mesleki İzin (Berufserlaubnis)</strong> ve <strong>Tam Denklik (Approbation)</strong>.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="zab">
                      <AccordionTrigger>Ön Değerlendirme (ZAB & Anabin)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Dil seviyeniz B1 iken bile Bonn'daki ZAB (Zentralstelle für ausländisches Bildungswesen) üzerinden diploma değerlendirmesi (Bewertung) yaptırabilirsiniz. Bu işlem 3-6 ay sürebilir.</p>
                        <p className="text-sm text-slate-500">Not: Anabin'de okulunuzun görünmemesi, denkliği olmadığı anlamına gelmez; daha önce başvuru yapılmamış olabilir.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="evrak">
                      <AccordionTrigger>Resmi Evrak Hazırlığı</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>Tüm belgeler Almanca tercümeli ve <strong>Apostilli</strong> olmalıdır.</li>
                          <li>Transkript ders kodları ile okul müfredatı uyumlu olmalıdır.</li>
                          <li>Ders içeriklerini detaylı gösteren belgeler okuldan temin edilmelidir.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="staj">
                      <AccordionTrigger>Adaptasyon ve Staj (Praktikum)</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Klinik tecrübesi olmayanlar veya ara verenler için gönüllü çalışmalar (Freiwillig/Ehrenamtlich) hayati önem taşır. Tierheim (Barınak) veya Tierkliniklerde staj yapmak iş bulmayı kolaylaştırır.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
                  Denklik (Approbation) ve iş başvuruları için hazırlamanız gereken temel belgeler.
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
                    "Dil Sertifikası (Sprachzertifikat - B2/C1)",
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
                  II. Vize Süreci ve Almanya'ya Varış
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Search className="w-4 h-4" /> İş Arama (Jobsuche)
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Veteriner hekim açığı yüksektir. Özellikle <strong>Pet Klinik</strong> alanında ve C1 seviyesinde olanlar için Köln, Münih gibi şehirlerde yüzlerce ilan bulunmaktadır.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm text-blue-800 dark:text-blue-300">
                      <strong>Tavsiye:</strong> Gıda sektöründe Approbation şartı daha katı olduğu için, başlangıçta kliniklerde iş bulmak daha kolaydır.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Vize Adımları
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li>İş sözleşmesi imzalanır.</li>
                      <li>İşveren, Veteriner Hekimler Odası'ndan (Veterinärkammer) ön onay alır.</li>
                      <li>Yabancılar Dairesi (Ausländerbehörde) onayı konsolosluğa bildirir.</li>
                      <li>Konsolosluk çalışma vizesini (Arbeitsvisum) verir.</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bölüm 3: Mesleki Yaşam */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-6 h-6 text-purple-500" />
                  III. Mesleki Yaşam: İzinler ve Kariyer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Berufserlaubnis vs Approbation */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-700 dark:text-purple-400">Mesleki İzin (Berufserlaubnis)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>• Geçici çalışma iznidir (2-4 yıl).</p>
                      <p>• Bir hekimin gözetiminde çalışmayı sağlar.</p>
                      <p>• Tam denklik (Approbation) sınavlarına hazırlanırken çalışarak tecrübe kazanmak için idealdir.</p>
                      <p>• Eyalet Tarım Bakanlığına başvurulur (Örn: NRW'de LANUV).</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-700 dark:text-green-400">Tam Denklik (Approbation)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>• Mesleğin kalıcı ve bağımsız icrası için şarttır.</p>
                      <p>• Klinik açmak veya memur olmak için gereklidir.</p>
                      <p>• <strong>Kenntnisprüfungen:</strong> Yaklaşık 10-15 dersten sınava girilmesi gerekir.</p>
                      <p>• Sınavlar sözlü yapılır ve üniversitelerde (Hannover, Berlin, Gießen vb.) gerçekleşir.</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Zorunlu Dersler Listesi */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <School className="w-5 h-5 text-slate-600" />
                    Zorunlu Hukuksal Fark Dersleri (Örnek)
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Denklik sürecinde genellikle şu derslerden sınava girilmesi istenir:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">1. Hayvan Yetiştiriciliği (Tierzucht)</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">2. Hayvan Refahı ve Etoloji</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">3. Hayvan Beslenmesi</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">4. Enfeksiyon Epidemiyolojisi</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">5. İlaç ve Narkotik Hukuku</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">6. Radyoloji</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">7. Gıda Bilimi ve Hijyeni</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">8. Et Hijyeni</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">9. Süt Bilimi</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">10. Adli Veteriner Hekimlik</div>
                  </div>
                </div>

                {/* Klinik Yaşamı */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Dog className="w-5 h-5 text-slate-600" />
                    Klinik Yaşamı ve Maaşlar
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span><strong>Maaş:</strong> Ortalama brüt maaş 3000-4500 Euro arasındadır. Tecrübeye göre artar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span><strong>Klinik Türleri:</strong> "Sadece Pet", "Büyükbaş" veya "Karma" klinikler mevcuttur. Resmi bir ayrım olmasa da hekimler uzmanlaşabilir.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span><strong>Kendi Kliniğini Açmak:</strong> Sadece Approbation sahibi olanlar klinik açabilir.</span>
                    </li>
                  </ul>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="w-6 h-6 text-blue-500" />
                  Temel Klinik Terimler (Deutsch - Türkisch)
                </CardTitle>
                <CardDescription>
                  Almanya'da klinikte en sık karşılaşacağınız temel tıbbi terimler.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400">
                      <tr>
                        <th className="px-6 py-3">Almanca Terim</th>
                        <th className="px-6 py-3">Türkçe Karşılığı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Besitzer', 'Sahip'],
                        ['Anamnese', 'Hasta hikayesi'],
                        ['Untersuchung', 'Muayene'],
                        ['Diagnose', 'Teşhis'],
                        ['Termin', 'Randevu'],
                        ['Rezept', 'Reçete'],
                        ['Medikament', 'İlaç'],
                        ['Impfung', 'Aşı'],
                        ['Infusion', 'Serum, İnfüzyon'],
                        ['Verband', 'Bandaj, Sargı'],
                        ['Wunde', 'Yara'],
                        ['Temperatur messen', 'Ateş ölçmek'],
                        ['Operation (OP)', 'Ameliyat'],
                        ['Narkose', 'Anestezi'],
                        ['Naht / nähen', 'Dikiş / Dikmek'],
                        ['Kastration', 'Kısırlaştırma'],
                        ['Blutbild', 'Kan tahlili'],
                        ['Notfall', 'Acil durum'],
                        ['Stethoskop', 'Steteskop'],
                        ['Röntgenbild', 'Röntgen çekimi'],
                        ['Ultraschall', 'Ultrason']
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Scissors className="w-6 h-6 text-red-500" />
                  Veteriner Sütür (Dikiş) Teknikleri
                </CardTitle>
                <CardDescription>
                  Almanca terminolojisiyle yaygın dikiş teknikleri.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Einfache Naht (Basit Sütür)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Sağdan sola yatay yerleştirilir; iğne, doku kenarından 2-5 mm uzaklıkta yaranın karşı tarafına sokulup birleştirilir.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Kreuznaht (Çapraz Sütür)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Basit sütürün bir düğümle bağlanmış hali olup, dokunun daha sıkı bağlanmasını sağlar.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Lembert Naht</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        İçi boş organları onarmak için tercih edilir. Sütür, lümene (iç boşluğa) girmeyecek şekilde ayarlanır.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Gambee Naht</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Bağırsak (Därme) onarımında tercih edilir. Mukoza çevrilmesini ve seroza yırtılmasını azaltır.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Kontinuierliche Naht (Devamlı)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Uzun insizyon bölgelerinde zaman kazanmak için kullanılır. Bir döngü gevşerse tüm iplik çözülebilir.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Ford Verschlussnaht</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Kilitleme tarzıyla atılır, dış müdahalelere karşı çok daha kuvvetlidir.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Yaygın Düğüm Teknikleri</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Quadratischer Knoten (Kare), Gleitknoten (Kayma), Chirurgischer Knoten (Cerrah) ve Subkutaner Knoten (Gömülü).
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
                Veteriner hekimliği denklik süreci ve çalışma hayatı hakkında en çok merak edilenler.
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
                        <AccordionTrigger className="text-left hover:no-underline py-4 text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
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
                  Almanya'daki veteriner hekimlerin deneyimleri
                </p>
              </div>
              <ShareExperienceDialog defaultProfessionName="Veteriner Hekim" />
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
                  <ShareExperienceDialog defaultProfessionName="Veteriner Hekim" />
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
            <DocumentSection professionSlug="veteriner-hekimligi" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
