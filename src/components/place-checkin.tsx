"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { MapPin, Users } from "lucide-react";

interface PlaceCheckinProps {
  placeSlug: string;
  placeName: string;
  cityName: string;
}

export function PlaceCheckin({ placeSlug, placeName, cityName }: PlaceCheckinProps) {
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentCheckins, setRecentCheckins] = useState<any[]>([]);

  // Check-in verilerini yükle
  useEffect(() => {
    const loadCheckinData = async () => {
      try {
        // Toplam check-in sayısını al
        const { count, error: countError } = await supabase
          .from('place_checkins')
          .select('*', { count: 'exact', head: true })
          .eq('place_slug', placeSlug);

        // Tablo kontrolü
        const isTableMissing = (err: any) => {
          if (!err) return false;
          // Supabase tablo yoksa genelde boş obje veya message olmadan error döner
          const hasMessage = err.message && typeof err.message === 'string' && err.message.length > 0;
          return !hasMessage ||
            err.message.includes('relation') || 
            err.message.includes('does not exist') ||
            err.code === '42P01';
        };

        if (countError && isTableMissing(countError)) {
          console.warn('⚠️ place_checkins tablosu henüz oluşturulmadı. Supabase migration çalıştırın.');
          setTotalCheckins(0);
          setLoading(false);
          return;
        } else if (countError) {
          console.warn('⚠️ Check-in sayısı alınamadı, varsayılan değer kullanılıyor:', countError);
          setTotalCheckins(0);
        }
        
        if (count !== null) {
          setTotalCheckins(count);
        }

        // Bugün check-in yapıldı mı? localStorage ile kontrol et (DB'de fingerprint sütunu yok)
        const todayKey = `checkin_${placeSlug}_${new Date().toISOString().split('T')[0]}`;
        if (typeof window !== 'undefined' && localStorage.getItem(todayKey)) {
          setHasCheckedIn(true);
        }

        // Son check-in'leri al
        const { data: recentData, error: recentError } = await supabase
          .from('place_checkins')
          .select('user_name, created_at')
          .eq('place_slug', placeSlug)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!recentError && recentData) {
          setRecentCheckins(recentData);
        }
      } catch (error) {
        // Sadece dolu error.message varsa logla
        if (error && typeof error === 'object' && 'message' in error && error.message && String(error.message).trim() !== '') {
          const errorMessage = String(error.message);
          const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
          const shouldIgnore = ignoredErrors.some(e => errorMessage.includes(e));
          
          if (!shouldIgnore) {
            console.error('Check-in verileri yüklenirken hata:', errorMessage);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadCheckinData();
  }, [placeSlug]);

  const handleCheckin = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('place_checkins')
        .insert([{
          place_slug: placeSlug,
          user_name: 'Ziyaretçi',
        }]);

      if (error) throw error;

      // Bugünkü check-in'i localStorage'a kaydet
      const todayKey = `checkin_${placeSlug}_${new Date().toISOString().split('T')[0]}`;
      if (typeof window !== 'undefined') localStorage.setItem(todayKey, '1');

      setHasCheckedIn(true);
      setTotalCheckins(prev => prev + 1);

      // Activity feed'e ekle
      await supabase
        .from('activity_feed')
        .insert([{
          activity_type: 'new_checkin',
          place_slug: placeSlug,
          place_name: placeName,
          city_name: cityName,
          user_name: 'Ziyaretçi',
          description: `${placeName}'de bulundu`,
        }]);

      toast.success('Başarıyla check-in yaptınız! ✅');
    } catch (error) {
      // Sadece gerçek, dolu hataları logla
      if (!error || typeof error !== 'object') {
        toast.error('Check-in yapılamadı');
        return;
      }
      
      // Boş obje veya message yoksa ignore
      if (!('message' in error) || !error.message || String(error.message).trim() === '') {
        toast.error('Check-in yapılamadı');
        return;
      }
      
      const errorMessage = String(error.message);
      const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
      const shouldIgnore = ignoredErrors.some(e => errorMessage.includes(e));
      
      if (!shouldIgnore) {
        console.error('Check-in başarısız:', errorMessage);
      }
      toast.error('Check-in yapılamadı');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border/40 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold">Buraya Gittim</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-primary/10 rounded-full text-primary">
          <Users className="w-3.5 h-3.5" />
          {totalCheckins}
        </div>
      </div>

      <Button
        onClick={handleCheckin}
        disabled={loading || hasCheckedIn}
        className={`w-full transition-all ${
          hasCheckedIn
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-primary hover:bg-primary/90 text-white'
        }`}
      >
        {hasCheckedIn ? '✅ Bugün Ziyaret Ettiniz' : '🎯 Buraya Gittim'}
      </Button>

      {/* Son Check-in'ler */}
      {recentCheckins.length > 0 && (
        <div className="bg-secondary/30 rounded-lg p-3 space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground">Son Ziyaretçiler:</p>
          <div className="space-y-1">
            {recentCheckins.slice(0, 3).map((checkin, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-foreground/70">
                <span className="text-lg">👤</span>
                <span className="flex-1">{checkin.user_name || 'Ziyaretçi'}</span>
                <span className="text-muted-foreground text-[10px]">
                  {new Date(checkin.created_at).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
