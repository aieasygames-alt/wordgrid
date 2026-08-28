import type { Metadata } from "next";
import WordListPage from "@/components/WordListPage";
import { getWordListPage } from "@/lib/word-lists";

const page = getWordListPage("words-with-qu")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/words/words-with-qu" },
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <WordListPage page={page} />
    </main>
  );
}
