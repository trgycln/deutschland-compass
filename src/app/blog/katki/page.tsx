"use client";

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertTriangle, UploadCloud } from "lucide-react"

export default function ContributeBlogPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.category) return

    setLoading(true)
    try {
      // Slug oluşturma
      const slug = formData.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim() + '-' + Date.now().toString().slice(-4);

      const { error } = await supabase
        .from('blogs')
        .insert([
          { 
            title: formData.title,
            slug: slug,
            content: formData.content,
            excerpt: formData.content.substring(0, 150) + '...',
            category: formData.category,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            author: 'Misafir Yazar', // Anonim
            is_published: false, // Onay bekliyor
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSuccess(true)
      setFormData({ title: "", category: "", content: "", tags: "" })
    } catch (error) {
      console.error('Error submitting blog:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-900">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Yazınız Başarıyla Gönderildi!</h2>
          <p className="text-green-700 dark:text-green-300 mb-6">
            Değerli katkınız için teşekkür ederiz. Yazınız moderasyon ekibimiz tarafından incelendikten sonra, 
            topluluk kurallarına uygun bulunması halinde yayınlanacaktır.
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
            Yeni Bir Yazı Daha Yaz
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Blog Yazısı Gönder</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Tecrübelerinizi, araştırmalarınızı veya rehber niteliğindeki yazılarınızı toplulukla paylaşın.
        </p>
      </div>

      <Alert className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200 font-semibold">Yazım Kuralları ve İpuçları</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 mt-2 text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>Yazınızın tamamen <strong>anonim</strong> olarak yayınlanacağını unutmayın.</li>
            <li>Kişisel verilerinizi (telefon, email, açık adres) metin içinde paylaşmayınız.</li>
            <li>Yazınızın anlaşılır, imla kurallarına uygun ve bilgilendirici olmasına özen gösterin.</li>
            <li>Reklam, nefret söylemi veya yanıltıcı bilgi içeren yazılar yayınlanmayacaktır.</li>
            <li>Varsa kaynaklarınızı belirtmeniz güvenilirliği artıracaktır.</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>İçerik Detayları</CardTitle>
          <CardDescription>
            Yazınızın başlığı ve içeriği arama sonuçlarında görünecektir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Yazı Başlığı</Label>
              <Input 
                id="title" 
                placeholder="Örn: Almanya'da Öğretmenlik Denklik Sürecinde Yaşadıklarım" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deneyim">Deneyim Paylaşımı</SelectItem>
                    <SelectItem value="rehber">Rehber / Bilgi</SelectItem>
                    <SelectItem value="egitim">Eğitim / Okul</SelectItem>
                    <SelectItem value="yasam">Günlük Yaşam</SelectItem>
                    <SelectItem value="burokrasi">Bürokrasi / Resmi İşler</SelectItem>
                    <SelectItem value="diger">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Etiketler (Virgülle ayırın)</Label>
                <Input 
                  id="tags" 
                  placeholder="Örn: denklik, öğretmenlik, hessen" 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">İçerik</Label>
              <Textarea 
                id="content" 
                placeholder="Yazınızı buraya yazın..." 
                className="min-h-[300px] text-base leading-relaxed"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
              <p className="text-xs text-slate-500 text-right">
                En az 300 kelime olması tavsiye edilir.
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  <UploadCloud className="w-6 h-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Dosya veya Görsel Ekle (Opsiyonel)</p>
                  <p className="text-xs text-slate-500">Şu an için dosya yükleme özelliği aktif değildir. Yazınız onaylandıktan sonra editörlerimiz gerekirse görsel ekleyecektir.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={() => window.history.back()}>
                İptal
              </Button>
              <Button type="submit" disabled={loading} className="min-w-[150px]">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  'Yazıyı Gönder'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
