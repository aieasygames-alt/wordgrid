import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = "https://wordgrid.games";
const ARTIFACT_DIR = "/Users/robert/.gemini/antigravity/brain/ba1e1ffc-c63d-471f-8e06-431c6a40752d";

function checkHttpRoute(pathname) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}/${pathname}`;
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode === 200 });
    }).on("error", (err) => {
      resolve({ url, status: 0, ok: false, error: err.message });
    });
  });
}

async function runProdVerification() {
  console.log("=================================================================");
  console.log("🌐 STARTING FULL PRODUCTION VERIFICATION: " + BASE_URL);
  console.log("=================================================================\n");

  const report = [];
  function record(title, pass, details = "") {
    report.push({ title, pass, details });
    const mark = pass ? "✅ PASS" : "❌ FAIL";
    console.log(`${mark} | ${title} ${details ? `(${details})` : ""}`);
  }

  // 1. HTTP Endpoint Status Checks
  console.log("▶ [Phase 1] HTTP Route Availability & Status 200 Checks...");
  const routes = [
    "",
    "daily/",
    "complete/",
    "play/",
    "zen/",
    "training/",
    "challenge/",
    "solver/",
    "stats/",
    "robots.txt",
    "sitemap.xml",
  ];

  for (const r of routes) {
    const res = await checkHttpRoute(r);
    record(`Route HTTP 200: /${r}`, res.ok, `Status: ${res.status}`);
  }

  // 2. Playwright Real Browser E2E Production Tests
  console.log("\n▶ [Phase 2] Real In-Browser Production UI & Gameplay Tests...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  page.on("pageerror", (err) => console.log("   [Browser Error]:", err.message));

  try {
    // -------------------------------------------------------------
    // Test 1: Production Homepage Lobby & 3D Tactile Board
    // -------------------------------------------------------------
    console.log("\n▶ [Prod Test 1] Testing Production Homepage Lobby & Board...");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Verify 3D Brand Logo
    const logoW = await page.locator("header").getByText("W", { exact: true }).first().isVisible();
    const logoG = await page.locator("header").getByText("G", { exact: true }).first().isVisible();
    const brandName = await page.locator("header").getByText("WordGrid").first().isVisible();
    record("Prod GameHeader 3D Brand Logo ([W][G] blocks)", logoW && logoG && brandName);

    // Verify Game Mode pills
    const dailyNav = await page.locator("header nav").getByText("Daily").first().isVisible();
    const completeNav = await page.locator("header nav").getByText("Complete").first().isVisible();
    const playNav = await page.locator("header nav").getByText("Play").first().isVisible();
    record("Prod GameHeader Mode Navigation Pills", dailyNav && completeNav && playNav);

    // Verify Quick Action Controls (Streak, Rules ?, Theme)
    const streakFlame = await page.locator("header").getByText("🔥").first().isVisible();
    const rulesBtn = await page.locator("header button[title='How to Play'], header button:has-text('?')").first().isVisible();
    record("Prod GameHeader Action Controls (Streak flame & Rules ? button)", streakFlame && rulesBtn);

    // Verify 3D Tactile Tiles & Scrabble subscripts on live CDN
    const tile3dCount = await page.locator(".game-tile-3d").count();
    record("Prod 3D Tactile Tiles Count", tile3dCount === 16, `Found ${tile3dCount}/16`);

    const pointSubscripts = await page.locator(".game-tile-3d span.text-\\[10px\\], .game-tile-3d span.text-\\[11px\\]").count();
    record("Prod Scrabble Point Subscripts", pointSubscripts === 16, `Found ${pointSubscripts}/16 point badges`);

    // Verify Arcade Banner & Game Mode Cards
    const arcadeBanner = await page.getByText("Instant Arcade Board").first().isVisible();
    const completeCard = await page.getByText("WordGrid Complete").first().isVisible();
    record("Prod Arcade Banner & Lobby Mode Cards", arcadeBanner && completeCard);

    // Click Start Game
    const startBtn = page.locator("button:has-text('Start Game')");
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(400);
    }

    const prod1Screenshot = path.join(ARTIFACT_DIR, "prod_1_home_lobby.png");
    await page.screenshot({ path: prod1Screenshot });
    record("Prod Screenshot: Homepage Lobby", fs.existsSync(prod1Screenshot), prod1Screenshot);

    // -------------------------------------------------------------
    // Test 2: Production How To Play Modal
    // -------------------------------------------------------------
    console.log("\n▶ [Prod Test 2] Testing Production How To Play Modal...");
    await page.locator("header button[title='How to Play'], header button:has-text('?')").first().click();
    await page.waitForTimeout(400);

    const modalTitle = await page.locator("#how-to-play-title").isVisible();
    const modalPathExample = await page.getByText("Drag Across Adjacent Tiles").first().isVisible();
    const gotItBtn = await page.locator("button:has-text(\"Got it, Let's Play!\")").isVisible();
    record("Prod How To Play Modal Dialog", modalTitle && modalPathExample && gotItBtn);

    const prod2Screenshot = path.join(ARTIFACT_DIR, "prod_2_how_to_play.png");
    await page.screenshot({ path: prod2Screenshot });
    record("Prod Screenshot: Rules Modal", fs.existsSync(prod2Screenshot), prod2Screenshot);

    // Press Escape to dismiss
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const modalDismissed = !(await page.locator("#how-to-play-title").isVisible());
    record("Prod Modal Escape Dismiss", modalDismissed);

    // -------------------------------------------------------------
    // Test 3: Production Direct Keyboard Typing Gameplay
    // -------------------------------------------------------------
    console.log("\n▶ [Prod Test 3] Testing Production Keyboard Typing...");
    const firstTileLetter = (await page.locator(".game-tile-3d, .game-tile-selected").first().locator("span").first().textContent()).trim();
    await page.keyboard.press(firstTileLetter.charAt(0));
    await page.waitForTimeout(200);

    const selectedTileCount = await page.locator(".game-tile-selected, .game-tile-last").count();
    record("Prod Keyboard Typing Direct Selection", selectedTileCount >= 1, `Typed '${firstTileLetter.charAt(0)}'`);

    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const trailCleared = (await page.locator(".game-tile-selected, .game-tile-last").count()) === 0;
    record("Prod Keyboard Escape Trail Clear", trailCleared);

    // -------------------------------------------------------------
    // Test 4: Production Daily Challenge
    // -------------------------------------------------------------
    console.log("\n▶ [Prod Test 4] Testing Production Daily Challenge (/daily/)...");
    await page.goto(`${BASE_URL}/daily/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const dailyPill = await page.getByText("Daily Board ·").first().isVisible();
    const dailyTiles = await page.locator(".game-tile-3d").count();
    record("Prod Daily Challenge Header & 3D Grid", dailyPill && dailyTiles === 16);

    const prod3Screenshot = path.join(ARTIFACT_DIR, "prod_3_daily_page.png");
    await page.screenshot({ path: prod3Screenshot });
    record("Prod Screenshot: Daily Page", fs.existsSync(prod3Screenshot), prod3Screenshot);

    // -------------------------------------------------------------
    // Test 5: Production Complete Mode & Live bank-v1.json Fetch
    // -------------------------------------------------------------
    console.log("\n▶ [Prod Test 5] Testing Production Complete Mode (/complete/)...");
    await page.goto(`${BASE_URL}/complete/`, { waitUntil: "networkidle" });
    // Dismiss quick tutorial if present
    await page.evaluate(() => {
      localStorage.setItem("wordgrid-complete-tutorial-v1", "done");
    });
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const completeBoard = await page.locator("[data-complete-board]").isVisible();
    const xpTrail = await page.getByText("Collection Trail").first().isVisible();
    const milestoneCounts = await page.getByText("20% (Counts)").first().isVisible();
    const milestoneReveals = await page.getByText("60% (Reveals)").first().isVisible();
    record("Prod Complete 3D Board & XP Milestones", completeBoard && xpTrail && milestoneCounts && milestoneReveals);

    const prod4Screenshot = path.join(ARTIFACT_DIR, "prod_4_complete_mode.png");
    await page.screenshot({ path: prod4Screenshot });
    record("Prod Screenshot: Complete Mode", fs.existsSync(prod4Screenshot), prod4Screenshot);

    // -------------------------------------------------------------
    // Test 6: Production Endgame Trophy Showcase (/play/ End Game)
    // -------------------------------------------------------------
    console.log("\n▶ [Prod Test 6] Testing Production Endgame Trophy Showcase...");
    await page.goto(`${BASE_URL}/play/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const playStartBtn = page.locator("button:has-text('Start Game')");
    if (await playStartBtn.isVisible()) {
      await playStartBtn.click();
      await page.waitForTimeout(300);
    }

    const endRoundEarlyBtn = page.locator("button:has-text('End Round Early')");
    await endRoundEarlyBtn.click();
    await page.waitForTimeout(700);

    const trophyHeader = await page.getByText("Round Finished").first().isVisible();
    const tierPill = await page.locator("text=APPRENTICE").or(page.locator("text=SHARP EYE")).or(page.locator("text=EXPERT")).first().isVisible();
    const triadMetrics = await page.getByText("Found Words").first().isVisible() && await page.getByText("👑 MVP Word").first().isVisible() && await page.getByText("⚡ Best Combo").first().isVisible();
    const actionButtons = await page.locator("button:has-text('Play Again')").first().isVisible() && await page.locator("button:has-text('Share Card')").first().isVisible();

    record("Prod Endgame Trophy Showcase & Tier Badge", trophyHeader && tierPill);
    record("Prod Performance Triad Metrics", triadMetrics);
    record("Prod Action Buttons (Play Again & Share Card)", actionButtons);

    const prod5Screenshot = path.join(ARTIFACT_DIR, "prod_5_endgame_trophy.png");
    await page.screenshot({ path: prod5Screenshot });
    record("Prod Screenshot: Endgame Trophy", fs.existsSync(prod5Screenshot), prod5Screenshot);

    // -------------------------------------------------------------
    // Summary
    // -------------------------------------------------------------
    console.log("\n==================== PRODUCTION VERIFICATION SUMMARY ====================");
    const passed = report.filter((r) => r.pass).length;
    console.log(`Total Checks: ${report.length} | Passed: ${passed} | Failed: ${report.length - passed}`);
    if (passed === report.length) {
      console.log("🎉 ALL PRODUCTION CHECKS & SCREENSHOTS PASSED 100% ON LIVE DEPLOYMENT!");
    } else {
      console.log("⚠️ Some production checks failed:", report.filter((r) => !r.pass));
    }

  } catch (err) {
    console.error("Production Verification Execution Error:", err);
  } finally {
    await browser.close();
  }
}

runProdVerification();
