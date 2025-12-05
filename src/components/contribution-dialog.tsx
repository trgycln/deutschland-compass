"use client";

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle2, MessageSquare, UploadCloud, X, FileText } from "lucide-react"

export function ContributionDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    content: ""
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      // Toplam boyut kontrolü (örn: 50MB)
      const totalSize = [...files, ...newFiles].reduce((acc, file) => acc + file.size, 0)
      if (totalSize > 50 * 1024 * 1024) {
        alert("Toplam dosya boyutu 50MB'ı geçemez.")
        return
      }
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!formData.content && files.length === 0) return

    setLoading(true)
    try {
      let uploadedFileUrls: string[] = []

      // Dosyaları yükle
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop()
          const fileName = `contribution_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
          const filePath = `contributions/${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file)

          if (uploadError) {
            console.error(`Error uploading ${file.name}:`, uploadError)
            continue
          }

          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath)
          
          uploadedFileUrls.push(`- [${file.name}](${publicUrl})`)
        }
      }

      // İletişim bilgisini ve dosya linklerini içeriğe ekle
      let finalContent = formData.content
      
      if (uploadedFileUrls.length > 0) {
        finalContent += `\n\n--- Yüklenen Dosyalar ---\n${uploadedFileUrls.join('\n')}`
      }

      finalContent += `\n\n--- İletişim Bilgisi ---\n${formData.contact || 'Belirtilmedi'}`

      const { error } = await supabase
        .from('experiences')
        .insert([
          { 
            name: formData.name || 'Anonim Katılımcı',
            profession: 'Genel Katkı / Öneri',
            content: finalContent,
            status: 'pending'
          }
        ])

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFormData({ name: "", contact: "", content: "" })
        setFiles([])
      }, 3000)
    } catch (error) {
      console.error('Error submitting contribution:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold">
            <MessageSquare className="mr-2 h-5 w-5" />
            Katkıda Bulun
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Katkıda Bulun & Öneri Gönder</DialogTitle>
          <DialogDescription>
            Yeni bir meslek rehberi oluşturmamız için bilgi, döküman veya tecrübelerinizi paylaşın.
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-green-600">
            <CheckCircle2 className="w-12 h-12 mb-2" />
            <p className="font-medium text-center">Teşekkürler! Mesajınız editör ekibimize iletildi.</p>
            <p className="text-sm text-slate-500 mt-2 text-center">En kısa sürede değerlendirip sisteme kazandıracağız.</p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">İsim (İsteğe bağlı)</Label>
              <Input 
                id="name" 
                placeholder="Adınız"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contact">İletişim / E-posta (Size ulaşmamız için)</Label>
              <Input 
                id="contact" 
                placeholder="ornek@email.com"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>

            <div className="grid gap-2">
              <Label>Dosya Yükle (İsteğe bağlı)</Label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-24 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                  >
                    <span className="flex items-center space-x-2">
                      <UploadCloud className="w-6 h-6 text-gray-600" />
                      <span className="font-medium text-gray-600">
                        Dosyaları seçin veya sürükleyin
                      </span>
                    </span>
                  </Label>
                </div>
                
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-md border text-sm">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 flex-shrink-0 text-blue-500" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-slate-400 flex-shrink-0">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Mesajınız / Bilgiler / Öneriler</Label>
              <Textarea 
                id="content" 
                className="min-h-[150px]"
                placeholder="Hangi meslek hakkında bilgi vermek istersiniz? Elinizde hangi kaynaklar var? Kısaca bahsedin..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
          </div>
        )}

        {!success && (
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={loading || (!formData.content && files.length === 0)} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gönder
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
