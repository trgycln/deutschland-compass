// Shared display constants, category mappings, URL slug helpers, and special filter definitions

export const ALMANYA_QUICK_CITIES = [
  "Berlin", "Hamburg", "München", "Frankfurt",
  "Köln", "Stuttgart", "Düsseldorf", "Bremen",
] as const;

// Categories match DB `category` values exactly (via KATEGORI_SLUG below)
export const KATEGORILER = [
  "Tümü", "Restoran", "Kafe", "Fırın", "Fast Food", "Market", "Kasap", "Diğer",
] as const;

export type Kategori = (typeof KATEGORILER)[number];

export const KATEGORI_ICON: Record<string, string> = {
  Restoran:   "🍽️",
  Kafe:       "☕",
  Fırın:      "🥖",
  "Fast Food": "🌯",
  Market:     "🛒",
  Kasap:      "🔪",
  Diğer:      "📍",
};

export const KATEGORI_RENK: Record<string, string> = {
  Restoran:   "bg-green-100 text-green-800 border border-green-200",
  Kafe:       "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Fırın:      "bg-amber-100 text-amber-800 border border-amber-200",
  "Fast Food": "bg-orange-100 text-orange-800 border border-orange-200",
  Market:     "bg-blue-100 text-blue-800 border border-blue-200",
  Kasap:      "bg-red-100 text-red-800 border border-red-200",
  Diğer:      "bg-gray-100 text-gray-800 border border-gray-200",
};

// Turkish display label → URL-safe English slug
export const KATEGORI_SLUG: Record<string, string> = {
  Restoran:   "restaurant",
  Kafe:       "cafe",
  Fırın:      "bakery",
  "Fast Food": "fast_food",
  Market:     "market",
  Kasap:      "butcher",
  Diğer:      "other",
};

// URL slug → Turkish display label  (reverse of KATEGORI_SLUG)
export const SLUG_TO_KATEGORI: Record<string, string> = Object.fromEntries(
  Object.entries(KATEGORI_SLUG).map(([label, slug]) => [slug, label])
);

// Turkish label → DB category slug used in `places` table insert
export const KATEGORI_DB: Record<string, string> = {
  Restoran:   "restaurant",
  Kafe:       "cafe",
  Fırın:      "bakery",
  "Fast Food": "fast_food",
  Market:     "market",
  Kasap:      "butcher",
  Diğer:      "other",
};

// Special boolean-field filters shown as toggles below the category chips
export const SPECIAL_FILTERS = [
  { key: "mescid_var",        label: "Mescidli",      icon: "🕌" },
  { key: "helal_sertifikali", label: "Sertifikalı",   icon: "✅" },
  { key: "muslumana_ait",     label: "Müslümana Ait", icon: "👤" },
  { key: "aile_dostu",        label: "Aile Dostu",    icon: "👨‍👩‍👧" },
  { key: "highlight",         label: "Öne Çıkan",     icon: "⭐" },
] as const;

export type SpecialFilterKey = (typeof SPECIAL_FILTERS)[number]["key"];
