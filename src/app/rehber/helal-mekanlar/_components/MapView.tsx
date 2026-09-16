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
import Supercluster from "supercluster";
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
  isMapActive?: boolean;
}

// Check if leaflet container is visible and has positive dimensions
function isMapVisible(map: L.Map): boolean {
  try {
    const container = map.getContainer();
    if (!container) return false;
    return container.clientWidth > 0 && container.clientHeight > 0;
  } catch {
    return false;
  }
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

// ── Cache for DivIcons to avoid re-creating DOM strings on every render ──
const pinIconCache = new Map<string, L.DivIcon>();
const clusterIconCache = new Map<number, L.DivIcon>();

function getPinIcon(color: string, isHighlight: boolean, isSelected: boolean): L.DivIcon {
  const cacheKey = `${color}_${isHighlight ? 1 : 0}_${isSelected ? 1 : 0}`;
  const cached = pinIconCache.get(cacheKey);
  if (cached) return cached;

  const size = isSelected ? 40 : (isHighlight ? 34 : 26);
  const inner = isSelected ? 12 : (isHighlight ? 10 : 8);

  // Distinct radiant golden-amber gradient for highlighted venues
  const pinBg = isHighlight
    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    : color;

  const pinShadow = isHighlight
    ? "0 4px 14px rgba(217, 119, 6, 0.55), 0 0 0 1.5px rgba(251, 191, 36, 0.65)"
    : "0 2px 8px rgba(0,0,0,0.32)";

  const pinOutline = isSelected
    ? "outline:3.5px solid #2563eb; outline-offset:2px; z-index:999;"
    : (isHighlight ? "outline:2px solid #fbbf24; outline-offset:1px;" : "");

  const innerContent = isHighlight
    ? `<span style="
        display:flex; align-items:center; justify-content:center;
        transform:rotate(45deg);
        color:#ffffff;
        font-size:${isSelected ? 16 : 14}px;
        line-height:1;
        font-weight:bold;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));
      ">★</span>`
    : `<div style="
        width:${inner}px; height:${inner}px;
        background:white; border-radius:50%;
        transform:rotate(45deg);
      "></div>`;

  const icon = L.divIcon({
    className: "pin-icon-wrap",
    html: `<div style="
      width:${size}px; height:${size}px;
      background:${pinBg};
      border: 2.5px solid #ffffff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: ${pinShadow};
      display:flex; align-items:center; justify-content:center;
      ${pinOutline}
    ">
      ${innerContent}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size - 4],
  });

  pinIconCache.set(cacheKey, icon);
  return icon;
}

function getClusterIcon(count: number): L.DivIcon {
  const cached = clusterIconCache.get(count);
  if (cached) return cached;

  let size = 34;
  let bgGradient = "linear-gradient(135deg, #059669 0%, #047857 100%)";
  let fontSize = 12;

  if (count >= 100) {
    size = 46;
    bgGradient = "linear-gradient(135deg, #047857 0%, #064e3b 100%)";
    fontSize = 13;
  } else if (count >= 30) {
    size = 40;
    bgGradient = "linear-gradient(135deg, #059669 0%, #047857 100%)";
    fontSize = 12;
  } else if (count >= 10) {
    size = 36;
    bgGradient = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    fontSize = 12;
  }

  const icon = L.divIcon({
    className: "cluster-icon-wrap",
    html: `<div style="
      width:${size}px; height:${size}px;
      display:flex; align-items:center; justify-content:center;
      border-radius:50%;
      background:${bgGradient};
      color:#ffffff;
      font-weight:700;
      font-size:${fontSize}px;
      font-family:system-ui, -apple-system, sans-serif;
      box-shadow:0 3px 10px rgba(4, 120, 87, 0.4);
      border:2.5px solid #ffffff;
      cursor:pointer;
      user-select:none;
    ">
      ${count}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  clusterIconCache.set(count, icon);
  return icon;
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
    if (flyTarget && isFinite(flyTarget.lat) && isFinite(flyTarget.lng) && isFinite(flyTarget.zoom)) {
      if (!isMapVisible(map)) return;
      try {
        map.flyTo([flyTarget.lat, flyTarget.lng], flyTarget.zoom, {
          duration: 1.0,
          easeLinearity: 0.25,
        });
        const timer = setTimeout(() => {
          onFlyDone();
        }, 1050);
        return () => clearTimeout(timer);
      } catch (e) {
        console.warn("[MapFlyController] flyTo caught:", e);
      }
    }
  }, [flyTarget, map, onFlyDone]);

  return null;
}

// User location handler
function UserLocationHandler({
  userLocation,
  isMapActive,
}: {
  userLocation: { lat: number; lng: number } | null;
  isMapActive?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (userLocation && isFinite(userLocation.lat) && isFinite(userLocation.lng)) {
      if (!isMapVisible(map)) return;
      try {
        map.invalidateSize();
        map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.1 });
      } catch (e) {
        console.warn("[UserLocationHandler] flyTo caught:", e);
      }
    }
  }, [userLocation, isMapActive, map]);

  return null;
}

