import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-8 text-sm text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p>WordGrid is a free browser-based word grid game and learning tool.</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Site navigation">
          <Link href="/play" className="hover:text-text">Play</Link>
          <Link href="/daily" className="hover:text-text">Daily</Link>
          <Link href="/weekly" className="hover:text-text">Weekly</Link>
          <Link href="/training" className="hover:text-text">Training</Link>
          <Link href="/solver" className="hover:text-text">Solver</Link>
          <Link href="/guides" className="hover:text-text">Guides</Link>
          <Link href="/words" className="hover:text-text">Word Lists</Link>
          <Link href="/about" className="hover:text-text">About</Link>
          <Link href="/contact" className="hover:text-text">Contact</Link>
          <Link href="/privacy" className="hover:text-text">Privacy</Link>
          <Link href="/terms" className="hover:text-text">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
