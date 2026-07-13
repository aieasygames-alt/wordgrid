import type { ReactNode } from "react";

type GuideDesktopShellProps = {
  children: ReactNode;
  rail?: ReactNode;
};

export function GuideDesktopShell({ children, rail }: GuideDesktopShellProps) {
  return (
    <article className="mx-auto max-w-6xl">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div>{children}</div>
        <aside className="space-y-4 lg:sticky lg:top-8">
          {rail ?? (
            <>
              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
                <h2 className="text-2xl font-bold">Play after reading</h2>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  Use the guide, then test the idea on a fresh board while the
                  pattern is still in your head.
                </p>
                <a
                  href="/play"
                  className="mt-4 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold transition hover:bg-primary-hover"
                >
                  Play Word Grid Free
                </a>
              </div>
              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                <h3 className="text-lg font-semibold mb-3">Vocabulary cluster</h3>
                <div className="space-y-2 text-sm">
                  <a href="/guides/most-common-boggle-words/" className="block text-primary hover:underline">
                    Most common Boggle words
                  </a>
                  <a href="/guides/boggle-word-lists/" className="block text-primary hover:underline">
                    Boggle word lists
                  </a>
                  <a href="/guides/boggle-dictionary/" className="block text-primary hover:underline">
                    Boggle dictionary
                  </a>
                  <a href="/guides/word-pattern-library/" className="block text-primary hover:underline">
                    Pattern library
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                <h3 className="text-lg font-semibold mb-3">Rules and strategy</h3>
                <div className="space-y-2 text-sm">
                  <a href="/guides/boggle-rules-beginners/" className="block text-primary hover:underline">
                    Boggle rules
                  </a>
                  <a href="/guides/how-to-find-more-words/" className="block text-primary hover:underline">
                    Find more words
                  </a>
                  <a href="/guides/boggle-tips-tricks/" className="block text-primary hover:underline">
                    Tips and tricks
                  </a>
                  <a href="/daily" className="block text-primary hover:underline">
                    Daily board
                  </a>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </article>
  );
}
