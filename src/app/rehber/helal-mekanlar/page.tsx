"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  MapPin, Utensils, AlertTriangle, CheckCircle2,
  Euro, Star, ShieldAlert, Search, Phone,
  ChefHat, X, Loader2, Map, Navigation,
} from "lucide-react";
import { PlaceFeedback } from "@/components/place-feedback";
import { AddPlaceDialog } from "@/components/add-place-dialog";
import { generalAdvice } from "@/data/food-guide";
import { PlacesMap } from "@/components/places-map";
import { PlaceReactions } from "@/components/place-reactions";
import { FavoritePlaceButton } from "@/components/favorite-place-button";
import { PlaceCheckin } from "@/components/place-checkin";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  cities: { city: string; places: DBPlace[] }[];
};

type PlaceWithDistance = DBPlace & { distance?: number };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const CATEGORY_META: Record<string, { emoji: string; label: string }> = {
  restaurant: { emoji: "🍽️", label: "Restoran" },
  cafe:        { emoji: "☕",  label: "Cafe" },
  bakery:      { emoji: "🥖",  label: "Fırın" },
  fast_food:   { emoji: "🍔",  label: "Fast Food" },
  market:      { emoji: "🛒",  label: "Market" },
  butcher:     { emoji: "🥩",  label: "Kasap" },
};

