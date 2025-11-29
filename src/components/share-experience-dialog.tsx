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
    try {
      const { error } = await supabase
        .from('experiences')
        .insert([
          { 
            name: formData.name || 'Anonim',
            profession: formData.profession,
            content: formData.content,
            status: 'pending' // Onay bekleyen durumunda
          }
        ])

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFormData({ ...formData, content: "" })
      }, 2000)
    } catch (error) {
      console.error('Error submitting experience:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
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
            <p className="font-medium">Teşekkürler! Tecrübeniz onaya gönderildi.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Ad Soyad
                </Label>
                <Input 
                  id="name" 
                  placeholder="İsimsiz de olabilir" 
                  className="col-span-3"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
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
                  placeholder="Denklik sürecinde yaşadıklarım..." 
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
