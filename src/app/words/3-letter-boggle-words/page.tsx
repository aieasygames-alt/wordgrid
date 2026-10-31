import type { Metadata } from "next";
import WordListPage from "@/components/WordListPage";
import { getWordListPage } from "@/lib/word-lists";

const BASE_URL = "https://wordgrid.games";
const page = getWordListPage("3-letter-boggle-words")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `${BASE_URL}/words/3-letter-boggle-words/` },
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <WordListPage page={page} />
    </main>
  );
}
