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
  Car
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

export default function TaxiFahrerPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Taxi%,profession.ilike.%Taksi%,profession.ilike.%Fahrer%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Car className="w-12 h-12 text-yellow-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-100 hover:bg-yellow-500/30 border-0">
                  Ulaşım
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Yüksek Talep
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  10dk Okuma
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Taxi Fahrer (Taksi Şoförü)
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                Almanya'da taksi şoförlüğü (Taxi Fahrer) kariyeri, P-Schein alma süreci, Uber ve Mietwagen alternatifleri ve işveren olma (Unternehmer) rehberi.
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
            <TabsTrigger value="experiences" className="px-6 py-3 rounded-lg data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tecrübeler
              <Badge className="ml-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-100 border-0">
                {experiences.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="documents" className="px-6 py-3 rounded-lg data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">
              <FileText className="w-4 h-4 mr-2" />
              Belgeler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Introduction Card */}
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                      Bu rehber, kaynaklardaki bilgileri temel alarak, Taxi Şoförlüğü (Taxi Fahrer) mesleğine dair Almanya'daki kariyer ve yaşam sürecini, prosedürel akışa uygun, detaylı ve ansiklopedik bir formatta sunmaktadır.
                    </p>
                  </CardContent>
                </Card>

                {/* Accordion Content */}
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
                  
                  {/* Section 1: Mesleğe Yönelme */}
                  <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4" id="meslege-yonelme">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">Mesleğe Yönelme ve Temel Hazırlık</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">Kariyer alternatifleri ve yasal gereksinimler</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 space-y-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">Kariyer Alternatifleri ve Meslek Tanımı</h4>
                        <p>
                          Taksi şoförlüğü, Almanya'daki sürücülük kariyer seçeneklerinden sadece biridir. Bu mesleği düşünenlerin sadece sarı taksi (Taxi) olarak düşünmemesi tavsiye edilmektedir; bu belge (P-Schein) ile yapılabilecek diğer mantıklı işler şunlardır:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Hasta taşıma (Hasta taşıma firmaları şu anda yaygınlaşan firmalardır).</li>
                          <li>Havaalanına yolcu alma-bırakma.</li>
                          <li>Uber firmalarında çalışma.</li>
                        </ul>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mt-4 border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            <strong>Not:</strong> Şoförlük alternatifleri olarak, çalışma şartları ve maaşları taksi ve Uber'e göre daha iyi olan Otobüs Şoförlüğü (Bus Führerschein) ve Kamyon Şoförlüğü (LKW Führer) meslekleri de kaynaklarda anılmıştır.
                          </p>
                        </div>

                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">Şoförlük Yetki Belgesi Gereksinimleri (Yasal Zemin)</h4>
                        <p>
                          Taksi şoförlüğü yapabilmek için öncelikle standart B sınıfı ehliyete (B Führerschein) sahip olmak ve bunun üzerine <strong>Personenbeförderungsschein (P-Schein)</strong> alınması gerekmektedir. Bu belge halk arasında "Taksi Ehliyeti" veya "Sarı Kağıt" olarak da bilinir.
                        </p>
                        
                        <div className="mt-4 space-y-4">
                          <div className="border-l-2 border-blue-500 pl-4">
                            <h5 className="font-medium text-slate-900 dark:text-slate-100">1. Temel Ehliyet Süresi Şartı</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                              P-Schein almanın temel şartlarından biri, kişinin en az 2 yıldır Alman ehliyetine sahip olmasıdır.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-slate-600 dark:text-slate-300">
                              <li><strong>Ehliyet Değişimi Kuralı:</strong> Türkiye ehliyetini Almanya'da değiştirenler için 2 yıl kuralı konusunda farklı tecrübeler mevcuttur. Genel görüş, Alman ehliyetini aldığınız tarihten itibaren 2 yıl geçmesi gerektiği yönündedir.</li>
                              <li>Ancak bazı görüşlere göre, önceden Türk ehliyeti olan bir kişinin 2 sene beklemesine gerek olmayabilir (deneme süresi/Probezeit içinde sayılmayabilirler).</li>
                            </ul>
                          </div>
                          
                          <div className="border-l-2 border-blue-500 pl-4">
                            <h5 className="font-medium text-slate-900 dark:text-slate-100">2. Yaş ve İkamet Şartları</h5>
                            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-slate-600 dark:text-slate-300">
                              <li>Adayın en az 21 yaşında olması gerekmektedir.</li>
                              <li>Aufenthaltsgestattung (İkamet İzni) ile taksi ehliyeti alınabilir, ancak ehliyetin üzerinden iki yıl geçmiş olması gerekebilir.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 2: P-Schein Alma Süreci */}
                  <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4" id="p-schein-sureci">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">P-Schein Alma Süreci</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">Başvuru, sağlık testleri ve sınav durumu</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 space-y-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          P-Schein alma süreci, gerekli evrakların toplanması ve ilgili kurumlara başvuru yapılmasından oluşur. Taksi ruhsatı/ehliyeti (Taxi Schein) Belediyeden (Landratsamt) talep edilir. Başvuru, genellikle Trafik Dairesi'ne (Straßenverkehrsamt/Verkehrsamt) yapılır.
                        </p>

                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-4 mb-3">Gerekli Prosedür Adımları</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Öncelikle Doktor Raporu (Sağlık muayeneleri) alınır.</li>
                          <li>Belediyeden Führungszeugnis (Adli Sicil Kaydı) talep edilir.</li>
                          <li>Trafik Dairesi'ne (Verkehrsamt/Straßenverkehrsamt) başvurulur.</li>
                          <li>Gerekli evrakların listesi (Merkblatt) Zulassungstelle'den alınabilir.</li>
                        </ol>

                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">Sağlık ve Dikkat Testleri</h4>
                        <p>P-Schein için bir dizi zorunlu tıbbi muayene gereklidir:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>Refleks testi.</li>
                          <li>Göz testi (Renk testi dahil).</li>
                          <li>Kulak muayenesi.</li>
                          <li>Dikkat testi (Hız testi).</li>
                          <li>İdrar testi (Uyuşturucu kontrolü).</li>
                        </ul>

                        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg mt-4 border border-yellow-200 dark:border-yellow-800">
                          <h5 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Pratik İpuçları
                          </h5>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                            <li><strong>Doktor Bulma:</strong> Bütün muayeneleri tek bir yerde (Berufarzt / İş Güvenliği Klinikleri) yaptırmak daha ekonomiktir. Doctolib üzerinden "Verkehrsmedizin" araması yapılabilir.</li>
                            <li><strong>Maliyet:</strong> Toplam maliyet 200-300 Euro arasında değişebilir. Sağlık kısmı tek başına 150-230 Euro tutabilir.</li>
                            <li><strong>Jobcenter:</strong> Jobcenter'ı sürece karıştırmamak tavsiye edilir, aksi takdirde bu işi yapmanız zorunlu tutulabilir.</li>
                          </ul>
                        </div>

                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">Sınav Durumu</h4>
                        <p>
                          <strong>Güncel Durum:</strong> Şu anda P-Schein almak için genel bir sınav yoktur; adli sicil kaydı ve doktor raporu ile alınabilmektedir. Ancak eski sınav sisteminin geri gelebileceği yönünde duyumlar mevcuttur, bu nedenle sınavsız dönemde almak avantajlı olabilir.
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          <strong>İstisna:</strong> Normal "sarı taksilerde" çalışılırsa, çalışılan şehrin taksi merkezi yerel bilgi sınavı yapabilir (örneğin Neuss yapıyor, Düsseldorf yapmıyor).
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 3: İş Hayatı ve Kazanç */}
                  <AccordionItem value="item-3" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4" id="is-hayati">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">İş Hayatına Giriş ve Kazanç</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">Çalışma şartları, Uber ve Mietwagen</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 space-y-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">Taksi Şoförlüğü (Taxi Fahrer)</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Çalışma Süresi:</strong> Genelde 12 saatlik vardiyalar, haftada 5 gün, günlük 9-10 saat aktif çalışma.</li>
                          <li><strong>Kazanç Modeli:</strong> Genellikle ciro üzerinden yüzde (ortalama %40) alınır.</li>
                          <li><strong>Gelir:</strong> Steuer Klasse 3 ile haftada 5 gün çalışan bir şoförün net kazancı ortalama 1800 Euro civarındadır. Hamburg gibi bölgelerde daha yüksek rakamlar telaffuz edilse de, genel olarak tek başına bir aileyi geçindirmek zor olabilir.</li>
                        </ul>

                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">Uber ve Mietwagen</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Uber, Almanya'nın bazı büyük şehirlerinde mevcuttur (Stuttgart'ta yok).</li>
                          <li>Kendi aracınızla Uber yapmak için <strong>Taxi Unternehmer</strong> belgesi gerekir. Şoför olarak çalışmak için P-Schein yeterlidir.</li>
                          <li><strong>Kazanç:</strong> Kendi işini yapan (Unternehmer) biri için 6 gün çalışma ile 8000 Euro cirodan geriye brüt 3600 Euro kalabilir. Şoför olarak kazanç, bölgeye ve çalışma saatlerine göre değişir.</li>
                        </ul>

                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg mt-4 border border-green-200 dark:border-green-800">
                          <p className="text-sm text-green-800 dark:text-green-300">
                            <strong>İş Arama:</strong> İş ilanları Vollzeit, Teilzeit veya Minijob olarak bulunabilir. Düsseldorf ve Neuss civarında Uber şoförü arayan işverenler mevcuttur.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 4: İşveren Olma (Unternehmer) */}
                  <AccordionItem value="item-4" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4" id="unternehmer">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">İşveren Olma Yolu (Taxi Unternehmer)</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">Kendi işini kurmak isteyenler için</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 space-y-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          Taksi veya kiralık araç (Mietwagen) firması kurmak isteyenler için gerekli olan belge <strong>Taxi-Mietwagen Unternehmer</strong> belgesidir.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-3">
                          <li><strong>Sınav Kurumu:</strong> IHK (Industrie- und Handelskammer).</li>
                          <li><strong>Sınav Konusu:</strong> "Führung eines Taxi- oder Mietwagenunternehmens".</li>
                          <li><strong>Zorluk Derecesi:</strong> Sınavın zor olduğu, yazılı ve sözlü aşamalardan oluştuğu belirtilmektedir. Hazır soru havuzu yoktur.</li>
                          <li><strong>Randevu:</strong> IHK sınav randevuları 6 ay sonrasına verilebilmektedir.</li>
                        </ul>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                          Alternatif olarak, Unternehmer belgesi olan birine aylık ödeme yapılarak bu belge kiralanabilir/kullanılabilir.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 5: Ek Bilgiler */}
                  <AccordionItem value="item-5" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4" id="ek-bilgiler">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">Ek Bilgiler ve Yaşam İpuçları</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">Sigorta, ehliyet tanınması ve diğer konular</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 space-y-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">Finans ve Sigorta</h4>
                        <p>
                          İlk araba alımında sigorta için Huk24 önerilmektedir. İnternetten sigorta yapmanın büroya göre daha uygun olduğu belirtilmiştir.
                        </p>

                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">Türkiye Ehliyetinin Tanınması</h4>
                        <p>
                          1 Ocak 2024 tarihinden itibaren geçerli olan düzenlemeye göre, Türkiye ehliyetleri belirli şartlar altında Almanya'da sınavsız olarak geçerli sayılabilmektedir veya çevrilebilmektedir.
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                          <li>T.C. İçişleri Bakanlığı tarafından verilmiş olması.</li>
                          <li>Uluslararası sürücü belgesine çevrilmiş olması (bazı durumlarda).</li>
                          <li>Almanya'da yasal ikamet.</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>

                {/* FAQ Section */}
                <section id="sss" className="scroll-mt-24 mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sıkça Sorulan Sorular</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {/* 1. P-Schein Alma Şartları */}
                    <AccordionItem value="faq-1" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        1. P-Schein (Personenbeförderungsschein) Alma Şartları
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">P-Schein alabilmek için kaç yıllık Alman ehliyetine sahip olmak gerekir?</h4>
                            <p className="text-slate-600 dark:text-slate-300">P-Schein almanın temel şartlarından biri, kişinin en az 2 yıldır Alman ehliyetine (B Führerschein) sahip olmasıdır.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Türkiye'den ehliyeti olan ve burada değişim yapan kişiler de 2 yıl kuralına takılıyor mu?</h4>
                            <p className="text-slate-600 dark:text-slate-300 mb-2">Bu konuda tecrübeler çelişkilidir:</p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                              <li>Bir görüşe göre, Alman ehliyetini ne zaman aldıysanız, üzerine 2 yıl geçmesi gerekmektedir.</li>
                              <li>Başka bir tecrübeye göre, eski ehliyet sahibi olanlar için 2 sene beklemesine gerek yoktur.</li>
                              <li><strong>Yaygın tecrübe:</strong> Türk ehliyetinin eski olmasının önemi yoktur, Almanya'da çevirdiğiniz tarihten itibaren 2 yılın geçmesi gerekmektedir.</li>
                            </ul>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">P-Schein almak için asgari yaş şartı nedir?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Adayın en az 21 yaşında olması gerekmektedir.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Aufenthaltsgestattung (İkamet İzni) ile taksi ehliyeti alınabilir mi?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Eğer temel ehliyet (B sınıfı) alındıysa ve iki yıl geçtiyse P-Schein alınabileceği yönünde görüşler mevcuttur.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 2. P-Schein Prosedürü ve Maliyeti */}
                    <AccordionItem value="faq-2" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        2. P-Schein Prosedürü ve Maliyeti
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Taksi ehliyeti (P-Schein) nereden alınır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Belediyeden (Landratsamt) talep edilir. Başvurular Trafik Dairesi'ne (Straßenverkehrsamt/Verkehrsamt) yapılır.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Gerekli temel evraklar nelerdir?</h4>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                              <li>Doktor Raporu (Sağlık muayeneleri)</li>
                              <li>Adli Sicil Kaydı (Führungszeugnis)</li>
                            </ul>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Maliyeti ne kadardır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Yaklaşık 200-300 Euro arasındadır. En pahalı kısım sağlık muayeneleridir (150-230 Euro).</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Jobcenter karşılar mı?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Genellikle tavsiye edilmez, çünkü zorunlu iş teklifleri gelebilir. Ancak motivasyon mektubu ile ikna edilebilir.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 3. Sağlık Muayeneleri ve Sınav Durumu */}
                    <AccordionItem value="faq-3" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        3. Sağlık Muayeneleri ve Sınav Durumu
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Hangi tıbbi kontroller yapılır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Göz, renk testi, kulak, refleks, dikkat (hız) ve idrar (uyuşturucu) testleri yapılır.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Testler nerede yapılır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">İş Güvenliği Kliniklerinde (Berufarzt) toplu olarak yaptırılması tavsiye edilir. TÜV refleks testi yapmaz.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Şu anda sınav var mı?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Şu anda genel bir sınav yoktur, sadece belgelerle alınır. Ancak sınavın geri geleceği yönünde duyumlar vardır.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 4. Çalışma Şekilleri ve Kazanç */}
                    <AccordionItem value="faq-4" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        4. Çalışma Şekilleri ve Kazanç
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Ödeme modeli nasıldır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Genellikle ciro üzerinden yüzde (ort. %40) alınır. Şoför gidere karışmaz.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Ortalama kazanç nedir?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Tam zamanlı (Steuer Klasse 3) bir şoför ortalama 1800 Euro net kazanabilir.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Uber işletmecisi (Unternehmer) ne kadar kazanır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">6 gün çalışma ile 8000 Euro cirodan brüt 3600 Euro kalabilir (tecrübe).</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 5. İşveren Olma (Unternehmer) */}
                    <AccordionItem value="faq-5" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        5. İşveren Olma Süreci
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Hangi belge gereklidir?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Taxi-Mietwagen Unternehmer belgesi gereklidir.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Sınav zor mudur?</h4>
                            <p className="text-slate-600 dark:text-slate-300">IHK sınavının zor olduğu, yazılı ve sözlü aşamalardan oluştuğu belirtilmektedir.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Belge satın alınabilir mi?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Belgesi olan birine aylık ödeme yapılarak (kiralama yöntemiyle) iş yapılabilir.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 6. Alternatifler ve Uber */}
                    <AccordionItem value="faq-6" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        6. Mesleki Alternatifler ve Uber
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">P-Schein ile başka ne iş yapılır?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Hasta taşıma, havaalanı transferi ve Uber şoförlüğü yapılabilir.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Kendi aracımla Uber yapabilir miyim?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Hayır, kendi aracınızla yapmak için Unternehmer belgesi gerekir. P-Schein ile sadece şoför olarak çalışabilirsiniz.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 7. Genel Konular */}
                    <AccordionItem value="faq-7" className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 font-semibold text-lg">
                        7. Genel Hukuki ve Yaşamsal Konular
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Türkiye ehliyeti sınavsız geçerli mi?</h4>
                            <p className="text-slate-600 dark:text-slate-300">1 Ocak 2024 düzenlemesiyle, belirli şartlar altında (geçerli ehliyet, ikamet vb.) sınavsız çevrilebilmektedir.</p>
                          </div>
                          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Sigorta önerisi nedir?</h4>
                            <p className="text-slate-600 dark:text-slate-300">Huk24 önerilmektedir. İnternetten sigorta yapmak genellikle daha uygundur.</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Bu Sayfada</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <Link href="#meslege-yonelme" className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-600">
                        Mesleğe Yönelme
                      </Link>
                      <Link href="#p-schein-sureci" className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-600">
                        P-Schein Süreci
                      </Link>
                      <Link href="#is-hayati" className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-600">
                        İş Hayatı ve Kazanç
                      </Link>
                      <Link href="#unternehmer" className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-600">
                        İşveren Olma
                      </Link>
                      <Link href="#ek-bilgiler" className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-600">
                        Ek Bilgiler
                      </Link>
                      <Link href="#sss" className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-600">
                        Sıkça Sorulan Sorular
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-600 text-white border-0">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">Tecrübeni Paylaş</h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Bu alanda çalışıyorsan veya deneyimlerin varsa, topluluğa katkıda bulunabilirsin.
                    </p>
                    <ShareExperienceDialog defaultProfessionName="Taxi Fahrer" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <Card key={exp.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">{exp.title}</CardTitle>
                        <CardDescription>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</CardDescription>
                      </div>
                      <Badge>{exp.profession}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-4">
                      {exp.content}
                    </p>
                    <Button variant="link" className="px-0 mt-2 text-blue-600">
                      Devamını Oku <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {experiences.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Henüz tecrübe paylaşılmamış</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Bu meslekle ilgili ilk tecrübeyi sen paylaşabilirsin.
                  </p>
                  <ShareExperienceDialog defaultProfessionName="Taxi Fahrer" />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentSection professionSlug="taxi-fahrer" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
