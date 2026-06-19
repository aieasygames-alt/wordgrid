"use client";

import { useState, useEffect, useRef } from "react";

interface TimerProps {
  seconds: number;
  onExpire: () => void;
  paused?: boolean;
}

export default function Timer({ seconds, onExpire, paused = false }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;
  const expiredRef = useRef(false);
  const startRef = useRef<number>(0);
  const elapsedBeforePauseRef = useRef<number>(0);

  useEffect(() => {
    if (paused) {
      // Record how much time has passed before pausing
      elapsedBeforePauseRef.current += Date.now() - startRef.current;
      return;
    }

    // Start counting from now + whatever was elapsed before pause
    startRef.current = Date.now();
    const baseElapsed = elapsedBeforePauseRef.current;

    const tick = () => {
      const elapsed = baseElapsed + (Date.now() - startRef.current);
      const rem = Math.max(0, seconds - Math.floor(elapsed / 1000));
      setRemaining(rem);
      if (rem <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current();
      }
    };

    tick(); // sync initial
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [paused, seconds]);

  // Reset when seconds changes (new game)
  useEffect(() => {
    expiredRef.current = false;
    elapsedBeforePauseRef.current = 0;
    setRemaining(seconds);
  }, [seconds]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isLow = remaining <= 30;
  const isCritical = remaining <= 10;

  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-2xl font-bold
        transition-colors duration-300
        ${isCritical ? "bg-red-900/50 text-red-400 animate-pulse" : isLow ? "bg-orange-900/40 text-orange-400" : "bg-slate-800 text-slate-200"}
      `}
      role="timer"
      aria-label={`Time remaining: ${mins} minutes ${secs} seconds`}
      aria-live="off"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="tabular-nums">
        {mins}:{secs.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
