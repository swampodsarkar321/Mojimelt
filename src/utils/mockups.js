import { loadMixImage } from './postcard.js';

// ── Mockup Studio: T-shirt / Mug / Cap mockups + daily free quota ────────────

const QUOTA_KEY = 'mojimelt:mockup-quota:v1';
export const DAILY_FREE = 3;
export const SHARE_BONUS = 2;

export const MOCKUP_PRODUCTS = [
  { id: 'tee', name: 'T-shirt' },
  { id: 'mug', name: 'Mug' },
  { id: 'cap', name: 'Cap' },
];

export const TEE_COLORS = [
  { id: 'white', name: 'White', main: '#f8fafc', shade: '#e2e8f0', line: '#cbd5e1' },
  { id: 'black', name: 'Black', main: '#26313f', shade: '#111827', line: '#0b0f16' },
  { id: 'navy', name: 'Navy', main: '#27407a', shade: '#16264d', line: '#0f1c3a' },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadQuota() {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (raw) {
      const q = JSON.parse(raw);
      if (q.date === todayStr()) return q;
    }
  } catch {
    /* ignore */
  }
  return { date: todayStr(), used: 0, bonus: 0 };
}

function saveQuota(q) {
  try {
    localStorage.setItem(QUOTA_KEY, JSON.stringify(q));
  } catch {
    /* ignore */
  }
}

export function getQuota() {
  const q = loadQuota();
  const left = Math.max(0, DAILY_FREE + q.bonus - q.used);
  return { ...q, left };
}

export function useMockupSlot() {
  const q = loadQuota();
  if (DAILY_FREE + q.bonus - q.used <= 0) return false;
  q.used += 1;
  saveQuota(q);
  return true;
}

export function grantShareBonus() {
  const q = loadQuota();
  q.bonus += SHARE_BONUS;
  saveQuota(q);
  return getQuota();
}

// ── canvas helpers ────────────────────────────────────────────────────────────
function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function backdrop(ctx, S, c1, c2) {
  const g = ctx.createLinearGradient(0, 0, 0, S);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
}

function floorShadow(ctx, cx, y, rx, ry = 30) {
  ctx.beginPath();
  ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15,23,42,0.14)';
  ctx.fill();
}

function teePath(ctx) {
  ctx.beginPath();
  ctx.moveTo(458, 296);
  ctx.quadraticCurveTo(500, 336, 540, 336);
  ctx.quadraticCurveTo(580, 336, 622, 296);
  ctx.lineTo(700, 330); // right shoulder
  ctx.lineTo(792, 392); // sleeve out
  ctx.lineTo(742, 478); // sleeve hem
  ctx.lineTo(668, 428); // armpit
  ctx.lineTo(682, 786); // body side
  ctx.quadraticCurveTo(540, 800, 398, 786); // bottom hem
  ctx.lineTo(412, 428);
  ctx.lineTo(338, 478);
  ctx.lineTo(288, 392);
  ctx.lineTo(380, 330);
  ctx.closePath();
}

function drawTee(ctx, S, mixImg, color) {
  backdrop(ctx, S, '#f8fafc', '#e2e8f0');
  floorShadow(ctx, 540, 812, 250);
  teePath(ctx);
  const g = ctx.createLinearGradient(280, 0, 800, 0);
  g.addColorStop(0, color.shade);
  g.addColorStop(0.22, color.main);
  g.addColorStop(0.78, color.main);
  g.addColorStop(1, color.shade);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = 'rgba(15,23,42,0.12)';
  ctx.lineWidth = 3;
  ctx.stroke();
  // collar
  ctx.beginPath();
  ctx.ellipse(540, 300, 82, 26, 0, 0, Math.PI);
  ctx.strokeStyle = color.line;
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(540, 300, 82, 26, 0, 0, Math.PI);
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 3;
  ctx.stroke();
  // sleeve + bottom hems
  ctx.strokeStyle = 'rgba(15,23,42,0.12)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(352, 462);
  ctx.lineTo(424, 414);
  ctx.moveTo(728, 462);
  ctx.lineTo(656, 414);
  ctx.moveTo(404, 758);
  ctx.quadraticCurveTo(540, 772, 676, 758);
  ctx.stroke();
  // artwork on chest
  const art = 350;
  ctx.drawImage(mixImg, 540 - art / 2, 452, art, art);
}

