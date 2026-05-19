"use client";
// Client Component — all filtering, search, city grouping, and UI state for the halal places page

import { useState, useMemo } from "react";
import type { HelalMekan } from "../page";
import MekanModal from "./MekanModal";
import MekanOnerModal from "./MekanOnerModal";
import { CheckCircle2, MapPin, Phone, Search, X, ExternalLink } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_CITIES = [
  "Berlin", "Hamburg", "München", "Frankfurt",
  "Köln", "Stuttgart", "Düsseldorf", "Bremen",
];

const KATEGORILER = ["Tümü", "Restoran", "Kasap", "Döner", "Café", "Bakkal", "Otel", "Diğer"] as const;

const KATEGORI_ICON: Record<string, string> = {
  Restoran: "🍽️",
  Kasap:    "🥩",
  Döner:    "🌯",
  Café:     "☕",
  Bakkal:   "🛒",
  Otel:     "🏨",
  Diğer:    "📍",
};

const KATEGORI_RENK: Record<string, string> = {
  Restoran: "bg-green-100 text-green-800 border border-green-200",
  Kasap:    "bg-red-100 text-red-800 border border-red-200",
  Döner:    "bg-orange-100 text-orange-800 border border-orange-200",
  Café:     "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Bakkal:   "bg-blue-100 text-blue-800 border border-blue-200",
  Otel:     "bg-purple-100 text-purple-800 border border-purple-200",
  Diğer:    "bg-gray-100 text-gray-800 border border-gray-200",
};

// ─── Main Client Component ────────────────────────────────────────────────────

