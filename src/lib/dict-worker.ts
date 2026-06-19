/// <reference lib="webworker" />

// Web Worker: builds the Trie off the main thread to avoid 1-2s jank.
// Fetches /data/words.txt, constructs the compressed Trie, posts it back.

function bogglify(word: string): string {
  return word.replace(/QU/g, "Q");
}

// Serializable Trie node (Map is structured-cloneable)
interface SerNode {
  children: Map<string, SerNode>;
  isWord: boolean;
  originalWord: string;
}

self.onmessage = async (e: MessageEvent) => {
  if (e.data.type !== "LOAD") return;

  try {
    const res = await fetch("/data/words.txt");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();

    const root: SerNode = {
      children: new Map(),
      isWord: false,
      originalWord: "",
    };

    let count = 0;
    for (const line of text.split("\n")) {
      const w = line.trim().toUpperCase();
      if (w.length < 3) continue;

      const compressed = bogglify(w);
      let node = root;
      for (const ch of compressed) {
        let child = node.children.get(ch);
        if (!child) {
          child = { children: new Map(), isWord: false, originalWord: "" };
          node.children.set(ch, child);
        }
        node = child;
      }
      node.isWord = true;
      node.originalWord = w;
      count++;
    }

    (self as unknown as Worker).postMessage({
      type: "LOADED",
      root,
      count,
    });
  } catch (err) {
    (self as unknown as Worker).postMessage({
      type: "ERROR",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
