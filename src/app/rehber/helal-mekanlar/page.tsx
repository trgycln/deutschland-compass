"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, Utensils, AlertTriangle, Info, Car, CheckCircle2, 
  Euro, Star, ShieldAlert, Search, Phone, ExternalLink, 
  ChefHat, X, Filter
} from "lucide-react";
import { foodGuideData, travelTips, generalAdvice } from "@/data/food-guide";

export default function HalalPlacesPage() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("Almanya"); // Varsayılan sekme

  // 1. Şehir Listesini Hazırla (Aktif Sekmeye Göre)
  const currentCountryData = useMemo(() => {
    return foodGuideData.find(g => g.country === activeTab);
  }, [activeTab]);

  const availableCities = useMemo(() => {
    if (!currentCountryData) return [];
    // Şehirleri alfabetik sırala
    return currentCountryData.cities.map(c => c.city).sort();
  }, [currentCountryData]);

  // 2. Veriyi Filtrele
  const filteredCities = useMemo(() => {
    if (!currentCountryData) return [];

    let cities = currentCountryData.cities;

    // Şehir Filtresi
    if (selectedCity !== "all") {
      cities = cities.filter(c => c.city === selectedCity);
    }

    // Kelime Arama
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      cities = cities.map(cityGroup => {
        const filteredPlaces = cityGroup.places.filter(place => 
          place.name.toLowerCase().includes(lowerQuery) || 
          (place.food && place.food.toLowerCase().includes(lowerQuery)) ||
          (place.note && place.note.toLowerCase().includes(lowerQuery))
        );
        // Eğer şehirde hiç mekan eşleşmiyorsa ama şehir adı aramaya uyuyorsa, tüm mekanları göster
        if (filteredPlaces.length === 0 && cityGroup.city.toLowerCase().includes(lowerQuery)) {
          return { ...cityGroup };
        }
        return { ...cityGroup, places: filteredPlaces };
      }).filter(cityGroup => cityGroup.places.length > 0);
    }

    return cities;
  }, [currentCountryData, selectedCity, searchQuery]);

  // Filtre Temizleme
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
  };

  // Sekme değişince filtreleri sıfırla
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetFilters();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-primary text-primary-foreground pt-10 pb-16 md:pt-16 md:pb-20 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl">
        {/* Arkaplan Efekti */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20 shadow-inner">
              <ChefHat className="w-8 h-8 text-accent" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Gönül Rahatlığıyla <span className="text-accent">Lezzet Rehberi</span>
            </h1>
            
            <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Avrupa genelinde, topluluğumuzun tecrübeleriyle derlenen, 
              helallik hassasiyeti gözetilen mekanlar.
            </p>

            {/* HASSASİYET UYARISI BUTONU */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 font-semibold gap-2 shadow-lg transition-transform hover:scale-105 rounded-full px-6"
                >
                  <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-amber-700" />
                  Hassasiyet Uyarısı
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-card w-[95%] sm:w-full rounded-xl">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <ShieldAlert className="w-6 h-6 text-amber-700" />
                    </div>
                    <DialogTitle className="text-xl text-foreground">Önemli Hassasiyet Uyarısı</DialogTitle>
                  </div>
                  <DialogDescription className="text-base pt-2">
                    Bu rehberdeki mekanlar topluluk tavsiyesidir. Lütfen aşağıdaki hususlara dikkat ediniz:
                  </DialogDescription>
                </DialogHeader>
                <div className="bg-secondary/30 p-4 rounded-lg mt-2 border border-border max-h-[60vh] overflow-y-auto">
                  <ul className="space-y-3">
                    {generalAdvice.map((advice, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="text-accent mt-1">•</span>
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-10 relative z-20">
        
        {/* FİLTRE KARTI (Mobil Uyumlu) */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg mb-8">
          {/* Ülke Sekmeleri */}
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="bg-secondary/50 w-full h-auto p-1.5 flex flex-wrap justify-center gap-2 rounded-xl">
                {foodGuideData.map((group, idx) => (
                  <TabsTrigger 
                    key={idx} 
                    value={group.country}
                    className="flex-1 min-w-[100px] py-2.5 text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    {group.country}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Arama ve Şehir Filtresi */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Kelime Arama */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Mekan, yemek adı..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background border-input focus:border-accent text-base"
              />
            </div>

            {/* Şehir Filtresi */}
            <div className="md:col-span-4">
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={availableCities.length === 0}>
                <SelectTrigger className="h-12 bg-background border-input focus:ring-accent w-full text-base">
                  <SelectValue placeholder="Şehir Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-medium">Tüm Şehirler ({activeTab})</SelectItem>
                  {availableCities.map((city, idx) => (
                    <SelectItem key={idx} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Temizle Butonu */}
            <div className="md:col-span-3 flex md:justify-end">
              {(searchQuery || selectedCity !== "all") ? (
                <Button 
                  variant="destructive" 
                  onClick={resetFilters} 
                  className="w-full md:w-auto h-12 gap-2 bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
                >
                  <X className="w-4 h-4" /> Filtreyi Temizle
                </Button>
              ) : (
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground ml-auto bg-secondary/30 px-3 py-1 rounded-full">
                  <Filter className="w-3 h-3" />
                  <span>{filteredCities.reduce((acc, c) => acc + c.places.length, 0)} Mekan</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- MEKAN LİSTESİ --- */}
        <div className="space-y-8">
          {filteredCities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-secondary/20 rounded-xl border border-dashed border-border text-center px-4">
              <div className="p-4 bg-background rounded-full shadow-sm mb-4">
                <Utensils className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Sonuç Bulunamadı</h3>
              <p className="text-muted-foreground mt-2 text-sm max-w-xs mx-auto">
                Aradığınız kriterlere uygun mekan kaydı şimdilik yok. Filtreleri değiştirmeyi deneyebilirsiniz.
              </p>
              <Button variant="outline" onClick={resetFilters} className="mt-6">
                Tümünü Göster
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCities.map((cityGroup, cIdx) => (
                <Card key={cIdx} className="bg-card hover:border-accent/40 transition-all duration-300 h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md border-l-4 border-l-accent/20">
                  
                  {/* Kart Başlığı: Şehir */}
                  <CardHeader className="bg-secondary/30 px-4 py-3 border-b border-border/50 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <MapPin className="w-4 h-4 text-accent fill-accent/20" />
                      {cityGroup.city}
                    </div>
                    <Badge variant="outline" className="bg-background text-xs font-normal text-muted-foreground border-border/60">
                      {cityGroup.places.length}
                    </Badge>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow">
                    <div className="divide-y divide-border/40">
                      {cityGroup.places.map((place, pIdx) => (
                        <div key={pIdx} className="p-4 hover:bg-secondary/10 transition-colors">
                          
                          {/* Mekan Başlığı & Etiket */}
                          <div className="flex justify-between items-start gap-3 mb-2">
                            <h4 className="font-bold text-base text-primary dark:text-primary-foreground leading-snug">
                              {place.name}
                            </h4>
                            {place.highlight && (
                              <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium shrink-0">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="hidden sm:inline">Öneri</span>
                              </div>
                            )}
                          </div>

                          {/* Yemek Türü */}
                          {place.food && (
                            <div className="text-sm font-medium text-accent-foreground/80 mb-2 flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 opacity-60" />
                              {place.food}
                            </div>
                          )}

                          {/* Adres */}
                          {place.address && (
                            <div className="text-xs text-muted-foreground mb-3 italic pl-2 border-l-2 border-border/60">
                              {place.address}
                            </div>
                          )}

                          {/* Notlar & Fiyat */}
                          {(place.note || place.price || place.warning) && (
                            <div className={`text-xs rounded-md p-2.5 mb-3 ${place.warning ? 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200 border border-red-100 dark:border-red-900' : 'bg-secondary/40 text-muted-foreground'}`}>
                              {place.note && (
                                <div className="flex items-start gap-2 leading-relaxed">
                                  {place.warning ? (
                                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                  ) : (
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-green-600/70" />
                                  )}
                                  <span>{place.note}</span>
                                </div>
                              )}
                              {place.price && (
                                <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5 flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-500">
                                  <Euro className="w-3.5 h-3.5" />
                                  {place.price}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Butonlar */}
                          <div className="flex items-center gap-2 mt-2">
                            {place.phone && (
                              <Button variant="outline" size="sm" className="h-8 text-xs flex-1 bg-transparent border-dashed text-muted-foreground hover:text-foreground hover:border-solid hover:bg-background" asChild>
                                <a href={`tel:${place.phone}`}>
                                  <Phone className="w-3 h-3 mr-1.5" /> Ara
                                </a>
                              </Button>
                            )}
                            {place.mapLinks && place.mapLinks.length > 0 && (
                              <Button variant="default" size="sm" className="h-8 text-xs flex-1 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                <a href={place.mapLinks[0]} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1.5" /> Harita
                                </a>
                              </Button>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* --- TRAVEL TIPS SECTION --- */}
        <section className="mt-20 bg-gradient-to-br from-secondary/30 to-background rounded-2xl p-5 md:p-8 border border-border shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Car className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            </div>
            Seyahat, Gezi ve Ulaşım İpuçları
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {travelTips.map((tip, idx) => (
              <div key={idx} className="bg-card rounded-xl p-5 border border-border/60 shadow-sm hover:border-accent/30 transition-colors">
                <h3 className="font-bold text-base md:text-lg text-foreground flex items-center gap-2 mb-4 pb-2 border-b border-border/40">
                  <Info className="w-4 h-4 text-accent" /> {tip.title}
                </h3>
                <ul className="space-y-3">
                  {tip.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/20 flex gap-2">
                      <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-accent/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}