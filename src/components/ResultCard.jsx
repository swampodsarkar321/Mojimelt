import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Heart, Dices, Check, ClipboardCopy, Newspaper, Trophy, FlaskConical, Film, ChevronDown, Image as ImageIcon } from 'lucide-react';
import EmojiArt from './EmojiArt.jsx';
import ShareButtons from './ShareButtons.jsx';
import PostStudio from './PostStudio.jsx';
import PostToCommunity from './PostToCommunity.jsx';
import { mixId } from '../utils/mixer.js';
import { downloadSvgAsPng, copyImageToClipboard } from '../utils/download.js';
import { downloadMixGif } from '../utils/gif.js';
import { isFavorite, toggleFavorite } from '../utils/storage.js';

function prettyTrait(value) {
  return String(value)
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function ResultCard({ mix, shareHref, mixing, onRemix }) {
  const svgRef = useRef(null);
  const [fav, setFav] = useState(false);
  const [toast, setToast] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);
  const [dlOpen, setDlOpen] = useState(false);
  const dlRef = useRef(null);
  const [showPost, setShowPost] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const toastTimer = useRef(null);
  const navigate = useNavigate();

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!dlOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setDlOpen(false);
    };
    const onClick = (e) => {
      if (dlRef.current && !dlRef.current.contains(e.target)) setDlOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [dlOpen]);

  useEffect(() => {
    setFav(isFavorite(mix.a, mix.b));
  }, [mix.a, mix.b]);

  const filename = `mojimelt-${mix.a.codePointAt(0).toString(16)}-${mix.b.codePointAt(0).toString(16)}.png`;

  const onDownload = async () => {
    if (!svgRef.current) return;
    setDownloading(true);
    try {
      await downloadSvgAsPng(svgRef.current, filename, 1024);
      flash('PNG downloaded — transparent background!');
    } catch {
      flash('Export failed — try again.');
    } finally {
      setDownloading(false);
    }
  };

  const onCopyEmoji = async () => {
    if (!svgRef.current || copying) return;
    setCopying(true);
    try {
      const ok = await copyImageToClipboard(svgRef.current, 1024);
      if (ok) {
        setCopied(true);
        flash('Emoji copied — paste it in WhatsApp, Messenger, anywhere!');
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Clipboard image copy blocked → download instead so user still gets the file
        await downloadSvgAsPng(svgRef.current, filename, 1024);
        flash('Direct copy blocked here — PNG downloaded instead!');
      }
    } catch {
      flash('Copy failed — use Download PNG.');
    } finally {
      setCopying(false);
    }
  };

  const onGif = async () => {
    if (!svgRef.current || gifProgress > 0) return;
    setGifProgress(1);
    try {
      const gifName = filename.replace(/\.png$/, '.gif');
      await downloadMixGif(svgRef.current, gifName, { onProgress: setGifProgress });
      flash('GIF downloaded — send the moving emoji anywhere!');
    } catch {
      flash('GIF failed — try Download PNG.');
    } finally {
      setGifProgress(0);
    }
  };

  const onFav = () => {
    const id = mixId(mix.a, mix.b);
    toggleFavorite({ id, a: mix.a, b: mix.b, title: mix.title });
    setFav((v) => !v);
    if (!fav) flash('Saved to favorites!');
  };

  return (
    <section
      aria-labelledby="result-heading"
      aria-live="polite"
      className="glass relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-2xl shadow-fuchsia-500/15 sm:p-7 dark:border-white/10 dark:bg-white/[0.07]"
    >
      <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-fuchsia-400/30 to-amber-300/30 blur-3xl" />
      <p className="text-xs font-extrabold tracking-[0.2em] text-fuchsia-600 uppercase dark:text-fuchsia-300">Your Mix</p>
      <h2 id="result-heading" className="font-display mt-1 text-3xl font-black text-slate-900 dark:text-white">
        {mix.title}
      </h2>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">
        <span aria-hidden>{mix.a} + {mix.b}</span>
        <span className="sr-only">{mix.nameA} plus {mix.nameB}</span>
        {' · '}{mix.blurb}
      </p>

      <div className="relative mx-auto mt-4 w-fit">
        <div
          className={`rounded-[2rem] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-100 p-6 sm:p-8 dark:from-violet-950/60 dark:via-fuchsia-950/40 dark:to-amber-950/30 ${mixing ? 'animate-pulse' : ''}`}
        >
          <div key={`${mix.a}-${mix.b}`} className={mixing ? '' : 'animate-pop-in'}>
            <EmojiArt spec={mix.spec} size={220} title={`${mix.title} — original Mojimelt artwork`} svgRef={svgRef} />
          </div>
        </div>
        {mix.curated && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3.5 py-1 text-[11px] font-black tracking-wide text-white uppercase shadow-lg dark:bg-white dark:text-slate-900">
            ★ Curated mix
          </span>
        )}
      </div>

      {toast && (
        <p role="status" className="animate-pop-in mx-auto mt-4 flex w-fit items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-lg dark:bg-white dark:text-slate-900">
          <Check size={14} aria-hidden /> {toast}
        </p>
      )}

      {mix.recipe && mix.recipe.length > 0 && (
        <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-3 dark:border-white/10 dark:bg-white/5">
          <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-violet-600 uppercase dark:text-violet-300">
            <FlaskConical size={13} aria-hidden /> Mix recipe — what came from where
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Mix recipe">
            {mix.recipe.slice(0, 8).map((r, i) => (
              <li
                key={`${r.group}-${r.value}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-slate-600 shadow-sm dark:bg-black/30 dark:text-slate-200"
                title={`${r.group}: ${prettyTrait(r.value)} — from ${r.from === 'A' ? mix.nameA : r.from === 'B' ? mix.nameB : r.from === 'both' ? 'both emojis' : 'fusion'}`}
              >
                <span className="text-slate-400 dark:text-slate-500">{r.group}</span>
                <span>{prettyTrait(r.value)}</span>
                <span aria-hidden className="text-sm leading-none">
                  {r.from === 'A' ? mix.a : r.from === 'B' ? mix.b : r.from === 'both' ? `${mix.a}${mix.b}` : '🌀'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowCommunity(true)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02] active:scale-95"
      >
        <Trophy size={16} aria-hidden /> 📣 Post to Community Top 10
      </button>

      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onCopyEmoji}
          disabled={copying}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-fuchsia-500/30 transition hover:scale-[1.02] active:scale-95 disabled:opacity-70"
        >
          {copied ? <Check size={17} aria-hidden /> : <ClipboardCopy size={17} aria-hidden />}
          {copying ? 'Copying…' : copied ? 'Copied!' : 'Copy Emoji'}
        </button>
        <div className="relative" ref={dlRef}>
          <button
            type="button"
            onClick={() => setDlOpen((v) => !v)}
            disabled={downloading || gifProgress > 0}
            aria-haspopup="menu"
            aria-expanded={dlOpen}
            aria-label="Download options"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-extrabold text-white transition hover:scale-[1.02] active:scale-95 disabled:opacity-70 dark:bg-white dark:text-slate-900"
          >
            <Download size={17} aria-hidden />
            {gifProgress > 0 ? `GIF ${gifProgress}%` : downloading ? 'Saving…' : 'Download'}
            <ChevronDown size={16} aria-hidden className={`transition-transform ${dlOpen ? 'rotate-180' : ''}`} />
          </button>
          {dlOpen && (
            <div
              role="menu"
              aria-label="Download format"
              className="animate-pop-in absolute bottom-full left-0 z-20 mb-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-[#1b1b2b]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setDlOpen(false);
                  onDownload();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-50 dark:hover:bg-white/10"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  <ImageIcon size={18} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-slate-800 dark:text-white">PNG Image</span>
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Transparent background</span>
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setDlOpen(false);
                  onGif();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-50 dark:hover:bg-white/10"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                  <Film size={18} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-slate-800 dark:text-white">GIF Animation</span>
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Moving bouncing emoji</span>
                </span>
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onFav}
          aria-pressed={fav}
          className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-extrabold transition hover:scale-[1.02] active:scale-95 ${
            fav
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
              : 'border-2 border-slate-200 bg-white text-slate-700 hover:border-rose-300 dark:border-white/15 dark:bg-white/10 dark:text-white'
          } ${!fav ? '' : 'animate-heart-pop'}`}
        >
          <Heart size={17} fill={fav ? 'currentColor' : 'none'} aria-hidden />
          {fav ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-black/20">
        <ShareButtons mix={mix} shareHref={shareHref} onToast={flash} />
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setShowPost(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02] active:scale-95"
        >
          <Newspaper size={16} aria-hidden /> Create Post
        </button>
        <button
          type="button"
          onClick={onRemix}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02] active:scale-95"
        >
          <Dices size={16} aria-hidden /> Mix Again
        </button>
      </div>
      {showPost && (
        <PostStudio mix={mix} svgRef={svgRef} onClose={() => setShowPost(false)} onToast={flash} />
      )}
      {showCommunity && (
        <PostToCommunity
          mix={mix}
          onClose={() => setShowCommunity(false)}
          onPosted={() => {
            setShowCommunity(false);
            navigate('/community');
          }}
        />
      )}
    </section>
  );
}
