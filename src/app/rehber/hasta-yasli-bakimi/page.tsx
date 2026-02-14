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
  Scale,
  AlertTriangle,
  Users,
  Heart,
  Brain,
  Plane,
  Home,
  Search,
  Stethoscope,
  Baby,
  Info,
  HelpCircle,
  Euro,
  Clock,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { DocumentSection } from '@/components/document-section';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HastaYasliBakimiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Pfleger%,profession.ilike.%Bakım%,profession.ilike.%Hemşire%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-red-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-red-100 text-red-900 hover:bg-red-200">
                Sağlık & Bakım
              </Badge>
              <Badge variant="outline" className="text-red-100 border-red-400">
                Çok Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Hasta ve Yaşlı Bakımı (Pflege)
            </h1>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Pfleger/in, Pflegehelfer/in ve Betreuungskraft kariyer yolları, Ausbildung süreçleri ve yaşam rehberi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-red-900 hover:bg-red-50" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-red-600 text-white hover:bg-red-500 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Telegram Links Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <a href="https://t.me/+j57ECmTyGfowYTFi" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg mb-1">Pfleger/in</div>
                  <div className="text-sm text-blue-100">Telegram Grubu</div>
                </div>
                <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="https://t.me/+yI1or4k3nMswN2Ni" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg mb-1">Deutschland Compass</div>
                  <div className="text-sm text-amber-100">Telegram Kanalımız</div>
                </div>
                <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
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
            
            <ProfessionVideoPlayer professionSlug="hasta-yasli-bakimi" />

            {/* 1. Bölüm: Hazırlık ve Planlama */}
            <section id="baslangic" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Globe className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  1. Hazırlık ve Planlama (Vize Öncesi)
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-red-600" />
                      1.1. Temel Bakım Meslekleri ve Alanlar
                    </CardTitle>
                    <CardDescription>
                      Almanya'da bakım meslekleri "Generalistik" sistemi altında toplanmıştır.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Pflegefachfrau / Pflegefachmann</h4>
                        <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">3 Yıllık Ausbildung</Badge>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Yeni sistemdeki Generalistik eğitimi olup, tüm Avrupa’da hemşirelik denkliği sağlar. Hastane, yaşlı bakımı ve çocuk bakımı alanlarında rotasyon zorunludur.
                        </p>
                      </div>
                      
                      <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Pflegehelfer / Pflegehelferin</h4>
                        <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-100">1 Yıllık Ausbildung</Badge>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Esas olarak yaşlı bakımı odaklıdır. Deneyimi az olanlar ve dili henüz çok iyi olmayanlar için ideal bir başlangıçtır.
                        </p>
                      </div>

                      <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Altenbetreuung (Betreuungskraft)</h4>
                        <Badge className="mb-2 bg-orange-100 text-orange-800 hover:bg-orange-100">Sertifika (1-4 Ay)</Badge>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Vücut bakımı yapmaz, sadece sosyal aktiviteler ve eşlik etme görevlerini üstlenir. (SGB 43b, 53b kursları).
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Pflege vs Betreuung Farkı</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        <strong>Pflege (Bakım):</strong> Vücut temizliği, alt değiştirme, yemek yedirme dahil her şeyi kapsar. Refakatçi sistemi olmadığı için hemşireler de bu işi yapar.<br/>
                        <strong>Betreuung (Refakat):</strong> Sadece sosyal etkinlikler (sohbet, oyun, gezinti) yapılır. Ağır fiziksel iş yoktur.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-red-600" />
                      1.2. Eğitim Yolları ve Şartları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="dil">
                        <AccordionTrigger>Dil Gereksinimleri (Almanca)</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>3 Yıllık Ausbildung:</strong> Başlangıç için B1 yeterli olabilir ancak dersler için B2 önerilir (NRW'de B2 istenebilir).</li>
                            <li><strong>1 Yıllık Ausbildung:</strong> A2 ile başvurulabilir, mezuniyete kadar B1 istenir.</li>
                            <li><strong>Kısa Eğitimler:</strong> B1 veya B2 yeterlidir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="yas-diploma">
                        <AccordionTrigger>Yaş ve Diploma Şartları</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Yaş:</strong> Resmi üst yaş sınırı yoktur. 40-50 yaşında başlayanlar mevcuttur. (Bazı özel programlarda 35 yaş sınırı olabilir).</li>
                            <li><strong>Diploma:</strong> Genellikle lise diploması istenir. Ortaokul mezunu olup başlayanlar da vardır.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="denklik">
                        <AccordionTrigger>Denklik (Anerkennung)</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li>Diplomalar tercüme edilip Bezirksregierung'a gönderilir (Süre ~3 ay).</li>
                            <li>Kısmi denklik çıkarsa staj (Anpassungslehrgang) veya sınav (Kenntnisprüfung) gerekir.</li>
                            <li>Denklik almadan işe başlanabilir, ancak 3 ay sonra belge istenebilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-red-600" />
                      1.3. İş Arama ve Başvuru
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Başvuru Süreci</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          Önce işyeri (Praxisstelle) bulunur, sonra okulla anlaşılır. Hastaneler, Huzurevleri (Altenheim) ve Ambulante Dienst şirketlerine CV gönderilmelidir.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Belgeler:</strong> Lise diploması denkliği, sabıka kaydı, sağlık raporu, CV ve Motivasyon mektubu.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Staj ve Gönüllü Çalışma</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Praktikum:</strong> Başlamadan önce 1 ay staj istenebilir.</li>
                          <li><strong>Probearbeit:</strong> 2-5 günlük deneme çalışması.</li>
                          <li><strong>Bufti (Gönüllü):</strong> 6-12 ay süren, harçlık (250-500€) alınan resmi gönüllü hizmet. Dil ve tecrübe için harikadır.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Mülakat İpuçları</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Motivasyonunuz sorulur. Müslüman adaylara "karşı cinsin bakımını yapabilir misiniz?" sorusu gelebilir; açık ve net cevap verilmelidir.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: Göç ve Varış */}
            <section id="goc" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Plane className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  2. Göç Süreci ve Varış
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-red-600" />
                      2.1. Sosyal ve Maddi Güvence (Jobcenter)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Ausbildung maaşı (brüt ~1165€) geçim için yetmezse Jobcenter tamamlayıcı yardım yapabilir.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Yardımlar</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Regelleistung:</strong> Temel geçim (gıda vb.).</li>
                          <li><strong>Kira:</strong> Uygun (angemessen) kira bedeli karşılanır.</li>
                          <li><strong>Çocuk Zammı:</strong> Kinderzuschlag (max 140€).</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Dikkat Edilmesi Gerekenler</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Tüm gelir ve mal varlığı (TR dahil) bildirilmelidir.</li>
                          <li>Taşınmadan önce Jobcenter onayı alınmalıdır.</li>
                          <li>Şehir dışına çıkarken izin alınmalıdır.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      2.2. Sağlık ve Yerleşim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li><strong>Aşılar:</strong> Hepatit aşısı zorunludur. Kızamık aşısı da istenebilir.</li>
                      <li><strong>Konaklama:</strong> Bazı programlar dayalı döşeli daire (max 270€) ayarlayabilir.</li>
                      <li><strong>Oturum:</strong> Oturumu olmayanların da Ausbildung hakkı vardır. 3 yıllık eğitim oturum açısından daha avantajlıdır.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. Bölüm: İş ve Eğitim Hayatı */}
            <section id="is-hayati" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  3. İş ve Eğitim Hayatı
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-red-600" />
                      3.1. Ausbildung Detayları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">İçerik ve Yapı</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <strong>Dual Sistem:</strong> 2500 saat Pratik + 2100 saat Teori. 1 ay okul / 1 ay iş şeklinde olabilir.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Dersler:</strong> Bakım (Grundpflege), Anatomi, Hastalıklar. Sayısal ders çok azdır.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Maaş (Vergütung)</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>3 Yıllık:</strong> 1. Yıl ~1165€, 2. Yıl ~1250€, 3. Yıl ~1350€ (Brüt).</li>
                          <li><strong>1 Yıllık (Helfer):</strong> Aylık ortalama 750-900€ (Net).</li>
                          <li>Eğitim ücretini genellikle devlet karşılar.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-red-600" />
                      3.2. Çalışma Hayatı ve Kariyer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Görevler ve Ortam</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Hemşireler hasta temizliği dahil her işi yapar. Fiziksel olarak zorlayıcı olabilir (kaldırma vb.) ancak medikal aletler vardır.
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        İş ortamında hiyerarşiden ziyade yardımlaşma ön plandadır.
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="kariyer">
                        <AccordionTrigger>Kariyer Yolları</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Uzmanlaşma:</strong> 2. sınıftan sonra Çocuk veya Yaşlı bakımı seçilebilir.</li>
                            <li><strong>Yükselme:</strong> Stationleiter (Servis Sorumlusu) vb. olunabilir.</li>
                            <li><strong>Akademik:</strong> Lisans + Master ile öğretmenlik yapılabilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="betreuung">
                        <AccordionTrigger>Altenbetreuung (Refakatçi) Şartları</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            Fiziksel olarak hafiftir. Huzurevi veya evde bakımda çalışılır.
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <strong>Kazanç:</strong> Saatlik 11-18€. Tam zamanlı çalışılırsa ev geçindirilebilir.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Bölüm: Ek Bilgi */}
            <section id="ek-bilgi" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Info className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  4. Ek Bilgi ve Tavsiyeler
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Jobcenter Destekleri</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Kurs masraflarını karşılar (Ehliyet dahil olabilir).</li>
                        <li>CV hazırlama kursları verir.</li>
                        <li>İş reddi durumunda eksik kurs talep edilebilir.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Alternatifler</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Manevi Bakım (Seelsorge):</strong> Yaşlılara manevi destek.</li>
                        <li><strong>Sozialbetreuer:</strong> Mülteci yardımı vb. (Maaş 2800-3200€).</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic">
                      "Almanya'da her meslek evi geçindirir, önemli olan neyi yapacağınızı bilmek ve insanlara dokunacak meslekler yapmaktır. Bu mesleği seçenler genellikle vicdanlı, hoşgörülü ve sabırlı kişilerdir."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 5. Bölüm: Sıkça Sorulan Sorular */}
            <section id="sss" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  5. Sıkça Sorulan Sorular
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>Pflege ve Betreuung arasındaki temel fark nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <strong>Pflege (Bakım):</strong> Vücut ve sağlık bakımıdır. Bu alanda çalışanlar, hemşirelik personeli sayılırlar ve yaşlıların vücut bakımı, temizliği, alt değiştirme, yemek yedirme, banyo yaptırma dahil her şeyi yaparlar.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Betreuung (Refakat):</strong> Yaşlıların vücut ve sağlık bakımı dışındaki zamanlarında onlara eşlik etmektir. Görevler arasında aktivite yapma, gezinti, alışveriş, oyunlar oynama (kızma birader, rumikub, memory vb.) bulunur. Bu işte ağır fiziksel iş yoktur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-2">
                      <AccordionTrigger>Almanya’da temel bakım meslekleri (Pflege) hangi isimler altında toplanmıştır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          2020 yılından itibaren, tüm bakım meslekleri <strong>Generalistik</strong> adı altında tek bir çatı altında toplanmıştır. Temel meslekler:
                        </p>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Pflegefachfrau / Pflegefachmann:</strong> Genellikle 3 yıllık Ausbildung.</li>
                          <li><strong>Pflegehelfer / Altenpflegehelfer:</strong> Genellikle 1 yıllık Ausbildung.</li>
                          <li><strong>Betreuungskraft / Altenbetreuung:</strong> Kısa süreli sertifika eğitimi.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-3">
                      <AccordionTrigger>Pflegefachmann/frau olduktan sonra mesleğin günlük görev tanımı ne olur?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Görevlerin yaklaşık %80’i temel bakımdır (yemek yedirme, alt temizleme, banyo yaptırma, silme-kurulama). Geriye kalan %20’lik kısım ise tansiyon, şeker ölçme, ilaç takibi gibi teknik işlerdir. Burada refakatçi sistemi olmadığı için, Pflegefachkraft dahil herkes temel bakımı yapmak zorundadır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-4">
                      <AccordionTrigger>Krankenpfleger ile Altenpfleger aynı meslek grupları mıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Grup üyelerinin farklı görüşleri vardır. Bir arkadaş, hemşirelik denkliği yaptıktan sonra Krankenpfleger sertifikası aldığını belirtmiştir. Başka bir görüş, günlük işlerin çok benzer olduğunu ancak ders içeriklerinin Krankenschwester için daha detaylı olduğunu ifade eder.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-5">
                      <AccordionTrigger>3 yıllık Pflegefachkraft Ausbildung’a başlamak için gerekli minimum dil seviyesi nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Genellikle B2 Almanca sertifikası istenir. Ancak bazı eyaletlerde (örneğin NRW) B2 istenmektedir. Bazı okullar/firmalar, iyi Almanca konuşan adayları B2 sertifikası olmasa bile başlatabilmektedir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-6">
                      <AccordionTrigger>1 yıllık Pflegehelfer Ausbildung’a başlamak için gerekli minimum dil seviyesi nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Göçmenlere yönelik programlarda A2 sertifikası olanlar başvurabilir, ancak eğitim sırasında B2 seviyesine ulaşılması beklenir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-7">
                      <AccordionTrigger>Betreuungskraft (Refakatçi) kursuna başlamak için hangi dil seviyesi yeterlidir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Bu tür kısa süreli eğitimlere başlamak için B1 seviyesi genellikle yeterlidir. Hatta bazı firmalarda B1 ile başlayan arkadaşlar olduğu belirtilmiştir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-8">
                      <AccordionTrigger>Pflege meslekleri için Ausbildung'a başlamak için üst yaş sınırı var mıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Resmi bir yaş sınırı yoktur. Sınıflarda 40-50 yaş aralığında öğrenciler bulunmaktadır. Ancak, bazı özel Pflegeassistent programları için 35 yaşını aşmamış olma şartı aranabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-9">
                      <AccordionTrigger>Ausbildung için hangi eğitim seviyesinde diploma istenir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          En az lise ve dengi okul mezunu olmak şarttır. Türkiye'de sağlıkla ilgili bir bölüm bitirme şartı yoktur; isteyen herkes başvurabilir. Lise diploması ve transkriptinin denkliği (Anerkennung) için Bezirksregierung'a gönderilmesi gerekir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-10">
                      <AccordionTrigger>Türkiye’de alınan bir sertifikanın (Halk eğitim/Boğaziçi Enstitü vb.) geçerliliği var mıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Halk eğitim veya Boğaziçi Enstitü gibi kurslardan alınan sertifikalar, Almanya'da yaşlı bakım personeli olarak kabul edilmez.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-11">
                      <AccordionTrigger>Ausbildung'a (3 yıllık) başvuru süreci adım adım nasıl işler?</AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Karar Verme:</strong> Eğitimin başlangıç zamanına karar verilir (Mart/Nisan veya Eylül/Ekim).</li>
                          <li><strong>İş Yeri Bulma:</strong> Hastane, huzurevi veya ayakta bakım hizmetlerine başvuru yapılır.</li>
                          <li><strong>Okul Bulma:</strong> Okul başvurusu yapılır. Hastanelerin çoğu kendi okullarına sahiptir.</li>
                          <li><strong>Belgeler:</strong> Lise diploması denkliği, sabıka kaydı, sağlık raporu vb. hazırlanır.</li>
                          <li><strong>Praktikum:</strong> 1 ay süren ön staj tamamlanır.</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-12">
                      <AccordionTrigger>Ausbildung görüşmesinde (Vorstellungsgespräch) hangi hassas sorular sorulabilir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Mülakatlarda, özellikle Müslüman adaylara, karşı cins veya farklı cinsiyetten kişilere bakım (banyo yaptırma dahil) yapmaktan kaçınıp kaçınmayacaklarına dair sorular sorulur ve açık ve net cevap beklenir. Ayrıca mesaiye gelip gelmeme, çocuklu veya evli olmanın işi etkileyip etkilemeyeceği gibi sorular da yöneltilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-13">
                      <AccordionTrigger>Denklik almadan Almanya'da işe başlanabilir mi?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet, denklik süreci tamamlanmadan işe başlanabilir, ancak işveren genellikle 3 ay sonra denklik belgesini talep eder.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-14">
                      <AccordionTrigger>3 yıllık Pflegefachkraft Ausbildung ne kadar sürer ve içeriği nasıldır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Toplam 3 yıl sürer. Eğitim, Praxis (Pratik) ve Theori (Teori) olarak ikili (Dual) bir eğitimdir. Toplamda 2500 saat pratik ve 2100 saat teori içerir. Uygulama ve okul dönüşümlü olarak ilerler.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-15">
                      <AccordionTrigger>3 yıllık Pflegefachkraft Ausbildung’da aylık net maaş beklentisi nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Öğrenci maaşı kurumdan kuruma değişir. İlk yıl brüt 1165 Euro civarındadır. Net maaş aylık ortalama 850 Euro ile 1200 Euro arasında değişmektedir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-16">
                      <AccordionTrigger>Pflege mesleğinde fiziksel zorluklar nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Hastaları kaldırmak ve alt temizlemek fiziksel olarak zorlayıcıdır. Ancak, yeterli medikal aletler ve malzeme varsa, hastaları kaldırmaya gerek kalmadan bu aletlerle iş yapılabilir. İş arkadaşları arasında ciddi bir yardımlaşma vardır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-17">
                      <AccordionTrigger>Ausbildung maaşı aile geçimi için yetersiz kalırsa Jobcenter ek ödeme yapar mı?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet. Ausbildung sırasında alınan aylık maaş ailenin geçimi için yetersiz kalırsa, Jobcenter eksik kalan kısmı tamamlar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-18">
                      <AccordionTrigger>Redli (iltica başvurusu reddedilmiş) durumda olanlar Pflege Ausbildung'u yapabilir mi?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Redli durumda olanların Ausbildung yapma hakkı vardır. Ancak 1 yıllık Pflegehelfer Ausbildung'da sadece 1 yıllık oturum verilebileceği ve oturum için en az 2 yıllık Ausbildung gerektiği bilgisi mevcuttur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

              </TabsContent>

              <TabsContent value="experiences">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h3>
                  <ShareExperienceDialog 
                    professionSlug="hasta-yasli-bakimi"
                    defaultProfessionName="Hasta ve Yaşlı Bakım Personeli"
                  />
                </div>
                {experiences.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-slate-500 mb-4">Henüz bu alanda tecrübe paylaşılmamış.</p>
                      <Button variant="outline" asChild>
                        <Link href="#tecrube-paylas">İlk paylaşan sen ol</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {experiences.map((exp) => (
                      <Card key={exp.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{exp.title}</CardTitle>
                              <CardDescription>{exp.profession} - {exp.city}</CardDescription>
                            </div>
                            <Badge>{exp.years_of_experience} Yıl Tecrübe</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 dark:text-slate-400">{exp.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Örnek Dokümanlar</h3>
                  <UploadDocumentDialog 
                    professionSlug="hasta-yasli-bakimi"
                  />
                </div>
                <DocumentSection professionSlug="hasta-yasli-bakimi" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-900 dark:text-red-100">Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#baslangic" className="block p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 transition-colors">
                  1. Hazırlık ve Planlama
                </Link>
                <Link href="#goc" className="block p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 transition-colors">
                  2. Göç ve Varış
                </Link>
                <Link href="#is-hayati" className="block p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 transition-colors">
                  3. İş ve Eğitim Hayatı
                </Link>
                <Link href="#ek-bilgi" className="block p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 transition-colors">
                  4. Ek Bilgi
                </Link>
                <Link href="#sss" className="block p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 transition-colors">
                  5. SSS
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Euro className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ausbildung Maaşı</p>
                    <p className="font-medium text-slate-900 dark:text-white">1.165€ - 1.350€ (Brüt)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Eğitim Süresi</p>
                    <p className="font-medium text-slate-900 dark:text-white">1 veya 3 Yıl</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Languages className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Dil Şartı</p>
                    <p className="font-medium text-slate-900 dark:text-white">B1 - B2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog 
        professionSlug="hasta-yasli-bakimi"
        defaultProfessionName="Hasta ve Yaşlı Bakım Personeli"
      />
      <UploadDocumentDialog 
        professionSlug="hasta-yasli-bakimi"
      />
    </div>
  );
}
