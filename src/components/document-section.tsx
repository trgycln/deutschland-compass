"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, Download, File, FileSpreadsheet, FileCode } from 'lucide-react';

type Document = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  uploader_name: string;
  status: 'pending' | 'approved' | 'rejected';
};

function getFileIcon(fileType: string) {
  if (!fileType) return <File className="w-8 h-8 text-slate-400" />;
  
  const type = fileType.toLowerCase();
  if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
  if (type.includes('doc')) return <FileText className="w-8 h-8 text-blue-500" />;
  if (type.includes('xls') || type.includes('sheet')) return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
  if (type.includes('ppt') || type.includes('presentation')) return <FileCode className="w-8 h-8 text-orange-500" />; // Presentation icon alternative
  
  return <File className="w-8 h-8 text-slate-400" />;
}

export function DocumentSection({ professionSlug }: { professionSlug: string }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('profession_slug', professionSlug)
          .eq('status', 'approved')
          .order('created_at', { ascending: true });

        if (error) throw error;
        console.log(`Fetched ${data?.length} documents for ${professionSlug}`);
        setDocuments(data || []);
      } catch (error: any) {
        console.error('Dokümanlar yüklenirken hata:', error.message || error);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [professionSlug]);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed">
        <p className="text-slate-500 dark:text-slate-400">Henüz bu alanda paylaşılmış bir doküman bulunmuyor.</p>
        <p className="text-sm text-slate-400 mt-2">Elindeki kaynakları paylaşarak topluluğa katkıda bulunabilirsin.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {documents.map((doc) => (
          <div key={doc.id} className="flex flex-col gap-3 px-4 py-3 md:px-5 md:py-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  {getFileIcon(doc.file_type)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 truncate" title={doc.title}>{doc.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(doc.created_at).toLocaleDateString('tr-TR')} • {doc.uploader_name || 'Anonim'}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[11px] uppercase tracking-wide">{doc.file_type || 'dosya'}</Badge>
            </div>

            {doc.description && (
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 md:line-clamp-3">
                {doc.description}
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Boyut: {doc.file_size || '—'}
              </div>
              <Button size="sm" variant="outline" asChild>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Download className="w-4 h-4" />
                  İndir
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
