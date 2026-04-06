"use client";

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, MapPin, ChevronLeft, ChevronRight, ThumbsUp, Users } from 'lucide-react';

type Place = {
  id: string;
  name: string;
  city: string;
  country: string;
  food?: string;
  address?: string;
  phone?: string;
  map_link?: string;
  note?: string;
  price?: string;
  highlight?: boolean;
  warning?: boolean;
  category?: string;
  avg_rating?: number;
  total_checkins?: number;
};

type FeaturedPlacesCarouselProps = {
  places: Place[];
  onPlaceClick?: (place: Place) => void;
};

export function FeaturedPlacesCarousel({ places, onPlaceClick }: FeaturedPlacesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (places.length === 0) return null;

  const getCategoryBadge = (category?: string) => {
    const categories = {
      restaurant: { label: 'Restaurant', color: 'bg-red-100 text-red-700' },
      cafe: { label: 'Cafe', color: 'bg-orange-100 text-orange-700' },
      bakery: { label: 'Fırın', color: 'bg-yellow-100 text-yellow-700' },
      fast_food: { label: 'Fast Food', color: 'bg-green-100 text-green-700' },
      market: { label: 'Market', color: 'bg-blue-100 text-blue-700' },
      butcher: { label: 'Kasap', color: 'bg-purple-100 text-purple-700' },
      other: { label: 'Diğer', color: 'bg-gray-100 text-gray-700' }
    };
    
    return categories[category as keyof typeof categories] || categories.other;
  };

  return (
    <div className="w-full">
      <div className="embla relative" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {places.map((place) => {
            const categoryInfo = getCategoryBadge(place.category);
            
            return (
              <div
                key={place.id}
                className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 cursor-pointer group overflow-hidden">
                  <div className="relative">
                    {/* Featured Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Öne Çıkan
                      </Badge>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]"></div>

                    {/* Image/Pattern Background */}
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                        }}></div>
                      </div>
                      
                      {/* Place Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-[2]">
                        <h3 className="font-bold text-xl text-white drop-shadow-lg mb-1">
                          {place.name}
                        </h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{place.city}, {place.country}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Category & Stats */}
                    <div className="flex items-center justify-between">
                      <Badge className={`${categoryInfo.color} text-xs`}>
                        {categoryInfo.label}
                      </Badge>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {place.avg_rating && place.avg_rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{place.avg_rating.toFixed(1)}</span>
                          </div>
                        )}
                        {place.total_checkins && place.total_checkins > 0 && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{place.total_checkins}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Food Type */}
                    {place.food && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        🍽️ {place.food}
                      </p>
                    )}

                    {/* Note */}
                    {place.note && (
                      <p className={`text-xs line-clamp-2 p-2 rounded-md ${
                        place.warning 
                          ? 'bg-red-50 text-red-800 border border-red-100' 
                          : 'bg-secondary/50 text-muted-foreground'
                      }`}>
                        {place.note}
                      </p>
                    )}

                    {/* Price */}
                    {place.price && (
                      <p className="text-sm font-semibold text-amber-600">
                        💰 {place.price}
                      </p>
                    )}

                    {/* Action Button */}
                    <Button
                      className="w-full mt-3"
                      variant={place.highlight ? "default" : "outline"}
                      onClick={() => onPlaceClick?.(place)}
                    >
                      Detaylı İncele
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        {places.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
              onClick={scrollNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Dots */}
      {places.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
