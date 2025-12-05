'use client';

import { careerGuideData } from '@/data/career-guide-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Map, BookOpen, Briefcase, GraduationCap, AlertCircle } from 'lucide-react';
import { DocumentSection } from '@/components/document-section';

export default function CareerGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-4">Rehber</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            {careerGuideData.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {careerGuideData.description}
          </p>
        </div>

        {/* Video Section */}
        <Card className="mb-12 overflow-hidden border-none shadow-xl bg-slate-900 text-white">
          <CardContent className="p-0 aspect-video relative flex items-center justify-center bg-slate-800">
            {careerGuideData.videoUrl ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={careerGuideData.videoUrl} 
                title="Kariyer Rehberi Videosu" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-slate-300 font-medium">Video Rehber Yakında Eklenecek</p>
                <p className="text-sm text-slate-500 mt-2">NotebookLM tarafından hazırlanan özet video.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-12">
          {careerGuideData.sections.map((section, index) => (
            <section key={section.id} className="scroll-mt-20" id={section.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold text-lg shrink-0">
                  {index + 1}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {section.title.replace(/^[IVX]+\.\s/, '')}
                </h2>
              </div>

              <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {section.content}
                  </p>

                  {section.subsections && (
                    <Accordion type="single" collapsible className="w-full">
                      {section.subsections.map((sub: any, subIndex) => (
                        <AccordionItem key={subIndex} value={`item-${index}-${subIndex}`}>
                          <AccordionTrigger className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            {sub.title}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-4 text-slate-600 dark:text-slate-400">
                            {sub.text && <p>{sub.text}</p>}
                            
                            {sub.items && (
                              <div className="grid gap-4">
                                {sub.items.map((item: any, itemIndex: number) => (
                                  <div key={itemIndex} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                      {item.subtitle}
                                    </h4>
                                    <p className="text-sm leading-relaxed">{item.text}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {sub.list && (
                              <ul className="space-y-2 list-disc list-inside ml-2">
                                {sub.list.map((li: any, liIndex: number) => (
                                  <li key={liIndex} className="leading-relaxed">{li}</li>
                                ))}
                              </ul>
                            )}

                            {sub.table && (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                  <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                                    <tr>
                                      {sub.table.headers.map((h: any, hIndex: number) => (
                                        <th key={hIndex} className="px-4 py-3 rounded-t-lg">{h}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sub.table.rows.map((row: any, rIndex: number) => (
                                      <tr key={rIndex} className="bg-white border-b dark:bg-slate-900 dark:border-slate-800">
                                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row.type}</td>
                                        <td className="px-4 py-3">{row.areas}</td>
                                        <td className="px-4 py-3 text-slate-500">{row.desc}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {/* Analogy Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/30 border-indigo-100 dark:border-indigo-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Map className="w-6 h-6" />
                {careerGuideData.analogy.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-indigo-900 dark:text-indigo-100 italic leading-relaxed">
                "{careerGuideData.analogy.text}"
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        {careerGuideData.faqs && (
          <div className="mt-16 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sıkça Sorulan Sorular</h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {careerGuideData.faqs.map((faq, index) => (
                <Card key={index} className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <AccordionItem value={`faq-${index}`} className="border-none px-6">
                    <AccordionTrigger className="text-left text-lg font-medium text-slate-900 dark:text-slate-100 hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </div>
        )}

        {/* Documents Section */}
        <DocumentSection professionSlug="kariyer-yolu" />

      </div>
    </div>
  );
}
