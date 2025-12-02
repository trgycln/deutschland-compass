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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, UploadCloud, FileText, X, Shield } from "lucide-react"

export function UploadDocumentDialog({ professionSlug }: { professionSlug: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // 10MB limit
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Dosya boyutu 10MB'dan küçük olmalıdır.")
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file || !formData.title) return

    setLoading(true)
    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
      const filePath = `${professionSlug}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      // 2. Insert record into database
      const { error: dbError } = await supabase
        .from('documents')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            file_url: publicUrl,
            file_type: fileExt,
            file_size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            uploader_name: 'Anonim',
            profession_slug: professionSlug,
            status: 'approved'
          }
        ])

      if (dbError) throw dbError

      setOpen(false)
      setFile(null)
      setFormData({ title: "", description: "" })
      alert("Doküman başarıyla yüklendi.")
      window.location.reload() // Sayfayı yenile ki liste güncellensin

    } catch (error: any) {
      console.error('Upload error:', error)
      alert('Yükleme sırasında bir hata oluştu: ' + (error.message || error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UploadCloud className="w-4 h-4" />
          Doküman Yükle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Doküman Paylaş</DialogTitle>
          <DialogDescription>
            Faydalı olacağını düşündüğünüz ders notları, sunumlar veya rehberleri paylaşın.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Gizlilik ve Güvenlik</AlertTitle>
            <AlertDescription className="text-blue-700 text-xs">
              Paylaşımlarınız tamamen <strong>anonim</strong> olarak yayınlanır. İsim veya kişisel bilgi talep edilmez. 
              Tüm içerikler editör onayından sonra yayınlanır.
            </AlertDescription>
          </Alert>

          <div className="grid gap-2">
            <Label htmlFor="title">Doküman Başlığı *</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Örn: 9. Sınıf Geometri Ders Notları"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Doküman içeriği hakkında kısa bilgi..."
            />
          </div>

          <div className="grid gap-2">
            <Label>Dosya Seç (PDF, Word, PPT - Max 10MB)</Label>
            {!file ? (
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-500 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                />
                <UploadCloud className="w-8 h-8 mb-2" />
                <span className="text-sm">Dosya seçmek için tıklayın veya sürükleyin</span>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 text-blue-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium truncate max-w-[250px]">{file.name}</span>
                  <span className="text-xs opacity-70">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="h-8 w-8 text-blue-700 hover:text-blue-900 hover:bg-blue-100">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading || !file || !formData.title}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yükle ve Gönder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