const CATEGORY_FILTERS = [
  { id: "all",        emoji: "🍴", label: "Tümü" },
  { id: "restaurant", emoji: "🍽️", label: "Restoran" },
  { id: "cafe",       emoji: "☕",  label: "Cafe" },
  { id: "bakery",     emoji: "🥖",  label: "Fırın" },
  { id: "fast_food",  emoji: "🍔",  label: "Fast Food" },
  { id: "market",     emoji: "🛒",  label: "Market" },
  { id: "butcher",    emoji: "🥩",  label: "Kasap" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HalalPlacesPage() {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [rawData, setRawData]               = useState<DBPlace[]>([]);
  const [isLoading, setIsLoading]           = useState(true);
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedCity, setSelectedCity]     = useState<string>("all");
  const [activeCountry, setActiveCountry]   = useState("Almanya");
  const [viewMode, setViewMode]             = useState<"list" | "map">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [userLocation, setUserLocation]     = useState<{ lat: number; lon: number } | null>(null);
  const [nearbyMode, setNearbyMode]         = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const fetchPlaces = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .order("city", { ascending: true });
    if (!error && data) setRawData(data);
    setIsLoading(false);
  };

  useEffect(() => { fetchPlaces(); }, []);

  // ── Grouped data ──────────────────────────────────────────────────────────

  const groupedData: GroupedData[] = useMemo(() => {
    const groups: Record<string, Record<string, DBPlace[]>> = {};
    rawData.forEach((place) => {
      if (!groups[place.country]) groups[place.country] = {};
      if (!groups[place.country][place.city]) groups[place.country][place.city] = [];
      groups[place.country][place.city].push(place);
    });
    return Object.entries(groups)
      .map(([country, citiesObj]) => ({
        country,
        cities: Object.entries(citiesObj).map(([city, places]) => ({ city, places })),
      }))
      .sort((a) => (a.country === "Almanya" ? -1 : 1));
  }, [rawData]);

  const countries = useMemo(() => groupedData.map((g) => g.country), [groupedData]);

  const availableCities = useMemo(() => {
    const current = groupedData.find((g) => g.country === activeCountry);
    return current ? current.cities.map((c) => c.city).sort() : [];
  }, [groupedData, activeCountry]);

  // ── Nearby mode ───────────────────────────────────────────────────────────

  const nearbyPlaces: PlaceWithDistance[] = useMemo(() => {
    if (!userLocation || !nearbyMode) return [];
    return rawData
      .filter((p) => p.latitude && p.longitude)
      .map((p) => ({
        ...p,
        distance: haversineKm(userLocation.lat, userLocation.lon, p.latitude!, p.longitude!),
      }))
      .filter((p) => p.distance! < 50)
      .sort((a, b) => a.distance! - b.distance!)
      .slice(0, 30);
  }, [rawData, userLocation, nearbyMode]);

  // ── Filtered list mode ────────────────────────────────────────────────────

  const filteredCities = useMemo(() => {
    if (nearbyMode) return [];
    const current = groupedData.find((g) => g.country === activeCountry);
    if (!current) return [];

    let cities = current.cities;

    if (selectedCity !== "all") {
      cities = cities.filter((c) => c.city === selectedCity);
    }
    if (selectedCategory !== "all") {
      cities = cities
        .map((c) => ({ ...c, places: c.places.filter((p) => p.category === selectedCategory) }))
        .filter((c) => c.places.length > 0);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cities = cities
        .map((c) => ({
          ...c,
          places: c.places.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.city.toLowerCase().includes(q) ||
              (p.food && p.food.toLowerCase().includes(q)) ||
              (p.note && p.note.toLowerCase().includes(q))
          ),
        }))
        .filter((c) => c.places.length > 0);
    }
    return cities;
  }, [groupedData, activeCountry, selectedCity, selectedCategory, searchQuery, nearbyMode]);

  const displayPlaces: PlaceWithDistance[] = useMemo(() => {
    if (nearbyMode) return nearbyPlaces;
    return filteredCities.flatMap((c) => c.places);
  }, [nearbyMode, nearbyPlaces, filteredCities]);

  const totalResults = displayPlaces.length;

  const isFiltered =
    searchQuery !== "" || selectedCity !== "all" || selectedCategory !== "all" || nearbyMode;

  // ── Geolocation ───────────────────────────────────────────────────────────

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setNearbyMode(true);
        setLocationLoading(false);
      },
      () => setLocationLoading(false)
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedCategory("all");
    setNearbyMode(false);
  };

  if (!isHydrated) return <div suppressHydrationWarning className="min-h-screen bg-background" />;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen bg-background pb-28">

      {/* ══════════════════════════════════════════
          COMPACT HEADER
      ══════════════════════════════════════════ */}
      <section className="bg-primary text-primary-foreground pt-7 pb-5 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl shrink-0">
                <ChefHat className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">Helal Mekan Rehberi</h1>
                <p className="text-xs text-primary-foreground/70 mt-0.5">
                  {isLoading
                    ? "Yükleniyor..."
                    : `${rawData.length} mekan • Avrupa geneli topluluk rehberi`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Sensitivity warning */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-amber-100/20 text-amber-200 hover:bg-amber-100/30 rounded-xl w-9 h-9"
                    title="Hassasiyet Uyarısı"
                  >
                    <ShieldAlert className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-[95%] rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <ShieldAlert className="text-amber-600" /> Önemli Uyarı
                    </DialogTitle>
                    <DialogDescription>
                      Bu rehberdeki mekanlar topluluk tavsiyesidir.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-secondary/30 p-4 rounded-lg overflow-y-auto max-h-[60vh]">
                    <ul className="space-y-3">
                      {generalAdvice.map((advice, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1 shrink-0">•</span>
                          <span>{advice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Add place button */}
              <AddPlaceDialog onPlaceAdded={fetchPlaces} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY SEARCH / FILTER BAR
      ══════════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto max-w-2xl px-4 py-3 space-y-2">

          {/* Row 1: search + location + map toggle */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Mekan, şehir veya yemek ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-secondary/40 border-border/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Aramayı temizle"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Near-me button */}
            <Button
              variant={nearbyMode ? "default" : "outline"}
              size="icon"
              className={`h-10 w-10 shrink-0 ${nearbyMode ? "bg-accent text-accent-foreground border-accent" : ""}`}
              onClick={nearbyMode ? () => setNearbyMode(false) : handleGetLocation}
              disabled={locationLoading}
              title={nearbyMode ? "Yakın modunu kapat" : "Konumuma yakın mekanları göster"}
            >
              {locationLoading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Navigation className="w-4 h-4" />}
            </Button>

            {/* Map/List toggle */}
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="icon"
              className="h-10 w-10 shrink-0"
              onClick={() => setViewMode((v) => (v === "map" ? "list" : "map"))}
              title="Harita / Liste"
            >
              <Map className="w-4 h-4" />
            </Button>
          </div>

          {/* Row 2: Country + City (hidden in nearby mode) */}
          {!nearbyMode && (
            <div className="flex gap-2">
              <Select
                value={activeCountry}
                onValueChange={(v) => { setActiveCountry(v); setSelectedCity("all"); }}
              >
                <SelectTrigger className="h-9 bg-secondary/40 text-sm flex-1 min-w-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCity}
                onValueChange={setSelectedCity}
                disabled={availableCities.length === 0}
              >
                <SelectTrigger className="h-9 bg-secondary/40 text-sm flex-1 min-w-0">
                  <SelectValue placeholder="Tüm Şehirler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Şehirler</SelectItem>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Nearby mode banner */}
          {nearbyMode && (
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-sm rounded-lg px-3 py-2">
              <Navigation className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-xs font-medium">
                {nearbyPlaces.length > 0
                  ? `${nearbyPlaces.length} mekan bulundu (50 km içinde)`
                  : "50 km içinde koordinatlı mekan bulunamadı."}
              </span>
              <button
                onClick={() => setNearbyMode(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Yakın modunu kapat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div className="container mx-auto max-w-2xl px-4 mt-4">

        {/* ── Category chips ─────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 border ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground border-border hover:border-accent/50 hover:bg-accent/5"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ── City quick-select pills (shown when no active filters) ── */}
        {!nearbyMode && selectedCity === "all" && !searchQuery && selectedCategory === "all" && availableCities.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
              Şehir seçin
            </p>
            <div className="flex flex-wrap gap-1.5">
              {availableCities.map((city) => {
                const count =
                  groupedData
                    .find((g) => g.country === activeCountry)
                    ?.cities.find((c) => c.city === city)?.places.length ?? 0;
                return (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-card border border-border hover:border-accent/50 rounded-xl text-sm font-medium transition-all hover:bg-accent/5 hover:shadow-sm active:scale-95"
                  >
                    <MapPin className="w-3 h-3 text-accent" />
                    {city}
                    <span className="text-xs text-muted-foreground ml-0.5">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Filter result summary ──────────────────────── */}
        {isFiltered && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalResults}</span> mekan bulundu
              {selectedCity !== "all" && (
                <span className="text-accent"> — {selectedCity}</span>
              )}
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Filtreyi temizle
            </button>
          </div>
        )}

        {/* ── Map view ───────────────────────────────────── */}
        {viewMode === "map" && (
          <div className="w-full h-[380px] rounded-xl overflow-hidden mb-5 shadow-lg border border-border">
            <PlacesMap places={displayPlaces} onPlaceSelect={() => {}} />
          </div>
        )}

        {/* ── Loading state ──────────────────────────────── */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">Mekanlar yükleniyor...</p>
          </div>

        /* ── Empty state ─────────────────────────────────── */
        ) : totalResults === 0 ? (
          <div className="text-center py-16 bg-secondary/20 rounded-xl border border-dashed border-border mt-2">
            <Utensils className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold">Sonuç Bulunamadı</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {nearbyMode
                ? "50 km çevrenizde koordinatlı mekan bulunamadı."
                : "Bu kriterlere uygun mekan yok."}
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Tümünü Göster
            </Button>
          </div>

        /* ── Nearby mode list ────────────────────────────── */
        ) : nearbyMode ? (
          <div className="space-y-3">
            {nearbyPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                cityName={place.city}
                distance={place.distance}
              />
            ))}
          </div>

        /* ── Normal grouped list ─────────────────────────── */
        ) : (
          <div className="space-y-8">
            {filteredCities.map((cityGroup) => (
              <div key={cityGroup.city}>
                {selectedCity === "all" && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-3 py-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent fill-accent/20" />
                      <span className="font-semibold text-sm">{cityGroup.city}</span>
                      <span className="text-xs text-muted-foreground">
                        ({cityGroup.places.length})
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}
                <div className="space-y-3">
                  {cityGroup.places.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      cityName={cityGroup.city}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Community links ────────────────────────────── */}
        {!isLoading && (
          <section className="mt-12 mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-900/40">
            <h2 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
              <span>💬</span> Topluluğa Katıl
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://t.me/+aSRj7jvZ3eY0NDQy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 text-white rounded-xl p-3 text-sm font-medium hover:bg-blue-600 active:scale-95 transition-all"
              >
                <TelegramIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">Mekanlar Grubu</span>
              </a>
              <a
                href="https://t.me/+yI1or4k3nMswN2Ni"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-amber-500 text-white rounded-xl p-3 text-sm font-medium hover:bg-amber-600 active:scale-95 transition-all"
              >
                <TelegramIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">Kanalımız</span>
              </a>
            </div>
          </section>
        )}
      </div>

      {/* ── Floating add button ──────────────────────────── */}
      <div className="fixed bottom-6 right-4 z-50">
        <AddPlaceDialog onPlaceAdded={fetchPlaces} floatingButton={true} />
      </div>
    </div>
  );
}

// ─── Place Card Component ─────────────────────────────────────────────────────

function PlaceCard({
  place,
  cityName,
  distance,
}: {
  place: DBPlace;
  cityName: string;
  distance?: number;
}) {
  const placeSlug = `${cityName}-${place.name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const catMeta = place.category ? CATEGORY_META[place.category] : null;
  const noRatings = !place.avg_rating || place.avg_rating === 0;

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 hover:shadow-md active:scale-[0.995] ${
        place.warning
          ? "border-red-200 dark:border-red-800"
          : place.highlight
          ? "border-amber-200 dark:border-amber-800"
          : "border-border"
      }`}
    >
      <CardContent className="p-0">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 p-4 pb-2">
          <div className="flex-1 min-w-0">
            {/* Name + badges */}
            <div className="flex items-start gap-2 flex-wrap">
              <h4 className="font-bold text-base text-foreground leading-snug">
                {place.name}
              </h4>
              {place.highlight && (
                <span className="inline-flex items-center gap-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0">
                  <Star className="w-3 h-3 fill-current" /> Öneri
                </span>
              )}
              {place.warning && (
                <span className="inline-flex items-center gap-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0">
                  <AlertTriangle className="w-3 h-3" /> Dikkat
                </span>
              )}
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {distance !== undefined && (
                <span className="text-xs font-semibold text-accent flex items-center gap-0.5 bg-accent/10 rounded-full px-2 py-0.5">
                  <Navigation className="w-3 h-3" />
                  {distance < 1
                    ? `${Math.round(distance * 1000)} m`
                    : `${distance.toFixed(1)} km`}
                </span>
              )}
              {catMeta && (
                <span className="text-xs text-muted-foreground">
                  {catMeta.emoji} {catMeta.label}
                </span>
              )}
              {place.food && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Utensils className="w-3 h-3" /> {place.food}
                </span>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                <MapPin className="w-3 h-3" /> {place.city}
              </span>
            </div>
          </div>

          {/* Favorite button */}
          <div className="shrink-0 mt-0.5">
            <FavoritePlaceButton
              placeSlug={placeSlug}
              placeName={place.name}
              size="sm"
              showText={false}
            />
          </div>
        </div>

        {/* ── Address ─────────────────────────────────── */}
        {place.address && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground italic border-l-2 border-accent/30 pl-2 leading-relaxed">
              {place.address}
            </p>
          </div>
        )}

        {/* ── Note ────────────────────────────────────── */}
        {place.note && (
          <div
            className={`mx-4 mb-3 text-xs rounded-lg p-2.5 flex items-start gap-2 ${
              place.warning
                ? "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200 border border-red-100 dark:border-red-900"
                : "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200 border border-green-100 dark:border-green-900"
            }`}
          >
            {place.warning ? (
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{place.note}</span>
          </div>
        )}

        {/* ── Price ───────────────────────────────────── */}
        {place.price && (
          <div className="px-4 pb-2">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Euro className="w-3 h-3" /> {place.price}
            </span>
          </div>
        )}

        {/* ── Rating encouragement ────────────────────── */}
        {noRatings && (
          <div className="mx-4 mb-3 bg-primary/5 border border-primary/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-muted-foreground/25" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground flex-1">Henüz değerlendirilmedi.</span>
            <span className="text-xs text-primary font-bold whitespace-nowrap">İlk sen ol! 👇</span>
          </div>
        )}

        {/* ── Action buttons ──────────────────────────── */}
        <div className="flex gap-2 px-4 pb-3">
          {place.phone && (
            <Button variant="outline" size="sm" className="h-9 text-xs flex-1" asChild>
              <a href={`tel:${place.phone}`}>
                <Phone className="w-3 h-3 mr-1.5" /> Ara
              </a>
            </Button>
          )}
          {place.map_link && (
            <Button size="sm" className="h-9 text-xs flex-1" asChild>
              <a href={place.map_link} target="_blank" rel="noopener noreferrer">
                <MapPin className="w-3 h-3 mr-1.5" /> Haritada Gör
              </a>
            </Button>
          )}
        </div>

        {/* ── Social interactions ─────────────────────── */}
        <div className="border-t border-border/50 px-4 pt-3 pb-1">
          <PlaceReactions placeSlug={placeSlug} placeName={place.name} />
        </div>
        <div className="px-4 py-1">
          <PlaceCheckin placeSlug={placeSlug} placeName={place.name} cityName={cityName} />
        </div>
        <div className="px-4 pb-4 pt-1">
          <PlaceFeedback placeName={place.name} cityName={cityName} />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Telegram Icon ────────────────────────────────────────────────────────────

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}
