import GIF from 'gif.js';
import gifWorkerUrl from 'gif.js/dist/gif.worker.js?url';

// ── Animated GIF export: squash-and-stretch bounce of the mix artwork ───────

function serializeFramedSvg(svgElement, frame, total) {
  const clone = svgElement.cloneNode(true);
  const S = 240; // viewBox units
  const t = (frame / total) * Math.PI * 2;
  const sx = 1 + 0.05 * Math.sin(t);
  const sy = 1 - 0.07 * Math.sin(t);
  const ty = 8 * Math.max(0, Math.sin(t + Math.PI / 2)) * -1; // hop up slightly

  const NS = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('transform', `translate(120 132) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(-120 -132) translate(0 ${ty.toFixed(1)})`);
  const kids = [...clone.childNodes].filter((n) => n.nodeName.toLowerCase() !== 'defs');
  kids.forEach((n) => g.appendChild(n));
  clone.appendChild(g);
  clone.setAttribute('width', String(S));
  clone.setAttribute('height', String(S));
  clone.setAttribute('xmlns', NS);

  const source = new XMLSerializer().serializeToString(clone);
  return { source, S };
}

function svgSourceToImage(source) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function downloadMixGif(svgElement, filename = 'mojimelt.gif', opts = {}) {
  const { size = 480, frames = 8, delay = 110, onProgress } = opts;

  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: size,
    height: size,
    workerScript: gifWorkerUrl,
    transparent: null,
  });

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  for (let f = 0; f < frames; f++) {
    const { source } = serializeFramedSvg(svgElement, f, frames);
    const img = await svgSourceToImage(source);
    // white backdrop (GIF has no real alpha) + centered art with margin
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    const pad = size * 0.08;
    ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
    gif.addFrame(ctx, { copy: true, delay });
    onProgress?.(Math.round(((f + 1) / frames) * 60)); // 0-60%: frame capture
  }

  const blob = await new Promise((resolve, reject) => {
    gif.on('progress', (p) => onProgress?.(60 + Math.round(p * 40))); // 60-100%: encode
    gif.on('finished', resolve);
    gif.on('aborted', () => reject(new Error('aborted')));
    try {
      gif.render();
    } catch (err) {
      reject(err);
    }
  });

  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  return blob;
}
