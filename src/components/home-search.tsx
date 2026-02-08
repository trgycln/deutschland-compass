"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { professionsList } from '@/data/professions-list';
import { careerGuideData } from '@/data/career-guide-data';

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
};

export function HomeSearch() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const guides = [
    {
      id: 'career-guide',
      title: careerGuideData.title,
      href: '/rehber/kariyer-yolu',
      category: 'Rehber',
      keywords: ['ausbildung', 'weiterbildung', 'anerkennung', 'kariyer', 'rehber', 'meslek']
    },
    {
      id: 'anerkennung-guide',
      title: "Denklik (Anerkennung)",
      href: '/rehber/anerkennung',
      category: 'Rehber',
      keywords: ['anerkennung', 'denklik', 'zab', 'diploma', 'üniversite', 'rehber']
    }
  ];

  const normalizedQuery = normalizeText(query);

  // Professions'ı filtrele
  const filteredProfessions = professionsList
    .filter((profession) => {
      if (!query) return true;
      
      const normalizedTitle = normalizeText(profession.title);
      const normalizedDescription = normalizeText(profession.description);
      const normalizedCategory = normalizeText(profession.category);
      const normalizedKeywords = profession.keywords ? profession.keywords.map(k => normalizeText(k)) : [];

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedCategory.includes(normalizedQuery) ||
        normalizedKeywords.some(k => k.includes(normalizedQuery) || normalizedQuery.includes(k))
      );
    });

  // Guides'ı filtrele
  const filteredGuides = guides.filter((guide) => {
    if (!query) return true;
    
    const normalizedTitle = normalizeText(guide.title);
    const normalizedKeywords = guide.keywords.map(k => normalizeText(k));

    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedKeywords.some(k => k.includes(normalizedQuery) || normalizedQuery.includes(k))
    );
  });

  const allResults = [...filteredGuides, ...filteredProfessions];

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        prev < allResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      const result = allResults[highlightedIndex];
      const href = 'href' in result 
        ? result.href 
        : result.customLink || `/meslekler/${result.slug}`;
      router.push(href);
      setShowDropdown(false);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/meslekler?search=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (result: typeof allResults[0]) => {
    const href = 'href' in result 
      ? result.href 
      : result.customLink || `/meslekler/${result.slug}`;
    router.push(href);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 z-10" />
      <Input 
        ref={inputRef}
        placeholder="Meslek veya konu ara... (Örn: Doktor, Mühendis)" 
        className="pl-10 h-12 text-lg bg-white dark:bg-slate-800 shadow-sm"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
          setHighlightedIndex(-1);
        }}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
      />
      
      {showDropdown && allResults.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
        >
          {filteredGuides.length > 0 && (
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Rehberler
              </div>
              {filteredGuides.map((guide, index) => {
                const isHighlighted = highlightedIndex === index;
                return (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => handleResultClick(guide)}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-between group ${
                      isHighlighted ? 'bg-slate-50 dark:bg-slate-700/50' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {guide.title}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {guide.category}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
          
          {filteredProfessions.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Meslekler
              </div>
              {filteredProfessions.map((profession, index) => {
                const adjustedIndex = index + filteredGuides.length;
                const isHighlighted = highlightedIndex === adjustedIndex;
                return (
                  <button
                    key={profession.id}
                    type="button"
                    onClick={() => handleResultClick(profession)}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-between group ${
                      isHighlighted ? 'bg-slate-50 dark:bg-slate-700/50' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {profession.title}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {profession.category}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
          
          {query && (
            <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
              Tüm sonuçları görmek için <kbd className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 font-mono text-xs">Enter</kbd> tuşuna basın
            </div>
          )}
        </div>
      )}
    </form>
  );
}
