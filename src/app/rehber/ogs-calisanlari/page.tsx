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
  Calculator,
  Scale,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Info,
  User,
  Calendar,
  Quote,
  School,
  Users,
  Clock,
  Euro
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OgsPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%OGS%,profession.ilike.%Offene Ganztagsschule%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200">
                Eğitim & Pedagoji
              </Badge>
              <Badge variant="outline" className="text-blue-100 border-blue-400">
                Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              OGS (Offene Ganztagsschule) Çalışanları İçin Rehber
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Almanya'da OGS alanında kariyer, işe alım süreçleri, günlük çalışma hayatı ve yasal düzenlemeler hakkında kapsamlı rehber.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Ana İçerik */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="guide" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="guide" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Rehber</TabsTrigger>
                <TabsTrigger value="experiences" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Tecrübeler</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Dokümanlar</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-12 mt-6">
            
            {/* 1. Bölüm: Hazırlık ve Uyum */}
            <section id="baslangic" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  I. Almanya'ya Göç ve İş Hayatına Hazırlık Süreci
                </h2>
              </div>

              <Card className="mb-8 border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    Bu rehber, Almanya'ya göç etmeyi düşünen veya halihazırda Almanya'da bulunan ve Offene Ganztagsschule (OGS) alanında çalışmayı hedefleyenler için hazırlanmıştır.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-blue-600" />
                      Dil Yeterliliği ve Gelişim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Pratik Tecrübe ve İpuçları</h4>
                      <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                        <li>Almanca dil seviyesi, OGS'de çalışırken karşılaşılan en önemli faktördür.</li>
                        <li>B1 sınavından hemen sonra başlayanlar olduğu gibi, C1 kursuna devam edip konuşma seviyesi B1 olanlar da vardır.</li>
                        <li>Bazı işverenler, dil seviyesi çok iyi olmasa bile (A1/A2) iş teklif edebilir, ancak bazıları B2'yi bile yetersiz bulabilir.</li>
                        <li>OGS'de çalışmak, dil gelişimi ve çekingenliği atmak için büyük bir fırsattır.</li>
                      </ul>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Dil Gelişimi İçin İpuçları
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <li>Sürekli konuşmaya çalışmak ve kendini zorlamak.</li>
                        <li>ChatGPT ile diyaloglar hazırlamak ve not defteri tutmak.</li>
                        <li>Toplantılarda konuşulanları anlamadığınızda, Almancası iyi birinden özet istemek.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      Kariyer Başlangıcı ve Denklik Süreci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Türkiye'deki öğretmenlik branşı burada tanınmadığı veya denklik (Anerkennung) süreci devam ettiği için OGS, bir başlangıç ve staj alanı olarak sıklıkla tercih edilmektedir.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Denklik (Anerkennung):</strong>
                          OGS tecrübesi, Erzieher/in denkliği için kesin bir avantaj sağlamasa da, Vorpraktikum (ön staj) olarak sayılabilir. Sınıf öğretmenleri için Baden eyaleti gibi bazı yerlerde 12-15 ay praktikum sonrası Erzieher tanınması mümkündür.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Alternatif Pozisyonlar:</strong>
                          NRW eyaletinde LOIS.NRW ve LEO platformları (Pädagogische Einführung/OBAS) veya ANDREAS platformu üzerinden kalıcı istihdam fırsatları araştırılabilir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">İleri Eğitim (Weiterbildung):</strong>
                          "Pädagogische Mitarbeiterin für die OGS und Inklusion" gibi sertifika programları (yaklaşık 8 ay) mesleki gelişim ve iş başvuruları için faydalıdır.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Jobcenter İlişkileri ve Yasal Çerçeve
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Başvuru ve Bildirim</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Temel edimler için başvuru Jobcenter'a en kısa sürede yapılmalıdır. Tüm gelir, varlık ve değişiklikler (işe başlama vb.) eksiksiz bildirilmelidir. Türkiye'deki emekli maaşı ve mal varlıkları gizlenmemelidir.
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Gelir ve Kesinti (Freibeträge)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Çalışıldığında gelirin tamamı kesilmez. İlk 100 Euro düşülmez, 100-1000 Euro arası gelirin %20'si dikkate alınmaz. Kısmi zamanlı çalışmada Jobcenter desteği tamamen kesilmeyebilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: İş Başvurusu */}
            <section id="basvuru" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  II. OGS'ye İş Başvurusu ve İşe Alım
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      İş Arama ve Träger'ler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      OGS'ler genellikle derneklere veya kurumlara (Träger) bağlıdır. Başvurular okul yönetimine değil, bu kurumlara yapılır.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['AWO', 'Caritas', 'Diakonie', 'Stadt (Belediye)'].map((item) => (
                        <div key={item} className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-center font-medium text-slate-700 dark:text-slate-300">
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      İlanlarda "OGS Ergänzungskraft" veya "Gruppenleiterin" pozisyonlarını arayabilirsiniz. İlan yoksa, doğrudan okula gidip sormak da etkili bir yöntemdir.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="w-5 h-5 text-blue-600" />
                      Gönüllü Çalışma ve Staj
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Neden Önemli?</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Gönüllü çalışma (Ehrenamtlich/Freiwillig), dil seviyesini ilerletmek ve sektörü tanımak için şiddetle tavsiye edilir. A2 seviyesinde bile başlanabilir. Sonunda alınacak referans mektubu iş başvurularında çok değerlidir.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Gerekli Belgeler:</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                        <li>Bewerbung (Başvuru)</li>
                        <li>Lebenslauf (Özgeçmiş)</li>
                        <li>Erweitertes Führungszeugnis (Genişletilmiş Sabıka Kaydı)</li>
                        <li>Masernimmunität (Kızamık Aşı Belgesi)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Mülakat ve Gözlem (Hospitation)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Mülakatta esnek çalışma imkanı, takım uyumu ve çocuklara yaklaşımınız değerlendirilir.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Mülakat İpuçları</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <li>Çocuklarla çalışmaya olan istekliliğinizi vurgulayın.</li>
                        <li>Kendi çocuklarınızı büyütme tecrübenizden bahsedin.</li>
                        <li>Dil eksikliğinizi dürüstçe belirtip, iletişime açık olduğunuzu gösterin.</li>
                        <li>Ulaşım sorununuz olmadığını belirtin.</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Hospitation (Gözlem Günü)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        İş teklifinden önce genellikle 1 günlük gözlem (Hospitation) istenir. Bu süreçte gözlem yapmak, soru sormak ve çocuklarla mesafeli ama ilgili bir iletişim kurmak önemlidir.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. Bölüm: İş Hayatı */}
            <section id="is-hayati" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  III. OGS'de İş Hayatı ve Günlük Akış
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="w-5 h-5 text-blue-600" />
                      Çalışma Konseptleri ve Görevler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      OGS, ilkokul çocuklarına okul sonrası (11:30 - 17:00) hizmet verir. Normal, Kısmen Açık (Teiloffene) veya Tamamen Açık (Ganzoffene) konseptler uygulanabilir.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Temel Görevler</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                          <li>Öğle yemeğinde eşlik etmek</li>
                          <li>Ev ödevlerine yardım (Hausaufgabenbetreuung)</li>
                          <li>Oyun saatlerinde gözetmenlik</li>
                          <li>AG (Etkinlik) düzenlemek</li>
                        </ul>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">AG (Arbeitsgemeinschaft)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Kreativ, Bastel, Spor, İngilizce gibi etkinlikler düzenlenir. Pinterest gibi kaynaklardan fikir edinilebilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Çalışma Saatleri ve Tatiller
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Yarı Zamanlı (Teilzeit):</strong>
                          Genellikle haftada en çok 25 saat çalışılır. Tam zamanlı (Vollzeit) nadirdir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Tatillerde Maaş:</strong>
                          Okul tatillerinde (Schulferien) OGS kapalı olsa bile tam maaş alınır. Yaz tatilinde OGS genellikle 3 hafta açık olur.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Eksik Saatler:</strong>
                          Haftalık eksik kalan saatler, tatil dönemlerindeki uzun çalışmalar veya toplantılarla dengelenir.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-blue-600" />
                      Zorluklar ve Baş Etme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Gürültü ve çocukların hızlı konuşması yorucu olabilir. Disiplin sorunlarında mola verme, uyarma veya aile ile görüşme yöntemleri uygulanır.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Kültürel Uyum</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Başörtüsü genellikle sorun teşkil etmez. Namaz vakitleri için yönetimle görüşülerek çözüm (cem etmek veya oda talep etmek) bulunabilir.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Bölüm: Mali ve Hukuki */}
            <section id="mali-hukuki" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Euro className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  IV. Mali, Hukuki ve Yönetsel Detaylar
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-blue-600" />
                      Ücretlendirme ve Sözleşme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Saat Ücreti:</strong>
                          Kuruma göre değişmekle birlikte 11-15 Euro (Brüt) arası olabilir. Üniversite mezunları S8 grubundan, diğerleri S5/S6 grubundan maaş alabilir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Sözleşme Tipleri:</strong>
                          Teilzeit (Yarı Zamanlı), Minijob veya Honorar Kraft (Serbest) olabilir. Genellikle 6 ay deneme süresi (Probezeit) sonrası süresiz sözleşmeye döner.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-blue-600" />
                      Hukuki Sorumluluklar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Çocukların güvenliği esastır. Asla yalnız bırakılmamalıdırlar. Bir kaza durumunda doktora gidilmeli, rapor alınmalı ve yazılı olarak kuruma bildirilmelidir.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Kariyer Olanakları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      OGS'de Gruppenleiter (Grup Lideri) olunabilir. Ayrıca öğretmenliğe geçiş, Schulbegleiter, Sozialarbeiter veya Entegrasyon Kurs Öğretmenliği için bir basamak olarak kullanılabilir.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* SSS Bölümü */}
            <section id="sss" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Sıkça Sorulan Sorular
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {/* I. OGS’NİN TANIMI */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">I. OGS’nin Tanımı ve Kapsamı</div>
                
                <AccordionItem value="ogs-nedir">
                  <AccordionTrigger>OGS nedir? Mahiyeti nedir? (Ana iş dalı mıdır? Minijob mudur?)</AccordionTrigger>
                  <AccordionContent>
                    OGS (Offene Ganztagsschule), ilkokul çocuklarının okul saatleri dışında (genellikle 11:30-17:00) hizmet aldığı kurumdur. Ev ödevi, yemek, spor ve sanat etkinlikleri yapılır. Genellikle ana iş dalı (Vollzeit) değildir, en fazla 25 saat (Teilzeit) çalışılır. Minijob olarak da mümkündür.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pedagogische-fachkraft">
                  <AccordionTrigger>Pädagogische Fachkraft ve P. Mitarbeiterin arasında fark var mıdır?</AccordionTrigger>
                  <AccordionContent>
                    Evet. Pädagogische Mitarbeiterin genellikle Fachkraft'ın yardımcısı (Ergänzungskraft) pozisyonundadır. Fachkraft pozisyonu ise genellikle Erzieher/in gibi daha yüksek bir eğitim gerektirir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="yerel-isimler">
                  <AccordionTrigger>OGS'nin bazı eyaletlerdeki (Nord Hessen gibi) adı nedir?</AccordionTrigger>
                  <AccordionContent>
                    Nord Hessen gibi bazı bölgelerde OGS yerine "Hort" veya Grundschule'de "Betreuung" (Temel Okulda Bakım) ifadeleri kullanılabilir. İş ararken bu terimler de kullanılmalıdır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="yaz-okullari">
                  <AccordionTrigger>Yaz okulları, oyun evleri gibi etkinlikler de OGS kapsamına dahil olur mu?</AccordionTrigger>
                  <AccordionContent>
                    Evet, okul sonrası bakım merkezleri (Hort) gibi yerler, yaz okulları ve çocuklarla etkinlik yapılan oyun evleri gibi faaliyetleri de kapsayabilir.
                  </AccordionContent>
                </AccordionItem>

                {/* II. İŞ BULMA VE BAŞVURU */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">II. İş Bulma, Başvuru ve Mülakat</div>

                <AccordionItem value="basvuru-yontemleri">
                  <AccordionTrigger>Denklik almış, C1 sertifikası olan matematik öğretmeni OGS'ye nereden başvurmalı?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>İlan Siteleri:</strong> "OGS Ergänzungskraft" veya "Gruppenleiterin" aramasıyla.</li>
                      <li><strong>Kurum Siteleri:</strong> Okulun web sitesinden Träger (AWO, Caritas, Diakonie, Stadt) öğrenilip o kurumun sitesinden.</li>
                      <li><strong>Doğrudan Ziyaret:</strong> OGS saatlerinde okula gidip sorarak.</li>
                      <li><strong>Belediye:</strong> Bazı yerlerde doğrudan belediyeye (Stadt) başvurulabilir.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="a2-gonullu">
                  <AccordionTrigger>A2 seviyesinde konuşan biri gönüllü olarak başvurabilir mi?</AccordionTrigger>
                  <AccordionContent>
                    Evet, A2 seviyesiyle gönüllü (freiwillig) çalışmak mümkündür. Sertifika şartı aranmaz, mülakatta konuşmanız yeterli olabilir. Başvuru için doğrudan okula gidip sormak en etkili yoldur.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="basvuru-yeri">
                  <AccordionTrigger>Okul yönetimine mi yoksa OGS'yi üstlenen kuruma mı başvurulmalı?</AccordionTrigger>
                  <AccordionContent>
                    Genellikle OGS'yi üstlenen kuruma (Träger: AWO, Caritas vb.) başvurulur. Okul yönetimi yerine bu kurumlar işe alımı yapar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="awo-nedir">
                  <AccordionTrigger>AWO nedir? OGS ile farkı var mıdır?</AccordionTrigger>
                  <AccordionContent>
                    AWO, Caritas gibi OGS hizmetini yürüten bir kurumdur (Träger). OGS hizmetin kendisi, AWO ise bu hizmeti sağlayan kuruluştur.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cv-yetenekler">
                  <AccordionTrigger>Gönüllü başvuruda CV'de hangi yetenekler belirtilmelidir?</AccordionTrigger>
                  <AccordionContent>
                    Spor, Satranç, Resim, Basteln (El işi), Müzik aleti gibi hobiler ve yetenekler CV'de mutlaka belirtilmelidir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="formasyon-tercume">
                  <AccordionTrigger>Türkiye'deki Eğitim Formasyonu OGS başvurularında nasıl kullanılır?</AccordionTrigger>
                  <AccordionContent>
                    Formasyon belgesi (veya Eğitim Bilimleri yüksek lisansı) Almancaya tercüme edilerek başvuru dosyasına eklenebilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="saglik-egitimi">
                  <AccordionTrigger>İşe başlarken istenen hijyen eğitimi (Gesundheitsamt) randevusu nereden alınır?</AccordionTrigger>
                  <AccordionContent>
                    En yakın Gesundheitsamt (Sağlık Dairesi) kurumundan "Belehrung" (Bilgilendirme) için randevu alınmalıdır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trager-gorusmesi">
                  <AccordionTrigger>Hospitation sonrası Träger (örn. AWO) ile de görüşme yapılır mı?</AccordionTrigger>
                  <AccordionContent>
                    Evet, okulda Hospitation (gözlem) yaptıktan sonra, sözleşme için bağlı olunan kurumla (Träger) resmi bir iş görüşmesi yapılması gerekebilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kendim-hospitasyon">
                  <AccordionTrigger>Kurum istemeden "Hospitasyon yapmak istiyorum" diyebilir miyim?</AccordionTrigger>
                  <AccordionContent>
                    Genellikle işverenler teklif eder, ancak sizin de bu istekliliği göstermeniz olumlu karşılanabilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gonullu-sozlesme">
                  <AccordionTrigger>Gönüllü çalışmada yazılı sözleşme zorunlu mudur?</AccordionTrigger>
                  <AccordionContent>
                    Sözlü anlaşma ile başlanabilir, yazılı sözleşme şart olmayabilir. Ancak çalışma sonunda mutlaka referans mektubu (Zeugnis) istenmelidir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mulakat-sorulari">
                  <AccordionTrigger>OGS mülakatında hangi sorular soruluyor?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Tecrübeleriniz, takım uyumu ve esnekliğiniz sorulur. Örnek senaryolar:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Çocuklar kavga ederse:</strong> Dikkat dağıtma, uyarma, ayırma ve en son aile ile görüşme.</li>
                      <li><strong>Tek başınayken kavga çıkarsa:</strong> "Stop" diye bağırıp müdahale etme, ayırma, dinleme. Şiddet varsa "vuran gider" kuralı.</li>
                      <li><strong>Çocuğunuz hastalanırsa:</strong> Bakım gerekliyse evde kalınacağı dürüstçe söylenmeli.</li>
                      <li><strong>Veli şikayet ederse:</strong> Sakin kalıp dinleme, empati gösterme ve çözüm odaklı olma.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="yetenek-sorusu">
                  <AccordionTrigger>İlgi alanı olmayan biri yetenek sorularına nasıl cevap vermeli?</AccordionTrigger>
                  <AccordionContent>
                    İnternetten araştırarak her türlü etkinliği (Yemek, Bilgisayar, El İşi vb.) çocuklarla yapabileceğinizi ve öğrenmeye istekli olduğunuzu belirtmelisiniz.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hospitasyon-beklenti">
                  <AccordionTrigger>Hospitasyon sürecinde beklenen nedir?</AccordionTrigger>
                  <AccordionContent>
                    Gözlem yapmak, soru sormak, ilgi göstermek ve verilen küçük görevleri yapmaya çalışmak beklenir. Çocuklarla (özellikle 1. sınıf) mesafeli ama ilgili bir iletişim kurulmalıdır.
                  </AccordionContent>
                </AccordionItem>

                {/* III. DİL YETERLİLİĞİ */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">III. Dil Yeterliliği ve İletişim</div>

                <AccordionItem value="dil-seviyesi">
                  <AccordionTrigger>OGS'de çalışmak için hangi seviyede Almanca gerekir?</AccordionTrigger>
                  <AccordionContent>
                    B1 seviyesiyle başlayanlar çoktur. Hatta A1/A2 ile gönüllü başlayıp geliştirenler de vardır. Ancak B1 seviyesinde olup konuşma pratiği eksik olanlar zorlanabilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="b2-beklemeli-mi">
                  <AccordionTrigger>B2 seviyesini beklemeli mi yoksa B1 ile başlamalı mı?</AccordionTrigger>
                  <AccordionContent>
                    Kesinlikle beklenmemeli. OGS'de çalışmak, konuşma zorunluluğu nedeniyle dili B2 kursundan çok daha hızlı geliştirir ve konuşma korkusunu yener.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dil-gelistirme">
                  <AccordionTrigger>Almanca verimini artırmak için neler yapılabilir?</AccordionTrigger>
                  <AccordionContent>
                    Sürekli konuşmaya çalışmak, not defteri tutmak, ChatGPT ile diyalog çalışmak ve toplantılarda anlaşılmayan yerleri iş arkadaşlarından özetlemesini istemek faydalıdır.
                  </AccordionContent>
                </AccordionItem>

                {/* IV. ÇALIŞMA ŞARTLARI */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">IV. Çalışma Şartları ve Saatleri</div>

                <AccordionItem value="calisma-tipi">
                  <AccordionTrigger>OGS'de Tam Zamanlı (Vollzeit) çalışma imkanı var mı?</AccordionTrigger>
                  <AccordionContent>
                    Genellikle yoktur. Sadece yöneticiler (Leiter) tam zamanlı olabilir. Personel genelde Teilzeit (maksimum 25-28 saat) çalışır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="yas-siniri">
                  <AccordionTrigger>Çalışmak için yaş sınırı var mı?</AccordionTrigger>
                  <AccordionContent>
                    Resmi bir yaş sınırı bulunmamaktadır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="erkek-calisan">
                  <AccordionTrigger>Erkeklerin çalışma şansı nedir?</AccordionTrigger>
                  <AccordionContent>
                    Genelde kadınlar çalışsa da erkekler de çalışabilir. Ancak düşük saatler (Teilzeit) nedeniyle erkekler tarafından daha az tercih edilmektedir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sigorta-durumu">
                  <AccordionTrigger>Haftalık 22,5 saat çalışan sigortalı olur mu?</AccordionTrigger>
                  <AccordionContent>
                    Evet, haftalık 20 saatin üzerinde çalışanlar genellikle sosyal sigorta kapsamına girer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="eksik-saatler">
                  <AccordionTrigger>Sözleşmedeki saatler nasıl tamamlanır?</AccordionTrigger>
                  <AccordionContent>
                    Eksik saatler; toplantılar, tatil bakımı (Ferienbetreuung) ve köprü günlerindeki tam gün çalışmalarla dengelenir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tatil-maasi">
                  <AccordionTrigger>Okul tatillerinde maaş ödeniyor mu?</AccordionTrigger>
                  <AccordionContent>
                    Evet, okul tatillerinde OGS kapalı olsa bile çalışanlar tam maaşlarını almaya devam ederler.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="yaz-tatili">
                  <AccordionTrigger>Yaz tatilinde çalışma düzeni nasıldır?</AccordionTrigger>
                  <AccordionContent>
                    Yaz tatilinde OGS genellikle 3 hafta açık olur (Ferienbetreuung). Çalışanlar bu sürede çalışabilir, diğer yarısında izinli olurlar. Tatil bakımında çalışanların maaşı bazen daha yüksek olabilir.
                  </AccordionContent>
                </AccordionItem>

                {/* V. ÜCRETLENDİRME VE JOB CENTER */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">V. Ücretlendirme ve Jobcenter</div>

                <AccordionItem value="maas-durumu">
                  <AccordionTrigger>Saatlik ücret ne kadar?</AccordionTrigger>
                  <AccordionContent>
                    Kuruma ve eyalete göre değişir. Genellikle 11-16 Euro (Brüt) arasındadır. Üniversite mezunları S8 grubundan, diğerleri S5/S6 grubundan değerlendirilebilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="maas-grubu">
                  <AccordionTrigger>Öğretmenlik mezunları daha yüksek maaş grubu (TVöD S8a) alabilir mi?</AccordionTrigger>
                  <AccordionContent>
                    Evet, üniversite mezunu ve öğretmenlik geçmişi olanlar S8a grubundan maaş talep edebilir. Tecrübe (Stufe) pazarlığı da yapılmalıdır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="jobcenter-kesinti">
                  <AccordionTrigger>Jobcenter ne kadar kesinti yapar?</AccordionTrigger>
                  <AccordionContent>
                    İlk 100 Euro kesilmez. 100-1000 Euro arası gelirin %20'si size kalır, kalanı yardımdan düşülür. Bu sayede çalışmayan birine göre elinize daha fazla para geçer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="jobcenter-bildirim">
                  <AccordionTrigger>Türkiye'deki emekli maaşı ve mal varlığı bildirilmeli mi?</AccordionTrigger>
                  <AccordionContent>
                    Evet, kesinlikle bildirilmelidir. Jobcenter veri karşılaştırması yapabilir ve gizlenen gelirler ceza davasına yol açabilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="issizlik-parasi">
                  <AccordionTrigger>İşten çıkınca işsizlik parası (ALG I) alınabilir mi?</AccordionTrigger>
                  <AccordionContent>
                    Evet, eğer sigortalı bir işte yeterli süre çalışıldıysa, işten çıkınca Jobcenter yerine önce Agentur für Arbeit'tan işsizlik parası alınabilir.
                  </AccordionContent>
                </AccordionItem>

                {/* VI. KARİYER VE DENKLİK */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">VI. Kariyer ve Denklik</div>

                <AccordionItem value="kariyer-artilari">
                  <AccordionTrigger>Sınıf öğretmeni için OGS'nin artıları nelerdir?</AccordionTrigger>
                  <AccordionContent>
                    Dil gelişimi, mesleki terimlerin öğrenilmesi, referans edinme ve eğitim sistemine giriş (staj) açısından büyük fayda sağlar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="denklik-katkisi">
                  <AccordionTrigger>OGS çalışması denklik (Anerkennung) sağlar mı?</AccordionTrigger>
                  <AccordionContent>
                    Doğrudan denklik sağlamaz (denklik derslerle ilgilidir), ancak Erzieher/in olmak için gereken ön staj (Vorpraktikum) olarak saydırılabilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="schulbegleiter-karsilastirma">
                  <AccordionTrigger>Schulbegleiter mi yoksa OGS mi daha iyidir?</AccordionTrigger>
                  <AccordionContent>
                    Öğretmenlik geçmişi olanlar için OGS daha dinamik ve inisiyatif alınabilen bir ortamdır. Schulbegleiterlik daha pasif olabilir ve tatillerde maaş kesintisi riski vardır.
                  </AccordionContent>
                </AccordionItem>

                {/* VII. GÜNLÜK İŞLEYİŞ */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">VII. Günlük İşleyiş ve Pedagoji</div>

                <AccordionItem value="konsept-farklari">
                  <AccordionTrigger>Normal ve Açık Konsept (Offene) arasındaki fark nedir?</AccordionTrigger>
                  <AccordionContent>
                    Normal konseptte sabit gruplar ve ödev saatleri vardır. Açık konseptte (Teiloffene/Ganzoffene) çocuklar ilgi alanlarına göre odalara (Sanat, Spor, Bilgisayar vb.) dağılır. Açık konsept çalışan için genellikle daha rahat kabul edilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="odev-yardimi">
                  <AccordionTrigger>Hausaufgabenbetreuung (Ödev Yardımı) görevleri nelerdir?</AccordionTrigger>
                  <AccordionContent>
                    Çocuklara ödevlerinde rehberlik etmek, sorularını yanıtlamak ve ortamın düzenini sağlamaktır. Bazı okullar müfredata hakimiyet bekleyebilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="disiplin-teknikleri">
                  <AccordionTrigger>Çocuklar kavga ettiğinde ne yapılmalı?</AccordionTrigger>
                  <AccordionContent>
                    Oyun durdurulur, taraflar dinlenir, sakinleşmeleri için ayrı yerlere (mola) gönderilir. Şiddet varsa aile aranır ve çocuk eve gönderilir ("wer schlägt, der geht").
                  </AccordionContent>
                </AccordionItem>

                {/* VIII. YAŞAM VE İNANÇ */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">VIII. Yaşam ve İnanç</div>

                <AccordionItem value="basortusu">
                  <AccordionTrigger>Başörtülü (tesettürlü) çalışmak sorun olur mu?</AccordionTrigger>
                  <AccordionContent>
                    Genellikle sorun olmaz, hatta çeşitlilik açısından tercih edilebilir. Ancak Katolik okullarında (Katholische Grundschule) bazen hassasiyet olabilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="namaz">
                  <AccordionTrigger>Namaz vakitleri nasıl ayarlanır?</AccordionTrigger>
                  <AccordionContent>
                    Yönetimle görüşülerek mola saatleri namaza göre ayarlanabilir veya öğle/ikindi cem edilebilir. Özel bir oda talep edilebilir.
                  </AccordionContent>
                </AccordionItem>

                {/* IX. HUKUKİ VE GÜVENLİK */}
                <div className="font-semibold text-lg text-blue-800 dark:text-blue-300 pt-4">IX. Hukuki Sorumluluk ve Güvenlik</div>

                <AccordionItem value="kaza-durumu">
                  <AccordionTrigger>Çocuk kaza geçirirse ne yapılmalı?</AccordionTrigger>
                  <AccordionContent>
                    Doktora gidilmeli ve rapor alınmalı, olay yazılı olarak okula ve kuruma (Träger) bildirilmeli, okul sigortası devreye sokulmalıdır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="yalniz-birakma">
                  <AccordionTrigger>Çocuklar yalnız bırakılabilir mi?</AccordionTrigger>
                  <AccordionContent>
                    Hayır, çocuklar (özellikle mutfakta veya dışarıda) asla gözetimsiz bırakılmamalıdır. Lavaboya giderken bile başka bir çalışana emanet edilmelidir.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

              </TabsContent>

              <TabsContent value="experiences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tecrübeler</CardTitle>
                    <CardDescription>
                      Bu alanda çalışanların gerçek deneyimleri.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {experiences.length > 0 ? (
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp.id} className="border p-4 rounded-lg">
                            <h4 className="font-bold">{exp.title}</h4>
                            <p className="text-sm text-slate-600 mt-2">{exp.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <p>Henüz bu alanda paylaşılmış bir tecrübe bulunmuyor.</p>
                        <Button variant="link" className="mt-2">
                          İlk tecrübeyi sen paylaş
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dokümanlar</CardTitle>
                    <CardDescription>
                      İş başvurusu ve çalışma hayatı için gerekli belgeler ve şablonlar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-slate-500">
                      <p>Henüz bu alanda yüklenmiş bir doküman bulunmuyor.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-blue-950 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Talep Durumu</p>
                    <p className="font-medium text-slate-900 dark:text-white">Yüksek Talep</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-blue-950 rounded-lg">
                    <Euro className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ortalama Saat Ücreti</p>
                    <p className="font-medium text-slate-900 dark:text-white">11€ - 15€ / Saat</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-blue-950 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Çalışma Tipi</p>
                    <p className="font-medium text-slate-900 dark:text-white">Genellikle Yarı Zamanlı</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bu Sayfayı Paylaş</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full">
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog 
        professionSlug="ogs-calisanlari"
        defaultProfessionName="OGS Çalışanı"
      />
      <UploadDocumentDialog 
        professionSlug="ogs-calisanlari"
      />
    </div>
  );
}
