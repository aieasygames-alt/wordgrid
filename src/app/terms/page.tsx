import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms of use for the free WordGrid browser game and learning tools.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><h1 className="text-3xl font-bold">Terms of Use</h1><p className="mt-2 text-sm text-text-dim">Last updated: September 8, 2026</p><div className="mt-6 space-y-5 leading-relaxed text-text-muted"><p>WordGrid is provided as a free browser-based game and learning tool. You may use it for personal, educational, and non-commercial play.</p><p>Do not use the site to disrupt service, bypass technical controls, or submit harmful content. Shared challenge links contain board and score context; avoid including personal information in anything you share.</p><p>Game dictionaries, scoring, and educational guides are provided for general play and learning. They are not a substitute for an official tournament or commercial game rulebook.</p><p>Questions about these terms can be sent to <a className="font-semibold text-primary hover:underline" href="mailto:hello@wordgrid.games">hello@wordgrid.games</a>.</p></div></main>;
}
