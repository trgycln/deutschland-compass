"use client";
// Suggest-a-place modal — client-side Supabase insert into `places` with warning:true (pending review)

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { KATEGORILER, KATEGORI_DB } from "./constants";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Shared input style ───────────────────────────────────────────────────────

const inputCls =
  "w-full h-11 px-3 rounded-xl border border-gray-300 text-sm text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white";

// ─── Component ────────────────────────────────────────────────────────────────

export default function MekanOnerModal({
  countries,
  onClose,
}: {
  countries: string[];
  onClose: () => void;
}) {
  const [form, setForm]         = useState<FormState>(INITIAL_FORM);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase.from("places").insert({
      name:     form.isim.trim(),
      country:  form.ulke.trim(),
      city:     form.sehir.trim(),
      address:  form.adres.trim(),
      category: KATEGORI_DB[form.kategori] ?? "restaurant",
      phone:    form.iletisim.trim() || null,
      note:     form.notunuz.trim()  || null,
      warning:  false, // Doğrudan yayınla
    });

    setLoading(false);

    if (dbError) {
      setError("Mekan eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } else {
      setSuccess(true);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mekan öner"
    >
      {/* Sheet */}
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Mekan Ekle / Öner</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Topluluk rehberine doğrudan eklenir
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 p-5">

          {isSuccess ? (
            /* ── Success state ───────────────────────────────── */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Teşekkürler!</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                Mekan başarıyla eklendi ve rehberde doğrudan yayınlandı!
              </p>
              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="px-6 min-h-[44px] py-2 bg-green-600 text-white font-semibold rounded-xl text-sm hover:bg-green-700 transition-colors"
              >
                Kapat
              </button>
            </div>

          ) : (
            /* ── Form ────────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-sm text-gray-500">
                Bildiğiniz helal bir mekanı topluluğa önerin.
              </p>

              {/* Mekan Adı */}
              <div>
                <label htmlFor="om-isim" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mekan Adı <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="om-isim"
                  type="text"
                  name="isim"
                  value={form.isim}
                  onChange={handleChange}
                  required
                  placeholder="örn. Berliner Döner Kebap"
                  className={inputCls}
                />
              </div>

              {/* Ülke */}
              <div>
                <label htmlFor="om-ulke" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ülke <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                {countries.length > 1 ? (
                  <select
                    id="om-ulke"
                    name="ulke"
                    value={form.ulke}
                    onChange={handleChange}
                    required
                    className={inputCls}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="om-ulke"
                    type="text"
                    name="ulke"
                    value={form.ulke}
                    onChange={handleChange}
                    required
                    placeholder="örn. Almanya"
                    className={inputCls}
                  />
                )}
              </div>

              {/* Şehir */}
              <div>
                <label htmlFor="om-sehir" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Şehir <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="om-sehir"
                  type="text"
                  name="sehir"
                  value={form.sehir}
                  onChange={handleChange}
                  required
                  placeholder="örn. Berlin"
                  className={inputCls}
                />
              </div>

              {/* Adres */}
              <div>
                <label htmlFor="om-adres" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Adres <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="om-adres"
                  type="text"
                  name="adres"
                  value={form.adres}
                  onChange={handleChange}
                  required
                  placeholder="örn. Musterstraße 12, 10115 Berlin"
                  className={inputCls}
                />
              </div>

              {/* Kategori */}
              <div>
                <label htmlFor="om-kategori" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Kategori <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="om-kategori"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  required
                  className={inputCls}
                >
                  {KATEGORILER.filter((k) => k !== "Tumu").map((kat) => (
                    <option key={kat} value={kat}>{kat}</option>
                  ))}
                </select>
              </div>

              {/* İletişim (optional) */}
              <div>
                <label htmlFor="om-iletisim" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  İletişim{" "}
                  <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
                </label>
                <input
                  id="om-iletisim"
                  type="text"
                  name="iletisim"
                  value={form.iletisim}
                  onChange={handleChange}
                  placeholder="Telefon numarası"
                  className={inputCls}
                />
              </div>

              {/* Notunuz (optional) */}
              <div>
                <label htmlFor="om-notunuz" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Notunuz{" "}
                  <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
                </label>
                <textarea
                  id="om-notunuz"
                  name="notunuz"
                  value={form.notunuz}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mekan hakkında eklemek istediğiniz bilgiler..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[44px] bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
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
