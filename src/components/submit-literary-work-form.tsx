"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PenTool, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mevcut yazarlar (Supabase'den çekilebilir ama şimdilik static)
const EXISTING_AUTHORS = [
  'Yusuf Salih',
  'Halil (İsimsizler)',
  'Tuba (T.Ö.)',
  'Ömer Yaman (Titaniumberatung)',
  'Sezer Bingöl',
  'Hava Çiftçiler',
  'Küçük Ömer',
  'Süleyman Sargın / Deruni',
  'Banu Elvangil',
  'Canan (Cnn07)',
  'Dilek',
  'Frau Isik',
  'Ahmet 1234 / Cafer Baser',
  'Nurluayy'
];

const WORK_TYPES = [
  'Şiir',
  'Deneme',
  'Öykü',
  'Deneme/Şiir',
  'Akrostiş Şiir',
  'Kısa Öykü'
];

const SUGGESTED_TAGS = [
  'Gurbet', 'Anne', 'Hapis', 'Göç', 'Kader', 'Hasret', 'Ayrılık',
  'Adalet', 'Zulüm', 'Umut', 'Sabır', 'Yalnızlık', 'Acı', 'Sevgi',
  'Vatan', 'Hayat', 'İmtihan', 'Dert'
];

export function SubmitLiteraryWorkForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state
  const [authorType, setAuthorType] = useState<'existing' | 'new'>('existing');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');

  // Tarih otomatik (bugünün tarihi)
  useEffect(() => {
    const today = new Date();
    const formatted = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
    setDate(formatted);
  }, []);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const author = authorType === 'existing' ? selectedAuthor : newAuthor;

    // Validation
    if (!author || !title || !type || !content) {
      setErrorMessage('Lütfen tüm zorunlu alanları doldurun');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/literary-works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          date,
          type,
          tags,
          content
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setSubmitStatus('success');
      // 3 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        router.push('/gurbet-kalemleri');
      }, 3000);
    } catch (error: any) {
      console.error('Submit error:', error);
      setErrorMessage(error.message || 'Eser gönderilirken bir hata oluştu');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <PenTool className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Eserinizi Paylaşın
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Şiirinizi, denemenizi veya öykünüzü Gurbet Kalemleri'ne ekleyin
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <Alert className="mb-6 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Eseriniz başarıyla yayınlanmıştır! Antolojiye hemen eklenmiştir. Yönlendiriliyorsunuz...
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="mb-6 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Eser Bilgileri</CardTitle>
            <CardDescription>
              Eserinizin bilgilerini dikkatli bir şekilde doldurun. Tüm alanlar zorunludur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Yazar Seçimi */}
              <div className="space-y-4">
                <Label>Yazar *</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="existing-author"
                      checked={authorType === 'existing'}
                      onChange={() => setAuthorType('existing')}
                      className="w-4 h-4"
                    />
                    <label htmlFor="existing-author" className="text-sm">Mevcut Yazar</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="new-author"
                      checked={authorType === 'new'}
                      onChange={() => setAuthorType('new')}
                      className="w-4 h-4"
                    />
                    <label htmlFor="new-author" className="text-sm">Yeni Yazar</label>
                  </div>
                </div>

                {authorType === 'existing' ? (
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yazar seçin..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectGroup>
                        <SelectLabel>Mevcut Yazarlar</SelectLabel>
                        {EXISTING_AUTHORS.map(author => (
                          <SelectItem key={author} value={author}>{author}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    placeholder="Yazar adınızı girin..."
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                  />
                )}
              </div>

              {/* Başlık */}
              <div className="space-y-2">
                <Label htmlFor="title">Eser Başlığı *</Label>
                <Input
                  id="title"
                  placeholder="Örn: Gurbet Türküsü"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Tarih */}
              <div className="space-y-2">
                <Label htmlFor="date">Tarih *</Label>
                <Input
                  id="date"
                  placeholder="GG.AA.YYYY"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <p className="text-xs text-slate-500">Format: GG.AA.YYYY (Örn: 08.02.2026)</p>
              </div>

              {/* Tür */}
              <div className="space-y-2">
                <Label htmlFor="type">Eser Türü *</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tür seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPES.map(workType => (
                      <SelectItem key={workType} value={workType}>{workType}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Etiketler */}
              <div className="space-y-2">
                <Label>Etiketler (Opsiyonel)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {SUGGESTED_TAGS.map(tag => (
                    <Badge
                      key={tag}
                      variant={tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                    {tags.map(tag => (
                      <Badge key={tag} className="gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Input
                    placeholder="Özel etiket ekle..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(customTag);
                        setCustomTag('');
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      addTag(customTag);
                      setCustomTag('');
                    }}
                  >
                    Ekle
                  </Button>
                </div>
              </div>

              {/* İçerik */}
              <div className="space-y-2">
                <Label htmlFor="content">Eser İçeriği *</Label>
                <Textarea
                  id="content"
                  placeholder="Eserinizin tam metnini buraya yazın..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  className="font-serif"
                  required
                />
                <p className="text-xs text-slate-500">
                  Satır aralarını koruyarak yazın. Şiirler için dizeler arasında Enter kullanın.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <PenTool className="mr-2 h-4 w-4" />
                      Eser Gönder
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  İptal
                </Button>
              </div>

              <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <AlertDescription className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Not:</strong> Gönderdiğiniz eser moderasyon onayından sonra yayınlanacaktır. 
                  Lütfen telif haklarına saygılı olun ve sadece kendi eserlerinizi gönderin.
                </AlertDescription>
              </Alert>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
