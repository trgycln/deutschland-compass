// Server Component — fetches Almanya places from Supabase and passes to client; Suspense wraps for useSearchParams
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import HelalMekanlarClient from "./_components/HelalMekanlarClient";

export type HelalMekan = {
  id: string;
  isim: string;
  kategori: string;
  ulke: string;
  sehir: string;
  adres: string;
  note: string | null;
  telefon: string | null;
  google_maps_url: string;
  google_place_id: string | null;
  onaylandi: boolean;
  highlight: boolean;
  mescid_var: boolean;
  helal_sertifikali: boolean;
  muslumana_ait: boolean;
  aile_dostu: boolean;
  created_at: string;
};

type DBPlace = {
  id: string;
  name: string;
  country: string;
  city: string;
  address?: string | null;
  note?: string | null;
  phone?: string | null;
  map_link?: string | null;
  category?: string | null;
  warning?: boolean | null;
  highlight?: boolean | null;
  mescid_var?: boolean | null;
  helal_sertifikali?: boolean | null;
  muslumana_ait?: boolean | null;
  aile_dostu?: boolean | null;
  created_at?: string | null;
  [key: string]: unknown;
};

// DB category slug → Turkish display label (matching current DB values exactly)
const CATEGORY_MAP: Record<string, string> = {
  restaurant: "Restoran",
  cafe:       "Kafe",
  fast_food:  "Fast Food",
  bakery:     "Fırın",
  market:     "Market",
  butcher:    "Kasap",
  other:      "Diğer",
};

// ── Suspense fallback skeleton ─────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-52 bg-green-600 animate-pulse" />
      <div className="h-24 bg-white border-b animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-52 bg-white rounded-2xl border border-gray-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function HelalMekanlarPage() {
  const { data, error } = await supabase
    .from("places")
    .select(
      "id, name, country, city, address, note, phone, map_link, category, " +
      "warning, highlight, mescid_var, helal_sertifikali, muslumana_ait, aile_dostu, created_at"
    )
    .order("city", { ascending: true });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Veriler yüklenemedi</h2>
          <p className="text-gray-500 text-sm">
            Mekanlar yüklenirken bir sorun oluştu. Sayfayı yenileyerek tekrar deneyin.
          </p>
        </div>
      </div>
    );
  }

  const mekanlar: HelalMekan[] = ((data as unknown as DBPlace[]) ?? []).map((p) => ({
    id:                p.id,
    isim:              p.name,
    kategori:          CATEGORY_MAP[p.category ?? ""] ?? "Diğer",
    ulke:              p.country,
    sehir:             p.city,
    adres:             p.address ?? "",
    note:              p.note ?? null,
    telefon:           p.phone ?? null,
    google_maps_url:   p.map_link ?? "",
    google_place_id:   null,
    onaylandi:         p.highlight === true || p.warning !== true,
    highlight:         p.highlight === true,
    mescid_var:        p.mescid_var === true,
    helal_sertifikali: p.helal_sertifikali === true,
    muslumana_ait:     p.muslumana_ait === true,
    aile_dostu:        p.aile_dostu === true,
    created_at:        p.created_at ?? "",
  }));

  return (
    <Suspense fallback={<PageSkeleton />}>
      <HelalMekanlarClient initialData={mekanlar} />
    </Suspense>
  );
}
