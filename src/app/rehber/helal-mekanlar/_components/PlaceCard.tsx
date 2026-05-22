"use client";
// Individual halal place card — category badge, verified indicator, note preview, feature badges, action buttons

import { CheckCircle2, MapPin, Phone, ExternalLink } from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_ICON, KATEGORI_RENK } from "./constants";

interface PlaceCardProps {
  mekan: HelalMekan;
  onDetay: () => void;
}

// Feature badges shown when the corresponding boolean field is true
const FEATURE_BADGES: {
  key: keyof HelalMekan;
  label: string;
  icon: string;
  cls: string;
}[] = [
  {
    key:   "mescid_var",
    label: "Mescidli",
    icon:  "🕌",
    cls:   "bg-blue-50 text-blue-700 border border-blue-100",
  },
  {
    key:   "helal_sertifikali",
    label: "Sertifikalı",
    icon:  "✅",
    cls:   "bg-green-50 text-green-700 border border-green-100",
  },
  {
    key:   "muslumana_ait",
    label: "Müslümana Ait",
    icon:  "👤",
    cls:   "bg-purple-50 text-purple-700 border border-purple-100",
  },
  {
    key:   "aile_dostu",
    label: "Aile Dostu",
    icon:  "👨‍👩‍👧",
    cls:   "bg-orange-50 text-orange-700 border border-orange-100",
  },
];

export default function PlaceCard({ mekan, onDetay }: PlaceCardProps) {
  const badgeClass = KATEGORI_RENK[mekan.kategori] ?? KATEGORI_RENK["Diğer"];
  const icon       = KATEGORI_ICON[mekan.kategori] ?? "📍";

  const activeFeatures = FEATURE_BADGES.filter((f) => mekan[f.key] === true);

  return (
    <article className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col">

      {/* ── Header: name + badges ──────────────────────────────── */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xl shrink-0" aria-hidden="true">{icon}</span>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {mekan.isim}
            </h3>
          </div>

          {/* City + address */}
          <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
            <MapPin className="w-3 h-3 shrink-0 text-green-500" aria-hidden="true" />
            <span className="font-medium text-gray-700">{mekan.sehir}</span>
            {mekan.adres && (
              <>
                <span className="text-gray-300" aria-hidden="true">·</span>
                <span className="truncate">{mekan.adres}</span>
              </>
            )}
          </div>
        </div>

        {/* Category + verified badges */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
            {mekan.kategori}
          </span>
          {mekan.onaylandi && (
            <span className="flex items-center gap-1 text-[11px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
              Onaylı
            </span>
          )}
        </div>
      </div>

      {/* ── Note preview ──────────────────────────────────────────── */}
      {mekan.note && (
        <p className="text-xs text-gray-500 italic line-clamp-2 mb-2 leading-relaxed">
          {mekan.note}
        </p>
      )}

      {/* ── Feature badges ────────────────────────────────────────── */}
      {activeFeatures.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {activeFeatures.map((f) => (
            <span
              key={f.key as string}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${f.cls}`}
            >
              <span aria-hidden="true">{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>
      )}

      {/* ── Phone ─────────────────────────────────────────────────── */}
      {mekan.telefon && (
        <a
          href={`tel:${mekan.telefon}`}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-700 mb-3 transition-colors w-fit min-h-[44px] sm:min-h-0"
        >
          <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
          {mekan.telefon}
        </a>
      )}

      <div className="flex-1" />

      {/* ── Action buttons ────────────────────────────────────────── */}
      <div className="flex gap-2 mt-3">
        {mekan.google_maps_url ? (
          <a
            href={mekan.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 justify-center flex-1 min-h-[44px] rounded-xl bg-green-50 text-green-700 border border-green-200 text-xs font-semibold hover:bg-green-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Yol Tarifi
          </a>
        ) : (
          <button
            disabled
            className="flex items-center gap-1.5 justify-center flex-1 min-h-[44px] rounded-xl bg-gray-100 text-gray-400 border border-gray-100 text-xs font-semibold opacity-50 cursor-not-allowed"
          >
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Harita Yok
          </button>
        )}

        <button
          onClick={onDetay}
          className="flex items-center gap-1.5 justify-center flex-1 min-h-[44px] rounded-xl bg-gray-800 text-white text-xs font-semibold hover:bg-gray-700 active:scale-95 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Detay
        </button>
      </div>
    </article>
  );
}
