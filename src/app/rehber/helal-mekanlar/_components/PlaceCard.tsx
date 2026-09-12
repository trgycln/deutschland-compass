"use client";

import { useState } from "react";
import { Star, MapPin, Phone, ExternalLink, Navigation, Utensils, Coffee, ShoppingCart, Scissors } from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_COLOR } from "./constants";

interface PlaceCardProps {
  mekan: HelalMekan;
  distance?: number | null;
  onDetay: () => void;
  highlighted?: boolean;
}

function StarRow({ avg, count }: { avg: number; count: number }) {
  const rounded = Math.round(avg);
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${s <= rounded ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] font-medium text-amber-700">{avg > 0 ? avg.toFixed(1) : ""}</span>
      {count > 0 && <span className="text-[11px] text-gray-400">({count})</span>}
    </div>
  );
}

function CategoryIcon({ kategori }: { kategori: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    Restoran:    <Utensils className="w-4 h-4" />,
    Kafe:        <Coffee className="w-4 h-4" />,
    Market:      <ShoppingCart className="w-4 h-4" />,
    Kasap:       <Scissors className="w-4 h-4" />,
  };
  return <>{iconMap[kategori] ?? <MapPin className="w-4 h-4" />}</>;
}

const FEATURE_BADGES = [
  { key: "mescid_var"        as keyof HelalMekan, label: "Mescidli",     cls: "bg-teal-50 text-teal-700 border-teal-200"   },
  { key: "helal_sertifikali" as keyof HelalMekan, label: "Sertifikali",  cls: "bg-green-50 text-green-700 border-green-200" },
  { key: "muslumana_ait"     as keyof HelalMekan, label: "Muslumana Ait",cls: "bg-purple-50 text-purple-700 border-purple-200"},
  { key: "aile_dostu"        as keyof HelalMekan, label: "Aile Dostu",   cls: "bg-orange-50 text-orange-700 border-orange-200"},
];

export default function PlaceCard({ mekan, distance, onDetay, highlighted }: PlaceCardProps) {
  const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
  const activeFeatures = FEATURE_BADGES.filter((f) => mekan[f.key] === true);
  const hasRating = mekan.rating_count > 0;

  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col ${
        highlighted
          ? "border-amber-300 ring-1 ring-amber-200"
          : "border-gray-100"
      }`}
    >
      {/* Top photo / gradient banner */}
      <div className="relative h-28 flex-shrink-0 overflow-hidden">
        {mekan.foto_url ? (
          <img
            src={mekan.foto_url}
            alt={mekan.isim}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              highlighted
                ? "bg-gradient-to-br from-amber-400 to-orange-400"
                : "bg-gradient-to-br from-emerald-400 to-teal-500"
            }`}
          >
            <span className="text-white/80">
              <CategoryIcon kategori={mekan.kategori} />
            </span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
            {mekan.kategori}
          </span>
          {highlighted && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-white border border-amber-500">
              <Star className="w-2.5 h-2.5 fill-white" /> One Cikan
            </span>
          )}
        </div>

        {/* Distance badge */}
        {distance != null && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-emerald-700 shadow-sm border border-white">
              <Navigation className="w-2.5 h-2.5" />
              {distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-bold text-slate-900 text-base leading-tight mb-1 line-clamp-2">
          {mekan.isim}
        </h3>

        {/* City + address */}
        <div className="flex items-start gap-1 text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3 shrink-0 text-emerald-500 mt-0.5" />
          <span>
            <span className="font-medium text-gray-700">{mekan.sehir}</span>
            {mekan.adres && <>, {mekan.adres}</>}
          </span>
        </div>

        {/* Stars */}
        {hasRating ? (
          <div className="mb-2">
            <StarRow avg={mekan.rating_avg} count={mekan.rating_count} />
          </div>
        ) : (
          <p className="text-[11px] text-gray-400 mb-2">Henuz degerlendirme yok</p>
        )}

        {/* Note preview */}
        {mekan.note && (
          <p className="text-xs text-gray-500 italic line-clamp-2 mb-2 leading-relaxed">
            {mekan.note}
          </p>
        )}

        {/* Feature badges */}
        {activeFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {activeFeatures.map((f) => (
              <span key={f.key as string} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${f.cls}`}>
                {f.label}
              </span>
            ))}
          </div>
        )}

        {/* Phone */}
        {mekan.telefon && (
          <a
            href={`tel:${mekan.telefon}`}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-700 mb-2 transition-colors w-fit"
          >
            <Phone className="w-3 h-3 shrink-0" />
            {mekan.telefon}
          </a>
        )}

        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          {mekan.google_maps_url ? (
            <a
              href={mekan.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 justify-center flex-1 min-h-[40px] rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Yol Tarifi
            </a>
          ) : (
            <span className="flex items-center justify-center flex-1 min-h-[40px] rounded-xl bg-gray-50 text-gray-300 text-xs border border-gray-100">
              Harita Yok
            </span>
          )}
          <button
            onClick={onDetay}
            className="flex items-center gap-1.5 justify-center flex-1 min-h-[40px] rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 active:scale-95 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Detay
          </button>
        </div>
      </div>
    </article>
  );
}
