// Canvas-based share card generator
// Composites score, word count, and mini board onto the background image

import { Grid } from "./boggle";

export interface ShareCardData {
  grid: Grid;
  totalScore: number;
  maxScore: number;
  foundCount: number;
  totalCount: number;
  percentage: number;
  mode: "play" | "daily";
  dateLabel?: string;
  bestCombo?: number;
}

let _bgImage: HTMLImageElement | null = null;

function loadBgImage(): Promise<HTMLImageElement> {
  if (_bgImage) return Promise.resolve(_bgImage);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      _bgImage = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = "/share-card-bg.png";
  });
}

export async function generateShareCard(
  data: ShareCardData
): Promise<Blob | null> {
  const W = 1200;
  const H = 630;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Draw background
  try {
    const bg = await loadBgImage();
    ctx.drawImage(bg, 0, 0, W, H);
  } catch {
    // Fallback: dark gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#1e1b4b");
    grad.addColorStop(1, "#1e293b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // Right-side text overlay area: x=720..1180
  const rightX = 750;

  // Score number (large)
  ctx.fillStyle = "#818cf8";
  ctx.font = "bold 80px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`${data.totalScore}`, rightX, 120);

  // "pts" label
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 28px system-ui, -apple-system, sans-serif";
  const scoreWidth = ctx.measureText(`${data.totalScore}`).width;
  ctx.fillText("pts", rightX + scoreWidth + 12, 165);

  // Out of max
  ctx.fillStyle = "#64748b";
  ctx.font = "400 22px system-ui, -apple-system, sans-serif";
  ctx.fillText(
    `out of ${data.maxScore} possible`,
    rightX,
    215
  );

  // Percentage badge
  ctx.fillStyle = "#8b5cf6";
  ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${data.percentage}%`, rightX, 260);

  if (data.bestCombo && data.bestCombo >= 2) {
    ctx.fillStyle = "#22c55e";
    ctx.font = "700 24px system-ui, -apple-system, sans-serif";
    ctx.fillText(`Best combo x${data.bestCombo}`, rightX, 302);
  }

  // Word stats
  ctx.fillStyle = "#4ade80";
  ctx.font = "600 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${data.foundCount} found`, rightX, 348);

  ctx.fillStyle = "#f87171";
  ctx.fillText(
    `${data.totalCount - data.foundCount} missed`,
    rightX + 160,
    348
  );

  // Mode label
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "500 20px system-ui, -apple-system, sans-serif";
  const modeText =
    data.mode === "daily"
      ? `Daily board — ${data.dateLabel ?? ""}`
      : "Practice Game";
  ctx.fillText(modeText, rightX, 388);

  // CTA at bottom
  ctx.fillStyle = "#94a3b8";
  ctx.font = "500 18px system-ui, -apple-system, sans-serif";
  ctx.fillText("wordgrid.games", rightX, 560);

  // Mini board thumbnail, scaled to the active grid size.
  drawMiniBoard(ctx, data.grid, rightX, 400, 220);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png", 0.92);
  });
}

function drawMiniBoard(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  x: number,
  y: number,
  size: number
) {
  const boardSize = grid.length;
  const gap = boardSize <= 4 ? 4 : boardSize === 5 ? 3 : 2;
  const cellSize = (size - gap * (boardSize - 1)) / boardSize;
  const radius = 6;

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      const cx = x + c * (cellSize + gap);
      const cy = y + r * (cellSize + gap);
      const letter = grid[r][c].letter.toUpperCase();

      // Cell background
      ctx.fillStyle = "rgba(30, 27, 75, 0.85)";
      roundRect(ctx, cx, cy, cellSize, cellSize, radius);
      ctx.fill();

      // Border
      ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
      ctx.lineWidth = 1;
      roundRect(ctx, cx, cy, cellSize, cellSize, radius);
      ctx.stroke();

      // Letter
      ctx.fillStyle = "#e2e8f0";
      ctx.font = `bold ${Math.floor(cellSize * 0.45)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const displayLetter = letter === "QU" ? "Qu" : letter;
      ctx.fillText(displayLetter, cx + cellSize / 2, cy + cellSize / 2);
    }
  }
  // Reset alignment
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function shareCardImage(data: ShareCardData): Promise<void> {
  const blob = await generateShareCard(data);
  if (!blob) return;

  const file = new File([blob], "wordgrid-result.png", { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      text: `WordGrid — ${data.totalScore} pts (${data.percentage}%)${data.bestCombo && data.bestCombo >= 2 ? `, best combo x${data.bestCombo}` : ""}`,
    });
  } else {
    // Fallback: download the image
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wordgrid-result.png";
    a.click();
    URL.revokeObjectURL(url);
  }
}
