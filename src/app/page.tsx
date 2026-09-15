"use client";

import { WhatsNewPopup } from '@/components/whats-new-popup';
import { HomeNewsClippings } from '@/components/home-news-clippings';
import { HomeLiveCommunityUpdates } from '@/components/home-live-community-updates';
import { HomeCompactCards } from '@/components/home-compact-cards';
import { HomeCategoryNav } from '@/components/home-category-nav';

export default function Home() {
  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen">
      <WhatsNewPopup />

      {/* 1. Gazete Küpürleri Bölümü (En Üstte - Günün Öne Çıkan Başlıkları) */}
      <HomeNewsClippings />

      {/* 2. Topluluktan Canlı Gelişmeler & Saha Notları */}
      <HomeLiveCommunityUpdates />

      {/* 3. Kompakt Kartlar (Helal Mekanlar, Gurbet Kalemleri, Blog) */}
      <HomeCompactCards />

      {/* 4. Kategori Navigasyonu (Meslekler ve Rehberler Grid) */}
      <HomeCategoryNav />
    </div>
  );
}
