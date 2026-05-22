"use client";
// Root client component — URL-driven filter state, special boolean toggles, country-free city grouping

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { HelalMekan } from "../page";
import FilterBar from "./FilterBar";
import PlaceCard from "./PlaceCard";
import PlaceDetailModal from "./PlaceDetailModal";
import MekanOnerModal from "./MekanOnerModal";
import { ALMANYA_QUICK_CITIES, KATEGORI_SLUG, SLUG_TO_KATEGORI } from "./constants";
import { MapPin } from "lucide-react";

// ─── URL helpers ──────────────────────────────────────────────────────────────

// Read from window.location so we always see the latest params in async callbacks
function buildParams(updates: Record<string, string>): string {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  Object.entries(updates).forEach(([key, value]) => {
    if (!value || value === "all" || value === "Tümü") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });
  return params.toString();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HelalMekanlarClient({
  initialData,
}: {
  initialData: HelalMekan[];
}) {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  // ── URL-derived filter state ─────────────────────────────────────────────
  const selectedCity     = searchParams.get("city")     ?? "all";
  const selectedCategory =
    SLUG_TO_KATEGORI[searchParams.get("category") ?? ""] ?? "Tümü";
  const searchQuery = searchParams.get("q") ?? "";

  // ── Local state ──────────────────────────────────────────────────────────
  const [searchInput, setSearchInput]   = useState(searchQuery);
  const [activeSpecials, setActiveSpecials] = useState<Set<string>>(new Set());
  const [selectedMekan, setSelectedMekan]   = useState<HelalMekan | null>(null);
  const [showOnerModal, setShowOnerModal]   = useState(false);

  // Sync searchInput when URL changes externally (browser back/forward)
  useEffect(() => {
    setSearchInput(searchParams.get("q") ?? "");
  }, [searchParams]);

  // ── URL update helper ────────────────────────────────────────────────────
  const setFilter = useCallback(
    (updates: Record<string, string>) => {
      const query = buildParams(updates);
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  // Debounce search text to URL (400 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = buildParams({ q: searchInput.trim() });
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // ── Filter change handlers ───────────────────────────────────────────────
  const handleCityChange     = (city: string)     => setFilter({ city });
  const handleCategoryChange = (category: string) =>
    setFilter({ category: KATEGORI_SLUG[category] ?? "" });

  const handleQuickCity = (city: string) => {
    setFilter({ city: city === selectedCity ? "" : city });
  };

  const toggleSpecial = (key: string) => {
    setActiveSpecials((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const resetFilters = () => {
    setSearchInput("");
    setActiveSpecials(new Set());
    router.replace(pathname, { scroll: false });
  };

  // ── Derived data ─────────────────────────────────────────────────────────

  const cities = useMemo(
    () => [...new Set(initialData.map((m) => m.sehir))].sort(),
    [initialData]
  );

  const filtered = useMemo(() => {
    let result = initialData;

    if (selectedCity !== "all")
      result = result.filter((m) => m.sehir === selectedCity);

    if (selectedCategory !== "Tümü")
      result = result.filter((m) => m.kategori === selectedCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.isim.toLowerCase().includes(q) ||
          m.adres.toLowerCase().includes(q) ||
          m.sehir.toLowerCase().includes(q)
      );
    }

    // Special boolean-field toggles — each active toggle narrows the set
    if (activeSpecials.has("mescid_var"))        result = result.filter((m) => m.mescid_var);
    if (activeSpecials.has("helal_sertifikali")) result = result.filter((m) => m.helal_sertifikali);
    if (activeSpecials.has("muslumana_ait"))     result = result.filter((m) => m.muslumana_ait);
    if (activeSpecials.has("aile_dostu"))        result = result.filter((m) => m.aile_dostu);
    if (activeSpecials.has("highlight"))         result = result.filter((m) => m.highlight);

    return result;
  }, [initialData, selectedCity, selectedCategory, searchQuery, activeSpecials]);

  // Group by city, most populated first; "Bilinmiyor" / empty city always last
  const grouped = useMemo(() => {
    const cityMap = new Map<string, HelalMekan[]>();
    filtered.forEach((m) => {
      if (!cityMap.has(m.sehir)) cityMap.set(m.sehir, []);
      cityMap.get(m.sehir)!.push(m);
    });

    const UNKNOWN = new Set(["bilinmiyor", "", "unknown"]);

    return Array.from(cityMap.entries())
      .map(([sehir, mekanlar]) => ({ sehir, mekanlar }))
      .sort((a, b) => {
        const aUnknown = UNKNOWN.has(a.sehir.toLowerCase());
        const bUnknown = UNKNOWN.has(b.sehir.toLowerCase());
        if (aUnknown !== bUnknown) return aUnknown ? 1 : -1;
        return b.mekanlar.length - a.mekanlar.length;
      });
  }, [filtered]);

  const isFiltered =
    selectedCity !== "all" ||
    selectedCategory !== "Tümü" ||
    searchQuery.trim() !== "" ||
    activeSpecials.size > 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 text-white pt-10 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            🕌 Topluluk Helal Rehberi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            Almanya&apos;da Helal Mekanlar
          </h1>
          <p className="text-green-100 text-base sm:text-lg max-w-xl mx-auto mb-3">
            Bulunduğun şehirdeki helal restoranları, kasapları ve daha fazlasını keşfet
          </p>
          <p className="text-white/70 text-sm mb-6">
            <span className="font-bold text-white">{initialData.length}+</span> mekan kayıtlı
          </p>

          {/* German city quick-select chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {ALMANYA_QUICK_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => handleQuickCity(city)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${
                  selectedCity === city
                    ? "bg-white text-green-700 shadow-md font-bold"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY FILTER BAR
      ══════════════════════════════════════════ */}
      <FilterBar
        cities={cities}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        searchInput={searchInput}
        filteredCount={filtered.length}
        isFiltered={isFiltered}
        activeSpecials={activeSpecials}
        onCityChange={handleCityChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={setSearchInput}
        onToggleSpecial={toggleSpecial}
        onReset={resetFilters}
      />

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        {filtered.length === 0 ? (
          <EmptyState onReset={resetFilters} onSuggest={() => setShowOnerModal(true)} />
        ) : (
          <div className="space-y-8">
            {grouped.map(({ sehir, mekanlar }) => (
              <div key={sehir} id={`city-section-${sehir}`}>
                {/* City header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
                    <span className="font-bold text-gray-800 text-sm">{sehir}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {mekanlar.length}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-100" aria-hidden="true" />
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mekanlar.map((mekan) => (
                    <PlaceCard
                      key={mekan.id}
                      mekan={mekan}
                      onDetay={() => setSelectedMekan(mekan)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════ */}
      {selectedMekan && (
        <PlaceDetailModal
          mekan={selectedMekan}
          onClose={() => setSelectedMekan(null)}
        />
      )}
      {showOnerModal && (
        <MekanOnerModal
          countries={["Almanya"]}
          onClose={() => setShowOnerModal(false)}
        />
      )}

      {/* ══════════════════════════════════════════
          FLOATING "MEKAN ÖNER" BUTTON
      ══════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-4 z-50">
        <span
          className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none"
          aria-hidden="true"
        />
        <button
          onClick={() => setShowOnerModal(true)}
          className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-95 min-h-[44px]"
        >
          <span className="text-lg leading-none" aria-hidden="true">+</span>
          <span className="text-sm">Mekan Öner</span>
        </button>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  onReset,
  onSuggest,
}: {
  onReset: () => void;
  onSuggest: () => void;
}) {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">Sonuç bulunamadı</h3>
      <p className="text-gray-500 text-sm mb-6">
        Bu kriterlere uyan helal mekan bulunamadı.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onReset}
          className="min-h-[44px] px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Filtreleri Temizle
        </button>
        <button
          onClick={onSuggest}
          className="min-h-[44px] px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
        >
          Mekan Öner +
        </button>
      </div>
    </div>
  );
}
