"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Download, Smartphone, Share, MoreVertical, Plus, ArrowUp, ChevronRight } from "lucide-react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform = "ios" | "android" | "desktop";

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    setIsHydrated(true);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !ua.includes("CriOS");
    const isAndroid = /Android/.test(ua);

    if (isIOS) setPlatform("ios");
    else if (isAndroid) setPlatform("android");
    else setPlatform("desktop");

    // 7-day cooldown
    const dismissed = localStorage.getItem("pwa-banner-v2-dismissed");
    if (dismissed) {
      const daysSince = (Date.now() - new Date(dismissed).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 4000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Listen for external trigger (e.g., navbar button)
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener("open-install-modal", handleOpenModal);

    // iOS & desktop don't fire beforeinstallprompt — show banner manually
    if (isIOS || (!isAndroid)) {
      setTimeout(() => setShowBanner(true), 5000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("open-install-modal", handleOpenModal);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    localStorage.setItem("pwa-banner-v2-dismissed", new Date().toISOString());
    setShowBanner(false);
  }, []);

  const steps = {
    ios: [
      { icon: <ArrowUp className="w-5 h-5 text-blue-500" />, text: "Safari'de ekranın altındaki Paylaş 🔗 ikonuna dokun" },
      { icon: <Plus className="w-5 h-5 text-blue-500" />, text: "Listede \"Ana Ekrana Ekle\" seçeneğini bul ve dokun" },
      { icon: <Download className="w-5 h-5 text-blue-500" />, text: "Sağ üstteki \"Ekle\" düğmesine dokun — bitti! 🎉" },
    ],
    android: [
      { icon: <MoreVertical className="w-5 h-5 text-blue-500" />, text: "Chrome'da sağ üstteki 3 nokta (⋮) menüsüne dokun" },
      { icon: <Plus className="w-5 h-5 text-blue-500" />, text: "\"Ana Ekrana Ekle\" veya \"Uygulamayı Yükle\" seçeneğini seç" },
      { icon: <Download className="w-5 h-5 text-blue-500" />, text: "\"Ekle\" veya \"Yükle\"ye dokun — uygulama yüklendi! 🎉" },
    ],
    desktop: [
      { icon: <Download className="w-5 h-5 text-blue-500" />, text: "Chrome/Edge adres çubuğunun sağındaki ⊕ ikonuna tıkla" },
      { icon: <Plus className="w-5 h-5 text-blue-500" />, text: "\"Yükle\" veya \"Kurulum\" seçeneğini seç" },
      { icon: <Smartphone className="w-5 h-5 text-blue-500" />, text: "Uygulama masaüstüne eklenir! 🎉" },
    ],
  };

  const platformLabel = { ios: "iPhone / iPad", android: "Android", desktop: "Bilgisayar" }[platform];
  const bannerHint = {
    ios: "Safari → Paylaş 🔗 → Ana Ekrana Ekle",
    android: "Ücretsiz · Hızlı · Offline çalışır",
    desktop: "Masaüstünüze ekleyin · Hızlı erişim",
  }[platform];

  if (!isHydrated || isInstalled) return null;

  return (
    <>
      {/* ── Bottom Banner ── */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 border-t border-blue-700/40 shadow-[0_-8px_40px_rgba(0,0,0,0.4)]">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                {/* App Icon */}
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-blue-400/30">
                  <Image src="/icons/icon-192x192.png" alt="Deutschland Compass" width={56} height={56} className="object-cover" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white leading-tight">Uygulamayı Telefona Yükle 📲</p>
                  <p className="text-xs text-blue-200/80 mt-0.5">{bannerHint}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {deferredPrompt ? (
                    <button onClick={handleInstall} className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/30">
                      <Download className="w-3.5 h-3.5" /> Yükle
                    </button>
                  ) : (
                    <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/30">
                      <ChevronRight className="w-3.5 h-3.5" /> Nasıl?
                    </button>
                  )}
                  <button onClick={handleDismiss} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors" title="Kapat">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* iOS quick hint bar */}
              {platform === "ios" && (
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5">
                  <span className="text-[11px] text-blue-200/70 text-center">
                    Safari&apos;de{" "}
                    <span className="inline-flex items-center gap-0.5 font-bold text-blue-300">
                      <Share className="w-3 h-3" /> Paylaş
                    </span>{" "}
                    →{" "}
                    <span className="font-bold text-blue-300">Ana Ekrana Ekle</span>{" "}
                    →{" "}
                    <span className="font-bold text-blue-300">Ekle</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Step-by-step Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-blue-700 to-slate-900 px-6 pt-8 pb-6 text-white">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg flex-shrink-0">
                  <Image src="/icons/icon-192x192.png" alt="Deutschland Compass" width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">Deutschland Compass</h2>
                  <p className="text-xs text-blue-200 mt-0.5">Ücretsiz · Reklamsız · Her zaman yanında</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Offline çalışır", "Anlık erişim", "Bildirimler"].map((tag) => (
                  <span key={tag} className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="px-6 py-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{platformLabel} için kurulum adımları</p>
              <ol className="space-y-3">
                {steps[platform].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="flex-1 pt-1">
                      <span className="text-xs font-bold text-slate-400 mr-1.5">{i + 1}.</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200">{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Platform switcher */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 text-center mb-3">Farklı bir cihaz mı kullanıyorsunuz?</p>
                <div className="flex gap-2 justify-center">
                  {(["ios", "android", "desktop"] as Platform[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                        platform === p
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {p === "ios" ? "iPhone/iPad" : p === "android" ? "Android" : "Bilgisayar"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct install if prompt available */}
              {deferredPrompt && (
                <button
                  onClick={handleInstall}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25"
                >
                  <Download className="w-4 h-4" />
                  Hemen Yükle (Tek Tıkla)
                </button>
              )}

              <button onClick={() => setShowModal(false)} className="mt-3 w-full py-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm transition-colors">
                Daha sonra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

