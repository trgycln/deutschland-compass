"use client";
// Sticky filter bar — city select, text search, category chips, special boolean-field toggles, results count

import { Search, X } from "lucide-react";
import { KATEGORILER, KATEGORI_ICON, SPECIAL_FILTERS } from "./constants";

interface FilterBarProps {
  cities: string[];
  selectedCity: string;
  selectedCategory: string;
  searchInput: string;
  filteredCount: number;
  isFiltered: boolean;
  activeSpecials: Set<string>;
  onCityChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onSearchChange: (v: string) => void;
  onToggleSpecial: (key: string) => void;
  onReset: () => void;
}

const selectCls =
  "h-11 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-700 " +
  "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent flex-shrink-0";

const scrollRowCls =
  "flex gap-1.5 overflow-x-auto pb-0.5 " +
  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

export default function FilterBar({
  cities,
  selectedCity,
  selectedCategory,
  searchInput,
  filteredCount,
  isFiltered,
  activeSpecials,
  onCityChange,
  onCategoryChange,
  onSearchChange,
  onToggleSpecial,
  onReset,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">

        {/* ── Row 1: City select + text search + reset ─────────────── */}
        <div className="flex gap-2 items-center">
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className={selectCls}
            style={{ minWidth: 130 }}
            aria-label="Şehir seçin"
          >
            <option value="all">Tüm Şehirler</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <div className="relative flex-1 min-w-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Mekan adı veya adres ara..."
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-11 pl-9 pr-9 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Mekan ara"
            />
            {searchInput && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 flex items-center justify-center w-6 h-full"
                aria-label="Aramayı temizle"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="h-11 px-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px]"
              aria-label="Tüm filtreleri temizle"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
          )}
        </div>

        {/* ── Row 2: Category chips ─────────────────────────────────── */}
        <div className={scrollRowCls} role="group" aria-label="Kategori filtresi">
          {KATEGORILER.map((kat) => (
            <button
              key={kat}
              onClick={() => onCategoryChange(kat)}
              aria-pressed={selectedCategory === kat}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 border min-h-[36px] ${
                selectedCategory === kat
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50"
              }`}
            >
              {kat !== "Tümü" && (
                <span aria-hidden="true">{KATEGORI_ICON[kat]}</span>
              )}
              {kat}
            </button>
          ))}
        </div>

        {/* ── Row 3: Special boolean-field toggles ──────────────────── */}
        <div className={scrollRowCls} role="group" aria-label="Özellik filtreleri">
          {SPECIAL_FILTERS.map(({ key, label, icon }) => {
            const isActive = activeSpecials.has(key);
            return (
              <button
                key={key}
                onClick={() => onToggleSpecial(key)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 border min-h-[36px] ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Results count ─────────────────────────────────────────── */}
        <p className="text-xs text-gray-500 leading-none pt-0.5">
          <span className="font-semibold text-gray-800">{filteredCount}</span>{" "}
          mekan bulundu
          {selectedCity !== "all" && (
            <span className="text-green-600"> — {selectedCity}</span>
          )}
        </p>
      </div>
    </div>
  );
}
