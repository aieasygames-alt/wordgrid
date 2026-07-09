"use client";

import Link from "next/link";
import type { Grid } from "@/lib/boggle";
import type { TodayActionTip } from "@/lib/daily-tip";

interface TodayTipCardProps {
  tip: TodayActionTip;
  grid?: Grid;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  compact?: boolean;
}

export default function TodayTipCard({
  tip,
  grid,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  compact = false,
}: TodayTipCardProps) {
  return (
    <section className={`w-full rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-surface/70 to-bg/60 shadow-xl shadow-black/10 ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}>
      <div className={`flex flex-col ${compact ? "lg:flex-row lg:items-end lg:justify-between" : "xl:flex-row xl:items-end xl:justify-between"} gap-5`}>
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {tip.label}
          </div>
          <h2 className={`mt-3 font-bold tracking-tight text-text ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
            {tip.title}
          </h2>
          <p className={`mt-3 leading-relaxed text-text-muted ${compact ? "text-sm" : "text-sm sm:text-base"}`}>
            {tip.detail}
          </p>
          <div className={`mt-4 rounded-2xl border border-border bg-bg/55 ${compact ? "px-3 py-2.5" : "px-4 py-3"}`}>
            <div className="text-xs uppercase tracking-wide text-text-dim">Do this now</div>
            <div className={`mt-1 font-semibold text-text ${compact ? "text-sm" : "text-sm"}`}>{tip.action}</div>
            <div className={`mt-1 text-text-muted ${compact ? "text-xs" : "text-sm"}`}>{tip.boardNote}</div>
          </div>
        </div>

        <div className={`flex flex-col gap-3 shrink-0 ${compact ? "lg:flex-row lg:items-end" : ""}`}>
          {grid && (
            <div className={`rounded-2xl border border-border bg-bg/60 ${compact ? "p-2.5" : "p-3"}`}>
              <div className="text-xs uppercase tracking-wide text-text-dim mb-2">Today's board</div>
              <div className={`grid grid-cols-4 gap-1.5 ${compact ? "w-32 sm:w-36" : "w-40 sm:w-44"}`}>
                {grid.flat().map((cell, index) => (
                  <div
                    key={`${cell.row}-${cell.col}-${index}`}
                    className={`aspect-square rounded-xl border border-border bg-surface/70 flex items-center justify-center font-bold uppercase text-text shadow-inner ${compact ? "text-[10px]" : "text-sm"}`}
                  >
                    {cell.letter}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`flex flex-col gap-2 ${compact ? "min-w-[180px]" : ""}`}>
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-xl bg-surface px-4 py-2.5 text-sm font-semibold text-text hover:bg-surface-hover transition"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
