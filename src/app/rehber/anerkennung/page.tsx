'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, FileText, Building2, GraduationCap, Briefcase, Info, HelpCircle, Lightbulb, PlayCircle, Euro, Languages, Scale } from 'lucide-react';
import { DocumentSection } from '@/components/document-section';

export default function AnerkennungPage() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Rehber</Badge>
            <Badge variant="outline" className="text-slate-600">Resmi İşlemler</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Almanya Kariyer ve Yaşam Rehberi: Kapsamlı Mesleki Tanınma (Anerkennung) Yol Haritası
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Bu rehber, Türkiye'deki mesleki yeterliliklerini Almanya'da tanıtmak isteyen kişilere yönelik olup, kaynaklardaki yasal düzenlemelerden, prosedür adımlarından ve detaylı pratik tecrübe paylaşımlarından sentezlenmiştir.
          </p>
        </div>

        {/* NotebookLM Video Section */}
        <Card className="mb-8 border-indigo-200 dark:border-indigo-800 overflow-hidden">
          <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-800/50">
            <CardTitle className="flex items-center gap-2 text-xl text-indigo-900 dark:text-indigo-100">
              <PlayCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Yapay Zeka ile Hazırlanmış Özet (NotebookLM)
            </CardTitle>
            <CardDescription className="text-indigo-700 dark:text-indigo-300">
              Bu rehberin içeriği hakkında yapay zeka tarafından hazırlanmış sesli/görüntülü özeti dinleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video w-full bg-slate-900 relative">
              <iframe 
                src="https://www.youtube.com/embed/q0iYNSlDvCM" 
                title="Anerkennung Süreci - NotebookLM Özeti"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <DocumentSection professionSlug="anerkennung" />

        <div className="grid gap-8">
          
          {/* I. Almanya'ya Göç ve Adaptasyon Sürecine Giriş */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700 dark:text-indigo-400">
                <Info className="w-6 h-6" />
                I. Almanya'ya Göç ve Adaptasyon Sürecine Giriş (Hazırlık ve Temel Kavramlar)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Temel Denklik Kavramları
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Almanya'da mesleki denklik süreci iki ana başlık altında ilerler:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">A. Diploma Değerlendirmesi (Zeugnisbewertung)</h4>
                    <p className="text-sm mb-3">Bonn'da bulunan Yabancı Eğitim Merkezi Ofisi (ZAB) tarafından yürütülür.</p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                      <li><strong>Tanımı:</strong> Yabancı bir üniversite yeterliliğini tanımlayan resmi belgedir.</li>
                      <li><strong>Amacı:</strong> Alman işgücü piyasasına erişimi kolaylaştırır. Lisans, Master, Doktora mezuniyetini kanıtlar.</li>
                      <li><strong>Niteliği:</strong> Karşılaştırmalı bir sınıflandırmadır, mesleki tanıma (Anerkennung) değildir.</li>
                      <li><strong>Doktora:</strong> Tüm eğitim kariyerini (Lisans, Master, Doktora) kapsayan belgeler Bonn'a gönderilmelidir.</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">B. Mesleki Tanınma (Berufliche Anerkennung)</h4>
                    <p className="text-sm mb-3">Bireyin kendi mesleğini Almanya'da yapıp yapamayacağını belirleyen süreçtir.</p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                      <li><strong>Tanımı:</strong> Mesleği hangi şartlar dahilinde yapabileceğinizin 3-4 sayfalık değerlendirmesidir.</li>
                      <li><strong>Yetkili Kurumlar:</strong> Eyaletlerdeki Meslek Odaları veya ilgili kurumlar (örn. Lehrkräfteakademie).</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Düzenlenmiş ve Düzenlenmemiş Meslekler
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-700 dark:text-amber-400">Düzenlenmiş Meslekler (Reglementiert)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Tanınma (Anerkennung) olmadan çalışmak mümkün değildir.
                        <br/><strong>Örnekler:</strong> Sağlıkçılar (Hekim, Dişçi, Hemşire), Öğretmenlik, Mimarlık, Mühendislik.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400">Düzenlenmemiş Meslekler (Nicht Reglementierter Beruf)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Tanınmaya gerek yoktur; doğrudan iş aranabilir. Ancak ZAB değerlendirmesi iş başvurularında önemlidir.
                        <br/><strong>Örnekler:</strong> Bilgisayar Bilimci, Ekonomist, Siyaset Bilimci, Kimyager.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* II. Gerekli Evrakların Temini ve Hazırlanması */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700 dark:text-indigo-400">
                <FileText className="w-6 h-6" />
                II. Gerekli Evrakların Temini ve Hazırlanması (Hazırlık Aşaması)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="uni-docs">
                  <AccordionTrigger className="text-lg font-semibold">1. Üniversite ve Yükseköğretim Belgeleri</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-slate-600 dark:text-slate-300">
                    <p>Lisans, Master, Doktora diplomaları ve transkriptlerinin tamamı ZAB'a gönderilmelidir.</p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-100 dark:border-yellow-800">
                      <h5 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Pratik İpuçları: Eksik Transkript
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>E-Devlet:</strong> Barkodlu belge bazen kabul edilse de, resmi onay (Beglaubigung) için sorun olabilir.</li>
                        <li><strong>Mail Yoluyla:</strong> Üniversiteden mail ile istenip, gelen maili doğrudan ZAB'a iletmek (önceden görüşerek) kabul edilebilir.</li>
                        <li><strong>Geçici Mezuniyet:</strong> Geçici belge ile işlem yaptıranlar olmuştur.</li>
                        <li><strong>Not:</strong> ZAB'a sadece akademik diplomalar gönderilir, sertifikalar değil.</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="high-school">
                  <AccordionTrigger className="text-lg font-semibold">2. Lise Diploması ve Transkripti</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-slate-600 dark:text-slate-300">
                    <p>Lise diploması veya kayıt örneğinin Türkçesinin fotokopisi ZAB başvurusu için gereklidir.</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Temin:</strong> Mezun olunan liseden "DIPLOMA KAYIT ÖRNEĞİ" alınabilir. Yakınlarınız dilekçe ile alabilir.</li>
                      <li><strong>E-Devlet:</strong> İmzasız olduğu için sorun çıkabilir, okuldan almak daha garantidir.</li>
                      <li><strong>Transkript:</strong> 2007 sonrası e-okuldan, öncesi okul arşivinden (kütük defteri) alınabilir.</li>
                      <li><strong>Ausbildung İçin:</strong> Üniversite diplomanız olsa bile, Ausbildung için lise denkliği (Schulamt) gerekebilir.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="experience">
                  <AccordionTrigger className="text-lg font-semibold">3. Hizmet ve İş Deneyimi Belgeleri</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-slate-600 dark:text-slate-300">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Öğretmenlik:</strong> Hizmet cetvelinin (Hitap) tercümesi gerekir. "Asalet tasdiki" adaylığın kalkması olarak kabul edilir.</li>
                      <li><strong>Özel Okul:</strong> Hizmet cetvelindeki "adaylık kaldırıldı" notu kabul edilebilir.</li>
                      <li><strong>TC Kimlik Hatası:</strong> Belgelerde TC no hatası varsa, resmi kuruma açıklama yapılması gerekebilir.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </CardContent>
          </Card>

          {/* III. Almanya'ya Varış ve Resmi Sürecin Başlatılması */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700 dark:text-indigo-400">
                <Building2 className="w-6 h-6" />
                III. Almanya'ya Varış ve Resmi Sürecin Başlatılması
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Jobcenter & Agentur
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>İlk adım Job Center kariyer danışmanından randevu almaktır. Sizi Agentur für Arbeit'taki Anerkennungsberater'a yönlendirir.</p>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-xs text-blue-800 dark:text-blue-300">
                      <strong>İpucu:</strong> Görüşmeye orijinal evraklarla gidin. Rapora "C1-C2 dil seviyesi gereklidir" ve "Hem ZAB hem Meslek Kurumuna gönderilmeli" ibarelerini yazdırın.
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Euro className="w-5 h-5 text-green-600" />
                      Maliyetler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>ZAB ücreti (200€) ve tercüme masraflarını Job Center karşılar. Ancak işlemden <strong>önce</strong> onay almalısınız.</p>
                    <p>ZAB'dan gelen ödeme mailini (Gebührenbescheid) Job Center'a ileterek ödemeyi onların yapmasını sağlayın.</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      Dr. Unvanı
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Doktora (Dr. Titel) unvanınızı kimlik ve ehliyete yazdırabilirsiniz. Bunun yasal zemini mevcuttur.</p>
                  </CardContent>
                </Card>
              </div>

            </CardContent>
          </Card>

          {/* IV. Diploma Değerlendirme Süreci: ZAB */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700 dark:text-indigo-400">
                <Scale className="w-6 h-6" />
                IV. Diploma Değerlendirme Süreci: ZAB Başvurusu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Başvuru Adımları</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 ml-2">
                  <li>Bonn'daki Kultusminister Konferenz sitesinden elektronik form doldurulur, çıktısı alınıp imzalanır.</li>
                  <li>BUND ID web sitesinde hesap açılır (Online işlemler için gereklidir).</li>
                  <li>Ödeme belgesi (Gebührenbescheid) sistemden takip edilir.</li>
                </ol>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">Gönderilecek Evraklar (Amtliche Beglaubigung - Resmi Onaylı)</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> İmzalı Başvuru Formu</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Lise Diploması (Türkçe fotokopi)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Üniversite Diplomaları ve Transkriptler (Tercüme + Onaylı)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Kimlik/Pasaport Fotokopisi</li>
                  </ul>
                </div>

                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Tercüme ve Onay (Beglaubigung) Hakkında</AlertTitle>
                  <AlertDescription className="text-sm mt-1">
                    <p className="mb-2"><strong>Tercüme:</strong> ZAB normalde Türkçe/İngilizce belgeler için Almanca tercüme istemez. Ancak Job Center isteyebilir veya ileride lazım olabilir diye yaptırmak avantajlıdır.</p>
                    <p><strong>Beglaubigung:</strong> Belediyeler, noterler veya kiliseler yapar. Tercüme + Türkçe fotokopi birlikte zımbalanıp onaylanmalıdır. Sadece tercümeyi onaylatmak yanlıştır.</p>
                  </AlertDescription>
                </Alert>
              </div>

            </CardContent>
          </Card>

          {/* V. Mesleki Tanınma (Berufliche Anerkennung) Süreci */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700 dark:text-indigo-400">
                <Briefcase className="w-6 h-6" />
                V. Mesleki Tanınma (Berufliche Anerkennung) Süreci
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="teachers">
                  <AccordionTrigger className="text-lg font-semibold text-blue-700 dark:text-blue-400">1. Öğretmenlik (Lehrkraft)</AccordionTrigger>
                  <AccordionContent className="space-y-4 text-slate-600 dark:text-slate-300">
                    <p>Öğretmenlik düzenlenmiş bir meslektir. Eyaletinizdeki <strong>Lehrkräfteakademie</strong>'ye başvurmalısınız.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded border">
                        <h5 className="font-semibold mb-2">Tipik Şartlar ve Eksiklikler</h5>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li><strong>Hausarbeit:</strong> Master/Doktora tezi sayılabilir.</li>
                          <li><strong>İkinci Branş:</strong> Transkriptteki yan derslerle (sosyoloji, psikoloji vb.) tamamlanabilir.</li>
                          <li><strong>Stajyerlik (Referendariat):</strong> Türkiye'deki hizmet cetveli (adaylığın kalkması) ile muafiyet istenebilir.</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded border">
                        <h5 className="font-semibold mb-2">Dil Şartı ve Tavsiye</h5>
                        <p className="text-sm mb-2">Genellikle C2 istenir (NRW'de başvuru için şarttır). Ancak bazı programlar B1/B2 ile kabul edebilir.</p>
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Tavsiye: Diliniz yetersiz olsa bile resmi işlemleri başlatıp hakkınızı "cebe koyun".</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="erzieher">
                  <AccordionTrigger className="text-lg font-semibold text-green-700 dark:text-green-400">2. Çocuk Bakımcısı (Erzieher/in) ve Sosyal Meslekler</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-slate-600 dark:text-slate-300">
                    <p>Erzieher olmak için 3 yıl Ausbildung gerekir (Teilzeit veya Vollzeit).</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Dil:</strong> Genellikle B2 istenir, son zamanlarda C1 talep edilebilmektedir.</li>
                      <li><strong>Staj:</strong> En az 3 ay tam zamanlı staj (Praktikum) şartı vardır. Gönüllü staj ile başlanabilir.</li>
                      <li><strong>İpucu:</strong> Okul öncesi öğretmenliği diploması çevirilerinde "Vorschullehramt" veya "Vorschulpädagogik" kullanılabilir.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="others">
                  <AccordionTrigger className="text-lg font-semibold text-purple-700 dark:text-purple-400">3. Sağlıkçılar, Mühendisler ve Diğerleri</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-slate-600 dark:text-slate-300">
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Sağlıkçılar:</strong> Eyalet Tabipler Odası (Landesärztekammer) veya ilgili kuruma başvurmalıdır.</li>
                      <li><strong>Mühendisler:</strong> Mühendisler Odası (Ingenieurkammer) yetkilidir.</li>
                      <li><strong>Muhasebe:</strong> IHK FOSA (Nürnberg) kurumuna başvurulur.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </CardContent>
          </Card>

          {/* VI. Kariyer ve Yaşamda İleri Adımlar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700 dark:text-indigo-400">
                <Lightbulb className="w-6 h-6" />
                VI. Kariyer ve Yaşamda İleri Adımlar (Ek Bilgiler)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">İşsizlik Parası II (Bürgergeld) ve Haklar</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  İş arayanların temel ihtiyaçlarını karşılamak içindir. Çalışabilir durumda olanlar alır.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border text-sm">
                    <strong>İhtiyaç Birliği (Bedarfsgemeinschaft):</strong> Aynı hanede yaşayan aile bireylerinin gelirleri toplu değerlendirilir.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border text-sm">
                    <strong>Konut ve Isınma:</strong> Jobcenter makul giderleri karşılar. Yeni sözleşme öncesi onay şarttır.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border text-sm">
                    <strong>Yaptırımlar:</strong> İşbirliği yapmamak, randevuya gitmemek kesintiye (Sanktion) yol açar.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border text-sm">
                    <strong>Dil Eğitimi:</strong> Raporda C1-C2 hedefi belirtilirse, Job Center bu kursları finanse eder.
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Analojik Özet */}
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 border-indigo-100 dark:border-indigo-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-indigo-800 dark:text-indigo-300">
                <HelpCircle className="w-6 h-6" />
                Analojik Özet: Sistemin Çalışma Prensibi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Almanya'daki Anerkennung süreci, uluslararası bir malı yerel bir pazara sokmaya benzer. 
                <strong> ZAB (Bonn)</strong> değerlendirmesi, malınızın (diplomanızın) kalitesini ve uluslararası standartlara göre hangi kategoriye (Lisans/Master) girdiğini belirleyen bir <strong>"kalite kontrol raporudur"</strong>. 
                Bu rapor, malın piyasaya genel girişini kolaylaştırır.
              </p>
              <p className="mt-4">
                Ancak, <strong>Mesleki Tanınma (Berufliche Anerkennung)</strong> ise, eğer malınız yasal olarak düzenlenmiş bir ürünse (örneğin ilaç/öğretmenlik), yerel otoritelerden o malı burada kullanıp kullanamayacağınız veya hangi ek etiket/sertifikaları (İkinci Branş, C2 Dil) almanız gerektiğini belirten zorunlu <strong>"pazarlama iznini"</strong> almaktır.
              </p>
              <p className="mt-4 font-medium">
                Başlangıçta Jobcenter ile doğru iletişim kurmak ve maliyet onaylarını almak, bu sürecin "finansal lojistiğini" sorunsuz halletmenin anahtarıdır.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
