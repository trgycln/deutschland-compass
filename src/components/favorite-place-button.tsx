"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface FavoritePlaceButtonProps {
  placeSlug: string;
  placeName: string;
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export function FavoritePlaceButton({ 
  placeSlug, 
  placeName,
  size = "default",
  showText = true
}: FavoritePlaceButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [totalFavorites, setTotalFavorites] = useState(0);
  const [loading, setLoading] = useState(true);

  // Favori durumunu ve toplam sayıyı yükle
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const fingerprint = getUserFingerprint();

        // Tablo kontrolü helper
        const isTableMissing = (err: any) => {
          if (!err) return false;
          // Supabase tablo yoksa genelde boş obje veya message olmadan error döner
          const hasMessage = err.message && typeof err.message === 'string' && err.message.length > 0;
          return !hasMessage ||
            err.message.includes('relation') || 
            err.message.includes('does not exist') ||
            err.code === '42P01';
        };

        // Kullanıcının bu mekanı favori olarak kaydettiğini kontrol et
        const { data: userFav, error: userError } = await supabase
          .from('user_favorites')
          .select('id')
          .eq('place_slug', placeSlug)
          .eq('user_fingerprint', fingerprint)
          .single();

        if (userError && isTableMissing(userError)) {
          console.warn('⚠️ user_favorites tablosu henüz oluşturulmadı. Supabase migration çalıştırın.');
          setIsFavorited(false);
          setTotalFavorites(0);
          setLoading(false);
          return;
        } else if (!userError && userFav) {
          setIsFavorited(true);
        }

        // Toplam favori sayısını al
        const { count, error: countError } = await supabase
          .from('user_favorites')
          .select('*', { count: 'exact', head: true })
          .eq('place_slug', placeSlug);

        if (countError && isTableMissing(countError)) {
          console.warn('⚠️ user_favorites tablosu henüz oluşturulmadı. Supabase migration çalıştırın.');
          setTotalFavorites(0);
        } else if (!countError && count !== null) {
          setTotalFavorites(count);
        }
      } catch (error) {
        // Sadece dolu error.message varsa logla
        if (error && typeof error === 'object' && 'message' in error && error.message && String(error.message).trim() !== '') {
          const errorMessage = String(error.message);
          const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
          const shouldIgnore = ignoredErrors.some(e => errorMessage.includes(e));
          
          if (!shouldIgnore) {
            console.error('Favori durumu alınamadı:', errorMessage);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteStatus();
  }, [placeSlug]);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      const fingerprint = getUserFingerprint();

      if (isFavorited) {
        // Favoriden çıkar
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('place_slug', placeSlug)
          .eq('user_fingerprint', fingerprint);

        if (error) throw error;

        setIsFavorited(false);
        setTotalFavorites(prev => Math.max(0, prev - 1));
        toast.success('Favorilerden çıkarıldı');
      } else {
        // Favorilere ekle
        const { error } = await supabase
          .from('user_favorites')
          .insert([{
            place_slug: placeSlug,
            user_fingerprint: fingerprint,
          }]);

        if (error) throw error;

        setIsFavorited(true);
        setTotalFavorites(prev => prev + 1);
        toast.success('Favorilere eklendi! ❤️');
      }
    } catch (error) {
      // Sadece dolu error.message varsa logla
      if (!error || typeof error !== 'object') {
        toast.error('İşlem başarısız oldu');
        return;
      }
      
      if (!('message' in error) || !error.message || String(error.message).trim() === '') {
        toast.error('İşlem başarısız oldu');
        return;
      }
      
      const errorMessage = String(error.message);
      const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
      const shouldIgnore = ignoredErrors.some(e => errorMessage.includes(e));
      
      if (!shouldIgnore) {
        console.error('Favori işlemi başarısız:', errorMessage);
      }
      toast.error('İşlem başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  // Browser fingerprint (basit)
  const getUserFingerprint = () => {
    const stored = localStorage.getItem('user_fingerprint');
    if (stored) return stored;
    
    const fingerprint = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);
    localStorage.setItem('user_fingerprint', fingerprint);
    return fingerprint;
  };

  const sizeClasses = {
    sm: "h-7 px-2 gap-1 text-xs",
    default: "h-9 px-3 gap-2 text-sm",
    lg: "h-11 px-4 gap-2 text-base",
  };

  return (
    <Button
      variant={isFavorited ? "default" : "outline"}
      size="sm"
      onClick={toggleFavorite}
      disabled={loading}
      className={`${sizeClasses[size]} ${
        isFavorited 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'border-red-200 text-red-600 hover:bg-red-50'
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-all ${
          isFavorited ? 'fill-current' : ''
        }`}
      />
      {showText && (
        <span>
          {isFavorited ? 'Favorilerde' : 'Favorilere Ekle'}
          {totalFavorites > 0 && ` (${totalFavorites})`}
        </span>
      )}
    </Button>
  );
}
