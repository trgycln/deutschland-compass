"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { supabase } from "@/lib/supabase";
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
  ChefHat, X, Filter, Loader2, Map
} from "lucide-react";
import { PlaceFeedback } from "@/components/place-feedback";
import { AddPlaceDialog } from "@/components/add-place-dialog";
import { travelTips, generalAdvice } from "@/data/food-guide";
import { PlacesMap } from "@/components/places-map";
import { FeaturedPlacesCarousel } from "@/components/featured-places-carousel";
import { QuickFilters } from "@/components/quick-filters";
import { ActivityFeed } from "@/components/activity-feed";
import { PlaceReactions } from "@/components/place-reactions";
import { FavoritePlaceButton } from "@/components/favorite-place-button";
import { PlaceCheckin } from "@/components/place-checkin";

// Veritabanı Tip Tanımı
type DBPlace = {
  id: string;
  name: string;
  country: string;
  city: string;
  food?: string;
  address?: string;
  phone?: string;
  map_link?: string;
  note?: string;
  price?: string;
  highlight?: boolean;
  warning?: boolean;
  category?: string;
  latitude?: number;
  longitude?: number;
  avg_rating?: number;
  total_checkins?: number;
};

type GroupedData = {
  country: string;
  cities: {
    city: string;
    places: DBPlace[];
  }[];
};

