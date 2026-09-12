"use client";
// Leaflet map — must be dynamically imported with ssr:false

import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { HelalMekan } from "../page";
import { KATEGORI_COLOR } from "./constants";

// ── Fix default Leaflet icon path issue ──
// We use divIcons instead, so no need to patch default icons.

interface MapViewProps {
  mekanlar: HelalMekan[];
  userLocation: { lat: number; lng: number } | null;
  onSelectMekan: (m: HelalMekan) => void;
  selectedMekanId?: string | null;
  distances: Record<string, number>;
}

// Germany center
const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;
const CITY_ZOOM = 12;

// Create a colored teardrop div icon
function createPin(color: string, isHighlight: boolean): L.DivIcon {
  const size = isHighlight ? 36 : 28;
  const inner = isHighlight ? 10 : 8;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px; height:${size}px;
      background:${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display:flex; align-items:center; justify-content:center;
      ${isHighlight ? "outline:3px solid #f59e0b; outline-offset:1px;" : ""}
    ">
      <div style="
        width:${inner}px; height:${inner}px;
        background:white; border-radius:50%;
        transform:rotate(45deg);
      "></div>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size - 4],
  });
}

// Component that fits bounds when filtered places change
function BoundsFitter({ mekanlar }: { mekanlar: HelalMekan[] }) {
  const map = useMap();
  const withCoords = mekanlar.filter((m) => m.lat !== null && m.lng !== null);

  useEffect(() => {
    if (withCoords.length === 0) {
      map.setView(GERMANY_CENTER, DEFAULT_ZOOM);
      return;
    }
    if (withCoords.length === 1) {
      map.setView([withCoords[0].lat!, withCoords[0].lng!], CITY_ZOOM);
      return;
    }
    const bounds = L.latLngBounds(withCoords.map((m) => [m.lat!, m.lng!] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mekanlar]);

  return null;
}

export default function MapView({ mekanlar, userLocation, onSelectMekan, selectedMekanId, distances }: MapViewProps) {
  const withCoords = useMemo(() => mekanlar.filter((m) => m.lat !== null && m.lng !== null), [mekanlar]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <BoundsFitter mekanlar={mekanlar} />

        {/* User location */}
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={10}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.9,
              weight: 3,
            }}
          >
            <Popup>
              <div className="text-sm font-semibold text-blue-700">Bulundugum Konum</div>
            </Popup>
          </CircleMarker>
        )}

        {/* Place markers */}
        {withCoords.map((mekan) => {
          const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
          const icon = createPin(colors.pin, mekan.highlight);
          const dist = distances[mekan.id];

          return (
            <Marker
              key={mekan.id}
              position={[mekan.lat!, mekan.lng!]}
              icon={icon}
            >
              <Popup minWidth={200}>
                <div className="p-1">
                  <div className="flex items-start gap-2 mb-1.5">
                    <div>
                      <p className="font-bold text-sm text-slate-900 leading-tight">{mekan.isim}</p>
                      <p className="text-xs text-gray-500">{mekan.sehir}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  {mekan.rating_count > 0 && (
                    <div className="flex items-center gap-1 mb-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} viewBox="0 0 24 24" className={`w-3 h-3 ${s <= Math.round(mekan.rating_avg) ? "fill-amber-400" : "fill-gray-200"}`}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-[10px] text-gray-500">({mekan.rating_count})</span>
                    </div>
                  )}

                  {dist != null && (
                    <p className="text-[11px] text-emerald-700 font-semibold mb-1.5">
                      {dist < 1 ? `${Math.round(dist * 1000)} m uzakta` : `${dist.toFixed(1)} km uzakta`}
                    </p>
                  )}

                  <div className="flex gap-1.5">
                    {mekan.google_maps_url && (
                      <a
                        href={mekan.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-[11px] font-semibold py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      >
                        Yol Tarifi
                      </a>
                    )}
                    <button
                      onClick={() => onSelectMekan(mekan)}
                      className="flex-1 text-center text-[11px] font-semibold py-1 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                    >
                      Detay
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {withCoords.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl z-[1000] pointer-events-none">
          <div className="text-center">
            <p className="text-4xl mb-2">&#128506;</p>
            <p className="text-sm font-semibold text-gray-600">Bu filtredeki mekanlarin</p>
            <p className="text-xs text-gray-400">harita koordinati henuz yok.</p>
          </div>
        </div>
      )}
    </div>
  );
}
