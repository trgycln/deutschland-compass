'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export function FaqSection({ professionSlug, initialFaqs = [] }: { professionSlug: string; initialFaqs?: { question: string; answer: string }[] }) {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false); // Basit bir admin modu toggle'ı (gerçek auth eklenecek)

  // Yeni SSS ekleme state'leri
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, [professionSlug]);

  async function fetchFaqs() {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('profession_slug', professionSlug)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const fetchedFaqs = data || [];
      const staticFaqs = initialFaqs.map((f, i) => ({
        id: -1 - i,
        question: f.question,
        answer: f.answer
      }));

      setFaqs([...staticFaqs, ...fetchedFaqs]);
    } catch (error) {
      console.error('SSS yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddFaq() {
    if (!newQuestion || !newAnswer) return;

    try {
      const { error } = await supabase.from('faqs').insert([
        {
          profession_slug: professionSlug,
          question: newQuestion,
          answer: newAnswer,
          display_order: faqs.length + 1
        }
      ]);

      if (error) throw error;

      setNewQuestion('');
      setNewAnswer('');
      setIsDialogOpen(false);
      fetchFaqs(); // Listeyi yenile
    } catch (error) {
      console.error('SSS eklenirken hata:', error);
      alert('Ekleme başarısız oldu.');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            Sıkça Sorulan Sorular
          </CardTitle>
          <CardDescription>
            Topluluktan gelen en popüler sorular ve cevapları.
          </CardDescription>
        </div>
        {/* Geçici Admin Butonu - İleride gerçek admin paneline taşınacak */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          {isAdminMode ? 'Admin Modu Kapat' : 'Yönet'}
        </Button>
      </CardHeader>
      <CardContent>
        {faqs.length === 0 ? (
          <p className="text-center text-slate-500 py-4">Henüz soru eklenmemiş.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {isAdminMode && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full gap-2" variant="outline">
                  <PlusCircle className="w-4 h-4" />
                  Yeni Soru Ekle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni SSS Ekle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Soru</Label>
                    <Input 
                      value={newQuestion} 
                      onChange={(e) => setNewQuestion(e.target.value)} 
                      placeholder="Örn: ZAB başvurusu ne kadar sürer?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cevap</Label>
                    <Textarea 
                      value={newAnswer} 
                      onChange={(e) => setNewAnswer(e.target.value)} 
                      placeholder="Detaylı cevap..."
                      className="h-32"
                    />
                  </div>
                  <Button onClick={handleAddFaq} className="w-full">Kaydet</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
