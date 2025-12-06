'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Calendar } from 'lucide-react';
import { professionsList } from '@/data/professions-list';

type Experience = {
  id: number;
  created_at: string;
  name: string;
  profession: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

export function ExperienceSection({ professionSlug }: { professionSlug: string }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Filter experiences based on profession slug
        const currentProfession = professionsList.find(p => p.slug === professionSlug);
        
        let filteredData = data || [];
        
        if (currentProfession) {
          const keywords = [
            currentProfession.title.toLowerCase(),
            ...(currentProfession.keywords || []).map(k => k.toLowerCase())
          ];

          filteredData = filteredData.filter(exp => {
            const expProfession = (exp.profession || '').toLowerCase();
            // Check if experience profession matches title or any keyword
            return keywords.some(keyword => expProfession.includes(keyword));
          });
        }

        setExperiences(filteredData);
      } catch (error) {
        console.error('Tecrübeler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, [professionSlug]);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed">
        <p className="text-slate-500 dark:text-slate-400">Henüz onaylanmış bir tecrübe paylaşımı bulunmuyor.</p>
        <p className="text-sm text-slate-400 mt-2">İlk paylaşan siz olun!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {experiences.map((exp) => (
        <Card key={exp.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium">{exp.name || 'Anonim'}</CardTitle>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(exp.created_at).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs font-normal">
                {exp.profession}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {exp.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
