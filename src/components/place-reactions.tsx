"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface PlaceReactionsProps {
  placeSlug: string;
  placeName: string;
}

export function PlaceReactions({ placeSlug, placeName }: PlaceReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, number>>({
    delicious: 0,
    yummy: 0,
    neutral: 0,
    bad: 0,
  });
  
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const reactionEmojis = {
    delicious: { emoji: '😋', label: 'Lezzetli', color: 'text-red-500' },
    yummy: { emoji: '🤤', label: 'Çok Lezzet', color: 'text-orange-500' },
    neutral: { emoji: '😐', label: 'Orta', color: 'text-gray-500' },
    bad: { emoji: '👎', label: 'Kötü', color: 'text-blue-500' },
  };

  // Reaksiyonları yükle
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const { data, error } = await supabase
          .from('place_reactions')
          .select('reaction_type')
          .eq('place_slug', placeSlug);

        // Sadece dolu error.message varsa logla
        if (error && typeof error === 'object' && 'message' in error && error.message && String(error.message).trim() !== '') {
          const errorMessage = String(error.message);
          const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
          const shouldIgnore = ignoredErrors.some(err => errorMessage.includes(err));
          
          if (!shouldIgnore) {
            console.error('Reaksiyonlar yüklenemedi:', errorMessage);
          }
        }
        
        // Data varsa, reaksiyonları say
        const counts = {
          delicious: 0,
          yummy: 0,
          neutral: 0,
          bad: 0,
        };

        data?.forEach(r => {
          counts[r.reaction_type as keyof typeof counts]++;
        });

        setReactions(counts);
      } catch (err) {
        // Sadece dolu error.message varsa logla
        if (err && typeof err === 'object' && 'message' in err && err.message && String(err.message).trim() !== '') {
          const errorMessage = String(err.message);
          const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
          const shouldIgnore = ignoredErrors.some(e => errorMessage.includes(e));
          
          if (!shouldIgnore) {
            console.error('Reaksiyonlar yüklenirken beklenmeyen hata:', errorMessage);
          }
        }
        setReactions({ delicious: 0, yummy: 0, neutral: 0, bad: 0 });
      } finally {
        setLoading(false);
      }
    };

    loadReactions();
  }, [placeSlug]);

  const handleReaction = async (reactionType: string) => {
    try {
      // Önceki reaksiyonu sil
      if (userReaction) {
        await supabase
          .from('place_reactions')
          .delete()
          .eq('place_slug', placeSlug)
          .eq('user_fingerprint', getUserFingerprint());
      }

      // Aynı emojiye tekrar tıklandıysa sadece sil
      if (userReaction === reactionType) {
        setUserReaction(null);
        setReactions(prev => ({
          ...prev,
          [reactionType]: Math.max(0, prev[reactionType as keyof typeof prev] - 1),
        }));
        return;
      }

      // Yeni reaksiyonu ekle
      const { error } = await supabase
        .from('place_reactions')
        .insert([{
          place_slug: placeSlug,
          reaction_type: reactionType,
          user_fingerprint: getUserFingerprint(),
        }]);

      if (error) throw error;

      // Önceki sayıyı azalt
      if (userReaction) {
        setReactions(prev => ({
          ...prev,
          [userReaction]: Math.max(0, prev[userReaction as keyof typeof prev] - 1),
        }));
      }

      // Yeni sayıyı artır
      setReactions(prev => ({
        ...prev,
        [reactionType]: prev[reactionType as keyof typeof prev] + 1,
      }));

      setUserReaction(reactionType);
      toast.success('Reaksiyonunuz kaydedildi!');
    } catch (error) {
      console.error('Reaksiyon kaydedilemedi:', error);
      toast.error('Reaksiyon kaydedilemedi');
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

  if (loading) return null;

  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="mt-4 pt-4 border-t border-border/40">
      <p className="text-xs font-semibold text-muted-foreground mb-3 block">
        🎯 Burası nasıl? ({totalReactions})
      </p>
      
      <div className="flex flex-wrap gap-2">
        {Object.entries(reactionEmojis).map(([key, config]) => {
          const count = reactions[key as keyof typeof reactions];
          const isSelected = userReaction === key;

          return (
            <button
              key={key}
              onClick={() => handleReaction(key)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-secondary/40 hover:bg-secondary text-foreground'
              }`}
              title={config.label}
            >
              <span className="text-lg">{config.emoji}</span>
              <span className="text-xs font-semibold">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
