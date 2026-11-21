import { writeFileSync } from "node:fs";

const date = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);
writeFileSync(new URL("../public/data/archive-build.json", import.meta.url), JSON.stringify({ date }, null, 2) + "\n");
