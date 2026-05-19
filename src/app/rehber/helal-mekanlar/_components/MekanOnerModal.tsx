"use client";
// Modal form for suggesting a new halal place — inserts with onaylandi: false pending admin review

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X, CheckCircle2, Loader2 } from "lucide-react";

const KATEGORILER = ["Restoran", "Kasap", "Döner", "Café", "Bakkal", "Otel", "Diğer"] as const;

// Maps Turkish display labels back to DB category slugs used in the `places` table
const CATEGORY_DB: Record<string, string> = {
  Restoran: "restaurant",
  Kasap:    "butcher",
  Döner:    "fast_food",
  Café:     "cafe",
  Bakkal:   "market",
  Otel:     "restaurant",
  Diğer:    "restaurant",
};

type FormState = {
  isim:     string;
  ulke:     string;
  sehir:    string;
  adres:    string;
  kategori: string;
  iletisim: string;
  notunuz:  string;
};

const INITIAL_FORM: FormState = {
  isim:     "",
  ulke:     "Almanya",
  sehir:    "",
  adres:    "",
  kategori: "Restoran",
  iletisim: "",
  notunuz:  "",
};

const inputClass =
  "w-full h-10 px-3 rounded-xl border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white";

export default function MekanOnerModal({
  onClose,
  countries,
}: {
  onClose: () => void;
  countries: string[];
}) {
  const [form, setForm]         = useState<FormState>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: dbError } = await supabase.from("places").insert({
      name:     form.isim.trim(),
      city:     form.sehir.trim(),
      country:  form.ulke,
      address:  form.adres.trim(),
      category: CATEGORY_DB[form.kategori] ?? "restaurant",
      phone:    form.iletisim.trim() || null,
      note:     form.notunuz.trim() || null,
      warning:  true,
    });

    setIsLoading(false);

    if (dbError) {
      setError("Mekan önerilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ──────────────────────────────────────── */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Mekan Öner</h2>
            <p className="text-xs text-gray-500 mt-0.5">İnceleme sonrası rehbere eklenir</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* ── Content ─────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 p-5">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Teşekkürler!</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                Mekan öneriniz alındı. İncelendikten sonra rehbere eklenecektir.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl text-sm hover:bg-green-700 transition-colors"
              >
                Kapat
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Mekan Adı */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mekan Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="isim"
                  value={form.isim}
                  onChange={handleChange}
                  required
                  placeholder="örn. Berliner Döner Kebap"
                  className={inputClass}
                />
              </div>

              {/* Ülke */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ülke <span className="text-red-500">*</span>
                </label>
                {countries.length > 1 ? (
                  <select
                    name="ulke"
                    value={form.ulke}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="ulke"
                    value={form.ulke}
                    onChange={handleChange}
                    required
                    placeholder="örn. Almanya"
                    className={inputClass}
                  />
                )}
              </div>

              {/* Şehir */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Şehir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sehir"
                  value={form.sehir}
                  onChange={handleChange}
                  required
                  placeholder="örn. Berlin"
                  className={inputClass}
                />
              </div>

              {/* Adres */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Adres <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="adres"
                  value={form.adres}
                  onChange={handleChange}
                  required
                  placeholder="örn. Musterstraße 12, 10115 Berlin"
                  className={inputClass}
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  {KATEGORILER.map((kat) => (
                    <option key={kat} value={kat}>{kat}</option>
                  ))}
                </select>
              </div>

              {/* İletişim (optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  İletişim{" "}
                  <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
                </label>
                <input
                  type="text"
                  name="iletisim"
                  value={form.iletisim}
                  onChange={handleChange}
                  placeholder="Telefon numarası"
                  className={inputClass}
                />
              </div>

              {/* Notunuz (optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Notunuz{" "}
                  <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
                </label>
                <textarea
                  name="notunuz"
                  value={form.notunuz}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mekan hakkında eklemek istediğiniz bilgiler..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  "Mekanı Öner"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
