"use client";
// Detail modal — shows full place info and an embedded Google Maps iframe

import type { HelalMekan } from "../page";
import { X, MapPin, Phone, CheckCircle2 } from "lucide-react";

const KATEGORI_ICON: Record<string, string> = {
  Restoran: "🍽️",
  Kasap:    "🥩",
  Döner:    "🌯",
  Café:     "☕",
  Bakkal:   "🛒",
  Otel:     "🏨",
  Diğer:    "📍",
};

const KATEGORI_RENK: Record<string, string> = {
  Restoran: "bg-green-100 text-green-800",
  Kasap:    "bg-red-100 text-red-800",
  Döner:    "bg-orange-100 text-orange-800",
  Café:     "bg-yellow-100 text-yellow-800",
  Bakkal:   "bg-blue-100 text-blue-800",
  Otel:     "bg-purple-100 text-purple-800",
  Diğer:    "bg-gray-100 text-gray-800",
};

function getMapEmbedUrl(mekan: HelalMekan): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!key) return "";
  if (mekan.google_place_id) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&place_id=${mekan.google_place_id}`;
  }
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(
    `${mekan.isim} ${mekan.adres} ${mekan.sehir}`
  )}`;
}

export default function MekanModal({
  mekan,
  onClose,
}: {
  mekan: HelalMekan;
  onClose: () => void;
}) {
  const embedUrl    = getMapEmbedUrl(mekan);
  const badgeClass  = KATEGORI_RENK[mekan.kategori] ?? KATEGORI_RENK["Diğer"];
  const icon        = KATEGORI_ICON[mekan.kategori] ?? "📍";

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
        <div className="flex items-start justify-between p-5 pb-4 border-b border-gray-100">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-2xl">{icon}</span>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">{mekan.isim}</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                {mekan.kategori}
              </span>
              {mekan.onaylandi && (
                <span className="flex items-center gap-1 text-xs text-green-700 font-semibold bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Onaylı Mekan
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
            aria-label="Kapat"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* ── Scrollable body ─────────────────────────────── */}
        <div className="overflow-y-auto flex-1">
          {/* Info rows */}
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Adres</p>
                <p className="text-sm text-gray-800 font-semibold">{mekan.adres}</p>
                <p className="text-xs text-gray-500">{mekan.sehir}, Almanya</p>
              </div>
            </div>

            {mekan.telefon && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Telefon</p>
                  <a
                    href={`tel:${mekan.telefon}`}
                    className="text-sm text-blue-600 font-semibold hover:underline"
                  >
                    {mekan.telefon}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Google Maps embed */}
          {embedUrl ? (
            <div className="mx-4 mb-4 rounded-xl overflow-hidden border border-gray-200 h-56">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${mekan.isim} haritası`}
              />
            </div>
          ) : (
            <div className="mx-4 mb-4 h-44 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
                    ? "Harita koordinatı bulunamadı"
                    : "Harita API anahtarı yapılandırılmamış"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer actions ───────────────────────────────── */}
        <div className="p-4 border-t border-gray-100 flex gap-3 bg-white">
          {mekan.google_maps_url ? (
            <a
              href={mekan.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-11 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Yol Tarifi Al
            </a>
          ) : (
            <div className="flex-1 flex items-center justify-center h-11 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium">
              Yol tarifi mevcut değil
            </div>
          )}
          <button
            onClick={onClose}
            className="px-5 h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
