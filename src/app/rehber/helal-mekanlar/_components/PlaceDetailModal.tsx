"use client";
// Full-screen place detail modal — shows address, phone, category, and an embedded Google Maps iframe

import { X, MapPin, Phone, CheckCircle2 } from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_ICON, KATEGORI_RENK } from "./constants";

// ─── Map embed URL (no API key required) ─────────────────────────────────────

function getEmbedUrl(mekan: HelalMekan): string {
  const q = encodeURIComponent(
    [mekan.isim, mekan.sehir, "Deutschland"].filter(Boolean).join(", ")
  );
  return `https://maps.google.com/maps?q=${q}&output=embed&hl=tr`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlaceDetailModal({
  mekan,
  onClose,
}: {
  mekan: HelalMekan;
  onClose: () => void;
}) {
  const mapSrc     = getEmbedUrl(mekan);
  const badgeClass = KATEGORI_RENK[mekan.kategori] ?? KATEGORI_RENK["Diğer"];
  const icon       = KATEGORI_ICON[mekan.kategori] ?? "📍";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={mekan.isim}
    >
      {/* Sheet */}
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 p-5 pb-4 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                {mekan.isim}
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                {mekan.kategori}
              </span>
              {mekan.onaylandi && (
                <span className="flex items-center gap-1 text-xs text-green-700 font-semibold bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  Onaylı Mekan
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
            aria-label="Kapat"
          >
            <X className="w-4 h-4 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        {/* ── Scrollable body ─────────────────────────────────── */}
        <div className="overflow-y-auto flex-1">

          {/* Info rows */}
          <div className="p-5 space-y-4">

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Adres</p>
                <p className="text-sm text-gray-800 font-semibold leading-snug">
                  {mekan.adres || "—"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {mekan.sehir}, {mekan.ulke}
                </p>
              </div>
            </div>

            {/* Phone */}
            {mekan.telefon && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" aria-hidden="true" />
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

          {/* Google Maps embed — no API key required */}
          <div className="mx-4 mb-4 rounded-xl overflow-hidden border border-gray-200">
            <iframe
              src={mapSrc}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
              title={`${mekan.isim} haritası`}
            />
          </div>
        </div>

        {/* ── Footer actions ───────────────────────────────────── */}
        <div className="p-4 border-t border-gray-100 flex gap-3 bg-white">
          {mekan.google_maps_url ? (
            <a
              href={mekan.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 min-h-[44px] bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Yol Tarifi Al
            </a>
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-[44px] bg-gray-100 text-gray-400 rounded-xl text-sm font-medium select-none">
              Yol tarifi mevcut değil
            </div>
          )}
          <button
            onClick={onClose}
            className="px-5 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
