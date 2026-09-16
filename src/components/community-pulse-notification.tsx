"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  Bell, 
  BookOpen, 
  PenTool, 
  MessageSquare, 
  Clock, 
  Check, 
  Radio
} from "lucide-react";
import { PulseItem } from "@/app/api/community-pulse/route";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

const STORAGE_LAST_SEEN_KEY = "dc_pulse_last_seen_timestamp";
const STORAGE_DISMISSED_DATE_KEY = "dc_pulse_last_dismissed_date";

export function CommunityPulseNotification() {
  const pathname = usePathname();
  const [items, setItems] = useState<PulseItem[]>([]);
  const [latestTimestamp, setLatestTimestamp] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    async function loadPulse() {
      try {
        const res = await fetch("/api/community-pulse");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.items && data.items.length > 0) {
          setItems(data.items);
          setLatestTimestamp(data.latestTimestamp);

          const storedTimestamp = localStorage.getItem(STORAGE_LAST_SEEN_KEY);
          const dismissedDate = localStorage.getItem(STORAGE_DISMISSED_DATE_KEY);
          const todayDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

          // Determine unread items
          let unread = 0;
          if (!storedTimestamp) {
            unread = data.items.length;
          } else {
            const storedTime = new Date(storedTimestamp).getTime();
            unread = data.items.filter(
              (item: PulseItem) => new Date(item.timestamp).getTime() > storedTime
            ).length;
          }

          setUnreadCount(unread > 0 ? unread : data.items.length);
          const hasNew = unread > 0;
          setHasUnread(hasNew);

          // Auto-open rules:
          // 1. Only on the homepage to avoid disturbing reading flow on content pages
          // 2. Only if there is genuinely new content since last seen
          // 3. Never auto-open more than once on the same calendar day
          const isHomePage = pathname === "/";
          const alreadyDismissedToday = dismissedDate === todayDate;

          if (isHomePage && hasNew && !alreadyDismissedToday) {
            // Slight delay so the initial page render is smooth and doesn't feel aggressive
            const timer = setTimeout(() => {
              setIsOpen(true);
            }, 1200);
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.error("Community pulse fetch error:", err);
      } finally {
        setIsLoaded(true);
      }
    }

    loadPulse();

    // Listen to custom event to open anywhere (e.g. from Navbar)
    const handleOpenPulse = () => setIsOpen(true);
    window.addEventListener("open-community-pulse", handleOpenPulse);
    return () => window.removeEventListener("open-community-pulse", handleOpenPulse);
  }, [pathname]);

  const markAllAsSeen = () => {
    if (latestTimestamp) {
      localStorage.setItem(STORAGE_LAST_SEEN_KEY, latestTimestamp);
    }
    const todayDate = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STORAGE_DISMISSED_DATE_KEY, todayDate);
    setHasUnread(false);
    setUnreadCount(0);
    setIsOpen(false);
  };

  const handleItemClick = (item: PulseItem) => {
    // When an item is clicked, close and mark as dismissed for today
    const todayDate = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STORAGE_DISMISSED_DATE_KEY, todayDate);
    if (latestTimestamp) {
      localStorage.setItem(STORAGE_LAST_SEEN_KEY, latestTimestamp);
    }
    setHasUnread(false);
    setIsOpen(false);

    // If already on target page, perform in-page tab switch and hash navigation immediately
    if (typeof window !== "undefined") {
      const targetPath = item.link.split("?")[0].split("#")[0];
      if (pathname === targetPath) {
        const url = new URL(item.link, window.location.origin);
        const tab = url.searchParams.get("tab");
        const hash = url.hash.replace("#", "");

        if (tab) {
          const tabBtn = document.querySelector<HTMLButtonElement>(`button[value="${tab}"], [data-value="${tab}"]`);
          if (tabBtn) tabBtn.click();
        }

        if (hash) {
          window.location.hash = hash;
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 150);
        }
      }
    }
  };

  if (!isHydrated || !isLoaded || items.length === 0) {
    return null;
  }

  // Helper icon selector
  const getItemIcon = (type: string) => {
    switch (type) {
      case "literary":
        return <PenTool className="w-4 h-4 text-violet-500" />;
      case "experience":
        return <MessageSquare className="w-4 h-4 text-amber-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <>
      {/* 1. Minimized Floating Pill (Always visible at bottom-right when card is closed) */}
      {!isOpen && (
        <aside
          aria-label="Topluluk bildirimleri"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xl hover:shadow-2xl border border-slate-700/50 dark:border-slate-300/50 transition-all hover:scale-105 active:scale-95"
            title="Son Topluluk Gelişmelerini Gör"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>

            <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:rotate-12 transition-transform" />
              Topluluk Nabzı
            </span>

            {hasUnread && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white shadow-sm">
                {unreadCount} Yeni
              </span>
            )}
          </button>
        </aside>
      )}

      {/* 2. Expanded Floating Notification Card (Non-blocking slide-in at bottom-right) */}
      {isOpen && (
        <aside
          aria-label="Topluluk Nabzı Detayları"
          className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-[420px] max-h-[85vh] flex flex-col rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-bottom-6 duration-300 overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-white">
                  Canlı Topluluk Nabzı
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-[11px] text-slate-300">
                  Son saha notları, tecrübeler ve eserler
                </p>
              </div>
            </div>

            <button
              onClick={markAllAsSeen}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title="Kapat ve okundu say"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Updates Scrollable List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[50vh]">
            {items.map((item) => {
              const timeFormatted = item.timestamp
                ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: tr })
                : "Yeni";

              return (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => handleItemClick(item)}
                  className="group block pt-2.5 first:pt-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeStyle}`}>
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {timeFormatted}
                      </span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>

                  <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-emerald-400 line-clamp-1 transition-colors">
                    {item.title}
                  </h4>

                  {item.teaser && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.teaser}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={markAllAsSeen}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Gördüm, Kapat
            </button>

            <Link
              href="/rehber"
              onClick={markAllAsSeen}
              className="text-xs font-semibold text-primary dark:text-emerald-400 hover:underline flex items-center gap-1 px-3 py-1.5"
            >
              Tüm Rehberler &rarr;
            </Link>
          </div>
        </aside>
      )}
    </>
  );
}
