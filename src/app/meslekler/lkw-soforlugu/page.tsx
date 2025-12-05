import React from 'react';
import { Metadata } from 'next';
import { lkwDriverData } from '@/data/lkw-driver-data';
import { ArrowLeft, BookOpen, Briefcase, GraduationCap, HelpCircle, FileText, Share2, Upload } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { DocumentSection } from '@/components/document-section';

export const metadata: Metadata = {
  title: 'LKW Fahrer (Tır Şoförlüğü) | Almanya Kariyer Rehberi',
  description: 'Almanya\'da tır şoförü olmak, ehliyet sınıfları, Kod 95, vize süreçleri ve çalışma şartları hakkında detaylı rehber.',
};

export default function LkwDriverPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            href="/meslekler" 
            className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Meslekler Listesine Dön
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border-0">
                  Ulaşım & Lojistik
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Güncel: Aralık 2025
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {lkwDriverData.title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                {lkwDriverData.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {lkwDriverData.stats.map((stat, index) => (
                  <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 backdrop-blur-sm">
                    <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${stat.color}`} />
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <Card className="w-full lg:w-80 bg-slate-800 border-slate-700 text-slate-100 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-orange-400" />
                  Katkıda Bulun
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Bu rehberi geliştirmemize yardım edin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ShareExperienceDialog professionSlug="lkw-soforlugu" defaultProfessionName="LKW Fahrer" />
                <UploadDocumentDialog professionSlug="lkw-soforlugu" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8">
        <Tabs defaultValue="roadmap" className="space-y-8">
          <TabsList className="w-full justify-start h-auto p-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto flex-nowrap">
            <TabsTrigger value="roadmap" className="flex gap-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
              <GraduationCap className="w-4 h-4" />
              Yol Haritası
            </TabsTrigger>
            <TabsTrigger value="pedagogy" className="flex gap-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
              <BookOpen className="w-4 h-4" />
              Pedagojik Yaklaşım
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex gap-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
              <HelpCircle className="w-4 h-4" />
              SSS
            </TabsTrigger>
            <TabsTrigger value="experiences" className="flex gap-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
              <Briefcase className="w-4 h-4" />
              Deneyimler
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex gap-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
              <FileText className="w-4 h-4" />
              Dokümanlar
            </TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid gap-6">
              {lkwDriverData.roadmap.map((step, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-900">{step.title}</CardTitle>
                        <CardDescription className="text-slate-600 mt-1">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            {detail.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {detail.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pedagogy Tab */}
          <TabsContent value="pedagogy">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  {lkwDriverData.pedagogy.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg leading-relaxed text-slate-700 bg-orange-50 p-6 rounded-xl border border-orange-100">
                    {lkwDriverData.pedagogy.content}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      Gereken Yetkinlikler
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {lkwDriverData.pedagogy.specialNeeds}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <Share2 className="w-5 h-5" />
                      </div>
                      Faydalı Kaynaklar
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {lkwDriverData.pedagogy.resources}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-orange-500" />
                  Sıkça Sorulan Sorular
                </CardTitle>
                <CardDescription>
                  LKW şoförlüğü hakkında en çok merak edilen konular
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {lkwDriverData.faq.map((item, index) => (
                    <div 
                      key={index} 
                      className="group border border-slate-200 rounded-xl p-6 hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-200"
                    >
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold mt-0.5">
                          ?
                        </span>
                        {item.question}
                      </h3>
                      <p className="text-slate-600 leading-relaxed pl-9">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-orange-500" />
                  Kullanıcı Deneyimleri
                </CardTitle>
                <CardDescription>
                  Bu alanda çalışanların tecrübeleri ve tavsiyeleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Henüz deneyim paylaşılmamış</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-6">
                    Bu meslekte tecrübeniz varsa, diğer adaylara yardımcı olmak için deneyimlerinizi paylaşabilirsiniz.
                  </p>
                  <ShareExperienceDialog professionSlug="lkw-soforlugu" defaultProfessionName="LKW Fahrer" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <DocumentSection profession_slug="lkw-soforlugu" />
                  <UploadDocumentDialog professionSlug="lkw-soforlugu" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
