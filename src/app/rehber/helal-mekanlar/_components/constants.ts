// Shared display constants, category mappings, and URL slug helpers for the Helal Mekanlar feature

export const ALMANYA_QUICK_CITIES = [
  "Berlin", "Hamburg", "München", "Frankfurt",
  "Köln", "Stuttgart", "Düsseldorf", "Bremen",
] as const;

export const KATEGORILER = [
  "Tümü", "Restoran", "Kasap", "Döner", "Café", "Bakkal", "Otel", "Diğer",
] as const;

export type Kategori = (typeof KATEGORILER)[number];

export const KATEGORI_ICON: Record<string, string> = {
  Restoran: "🍽️",
  Kasap:    "🥩",
  Döner:    "🌯",
  Café:     "☕",
  Bakkal:   "🛒",
  Otel:     "🏨",
  Diğer:    "📍",
};

// Tailwind badge classes per category
export const KATEGORI_RENK: Record<string, string> = {
  Restoran: "bg-green-100 text-green-800 border border-green-200",
  Kasap:    "bg-red-100 text-red-800 border border-red-200",
  Döner:    "bg-orange-100 text-orange-800 border border-orange-200",
  Café:     "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Bakkal:   "bg-blue-100 text-blue-800 border border-blue-200",
  Otel:     "bg-purple-100 text-purple-800 border border-purple-200",
  Diğer:    "bg-gray-100 text-gray-800 border border-gray-200",
};

// Turkish display label → URL-safe English slug  (e.g. "Restoran" → "restaurant")
export const KATEGORI_SLUG: Record<string, string> = {
  Restoran: "restaurant",
  Kasap:    "butcher",
  Döner:    "fast_food",
  Café:     "cafe",
  Bakkal:   "market",
  Otel:     "hotel",
  Diğer:    "other",
};

// URL slug → Turkish display label  (reverse of above)
export const SLUG_TO_KATEGORI: Record<string, string> = Object.fromEntries(
  Object.entries(KATEGORI_SLUG).map(([label, slug]) => [slug, label])
);

// Turkish label → DB category slug used in `places` table insert
export const KATEGORI_DB: Record<string, string> = {
  Restoran: "restaurant",
  Kasap:    "butcher",
  Döner:    "fast_food",
  Café:     "cafe",
  Bakkal:   "market",
  Otel:     "restaurant",
  Diğer:    "restaurant",
};
