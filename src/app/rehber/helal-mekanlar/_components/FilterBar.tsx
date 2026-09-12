"use client";

import { useRef, useEffect } from "react";
import { Search, SlidersHorizontal, X, Navigation, ArrowUpDown } from "lucide-react";
import { KATEGORILER, KATEGORI_COLOR, SPECIAL_FILTERS, SORT_OPTIONS, type SortOption } from "./constants";
import type { SpecialFilterKey } from "./constants";

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

  // Scroll active category chip into view
  useEffect(() => {
    if (!catScrollRef.current) return;
    const active = catScrollRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    active?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [selectedCategory]);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Row 1: Search + Location + Sort */}
      <div className="max-w-7xl mx-auto px-3 py-2.5 flex items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Mekan veya sehir ara..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
          {searchInput && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Location button */}
        <button
          onClick={onRequestLocation}
          title={hasUserLocation ? "Konum aktif" : "Konumumu kullan"}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
            hasUserLocation
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{hasUserLocation ? "Konum Aktif" : "Yakinim"}</span>
        </button>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pl-8 pr-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === "distance" && !hasUserLocation}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* City dropdown (when multiple cities) */}
        {cities.length > 1 && (
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="hidden md:block appearance-none px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shrink-0 max-w-[140px]"
          >
            <option value="all">Tum Sehirler</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {/* Reset */}
        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors shrink-0"
          >
            <X className="w-3 h-3" />
            <span className="hidden sm:inline">Temizle</span>
          </button>
        )}
      </div>

      {/* Row 2: Category chips */}
      <div
        ref={catScrollRef}
        className="flex gap-2 px-3 pb-2 overflow-x-auto scrollbar-hide"
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
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                isActive
                  ? colors
                    ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm`
                    : "bg-slate-800 text-white border-slate-800 shadow-sm"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {kat}
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px bg-gray-200 mx-1 shrink-0" />

        {/* Special filter toggles */}
        {SPECIAL_FILTERS.map((f) => {
          const isActive = activeSpecials.has(f.key);
          return (
            <button
              key={f.key}
              onClick={() => onToggleSpecial(f.key)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Row 3: Result count */}
      {isFiltered && (
        <div className="px-3 pb-2 flex items-center gap-2">
          <span className="text-[11px] text-gray-500">
            <strong className="text-emerald-700 font-bold">{filteredCount}</strong> mekan bulundu
          </span>
          {activeSpecials.size > 0 && (
            <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
              {activeSpecials.size} filtre aktif
            </span>
          )}
        </div>
      )}
    </div>
  );
}
