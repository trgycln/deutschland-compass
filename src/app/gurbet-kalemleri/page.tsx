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
  PenTool,
  Send,
  MessageCircle,
  ExternalLink,
  Heart,
  Eye,
  Trophy,
  Compass,
  ArrowRight,
  SlidersHorizontal,
  Flame,
  Radio,
  Tag as TagIcon,
  Dice5,
  Clock,
  ChevronRight,
  Users,
  CheckCircle2,
} from "lucide-react";
import { LikeButton } from "@/components/like-button";
import { CommentForm } from "@/components/comment-form";
import { CommentsList } from "@/components/comments-list";
import { AudioPlayer } from "@/components/audio-player";
import { TopAuthorsDisplay } from "@/components/top-authors-display";
import { TopWorksDisplay } from "@/components/top-works-display";
import { TopViewedWorksDisplay } from "@/components/top-viewed-works-display";
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
  created_at?: string;
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
  
  // Navigasyon / Sekme State'i: 'featured' | 'recent' | 'catalog' | 'leaderboards' | 'community'
  const [activeTab, setActiveTab] = useState<"featured" | "recent" | "catalog" | "leaderboards" | "community">("featured");
  
  // Keşfet / Sıralamalar alt sekmesi
  const [leaderboardTab, setLeaderboardTab] = useState<"authors" | "likes" | "narrated" | "views" | "recent" | "tags" | "random">("authors");
  const [showAllLeaderboards, setShowAllLeaderboards] = useState(false);

  // Arama ve Filtreleme
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showOnlyNarrated, setShowOnlyNarrated] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Seçili / Günün Eseri
  const [featuredId, setFeaturedId] = useState<number | null>(null);
  const [commentsRefresh, setCommentsRefresh] = useState(0);

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
    if (literaryWorks.length > 0) {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const workParam = urlParams.get("work");
        const hash = window.location.hash.replace("#", "");
        const targetId = workParam
          ? parseInt(workParam, 10)
          : hash.startsWith("work-")
          ? parseInt(hash.replace("work-", ""), 10)
          : null;

        if (targetId && literaryWorks.some((w) => w.id === targetId)) {
          setFeaturedId(targetId);
          setActiveTab("featured");
          setTimeout(() => {
            window.scrollTo({ top: 320, behavior: "smooth" });
          }, 200);
          return;
        }
      }

      if (featuredId === null) {
        const dailyIndex = getDailyIndex(literaryWorks.length);
        setFeaturedId(literaryWorks[dailyIndex].id);
      }
    }
  }, [literaryWorks, featuredId]);

  const authors = useMemo(
    () =>
      Array.from(new Set(literaryWorks.map((work) => work.author)))
        .filter((author) => author !== "Anonim")
        .sort((a, b) => a.localeCompare(b, "tr-TR")),
    [literaryWorks]
  );

  const types = useMemo(
    () => Array.from(new Set(literaryWorks.map((work) => work.type))).sort((a, b) => a.localeCompare(b, "tr-TR")),
    [literaryWorks]
  );

  const tags = useMemo(
    () => Array.from(new Set(literaryWorks.flatMap((work) => work.tags || []))).sort((a, b) => a.localeCompare(b, "tr-TR")),
    [literaryWorks]
  );

  const fallbackTags = [
    "gurbet", "ozlem", "hasret", "umut", "yalnizlik", "sevda", "yol", "anne", "ayrilik", "dostluk", "aile", "veda"
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
      .slice(0, 14)
      .map(([tag]) => tag);
    return sorted.length > 0 ? sorted : fallbackTags;
  }, [literaryWorks]);

  const filteredWorks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
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

  const recentWorks = useMemo(() => {
    return [...literaryWorks].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      if (timeB !== timeA) return timeB - timeA;
      return (b.id || 0) - (a.id || 0);
    });
  }, [literaryWorks]);

  const latestSyncDateFormatted = useMemo(() => {
    if (recentWorks.length === 0) return "";
    const first = recentWorks[0];
    if (first.created_at) {
      try {
        const d = new Date(first.created_at);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
        }
      } catch {}
    }
    return first.date || "";
  }, [recentWorks]);

  const featuredWork = useMemo(() => {
    if (!featuredId) return literaryWorks[0] || null;
    return literaryWorks.find((work) => work.id === featuredId) || literaryWorks[0] || null;
  }, [literaryWorks, featuredId]);

  const featuredTags = featuredWork?.tags || [];

  const handleRefreshFeatured = () => {
    if (filteredWorks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredWorks.length);
    setFeaturedId(filteredWorks[randomIndex].id);
    setActiveTab("featured");
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const selectWorkAndRead = (workId: number) => {
    setFeaturedId(workId);
    setActiveTab("featured");
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag);
      return [...prev, tag];
    });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedAuthor("all");
    setSelectedType("all");
    setSelectedTags([]);
    setShowOnlyNarrated(false);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count += 1;
    if (selectedAuthor !== "all") count += 1;
    if (selectedType !== "all") count += 1;
    if (selectedTags.length > 0) count += selectedTags.length;
    if (showOnlyNarrated) count += 1;
    return count;
  }, [searchQuery, selectedAuthor, selectedType, selectedTags, showOnlyNarrated]);

  const narratedWorksCount = useMemo(() => {
    return literaryWorks.filter((w) => !!w.audio_url).length;
  }, [literaryWorks]);

  const totalAuthorsCount = useMemo(() => {
    return new Set(literaryWorks.map((w) => w.author)).size;
  }, [literaryWorks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Feather className="w-7 h-7 text-amber-800 animate-pulse" />
          </div>
          <p className="text-stone-800 font-medium text-lg" style={accentStyle}>Gurbet Kalemleri Açılıyor...</p>
          <p className="text-stone-500 text-sm mt-1" style={serifStyle}>Antolojideki nadide eserler derleniyor</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center p-4">
        <Alert className="max-w-md bg-rose-50 border-rose-200 shadow-sm">
          <AlertCircle className="h-5 w-5 text-rose-600" />
          <AlertDescription className="text-rose-800 ml-2">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8] text-stone-900 w-full selection:bg-amber-200 selection:text-amber-950">
      {/* 🌟 1. ZARİF VE DERLİ TOPLU HERO ALANI */}
      <header className="relative overflow-hidden w-full border-b border-amber-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fbe6d0,transparent_60%),radial-gradient(ellipse_at_bottom,#fae1e4,transparent_65%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(247,241,232,0.92),rgba(255,248,235,0.7))]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-7 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Sol: Başlık ve Edebi İthaf */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs sm:text-sm text-amber-900 shadow-sm border border-amber-200/80 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-medium">Gurbetin sesi, kalemin susmayan izi</span>
              </div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight leading-tight"
                style={accentStyle}
              >
                Gurbet Kalemleri
              </h1>
              <p
                className="mt-2 text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
                style={serifStyle}
              >
                Her bir satırı gurbetin sinesinden süzülen nadide hatıralar... Kalbe ağır gelen uzaklıkları kelimelerle buluşturan antolojimiz.
              </p>

              {/* Kompakt Sayaç */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-600">
                <span className="inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-md border border-amber-100 shadow-xs">
                  <Feather className="w-3.5 h-3.5 text-amber-700" />
                  <strong className="text-stone-900 font-semibold">{literaryWorks.length}</strong> Eser
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-md border border-amber-100 shadow-xs">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <strong className="text-stone-900 font-semibold">{totalAuthorsCount}</strong> Yazar
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-md border border-amber-100 shadow-xs">
                  <Music className="w-3.5 h-3.5 text-emerald-700" />
                  <strong className="text-stone-900 font-semibold">{narratedWorksCount}</strong> Sesli Eser
                </span>
              </div>
            </div>

            {/* Sağ: Kompakt & Şık Hızlı Aksiyon Kartı */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:w-auto w-full">
              <Link href="/gurbet-kalemleri/gonder" className="w-full">
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  <div className="flex items-center gap-2.5">
                    <PenTool className="w-4 h-4 text-emerald-100" />
                    <div>
                      <div className="text-sm font-semibold leading-none">Eserini Paylaş</div>
                      <div className="text-[11px] text-emerald-100 mt-1">Antolojiye yeni şiir/yazı ekle</div>
                    </div>
                  </div>
                  <Send className="w-4 h-4 text-emerald-200" />
                </div>
              </Link>

              <div className="grid grid-cols-3 gap-2 w-full">
                <a
                  href="https://t.me/+JSmuDvozRY43OGMy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-medium shadow-sm transition hover:shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Yazı Grubu</span>
                </a>
                <a
                  href="https://t.me/+yI1or4k3nMswN2Ni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-white text-xs font-medium shadow-sm transition hover:shadow"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Kanal</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🧭 2. MERKEZİ SEKME GEZİNTİSİ (Segmented Control) */}
      <nav className="sticky top-16 z-30 bg-[#fbf7f0]/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs w-full">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-2.5 no-scrollbar">
            <div className="inline-flex p-1 rounded-xl bg-amber-100/60 border border-amber-200/70 text-xs sm:text-sm font-medium w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("featured")}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-1 sm:flex-initial ${
                  activeTab === "featured"
                    ? "bg-white text-amber-950 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Günün Eseri</span>
              </button>

              <button
                onClick={() => setActiveTab("recent")}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-1 sm:flex-initial ${
                  activeTab === "recent"
                    ? "bg-white text-amber-950 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Son Eklenenler</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                  Güncel
                </span>
              </button>

              <button
                onClick={() => setActiveTab("catalog")}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-1 sm:flex-initial ${
                  activeTab === "catalog"
                    ? "bg-white text-amber-950 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Compass className="w-4 h-4 text-amber-700" />
                <span>Tüm Eserler</span>
                <span className="text-[11px] px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full font-bold">
                  {filteredWorks.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("leaderboards")}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-1 sm:flex-initial ${
                  activeTab === "leaderboards"
                    ? "bg-white text-amber-950 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-700" />
                <span>Sıralamalar & Keşif</span>
              </button>

              <button
                onClick={() => setActiveTab("community")}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-1 sm:flex-initial ${
                  activeTab === "community"
                    ? "bg-white text-amber-950 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Users className="w-4 h-4 text-amber-700" />
                <span>Topluluk & Telegram</span>
              </button>
            </div>

            {/* Hızlı Rastgele Butonu */}
            <div className="hidden md:flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshFeatured}
                className="text-stone-700 hover:text-amber-900 hover:bg-amber-100/60 text-xs gap-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Rastgele Eser</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 📄 3. İÇERİK BÖLÜMÜ (Aktif Sekmeye Göre) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        
        {/* ======================================================== */}
        {/* SEKME 1: 📖 GÜNÜN ESERİ / SEÇİLEN ESER                    */}
        {/* ======================================================== */}
        {activeTab === "featured" && (
          <div className="grid gap-6 lg:grid-cols-[300px_1fr] items-start">
            {/* Sol Kolon (Desktop): Hızlı Eser Gezgini */}
            <aside className="rounded-2xl bg-white/85 shadow-sm border border-amber-200/80 hidden lg:block overflow-hidden sticky top-36">
              <div className="p-4 border-b border-amber-100 bg-amber-50/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-stone-800" style={accentStyle}>
                    Diğer Eserler
                  </h3>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="text-xs text-amber-800 hover:underline flex items-center gap-0.5"
                  >
                    Tümü ({literaryWorks.length}) <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  <Input
                    placeholder="Listede hızlı ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-xs bg-white border-amber-200/70"
                  />
                </div>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2 space-y-1 divide-y divide-amber-50/50">
                {filteredWorks.slice(0, 40).map((work) => {
                  const isActive = work.id === featuredId;
                  return (
                    <button
                      key={work.id}
                      onClick={() => setFeaturedId(work.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition text-xs block ${
                        isActive
                          ? "bg-amber-100/70 border border-amber-300/80 shadow-2xs font-medium"
                          : "hover:bg-amber-50/70 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 text-stone-500 mb-0.5">
                        <span className="truncate max-w-[170px]" style={serifStyle}>
                          {work.author}
                        </span>
                        {work.audio_url && <Music className="w-3 h-3 text-emerald-600 flex-shrink-0" />}
                      </div>
                      <div className="font-semibold text-stone-800 truncate" style={accentStyle}>
                        {work.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Sağ Kolon: Okuma Odaklı Eser Kartı */}
            <article className="rounded-3xl bg-white/95 border border-amber-200 shadow-md overflow-hidden">
              {featuredWork ? (
                <div className="p-5 sm:p-8 md:p-10">
                  {/* Üst Bilgi Rozetleri & Aksiyonlar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-amber-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-amber-200 text-amber-950 font-medium hover:bg-amber-300">
                        Seçilen Eser
                      </Badge>
                      <Badge variant="outline" className="border-amber-300 text-stone-700 bg-amber-50/50">
                        {featuredWork.type}
                      </Badge>
                      {featuredWork.audio_url && (
                        <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 flex items-center gap-1">
                          <Music className="w-3 h-3" />
                          Seslendirilmiş
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefreshFeatured}
                        className="border-amber-200 text-amber-900 hover:bg-amber-50 text-xs h-8 gap-1.5"
                      >
                        <RefreshCcw className="w-3.5 h-3.5" />
                        <span>Başka Eser 🎲</span>
                      </Button>
                      <Link href={`/gurbet-kalemleri/${featuredWork.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-stone-700 hover:text-amber-900 hover:bg-amber-50 text-xs h-8 gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ayrı Sayfa</span>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Eser Başlığı ve Yazarı */}
                  <div className="mt-6">
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-tight break-words"
                      style={accentStyle}
                    >
                      {featuredWork.title}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-600" style={serifStyle}>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-amber-800" />
                        <span className="font-semibold text-stone-800">{featuredWork.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-stone-400" />
                        <span>{featuredWork.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-auto text-stone-500">
                        <Eye className="w-4 h-4 text-stone-400" />
                        <span>{featuredWork.views || 0} görüntüleme</span>
                      </div>
                    </div>
                  </div>

                  {/* Sesli Çalar (Varsa) */}
                  {featuredWork.audio_url && (
                    <div className="mt-6">
                      <AudioPlayer
                        audioUrl={featuredWork.audio_url}
                        title={featuredWork.title}
                        workId={featuredWork.id}
                        content={featuredWork.content}
                        author={featuredWork.author}
                      />
                    </div>
                  )}

                  {/* Şiir / Yazı Metni */}
                  <div
                    className="mt-8 text-base sm:text-lg leading-relaxed sm:leading-8 text-stone-800 whitespace-pre-wrap break-words bg-amber-50/20 p-4 sm:p-6 rounded-2xl border border-amber-100/60"
                    style={serifStyle}
                  >
                    {featuredWork.content}
                  </div>

                  {/* Etiketler */}
                  {featuredTags.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-amber-100">
                      <TagIcon className="w-3.5 h-3.5 text-stone-400" />
                      {featuredTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTags([tag]);
                            setActiveTab("catalog");
                          }}
                          className="text-xs px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Hatıra ve Telif Notu */}
                  <div className="mt-8 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs text-amber-900/90 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>
                      Bu eser, <strong>Gurbet Kalemleri</strong> topluluk arşivimizin kıymetli bir parçasıdır. Her kelimesi gurbetin sinesinden süzülen gerçek bir duygu ve hatıradır.
                    </span>
                  </div>

                  {/* Beğeni & Yorum Alanı */}
                  <div className="mt-8 pt-8 border-t border-amber-200">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-stone-800" style={accentStyle}>
                          Bu Eser Sende Ne Uyandırdı?
                        </h4>
                        <p className="text-xs text-stone-500" style={serifStyle}>
                          Yazara hislerini iletebilir, beğeni bırakabilirsin.
                        </p>
                      </div>
                      <LikeButton workId={featuredWork.id} />
                    </div>

                    <CommentForm
                      workId={featuredWork.id}
                      onCommentAdded={() => setCommentsRefresh((prev) => prev + 1)}
                    />

                    <div className="mt-8">
                      <CommentsList workId={featuredWork.id} refresh={commentsRefresh} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-stone-500" style={serifStyle}>
                  Seçilen eser yüklenemedi.
                </div>
              )}
            </article>
          </div>
        )}

        {/* ======================================================== */}
        {/* SEKME: ⏰ SON EKLENENLER / EN GÜNCEL ESERLER             */}
        {/* ======================================================== */}
        {activeTab === "recent" && (
          <div className="space-y-6">
            {/* Üst Bilgilendirme ve Canlılık Başlığı */}
            <div className="p-5 sm:p-6 bg-white/95 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Canlı & Güncel Eserler Akışı</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight" style={accentStyle}>
                    Son Eklenen Yazı ve Şiirler
                  </h2>
                  <p className="text-stone-600 text-sm mt-1 max-w-2xl" style={serifStyle}>
                    Telegram kanalından ve antolojimizden sisteme en son senkronize edilen şiir ve düz yazılar.
                    Eserler yüklenme ve derlenme tarihine göre en yeniden en eskiye doğru listelenmektedir.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
                  <div className="px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200/70 text-right">
                    <span className="block text-[11px] text-stone-500 font-medium uppercase tracking-wider">Son Senkronizasyon</span>
                    <span className="text-sm font-bold text-amber-900 flex items-center gap-1.5 justify-end">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      {latestSyncDateFormatted || "Güncel"}
                    </span>
                  </div>
                  <div className="px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200/70 text-right">
                    <span className="block text-[11px] text-stone-500 font-medium uppercase tracking-wider">Toplam Eser</span>
                    <span className="text-sm font-bold text-stone-800">{literaryWorks.length} Adet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eser Kartları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recentWorks.slice(0, 30).map((work, idx) => {
                const isNew = idx < 10;
                let formattedDate = work.date || "";
                if (work.created_at) {
                  try {
                    const d = new Date(work.created_at);
                    if (!isNaN(d.getTime())) {
                      formattedDate = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
                    }
                  } catch {}
                }

                return (
                  <article
                    key={work.id}
                    className="group bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:border-amber-400"
                  >
                    <div>
                      {/* Üst Bilgi Rozetleri */}
                      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            work.type === "siir" || work.type === "Şiir"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : "bg-blue-50 text-blue-800 border-blue-200"
                          }`}>
                            {work.type === "siir" ? "Şiir" : (work.type === "duz_yazi" ? "Düz Yazı" : work.type)}
                          </span>
                          {work.audio_url && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              <Music className="w-3 h-3 text-amber-700" />
                              <span>Sesli</span>
                            </span>
                          )}
                          {isNew && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Yeni</span>
                            </span>
                          )}
                        </div>

                        {/* Yüklenme / Senkronizasyon Tarihi */}
                        <div className="flex items-center gap-1 text-xs text-amber-800/90 font-medium bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/50" title="Sisteme Yüklenme / Senkronizasyon Tarihi">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>Yüklenme: {formattedDate}</span>
                        </div>
                      </div>

                      {/* Başlık & Yazar */}
                      <h3
                        onClick={() => selectWorkAndRead(work.id)}
                        className="text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer leading-snug"
                        style={accentStyle}
                      >
                        {work.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium mt-1 mb-3">
                        <Feather className="w-3.5 h-3.5 text-amber-600" />
                        <span>{work.author}</span>
                      </div>

                      {/* Önizleme Metni */}
                      <p
                        className="text-stone-600 text-sm leading-relaxed line-clamp-4 italic border-l-2 border-amber-300/80 pl-3 my-3"
                        style={serifStyle}
                      >
                        {work.content}
                      </p>
                    </div>

                    {/* Alt Kısım ve Buton */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-center gap-3 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>{work.likes || 0}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          <span>{work.views || 0}</span>
                        </span>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => selectWorkAndRead(work.id)}
                        className="text-amber-900 hover:text-amber-950 hover:bg-amber-100/60 font-semibold text-xs gap-1.5"
                      >
                        <span>Eseri Oku</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}


        {activeTab === "catalog" && (
          <div className="space-y-6">
            {/* Arama ve Filtre Kontrol Barı */}
            <div className="p-4 sm:p-5 bg-white/95 rounded-2xl border border-amber-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Arama Kutusu */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    placeholder="Eser başlığı, yazar veya şiir metninde ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-11 bg-stone-50/60 border-amber-200 text-sm focus-visible:ring-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filtre Aç/Kapa Butonu */}
                <Button
                  variant="outline"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className={`h-11 px-4 gap-2 border-amber-200 transition ${
                    filtersOpen || activeFiltersCount > 0 ? "bg-amber-100 text-amber-950 border-amber-300" : "bg-white"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4 text-amber-700" />
                  <span>Filtreler</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="h-11 text-xs text-stone-600 hover:text-rose-700"
                  >
                    Temizle
                  </Button>
                )}
              </div>

              {/* Genişletilebilir Filtre Paneli */}
              {filtersOpen && (
                <div className="mt-4 pt-4 border-t border-amber-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Yazara Göre
                      </label>
                      <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                        <SelectTrigger className="bg-white border-amber-200 h-10 text-xs">
                          <SelectValue placeholder="Tüm Yazarlar" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectItem value="all">Tüm Yazarlar ({authors.length})</SelectItem>
                          {authors.map((author) => (
                            <SelectItem key={author} value={author}>
                              {author}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Türe Göre
                      </label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-white border-amber-200 h-10 text-xs">
                          <SelectValue placeholder="Tüm Türler" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tüm Türler ({types.length})</SelectItem>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Temaya / Etikete Göre
                      </label>
                      <Select
                        value={selectedTags.length === 1 ? selectedTags[0] : "all"}
                        onValueChange={(val) => setSelectedTags(val === "all" ? [] : [val])}
                      >
                        <SelectTrigger className="bg-white border-amber-200 h-10 text-xs">
                          <SelectValue placeholder="Tüm Etiketler" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectItem value="all">Tüm Temalar</SelectItem>
                          {tags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Sesli Eser Checkbox */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                      <input
                        type="checkbox"
                        checked={showOnlyNarrated}
                        onChange={(e) => setShowOnlyNarrated(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
                      />
                      <Music className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Sadece Seslendirilmiş Eserleri Göster ({narratedWorksCount})</span>
                    </label>
                  </div>

                  {/* Hızlı Popüler Etiketler */}
                  <div className="pt-2">
                    <span className="text-xs text-stone-500 block mb-1.5" style={serifStyle}>
                      Öne çıkan duygular ve temalar:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-2.5 py-1 rounded-full transition border ${
                              isSelected
                                ? "bg-amber-800 text-white border-amber-900"
                                : "bg-stone-50 hover:bg-amber-100/60 text-stone-700 border-amber-200/80"
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Arama Sonuç Durumu */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 px-1">
              <span>
                <strong>{filteredWorks.length}</strong> eser bulundu
                {activeFiltersCount > 0 && " (filtrelenmiş sonuçlar)"}
              </span>
              {activeFiltersCount > 0 && (
                <button onClick={clearAllFilters} className="text-amber-800 hover:underline">
                  Tüm Filtreleri Kaldır
                </button>
              )}
            </div>

            {/* Eserler Grid Listesi */}
            {filteredWorks.length === 0 ? (
              <div className="bg-white/80 rounded-2xl border border-amber-200 p-10 text-center">
                <Feather className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-stone-800" style={accentStyle}>
                  Aradığınız kriterde eser bulunamadı
                </h3>
                <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto" style={serifStyle}>
                  Filtreleri sıfırlayarak veya farklı bir kelime aratarak diğer güzel eserlere göz atabilirsiniz.
                </p>
                <Button onClick={clearAllFilters} className="mt-4 bg-amber-800 hover:bg-amber-900 text-white text-xs">
                  Filtreleri Temizle
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWorks.map((work) => (
                  <div
                    key={work.id}
                    className="rounded-2xl bg-white/95 border border-amber-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-amber-400"
                  >
                    <div>
                      {/* Üst Kısım: Tür ve Ses Rozeti */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <Badge variant="outline" className="text-[11px] bg-amber-50 text-amber-900 border-amber-200">
                          {work.type}
                        </Badge>
                        {work.audio_url && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <Music className="w-3 h-3" />
                            Sesli
                          </span>
                        )}
                      </div>

                      {/* Başlık ve Yazar */}
                      <h3
                        onClick={() => selectWorkAndRead(work.id)}
                        className="text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition line-clamp-2 cursor-pointer"
                        style={accentStyle}
                      >
                        {work.title}
                      </h3>

                      <div className="text-xs text-stone-500 mt-1 flex items-center gap-1" style={serifStyle}>
                        <User className="w-3 h-3 text-amber-700" />
                        <span className="font-medium text-stone-700">{work.author}</span>
                      </div>

                      {/* Şiir Önizlemesi */}
                      <p
                        className="text-xs text-stone-600 line-clamp-3 mt-3 leading-relaxed bg-amber-50/30 p-2.5 rounded-lg border border-amber-100/50"
                        style={serifStyle}
                      >
                        {work.content}
                      </p>
                    </div>

                    {/* Alt Kısım: Butonlar ve İstatistikler */}
                    <div className="pt-4 mt-4 border-t border-amber-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-[11px] text-stone-400">
                        {work.views !== undefined && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {work.views}
                          </span>
                        )}
                        {work.likes !== undefined && work.likes > 0 && (
                          <span className="flex items-center gap-1 text-rose-500 font-medium">
                            <Heart className="w-3 h-3 fill-rose-500" /> {work.likes}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => selectWorkAndRead(work.id)}
                          className="h-7 px-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs gap-1 rounded-lg"
                        >
                          <span>Oku</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                        <Link href={`/gurbet-kalemleri/${work.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-stone-500 hover:text-amber-900 hover:bg-amber-100/50 rounded-lg"
                            title="Ayrı Sayfada Aç"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SEKME 3: 🏆 KEŞFET & SIRALAMALAR HUB'I (DERLİ TOPLU)      */}
        {/* ======================================================== */}
        {activeTab === "leaderboards" && (
          <div className="space-y-6">
            {/* Üst Açıklama ve Alt Sekmeler */}
            <div className="p-5 bg-white/95 rounded-2xl border border-amber-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-900" style={accentStyle}>
                    🏆 Antoloji Keşif Merkezi
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5" style={serifStyle}>
                    En aktif yazarlar, sevilen eserler ve sesli dinleme kayıtları bir arada.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllLeaderboards(!showAllLeaderboards)}
                  className="text-xs h-8 border-amber-200 text-amber-900 hover:bg-amber-100/60"
                >
                  {showAllLeaderboards ? "Sıkıştırılmış Sekmeli Görünüme Dön" : "Tüm Kartları Yan Yana Göster (Grid)"}
                </Button>
              </div>

              {/* Kategori Alt Sekmeleri */}
              {!showAllLeaderboards && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-amber-100">
                  <button
                    onClick={() => setLeaderboardTab("authors")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "authors"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>En Aktif Yazarlar</span>
                  </button>

                  <button
                    onClick={() => setLeaderboardTab("likes")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "likes"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>En Beğenilen Eserler</span>
                  </button>

                  <button
                    onClick={() => setLeaderboardTab("narrated")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "narrated"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>Sesli Dinlenenler</span>
                  </button>

                  <button
                    onClick={() => setLeaderboardTab("views")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "views"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>En Çok Okunanlar</span>
                  </button>

                  <button
                    onClick={() => setLeaderboardTab("recent")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "recent"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Son Eklenenler</span>
                  </button>

                  <button
                    onClick={() => setLeaderboardTab("tags")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "tags"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <TagIcon className="w-3.5 h-3.5" />
                    <span>Popüler Temalar</span>
                  </button>

                  <button
                    onClick={() => setLeaderboardTab("random")}
                    className={`text-xs px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                      leaderboardTab === "random"
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-stone-700"
                    }`}
                  >
                    <Dice5 className="w-3.5 h-3.5" />
                    <span>Şansını Dene</span>
                  </button>
                </div>
              )}
            </div>

            {/* Gösterim: Ya Seçili Tek Kart Ya da İstenirse Grid */}
            {!showAllLeaderboards ? (
              <div className="max-w-2xl mx-auto">
                {leaderboardTab === "authors" && (
                  <TopAuthorsDisplay
                    onAuthorClick={(authorName) => {
                      setSelectedAuthor(authorName);
                      setActiveTab("catalog");
                    }}
                  />
                )}
                {leaderboardTab === "likes" && <TopWorksDisplay />}
                {leaderboardTab === "narrated" && <TopNarratedWorksDisplay />}
                {leaderboardTab === "views" && <TopViewedWorksDisplay />}
                {leaderboardTab === "recent" && <RecentWorksDisplay />}
                {leaderboardTab === "tags" && (
                  <PopularTagsDisplay
                    onTagClick={(tag) => {
                      setSelectedTags([tag]);
                      setActiveTab("catalog");
                    }}
                  />
                )}
                {leaderboardTab === "random" && (
                  <RandomDiscoveryDisplay triggerId={featuredId || undefined} />
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TopAuthorsDisplay
                  onAuthorClick={(authorName) => {
                    setSelectedAuthor(authorName);
                    setActiveTab("catalog");
                  }}
                />
                <TopWorksDisplay />
                <TopNarratedWorksDisplay />
                <RecentNarratedWorksDisplay />
                <TopViewedWorksDisplay />
                <RecentWorksDisplay />
                <PopularTagsDisplay
                  onTagClick={(tag) => {
                    setSelectedTags([tag]);
                    setActiveTab("catalog");
                  }}
                />
                <RandomDiscoveryDisplay triggerId={featuredId || undefined} />
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SEKME 4: 💬 TOPLULUK, TELEGRAM KAYNAKLARI & YENİ ESERLER   */}
        {/* ======================================================== */}
        {activeTab === "community" && (
          <div className="space-y-6">
            {/* Topluluk Başlığı ve Açıklaması */}
            <div className="p-6 sm:p-8 bg-white/95 rounded-3xl border border-amber-200 shadow-sm relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-amber-100 to-amber-200/50 rounded-full blur-2xl pointer-events-none" />
              
              <div className="max-w-2xl relative z-10">
                <Badge className="bg-blue-100 text-blue-900 border-blue-200 mb-3">
                  Canlı Topluluk & Kaynaklar
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900" style={accentStyle}>
                  Gurbet Kalemleri Nasıl Büyüyor?
                </h3>
                <p className="mt-2 text-stone-700 text-sm sm:text-base leading-relaxed" style={serifStyle}>
                  Bu sayfada yer alan her bir eser, gurbetteki dostlarımızın Telegram gruplarında birbirleriyle paylaştığı, kalplerinden dökülen gerçek mısralar ve yazılardır. Hiçbir eser unutulmasın, kaybolmasın diye burada özenle arşivlenir ve seslendirilir.
                </p>

                {/* Bağlantı Butonları */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://t.me/+JSmuDvozRY43OGMy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Yazılarını Paylaş (Telegram Grubu)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href="https://t.me/+yI1or4k3nMswN2Ni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-sm transition"
                  >
                    <Radio className="w-4 h-4" />
                    <span>Deutschland Compass Kanalı</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <Link
                    href="/gurbet-kalemleri/gonder"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Doğrudan Eser Gönder</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bilgilendirici Kartlar: Telegram & Eser Ekleme Süreci */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-3">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-1" style={accentStyle}>
                  1. Telegram Paylaşımı
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed" style={serifStyle}>
                  Gurbet Kalemleri Telegram grubunda paylaşılan şiirler ve denemeler yazarlarının rızasıyla derlenir.
                </p>
              </div>

              <div className="p-5 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-1" style={accentStyle}>
                  2. Arşivleme & Doğrulama
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed" style={serifStyle}>
                  Eserin başlığı, yazarı, tarihi ve tematik etiketleri veritabanına titizlikle kaydedilir.
                </p>
              </div>

              <div className="p-5 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-3">
                  <Music className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-stone-900 mb-1" style={accentStyle}>
                  3. Seslendirme & Dinleme
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed" style={serifStyle}>
                  Uygun bulunan eserler seslendirilerek hem web sayfamızda hem de radyo/ses kütüphanesinde yayınlanır.
                </p>
              </div>
            </div>

            {/* Antolojiye Son Eklenen Eserler */}
            <div className="p-5 sm:p-6 bg-white/95 rounded-2xl border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-100">
                <div>
                  <h4 className="font-bold text-stone-900 text-lg" style={accentStyle}>
                    Antolojiye Yeni Katılan Eserler
                  </h4>
                  <p className="text-xs text-stone-500" style={serifStyle}>
                    Tarih sırasıyla kaydedilmiş son paylaşımlar
                  </p>
                </div>
                <Badge variant="outline" className="text-xs border-amber-200 text-amber-900">
                  Toplam {literaryWorks.length} Kayıt
                </Badge>
              </div>

              <div className="divide-y divide-amber-100/70">
                {literaryWorks.slice(0, 10).map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-amber-900/80" style={serifStyle}>
                          {item.author}
                        </span>
                        <span className="text-[11px] text-stone-400">•</span>
                        <span className="text-[11px] text-stone-400">{item.date}</span>
                        {item.audio_url && (
                          <Music className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        )}
                      </div>
                      <h5
                        onClick={() => selectWorkAndRead(item.id)}
                        className="text-sm font-semibold text-stone-800 hover:text-amber-900 cursor-pointer truncate mt-0.5"
                        style={accentStyle}
                      >
                        {item.title}
                      </h5>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => selectWorkAndRead(item.id)}
                      className="text-xs text-amber-800 hover:bg-amber-100/60 h-8 px-2.5 gap-1 flex-shrink-0"
                    >
                      <span>Oku</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 🎯 Sticky Floating Action Button (Positioned above Community Pulse) */}
      <Link href="/gurbet-kalemleri/gonder">
        <div className="fixed bottom-20 right-4 sm:bottom-22 sm:right-6 z-40 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-ping opacity-60"></div>
            <button className="relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm">Eser Paylaş</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
