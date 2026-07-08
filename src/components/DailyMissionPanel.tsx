"use client";

import type { DailyMission } from "@/lib/daily-missions";

interface DailyMissionPanelProps {
  missions: DailyMission[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function DailyMissionPanel({
  missions,
  title = "Daily Missions",
  subtitle = "Small goals that make each round feel different.",
  compact = false,
}: DailyMissionPanelProps) {
  if (!missions.length) return null;

  const completed = missions.filter((mission) => mission.completed).length;

  return (
    <div className="w-full rounded-2xl border border-border bg-surface/40 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            {title}
          </h3>
          {!compact && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {completed}/{missions.length}
          </div>
          <div className="text-xs uppercase tracking-wide text-text-dim">
            complete
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`rounded-xl p-3 border transition ${
              mission.completed
                ? "bg-success-bg/20 border-success/30"
                : "bg-surface/60 border-border"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-sm">
                {mission.completed ? "✓" : "○"}
              </span>
              <div>
                <div className="font-semibold text-sm">{mission.title}</div>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {mission.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
