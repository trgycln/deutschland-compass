"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MapPin, List, Map as MapIcon, Plus, Navigation, ChevronRight, Sparkles, MessageCircle } from "lucide-react";
import type { HelalMekan } from "../page";
import FilterBar from "./FilterBar";
import PlaceCard from "./PlaceCard";
import PlaceDetailModal from "./PlaceDetailModal";
import MekanOnerModal from "./MekanOnerModal";
import { getPlacePhoto } from "./placePhoto";
import { ALMANYA_QUICK_CITIES, KATEGORI_SLUG, SLUG_TO_KATEGORI, type SortOption } from "./constants";

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-xl bg-slate-100 animate-pulse flex items-center justify-center">
      <p className="text-sm text-slate-400 font-medium">Harita yukleniyor...</p>
    </div>
  ),
});

// ── Deterministic string comparator (consistent between Node.js SSR and browser) ──
function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, "tr") || (a > b ? 1 : a < b ? -1 : 0);
}

// ── Haversine distance (km) ─────────────────────────────────────────────────
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── URL param helpers ────────────────────────────────────────────────────────
function buildParams(updates: Record<string, string>): string {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  Object.entries(updates).forEach(([k, v]) => {
    if (!v || v === "all" || v === "Tumu") params.delete(k);
    else params.set(k, v);
  });
  return params.toString();
}