export default function HelalMekanlarClient({ initialData }: { initialData: HelalMekan[] }) {
  const [searchQuery, setSearchQuery]         = useState("");
  const [selectedCity, setSelectedCity]       = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedMekan, setSelectedMekan]     = useState<HelalMekan | null>(null);
  const [showOnerModal, setShowOnerModal]     = useState(false);

  // ── Derived data ───────────────────────────────────────────────────────────

  const cities = useMemo(
    () => [...new Set(initialData.map((m) => m.sehir))].sort(),
    [initialData]
  );

  const filtered = useMemo(() => {
    let result = initialData;
    if (selectedCity !== "all") {
      result = result.filter((m) => m.sehir === selectedCity);
    }
    if (selectedCategory !== "Tümü") {
      result = result.filter((m) => m.kategori === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.isim.toLowerCase().includes(q) ||
          m.adres.toLowerCase().includes(q) ||
          m.sehir.toLowerCase().includes(q)
      );
    }
    return result;
  }, [initialData, selectedCity, selectedCategory, searchQuery]);

  // Group by city, most populated first
  const grouped = useMemo(() => {
    const map = new Map<string, HelalMekan[]>();
    filtered.forEach((m) => {
      if (!map.has(m.sehir)) map.set(m.sehir, []);
      map.get(m.sehir)!.push(m);
    });
    return Array.from(map.entries())
      .map(([sehir, mekanlar]) => ({ sehir, mekanlar }))
      .sort((a, b) => b.mekanlar.length - a.mekanlar.length);
  }, [filtered]);

  const isFiltered =
    selectedCity !== "all" || selectedCategory !== "Tümü" || searchQuery.trim() !== "";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedCategory("Tümü");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white pt-10 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            🕌 Topluluk Helal Rehberi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            Almanya&apos;da Helal Mekanlar
          </h1>
          <p className="text-green-100 text-base sm:text-lg max-w-xl mx-auto mb-6">
            Bulunduğun şehirdeki helal restoranları, kasapları ve daha fazlasını keşfet
          </p>

          {/* City quick-select chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city === selectedCity ? "all" : city)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCity === city
                    ? "bg-white text-green-700 shadow-md"
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
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">

          {/* Row 1: City select + text search */}
          <div className="flex gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[140px]"
            >
              <option value="all">Tüm Şehirler</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Mekan adı veya adres ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Aramayı temizle"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="h-10 px-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium transition-colors flex items-center gap-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Temizle</span>
              </button>
            )}
          </div>

          {/* Row 2: Category filter chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {KATEGORILER.map((kat) => (
              <button
                key={kat}
                onClick={() => setSelectedCategory(kat)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 border ${
                  selectedCategory === kat
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50"
                }`}
              >
                {kat !== "Tümü" && <span>{KATEGORI_ICON[kat]}</span>}
                {kat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-800">{filtered.length}</span> mekan bulundu
            {selectedCity !== "all" && (
              <span className="text-green-600"> — {selectedCity}</span>
            )}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 mt-6">

        {filtered.length === 0 ? (
          /* ── Empty State ─────────────────────────────── */
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Sonuç bulunamadı</h3>
            <p className="text-gray-500 text-sm mb-6">
              Bu kriterlere uyan helal mekan bulunamadı.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={resetFilters}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Filtreleri Temizle
              </button>
              <button
                onClick={() => setShowOnerModal(true)}
                className="px-5 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Mekan Öner +
              </button>
            </div>
          </div>
        ) : (
          /* ── City-grouped place grid ─────────────────── */
          <div className="space-y-10">
            {grouped.map(({ sehir, mekanlar }) => (
              <div key={sehir}>
                {/* City section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-green-600" />
                    <span className="font-bold text-gray-800 text-sm">{sehir}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {mekanlar.length}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Place cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mekanlar.map((mekan) => (
                    <MekanKarti
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
        <MekanModal mekan={selectedMekan} onClose={() => setSelectedMekan(null)} />
      )}
      {showOnerModal && (
        <MekanOnerModal onClose={() => setShowOnerModal(false)} />
      )}

      {/* ══════════════════════════════════════════
          FLOATING SUGGEST BUTTON
      ══════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-4 z-50">
        <button
          onClick={() => setShowOnerModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <span className="text-lg leading-none">+</span>
          <span className="text-sm">Mekan Öner</span>
        </button>
      </div>
    </div>
  );
}

// ─── Place Card ───────────────────────────────────────────────────────────────

function MekanKarti({
  mekan,
  onDetay,
}: {
  mekan: HelalMekan;
  onDetay: () => void;
}) {
  const badgeClass = KATEGORI_RENK[mekan.kategori] ?? KATEGORI_RENK["Diğer"];
  const icon       = KATEGORI_ICON[mekan.kategori] ?? "📍";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xl shrink-0">{icon}</span>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{mekan.isim}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0 text-green-500" />
            <span className="font-medium">{mekan.sehir}</span>
            <span className="text-gray-300">·</span>
            <span className="truncate">{mekan.adres}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
            {mekan.kategori}
          </span>
          {mekan.onaylandi && (
            <span className="flex items-center gap-1 text-xs text-green-700 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              Onaylı
            </span>
          )}
        </div>
      </div>

      {/* Phone */}
      {mekan.telefon && (
        <a
          href={`tel:${mekan.telefon}`}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-700 mb-3 transition-colors w-fit"
        >
          <Phone className="w-3 h-3" />
          {mekan.telefon}
        </a>
      )}

      <div className="flex-1" />

      {/* Action buttons */}
      <div className="flex gap-2 mt-3">
        {mekan.google_maps_url ? (
          <a
            href={mekan.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 justify-center flex-1 h-9 rounded-xl bg-green-50 text-green-700 border border-green-200 text-xs font-semibold hover:bg-green-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            Yol Tarifi
          </a>
        ) : (
          <span className="flex items-center justify-center flex-1 h-9 rounded-xl bg-gray-50 text-gray-400 border border-gray-100 text-xs font-medium cursor-default">
            Harita yok
          </span>
        )}
        <button
          onClick={onDetay}
          className="flex items-center gap-1.5 justify-center flex-1 h-9 rounded-xl bg-gray-800 text-white text-xs font-semibold hover:bg-gray-700 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Detay
        </button>
      </div>
    </div>
  );
}
