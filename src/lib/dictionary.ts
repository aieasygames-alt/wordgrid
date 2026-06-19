// Q compression: replace QU → Q so the Qu tile maps to a single Trie node.
// This eliminates special-case Q→U traversal in the solver and game logic.
function bogglify(word: string): string {
  return word.replace(/QU/g, "Q");
}

// Trie-based dictionary for O(k) word lookup
export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isWord: boolean = false;
  originalWord: string = ""; // uncompressed form for display (Q compression aware)
}

export class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string): void {
    const compressed = bogglify(word.toUpperCase());
    let node = this.root;
    for (const ch of compressed) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.isWord = true;
    node.originalWord = word.toUpperCase();
  }

  contains(word: string): boolean {
    let node = this.root;
    for (const ch of bogglify(word.toUpperCase())) {
      const next = node.children.get(ch);
      if (!next) return false;
      node = next;
    }
    return node.isWord;
  }

  hasPrefix(prefix: string): boolean {
    let node = this.root;
    for (const ch of bogglify(prefix.toUpperCase())) {
      const next = node.children.get(ch);
      if (!next) return false;
      node = next;
    }
    return true;
  }
}

// Rebuild Trie from worker-serialized data (Map-based, structured-cloneable)
function rebuildFromWorkerData(rootData: unknown): Trie {
  const trie = new Trie();

  function restoreNode(data: unknown): TrieNode {
    const d = data as {
      children: Map<string, unknown>;
      isWord: boolean;
      originalWord: string;
    };
    const node = new TrieNode();
    node.isWord = d.isWord;
    node.originalWord = d.originalWord;
    for (const [key, childData] of d.children) {
      node.children.set(key, restoreNode(childData));
    }
    return node;
  }

  trie.root = restoreNode(rootData);
  return trie;
}

// Promise cache — prevents duplicate loads in React StrictMode
let _promise: Promise<Trie> | null = null;

export function loadDictionary(): Promise<Trie> {
  if (_promise) return _promise;

  _promise = (async (): Promise<Trie> => {
    // Try Web Worker first (offloads parsing ~55k words off main thread)
    if (typeof Worker !== "undefined") {
      try {
        const worker = new Worker(
          new URL("./dict-worker.ts", import.meta.url)
        );
        const trie = await new Promise<Trie>((resolve, reject) => {
          const timeout = setTimeout(() => {
            worker.terminate();
            reject(new Error("Worker timeout"));
          }, 10_000);

          worker.onmessage = (e: MessageEvent) => {
            clearTimeout(timeout);
            worker.terminate();
            const msg = e.data;
            if (msg.type === "LOADED") {
              resolve(rebuildFromWorkerData(msg.root));
            } else {
              reject(new Error(msg.error || "Worker failed"));
            }
          };

          worker.onerror = () => {
            clearTimeout(timeout);
            worker.terminate();
            reject(new Error("Worker error"));
          };

          worker.postMessage({ type: "LOAD" });
        });
        return trie;
      } catch {
        // Fall through to main-thread loading
      }
    }

    // Fallback: load on main thread
    const trie = new Trie();
    try {
      const res = await fetch("/data/words.txt");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      for (const word of text.split("\n")) {
        const w = word.trim();
        if (w.length >= 3) {
          trie.insert(w);
        }
      }
    } catch (err) {
      _promise = null;
      throw err;
    }
    return trie;
  })();

  return _promise;
}
