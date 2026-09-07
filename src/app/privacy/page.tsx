import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "Read the WordGrid privacy policy, including local game data and optional analytics consent.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><h1 className="text-3xl font-bold">Privacy Policy</h1><p className="mt-2 text-sm text-text-dim">Last updated: September 8, 2026</p><div className="mt-6 space-y-5 leading-relaxed text-text-muted"><h2 className="text-xl font-semibold text-text">Local game data</h2><p>WordGrid stores settings and local game progress, such as theme, sound preference, streaks, and recent game history, in your browser. This data stays on your device unless you clear browser storage.</p><h2 className="text-xl font-semibold text-text">Analytics</h2><p>With your consent, WordGrid uses Google Analytics to understand aggregated usage such as page views, game starts, completed rounds, and feature clicks. We do not ask players to create accounts or submit names to play.</p><h2 className="text-xl font-semibold text-text">Contact</h2><p>Questions about privacy can be sent to <a className="font-semibold text-primary hover:underline" href="mailto:hello@wordgrid.games">hello@wordgrid.games</a>.</p></div></main>;
}
