"use client";

import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    // Already installed as PWA (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently (24h cooldown)
    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed) {
      const dismissedAt = new Date(dismissed).getTime();
      const hoursSince = (Date.now() - dismissedAt) / (1000 * 60 * 60);
      if (hoursSince < 24) return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner with a short delay
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // For iOS (no beforeinstallprompt support) – show a manual guide banner
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = ("standalone" in window.navigator) && (window.navigator as any).standalone;
    if (isIOS && !isInStandaloneMode) {
      const dismissed = localStorage.getItem("pwa-ios-banner-dismissed");
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 4000);
      }
    }

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
    setShowBanner(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-banner-dismissed", new Date().toISOString());
    setShowBanner(false);
  };

  if (!isHydrated || !showBanner || isInstalled) return null;

  const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-500">
      {/* Backdrop blur strip */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* App icon */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white flex-shrink-0 shadow-md">
              <Image
                src="/dc_logo.png"
                alt="Deutschland Compass"
                width={48}
                height={48}
                className="object-cover scale-110"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Uygulamayı yükle – Ücretsiz! 📲
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {isIOS
                  ? "Safari'de Paylaş → Ana Ekrana Ekle"
                  : "Hızlı erişim, offline çalışma, bildirimler"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Yükle
                </button>
              )}
              {isIOS && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg">
                  <Smartphone className="w-3.5 h-3.5" />
                  iOS rehberi
                </div>
              )}
              <button
                onClick={handleDismiss}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* iOS instructions */}
          {isIOS && (
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Safari'de aşağıdaki{" "}
                <span className="font-semibold text-blue-600">Paylaş 🔗</span>{" "}
                düğmesine dokunun →{" "}
                <span className="font-semibold text-blue-600">"Ana Ekrana Ekle"</span>{" "}
                seçin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
