"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function HomeSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/meslekler?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
      <Input 
        placeholder="Meslek veya konu ara... (Örn: Doktor, Mühendis)" 
        className="pl-10 h-12 text-lg bg-white dark:bg-slate-800 shadow-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
