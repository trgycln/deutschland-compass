"use client";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { DocumentSection } from '@/components/document-section';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageSquare, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FoodGuidePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .eq('category', 'food-guide')
        .order('created_at', { ascending: false });
      if (data) setExperiences(data);
    }
    async function fetchDocuments() {
      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'approved')
        .eq('category', 'food-guide')
        .order('created_at', { ascending: false });
      if (data) setDocuments(data);
    }
    fetchExperiences();
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Almanya Yemek Mekanları &amp; Tavsiyeler</h1>
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="w-full justify-start h-auto p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <TabsTrigger value="guide" className="px-6 py-3 rounded-lg data-[state=active]:bg-red-50 dark:data-[state=active]:bg-red-900/20 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400">
              <BookOpen className="w-4 h-4 mr-2" />
              Mekanlar
            </TabsTrigger>
            <TabsTrigger value="experiences" className="px-6 py-3 rounded-lg data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tecrübeler
            </TabsTrigger>
            <TabsTrigger value="documents" className="px-6 py-3 rounded-lg data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400">
              <FileText className="w-4 h-4 mr-2" />
              Dökümanlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  Mekanlar ve Tavsiyeler
                </CardTitle>
              </CardHeader>
              {/* Burada foodGuideData'dan mekanlar listelenebilir */}
            </Card>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-8">
            <ShareExperienceDialog category="food-guide" />
            <div className="space-y-4">
              {experiences.map(exp => (
                <Card key={exp.id}>
                  <CardHeader>
                    <CardTitle>{exp.title}</CardTitle>
                  </CardHeader>
                  <div className="p-4">{exp.content}</div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-8">
            <DocumentSection category="food-guide" documents={documents} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
