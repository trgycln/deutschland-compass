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
          .order('created_at', { ascending: false });

        if (error) throw error;
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="flex flex-col hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                {getFileIcon(doc.file_type)}
              </div>
              <Badge variant="outline" className="text-xs uppercase">
                {doc.file_type}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-2" title={doc.title}>
              {doc.title}
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
              {doc.description || 'Açıklama yok.'}
            </p>
            
            <div className="mt-auto pt-4 border-t flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span className="block font-medium text-slate-600 dark:text-slate-300">{doc.uploader_name}</span>
                <span>{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              
              <Button size="sm" variant="outline" asChild>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Download className="w-4 h-4" />
                  İndir
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
