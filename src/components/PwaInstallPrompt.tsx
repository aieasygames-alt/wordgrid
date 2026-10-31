"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 1. Check if already in standalone (installed)
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true)
    ) {
      setIsStandalone(true);
      return;
    }

    // 2. Check if recently dismissed (within 7 days)
    if (typeof window !== "undefined") {
      const lastDismissed = localStorage.getItem("wordgrid-pwa-dismissed");
      if (lastDismissed) {
        const days = (Date.now() - Number(lastDismissed)) / (1000 * 60 * 60 * 24);
        if (days < 7) {
          setDismissed(true);
          return;
        }
      }

      // 3. Detect iOS Safari
      const ua = window.navigator.userAgent;
      const isIosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
      const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|Chrome/.test(ua);
      if (isIosDevice && isSafari) {
        setIsIos(true);
      }

      // 4. Capture beforeinstallprompt for Android/Chrome/Edge
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  if (isStandalone || dismissed || (!deferredPrompt && !isIos)) {
    return null;
  }

  const handleInstallClick = async () => {
    trackEvent("pwa_install_click");
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        trackEvent("pwa_install_accepted");
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wordgrid-pwa-dismissed", Date.now().toString());
    }
    setDismissed(true);
    trackEvent("pwa_install_dismissed");
  };

  return (
    <div className="w-full rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-surface/80 to-surface/90 p-4 sm:p-5 shadow-lg backdrop-blur-sm animate-fade-in my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xl shrink-0">
            📱
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-text flex items-center gap-2">
              Install WordGrid App
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                1-Tap Play
              </span>
            </h4>
            <p className="mt-0.5 text-xs text-text-muted leading-relaxed">
              {isIos
                ? "Tap the Share button ⎋ in Safari, then select 'Add to Home Screen' ➕ for instant daily play."
                : "Add to home screen for zero loading time, offline boards, and instant daily challenge access."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
          <button
            onClick={handleDismiss}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-text-dim hover:text-text transition"
          >
            Later
          </button>
          {!isIos && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20 transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>➕</span>
              <span>Add to Home Screen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
