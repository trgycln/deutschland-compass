"use client";

import { useState, useCallback, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type FilterOptions = {
  categories?: string[];
  priceRanges?: string[];
  isOpen?: boolean;
  rating?: number;
};

type QuickFiltersProps = {
  onFilterChange: (filters: FilterOptions) => void;
  totalResults?: number;
};

export function QuickFilters({ onFilterChange, totalResults = 0 }: QuickFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const categories = [
    { id: 'restaurant', label: '🍽️ Restaurant', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
    { id: 'cafe', label: '☕ Cafe', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    { id: 'bakery', label: '🥖 Fırın', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
    { id: 'fast_food', label: '🍔 Fast Food', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { id: 'market', label: '🛒 Market', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { id: 'butcher', label: '🥩 Kasap', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  ];

  const priceRanges = [
    { id: 'budget', label: '€ Ucuz (< 10€)', range: [0, 10] },
    { id: 'moderate', label: '€€ Orta (10-20€)', range: [10, 20] },
    { id: 'expensive', label: '€€€ Pahalı (> 20€)', range: [20, 1000] },
  ];

  const ratings = [5, 4, 3, 2, 1];

  // State değişikliklerini izle ve parent'e bildir
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      priceRanges: selectedPrice.length > 0 ? selectedPrice : undefined,
      rating: selectedRating || undefined,
    });
  }, [selectedCategories, selectedPrice, selectedRating, onFilterChange]);

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const togglePrice = useCallback((priceId: string) => {
    setSelectedPrice(prev =>
      prev.includes(priceId)
        ? prev.filter(p => p !== priceId)
        : [...prev, priceId]
    );
  }, []);

  const toggleRating = useCallback((rating: number) => {
    setSelectedRating(prev => (prev === rating ? null : rating));
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPrice([]);
    setSelectedRating(null);
  }, []);

  const isFiltered = selectedCategories.length > 0 || selectedPrice.length > 0 || selectedRating !== null;

  return (
    <Card className="border-l-4 border-l-accent/50 shadow-sm">
      <CardContent className="p-4 md:p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg">Hızlı Filtreler</h3>
          </div>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs text-red-600 hover:bg-red-50"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Temizle
            </Button>
          )}
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Mekan Türü</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategories.includes(category.id)
                    ? `${category.color} ring-2 ring-offset-0`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Fiyat Aralığı</h4>
          <div className="space-y-2">
            {priceRanges.map(price => (
              <button
                key={price.id}
                onClick={() => togglePrice(price.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPrice.includes(price.id)
                    ? 'bg-primary text-white ring-2 ring-primary/30'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
              >
                {price.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Minimum Puan</h4>
          <div className="flex justify-between items-center">
            {ratings.map(rating => (
              <button
                key={rating}
                onClick={() => toggleRating(rating)}
                className={`p-2 rounded-lg transition-all ${
                  selectedRating === rating
                    ? 'bg-amber-100 ring-2 ring-amber-400'
                    : 'hover:bg-secondary'
                }`}
                title={`${rating} yıldız ve üzeri`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">{rating}</span>
                  <span className="text-lg">
                    {Array.from({ length: rating })
                      .map((_, i) => (
                        <span key={i} className="text-amber-400">★</span>
                      ))}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {totalResults > 0 && (
          <div className="flex items-center justify-between pt-4 border-t border-border/50 text-sm">
            <span className="text-muted-foreground">Bulunan Mekan:</span>
            <span className="font-bold text-primary text-lg">{totalResults}</span>
          </div>
        )}

        {/* Popular Filter Presets */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Hızlı Seçimler</h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-white"
              onClick={() => {
                setSelectedCategories(['restaurant']);
                setSelectedPrice([]);
                setSelectedRating(4);
              }}
            >
              ⭐ En Populer
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-white"
              onClick={() => {
                setSelectedCategories(['fast_food']);
                setSelectedPrice(['budget']);
                setSelectedRating(null);
              }}
            >
              💰 Ucuz & Hızlı
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-white"
              onClick={() => {
                setSelectedCategories(['bakery']);
                setSelectedPrice([]);
                setSelectedRating(null);
              }}
            >
              🥖 Kahvaltı
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
