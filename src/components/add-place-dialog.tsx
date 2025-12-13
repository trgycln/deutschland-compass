"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const COUNTRIES = ["Almanya", "Hollanda", "Belçika", "Fransa", "Avusturya", "İsviçre", "İtalya", "Diğer"];

export function AddPlaceDialog({ onPlaceAdded }: { onPlaceAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    food: "",
    address: "",
    note: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.country || !formData.city) {
      toast.error("Lütfen zorunlu alanları (Mekan Adı, Ülke, Şehir) doldurun.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase
      .from('places')
      .insert([{
        name: formData.name,
        country: formData.country,
        city: formData.city,
        food: formData.food,
        address: formData.address,
        note: formData.note,
        highlight: false,
        warning: false
      }]);

    setIsLoading(false);

    if (error) {
      console.error(error);
      toast.error("Bir hata oluştu, mekan eklenemedi.");
    } else {
      toast.success("Mekan başarıyla listeye eklendi! Teşekkürler.");
      setFormData({ name: "", country: "", city: "", food: "", address: "", note: "" });
      setOpen(false);
      // Ana sayfadaki listeyi yenilet
      onPlaceAdded();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-white font-semibold gap-2 shadow-lg hover:scale-105 transition-all">
          <PlusCircle className="w-5 h-5" />
          Yeni Mekan Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-accent" />
            Topluluğa Katkıda Bulun
          </DialogTitle>
          <DialogDescription>
            Bildiğiniz, güvendiğiniz helal/mahsursuz bir mekanı ekleyerek listeyi büyütün.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-foreground">Ülke *</Label>
              <Select onValueChange={(val) => handleChange("country", val)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-foreground">Şehir *</Label>
              <Input 
                id="city" 
                placeholder="Örn: Köln" 
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Mekan Adı *</Label>
            <Input 
              id="name" 
              placeholder="Örn: İmren Döner" 
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="food" className="text-foreground">Ne Yenir? / Türü</Label>
            <Input 
              id="food" 
              placeholder="Örn: Yaprak Döner, Sulu Yemek..." 
              value={formData.food}
              onChange={(e) => handleChange("food", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">Adres (İsteğe Bağlı)</Label>
            <Input 
              id="address" 
              placeholder="Cadde ve numara..." 
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-foreground">Notunuz / Tavsiyeniz</Label>
            <Textarea 
              id="note" 
              placeholder="Fiyatlar nasıl? Ortam aileye uygun mu? vb." 
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ekleniyor...
                </>
              ) : (
                "Listeye Ekle"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}