// ── Component ────────────────────────────────────────────────────────────────
export default function HelalMekanlarClient({ initialData }: { initialData: HelalMekan[] }) {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  // URL-derived state
  const selectedCity     = searchParams.get("city")     ?? "all";
  const selectedCategory = SLUG_TO_KATEGORI[searchParams.get("category") ?? ""] ?? "Tumu";
  const searchQuery      = searchParams.get("q")        ?? "";

  // Local state
  const [searchInput,   setSearchInput]   = useState(searchQuery);
  const [activeSpecials, setActiveSpecials] = useState<Set<string>>(new Set());
  const [sortBy,         setSortBy]         = useState<SortOption>("default");
  const [userLocation,   setUserLocation]   = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [viewMode,       setViewMode]       = useState<"list" | "map">("list"); // mobile
  const [selectedMekan, setSelectedMekan]   = useState<HelalMekan | null>(null);
  const [showOnerModal, setShowOnerModal]   = useState(false);

  // Sync searchInput when URL changes
  useEffect(() => { setSearchInput(searchParams.get("q") ?? ""); }, [searchParams]);

  // Debounce search to URL
  useEffect(() => {
    const t = setTimeout(() => {
      const q = buildParams({ q: searchInput.trim() });
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Auto-sort by distance when location arrives
  useEffect(() => { if (userLocation) setSortBy("distance"); }, [userLocation]);

  // ── URL update helpers ──────────────────────────────────────────────────
  const setFilter = useCallback(
    (updates: Record<string, string>) => {
      const q = buildParams(updates);
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  const handleCityChange     = (city: string)     => setFilter({ city });
  const handleCategoryChange = (cat: string)      => setFilter({ category: KATEGORI_SLUG[cat] ?? "" });
  const handleQuickCity      = (city: string)      => setFilter({ city: city === selectedCity ? "" : city });
  const toggleSpecial        = (key: string) => setActiveSpecials((prev) => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  const resetFilters = () => {
    setSearchInput("");
    setActiveSpecials(new Set());
    setSortBy("default");
    router.replace(pathname, { scroll: false });
  };

  // ── Geolocation ─────────────────────────────────────────────────────────
  const requestLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Tarayıcınız konum servisini desteklemiyor.");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationLoading(false);
      },
      (err) => {
        setLocationLoading(false);
        if (err.code === 1) { // PERMISSION_DENIED
          alert("Konum izni reddedildi. Yakınınızdaki mekanları görmek için lütfen tarayıcınızın adres çubuğundaki kilit/izin simgesinden konum iznini etkinleştirin.");
        } else if (err.code === 3) { // TIMEOUT
          alert("Konum alma zaman aşımına uğradı. Lütfen tekrar deneyin.");
        } else {
          alert("Konumunuz tespit edilemedi. Lütfen cihazınızın konum servislerinin açık olduğunu kontrol edin.");
        }
      },
      { timeout: 12000, enableHighAccuracy: false, maximumAge: 60000 }
    );
  };

  // ── Distance map ─────────────────────────────────────────────────────────
  const distanceMap = useMemo(() => {
    const result: Record<string, number> = {};
    if (!userLocation) return result;
    initialData
      .filter((m) => m.lat !== null && m.lng !== null)
      .forEach((m) => {
        result[m.id] = haversine(userLocation.lat, userLocation.lng, m.lat!, m.lng!);
      });
    return result;
  }, [initialData, userLocation]);

  // Newest places from Telegram / Community
  const telegramNewPlaces = useMemo(
    () =>
      [...initialData]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 15),
    [initialData]
  );

  const newestPlaceIds = useMemo(
    () => new Set(telegramNewPlaces.map((m) => m.id)),
    [telegramNewPlaces]
  );

  const [showcaseTab, setShowcaseTab] = useState<"telegram" | "featured">("telegram");

  // ── Filter + Sort ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let r = initialData;

    if (selectedCity !== "all")   r = r.filter((m) => m.sehir === selectedCity);
    if (selectedCategory !== "Tumu") r = r.filter((m) => m.kategori === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter((m) =>
        m.isim.toLowerCase().includes(q) ||
        m.adres.toLowerCase().includes(q) ||
        m.sehir.toLowerCase().includes(q)
      );
    }
    if (activeSpecials.has("telegram_yeni"))     r = r.filter((m) => newestPlaceIds.has(m.id));
    if (activeSpecials.has("mescid_var"))        r = r.filter((m) => m.mescid_var);
    if (activeSpecials.has("helal_sertifikali")) r = r.filter((m) => m.helal_sertifikali);
    if (activeSpecials.has("muslumana_ait"))     r = r.filter((m) => m.muslumana_ait);
    if (activeSpecials.has("aile_dostu"))        r = r.filter((m) => m.aile_dostu);
    if (activeSpecials.has("highlight"))         r = r.filter((m) => m.highlight);

    // Sort
    const sorted = [...r];
    if (sortBy === "distance") {
      sorted.sort((a, b) => {
        const da = distanceMap[a.id] ?? Infinity;
        const db = distanceMap[b.id] ?? Infinity;
        return da - db || compareStrings(a.isim, b.isim);
      });
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating_avg - a.rating_avg || b.rating_count - a.rating_count || compareStrings(a.isim, b.isim));
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime() || compareStrings(a.isim, b.isim));
    } else {
      // default: highlighted first, then by city name, then by venue name
      sorted.sort((a, b) => {
        if (a.highlight && !b.highlight) return -1;
        if (!a.highlight && b.highlight) return 1;
        const cityCmp = compareStrings(a.sehir, b.sehir);
        if (cityCmp !== 0) return cityCmp;
        return compareStrings(a.isim, b.isim);
      });
    }
    return sorted;
  }, [initialData, selectedCity, selectedCategory, searchQuery, activeSpecials, sortBy, distanceMap, newestPlaceIds]);

  // Featured places (highlight) for the strip
  const featuredPlaces = useMemo(
    () => initialData.filter((m) => m.highlight).slice(0, 8),
    [initialData]
  );

  // Group by city for list view (when no city selected)
  const grouped = useMemo(() => {
    if (selectedCity !== "all") return null;
    const groups: Record<string, HelalMekan[]> = {};
    filtered.forEach((m) => {
      if (!groups[m.sehir]) groups[m.sehir] = [];
      groups[m.sehir].push(m);
    });
    return Object.entries(groups)
      .map(([sehir, mekanlar]) => ({ sehir, mekanlar }))
      .sort((a, b) => b.mekanlar.length - a.mekanlar.length || compareStrings(a.sehir, b.sehir));
  }, [filtered, selectedCity]);

  const isFiltered = selectedCity !== "all" || selectedCategory !== "Tumu" ||
    searchQuery.trim() !== "" || activeSpecials.size > 0;

  const countries = useMemo(() => {
    const list = [...new Set(initialData.map((m) => m.ulke).filter(Boolean))];
    if (list.length === 0) return ["Almanya", "Avusturya", "Isvicre"];
    return list.sort(compareStrings);
  }, [initialData]);

  const cities = useMemo(
    () => [...new Set(initialData.map((m) => m.sehir).filter(Boolean))].sort(compareStrings),
    [initialData]
  );

  const selectedMekanDistance = selectedMekan ? (distanceMap[selectedMekan.id] ?? null) : null;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ════════════ HERO ════════════ */}
      <section className="relative text-white pt-12 pb-8 px-4 overflow-hidden min-h-[340px] flex flex-col justify-center">
        {/* Photographic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/helal_hero_bg.jpg"
            alt="Almanya Helal Mekanlar"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Gentle, light overlay to preserve natural brightness while ensuring contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-black/40 border border-white/25 backdrop-blur-md rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 mb-3.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Topluluk Onaylı Helal Rehberi
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3 text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
            Almanya&apos;da Helal Mekanlar
          </h1>
          <p className="text-white text-sm sm:text-base max-w-xl mx-auto mb-4 leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            <span className="font-bold text-white bg-emerald-600/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-emerald-400/40 mr-1.5 shadow-sm">
              {initialData.length}+ mekan
            </span>
            Almanya genelinde restoran, kafe, fırın ve kasapları haritada keşfedin
          </p>

          {/* Location Action Button */}
          {!userLocation && (
            <button
              onClick={requestLocation}
              disabled={locationLoading}
              className="mt-1 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-sm shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-70 border border-emerald-400/30"
            >
              {locationLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Navigation className="w-4 h-4 text-emerald-100" />
              )}
              {locationLoading ? "Konum alınıyor..." : "Yakınımdaki Mekanları Bul"}
            </button>
          )}
          {userLocation && (
            <div className="mt-1 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/80 backdrop-blur-md border border-emerald-400/40 rounded-full text-sm font-semibold shadow-lg">
              <Navigation className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
              Konum aktif — mekanlar mesafenize göre listeleniyor
            </div>
          )}
        </div>

        {/* City quick-select pills */}
        <div className="max-w-4xl mx-auto mt-6 flex flex-wrap justify-center gap-2 relative z-10">
          {ALMANYA_QUICK_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleQuickCity(city)}
              className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-all backdrop-blur-md active:scale-95 ${
                selectedCity === city
                  ? "bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/50 border border-emerald-300 ring-2 ring-emerald-400/40"
                  : "bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white border border-white/15"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════ FILTER BAR ════════════ */}
      <FilterBar
        countries={countries}
        cities={cities}
        selectedCountry="all"
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        searchInput={searchInput}
        filteredCount={filtered.length}
        isFiltered={isFiltered}
        activeSpecials={activeSpecials}
        sortBy={sortBy}
        hasUserLocation={!!userLocation}
        onCountryChange={() => {}}
        onCityChange={handleCityChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={setSearchInput}
        onToggleSpecial={toggleSpecial}
        onSortChange={setSortBy}
        onRequestLocation={requestLocation}
        onReset={resetFilters}
      />

      {/* ════════════ SHOWCASE STRIP (TELEGRAM NEW + FEATURED) ════════════ */}
      {!isFiltered && (
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setShowcaseTab("telegram")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    showcaseTab === "telegram"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-gray-500 hover:text-slate-800"
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                  <span>Telegram&apos;dan Yeni Eklenenler</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-700 font-extrabold">
                    Yeni
                  </span>
                </button>
                {featuredPlaces.length > 0 && (
                  <button
                    onClick={() => setShowcaseTab("featured")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      showcaseTab === "featured"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-gray-500 hover:text-slate-800"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Öne Çıkanlar</span>
                  </button>
                )}
              </div>

              {showcaseTab === "telegram" && (
                <button
                  onClick={() => toggleSpecial("telegram_yeni")}
                  className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Tümünü Filtrele</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Content for Active Tab */}
            {showcaseTab === "telegram" ? (
              <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                {telegramNewPlaces.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMekan(m)}
                    className="shrink-0 w-64 bg-white border border-gray-200/90 hover:border-sky-300 rounded-2xl overflow-hidden text-left hover:shadow-md transition-all group flex flex-col"
                  >
                    <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={getPlacePhoto(m)}
                        alt={m.isim}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-600/95 text-white shadow-xs">
                          <MessageCircle className="w-2.5 h-2.5" /> Telegram Keşfi
                        </span>
                      </div>
                      <div className="absolute bottom-1.5 left-2 right-2 text-white">
                        <p className="text-[11px] font-medium text-sky-200">{m.sehir} · {m.kategori}</p>
                      </div>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900 leading-tight line-clamp-1 group-hover:text-sky-700 transition-colors">
                          {m.isim}
                        </p>
                        {m.food && (
                          <p className="text-[11px] font-semibold text-amber-800 truncate mt-1">
                            🍽️ {m.food}
                          </p>
                        )}
                        {m.note && (
                          <p className="text-[10px] text-gray-600 italic line-clamp-2 mt-1.5 bg-slate-50 p-1.5 rounded border border-gray-100">
                            &ldquo;{m.note}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                {featuredPlaces.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMekan(m)}
                    className="shrink-0 w-48 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 text-left hover:shadow-md hover:border-amber-400 transition-all group"
                  >
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className="text-lg">&#11088;</span>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">{m.isim}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{m.sehir} · {m.kategori}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════ MOBILE VIEW TOGGLE ════════════ */}
      <div className="lg:hidden sticky top-[calc(var(--filter-bar-h,130px))] z-30 flex justify-center py-2 bg-slate-50 border-b border-gray-100">
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-0.5">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "list"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-emerald-700"
            }`}
          >
            <List className="w-3.5 h-3.5" /> Liste
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "map"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-emerald-700"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" /> Harita
          </button>
        </div>
      </div>

      {/* ════════════ MAIN SPLIT AREA ════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-28">
        <div className="flex gap-6">

          {/* ── LEFT: MAP (desktop sticky / mobile toggle) ── */}
          <div className={`${viewMode === "map" ? "block" : "hidden"} lg:block lg:w-[45%] shrink-0`}>
            <div className="sticky top-[var(--filter-bar-h,130px)] h-[calc(100vh-220px)] min-h-[400px]">
              <MapView
                mekanlar={filtered}
                allMekanlar={initialData}
                userLocation={userLocation}
                onSelectMekan={setSelectedMekan}
                selectedMekanId={selectedMekan?.id}
                distances={distanceMap}
                onLocateUser={requestLocation}
                locationLoading={locationLoading}
              />
              <p className="text-[11px] text-gray-400 text-center mt-1">
                {filtered.filter((m) => m.lat !== null).length} mekanda koordinat var
              </p>
            </div>
          </div>

          {/* ── RIGHT: LIST ── */}
          <div className={`${viewMode === "list" ? "block" : "hidden"} lg:block flex-1 min-w-0`}>

            {filtered.length === 0 ? (
              /* Empty state */
              <div className="text-center py-20">
                <div className="text-5xl mb-4">&#128269;</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Sonuc bulunamadi</h3>
                <p className="text-gray-500 text-sm mb-6">Bu kriterlere uyan helal mekan bulunamadi.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                  <button
                    onClick={() => setShowOnerModal(true)}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors"
                  >
                    Mekan Oner +
                  </button>
                </div>
              </div>
            ) : grouped ? (
              /* Grouped by city */
              <div className="space-y-8">
                {grouped.map(({ sehir, mekanlar }) => (
                  <div key={sehir}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold text-gray-800 text-sm" suppressHydrationWarning>{sehir}</span>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {mekanlar.length}
                        </span>
                      </div>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {mekanlar.map((m) => (
                        <PlaceCard
                          key={m.id}
                          mekan={m}
                          distance={distanceMap[m.id]}
                          onDetay={() => setSelectedMekan(m)}
                          highlighted={m.highlight}
                          isRecent={newestPlaceIds.has(m.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Flat list (single city selected) */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((m) => (
                  <PlaceCard
                    key={m.id}
                    mekan={m}
                    distance={distanceMap[m.id]}
                    onDetay={() => setSelectedMekan(m)}
                    highlighted={m.highlight}
                    isRecent={newestPlaceIds.has(m.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ════════════ MODALS ════════════ */}
      {selectedMekan && (
        <PlaceDetailModal
          mekan={selectedMekan}
          distance={selectedMekanDistance ?? undefined}
          onClose={() => setSelectedMekan(null)}
        />
      )}
      {showOnerModal && (
        <MekanOnerModal
          countries={countries}
          onClose={() => setShowOnerModal(false)}
        />
      )}

      {/* ════════════ FAB: Mekan Oner ════════════ */}
      <div className="fixed bottom-6 right-4 z-50">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />
        <button
          onClick={() => setShowOnerModal(true)}
          className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Mekan Oner</span>
        </button>
      </div>
    </div>
  );
}
