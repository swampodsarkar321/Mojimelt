// ── PNG export + share helpers ──────────────────────────────────────────────

export async function svgToPngBlob(svgElement, size = 1024) {
  const clone = svgElement.cloneNode(true);
  clone.setAttribute('width', String(size));
  clone.setAttribute('height', String(size));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(clone);
  if (!source.includes('xmlns')) {
    source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  try {
    const img = new Image();
    img.decoding = 'sync';
    const loaded = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    img.src = url;
    await loaded;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size); // transparent background
    ctx.drawImage(img, 0, 0, size, size);

    const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!pngBlob) throw new Error('Export failed');
    return pngBlob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function downloadSvgAsPng(svgElement, filename = 'mojimelt.png', size = 1024) {
  const pngBlob = await svgToPngBlob(svgElement, size);
  const dlUrl = URL.createObjectURL(pngBlob);
  try {
    const a = document.createElement('a');
    a.href = dlUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    setTimeout(() => URL.revokeObjectURL(dlUrl), 4000);
  }
}

export async function copyImageToClipboard(svgElement, size = 1024) {
  if (!window.ClipboardItem || !navigator.clipboard?.write) return false;
  const pngBlob = await svgToPngBlob(svgElement, size);
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
  return true;
}

// ── WebP sticker export (512×512 — WhatsApp sticker size) ────────────────────
export async function downloadSvgAsWebp(svgElement, filename = 'mojimelt.webp', size = 512) {
  const pngBlob = await svgToPngBlob(svgElement, size);
  const url = URL.createObjectURL(pngBlob);
  try {
    const img = new Image();
    const loaded = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    img.src = url;
    await loaded;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const webpBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.92));
    if (!webpBlob) throw new Error('WebP not supported here');
    const dlUrl = URL.createObjectURL(webpBlob);
    try {
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setTimeout(() => URL.revokeObjectURL(dlUrl), 4000);
    }
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    return true;
  } catch {
    return false;
  } finally {
    ta.remove();
  }
}

export async function shareMix({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
    }
  }
  await copyText(url);
  return 'copied';
}
