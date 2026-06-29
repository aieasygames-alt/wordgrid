"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "wordgrid-cookie-consent";

type ConsentValue = "granted" | "denied";

function updateConsent(value: ConsentValue) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function (...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag("consent", "update", {
    analytics_storage: value,
  });
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "granted" || saved === "denied") {
      updateConsent(saved);
    } else {
      setShow(true);
    }
  }, []);

  const handleChoice = (choice: ConsentValue) => {
    localStorage.setItem(CONSENT_KEY, choice);
    updateConsent(choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-2xl mx-auto bg-surface border border-border rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-text-muted flex-1 leading-relaxed">
          We use cookies to understand how you use WordGrid and improve your
          experience. Anonymous analytics only — no personal data.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => handleChoice("denied")}
            className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text transition rounded-lg"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice("granted")}
            className="px-5 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover transition rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
