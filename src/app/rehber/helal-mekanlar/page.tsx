// Server Component — reads from the existing `places` table and maps to the HelalMekan display type
import { supabase } from "@/lib/supabase";
import HelalMekanlarClient from "./_components/HelalMekanlarClient";

export type HelalMekan = {
  id: string;
  isim: string;
  kategori: string;
  ulke: string;
  sehir: string;
  adres: string;
  telefon: string | null;
  google_maps_url: string;
  google_place_id: string | null;
  onaylandi: boolean;
  created_at: string;
};

// Raw shape coming back from the `places` table
type DBPlace = {
  id: string;
  name: string;
  country: string;
  city: string;
  address?: string | null;
  phone?: string | null;
  map_link?: string | null;
  category?: string | null;
  warning?: boolean | null;
  highlight?: boolean | null;
  created_at?: string | null;
  [key: string]: unknown;
};

// English DB slugs → Turkish display labels
const CATEGORY_MAP: Record<string, string> = {
  restaurant: "Restoran",
  cafe:       "Café",
  fast_food:  "Döner",
  bakery:     "Bakkal",
  market:     "Bakkal",
  butcher:    "Kasap",
};

export default async function HelalMekanlarPage() {
  const { data, error } = await supabase
    .from("places")
    .select("*")
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

  const mekanlar: HelalMekan[] = ((data as DBPlace[]) ?? []).map((p) => ({
    id:              p.id,
    isim:            p.name,
    kategori:        CATEGORY_MAP[p.category ?? ""] ?? "Diğer",
    ulke:            p.country,
    sehir:           p.city,
    adres:           p.address ?? "",
    telefon:         p.phone ?? null,
    google_maps_url: p.map_link ?? "",
    google_place_id: null,
    onaylandi:       p.highlight === true || p.warning !== true,
    created_at:      p.created_at ?? "",
  }));

  return <HelalMekanlarClient initialData={mekanlar} />;
}
