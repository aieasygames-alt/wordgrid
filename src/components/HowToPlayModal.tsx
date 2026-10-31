"use client";

import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-border bg-slate-900/95 p-6 sm:p-7 shadow-2xl text-text overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close rules"
          className="absolute right-5 top-5 p-2 text-text-muted hover:text-text rounded-full hover:bg-surface transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md">W</span>
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">G</span>
          </div>
          <h2 id="how-to-play-title" className="text-2xl font-black tracking-tight">
            How to Play
          </h2>
        </div>

        {/* Visual Tile Path Demo */}
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 mb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            Example: Drag Across Adjacent Tiles
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="relative w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              W<span className="absolute bottom-0.5 right-1 text-[9px] opacity-70">4</span>
            </div>
            <span className="text-indigo-400 font-bold">→</span>
            <div className="relative w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              O<span className="absolute bottom-0.5 right-1 text-[9px] opacity-70">1</span>
            </div>
            <span className="text-indigo-400 font-bold">→</span>
            <div className="relative w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              R<span className="absolute bottom-0.5 right-1 text-[9px] opacity-70">1</span>
            </div>
            <span className="text-indigo-400 font-bold">→</span>
            <div className="relative w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              D<span className="absolute bottom-0.5 right-1 text-[9px] opacity-70">2</span>
            </div>
          </div>
          <p className="text-center text-xs text-text-muted mt-2">
            Release your finger or mouse to submit. Drag backward to undo!
          </p>
        </div>

        {/* Core Rules List */}
        <div className="space-y-3.5 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0 text-xs">1</span>
            <div>
              <strong className="text-text">Connect adjacent letters:</strong> Move horizontally, vertically, or diagonally in any direction to form words of 3+ letters.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0 text-xs">2</span>
            <div>
              <strong className="text-text">One visit per tile:</strong> You cannot use the same grid tile more than once in the same word.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0 text-xs">3</span>
            <div>
              <strong className="text-text">Special &ldquo;Qu&rdquo; tile:</strong> The Qu tile counts as two letters when forming valid words (e.g. &ldquo;QUIET&rdquo;).
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0 text-xs">4</span>
            <div>
              <strong className="text-text">Longer words = Big scores:</strong>
              <div className="grid grid-cols-4 gap-1.5 mt-2 text-center text-xs font-mono">
                <div className="bg-surface/80 rounded-lg p-1.5 border border-border">3L: <span className="text-primary font-bold">1 pt</span></div>
                <div className="bg-surface/80 rounded-lg p-1.5 border border-border">4L: <span className="text-primary font-bold">2 pts</span></div>
                <div className="bg-surface/80 rounded-lg p-1.5 border border-border">5L: <span className="text-primary font-bold">4 pts</span></div>
                <div className="bg-amber-500/20 text-amber-300 rounded-lg p-1.5 border border-amber-500/30">6L+: <span className="font-bold">6~10+</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-base shadow-lg shadow-primary/30 transition hover:brightness-110 active:scale-[0.99]"
        >
          Got it, Let&apos;s Play!
        </button>
      </div>
    </div>
  );
}
