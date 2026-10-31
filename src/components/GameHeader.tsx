"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import HowToPlayModal from "./HowToPlayModal";
import { getStreak, StreakData } from "@/lib/streak";

interface Props {
  currentMode?: "daily" | "complete" | "play" | "zen" | "training" | "challenge" | "weekly" | "other";
}

const GAME_MODES = [
  { href: "/daily", label: "Daily", icon: "🔥", tag: "Daily" },
  { href: "/complete", label: "Complete", icon: "🧩", tag: "Untimed" },
  { href: "/play", label: "Play", icon: "⚡", tag: "3 Min" },
  { href: "/zen", label: "Zen", icon: "🧘", tag: "Practice" },
  { href: "/training", label: "Training", icon: "🎯", tag: "Sprint" },
  { href: "/challenge", label: "VS Friends", icon: "⚔️", tag: "Room" },
];

export default function GameHeader({ currentMode }: Props) {
  const pathname = usePathname();
  const [showRules, setShowRules] = useState(false);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalPlayed: 0,
    lastPlayedDate: "",
  });

  useEffect(() => {
    setStreak(getStreak());
  }, []);

  const isActive = (href: string) => {
    if (currentMode) {
      if (href === "/daily" && currentMode === "daily") return true;
      if (href === "/complete" && currentMode === "complete") return true;
      if (href === "/play" && currentMode === "play") return true;
      if (href === "/zen" && currentMode === "zen") return true;
      if (href === "/training" && currentMode === "training") return true;
      if (href === "/challenge" && currentMode === "challenge") return true;
    }
    return pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-slate-900/90 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6">
          {/* Brand Logo with 3D Tactile Cubes */}
          <Link href="/" className="group flex items-center gap-2.5 select-none shrink-0" aria-label="WordGrid Home">
            <div className="flex items-center gap-1 transition-transform group-hover:scale-105">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-700 text-white font-black flex items-center justify-center text-base shadow-[0_3px_0_0_#312e81]">
                W
              </span>
              <span className="w-8 h-8 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-base shadow-[0_3px_0_0_#b45309]">
                G
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-text leading-none group-hover:text-primary transition-colors">
                WordGrid
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 leading-none mt-0.5">
                Games
              </span>
            </div>
          </Link>

          {/* Desktop Mode Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 p-1 backdrop-blur-sm" aria-label="Game Modes">
            {GAME_MODES.map((mode) => {
              const active = isActive(mode.href);
              return (
                <Link
                  key={mode.href}
                  href={mode.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-white shadow-md shadow-primary/30 scale-[1.02]"
                      : "text-text-muted hover:text-text hover:bg-surface-hover/80"
                  }`}
                >
                  <span className="text-xs">{mode.icon}</span>
                  <span>{mode.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Game Controls & Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Streak Counter Button */}
            <Link
              href="/daily"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-border/60 bg-surface/70 hover:bg-surface text-text transition text-xs font-bold"
              title={`Current Streak: ${streak.currentStreak} days`}
            >
              <span className="text-amber-400 text-sm">🔥</span>
              <span className="tabular-nums">{streak.currentStreak}</span>
            </Link>

            {/* How to Play Modal Trigger */}
            <button
              onClick={() => setShowRules(true)}
              aria-label="How to play rules"
              className="flex items-center justify-center w-8 h-8 rounded-xl border border-border/60 bg-surface/70 hover:bg-surface text-text-muted hover:text-text transition text-xs font-bold"
              title="How to Play"
            >
              ?
            </button>

            {/* Stats Link */}
            <Link
              href="/stats"
              aria-label="View game statistics"
              className="flex items-center justify-center w-8 h-8 rounded-xl border border-border/60 bg-surface/70 hover:bg-surface text-text-muted hover:text-text transition text-xs"
              title="Statistics"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Horizontal Scrolling Mode Bar */}
        <div className="flex md:hidden overflow-x-auto px-3 py-1.5 gap-1.5 border-t border-border/40 scrollbar-none">
          {GAME_MODES.map((mode) => {
            const active = isActive(mode.href);
            return (
              <Link
                key={mode.href}
                href={mode.href}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shrink-0 transition ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface/60 text-text-muted hover:text-text"
                }`}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Rules Modal */}
      <HowToPlayModal isOpen={showRules} onClose={() => setShowRules(false)} />
    </>
  );
}