export default function HalalPlacesPage() {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // State
  const [rawData, setRawData] = useState<DBPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("Almanya");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedPlace, setSelectedPlace] = useState<DBPlace | null>(null);

  // 1. Verileri Supabase'den Çek
  const fetchPlaces = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .order('city', { ascending: true });
    
    if (error) {
      console.error("Veri çekme hatası:", error);
    } else if (data) {
      setRawData(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // 2. Verileri Grupla
  const groupedData: GroupedData[] = useMemo(() => {
    const groups: Record<string, Record<string, DBPlace[]>> = {};

    rawData.forEach(place => {
      if (!groups[place.country]) groups[place.country] = {};
      if (!groups[place.country][place.city]) groups[place.country][place.city] = [];
      groups[place.country][place.city].push(place);
    });

    return Object.entries(groups).map(([country, citiesObj]) => ({
      country,
      cities: Object.entries(citiesObj).map(([city, places]) => ({ city, places }))
    })).sort((a, b) => a.country === "Almanya" ? -1 : 1);
  }, [rawData]);

  // 3. Mevcut Tab'a Göre Şehir Listesi
  const availableCities = useMemo(() => {
    const currentGroup = groupedData.find(g => g.country === activeTab);
    return currentGroup ? currentGroup.cities.map(c => c.city).sort() : [];
  }, [groupedData, activeTab]);

  // 4. Filtreleme Mantığı (Hızlı filtrelerle birlikte)
  const filteredDisplayData = useMemo(() => {
    const currentGroup = groupedData.find(g => g.country === activeTab);
    if (!currentGroup) return [];

    let cities = currentGroup.cities;

    if (selectedCity !== "all") {
      cities = cities.filter(c => c.city === selectedCity);
    }

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      cities = cities.map(cityGroup => {
        const filteredPlaces = cityGroup.places.filter(place => 
          place.name.toLowerCase().includes(lowerQuery) || 
          (place.food && place.food.toLowerCase().includes(lowerQuery)) ||
          (place.note && place.note.toLowerCase().includes(lowerQuery))
        );
        return { ...cityGroup, places: filteredPlaces };
      }).filter(cityGroup => cityGroup.places.length > 0);
    }

    // Hızlı filtreler uygulanır
    if (selectedFilters && (selectedFilters as any).categories?.length > 0) {
      cities = cities.map(cityGroup => {
        const filteredPlaces = cityGroup.places.filter(place =>
          (selectedFilters as any).categories.includes(place.category)
        );
        return { ...cityGroup, places: filteredPlaces };
      }).filter(cityGroup => cityGroup.places.length > 0);
    }

    // Fiyat filtresi
    if (selectedFilters && (selectedFilters as any).priceRanges?.length > 0) {
      // Fiyat bazlı filtreleme (daha çok veri bulunduğunda)
    }

    // Rating filtresi
    if (selectedFilters && (selectedFilters as any).rating) {
      cities = cities.map(cityGroup => {
        const filteredPlaces = cityGroup.places.filter(place =>
          (place.avg_rating || 0) >= (selectedFilters as any).rating
        );
        return { ...cityGroup, places: filteredPlaces };
      }).filter(cityGroup => cityGroup.places.length > 0);
    }

    return cities;
  }, [groupedData, activeTab, selectedCity, searchQuery, selectedFilters]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedFilters({});
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetFilters();
  };

  // Öne çıkan mekanları ve hepsi içinden al
  const allPlaces = useMemo(() => {
    return rawData.filter(p => p.highlight || p.avg_rating || p.total_checkins);
  }, [rawData]);

  const featuredPlaces = useMemo(() => {
    return allPlaces.slice(0, 6).sort((a, b) => {
      const scoreA = (a.avg_rating || 0) + (a.total_checkins || 0) / 10;
      const scoreB = (b.avg_rating || 0) + (b.total_checkins || 0) / 10;
      return scoreB - scoreA;
    });
  }, [allPlaces]);

  // Harita için filtreli mekanları al
  const mapPlaces = useMemo(() => {
    return filteredDisplayData.flatMap(cityGroup => cityGroup.places);
  }, [filteredDisplayData]);

  // Toplam sonuç sayısı
  const totalResults = useMemo(() => {
    return filteredDisplayData.reduce((acc, c) => acc + c.places.length, 0);
  }, [filteredDisplayData]);

  if (!isHydrated) {
    return <div suppressHydrationWarning className="flex flex-col min-h-screen bg-background pb-20" />;
  }

  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen bg-background pb-20">
      
      {/* HERO SECTION */}
      <section className="bg-primary text-primary-foreground pt-10 pb-16 md:pt-16 md:pb-20 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20 shadow-inner">
            <ChefHat className="w-8 h-8 text-accent" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Gönül Rahatlığıyla <span className="text-accent">Lezzet Rehberi</span>
          </h1>
          
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Avrupa genelinde, topluluğumuzun tecrübeleriyle derlenen ve sürekli güncellenen helal mekan rehberi.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* MEKAN EKLEME BUTONU */}
            <AddPlaceDialog onPlaceAdded={fetchPlaces} />

            {/* HASSASİYET UYARISI */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 font-semibold gap-2 shadow-lg">
                  <ShieldAlert className="w-5 h-5" />
                  Hassasiyet Uyarısı
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-card w-[95%] sm:w-full rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl text-foreground flex items-center gap-2">
                    <ShieldAlert className="text-amber-600" /> Önemli Uyarı
                  </DialogTitle>
                  <DialogDescription>
                    Bu rehberdeki mekanlar topluluk tavsiyesidir. Lütfen dikkat ediniz:
                  </DialogDescription>
                </DialogHeader>
                <div className="bg-secondary/30 p-4 rounded-lg mt-2 border border-border overflow-y-auto max-h-[60vh]">
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

          {/* Telegram Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mt-8">
            <a
              href="https://t.me/+aSRj7jvZ3eY0NDQy"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">Mekanlar Grubu</div>
                  <div className="text-xs text-blue-100 opacity-90">Telegram'da bize katıl</div>
                </div>
                <svg className="w-5 h-5 text-white/80 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a
              href="https://t.me/+yI1or4k3nMswN2Ni"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">Deutschland Compass</div>
                  <div className="text-xs text-amber-100 opacity-90">Kanalımıza katıl</div>
                </div>
                <svg className="w-5 h-5 text-white/80 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-4 mt-6 md:mt-8 relative z-20">
        
        {/* ÖNE ÇIKAN MEKANLAR CAROUSEL */}
        {featuredPlaces.length > 0 && (
          <section className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 md:p-6 border border-accent/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-amber-500 fill-amber-500" />
              Öne Çıkan Mekanlar
            </h2>
            <FeaturedPlacesCarousel 
              places={featuredPlaces}
              onPlaceClick={setSelectedPlace}
            />
          </section>
        )}

        {/* HARITA / LİSTE TOGGLE */}
        <div className="flex justify-end mb-4 gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <Utensils className="w-4 h-4" />
            Listeyi Göster
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="gap-2"
          >
            <Map className="w-4 h-4" />
            Haritayı Göster
          </Button>
        </div>

        {/* HARITA GÖRÜNÜMÜ */}
        {viewMode === "map" && mapPlaces.length > 0 && (
          <div className="w-full h-[500px] rounded-xl overflow-hidden mb-8 shadow-lg border border-border">
            <PlacesMap 
              places={mapPlaces}
              onPlaceSelect={setSelectedPlace}
            />
          </div>
        )}
        
        {/* FİLTRE KARTI */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg mb-8 space-y-6">
          
          {/* Hızlı Filtreler */}
          <QuickFilters 
            onFilterChange={setSelectedFilters}
            totalResults={totalResults}
          />

          {/* SEKMELER */}
          <div className="border-t border-border/50 pt-6">
            <h3 className="font-semibold text-sm mb-3">Ülke / Bölge</h3>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="bg-secondary/50 w-full h-auto p-2 flex flex-wrap justify-start gap-2 rounded-xl">
                {groupedData.map((group, idx) => (
                  <TabsTrigger 
                    key={idx} 
                    value={group.country}
                    className="w-auto px-4 py-2 text-sm md:text-base font-medium rounded-lg transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                  >
                    {group.country}
                  </TabsTrigger>
                ))}
                {groupedData.length === 0 && <span className="text-sm text-muted-foreground p-2">Yükleniyor...</span>}
              </TabsList>
            </Tabs>
          </div>

          {/* Metin ve Şehir Filtreleri */}
          <div className="border-t border-border/50 pt-6">
            <h3 className="font-semibold text-sm mb-3">Detaylı Ara</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Mekan, yemek adı ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-background"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={availableCities.length === 0}>
                <SelectTrigger className="h-10 bg-background">
                  <SelectValue placeholder="Şehir Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Şehirler</SelectItem>
                  {availableCities.map((city, idx) => (
                    <SelectItem key={idx} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || selectedCity !== "all" || Object.keys(selectedFilters).length > 0) && (
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{totalResults}</span> mekan bulundu
              </div>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-red-600 hover:bg-red-50">
                <X className="w-3.5 h-3.5 mr-1" />
                Tüm Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>

        {/* MEKAN LİSTESİ */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-accent" />
          </div>
        ) : filteredDisplayData.length === 0 ? (
          <div className="text-center py-20 bg-secondary/20 rounded-xl border border-dashed border-border">
            <Utensils className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Sonuç Bulunamadı</h3>
            <p className="text-muted-foreground mt-2">Bu kriterlere uygun mekan yok.</p>
            <Button variant="outline" onClick={resetFilters} className="mt-4">Tümünü Göster</Button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Şehir Şehir Listele */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDisplayData.map((cityGroup) => (
                cityGroup.places.map((place) => (
                  <Card key={place.id} className="bg-card hover:border-accent/40 transition-all duration-300 h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md border-l-4 border-l-accent/20">
                    
                    {/* Kart Başlığı */}
                    <CardHeader className="bg-secondary/30 px-4 py-3 border-b border-border/50 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-foreground">
                        <MapPin className="w-4 h-4 text-accent fill-accent/20" />
                        {cityGroup.city}
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 flex flex-col flex-grow">
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

                      {place.food && (
                        <div className="text-sm font-medium text-accent-foreground/90 mb-2 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 opacity-60" />
                          {place.food}
                        </div>
                      )}

                      {place.address && (
                        <div className="text-xs text-muted-foreground mb-3 italic pl-2 border-l-2 border-border/60">
                          {place.address}
                        </div>
                      )}

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

                      <div className="flex items-center gap-2 mt-auto mb-3">
                        {place.phone && (
                          <Button variant="outline" size="sm" className="h-8 text-xs flex-1 bg-transparent border-dashed" asChild>
                            <a href={`tel:${place.phone}`}>
                              <Phone className="w-3 h-3 mr-1.5" /> Ara
                            </a>
                          </Button>
                        )}
                        {place.map_link && (
                          <Button variant="default" size="sm" className="h-8 text-xs flex-1" asChild>
                            <a href={place.map_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1.5" /> Harita
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* FAVORİ BUTONU */}
                      <div className="mb-3">
                        <FavoritePlaceButton 
                          placeSlug={`${cityGroup.city.toLowerCase()}-${place.name.toLowerCase().replace(/\s+/g, '-')}`}
                          placeName={place.name}
                          size="sm"
                          showText={true}
                        />
                      </div>

                      {/* EMOJİ REAKSİYONLAR */}
                      <PlaceReactions 
                        placeSlug={`${cityGroup.city.toLowerCase()}-${place.name.toLowerCase().replace(/\s+/g, '-')}`}
                        placeName={place.name}
                      />

                      {/* CHECK-IN SISTEMI */}
                      <PlaceCheckin 
                        placeSlug={`${cityGroup.city.toLowerCase()}-${place.name.toLowerCase().replace(/\s+/g, '-')}`}
                        placeName={place.name}
                        cityName={cityGroup.city}
                      />

                      {/* BEĞENİ VE YORUM ALANI */}
                      <PlaceFeedback placeName={place.name} cityName={cityGroup.city} />

                    </CardContent>
                  </Card>
                ))
              ))}
            </div>
          </div>
        )}

        {/* CANLI AKTİVİTE FEED */}
        <section className="mt-20 mb-20 bg-gradient-to-br from-secondary/30 to-background rounded-2xl p-5 md:p-8 border border-border shadow-sm">
          <ActivityFeed />
        </section>

        {/* TRAVEL TIPS */}
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

      {/* 🎯 Sticky Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 group">
        <AddPlaceDialog onPlaceAdded={fetchPlaces} floatingButton={true} />
      </div>
    </div>
  );
}