"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  Feather,
  Loader2,
  RefreshCcw,
  Search,
  Sparkles,
  User,
  AlertCircle,
  Music,
  Filter,
  X,
} from "lucide-react";
import { LikeButton } from "@/components/like-button";
import { CommentForm } from "@/components/comment-form";
import { CommentsList } from "@/components/comments-list";
import { AudioPlayer } from "@/components/audio-player";
import { TopAuthorsDisplay } from "@/components/top-authors-display";
import { TopWorksDisplay } from "@/components/top-works-display";
import { RecentWorksDisplay } from "@/components/recent-works-display";
import { PopularTagsDisplay } from "@/components/popular-tags-display";
import { RandomDiscoveryDisplay } from "@/components/random-discovery-display";
import { TopNarratedWorksDisplay } from "@/components/top-narrated-works-display";
import { RecentNarratedWorksDisplay } from "@/components/recent-narrated-works-display";

interface LiteraryWork {
  id: number;
  title: string;
  author: string;
  date: string;
  type: string;
  tags: string[];
  content: string;
  audio_url?: string;
  views?: number;
  likes?: number;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
}

function getDailyIndex(total: number) {
  if (total <= 0) return 0;
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const hash = hashString(dateKey);
  return hash % total;
}

export default function GurbetKalemleriPage() {
  const [literaryWorks, setLiteraryWorks] = useState<LiteraryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredId, setFeaturedId] = useState<number | null>(null);
  const [commentsRefresh, setCommentsRefresh] = useState(0);
  const [showOnlyNarrated, setShowOnlyNarrated] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    async function fetchWorks() {
      try {
        setLoading(true);
        const response = await fetch("/api/literary-works");
        if (!response.ok) throw new Error("Eserler yüklenemedi");
        const data = await response.json();
        setLiteraryWorks(data.works || []);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, []);

  useEffect(() => {
    if (literaryWorks.length > 0 && featuredId === null) {
      const dailyIndex = getDailyIndex(literaryWorks.length);
      setFeaturedId(literaryWorks[dailyIndex].id);
    }
  }, [literaryWorks, featuredId]);

  const authors = useMemo(
    () => Array.from(new Set(literaryWorks.map((work) => work.author))).sort(),
    [literaryWorks]
  );
  const types = useMemo(
    () => Array.from(new Set(literaryWorks.map((work) => work.type))).sort(),
    [literaryWorks]
  );
  const tags = useMemo(
    () => Array.from(new Set(literaryWorks.flatMap((work) => work.tags || []))).sort(),
    [literaryWorks]
  );
  const fallbackTags = [
    // Orijinal temel temalar
    "aci",
    "ozlem",
    "hasret",
    "gurbet",
    "umut",
    "yalnizlik",
    "sevda",
    "yol",
    "dus",
    "hatira",
    // İlişki ve aile temaları
    "anne",
    "aile",
    "ayrilik",
    "dostluk",
    "baba",
    // Kimlik ve dil
    "dil",
    "kimlik",
    "kadin",
    // Evrensel temalar
    "kedi",
    "ask",
    "gonul",
    "veda",
    "adalet",
    "insan",
    "huzur",
    "nur",
    "umup",
    "cuma",
    // Felsefi ve analitik
    "tefekur",
    "bakis",
    "goru",
    "fark",
    "kirma",
    "aglamak",
    "isa",
    
  ];
  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    literaryWorks.forEach((work) => {
      (work.tags || []).forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12)
      .map(([tag]) => tag);
    return sorted.length > 0 ? sorted : fallbackTags;
  }, [literaryWorks]);

  const filteredWorks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return literaryWorks.filter((work) => {
      const matchesSearch =
        !query ||
        work.title.toLowerCase().includes(query) ||
        work.author.toLowerCase().includes(query) ||
        work.content.toLowerCase().includes(query);
      const matchesAuthor = selectedAuthor === "all" || work.author === selectedAuthor;
      const matchesType = selectedType === "all" || work.type === selectedType;
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => (work.tags || []).includes(tag));
      const matchesNarration = !showOnlyNarrated || !!work.audio_url;
      return matchesSearch && matchesAuthor && matchesType && matchesTag && matchesNarration;
    });
  }, [literaryWorks, searchQuery, selectedAuthor, selectedType, selectedTags, showOnlyNarrated]);

  const featuredWork = useMemo(() => {
    if (!featuredId) return null;
    return literaryWorks.find((work) => work.id === featuredId) || null;
  }, [literaryWorks, featuredId]);

  const featuredTags = featuredWork?.tags || [];

  const handleRefreshFeatured = () => {
    if (filteredWorks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredWorks.length);
    setFeaturedId(filteredWorks[randomIndex].id);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag);
      return [...prev, tag];
    });
  };

  useEffect(() => {
    if (filteredWorks.length === 0) return;
    if (!featuredId || !filteredWorks.some((work) => work.id === featuredId)) {
      setFeaturedId(filteredWorks[0].id);
    }
  }, [filteredWorks, featuredId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-700 mx-auto mb-4" />
          <p className="text-stone-600">Eserler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center p-4">
        <Alert className="max-w-md bg-rose-50 border-rose-200">
          <AlertCircle className="h-4 w-4 text-rose-600" />
          <AlertDescription className="text-rose-800">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8] text-stone-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f6d7b8,transparent_55%),radial-gradient(circle_at_bottom,#f2c3c8,transparent_60%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(247,241,232,0.9),rgba(255,248,235,0.6))]"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-amber-900 shadow-sm border border-amber-100">
              <Sparkles className="w-4 h-4" />
              <span>Gurbetin sesi, kalemin susmayan izi</span>
            </div>
            <h1
              className="mt-6 text-4xl md:text-5xl font-semibold text-stone-900"
              style={accentStyle}
            >
              Gurbet Kalemleri
            </h1>
            <p className="mt-4 text-lg text-stone-700 max-w-2xl" style={serifStyle}>
              Her gün bir eser, kalbe ağır gelen uzaklıkları bir sayfaya sığdırır. Okumak için
              dur, nefeslen, yeniden hatırla.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4" />
                <span>{literaryWorks.length} eser</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{new Set(literaryWorks.map((work) => work.author)).size} yazar</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="narrated-filter-header"
                  checked={showOnlyNarrated}
                  onChange={(e) => setShowOnlyNarrated(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="narrated-filter-header" className="flex items-center gap-1 cursor-pointer text-stone-700">
                  <Music className="w-4 h-4 text-amber-600" />
                  <span>Seslendirilmiş</span>
                </label>
              </div>
              <Link href="/gurbet-kalemleri/gonder" className="ml-auto">
                <Button className="bg-amber-800 text-amber-50 hover:bg-amber-900">
                  Eserini Paylas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 İstatistikler ve Keşif Bölümü - FULL WIDTH */}
      <div className="bg-gradient-to-b from-amber-50/30 to-transparent py-16 border-t border-amber-100">
        <div className="container mx-auto px-4">
          {/* Üst satır: Yazarlar ve Eserler (2 kolon) */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <TopAuthorsDisplay />
            <TopWorksDisplay />
          </div>

          {/* Ortası: Seslendirilmiş eserler (2 kolon) */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <TopNarratedWorksDisplay />
            <RecentNarratedWorksDisplay />
          </div>

          {/* Alt satır: Son eserler, etiketler, şans butonu (3 kolon) */}
          <div className="grid gap-6 md:grid-cols-3">
            <RecentWorksDisplay />
            <PopularTagsDisplay onTagClick={(tag) => {
              setSelectedTags([tag]);
              // Mobile'da filtreleri aç
              if (window.innerWidth < 768) {
                setFiltersOpen(true);
              }
            }} />
            <RandomDiscoveryDisplay onDiscoverClick={(workId) => {
              setFeaturedId(workId);
              setTimeout(() => {
                const section = document.querySelector('section.rounded-\\[32px\\]');
                if (section && window.innerWidth < 1024) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 50);
            }} />
          </div>
        </div>
      </div>

      <div className="md:sticky top-16 z-30 border-y border-amber-100 bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          {/* Mobil: Kompakt Filtre Butonu */}
          <div className="md:hidden">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/80 border border-amber-100 hover:bg-amber-50 transition"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-medium text-stone-700">
                  Filtrele
                  {(searchQuery || selectedAuthor !== "all" || selectedType !== "all" || selectedTags.length > 0 || showOnlyNarrated) && 
                    " (aktif)"}
                </span>
              </div>
              {filtersOpen ? 
                <X className="w-4 h-4 text-stone-500" /> : 
                <Filter className="w-4 h-4 text-stone-500" />
              }
            </button>
            
            {filtersOpen && (
              <div className="mt-3 space-y-3 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    placeholder="Ara..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="pl-9 bg-white/80 border-amber-100"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">Yazar</label>
                    <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                      <SelectTrigger className="bg-white/80 border-amber-100 text-xs">
                        <SelectValue placeholder="Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tümü</SelectItem>
                        {authors.map((author) => (
                          <SelectItem key={author} value={author}>
                            {author}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">Türü</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-white/80 border-amber-100 text-xs">
                        <SelectValue placeholder="Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tümü</SelectItem>
                        {types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">Etiket</label>
                    <Select
                      value={selectedTags.length === 1 ? selectedTags[0] : "all"}
                      onValueChange={(value) => {
                        if (value === "all") {
                          setSelectedTags([]);
                        } else {
                          setSelectedTags([value]);
                        }
                      }}
                    >
                      <SelectTrigger className="bg-white/80 border-amber-100 text-xs">
                        <SelectValue placeholder="Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tümü</SelectItem>
                        {tags.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Popüler Etiketler - Horizontal Scroll */}
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="flex gap-2 pb-2">
                    {popularTags.slice(0, 8).map((tag) => {
                      const isActive = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs transition ${
                            isActive
                              ? "border-amber-400 bg-amber-100 text-amber-900"
                              : "border-amber-100 bg-white/80 text-stone-600"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Tam Filtreler */}
          <div className="hidden md:block">
            <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  placeholder="Eser, yazar veya icerikte ara..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="pl-9 bg-white/80 border-amber-100"
                />
              </div>
              <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                <SelectTrigger className="bg-white/80 border-amber-100">
                  <SelectValue placeholder="Yazar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tum yazarlar</SelectItem>
                  {authors.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white/80 border-amber-100">
                  <SelectValue placeholder="Tur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tum turler</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedTags.length === 1 ? selectedTags[0] : "all"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setSelectedTags([]);
                  } else {
                    setSelectedTags([value]);
                  }
                }}
              >
                <SelectTrigger className="bg-white/80 border-amber-100">
                  <SelectValue placeholder="Etiket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tum etiketler</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <div className="text-sm text-stone-500" style={serifStyle}>
                Etiketlere dokun, duyguya gore kesfet.
              </div>
              {tags.length === 0 && (
                <div className="mt-1 text-xs text-stone-400" style={serifStyle}>
                  Not: Etiket bilgisi olmayan eserlerde onerilen etiketler gosterilir.
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {popularTags.map((tag) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        isActive
                          ? "border-amber-400 bg-amber-100 text-amber-900"
                          : "border-amber-100 bg-white/80 text-stone-600 hover:border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl bg-white/80 shadow-lg border border-amber-100">
            <div className="p-6 border-b border-amber-100">
              <h2 className="text-xl text-stone-800" style={accentStyle}>
                Tum Eserler
              </h2>
              <p className="text-sm text-stone-500 mt-1" style={serifStyle}>
                Baslik veya yazar adina gore ara.
              </p>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="pl-9 bg-white/80 border-amber-100"
                />
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
              {filteredWorks.length === 0 && (
                <div className="text-sm text-stone-500 px-2 py-6" style={serifStyle}>
                  Aradigin kriterlerde eser bulunamadi.
                </div>
              )}
              {filteredWorks.map((work) => {
                const isActive = work.id === featuredId;
                return (
                  <button
                    key={work.id}
                    onClick={() => {
                      setFeaturedId(work.id);
                      // Mobil cihazlarda okunur alana scroll yap
                      setTimeout(() => {
                        const section = document.querySelector('section.rounded-\\[32px\\]');
                        if (section && window.innerWidth < 1024) {
                          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 50);
                    }}
                    className={`w-full text-left rounded-2xl border px-4 py-3 transition ${
                      isActive
                        ? "border-amber-400 bg-amber-50 shadow-sm"
                        : "border-transparent hover:border-amber-100 hover:bg-amber-50/60"
                    }`}
                  >
                    <div className="text-sm text-stone-500" style={serifStyle}>
                      {work.author}
                    </div>
                    <div className="flex items-start gap-2 justify-between">
                      <div className="text-base text-stone-800 line-clamp-2 flex-1" style={accentStyle}>
                        {work.title}
                      </div>
                      {work.audio_url && (
                        <Music className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-[32px] bg-white/90 border border-amber-100 shadow-xl animate-fadeIn">
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-amber-200 text-amber-900 animate-pulse">Seçilen Eser</Badge>
                {featuredWork?.audio_url && (
                  <Badge className="bg-blue-100 text-blue-900 flex items-center gap-1">
                    <Music className="w-3 h-3" />
                    Seslendirilmis
                  </Badge>
                )}
                <Button
                  variant="outline"
                  onClick={handleRefreshFeatured}
                  className="border-amber-200 text-amber-900 hover:bg-amber-50"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Baska bir eser
                </Button>
              </div>

              {featuredWork ? (
                <div className="mt-8">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500" style={serifStyle}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredWork.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredWork.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{featuredWork.type}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-lg">👁️</span>
                      <span className="font-semibold text-blue-600">{featuredWork.views || 0}</span>
                    </div>
                  </div>

                  <h2 className="mt-4 text-3xl text-stone-900 pb-3 border-b-2 border-amber-200 md:border-b-0" style={accentStyle}>
                    {featuredWork.title}
                  </h2>

                  <div
                    className="mt-6 text-[17px] leading-8 text-stone-700 whitespace-pre-wrap"
                    style={serifStyle}
                  >
                    {featuredWork.content}
                  </div>

                  {/* Audio Player */}
                  {featuredWork.audio_url && (
                    <div className="mt-8">
                      <AudioPlayer audioUrl={featuredWork.audio_url} title={featuredWork.title} />
                    </div>
                  )}

                  {featuredTags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featuredTags.slice(0, 6).map((tag) => (
                        <Badge key={tag} variant="outline" className="border-amber-200 text-amber-900">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Beğeni ve Yorumlar Bölümü */}
                  <div className="mt-10 border-t border-amber-100 pt-8">
                    <div className="mb-6">
                      <LikeButton workId={featuredWork.id} />
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl text-stone-800 mb-4" style={accentStyle}>
                        Yorum Yap
                      </h3>
                      <CommentForm
                        workId={featuredWork.id}
                        onCommentAdded={() => setCommentsRefresh((prev) => prev + 1)}
                      />
                    </div>

                    <div className="mt-8">
                      <CommentsList
                        workId={featuredWork.id}
                        refresh={commentsRefresh}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-stone-500" style={serifStyle}>
                  Gunun eseri hazirlaniyor.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
