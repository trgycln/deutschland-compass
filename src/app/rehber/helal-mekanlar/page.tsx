// Server Component — fetches halal places and passes to client

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import HelalMekanlarClient from "./_components/HelalMekanlarClient";

export type HelalMekan = {
  id: string;
  isim: string;
  kategori: string;
  kategori_slug: string;
  ulke: string;
  sehir: string;
  adres: string;
  food: string | null;
  note: string | null;
  telefon: string | null;
  google_maps_url: string;
  onaylandi: boolean;
  highlight: boolean;
  mescid_var: boolean;
  helal_sertifikali: boolean;
  muslumana_ait: boolean;
  aile_dostu: boolean;
  lat: number | null;
  lng: number | null;
  rating_avg: number;
  rating_count: number;
  foto_url: string | null;
  website_url: string | null;
  price: string | null;
  working_hours: string | null;
  created_at: string;
};

type DBPlace = {
  id: string;
  name: string;
  country: string;
  city: string;
  address?: string | null;
  food?: string | null;
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
  lat?: number | null;
  lng?: number | null;
  rating_avg?: number | null;
  rating_count?: number | null;
  foto_url?: string | null;
  website_url?: string | null;
  price?: string | null;
  working_hours?: string | null;
  [key: string]: unknown;
};

const CATEGORY_MAP: Record<string, { label: string; slug: string }> = {
  restaurant: { label: "Restoran",  slug: "restaurant" },
  cafe:       { label: "Kafe",      slug: "cafe"       },
  fast_food:  { label: "Fast Food", slug: "fast_food"  },
  bakery:     { label: "Firin",     slug: "bakery"     },
  market:     { label: "Market",    slug: "market"     },
  butcher:    { label: "Kasap",     slug: "butcher"    },
  other:      { label: "Diger",     slug: "other"      },
};

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-56 bg-emerald-700 animate-pulse" />
      <div className="h-14 bg-white border-b animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        <div className="h-[500px] bg-white rounded-2xl animate-pulse hidden lg:block" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function HelalMekanlarPage() {
  const { data, error } = await supabase
    .from("places")
    .select(
      "id, name, country, city, address, food, note, phone, map_link, category, " +
      "warning, highlight, mescid_var, helal_sertifikali, muslumana_ait, aile_dostu, created_at, " +
      "lat, lng, rating_avg, rating_count, foto_url, website_url, price, working_hours"
    )
    .order("city", { ascending: true });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">&#9888;&#65039;</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Veriler yuklenemedi</h2>
          <p className="text-gray-500 text-sm">
            Mekanlar yuklenirken bir sorun olustu. Sayfayi yenileyerek tekrar deneyin.
          </p>
        </div>
      </div>
    );
  }

  const mekanlar: HelalMekan[] = ((data as unknown as DBPlace[]) ?? []).map((p) => {
    const cat = CATEGORY_MAP[p.category ?? ""] ?? { label: "Diger", slug: "other" };
    return {
      id:                p.id,
      isim:              p.name,
      kategori:          cat.label,
      kategori_slug:     cat.slug,
      ulke:              p.country,
      sehir:             p.city,
      adres:             p.address ?? "",
      food:              p.food ?? null,
      note:              p.note ?? null,
      telefon:           p.phone ?? null,
      google_maps_url:   p.map_link ?? "",
      onaylandi:         p.highlight === true || p.warning !== true,
      highlight:         p.highlight === true,
      mescid_var:        p.mescid_var === true,
      helal_sertifikali: p.helal_sertifikali === true,
      muslumana_ait:     p.muslumana_ait === true,
      aile_dostu:        p.aile_dostu === true,
      lat:               p.lat ?? null,
      lng:               p.lng ?? null,
      rating_avg:        p.rating_avg ?? 0,
      rating_count:      p.rating_count ?? 0,
      foto_url:          p.foto_url ?? null,
      website_url:       p.website_url ?? null,
      price:             p.price ?? null,
      working_hours:     p.working_hours ?? null,
      created_at:        p.created_at ?? "",
    };
  });

  return (
    <Suspense fallback={<PageSkeleton />}>
      <HelalMekanlarClient initialData={mekanlar} />
    </Suspense>
  );
}
