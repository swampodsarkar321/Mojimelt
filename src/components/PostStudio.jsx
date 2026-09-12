import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Download, ClipboardCopy, Share2, Check, Loader2 } from 'lucide-react';
import { POST_THEMES, loadMixImage, renderPostCard, canvasToBlob } from '../utils/postcard.js';
import { copyImageToClipboard } from '../utils/download.js';

export default function PostStudio({ mix, svgRef, onClose, onToast }) {
  const [mixImg, setMixImg] = useState(null);
  const [themeId, setThemeId] = useState('sunset');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const canvasRef = useRef(null);
  const closeRef = useRef(null);

  const theme = POST_THEMES.find((t) => t.id === themeId) || POST_THEMES[0];
  const combo = `${mix.a} + ${mix.b}`;

  // load artwork once
  useEffect(() => {
    let alive = true;
    loadMixImage(svgRef.current, 1024)
      .then((img) => {
        if (alive) {
          setMixImg(img);
          setLoading(false);
        }
      })
      .catch(() => {
        if (alive) setLoading(false);
        onToast?.('Could not build post — try again.');
        onClose?.();
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-render card on theme / image change
  useEffect(() => {
    if (!mixImg) return;
    const canvas = renderPostCard(mixImg, { title: mix.title, combo, theme });
    canvasRef.current = canvas;
    setPreview(canvas.toDataURL('image/png'));
  }, [mixImg, theme, mix.title, combo]);

  // esc to close + focus close button
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const withCanvas = useCallback(
    async (fn) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setBusy(fn);
      try {
        await fn(canvas);
      } finally {
        setBusy('');
      }
    },
    []
  );

  const onDownload = () =>
    withCanvas('download', async (canvas) => {
      const blob = await canvasToBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mojimelt-post.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      onToast?.('Post image downloaded — ready for Instagram & Facebook!');
    });

  const onCopy = () =>
    withCanvas('copy', async (canvas) => {
      const blob = await canvasToBlob(canvas);
      if (!window.ClipboardItem || !navigator.clipboard?.write) {
        onToast?.('Copy not supported here — use Download.');
        return;
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      onToast?.('Post copied — paste it anywhere!');
    });

  const onFbPost = () =>
    withCanvas('fb', async (canvas) => {
      const blob = await canvasToBlob(canvas);
      let copied = false;
      if (window.ClipboardItem && navigator.clipboard?.write) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          copied = true;
        } catch {
          /* fall through to download */
        }
      }
      if (!copied) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mojimelt-post.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
      window.open('https://www.facebook.com/', '_blank', 'noopener');
      onToast?.(
        copied
          ? 'Image copied! Facebook-e giye Ctrl+V (paste) chap dao 📋'
          : 'PNG download holo + Facebook khulechi — chobi attach kore Post dao!'
      );
    });
  const onShare = () =>
    withCanvas('share', async (canvas) => {
      const blob = await canvasToBlob(canvas);
      const file = new File([blob], 'mojimelt-post.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `Mojimelt: ${mix.title}`,
            text: `${combo} = ${mix.title}!`,
          });
          onToast?.('Shared!');
        } catch (err) {
          if (err?.name !== 'AbortError') onToast?.('Share dismissed.');
        }
      } else if (svgRef.current) {
        const ok = await copyImageToClipboard(svgRef.current, 1024).catch(() => false);
        onToast?.(ok ? 'System share unavailable — image copied instead!' : 'System share unavailable — use Download.');
      }
    });

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share as post studio"
        className="animate-pop-in w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-[#151524]"
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <div>
            <h2 className="font-display text-xl font-black text-slate-900 dark:text-white">Share as Post</h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              1080 × 1080 — perfect for Facebook, Instagram &amp; WhatsApp status
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close post studio"
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:scale-105 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-3">
          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
            {loading || !preview ? (
              <div className="grid aspect-square place-items-center bg-slate-100 dark:bg-white/5">
                <Loader2 size={32} className="animate-spin text-violet-500" aria-hidden />
                <span className="sr-only">Building post preview…</span>
              </div>
            ) : (
              <img src={preview} alt={`Post preview: ${mix.title} (${combo})`} className="aspect-square w-full object-cover" />
            )}
          </div>

          <p className="mt-3 text-xs font-extrabold tracking-widest text-slate-400 uppercase">Pick a style</p>
          <div className="mt-1.5 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Post background style">
            {POST_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={themeId === t.id}
                onClick={() => setThemeId(t.id)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-2 transition hover:scale-105 active:scale-95 ${
                  themeId === t.id
                    ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                    : 'border-slate-200 dark:border-white/10'
                }`}
              >
                <span className="h-10 w-full rounded-xl" style={{ background: t.swatch }} aria-hidden />
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-slate-600 dark:text-slate-300">
                  {themeId === t.id && <Check size={12} aria-hidden />}
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-5">
          <button
            type="button"
            onClick={onDownload}
            disabled={!preview || busy}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-slate-900 px-2 py-3 text-xs font-extrabold text-white transition hover:scale-[1.03] active:scale-95 disabled:opacity-60 dark:bg-white dark:text-slate-900"
          >
            {busy === 'download' ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Download size={15} aria-hidden />}
            Post PNG
          </button>
          <button
            type="button"
            onClick={onFbPost}
            disabled={!preview || busy}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#1877F2] px-2 py-3 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#1466d1] active:scale-95 disabled:opacity-60"
          >
            {busy === 'fb' ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <span aria-hidden>📘</span>}
            FB Post
          </button>
          <button
            type="button"
            onClick={onCopy}
            disabled={!preview || busy}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2 py-3 text-xs font-extrabold text-white transition hover:scale-[1.03] active:scale-95 disabled:opacity-60"
          >
            {busy === 'copy' ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <ClipboardCopy size={15} aria-hidden />}
            Copy Post
          </button>
          <button
            type="button"
            onClick={onShare}
            disabled={!preview || busy}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 bg-white px-2 py-3 text-xs font-extrabold text-slate-700 transition hover:scale-[1.03] hover:border-violet-300 active:scale-95 disabled:opacity-60 dark:border-white/15 dark:bg-white/10 dark:text-white"
          >
            {busy === 'share' ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Share2 size={15} aria-hidden />}
            Share…
          </button>
        </div>
      </div>
    </div>
  );
}
