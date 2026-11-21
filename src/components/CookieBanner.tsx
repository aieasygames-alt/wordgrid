"use client";

import { useState, useEffect } from "react";
import { CONSENT_KEY, ConsentValue, updateAnalyticsConsent } from "@/lib/analytics-config";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === "granted" || saved === "denied") return;
    } catch { /* Consent still works for this visit without persistent storage. */ }
    setShow(true);
  }, []);

  const handleChoice = (choice: ConsentValue) => {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* Visit-only consent. */ }
    updateAnalyticsConsent(choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-2 left-2 right-2 z-50 sm:bottom-4 sm:left-4 sm:right-4 lg:left-auto lg:right-4 lg:p-0 lg:w-[min(21rem,calc(100vw-2rem))]"
    >
      <div className="max-w-xl mx-auto lg:mx-0 bg-surface/95 backdrop-blur border border-border rounded-xl shadow-xl p-2.5 sm:p-3 flex items-center gap-2">
        <p className="text-xs text-text-muted flex-1 leading-snug">
          Anonymous analytics help improve WordGrid.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => handleChoice("denied")}
            className="px-2.5 py-1 text-xs font-medium text-text-muted hover:text-text transition rounded-lg"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice("granted")}
            className="px-3 py-1 text-xs font-semibold bg-primary hover:bg-primary-hover transition rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
