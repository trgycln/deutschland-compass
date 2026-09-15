"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  ExternalLink, Youtube, Link2, MessageCircle, Instagram,
  Twitter, Music2, Headphones, Feather, Search, Filter,
  User, Calendar, ArrowLeft, BookOpen, Sparkles, Globe,
  ChevronRight, Loader2, AlertCircle, Radio
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GurbetLink {
  id: number;
  url: string;
  link_type: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  shared_by: string;
  shared_date: string;
  caption?: string;
  created_at: string;
}

const serifStyle = { fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" } as const;
const accentStyle = { fontFamily: "'Playfair Display', 'Times New Roman', serif" } as const;

// Link tiplerine gore ikon ve renk
const LINK_TYPE_CONFIG: Record<string, { icon: React.ElementType; label: string; color: string; bg: string; border: string }> = {
  youtube:          { icon: Youtube,       label: "YouTube",          color: "text-red-700",   bg: "bg-red-50",     border: "border-red-200"   },
  telegram_channel: { icon: MessageCircle, label: "Telegram Kanal",   color: "text-blue-700",  bg: "bg-blue-50",    border: "border-blue-200"  },
  instagram:        { icon: Instagram,     label: "Instagram",        color: "text-pink-700",  bg: "bg-pink-50",    border: "border-pink-200"  },
  twitter:          { icon: Twitter,       label: "Twitter / X",      color: "text-sky-700",   bg: "bg-sky-50",     border: "border-sky-200"   },
  spotify:          { icon: Music2,        label: "Spotify",          color: "text-green-700", bg: "bg-green-50",   border: "border-green-200" },
  soundcloud:       { icon: Headphones,    label: "SoundCloud",       color: "text-orange-700",bg: "bg-orange-50",  border: "border-orange-200"},
  article:          { icon: Globe,         label: "Makale / Web",     color: "text-amber-800", bg: "bg-amber-50",   border: "border-amber-200" },
};

function getLinkConfig(type: string) {
  return LINK_TYPE_CONFIG[type] || LINK_TYPE_CONFIG.article;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function LinkCard({ link }: { link: GurbetLink }) {
  const cfg = getLinkConfig(link.link_type);
  const Icon = cfg.icon;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-2xl border ${cfg.border} bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-0.5`}
    >
      {/* Ust bant */}
      <div className={`${cfg.bg} px-4 py-2.5 flex items-center justify-between border-b ${cfg.border}`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${cfg.color}`} />
          <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
        </div>
        <ExternalLink className={`w-3.5 h-3.5 ${cfg.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
      </div>

      {/* Icerik */}
      <div className="px-4 py-4">
        <h3
          className="text-stone-900 font-semibold text-base leading-snug mb-1.5 group-hover:text-amber-800 transition-colors line-clamp-2"
          style={accentStyle}
        >
          {link.title}
        </h3>

        {link.description && (
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-3" style={serifStyle}>
            {link.description}
          </p>
        )}

        {link.caption && link.caption !== link.description && (
          <div className="mb-3 pl-3 border-l-2 border-amber-300">
            <p className="text-stone-500 text-xs italic leading-relaxed line-clamp-2" style={serifStyle}>
              &ldquo;{link.caption}&rdquo;
            </p>
          </div>
        )}

        {/* Alt bilgi */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-auto pt-2 border-t border-stone-100">
          <span className="inline-flex items-center gap-1 text-xs text-stone-500">
            <User className="w-3 h-3 text-amber-600" />
            <span className="font-medium text-stone-700">{link.shared_by}</span>
          </span>
          {link.shared_date && (
            <span className="inline-flex items-center gap-1 text-xs text-stone-400">
              <Calendar className="w-3 h-3" />
              {formatDate(link.shared_date)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

export default function GurbetLinklerPage() {
  const [links, setLinks]           = useState<GurbetLink[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [tableNotFound, setTableNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType]   = useState<string>("all");

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await fetch("/api/gurbet-links");
        if (!res.ok) throw new Error("Linkler yüklenemedi");
        const data = await res.json();
        if (data.tableNotFound) {
          setTableNotFound(true);
        } else {
          setLinks(data.links || []);
        }
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, []);

  // Tip sayacları
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    links.forEach(l => { counts[l.link_type] = (counts[l.link_type] || 0) + 1; });
    return counts;
  }, [links]);

  const availableTypes = useMemo(() => {
    return Object.keys(typeCounts).sort((a, b) => typeCounts[b] - typeCounts[a]);
  }, [typeCounts]);

  const filteredLinks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return links.filter(l => {
      const matchesType   = activeType === "all" || l.link_type === activeType;
      const matchesSearch = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.shared_by.toLowerCase().includes(q) || (l.caption || "").toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [links, searchQuery, activeType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-7 h-7 text-amber-800 animate-pulse" />
          </div>
          <p className="text-stone-800 font-medium text-lg" style={accentStyle}>Hazine Açılıyor...</p>
          <p className="text-stone-500 text-sm mt-1" style={serifStyle}>Paylaşılan içerikler derleniyor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8] text-stone-900 w-full selection:bg-amber-200 selection:text-amber-950">
      {/* HERO */}
      <header className="relative overflow-hidden w-full border-b border-amber-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fbe6d0,transparent_60%),radial-gradient(ellipse_at_bottom,#fae1e4,transparent_65%)] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(247,241,232,0.92),rgba(255,248,235,0.7))]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-7 relative z-10">
          {/* Geri */}
          <Link href="/gurbet-kalemleri" className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 mb-4 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Gurbet Kalemleri'ne dön
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs sm:text-sm text-amber-900 shadow-sm border border-amber-200/80 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-medium">Topluluktan paylaşılan hazineler</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight leading-tight" style={accentStyle}>
                Gurbet Linkleri
              </h1>
              <p className="mt-2 text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl" style={serifStyle}>
                Topluluğumuzun üyeleri tarafından paylaşılan YouTube videoları, makaleler, Telegram kanalları ve diğer kıymetli içerikler.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-600">
                <span className="inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-md border border-amber-100 shadow-xs">
                  <Link2 className="w-3.5 h-3.5 text-amber-700" />
                  <strong className="text-stone-900 font-semibold">{links.length}</strong> Paylaşım
                </span>
                {Object.keys(typeCounts).length > 0 && (
                  <span className="inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-md border border-amber-100 shadow-xs">
                    <Radio className="w-3.5 h-3.5 text-amber-700" />
                    <strong className="text-stone-900 font-semibold">{Object.keys(typeCounts).length}</strong> Platform
                  </span>
                )}
              </div>
            </div>

            {/* Eserler sayfasina git */}
            <div className="flex flex-col gap-2.5">
              <Link href="/gurbet-kalemleri" className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                <div className="flex items-center gap-2.5">
                  <Feather className="w-4 h-4 text-amber-200" />
                  <div>
                    <div className="text-sm font-semibold leading-none">Şiir & Yazılar</div>
                    <div className="text-[11px] text-amber-200 mt-1">Edebi eserlere git</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </Link>
              <Link href="/gurbet-kalemleri/gonder" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white border border-amber-200 text-amber-900 text-sm font-medium shadow-sm transition">
                <BookOpen className="w-4 h-4" />
                Eserini Paylaş
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* İÇERİK */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Hata veya tablo yok */}
        {error && (
          <Alert className="mb-6 bg-rose-50 border-rose-200">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <AlertDescription className="text-rose-800 ml-2">{error}</AlertDescription>
          </Alert>
        )}

        {tableNotFound && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <Link2 className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-stone-800 mb-2" style={accentStyle}>Henüz Link Paylaşımı Yok</h2>
            <p className="text-stone-600 text-sm mb-4" style={serifStyle}>
              Telegram kanalından link senkronizasyonu yapıldıktan sonra paylaşımlar burada görünecek.
            </p>
            <div className="bg-white rounded-xl border border-amber-200 p-4 text-left text-xs font-mono text-stone-700 max-w-lg mx-auto">
              <p className="text-stone-500 mb-1">Supabase SQL Editor'de çalıştırın:</p>
              <p>CREATE TABLE IF NOT EXISTS gurbet_links (</p>
              <p className="ml-4">id BIGSERIAL PRIMARY KEY,</p>
              <p className="ml-4">url TEXT NOT NULL,</p>
              <p className="ml-4">link_type TEXT DEFAULT 'article',</p>
              <p className="ml-4">title TEXT DEFAULT '',</p>
              <p className="ml-4">description TEXT DEFAULT '',</p>
              <p className="ml-4">thumbnail_url TEXT DEFAULT '',</p>
              <p className="ml-4">shared_by TEXT DEFAULT 'Anonim',</p>
              <p className="ml-4">shared_date DATE,</p>
              <p className="ml-4">caption TEXT DEFAULT '',</p>
              <p className="ml-4">is_approved BOOLEAN DEFAULT TRUE,</p>
              <p className="ml-4">source_channel TEXT DEFAULT '',</p>
              <p className="ml-4">created_at TIMESTAMPTZ DEFAULT NOW(),</p>
              <p className="ml-4">UNIQUE(url)</p>
              <p>);</p>
            </div>
            <p className="text-stone-500 text-xs mt-3">Ardından: <code className="bg-white border border-amber-200 rounded px-1">npm run gurbet:sync</code></p>
          </div>
        )}

        {!tableNotFound && (
          <>
            {/* Arama + Filtre */}
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  className="pl-9 bg-white/90 border-amber-200 focus:border-amber-400 rounded-xl"
                  placeholder="Başlık, açıklama veya yazar ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tip filtreleri */}
            {availableTypes.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveType("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeType === "all" ? "bg-amber-800 text-white border-amber-800" : "bg-white text-stone-600 border-stone-200 hover:border-amber-400"}`}
                >
                  Tümü ({links.length})
                </button>
                {availableTypes.map(type => {
                  const cfg = getLinkConfig(type);
                  const Ico = cfg.icon;
                  const active = activeType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${active ? `${cfg.bg} ${cfg.color} ${cfg.border}` : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"}`}
                    >
                      <Ico className="w-3.5 h-3.5" />
                      {cfg.label} ({typeCounts[type]})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Kart Listesi */}
            {filteredLinks.length === 0 ? (
              <div className="text-center py-16">
                <Link2 className="w-12 h-12 text-amber-300 mx-auto mb-4" />
                <p className="text-stone-500 text-base" style={serifStyle}>
                  {links.length === 0
                    ? "Henüz link paylaşımı senkronize edilmemiş."
                    : "Bu filtreyle eşleşen paylaşım bulunamadı."}
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-stone-400 mb-4">{filteredLinks.length} paylaşım listeleniyor</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredLinks.map(link => (
                    <LinkCard key={link.id} link={link} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}