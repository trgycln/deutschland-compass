"use client";
// Leaflet map — must be dynamically imported with ssr:false

import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
  ZoomControl
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Search,
  MapPin,
  Navigation,
  X,
  Loader2,
  Building2,
  Utensils,
  ChevronRight
} from "lucide-react";
import type { HelalMekan } from "../page";
import { KATEGORI_COLOR } from "./constants";

interface MapViewProps {
  mekanlar: HelalMekan[];
  allMekanlar?: HelalMekan[];
  userLocation: { lat: number; lng: number } | null;
  onSelectMekan: (m: HelalMekan) => void;
  selectedMekanId?: string | null;
  distances: Record<string, number>;
  onLocateUser?: () => void;
  locationLoading?: boolean;
}

// Germany center
const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;
const CITY_ZOOM = 13;
const VENUE_ZOOM = 16;

// Popular German cities for quick shortcuts
const QUICK_CITIES = [
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
  { name: "München", lat: 48.1351, lng: 11.5820 },
  { name: "Bremen", lat: 53.0793, lng: 8.8017 },
  { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
];

// Create a colored teardrop div icon
function createPin(color: string, isHighlight: boolean, isSelected: boolean): L.DivIcon {
  const size = isSelected ? 42 : (isHighlight ? 36 : 28);
  const inner = isSelected ? 12 : (isHighlight ? 10 : 8);
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px; height:${size}px;
      background:${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 12px rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      transition: all 0.2s ease;
      ${isSelected ? "outline:4px solid #3b82f6; outline-offset:2px; z-index:999;" : (isHighlight ? "outline:3px solid #f59e0b; outline-offset:1px;" : "")}
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

// Map fly controller
function MapFlyController({
  flyTarget,
  onFlyDone
}: {
  flyTarget: { lat: number; lng: number; zoom: number; placeId?: string } | null;
  onFlyDone: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (flyTarget) {
      map.flyTo([flyTarget.lat, flyTarget.lng], flyTarget.zoom, {
        duration: 1.3,
        easeLinearity: 0.25,
      });
      const timer = setTimeout(() => {
        onFlyDone();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [flyTarget, map, onFlyDone]);

  return null;
}

// User location handler
function UserLocationHandler({ userLocation }: { userLocation: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.5 });
    }
  }, [userLocation, map]);
  return null;
}

// Bounds fitter when places change
function BoundsFitter({ mekanlar, hasTarget }: { mekanlar: HelalMekan[]; hasTarget: boolean }) {
  const map = useMap();
  const withCoords = mekanlar.filter((m) => m.lat !== null && m.lng !== null);

  useEffect(() => {
    if (hasTarget) return; // don't override manual fly

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

// Force Leaflet to recalculate container dimensions (fixes 0x0 or squished corners on mobile / tab changes)
function MapResizer() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 50);
    const t2 = setTimeout(() => map.invalidateSize(), 250);
    const t3 = setTimeout(() => map.invalidateSize(), 600);

    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);

    const container = map.getContainer();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && container) {
      ro = new ResizeObserver(() => {
        map.invalidateSize();
      });
      ro.observe(container);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [map]);

  return null;
}

export default function MapView({
  mekanlar,
  allMekanlar,
  userLocation,
  onSelectMekan,
  selectedMekanId,
  distances,
  onLocateUser,
  locationLoading = false,
}: MapViewProps) {
  const sourcePlaces = allMekanlar && allMekanlar.length > 0 ? allMekanlar : mekanlar;
  const withCoords = useMemo(() => mekanlar.filter((m) => m.lat !== null && m.lng !== null), [mekanlar]);

  // Floating search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom: number; placeId?: string } | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const markerRefs = useRef<Record<string, L.Marker>>({});
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Precompute city centroids from available places
  const cityCentroids = useMemo(() => {
    const map: Record<string, { latSum: number; lngSum: number; count: number }> = {};
    sourcePlaces.forEach((p) => {
      if (p.sehir && p.lat !== null && p.lng !== null) {
        if (!map[p.sehir]) map[p.sehir] = { latSum: 0, lngSum: 0, count: 0 };
        map[p.sehir].latSum += p.lat;
        map[p.sehir].lngSum += p.lng;
        map[p.sehir].count += 1;
      }
    });

    return Object.entries(map).map(([name, data]) => ({
      name,
      lat: data.latSum / data.count,
      lng: data.lngSum / data.count,
      count: data.count,
    }));
  }, [sourcePlaces]);

  // Suggestions computation
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { cities: [], places: [], isPostal: false };

    const isPostal = /^\d{2,5}$/.test(q);

    // City matches
    const matchedCities = cityCentroids
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 4);

    // Place matches
    const matchedPlaces = sourcePlaces
      .filter((p) => {
        if (p.lat === null || p.lng === null) return false;
        const nameMatch = p.isim.toLowerCase().includes(q);
        const cityMatch = p.sehir.toLowerCase().includes(q);
        const addressMatch = (p.adres || "").toLowerCase().includes(q);
        const foodMatch = (p.food || "").toLowerCase().includes(q);
        return nameMatch || cityMatch || addressMatch || foodMatch;
      })
      .slice(0, 6);

    return { cities: matchedCities, places: matchedPlaces, isPostal };
  }, [searchQuery, cityCentroids, sourcePlaces]);

  // Fly to venue
  const goToPlace = useCallback((place: HelalMekan) => {
    if (place.lat === null || place.lng === null) return;
    setFlyTarget({ lat: place.lat, lng: place.lng, zoom: VENUE_ZOOM, placeId: place.id });
    setIsFocused(false);
    setSearchQuery(place.isim);
    setFeedbackMsg(`📍 ${place.isim} noktasına gidildi.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  }, []);

  // Fly to city
  const goToCity = useCallback((name: string, lat: number, lng: number) => {
    setFlyTarget({ lat, lng, zoom: CITY_ZOOM });
    setIsFocused(false);
    setSearchQuery(name);
    setFeedbackMsg(`🏙️ ${name} bölgesine gidildi.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  }, []);

  // Online geocoding for PLZ or custom address/city
  const executeGeocode = useCallback(async (queryStr: string) => {
    const q = queryStr.trim();
    if (!q) return;

    setIsGeocoding(true);
    setFeedbackMsg("Haritada aranıyor...");

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${q}, Germany`)}&limit=1`;
      const res = await fetch(url, { headers: { "User-Agent": "DeutschlandCompass/1.0" } });
      const data = await res.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const isPlz = /^\d{4,5}$/.test(q);
        setFlyTarget({ lat, lng, zoom: isPlz ? 14 : 13 });
        setIsFocused(false);
        setFeedbackMsg(`🎯 ${data[0].display_name.split(",")[0]} konumuna gidildi.`);
      } else {
        setFeedbackMsg("❌ Bu isim veya posta kodunda bir konum bulunamadı.");
      }
    } catch {
      setFeedbackMsg("⚠️ Konum araması sırasında bir hata oluştu.");
    } finally {
      setIsGeocoding(false);
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  }, []);

  // Handle Enter press or Submit
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    // Check first matching city
    if (suggestions.cities.length > 0) {
      const firstCity = suggestions.cities[0];
      goToCity(firstCity.name, firstCity.lat, firstCity.lng);
      return;
    }

    // Check first matching venue
    if (suggestions.places.length > 0) {
      goToPlace(suggestions.places[0]);
      return;
    }

    // Otherwise geocode
    executeGeocode(q);
  };

  // Open marker popup after fly animation
  const handleFlyDone = useCallback(() => {
    if (flyTarget?.placeId && markerRefs.current[flyTarget.placeId]) {
      markerRefs.current[flyTarget.placeId].openPopup();
    }
  }, [flyTarget]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200/80 shadow-md">
      
      {/* ════════════ FLOATING SEARCH BAR ON TOP OF MAP ════════════ */}
      <div
        ref={searchContainerRef}
        className="absolute top-3 left-3 right-3 z-[1000] pointer-events-auto max-w-md mx-auto"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/90 overflow-hidden transition-all duration-200">
          
          {/* Main Input Row */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 px-3.5 py-2.5">
            {isGeocoding ? (
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
            ) : (
              <Search className="w-4 h-4 text-emerald-700 shrink-0" />
            )}

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Şehir, PLZ veya mekan ara..."
              className="flex-1 min-w-0 text-xs sm:text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
            />

            {/* Clear button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFlyTarget(null);
                }}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
                title="Temizle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* GPS / My Location button */}
            {onLocateUser && (
              <button
                type="button"
                onClick={onLocateUser}
                disabled={locationLoading}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 transition-colors shrink-0 disabled:opacity-50"
                title="Bulunduğum Konuma Git"
              >
                {locationLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span className="hidden sm:inline">Konumum</span>
              </button>
            )}

            {/* Go button */}
            <button
              type="submit"
              className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0 shadow-sm"
            >
              Git
            </button>
          </form>

          {/* Feedback Toast / Status Bar */}
          {feedbackMsg && (
            <div className="bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 border-t border-emerald-100 font-medium flex items-center justify-between animate-fadeIn">
              <span>{feedbackMsg}</span>
              <button onClick={() => setFeedbackMsg(null)} className="text-emerald-500 hover:text-emerald-800">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Quick-Access City Chips (Visible when focused and query is short) */}
          {isFocused && searchQuery.length < 2 && (
            <div className="border-t border-gray-100 bg-slate-50/80 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" /> Popüler Şehirler:
              </p>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {QUICK_CITIES.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => goToCity(c.name, c.lat, c.lng)}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-gray-200/70 hover:border-emerald-300 rounded-full text-[11px] font-medium transition-all shadow-2xs whitespace-nowrap shrink-0"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Auto-suggest dropdown results */}
          {isFocused && searchQuery.length >= 1 && (
            <div className="border-t border-gray-100 max-h-64 overflow-y-auto divide-y divide-gray-50 bg-white">
              
              {/* Cities */}
              {suggestions.cities.length > 0 && (
                <div className="p-1">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Şehirler
                  </div>
                  {suggestions.cities.map((city) => (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => goToCity(city.name, city.lat, city.lng)}
                      className="w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                            {city.name}
                          </p>
                          <p className="text-[10px] text-gray-500">{city.count} helal mekan</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {/* Places */}
              {suggestions.places.length > 0 && (
                <div className="p-1">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Mekanlar
                  </div>
                  {suggestions.places.map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => goToPlace(place)}
                      className="w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <Utensils className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-amber-700 truncate transition-colors">
                            {place.isim}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            {place.sehir} {place.food ? `· ${place.food}` : ""}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-600 transition-colors shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}

              {/* Direct Geocode / PLZ search button */}
              <div className="p-1.5 bg-slate-50">
                <button
                  type="button"
                  onClick={() => executeGeocode(searchQuery)}
                  className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white hover:bg-emerald-50 border border-gray-200 text-xs font-medium text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">
                    Haritada Konuma Git: <strong>&ldquo;{searchQuery}&rdquo;</strong> (PLZ / Şehir)
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ════════════ LEAFLET MAP CONTAINER ════════════ */}
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Reposition zoom controls to bottom-left so floating action button and search bar never collide */}
        <ZoomControl position="bottomleft" />

        <MapResizer />
        <BoundsFitter mekanlar={mekanlar} hasTarget={flyTarget !== null} />
        <MapFlyController flyTarget={flyTarget} onFlyDone={handleFlyDone} />
        <UserLocationHandler userLocation={userLocation} />

        {/* User location marker */}
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
              <div className="text-sm font-semibold text-blue-700">📍 Bulunduğum Konum</div>
            </Popup>
          </CircleMarker>
        )}

        {/* Place markers */}
        {withCoords.map((mekan) => {
          const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
          const isSelected = selectedMekanId === mekan.id;
          const icon = createPin(colors.pin, mekan.highlight, isSelected);
          const dist = distances[mekan.id];

          return (
            <Marker
              key={mekan.id}
              position={[mekan.lat!, mekan.lng!]}
              icon={icon}
              ref={(r) => {
                if (r) markerRefs.current[mekan.id] = r;
              }}
            >
              <Popup minWidth={220}>
                <div className="p-1">
                  <div className="flex items-start gap-2 mb-1.5">
                    <div>
                      <p className="font-bold text-sm text-slate-900 leading-tight">{mekan.isim}</p>
                      <p className="text-xs text-gray-500">{mekan.sehir} {mekan.adres ? `· ${mekan.adres}` : ""}</p>
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

                  {/* Food specialty */}
                  {mekan.food && (
                    <p className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 rounded px-1.5 py-0.5 mb-1 truncate">
                      🍽️ {mekan.food}
                    </p>
                  )}

                  {/* Note preview */}
                  {mekan.note && (
                    <p className="text-[10px] text-emerald-950 font-medium italic line-clamp-2 mb-1.5 bg-emerald-50/70 p-1.5 rounded border border-emerald-100">
                      &ldquo;{mekan.note}&rdquo;
                    </p>
                  )}

                  <div className="flex gap-1.5 mt-2">
                    <a
                      href={mekan.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mekan.isim} ${mekan.sehir}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                    >
                      Yol Tarifi
                    </a>
                    <button
                      onClick={() => onSelectMekan(mekan)}
                      className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
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
            <p className="text-sm font-semibold text-gray-600">Bu filtredeki mekanların</p>
            <p className="text-xs text-gray-400">harita koordinatı henüz yok.</p>
          </div>
        </div>
      )}
    </div>
  );
}
