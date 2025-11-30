import { supabase } from '@/lib/supabase';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Calendar, User } from 'lucide-react';

export const revalidate = 0; // Sayfanın her istekte güncel olmasını sağlar

async function getExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }

  return data;
}

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Tecrübe Paylaşımları
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Almanya'ya göç sürecinde yaşanan gerçek hikayeler, zorluklar ve çözüm yolları. 
            Başkalarının tecrübelerinden öğrenin, kendi hikayenizle yol gösterin.
          </p>
          <div className="flex justify-center">
            <ShareExperienceDialog />
          </div>
        </div>
      </div>

      {/* Experiences List */}
      <div className="container mx-auto px-4 py-12">
        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 shadow-sm border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
              <Quote className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Henüz Paylaşım Yok</h3>
              <p className="text-slate-500 mb-6">
                İlk tecrübeyi paylaşan siz olun ve topluluğa katkıda bulunun.
              </p>
              <ShareExperienceDialog />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => (
              <Card key={exp.id} className="flex flex-col hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100">
                      {exp.profession}
                    </Badge>
                    <Quote className="w-5 h-5 text-slate-300 shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">
                      {exp.content}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{exp.name || 'Anonim'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
