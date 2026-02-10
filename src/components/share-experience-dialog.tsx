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
import { Loader2, CheckCircle2 } from "lucide-react"

export function ShareExperienceDialog({ professionSlug, defaultProfessionName = "Matematik Öğretmenliği" }: { professionSlug?: string, defaultProfessionName?: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    profession: defaultProfessionName,
    content: ""
  })

  const handleSubmit = async () => {
    if (!formData.content) return

    setLoading(true)
    console.log('📝 Tecrübe gönderilmeye çalışıyor:', { profession: formData.profession, contentLength: formData.content.length })
    
    try {
      console.log('🔌 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Tanımlı' : 'EKSIK')
      console.log('🔑 Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Tanımlı' : 'EKSIK')
      
      const { error } = await supabase
        .from('experiences')
        .insert([
          { 
            name: 'Anonim', // Her zaman anonim
            profession: formData.profession,
            content: formData.content,
            status: 'pending' // Onay bekleyen durumunda
          }
        ])

      if (error) {
        console.error('❌ Supabase hata:', error)
        throw error
      }

      console.log('✅ Tecrübe başarıyla gönderildi')
      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFormData({ ...formData, content: "" })
      }, 2000)
    } catch (error) {
      console.error('💥 Gönderim hatası:', error)
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
      alert(`Gönderim başarısız: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="font-semibold">
          Tecrübe Paylaş
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tecrübeni Paylaş</DialogTitle>
          <DialogDescription>
            Yaşadığın süreci, zorlukları ve çözüm yollarını paylaşarak diğerlerine ışık tut.
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-green-600">
            <CheckCircle2 className="w-12 h-12 mb-2" />
            <p className="font-medium text-center">Teşekkürler! Tecrübeniz moderasyon onayına gönderildi.</p>
            <p className="text-sm text-slate-500 mt-2 text-center">İçeriğiniz incelendikten sonra anonim olarak yayınlanacaktır.</p>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 text-sm text-blue-800 dark:text-blue-200">
              <p className="font-semibold mb-1">Gizlilik ve Güvenlik Notu:</p>
              <p>Paylaşımlarınız tamamen <strong>anonim</strong> olarak yayınlanır. Lütfen metin içerisinde kendinizin veya başkalarının ad-soyad, telefon, e-posta gibi kişisel bilgilerini paylaşmayınız.</p>
            </div>
            <div className="grid gap-4 py-4">
              {/* İsim alanı kaldırıldı - Tamamen anonim */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profession" className="text-right">
                  Meslek
                </Label>
                <Input 
                  id="profession" 
                  className="col-span-3"
                  value={formData.profession}
                  onChange={(e) => setFormData({...formData, profession: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Tecrübeniz
                </Label>
                <Textarea 
                  id="experience" 
                  placeholder="Mekan, yemek, hizmet, ortam veya helallik hassasiyetiyle ilgili tecrübenizi paylaşın..." 
                  className="col-span-3 h-32"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} disabled={loading || !formData.content}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gönder (Onay Bekleyecek)
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
