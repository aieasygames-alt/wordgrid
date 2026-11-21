import { writeFileSync } from "node:fs";

const now = new Date();
const date = new Date(now.getTime() + 8 * 3600000).toISOString().slice(0, 10);
// A fresh marker also retries a failed Pages deployment later on the same day.
const generatedAt = now.toISOString();
writeFileSync(new URL("../public/data/archive-build.json", import.meta.url), JSON.stringify({ date, generatedAt }, null, 2) + "\n");
