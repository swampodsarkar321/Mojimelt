import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Download, Share2, Loader2, Gift, Shirt } from 'lucide-react';
import { MOCKUP_PRODUCTS, TEE_COLORS, DAILY_FREE, SHARE_BONUS, getQuota, useMockupSlot, grantShareBonus, renderMockup, canvasToBlob } from '../utils/mockups.js';
import { copyText, shareMix } from '../utils/download.js';
import { shareUrl } from '../utils/mixer.js';

export default function MockupStudio({ mix, svgRef, onClose, onToast }) {
  const [product, setProduct] = useState('tee');
  const [teeColor, setTeeColor] = useState('white');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [quota, setQuota] = useState(() => getQuota());
  const canvasRef = useRef(null);
  const closeRef = useRef(null);
  const renderToken = useRef(0);

  const draw = useCallback(async () => {
    const myToken = ++renderToken.current;
    setLoading(true);
    try {
      const canvas = await renderMockup(svgRef.current, product, teeColor);
      if (renderToken.current !== myToken) return; // superseded
      canvasRef.current = canvas;
      setPreview(canvas.toDataURL('image/png'));
    } catch {
      onToast?.('Mockup failed — try again.');
    } finally {
      if (renderToken.current === myToken) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, teeColor]);

  useEffect(() => {
    draw();
  }, [draw]);

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

  const needSlot = () => {
    if (useMockupSlot()) {
      setQuota(getQuota());
      return true;
    }
    return false;
  };

  const onDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas || busy) return;
    if (!needSlot()) {
      onToast?.('Daily free limit over — share for bonus or come back tomorrow!');
      return;
    }
    setBusy(true);
    try {
      const blob = await canvasToBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mojimelt-${product}-mockup.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      onToast?.('Mockup downloaded — print it anywhere!');
    } finally {
      setBusy(false);
    }
  };

  const onBonusShare = async () => {
    const link = shareUrl(mix.a, mix.b);
    const res = await shareMix({
      title: `Mojimelt: ${mix.title}`,
      text: `${mix.a} + ${mix.b} = ${mix.title}! Make your own:`,
      url: link,
    });
    if (res === 'shared' || res === 'copied') {
      setQuota(grantShareBonus());
      onToast?.(`+${SHARE_BONUS} bonus mockups earned!`);
    } else {
      await copyText(link);
      setQuota(grantShareBonus());
      onToast?.(`Link copied +${SHARE_BONUS} bonus mockups earned!`);
    }
  };

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
        aria-label="Mockup studio"
        className="animate-pop-in w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-[#151524]"
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <div>
            <h2 className="font-display flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
              <Shirt size={20} aria-hidden /> Mockup Studio
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="font-black text-violet-600 dark:text-violet-300">{quota.left} free left today</span>
              {' '}· resets midnight · download &amp; print anywhere
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close mockup studio"
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
                <span className="sr-only">Building mockup preview…</span>
              </div>
            ) : (
              <img src={preview} alt={`${mix.title} on a ${product}`} className="aspect-square w-full object-cover" />
            )}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Mockup product">
            {MOCKUP_PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={product === p.id}
                onClick={() => setProduct(p.id)}
                className={`rounded-2xl border-2 px-2 py-2.5 text-xs font-extrabold transition hover:scale-105 active:scale-95 ${
                  product === p.id
                    ? 'border-violet-500 bg-violet-50 text-violet-700 shadow dark:bg-violet-500/15 dark:text-violet-200'
                    : 'border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {product === 'tee' && (
            <div className="mt-2 flex items-center gap-2" role="radiogroup" aria-label="T-shirt color">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Color:</span>
              {TEE_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={teeColor === c.id}
                  aria-label={`${c.name} t-shirt`}
                  title={c.name}
                  onClick={() => setTeeColor(c.id)}
                  className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${
                    teeColor === c.id ? 'border-violet-500 shadow-lg' : 'border-slate-300 dark:border-white/20'
                  }`}
                  style={{ background: c.main }}
                />
              ))}
            </div>
          )}
        </div>

        {quota.left <= 0 ? (
          <div className="p-5">
            <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-center dark:border-amber-500/30 dark:bg-amber-500/10">
              <p className="text-sm font-extrabold text-amber-700 dark:text-amber-200">
                Today's free mockups over! 🎁
              </p>
              <p className="mt-0.5 text-xs font-medium text-amber-600 dark:text-amber-300">
                Share Mojimelt for +{SHARE_BONUS} bonus — or come back tomorrow.
              </p>
              <button
                type="button"
                onClick={onBonusShare}
                className="mt-3 inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-extrabold text-white shadow transition hover:scale-105 active:scale-95"
              >
                <Gift size={14} aria-hidden /> Share +{SHARE_BONUS} bonus
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 p-5">
            <button
              type="button"
              onClick={onDownload}
              disabled={!preview || busy}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-slate-900 px-2 py-3 text-xs font-extrabold text-white transition hover:scale-[1.03] active:scale-95 disabled:opacity-60 dark:bg-white dark:text-slate-900"
            >
              {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Download size={15} aria-hidden />}
              Download (1)
            </button>
            <button
              type="button"
              onClick={onBonusShare}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2 py-3 text-xs font-extrabold text-white transition hover:scale-[1.03] active:scale-95"
            >
              <Share2 size={15} aria-hidden /> Share +{SHARE_BONUS}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
