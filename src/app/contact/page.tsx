import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact WordGrid", description: "Contact WordGrid for feedback, corrections, accessibility issues, or privacy questions.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><h1 className="text-3xl font-bold">Contact WordGrid</h1><div className="mt-6 space-y-5 leading-relaxed text-text-muted"><p>For feedback, content corrections, accessibility issues, or privacy questions, email <a className="font-semibold text-primary hover:underline" href="mailto:hello@wordgrid.games">hello@wordgrid.games</a>.</p><p>Please do not include sensitive personal information in your message. We use this address for site-related requests and aim to review legitimate messages promptly.</p></div></main>;
}
