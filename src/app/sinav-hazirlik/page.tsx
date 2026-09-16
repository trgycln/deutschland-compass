"use client";

import dynamic from 'next/dynamic';

const SinavHazirlikClient = dynamic(
  () => import('./_components/SinavHazirlikClient').then((mod) => mod.SinavHazirlikClient),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-blue-200 font-medium">B2 Hazırlık Yükleniyor...</p>
        </div>
      </div>
    ),
  }
);

export default function SinavHazirlikPage() {
  return <SinavHazirlikClient />;
}
