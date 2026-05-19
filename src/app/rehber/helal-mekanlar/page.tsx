// Server Component — fetches approved helal mekan data server-side and passes to client UI
import { supabase } from "@/lib/supabase";
import HelalMekanlarClient from "./_components/HelalMekanlarClient";

export type HelalMekan = {
  id: string;
  isim: string;
  kategori: string;
  sehir: string;
  adres: string;
  telefon: string | null;
  google_maps_url: string;
  google_place_id: string | null;
  onaylandi: boolean;
  created_at: string;
};

export default async function HelalMekanlarPage() {
  const { data, error } = await supabase
    .from("helal_mekanlar")
    .select("*")
    .eq("onaylandi", true)
    .order("sehir", { ascending: true });

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

  return <HelalMekanlarClient initialData={(data as HelalMekan[]) ?? []} />;
}
