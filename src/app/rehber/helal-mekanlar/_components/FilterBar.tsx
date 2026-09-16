"use client";

import { useRef, useEffect } from "react";
import { Search, X, Navigation, ArrowUpDown, Globe, ChevronDown, MapPin, RotateCcw } from "lucide-react";
import { KATEGORILER, KATEGORI_COLOR, SPECIAL_FILTERS, SORT_OPTIONS, type SortOption } from "./constants";

const COUNTRY_FLAGS: Record<string, string> = {
  "Almanya": "🇩🇪",
  "Hollanda": "🇳🇱",
  "Belçika": "🇧🇪",
  "Fransa": "🇫🇷",
  "Lüksemburg": "🇱🇺",
  "Luxembourg": "🇱🇺",
  "Bosna-Hersek": "🇧🇦",
  "İsviçre": "🇨🇭",
  "İtalya": "🇮🇹",
  "Avusturya": "🇦🇹",
  "Yunanistan": "🇬🇷",
  "İspanya": "🇪🇸",
  "Hırvatistan": "🇭🇷",
  "Çekya": "🇨🇿",
  "Arnavutluk": "🇦🇱",
  "Polonya": "🇵🇱",
  "Portekiz": "🇵🇹",
  "Macaristan": "🇭🇺",
  "Slovenya": "🇸🇮",
  "Diğer": "🌍",
};

interface FilterBarProps {
  countries: string[];
  cities: string[];
  selectedCountry: string;
  selectedCity: string;
  selectedCategory: string;
  searchInput: string;
  filteredCount: number;
  isFiltered: boolean;
  activeSpecials: Set<string>;
  sortBy: SortOption;
  hasUserLocation: boolean;
  onCountryChange: (c: string) => void;
  onCityChange: (c: string) => void;
  onCategoryChange: (c: string) => void;
  onSearchChange: (v: string) => void;
  onToggleSpecial: (k: string) => void;
  onSortChange: (s: SortOption) => void;
  onRequestLocation: () => void;
  onReset: () => void;
}