function drawMug(ctx, S, mixImg) {
  backdrop(ctx, S, '#fffbeb', '#fde68a');
  floorShadow(ctx, 520, 820, 230);
  // handle (behind body)
  ctx.beginPath();
  ctx.arc(700, 540, 110, -Math.PI / 2.4, Math.PI / 2.4);
  ctx.strokeStyle = '#e8edf3';
  ctx.lineWidth = 54;
  ctx.stroke();
  // body
  const bx = 330;
  const by = 300;
  const bw = 340;
  const bh = 470;
  rr(ctx, bx, by, bw, bh, 46);
  const g = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  g.addColorStop(0, '#e2e8f0');
  g.addColorStop(0.25, '#ffffff');
  g.addColorStop(0.75, '#ffffff');
  g.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = 'rgba(15,23,42,0.12)';
  ctx.lineWidth = 3;
  ctx.stroke();
  // rim + coffee
  ctx.beginPath();
  ctx.ellipse(bx + bw / 2, by + 8, bw / 2 - 14, 26, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#92400e';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(bx + bw / 2, by + 8, bw / 2 - 14, 26, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(15,23,42,0.2)';
  ctx.lineWidth = 4;
  ctx.stroke();
  // steam
  ctx.strokeStyle = 'rgba(100,116,139,0.55)';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ['440', '500', '560'].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(Number(x), 250);
    ctx.quadraticCurveTo(Number(x) + 18, 215, Number(x), 180);
    ctx.quadraticCurveTo(Number(x) - 18, 150, Number(x), 120);
    ctx.stroke();
  });
  // artwork on mug
  const art = 215;
  ctx.drawImage(mixImg, bx + bw / 2 - art / 2, 470, art, art);
}

function drawCap(ctx, S, mixImg) {
  backdrop(ctx, S, '#eef2ff', '#c7d2fe');
  floorShadow(ctx, 540, 800, 260);
  const main = '#1f2937';
  const shade = '#111827';
  // dome
  ctx.beginPath();
  ctx.ellipse(540, 500, 225, 205, 0, Math.PI, 0);
  ctx.closePath();
  const g = ctx.createLinearGradient(315, 0, 765, 0);
  g.addColorStop(0, shade);
  g.addColorStop(0.3, main);
  g.addColorStop(0.7, main);
  g.addColorStop(1, shade);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = 'rgba(15,23,42,0.25)';
  ctx.lineWidth = 3;
  ctx.stroke();
  // panels
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 4;
  [440, 540, 640].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(540, 300);
    ctx.quadraticCurveTo(x, 380, x - 12, 498);
    ctx.stroke();
  });
  // top button
  ctx.beginPath();
  ctx.arc(540, 298, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#374151';
  ctx.fill();
  // brim
  ctx.beginPath();
  ctx.ellipse(540, 545, 305, 78, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#2b3546';
  ctx.fill();
  ctx.strokeStyle = 'rgba(15,23,42,0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(540, 545, 250, 58, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 4;
  ctx.stroke();
  // artwork on front panel
  const art = 185;
  ctx.drawImage(mixImg, 540 - art / 2, 360, art, art);
}

export async function renderMockup(svgElement, productId, teeColorId = 'white') {
  const mixImg = await loadMixImage(svgElement, 768);
  const S = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (productId === 'mug') drawMug(ctx, S, mixImg);
  else if (productId === 'cap') drawCap(ctx, S, mixImg);
  else {
    const color = TEE_COLORS.find((c) => c.id === teeColorId) || TEE_COLORS[0];
    drawTee(ctx, S, mixImg, color);
  }
  // brand tag
  ctx.font = '800 30px "Nunito", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(15,23,42,0.45)';
  ctx.fillText('Made with Mojimelt', S / 2, S - 48);
  return canvas;
}

export function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
