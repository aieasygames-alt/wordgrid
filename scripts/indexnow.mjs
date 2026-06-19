#!/usr/bin/env node

/**
 * IndexNow submission script
 * Notifies Bing and Yandex of new/changed URLs for instant crawling.
 *
 * Usage:
 *   node scripts/indexnow.mjs               # submit all sitemap URLs
 *   node scripts/indexnow.mjs /play/ /daily/ # submit specific URLs
 *
 * Requires: site deployed and sitemap.xml accessible at wordgrid.games
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const INDEXNOW_KEY = "741b5f15ed3d8f0f92df581f89009c51";
const HOST = "wordgrid.games";
const INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow";

// Get URLs to submit
function getUrls() {
  const cliUrls = process.argv.slice(2);
  if (cliUrls.length > 0) {
    return cliUrls.map((u) => `https://${HOST}${u}`);
  }

  // Parse from sitemap.xml in out/ directory
  try {
    const sitemapPath = join(ROOT, "out", "sitemap.xml");
    const xml = readFileSync(sitemapPath, "utf-8");
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
    console.log(`Found ${urls.length} URLs in sitemap.xml`);
    return urls;
  } catch {
    console.error("Could not read out/sitemap.xml. Run 'npm run build' first or pass URLs as arguments.");
    process.exit(1);
  }
}

async function submitIndexNow() {
  const urls = getUrls();
  console.log(`Submitting ${urls.length} URL(s) to IndexNow...\n`);

  // IndexNow API allows max 10,000 URLs per request
  const batchSize = 10000;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);

    const body = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    };

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        console.log(`✓ Batch ${i / batchSize + 1}: ${batch.length} URLs accepted`);
      } else if (res.status === 202) {
        console.log(`✓ Batch ${i / batchSize + 1}: ${batch.length} URLs queued for processing`);
      } else if (res.status === 422) {
        console.error(`✗ Batch ${i / batchSize + 1}: Invalid request (422)`);
        const text = await res.text();
        console.error(text);
      } else {
        console.error(`✗ Batch ${i / batchSize + 1}: HTTP ${res.status}`);
      }
    } catch (err) {
      console.error(`✗ Batch ${i / batchSize + 1}: Network error`, err.message);
    }
  }

  console.log("\nDone. Bing will crawl submitted URLs within ~24h.");
}

submitIndexNow();
