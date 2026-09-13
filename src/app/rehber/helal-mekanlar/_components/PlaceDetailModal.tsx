"use client";

import { X, MapPin, Phone, Globe, Navigation, Star, Utensils, Coffee, Scissors, ShoppingCart, Sparkles, Clock, MessageSquare } from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_COLOR } from "./constants";
import PlaceReviews from "./PlaceReviews";
import { getPlacePhoto } from "./placePhoto";

interface Props {
  mekan: HelalMekan;
  distance?: number | null;
  onClose: () => void;
}

const FEATURE_BADGES = [
  { key: "mescid_var" as keyof HelalMekan, label: "Mescidli", cls: "bg-teal-50 text-teal-700 border-teal-200" },
];

function CategoryHero({ kategori, highlight }: { kategori: string; highlight: boolean }) {
  const icon =
    kategori === "Restoran" ? <Utensils className="w-12 h-12 text-white/90" /> :
    kategori === "Kafe"     ? <Coffee className="w-12 h-12 text-white/90" /> :
    kategori === "Kasap"    ? <Scissors className="w-12 h-12 text-white/90" /> :
    kategori === "Firin"    ? <Utensils className="w-12 h-12 text-white/90" /> :
    kategori === "Market"   ? <ShoppingCart className="w-12 h-12 text-white/90" /> :
                              <MapPin className="w-12 h-12 text-white/90" />;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${
        highlight
          ? "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600"
          : "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700"
      }`}
    >
      <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner mb-2">
        {icon}
      </div>
      <span className="text-white/90 text-xs font-bold uppercase tracking-wider">{kategori}</span>
    </div>
  );
}

export default function PlaceDetailModal({ mekan, distance, onClose }: Props) {
  const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
  const activeFeatures = FEATURE_BADGES.filter((f) => mekan[f.key] === true);

  const mapsUrl = mekan.google_maps_url && mekan.google_maps_url.trim().length > 0
    ? mekan.google_maps_url
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mekan.isim} ${mekan.adres ? mekan.adres + " " : ""}${mekan.sehir}`)}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[620px] md:max-h-[90vh] z-[70] flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 md:zoom-in-95 duration-200">
        <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[inherit]">

          {/* Photo / Hero Banner */}
          <div className="relative h-48 flex-shrink-0 bg-slate-900 overflow-hidden">
            <img
              src={getPlacePhoto(mekan)}
              alt={mekan.isim}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors shadow-md"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Category & Highlight badges */}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                {mekan.kategori}
              </span>
              {mekan.highlight && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-white border border-amber-500 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-white" /> Öne Çıkan
                </span>
              )}
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Title & Rating */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight mb-1">{mekan.isim}</h2>

              {mekan.rating_count > 0 ? (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} viewBox="0 0 24 24" className={`w-4 h-4 ${s <= Math.round(mekan.rating_avg) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-amber-700">{mekan.rating_avg.toFixed(1)}</span>
                  <span className="text-xs text-gray-500 font-medium">({mekan.rating_count} değerlendirme)</span>
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium mt-0.5">Henüz değerlendirme eklenmedi</p>
              )}
            </div>

            {/* Specialty / Food highlight if available */}
            {mekan.food && (
              <div className="flex items-start gap-3 bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 shadow-sm">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">Menü & Lezzetler</span>
                  <p className="text-sm font-semibold text-amber-950 leading-snug mt-0.5">{mekan.food}</p>
                </div>
              </div>
            )}

            {/* Feature badges */}
            {activeFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFeatures.map((f) => (
                  <span key={f.key as string} className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${f.cls}`}>
                    {f.label}
                  </span>
                ))}
              </div>
            )}

            {/* Community Recommendation Note */}
            {mekan.note && (
              <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Topluluk Tavsiyesi & Deneyimi
                </div>
                <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                  &ldquo;{mekan.note}&rdquo;
                </p>
              </div>
            )}

            {/* Location & Details card */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 space-y-3">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/70 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Konum & Adres</p>
                  <p className="text-sm font-semibold text-slate-800">
                    <span>{mekan.sehir}</span>
                    {mekan.adres && <span className="font-normal text-slate-600">, {mekan.adres}</span>}
                  </p>
                  {distance != null && (
                    <p className="text-xs text-emerald-700 font-bold mt-1 inline-flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {distance < 1 ? `${Math.round(distance * 1000)} m mesafede` : `${distance.toFixed(1)} km mesafede`}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              {mekan.telefon && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-8 h-8 rounded-xl bg-blue-100/70 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Telefon</p>
                    <a href={`tel:${mekan.telefon}`} className="text-sm text-blue-700 font-semibold hover:underline">
                      {mekan.telefon}
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {mekan.website_url && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-8 h-8 rounded-xl bg-purple-100/70 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-purple-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Web Sitesi</p>
                    <a
                      href={mekan.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-700 font-semibold hover:underline truncate block"
                    >
                      {mekan.website_url.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}

              {/* Working Hours */}
              {mekan.working_hours && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/70 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Çalışma Saatleri</p>
                    <p className="text-sm font-semibold text-slate-800">{mekan.working_hours}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-1">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-900/10 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Google Maps&apos;te Yol Tarifi
              </a>
              {mekan.telefon && (
                <a
                  href={`tel:${mekan.telefon}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Ara
                </a>
              )}
            </div>

            {/* Community Reviews Section */}
            <div className="pt-2 border-t border-gray-100">
              <PlaceReviews placeId={mekan.id} placeName={mekan.isim} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

