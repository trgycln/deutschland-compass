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

export function AddPlaceDialog({ onPlaceAdded, floatingButton }: { onPlaceAdded: () => void; floatingButton?: boolean }) {
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
      {floatingButton ? (
        <div className="relative">
          {/* Pulse animation ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse opacity-70"></div>
          {/* Main button */}
          <DialogTrigger asChild>
            <button className="relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:from-amber-600 hover:to-orange-600 font-bold cursor-pointer">
              <PlusCircle className="w-6 h-6" />
              <span className="hidden md:inline font-semibold text-lg">Mekan Ekle</span>
            </button>
          </DialogTrigger>
          {/* Tooltip for mobile */}
          <div className="md:hidden absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Mekan Ekle
          </div>
        </div>
      ) : (
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold gap-2 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 px-6 py-6 text-base">
            <PlusCircle className="w-6 h-6" />
            Mekan Ekle
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px] bg-card border-2 border-amber-300/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            <MapPin className="w-6 h-6 text-amber-500" />
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