// Bounds fitter when places change
function BoundsFitter({ mekanlar, hasTarget }: { mekanlar: HelalMekan[]; hasTarget: boolean }) {
  const map = useMap();
  const withCoords = useMemo(() => mekanlar.filter((m) => m.lat !== null && m.lng !== null), [mekanlar]);

  useEffect(() => {
    if (hasTarget) return;
    if (!isMapVisible(map)) return;

    try {
      if (withCoords.length === 0) {
        map.setView(GERMANY_CENTER, DEFAULT_ZOOM);
        return;
      }
      if (withCoords.length === 1) {
        map.setView([withCoords[0].lat!, withCoords[0].lng!], CITY_ZOOM);
        return;
      }
      const bounds = L.latLngBounds(withCoords.map((m) => [m.lat!, m.lng!] as [number, number]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [35, 35], maxZoom: 14 });
      }
    } catch (e) {
      console.warn("[BoundsFitter] fitBounds caught:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mekanlar]);

  return null;
}

// Dismiss popup when clicking or tapping on empty space on the map
function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  const map = useMap();

  useEffect(() => {
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const orig = e.originalEvent;
      const target = orig?.target as HTMLElement | null;
      if (
        target &&
        (target.closest(".leaflet-popup") ||
          target.closest(".leaflet-marker-icon") ||
          target.closest(".leaflet-control") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("a"))
      ) {
        return;
      }
      onMapClick();
    };

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, onMapClick]);

  return null;
}

// Force Leaflet to recalculate container dimensions when switching views or resizing
function MapResizer({ isMapActive }: { isMapActive?: boolean }) {
  const map = useMap();

  useEffect(() => {
    const trigger = () => {
      try {
        map.invalidateSize();
      } catch (e) {
        console.warn("[MapResizer] invalidateSize caught:", e);
      }
    };

    trigger();
    const t1 = setTimeout(trigger, 80);
    const t2 = setTimeout(trigger, 300);

    const onResize = () => trigger();
    window.addEventListener("resize", onResize);

    const container = map.getContainer();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && container) {
      ro = new ResizeObserver(() => {
        trigger();
      });
      ro.observe(container);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [map, isMapActive]);

  return null;
}

// ── Clustered Markers Layer using Supercluster ──
interface PointProps {
  cluster: false;
  mekan: HelalMekan;
}

interface ClusterProps {
  cluster: true;
  cluster_id: number;
  point_count: number;
}

type ClusterItem = ReturnType<Supercluster<PointProps, ClusterProps>["getClusters"]>[number];

function ClusteredMarkers({
  clusterIndex,
  onSelectMekan,
  selectedMekanId,
  onMarkerClick,
  isMapActive,
}: {
  clusterIndex: Supercluster<PointProps, ClusterProps>;
  onSelectMekan: (m: HelalMekan) => void;
  selectedMekanId?: string | null;
  onMarkerClick: (m: HelalMekan) => void;
  isMapActive?: boolean;
}) {
  const map = useMap();
  const [clusters, setClusters] = useState<ClusterItem[]>([]);

  const updateClusters = useCallback(() => {
    if (!isMapVisible(map)) return;
    try {
      const bounds = map.getBounds();
      if (!bounds || !bounds.isValid()) return;
      const west = bounds.getWest();
      const south = bounds.getSouth();
      const east = bounds.getEast();
      const north = bounds.getNorth();
      if (!isFinite(west) || !isFinite(south) || !isFinite(east) || !isFinite(north)) return;

      const zoom = Math.round(map.getZoom());
      if (!isFinite(zoom) || zoom < 0) return;

      const bbox: [number, number, number, number] = [
        Math.max(-180, Math.min(180, west)),
        Math.max(-85, Math.min(85, south)),
        Math.max(-180, Math.min(180, east)),
        Math.max(-85, Math.min(85, north)),
      ];
      const items = clusterIndex.getClusters(bbox, zoom);
      setClusters(items);
    } catch (e) {
      console.warn("[ClusteredMarkers] updateClusters caught:", e);
    }
  }, [clusterIndex, map]);

  useEffect(() => {
    updateClusters();
    map.on("moveend", updateClusters);
    map.on("zoomend", updateClusters);

    return () => {
      map.off("moveend", updateClusters);
      map.off("zoomend", updateClusters);
    };
  }, [map, updateClusters, isMapActive]);

  const handleClusterClick = useCallback(
    (clusterId: number, lat: number, lng: number) => {
      const expansionZoom = Math.min(clusterIndex.getClusterExpansionZoom(clusterId), 17);
      map.flyTo([lat, lng], expansionZoom, { duration: 0.6 });
    },
    [clusterIndex, map]
  );

  return (
    <>
      {clusters.map((item) => {
        const [lng, lat] = item.geometry.coordinates;

        // Cluster bubble
        if (item.properties.cluster) {
          const { cluster_id, point_count } = item.properties;
          const clusterIcon = getClusterIcon(point_count);

          return (
            <Marker
              key={`cluster-${cluster_id}`}
              position={[lat, lng]}
              icon={clusterIcon}
              eventHandlers={{
                click: () => handleClusterClick(cluster_id, lat, lng),
              }}
            />
          );
        }

        // Single Venue Pin
        const mekan = item.properties.mekan;
        const colors = KATEGORI_COLOR[mekan.kategori] ?? KATEGORI_COLOR["Diger"];
        const isSelected = selectedMekanId === mekan.id;
        const pinIcon = getPinIcon(colors.pin, mekan.highlight, isSelected);

        return (
          <Marker
            key={mekan.id}
            position={[lat, lng]}
            icon={pinIcon}
            zIndexOffset={isSelected ? 1000 : (mekan.highlight ? 400 : 1)}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e);
                onMarkerClick(mekan);
              },
            }}
          />
        );
      })}
    </>
  );
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
  isMapActive = false,
}: MapViewProps) {
  const sourcePlaces = allMekanlar && allMekanlar.length > 0 ? allMekanlar : mekanlar;
  const withCoords = useMemo(() => mekanlar.filter((m) => m.lat !== null && m.lng !== null), [mekanlar]);

  // Floating search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom: number; placeId?: string } | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleLocateClick = useCallback(() => {
    if (userLocation && isFinite(userLocation.lat) && isFinite(userLocation.lng)) {
      setFlyTarget({ lat: userLocation.lat, lng: userLocation.lng, zoom: 14 });
      setFeedbackMsg("📍 Bulunduğunuz konuma gidildi.");
      setTimeout(() => setFeedbackMsg(null), 2500);
    } else if (onLocateUser) {
      onLocateUser();
    }
  }, [userLocation, onLocateUser]);

  // Single active popup state (replaces 730 separate popups)
  const [activePopupMekan, setActivePopupMekan] = useState<HelalMekan | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync active popup if selectedMekanId changes from outside
  useEffect(() => {
    if (selectedMekanId) {
      const found = sourcePlaces.find((m) => m.id === selectedMekanId);
      if (found && found.lat !== null && found.lng !== null) {
        setActivePopupMekan(found);
      }
    }
  }, [selectedMekanId, sourcePlaces]);

  // Initialize Supercluster index whenever mekanlar changes
  const clusterIndex = useMemo(() => {
    const sc = new Supercluster<PointProps, ClusterProps>({
      radius: 55,
      maxZoom: 16,
    });

    const points = withCoords.map((m) => ({
      type: "Feature" as const,
      properties: {
        cluster: false as const,
        mekan: m,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [m.lng!, m.lat!] as [number, number],
      },
    }));

    sc.load(points);
    return sc;
  }, [withCoords]);

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

    if (suggestions.cities.length > 0) {
      const firstCity = suggestions.cities[0];
      goToCity(firstCity.name, firstCity.lat, firstCity.lng);
      return;
    }

    if (suggestions.places.length > 0) {
      goToPlace(suggestions.places[0]);
      return;
    }

    executeGeocode(q);
  };

  // Open single active popup after fly animation completes
  const handleFlyDone = useCallback(() => {
    if (flyTarget?.placeId) {
      const p = sourcePlaces.find((m) => m.id === flyTarget.placeId);
      if (p) setActivePopupMekan(p);
    }
  }, [flyTarget, sourcePlaces]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-slate-100">
      
      {/* ════════════ FLOATING SEARCH BAR ON TOP OF MAP (Optimized GPU layout) ════════════ */}
      <div
        ref={searchContainerRef}
        className="absolute top-3 left-3 right-3 z-[1000] pointer-events-auto max-w-md mx-auto"
      >
        <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-150">
          
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
            {(onLocateUser || userLocation) && (
              <button
                type="button"
                onClick={handleLocateClick}
                disabled={locationLoading}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
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
            <div className="bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 border-t border-emerald-100 font-medium flex items-center justify-between">
              <span>{feedbackMsg}</span>
              <button onClick={() => setFeedbackMsg(null)} className="text-emerald-500 hover:text-emerald-800">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Quick-Access City Chips (Visible when focused and query is short) */}
          {isFocused && searchQuery.length < 2 && (
            <div className="border-t border-gray-100 bg-slate-50 px-3 py-2">
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
        preferCanvas={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Reposition zoom controls to bottom-left so floating search bar never collides */}
        <ZoomControl position="bottomleft" />

        <MapResizer isMapActive={isMapActive} />
        <BoundsFitter mekanlar={mekanlar} hasTarget={flyTarget !== null} />
        <MapFlyController flyTarget={flyTarget} onFlyDone={handleFlyDone} />
        <UserLocationHandler userLocation={userLocation} isMapActive={isMapActive} />

        {/* User location marker */}
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={9}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.9,
              weight: 2.5,
            }}
          >
            <Popup>
              <div className="text-sm font-semibold text-blue-700">📍 Bulunduğum Konum</div>
            </Popup>
          </CircleMarker>
        )}

        {/* Clustered Places Layer */}
        <ClusteredMarkers
          clusterIndex={clusterIndex}
          onSelectMekan={onSelectMekan}
          selectedMekanId={selectedMekanId}
          onMarkerClick={(m) => setActivePopupMekan(m)}
          isMapActive={isMapActive}
        />

        {/* Map Click Handler: Closes popup when clicking empty space */}
        <MapClickHandler onMapClick={() => setActivePopupMekan(null)} />

        {/* Single Dynamic Popup (Only renders when a place is active) */}
        {activePopupMekan && activePopupMekan.lat !== null && activePopupMekan.lng !== null && (
          <Popup
            key={activePopupMekan.id}
            position={[activePopupMekan.lat, activePopupMekan.lng]}
            closeButton={false}
            autoPan={true}
            autoPanPaddingTopLeft={[20, 115]}
            autoPanPaddingBottomRight={[20, 80]}
            eventHandlers={{
              remove: () => setActivePopupMekan(null),
            }}
          >
            <div className="p-1 min-w-[215px] max-w-[280px]">
              {/* Header with Title and Touch-Friendly Close Button */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0 flex-1 pr-1">
                  <p className="font-bold text-sm text-slate-900 leading-tight truncate">{activePopupMekan.isim}</p>
                  <p className="text-xs text-gray-500 truncate">{activePopupMekan.sehir} {activePopupMekan.adres ? `· ${activePopupMekan.adres}` : ""}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopupMekan(null);
                  }}
                  className="shrink-0 p-1 -mr-1 -mt-1 text-gray-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  title="Kapat"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stars */}
              {activePopupMekan.rating_count > 0 && (
                <div className="flex items-center gap-1 mb-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" className={`w-3 h-3 ${s <= Math.round(activePopupMekan.rating_avg) ? "fill-amber-400" : "fill-gray-200"}`}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-[10px] text-gray-500">({activePopupMekan.rating_count})</span>
                </div>
              )}

              {distances[activePopupMekan.id] != null && (
                <p className="text-[11px] text-emerald-700 font-semibold mb-1.5">
                  {distances[activePopupMekan.id] < 1
                    ? `${Math.round(distances[activePopupMekan.id] * 1000)} m uzakta`
                    : `${distances[activePopupMekan.id].toFixed(1)} km uzakta`}
                </p>
              )}

              {/* Food specialty */}
              {activePopupMekan.food && (
                <p className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 rounded px-1.5 py-0.5 mb-1 truncate">
                  🍽️ {activePopupMekan.food}
                </p>
              )}

              {/* Note preview */}
              {activePopupMekan.note && (
                <p className="text-[10px] text-emerald-950 font-medium italic line-clamp-2 mb-1.5 bg-emerald-50/70 p-1.5 rounded border border-emerald-100">
                  &ldquo;{activePopupMekan.note}&rdquo;
                </p>
              )}

              <div className="flex gap-1.5 mt-2">
                <a
                  href={activePopupMekan.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activePopupMekan.isim} ${activePopupMekan.sehir}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                >
                  Yol Tarifi
                </a>
                <button
                  type="button"
                  onClick={() => onSelectMekan(activePopupMekan)}
                  className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                >
                  Detay
                </button>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>

      {withCoords.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl z-[1000] pointer-events-none">
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

