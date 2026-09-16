// Shared constants, category mappings, URL slug helpers, and special filter definitions

export const ALMANYA_QUICK_CITIES = [
  "Frankfurt",
  "Köln",
  "Berlin",
  "Stuttgart",
  "München",
  "Dortmund",
  "Mannheim",
  "Düsseldorf",
  "Hamburg",
  "Bochum",
  "Bonn",
  "Nürnberg",
  "Hannover",
  "Bremen",
  "Essen",
] as const;

export function normalizeCityName(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ä/g, "a")
    .replace(/ß/g, "ss")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .trim();
}

export function isCityMatch(placeCity: string | null | undefined, filterCity: string | null | undefined): boolean {
  if (!placeCity || !filterCity) return false;
  const trimmedFilter = filterCity.trim();
  const trimmedPlace = placeCity.trim();
  if (trimmedFilter === "" || trimmedFilter === "all" || trimmedFilter === "Tumu" || trimmedPlace === "" || trimmedPlace === "all" || trimmedPlace === "Tumu") {
    return false;
  }
  if (trimmedPlace.toLowerCase() === trimmedFilter.toLowerCase()) return true;

  const normPlace = normalizeCityName(trimmedPlace);
  const normFilter = normalizeCityName(trimmedFilter);

  if (normPlace === normFilter) return true;

  // Prefix matching with word boundary or separators (e.g., "Frankfurt am Main" matches "Frankfurt")
  if (
    normPlace.startsWith(normFilter + " ") ||
    normPlace.startsWith(normFilter + "-") ||
    normPlace.startsWith(normFilter + "/") ||
    normPlace.startsWith(normFilter + "(")
  ) {
    return true;
  }
  if (
    normFilter.startsWith(normPlace + " ") ||
    normFilter.startsWith(normPlace + "-") ||
    normFilter.startsWith(normPlace + "/") ||
    normFilter.startsWith(normPlace + "(")
  ) {
    return true;
  }

  return false;
}

export const KATEGORILER = [
  "Tumu", "Restoran", "Kafe", "Firin", "Fast Food", "Market", "Kasap", "Diger",
] as const;

export type Kategori = (typeof KATEGORILER)[number];

export const KATEGORI_ICON: Record<string, string> = {
  Restoran:   "fork_knife",
  Kafe:       "coffee",
  Firin:      "bread",
  "Fast Food": "burger",
  Market:     "cart",
  Kasap:      "knife",
  Diger:      "pin",
};

export const KATEGORI_EMOJI: Record<string, string> = {
  Restoran:   "food_and_drink",
  Kafe:       "hot_beverage",
  Firin:      "bread",
  "Fast Food": "hamburger",
  Market:     "shopping_cart",
  Kasap:      "cut_of_meat",
  Diger:      "pushpin",
};

export const KATEGORI_COLOR: Record<string, { bg: string; text: string; border: string; pin: string }> = {
  Restoran:   { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200", pin: "#059669" },
  Kafe:       { bg: "bg-amber-100",   text: "text-amber-800",   border: "border-amber-200",   pin: "#d97706" },
  Firin:      { bg: "bg-orange-100",  text: "text-orange-800",  border: "border-orange-200",  pin: "#ea580c" },
  "Fast Food": { bg: "bg-red-100",    text: "text-red-800",     border: "border-red-200",     pin: "#dc2626" },
  Market:     { bg: "bg-blue-100",    text: "text-blue-800",    border: "border-blue-200",    pin: "#2563eb" },
  Kasap:      { bg: "bg-rose-100",    text: "text-rose-800",    border: "border-rose-200",    pin: "#e11d48" },
  Diger:      { bg: "bg-slate-100",   text: "text-slate-700",   border: "border-slate-200",   pin: "#64748b" },
};

// Turkish display label -> URL-safe English slug
export const KATEGORI_SLUG: Record<string, string> = {
  Restoran:   "restaurant",
  Kafe:       "cafe",
  Firin:      "bakery",
  "Fast Food": "fast_food",
  Market:     "market",
  Kasap:      "butcher",
  Diger:      "other",
};

// URL slug -> Turkish display label (reverse of KATEGORI_SLUG)
export const SLUG_TO_KATEGORI: Record<string, string> = Object.fromEntries(
  Object.entries(KATEGORI_SLUG).map(([label, slug]) => [slug, label])
);

// Turkish label -> DB category slug
export const KATEGORI_DB: Record<string, string> = {
  Restoran:   "restaurant",
  Kafe:       "cafe",
  Firin:      "bakery",
  "Fast Food": "fast_food",
  Market:     "market",
  Kasap:      "butcher",
  Diger:      "other",
};

export const SPECIAL_FILTERS = [
  { key: "highlight",         label: "⭐ Öne Çıkanlar", emoji: "star" },
  { key: "telegram_yeni",     label: "✨ Yeni Eklenenler", emoji: "sparkles" },
  { key: "mescid_var",        label: "Mescidli",      emoji: "mosque" },
] as const;

export type SpecialFilterKey = (typeof SPECIAL_FILTERS)[number]["key"];

export const SORT_OPTIONS = [
  { value: "default",  label: "Varsayilan" },
  { value: "distance", label: "Yakinimdaki" },
  { value: "rating",   label: "En Yuksek Puanli" },
  { value: "newest",   label: "En Yeni" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
