"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Navigation, X } from 'lucide-react';

// Dinamik import - SSR problems'i önlemek için
const L = typeof window !== 'undefined' ? require('leaflet') : null;

type Place = {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  food?: string;
  address?: string;
  phone?: string;
  map_link?: string;
  note?: string;
  price?: string;
  highlight?: boolean;
  warning?: boolean;
  category?: string;
};

type PlacesMapProps = {
  places: Place[];
  onPlaceSelect?: (place: Place) => void;
  center?: [number, number];
  zoom?: number;
};

export function PlacesMap({ places, onPlaceSelect, center = [51.1657, 10.4515], zoom = 6 }: PlacesMapProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Client-side only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isClient || !mapContainerRef.current || !L || mapRef.current) return;

    // Leaflet icon fix
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const map = L.map(mapContainerRef.current).setView(center, zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, center, zoom]);

  // Add markers for places
  useEffect(() => {
    if (!isClient || !mapRef.current || !L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter places with coordinates
    const placesWithCoords = places.filter(p => p.latitude && p.longitude);

    if (placesWithCoords.length === 0) return;

    // Create custom icon based on category
    const getIcon = (category?: string) => {
      const color = {
        restaurant: '#ef4444',
        cafe: '#f59e0b',
        bakery: '#eab308',
        fast_food: '#10b981',
        market: '#3b82f6',
        butcher: '#8b5cf6',
        other: '#6b7280'
      }[category || 'restaurant'];

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 16px;
              font-weight: bold;
            ">📍</div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });
    };

    // Add markers
    placesWithCoords.forEach(place => {
      if (!place.latitude || !place.longitude) return;

      const marker = L.marker([place.latitude, place.longitude], {
        icon: getIcon(place.category)
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-base mb-1">${place.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${place.city}, ${place.country}</p>
          ${place.food ? `<p class="text-xs text-gray-500 mb-2">🍽️ ${place.food}</p>` : ''}
          ${place.address ? `<p class="text-xs text-gray-400 italic mb-2">${place.address}</p>` : ''}
          <button 
            onclick="window.dispatchEvent(new CustomEvent('place-selected', { detail: '${place.id}' }))"
            class="mt-2 px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 w-full"
          >
            Detayları Gör
          </button>
        </div>
      `);

      marker.on('click', () => {
        setSelectedPlace(place);
        if (onPlaceSelect) onPlaceSelect(place);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }

  }, [isClient, places, onPlaceSelect, L]);

  // Get user location
  const getUserLocation = useCallback(() => {
    if (!isClient) return;
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          
          if (mapRef.current && L) {
            mapRef.current.setView(coords, 12);
            
            L.marker(coords, {
              icon: L.divIcon({
                className: 'user-location-marker',
                html: `
                  <div style="
                    background-color: #3b82f6;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                  "></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
              })
            }).addTo(mapRef.current)
              .bindPopup('Konumunuz')
              .openPopup();
          }
        },
        (error) => {
          console.error('Konum alınamadı:', error);
        }
      );
    }
  }, [isClient, L]);

  if (!isClient) {
    return <div className="w-full h-full rounded-xl bg-secondary animate-pulse" />;
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full rounded-xl overflow-hidden" />

      {/* Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          onClick={getUserLocation}
          size="icon"
          className="bg-white hover:bg-gray-100 text-gray-700 shadow-lg"
          title="Konumumu Bul"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Selected Place Card */}
      {selectedPlace && (
        <Card className="absolute bottom-4 left-4 right-4 z-[1000] max-w-md shadow-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{selectedPlace.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPlace.city}, {selectedPlace.country}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPlace(null)}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {selectedPlace.food && (
              <p className="text-sm mb-2">🍽️ {selectedPlace.food}</p>
            )}

            {selectedPlace.address && (
              <p className="text-xs text-muted-foreground italic mb-3">
                {selectedPlace.address}
              </p>
            )}

            <div className="flex gap-2">
              {selectedPlace.phone && (
                <Button size="sm" variant="outline" asChild className="flex-1">
                  <a href={`tel:${selectedPlace.phone}`}>Ara</a>
                </Button>
              )}
              {selectedPlace.map_link && (
                <Button size="sm" asChild className="flex-1">
                  <a href={selectedPlace.map_link} target="_blank" rel="noopener noreferrer">
                    Yol Tarifi
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3 text-xs">
        <div className="font-semibold mb-2">Kategori</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Restaurant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Cafe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Fırın</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Fast Food</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Market</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Kasap</span>
          </div>
        </div>
      </div>
    </div>
  );
}
