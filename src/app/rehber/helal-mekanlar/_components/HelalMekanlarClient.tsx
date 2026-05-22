"use client";
// Root client component — reads filter state from URL params, computes derived data, orchestrates the full page

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { HelalMekan } from "../page";
import FilterBar from "./FilterBar";
import PlaceCard from "./PlaceCard";
import PlaceDetailModal from "./PlaceDetailModal";
import MekanOnerModal from "./MekanOnerModal";
import {
  ALMANYA_QUICK_CITIES,
  KATEGORI_SLUG,
  SLUG_TO_KATEGORI,
} from "./constants";
import { MapPin } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Build a URL-updated search params string, removing keys whose value is empty/"all"/"Tümü"
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
  const selectedCountry  = searchParams.get("country") ?? "all";
  const selectedCity     = searchParams.get("city")    ?? "all";
  const selectedCategory =
    SLUG_TO_KATEGORI[searchParams.get("category") ?? ""] ?? "Tümü";
  const searchQuery = searchParams.get("q") ?? "";

  // ── Local state (not persisted in URL) ──────────────────────────────────
  // Text input has its own state so it feels instant; synced to URL with debounce
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedMekan, setSelectedMekan] = useState<HelalMekan | null>(null);
  const [showOnerModal, setShowOnerModal] = useState(false);

  // Keep searchInput in sync when the URL changes externally (e.g. browser back)
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

  // Debounce search query to URL (400 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = buildParams({ q: searchInput.trim() });
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
    // router and pathname are stable refs; intentionally excluded to avoid re-running on every navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // ── Filter change handlers ───────────────────────────────────────────────
  const handleCountryChange = (country: string) => {
    setFilter({ country, city: "" }); // reset city when country changes
  };

  const handleCityChange = (city: string) => {
    setFilter({ city });
  };

  const handleCategoryChange = (category: string) => {
    setFilter({ category: KATEGORI_SLUG[category] ?? "" });
  };

  const handleQuickCity = (city: string) => {
    // Toggle: clicking the active city deselects it
    const newCity = city === selectedCity ? "" : city;
    setFilter({ country: "Almanya", city: newCity });
  };

  const resetFilters = () => {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  };

  // ── Derived data ─────────────────────────────────────────────────────────

  const countries = useMemo(() => {
    const unique = [...new Set(initialData.map((m) => m.ulke))];
    return unique.sort((a, b) =>
      a === "Almanya" ? -1 : b === "Almanya" ? 1 : a.localeCompare(b)
    );
  }, [initialData]);

  const cities = useMemo(() => {
    const source =
      selectedCountry === "all"
        ? initialData
        : initialData.filter((m) => m.ulke === selectedCountry);
    return [...new Set(source.map((m) => m.sehir))].sort();
  }, [initialData, selectedCountry]);

  const filtered = useMemo(() => {
    let result = initialData;
    if (selectedCountry !== "all")
      result = result.filter((m) => m.ulke === selectedCountry);
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
          m.sehir.toLowerCase().includes(q) ||
          m.ulke.toLowerCase().includes(q)
      );
    }
    return result;
  }, [initialData, selectedCountry, selectedCity, selectedCategory, searchQuery]);

  // Group country → cities, most populated first; Almanya always at top
  const grouped = useMemo(() => {
    const countryMap = new Map<string, Map<string, HelalMekan[]>>();
    filtered.forEach((m) => {
      if (!countryMap.has(m.ulke)) countryMap.set(m.ulke, new Map());
      const cityMap = countryMap.get(m.ulke)!;
      if (!cityMap.has(m.sehir)) cityMap.set(m.sehir, []);
      cityMap.get(m.sehir)!.push(m);
    });
    return Array.from(countryMap.entries())
      .map(([ulke, cityMap]) => ({
        ulke,
        cities: Array.from(cityMap.entries())
          .map(([sehir, mekanlar]) => ({ sehir, mekanlar }))
          .sort((a, b) => b.mekanlar.length - a.mekanlar.length),
        total: Array.from(cityMap.values()).reduce((s, v) => s + v.length, 0),
      }))
      .sort((a, b) =>
        a.ulke === "Almanya" ? -1 : b.ulke === "Almanya" ? 1 : b.total - a.total
      );
  }, [filtered]);

  const showCountryHeader = selectedCountry === "all" && countries.length > 1;

  const isFiltered =
    selectedCountry !== "all" ||
    selectedCity !== "all" ||
    selectedCategory !== "Tümü" ||
    searchQuery.trim() !== "";

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
            Avrupa&apos;da Helal Mekanlar
          </h1>
          <p className="text-green-100 text-base sm:text-lg max-w-xl mx-auto mb-3">
            Bulunduğun şehirdeki helal restoranları, kasapları ve daha fazlasını keşfet
          </p>
          <p className="text-white/70 text-sm mb-6">
            <span className="font-bold text-white">{initialData.length}+</span> mekan kayıtlı
          </p>

          {/* German city quick-select chips */}
          {(selectedCountry === "all" || selectedCountry === "Almanya") && (
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
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY FILTER BAR
      ══════════════════════════════════════════ */}
      <FilterBar
        countries={countries}
        cities={cities}
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        searchInput={searchInput}
        filteredCount={filtered.length}
        isFiltered={isFiltered}
        onCountryChange={handleCountryChange}
        onCityChange={handleCityChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={setSearchInput}
        onReset={resetFilters}
      />

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            onReset={resetFilters}
            onSuggest={() => setShowOnerModal(true)}
          />
        ) : (
          <div className="space-y-12">
            {grouped.map(({ ulke, cities: cityGroups, total }) => (
              <div key={ulke}>
                {/* Country header — only shown when "all countries" is active */}
                {showCountryHeader && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-green-600 text-white rounded-xl px-4 py-2 shadow-sm">
                      <span className="font-bold text-sm">{ulke}</span>
                      <span className="bg-white/25 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {total}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}

                <div className="space-y-8">
                  {cityGroups.map(({ sehir, mekanlar }) => (
                    <div key={sehir} id={`city-section-${sehir}`}>
                      {/* City header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-green-600" />
                          <span className="font-bold text-gray-800 text-sm">{sehir}</span>
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {mekanlar.length}
                          </span>
                        </div>
                        <div className="flex-1 h-px bg-gray-100" />
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
          countries={countries}
          onClose={() => setShowOnerModal(false)}
        />
      )}

      {/* ══════════════════════════════════════════
          FLOATING "MEKAN ÖNER" BUTTON
      ══════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-4 z-50">
        {/* Pulse glow ring */}
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
