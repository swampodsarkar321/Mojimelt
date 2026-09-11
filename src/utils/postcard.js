import { svgToPngBlob } from './download.js';

// ── Social post card renderer (1080×1080, Instagram/FB-ready) ────────────────

export const POST_THEMES = [
  {
    id: 'sunset',
    name: 'Sunset',
    swatch: 'linear-gradient(135deg,#7c3aed,#db2777,#f59e0b)',
    bg: ['#7c3aed', '#db2777', '#f59e0b'],
    panel: '#ffffff',
    ink: '#241b3a',
    sub: 'rgba(36,27,58,0.62)',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    swatch: 'linear-gradient(135deg,#0b0b14,#4c1d95,#7c3aed)',
    bg: ['#0b0b14', '#312e81', '#7c3aed'],
    panel: '#1c1830',
    ink: '#ffffff',
    sub: 'rgba(255,255,255,0.65)',
  },
  {
    id: 'candy',
    name: 'Candy',
    swatch: 'linear-gradient(135deg,#f9a8d4,#fb7185,#fdba74)',
    bg: ['#f9a8d4', '#fb7185', '#fdba74'],
    panel: '#ffffff',
    ink: '#7c2d12',
    sub: 'rgba(124,45,18,0.6)',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    swatch: 'linear-gradient(135deg,#0ea5e9,#22d3ee,#a5f3fc)',
    bg: ['#0369a1', '#0ea5e9', '#67e8f9'],
    panel: '#ffffff',
    ink: '#0c4a6e',
    sub: 'rgba(12,74,110,0.6)',
  },
];

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitFont(ctx, text, maxWidth, baseSize, weight = 900) {
  let size = baseSize;
  const family = '"Nunito", Arial, sans-serif';
  while (size > 36) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 4;
  }
  return ctx.font;
}

export function loadMixImage(svgElement, size = 1024) {
  return svgToPngBlob(svgElement, size).then(
    (blob) =>
      new Promise((resolve, reject) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      })
  );
}

export function renderPostCard(mixImg, { title, combo, theme }) {
  const S = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');

  // background gradient
  const g = ctx.createLinearGradient(0, 0, S, S);
  theme.bg.forEach((c, i) => g.addColorStop(i / (theme.bg.length - 1), c));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  // decorative translucent circles
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  [[150, 130, 180], [950, 940, 220], [930, 140, 90], [120, 920, 110]].forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // white/dark panel
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 18;
  rr(ctx, 90, 90, 900, 900, 64);
  ctx.fillStyle = theme.panel;
  ctx.fill();
  ctx.restore();

  // artwork
  const art = 540;
  ctx.drawImage(mixImg, (S - art) / 2, 165, art, art);

  // title
  ctx.fillStyle = theme.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = fitFont(ctx, title, 780, 78, 900);
  ctx.fillText(title, S / 2, 800);

  // combo line
  ctx.fillStyle = theme.sub;
  ctx.font = '700 60px "Nunito", Arial, sans-serif';
  ctx.fillText(combo, S / 2, 872);

  // footer pill
  const pillText = 'Made with Mojimelt';
  ctx.font = '800 34px "Nunito", Arial, sans-serif';
  const pillW = ctx.measureText(pillText).width + 96;
  const pillX = (S - pillW) / 2;
  const pillY = 902;
  const pg = ctx.createLinearGradient(pillX, 0, pillX + pillW, 0);
  pg.addColorStop(0, '#7c3aed');
  pg.addColorStop(1, '#db2777');
  rr(ctx, pillX, pillY, pillW, 62, 31);
  ctx.fillStyle = pg;
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(pillText, S / 2, pillY + 43);

  return canvas;
}

export function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
