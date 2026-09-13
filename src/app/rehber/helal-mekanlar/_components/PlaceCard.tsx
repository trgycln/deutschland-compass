"use client";

import { useState } from "react";
import { Star, MapPin, Phone, ExternalLink, Navigation, Utensils, Coffee, ShoppingCart, Scissors } from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_COLOR } from "./constants";
import { getPlacePhoto } from "./placePhoto";

interface PlaceCardProps {
  mekan: HelalMekan;
  distance?: number | null;
  onDetay: () => void;
  highlighted?: boolean;
  isRecent?: boolean;
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
  { key: "mescid_var" as keyof HelalMekan, label: "Mescidli", cls: "bg-teal-50 text-teal-700 border-teal-200" },
];

export default function PlaceCard({ mekan, distance, onDetay, highlighted, isRecent }: PlaceCardProps) {
  const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
  const activeFeatures = FEATURE_BADGES.filter((f) => mekan[f.key] === true);
  const hasRating = mekan.rating_count > 0;

  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col ${
        highlighted
          ? "border-amber-300 ring-1 ring-amber-200"
          : isRecent
          ? "border-sky-200 ring-1 ring-sky-100"
          : "border-gray-100"
      }`}
    >
      {/* Top photo banner */}
      <div className="relative h-36 flex-shrink-0 overflow-hidden bg-slate-900 group">
        <img
          src={getPlacePhoto(mekan)}
          alt={mekan.isim}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Overlay badges */}
        <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
            {mekan.kategori}
          </span>
          {highlighted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white border border-amber-400 shadow-xs">
              <Star className="w-2.5 h-2.5 fill-white" /> Öne Çıkan
            </span>
          ) : isRecent ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-xs">
              ✨ Yeni Keşif
            </span>
          ) : null}
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

        {/* Food specialty if available */}
        {mekan.food && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/70 rounded-lg px-2 py-1 mb-2 line-clamp-1">
            <Utensils className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">{mekan.food}</span>
          </div>
        )}

        {/* Stars */}
        {hasRating ? (
          <div className="mb-2">
            <StarRow avg={mekan.rating_avg} count={mekan.rating_count} />
          </div>
        ) : (
          <p className="text-[11px] text-gray-400 mb-2">Henüz değerlendirme yok</p>
        )}

        {/* Note preview */}
        {mekan.note && (
          <p className="text-xs text-emerald-900 bg-emerald-50/70 border border-emerald-100 rounded-lg p-2 italic line-clamp-2 mb-2 leading-relaxed font-medium">
            &ldquo;{mekan.note}&rdquo;
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
          <a
            href={mekan.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mekan.isim} ${mekan.sehir}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 justify-center flex-1 min-h-[40px] rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            Yol Tarifi
          </a>
          <button
            onClick={onDetay}
            className="flex items-center justify-center flex-1 min-h-[40px] rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Detaylar
          </button>
        </div>
      </div>
    </article>
  );
}
