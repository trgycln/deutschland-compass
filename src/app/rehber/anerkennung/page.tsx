'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, FileText, Building2, GraduationCap, Briefcase, Info, HelpCircle, Lightbulb, PlayCircle, Download, Eye } from 'lucide-react';

export default function AnerkennungPage() {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDocuments() {
      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('profession_slug', 'anerkennung')
        .eq('status', 'approved')
        .order('created_at', { ascending: true });
      
      if (data) setDocuments(data);
    }
    fetchDocuments();
  }, []);

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
            Almanya'da Mesleki Denklik (Anerkennung) Süreci
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Türkiye'deki mesleki yeterliliklerinizi Almanya'da tanıtmak için izlemeniz gereken detaylı yol haritası.
            Öğretmenlik, mühendislik, sağlık ve diğer meslekler için adım adım rehber.
          </p>
        </div>

        {/* Introduction Alert */}
        <Alert className="mb-8 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">Önemli Bilgilendirme</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400 mt-2">
            Bu rehber, Almanya'ya yeni gelen ve mesleki yeterliliklerini tanıtmak isteyen kişiler için hazırlanmıştır. 
            Süreç iki ana başlıkta ilerler: <strong>Diploma Değerlendirmesi (Zeugnisbewertung)</strong> ve <strong>Mesleki Tanınma (Berufliche Anerkennung)</strong>.
          </AlertDescription>
        </Alert>

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
        {documents.length > 0 && (
          <Card className="mb-8 border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-800/50">
              <CardTitle className="flex items-center gap-2 text-xl text-blue-900 dark:text-blue-100">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Faydalı Dökümanlar ve Örnekler
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Denklik süreciyle ilgili resmi formlar, dilekçe örnekleri ve rehber dökümanlar.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-start justify-between p-4 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1" title={doc.title}>
                          {doc.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                          {doc.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                          <span>{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>
                          <span>•</span>
                          <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-500 hover:text-blue-600">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" title="Görüntüle">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-500 hover:text-blue-600">
                        <a href={doc.url} download title="İndir">
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-8">
          
          {/* Section 1: Temel Kavramlar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-indigo-500" />
                1. Temel Kavramlar ve Farklar
              </CardTitle>
              <CardDescription>
                ZAB ve Mesleki Tanınma arasındaki farkları anlamak sürecin en önemli adımıdır.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-400">Zeugnisbewertung (Diploma Değerlendirmesi)</h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex gap-2"><Building2 className="w-4 h-4 shrink-0" /> <strong>Kurum:</strong> ZAB (Bonn)</li>
                    <li className="flex gap-2"><Info className="w-4 h-4 shrink-0" /> <strong>Amaç:</strong> Yükseköğretim yeterliliğinin resmi tanımı.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> <strong>Önemi:</strong> İşgücü piyasasına erişimi kolaylaştırır.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-400">Berufliche Anerkennung (Mesleki Tanınma)</h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex gap-2"><Building2 className="w-4 h-4 shrink-0" /> <strong>Kurum:</strong> Eyalet Meslek Odaları</li>
                    <li className="flex gap-2"><Info className="w-4 h-4 shrink-0" /> <strong>Amaç:</strong> Mesleğin icra edilebilirliği onayı.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> <strong>Önemi:</strong> Düzenlenmiş meslekler için zorunludur.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-100 dark:border-yellow-900/50">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Düzenlenmiş vs Düzenlenmemiş Meslekler
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="block text-slate-900 dark:text-slate-200">Düzenlenmiş (Reglementiert):</strong>
                    <p className="text-slate-700 dark:text-slate-400">Tanınma olmadan çalışılamaz. (Örn: Doktor, Öğretmen, Mühendis, Mimar)</p>
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-slate-200">Düzenlenmemiş (Nicht Reglementiert):</strong>
                    <p className="text-slate-700 dark:text-slate-400">Tanınma şart değildir ama ZAB belgesi avantaj sağlar. (Örn: Bilgisayar Müh., Ekonomist)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: İşlemlere Başlama */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Briefcase className="w-6 h-6 text-blue-500" />
                2. İşlemlere Başlama (Jobcenter/Agentur)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Agentur für Arbeit Görüşmesi ve Rapor</AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300 space-y-3">
                    <p>Sürecin ilk adımı Job Center kariyer danışmanınızdan randevu almaktır. Sizi <strong>Anerkennungsberater</strong>'a (Tanınma Danışmanı) yönlendirecektir.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Hazırlık:</strong> Orijinal diploma ve transkriptlerinizi yanınızda bulundurun.</li>
                      <li><strong>Rapor:</strong> Danışman size bir rapor verecektir. Bu raporu Job Center danışmanınıza teslim etmelisiniz.</li>
                      <li><strong>Dil Seviyesi:</strong> Rapora C1-C2 seviyesinde dile ihtiyacınız olduğunu yazdırın. Bu, dil kursu desteği almanızı kolaylaştırır.</li>
                      <li><strong>ZAB Onayı:</strong> Raporun hem ZAB (Bonn) hem de meslek odası başvurusunu kapsadığından emin olun.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Ücret ve Masraflar</AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    <p>ZAB başvuru ücreti <strong>200 Euro</strong>'dur. Agentur für Arbeit veya Job Center, onay alındıktan sonra bu ücreti ve tercüme masraflarını karşılayabilir.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Section 3: ZAB Başvurusu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <GraduationCap className="w-6 h-6 text-green-600" />
                3. ZAB (Bonn) Başvurusu
              </CardTitle>
              <CardDescription>
                Lisans, Yüksek Lisans ve Doktora diplomalarının değerlendirilmesi süreci.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Başvuru Adımları</h3>
                <ol className="list-decimal pl-5 space-y-3 text-slate-700 dark:text-slate-300">
                  <li><strong>Online Form:</strong> "Kultusminister Konferenz" sitesinden form doldurulur, çıktısı alınıp imzalanır.</li>
                  <li>
                    <strong>Evrak Hazırlığı (Beglaubigung):</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li>Diploma ve Transkriptlerin tercümelerinin onaylı nüshaları.</li>
                      <li>Türkçe/İngilizce belgeler için Almanca tercüme şart olmayabilir (ZAB kabul eder) ancak yerel makamlar isteyebilir.</li>
                      <li>Lise diploması fotokopisi.</li>
                      <li>Pasaport, Kimlik ve Yeşil Belge fotokopileri.</li>
                    </ul>
                  </li>
                  <li><strong>Gönderim:</strong> Belgeler posta yoluyla Bonn'a gönderilir. Asla orijinal belge göndermeyin!</li>
                </ol>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">İpuçları</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>Beglaubigung:</strong> Belediyeler (Rathaus) genellikle noterden daha ekonomiktir.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>Lise Diploması:</strong> Aslı yoksa E-Devlet barkodlu belge veya okuldan "Kayıt Örneği" alınabilir.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>Süre:</strong> Sonuçlar genellikle 4-6 ay içinde gelir.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Mesleki Tanınma */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="w-6 h-6 text-purple-600" />
                4. Mesleki Tanınma (Berufliche Anerkennung)
              </CardTitle>
              <CardDescription>
                Eyalet bazlı meslek odaları tarafından yapılan inceleme.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="teaching">
                  <AccordionTrigger className="text-lg font-semibold">Öğretmenlik (Lehrkraft)</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-300">
                      Öğretmenler, bulundukları eyaletteki <strong>Lehrkräfteakademie</strong>'ye başvurmalıdır (Örn: Hessen'de Giessen, NRW'de Detmold).
                    </p>
                    <div className="space-y-2">
                      <strong className="block">Sık Karşılaşılan Eksiklikler ve Şartlar:</strong>
                      <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        <li><strong>Hausarbeit:</strong> Bitirme tezi. Master/Doktora tezi sayılabilir.</li>
                        <li><strong>İkinci Branş:</strong> Genellikle eksik çıkar. Transkriptteki yan derslerle tamamlanabilir.</li>
                        <li><strong>Referendariyet (Staj):</strong> Türkiye'deki hizmet dökümü ile muafiyet talep edilebilir.</li>
                        <li><strong>Dil Şartı:</strong> Genellikle C2 istenir (NRW başvuruda C2 şart koşar).</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="erzieher">
                  <AccordionTrigger className="text-lg font-semibold">Erzieher/in (Okul Öncesi)</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-300">
                      Öğretmenlik diplomasına alternatif popüler bir yoldur.
                    </p>
                    <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                      <li>3 yıllık Ausbildung denkliği aranır.</li>
                      <li>Genellikle B2 veya C1 dil seviyesi istenir.</li>
                      <li>En az 3 ay tam zamanlı (Vollzeit) staj/deneyim şartı vardır.</li>
                      <li>Lise diploması denkliği için Staatliche Schulamt'a başvurulmalıdır.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="others">
                  <AccordionTrigger className="text-lg font-semibold">Diğer Meslekler (Sağlık, Mühendislik)</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <li>
                        <strong>Sağlıkçılar:</strong> Doktorlar <em>Landesärztekammer</em>, Hemşireler <em>Regierungspräsidium</em> gibi kurumlara başvurmalıdır.
                      </li>
                      <li>
                        <strong>Mühendisler:</strong> İlgili eyaletteki <em>Ingenieurkammer</em> yetkilidir.
                      </li>
                      <li>
                        <strong>Muhasebe:</strong> IHK FOSA (Nürnberg) üzerinden denklik işlemleri yürütülür.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Section 5: Önemli İpuçları */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-blue-900 dark:text-blue-100">
                <Info className="w-5 h-5" />
                5. Kritik İpuçları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 md:grid-cols-2">
                <li className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-100 dark:border-blue-800 text-sm">
                  <strong>Dr. Unvanı:</strong> Kimlik ve ehliyetinize işletebilirsiniz.
                </li>
                <li className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-100 dark:border-blue-800 text-sm">
                  <strong>Transkript Temini:</strong> Orijinaline ulaşamıyorsanız, üniversitenizden ZAB'a doğrudan mail atılmasını sağlayabilirsiniz.
                </li>
                <li className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-100 dark:border-blue-800 text-sm">
                  <strong>Önlisans:</strong> Alman Berufsfachschule ile kıyaslanabilir, ZAB değerlendirmesi yapılabilir.
                </li>
                <li className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-100 dark:border-blue-800 text-sm">
                  <strong>Uzun Vadeli Düşünün:</strong> Diliniz yetersiz olsa bile denklik işlemlerini tamamlayıp kenara koymak, gelecekte mesleğe dönüşü kolaylaştırır.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 6: Sıkça Sorulan Sorular */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <HelpCircle className="w-6 h-6 text-orange-500" />
                Sıkça Sorulan Sorular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Bölüm 1 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200 border-b pb-2">Bölüm 1: Temel Kavramlar ve Sürecin Yapısı</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Almanya'da mesleki denklik süreci hangi aşamalardan oluşur?</AccordionTrigger>
                    <AccordionContent>
                      Almanya'da mesleki denklik süreci, iki ana başlık altında ilerlemektedir: <strong>Diploma Değerlendirmesi (Zeugnisbewertung)</strong> ve <strong>Mesleki Tanınma (Berufliche Anerkennung)</strong>.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Zeugnisbewertung (Diploma Değerlendirmesi) nedir ve kim yapar?</AccordionTrigger>
                    <AccordionContent>
                      Zeugnisbewertung, yabancı bir yükseköğretim yeterliliğini tanımlayan resmi bir belgedir. Lisans, Yüksek Lisans ve Doktora düzeyindeki eğitimin Almanya'da kanıtlanmasını sağlar. Bu işlem, Bonn'da bulunan <strong>ZAB (Zentralstelle für ausländisches Bildungswesen)</strong> tarafından gerçekleştirilir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>Zeugnisbewertung ile Berufliche Anerkennung arasındaki fark nedir?</AccordionTrigger>
                    <AccordionContent>
                      ZAB'ın yaptığı Zeugnisbewertung, yalnızca karşılaştırmalı bir sınıflandırmadır ve bir tanıma (Anerkennung) değildir. Berufliche Anerkennung ise, kişinin kendi ülkesindeki mesleği Almanya'da hangi şartlar altında yapabileceğini belirler.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-4">
                    <AccordionTrigger>Düzenlenmiş (Reglementiert) meslekler hangileridir?</AccordionTrigger>
                    <AccordionContent>
                      Düzenlenmiş meslekler, kanun ve yönetmeliklerle belirlenmiştir ve Tanınma (Anerkennung) olmadan bu mesleklerde çalışmak mümkün değildir. Örnekler arasında sağlıkçılar (Hekim, Dişçi, Hemşire, Psikolog vb.), öğretmenlik, mimarlık ve mühendislik yer alır.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-5">
                    <AccordionTrigger>Düzenlenmemiş meslekler için denklik alınmalı mıdır?</AccordionTrigger>
                    <AccordionContent>
                      Bu mesleklerde çalışmak için tanınmaya gerek yoktur; doğrudan iş aranabilir. Ancak iş başvurularında Bonn (ZAB) değerlendirmesini evraklara eklemek önemlidir. Örnekler: Bilgisayar Bilimci, ekonomist, siyaset bilimci, kimyager.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Bölüm 2 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200 border-b pb-2">Bölüm 2: Sürece Başlama ve Maliyet</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-6">
                    <AccordionTrigger>Denklik sürecine başlamanın ilk adımı nedir?</AccordionTrigger>
                    <AccordionContent>
                      Sürece başlamanın ilk adımı, Job Center'daki kariyer danışmanından randevu almaktır.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-7">
                    <AccordionTrigger>Agentur für Arbeit/Job Center görüşmesinde nasıl bir yol izlenmelidir?</AccordionTrigger>
                    <AccordionContent>
                      Kariyer danışmanı sizi Agentur für Arbeit'taki Anerkennungsberater'a (tanınma danışmanı) yönlendirecektir. Görüşmeye giderken orijinal diploma ve transkriptlerinizi içeren bir dosya hazırlayın. Görüşme sonucunda Anerkennungsberater tarafından doldurulup imzalanan rapor, Job Center'daki kariyer danışmanına teslim edilmeli ve Anerkennung işlemleri bu rapora göre başlayacaktır.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-8">
                    <AccordionTrigger>Dil seviyesi onayı neden önemlidir?</AccordionTrigger>
                    <AccordionContent>
                      Görüşme sırasında mesleği yapmak için C1-C2 düzeyinde dile ihtiyacınız olduğunu belirtin ve danışmandan bu seviyeyi rapora yazdırmasını rica edin. Bu, Job Center'ın dil kursunuzun masraflarını sorun çıkarmadan karşılamasını sağlar.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-9">
                    <AccordionTrigger>ZAB (Bonn) başvuru ücretini kim karşılar?</AccordionTrigger>
                    <AccordionContent>
                      Bonn'un (ZAB) ücreti 200 Euro'dur. Agentur für Arbeit/Job Center, onay alındıktan sonra bu ücreti ve tercüme masraflarını karşılayabilir.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Bölüm 3 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200 border-b pb-2">Bölüm 3: ZAB Başvurusu ve Belge İşlemleri</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-10">
                    <AccordionTrigger>ZAB başvurusu için hangi evraklar gereklidir?</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Lisans, Master, Doktora diplomalarının ve transkriptlerinin tercümelerinin Beglaubigung yapılmış nüshaları.</li>
                        <li>Lise diploması veya kayıt örneğinin Türkçesinin fotokopisi.</li>
                        <li>Kimlik (Aufenthaltstitel), Pasaport ve Yeşil Belgenin fotokopisi.</li>
                        <li>Doktora diplomaları dahil tüm eğitim kariyerini kapsayan belgelerin gönderilmesi tavsiye edilir.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-11">
                    <AccordionTrigger>Türkçe veya İngilizce belgelerin Almanca tercümesi zorunlu mudur?</AccordionTrigger>
                    <AccordionContent>
                      Türkçe veya İngilizce dildeki diploma ve transkriptler için Almanca tercümesi istenmemektedir; İngilizce/Türkçe versiyonlar kabul edilmektedir. Ancak yerel yetkililer (Job Center veya Belediye) bazen ısrarla Almanca çeviri isteyebilir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-12">
                    <AccordionTrigger>Beglaubigung (Aslı Gibidir Onayı) nasıl yapılır?</AccordionTrigger>
                    <AccordionContent>
                      Beglaubigung, orijinal belge Zab'a gönderilemeyeceği için belgenin orijinalini belediye görevlisinin görmesi ve kopyasına "aslı gibidir" mührünü vurması işlemidir. Belediyeler (Rathaus/Bürgerbüro), yerel mahkeme (Ortsgericht) veya noterler tarafından yapılır. Belediyeler genellikle daha ekonomiktir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-13">
                    <AccordionTrigger>ZAB başvurusu sonuçlanma süresi ne kadardır?</AccordionTrigger>
                    <AccordionContent>
                      ZAB, evrakları alınca 200 Euro'luk fatura gönderir. Ödeme yapıldıktan sonra işlemler başlar ve sonuç yaklaşık 4-6 ay arasında adresinize ulaşır.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-14">
                    <AccordionTrigger>Orijinal transkripti temin etmekte zorlananlar ne yapabilir?</AccordionTrigger>
                    <AccordionContent>
                      Islak imzalı orijinal transkripti temin etmekte zorlananlar, üniversite öğrenci işlerine mail atarak durumu açıklayıp transkriptin mail yoluyla gönderilmesini talep edebilirler. Bazı durumlarda üniversiteden gelen bu maili doğrudan ZAB'a forward etmek, orijinal belge yerine kabul edilebilmektedir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-15">
                    <AccordionTrigger>Önlisans diplomaları için ZAB değerlendirmesi yapılabilir mi?</AccordionTrigger>
                    <AccordionContent>
                      Önlisans diplomaları (Türk yükseköğretim alanı içinde yer alsa da), Alman Berufsfachschule eğitimleriyle karşılaştırılabilir nitelikte olabilir ve ZAB değerlendirmesi yapılabilmektedir.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Bölüm 4 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200 border-b pb-2">Bölüm 4: Mesleki Tanınma Detayları</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-16">
                    <AccordionTrigger>Öğretmenlik denklik başvurusu nereye yapılır?</AccordionTrigger>
                    <AccordionContent>
                      Öğretmen kökenli herkesin, kendi eyaletlerinde bulunan Lehrkräfteakademie'ye başvurması gerekmektedir (Örn: Hessen'de Gissen, NRW'de Detmold, BW'de Tübingen).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-17">
                    <AccordionTrigger>Öğretmenlik denklik sürecinde hangi eksiklikler ortaya çıkar?</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Hausarbeit (Bitirme Çalışması):</strong> Doktora veya Master tezi bunun yerine sayılabilir.</li>
                        <li><strong>İkinci Branş:</strong> Lisans, Master veya Doktora transkriptlerindeki farklı dersler ile tamamlanabilir.</li>
                        <li><strong>Referendariyet (Stajyerlik):</strong> Türkiye'deki hizmet dökümünüzün tercümesi sunularak muafiyet talep edilebilir.</li>
                        <li><strong>Dil Şartı:</strong> Genellikle C2 Sertifikası veya kurumun yapacağı sınavda başarılı olunması istenir.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-18">
                    <AccordionTrigger>Diğer düzenlenmiş meslekler hangi kurumlara başvurmalıdır?</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Sağlıkçılar:</strong> Kendi eyaletlerindeki mesleki tanıma yapan kurumlara başvurmalıdırlar (Örn: Landesärztekammer).</li>
                        <li><strong>Mühendisler:</strong> Çalışmak istenilen eyaletteki Ingenieurkammer'a başvurulmalıdır.</li>
                        <li><strong>Muhasebecilik:</strong> IHK FOSA kurumuna başvurulur.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Bölüm 5 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200 border-b pb-2">Bölüm 5: Genel İpuçları</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-19">
                    <AccordionTrigger>Başvuruyu eksiksiz yapmanın önemi nedir?</AccordionTrigger>
                    <AccordionContent>
                      Sürece başlamadan önce resmi işlemleri düzgün yapmak ve eksiksiz bir dosya sunmak önemlidir. Üstünkörü başvurular, sonucu düzeltmek için daha fazla çaba gerektirir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-20">
                    <AccordionTrigger>Dil seviyesinin şu an yetersiz olması denklik sürecine engel midir?</AccordionTrigger>
                    <AccordionContent>
                      Hayır. Almanca seviyesinin şu an yetersiz olması, mesleği 3-4 yıl sonra da yapamayacağınız anlamına gelmez. Bu nedenle, resmi işlemleri düzgünce tamamlamak, mesleğin tanınmasını sağlamak ve bunu bir kenara koymak tavsiye edilir.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-21">
                    <AccordionTrigger>Dr. unvanı Almanya'da kullanılabilir mi?</AccordionTrigger>
                    <AccordionContent>
                      Evet, Dr. unvanınızı kimlik ve ehliyete yazdırabilirsiniz.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

            </CardContent>
          </Card>

          {/* Analoji */}
          <Alert className="bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
            <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <AlertTitle className="text-indigo-800 dark:text-indigo-300 font-semibold">Kavramsal Netlik Analojisi</AlertTitle>
            <AlertDescription className="text-indigo-700 dark:text-indigo-400 mt-2 text-sm leading-relaxed">
              Almanya'daki mesleki denklik sürecini, Türkiye'den getirdiğiniz bir elektronik cihazın uluslararası adaptör ve yerel şebekeye bağlanması olarak düşünebilirsiniz. 
              <br/><br/>
              <strong>ZAB (Zeugnisbewertung)</strong>, cihazınızın (diplomanızın) teknik özelliklerinin (seviyesinin) uluslararası standartlara (Alman yükseköğretim seviyelerine) uygun olup olmadığını kontrol eden bir "Uluslararası Teknik Şartname Belgesi"dir. Ancak bu belge, cihazın çalışmaya hazır olduğu anlamına gelmez.
              <br/><br/>
              <strong>Berufliche Anerkennung</strong> ise, cihazın ülkenin yerel voltajına ve fiş tipine (mesleki gerekliliklere ve eyalet kurallarına) göre ayarlanıp ayarlanmadığını kontrol eden, çalışmak için zorunlu olan "Yerel Çalışma İzni"dir. Düzenlenmiş meslekler için her iki aşamadan da geçmek gerekir.
            </AlertDescription>
          </Alert>

        </div>
      </div>
    </div>
  );
}