export default function FilterBar({
  countries, cities,
  selectedCountry, selectedCity, selectedCategory,
  searchInput, filteredCount, isFiltered,
  activeSpecials, sortBy, hasUserLocation,
  onCountryChange, onCityChange, onCategoryChange,
  onSearchChange, onToggleSpecial, onSortChange,
  onRequestLocation, onReset,
}: FilterBarProps) {
  const catScrollRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  // Scroll active category chip horizontally inside its own row without scrolling window
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const container = catScrollRef.current;
    if (!container) return;
    const active = container.querySelector('[data-active="true"]') as HTMLElement | null;
    if (active) {
      const containerLeft = container.getBoundingClientRect().left;
      const activeLeft = active.getBoundingClientRect().left;
      const offset = activeLeft - containerLeft - container.clientWidth / 2 + active.clientWidth / 2;
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [selectedCategory]);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 space-y-2">
        
        {/* ── ROW 1: Search & Actions ── */}
        <div className="flex items-center gap-2">
          
          {/* Country selector (desktop) */}
          <div className="relative shrink-0 hidden md:block">
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="appearance-none pl-8 pr-7 py-2.5 text-xs font-bold rounded-xl border border-emerald-300 bg-emerald-50/90 text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer max-w-[150px] truncate shadow-2xs hover:bg-emerald-100 transition-colors"
              aria-label="Ülke seçin"
            >
              <option value="all">🌍 Tüm Ülkeler</option>
              <option value="Almanya">🇩🇪 Almanya</option>
              {countries
                .filter((c) => c !== "Almanya")
                .map((c) => (
                  <option key={c} value={c}>
                    {COUNTRY_FLAGS[c] ?? "📍"} {c}
                  </option>
                ))}
            </select>
            <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-700 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-emerald-700 pointer-events-none" />
          </div>

          {/* City dropdown (desktop) */}
          {cities.length > 1 && (
            <div className="relative shrink-0 hidden md:block">
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="appearance-none pl-8 pr-7 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer max-w-[140px] truncate hover:border-gray-300 transition-colors"
                aria-label="Şehir seçin"
              >
                <option value="all">Tüm Şehirler</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          )}

          {/* Search bar (full width on mobile, flexible on desktop) */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Mekan, mutfak veya şehir ara..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-gray-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-2xs"
            />
            {searchInput && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                title="Aramayı temizle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Location button */}
          <button
            onClick={onRequestLocation}
            title={hasUserLocation ? "Konum aktif" : "Konumumu kullan"}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all shrink-0 active:scale-95 shadow-2xs ${
              hasUserLocation
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{hasUserLocation ? "Konum Aktif" : "Yakınım"}</span>
          </button>

          {/* Sort dropdown (desktop) */}
          <div className="relative shrink-0 hidden md:block">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none pl-8 pr-7 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer hover:border-gray-300 transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === "distance" && !hasUserLocation}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          {/* Reset (desktop) */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="hidden md:flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors shrink-0 active:scale-95"
              title="Filtreleri Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Temizle</span>
            </button>
          )}
        </div>

        {/* ── ROW 2 (MOBILE ONLY): Country + City + Sort + Reset ── */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          
          {/* Mobile Country select pill */}
          <div className="relative shrink-0 flex-1 min-w-[110px]">
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full appearance-none pl-6 pr-5 py-2 text-[11px] font-bold rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 focus:outline-none cursor-pointer truncate"
              aria-label="Ülke seçin"
            >
              <option value="all">🌍 Tüm Ülkeler</option>
              <option value="Almanya">🇩🇪 Almanya</option>
              {countries
                .filter((c) => c !== "Almanya")
                .map((c) => (
                  <option key={c} value={c}>
                    {COUNTRY_FLAGS[c] ?? "📍"} {c}
                  </option>
                ))}
            </select>
            <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-emerald-700 pointer-events-none" />
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-emerald-700 pointer-events-none" />
          </div>

          {/* Mobile City select pill */}
          {cities.length > 1 && (
            <div className="relative shrink-0 flex-1 min-w-[105px]">
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full appearance-none pl-6 pr-5 py-2 text-[11px] font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none cursor-pointer truncate"
                aria-label="Şehir seçin"
              >
                <option value="all">Tüm Şehirler</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gray-400 pointer-events-none" />
            </div>
          )}

          {/* Mobile Sort select pill */}
          <div className="relative shrink-0 flex-1 min-w-[100px]">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full appearance-none pl-6 pr-5 py-2 text-[11px] font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none cursor-pointer truncate"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === "distance" && !hasUserLocation}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Mobile Reset button */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors shrink-0 active:scale-95"
              title="Temizle"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* ── ROW 3: Category & Feature Chips ── */}
        <div
          ref={catScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {KATEGORILER.map((kat) => {
            const isActive = selectedCategory === kat;
            const colors = kat !== "Tumu" ? KATEGORI_COLOR[kat] : null;
            return (
              <button
                key={kat}
                data-active={isActive}
                onClick={() => onCategoryChange(kat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? colors
                      ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm ring-1 ring-emerald-400/30`
                      : "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {kat}
              </button>
            );
          })}

          <div className="w-px h-5 bg-gray-200 mx-1 shrink-0" />

          {SPECIAL_FILTERS.map((f) => {
            const isActive = activeSpecials.has(f.key);
            const isHighlight = f.key === "highlight";
            return (
              <button
                key={f.key}
                onClick={() => onToggleSpecial(f.key)}
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? isHighlight
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-sm ring-1 ring-amber-400/40"
                      : "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : isHighlight
                      ? "bg-amber-50/70 text-amber-900 border-amber-200/90 hover:bg-amber-100 hover:border-amber-300 shadow-2xs"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* ── Active Filter Summary & Counter ── */}
      {isFiltered && (
        <div className="bg-slate-50 border-t border-gray-100 px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="text-gray-500 font-medium">
              <strong className="text-emerald-700 font-bold">{filteredCount}</strong> mekan bulundu
            </span>
            {selectedCountry !== "all" && (
              <span className="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded-md font-semibold inline-flex items-center gap-1">
                <span>{COUNTRY_FLAGS[selectedCountry] ?? "🌍"}</span>
                <span>{selectedCountry}</span>
              </span>
            )}
            {selectedCity !== "all" && (
              <span className="bg-slate-200/80 text-slate-800 px-2 py-0.5 rounded-md font-semibold">
                📍 {selectedCity}
              </span>
            )}
            {activeSpecials.size > 0 && (
              <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md font-medium">
                {activeSpecials.size} özellik aktif
              </span>
            )}
          </div>

          <button
            onClick={onReset}
            className="text-red-600 hover:text-red-800 font-semibold underline shrink-0 cursor-pointer"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
}

