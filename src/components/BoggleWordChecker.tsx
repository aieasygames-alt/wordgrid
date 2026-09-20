"use client";

import { FormEvent, useEffect, useState } from "react";
import { loadDictionary } from "@/lib/dictionary";

type CheckState = "idle" | "loading" | "valid" | "invalid" | "format" | "error";

function normalizeWord(value: string) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

export default function BoggleWordChecker() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<CheckState>("idle");
  const [word, setWord] = useState("");

  useEffect(() => {
    loadDictionary().catch(() => {
      // The submit action exposes an actionable error if a load cannot recover.
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeWord(value);
    setWord(normalized);

    if (!/^[A-Z]+$/.test(normalized) || normalized.length < 3) {
      setState("format");
      return;
    }

    setState("loading");
    try {
      const dictionary = await loadDictionary();
      setState(dictionary.contains(normalized) ? "valid" : "invalid");
    } catch {
      setState("error");
    }
  }

  const result = {
    idle: null,
    loading: <p className="mt-3 text-sm text-text-muted" role="status">Checking WordGrid&apos;s word list...</p>,
    valid: <p className="mt-3 rounded-lg bg-success-bg px-3 py-2 text-sm font-medium text-success" role="status"><strong>{word}</strong> is in the WordGrid word list.</p>,
    invalid: <p className="mt-3 rounded-lg bg-danger-bg px-3 py-2 text-sm font-medium text-danger" role="status"><strong>{word}</strong> is not in the WordGrid word list.</p>,
    format: <p className="mt-3 rounded-lg bg-surface px-3 py-2 text-sm text-text-muted" role="status">Enter one English word with at least 3 letters. Spaces, numbers, and punctuation are not accepted.</p>,
    error: <p className="mt-3 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger" role="alert">The word list could not load. Please try again.</p>,
  }[state];

  return (
    <section className="rounded-xl border border-border bg-surface/50 p-5 sm:p-6" aria-labelledby="word-checker-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 id="word-checker-title" className="text-xl font-semibold text-text">Check a WordGrid word</h2>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">Use the same word list that validates WordGrid rounds. Check after a game, not during a live challenge.</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">3+ letters</span>
      </div>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="boggle-word-checker">Word to check</label>
        <input
          id="boggle-word-checker"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2.5 font-mono uppercase text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          placeholder="Type a word, e.g. GARDEN"
          autoComplete="off"
          spellCheck="false"
        />
        <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-white transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg">
          Check word
        </button>
      </form>
      {result}
      <p className="mt-3 text-xs leading-relaxed text-text-dim">A word still has to follow the board path: adjacent tiles only, with no tile reused in the same word. The Qu tile represents Q and U together.</p>
    </section>
  );
}
