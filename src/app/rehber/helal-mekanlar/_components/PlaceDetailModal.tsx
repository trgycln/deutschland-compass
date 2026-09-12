"use client";

import { X, MapPin, Phone, Globe, ExternalLink, Star } from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_COLOR } from "./constants";
import PlaceReviews from "./PlaceReviews";

interface Props {
  mekan: HelalMekan;
  distance?: number | null;
  onClose: () => void;
}

const FEATURE_BADGES = [
  { key: "mescid_var"        as keyof HelalMekan, label: "Mescidli",      cls: "bg-teal-50 text-teal-700 border-teal-200"    },
  { key: "helal_sertifikali" as keyof HelalMekan, label: "Sertifikali",   cls: "bg-green-50 text-green-700 border-green-200"  },
  { key: "muslumana_ait"     as keyof HelalMekan, label: "Muslumana Ait", cls: "bg-purple-50 text-purple-700 border-purple-200"},
  { key: "aile_dostu"        as keyof HelalMekan, label: "Aile Dostu",    cls: "bg-orange-50 text-orange-700 border-orange-200"},
];

export default function PlaceDetailModal({ mekan, distance, onClose }: Props) {
  const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
  const activeFeatures = FEATURE_BADGES.filter((f) => mekan[f.key] === true);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[90vh] z-[70] flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 md:zoom-in-95 duration-200">
        <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[inherit]">

          {/* Photo / Hero */}
          <div className="relative h-44 flex-shrink-0">
            {mekan.foto_url ? (
              <img src={mekan.foto_url} alt={mekan.isim} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center text-6xl ${
                mekan.highlight
                  ? "bg-gradient-to-br from-amber-400 to-orange-400"
                  : "bg-gradient-to-br from-emerald-500 to-teal-600"
              }`}>
                {mekan.kategori === "Restoran" ? "&#127859;" :
                 mekan.kategori === "Kafe"     ? "&#9749;" :
                 mekan.kategori === "Kasap"    ? "&#129385;" :
                 mekan.kategori === "Firin"    ? "&#129392;" :
                 mekan.kategori === "Market"   ? "&#128722;" : "&#128204;"}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Category badge */}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                {mekan.kategori}
              </span>
              {mekan.highlight && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-white border border-amber-500 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> One Cikan
                </span>
              )}
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Name + stars */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight mb-1">{mekan.isim}</h2>

              {mekan.rating_count > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} viewBox="0 0 24 24" className={`w-4 h-4 ${s <= Math.round(mekan.rating_avg) ? "fill-amber-400" : "fill-gray-200"}`}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-amber-600">{mekan.rating_avg.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">({mekan.rating_count} degerlendirme)</span>
                </div>
              )}
            </div>

            {/* Feature badges */}
            {activeFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFeatures.map((f) => (
                  <span key={f.key as string} className={`text-xs font-semibold px-3 py-1 rounded-full border ${f.cls}`}>
                    {f.label}
                  </span>
                ))}
              </div>
            )}

            {/* Info rows */}
            <div className="space-y-2.5">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">{mekan.sehir}</span>
                    {mekan.adres && <>, {mekan.adres}</>}
                  </p>
                  {distance != null && (
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">
                      {distance < 1 ? `${Math.round(distance * 1000)} m uzakta` : `${distance.toFixed(1)} km uzakta`}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              {mekan.telefon && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <a href={`tel:${mekan.telefon}`} className="text-sm text-emerald-700 font-medium hover:underline">
                    {mekan.telefon}
                  </a>
                </div>
              )}

              {/* Website */}
              {mekan.website_url && (
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                  <a
                    href={mekan.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-700 font-medium hover:underline truncate"
                  >
                    {mekan.website_url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>

            {/* Note */}
            {mekan.note && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <p className="text-sm text-emerald-900 italic leading-relaxed">{mekan.note}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              {mekan.google_maps_url && (
                <a
                  href={mekan.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
              )}
              {mekan.website_url && (
                <a
                  href={mekan.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Web Sitesi
                </a>
              )}
            </div>

            {/* Reviews */}
            <PlaceReviews placeId={mekan.id} placeName={mekan.isim} />
          </div>
        </div>
      </div>
    </>
  );
}
