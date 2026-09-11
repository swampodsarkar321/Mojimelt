import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Shuffle, Wand2, Loader2, ArrowLeftRight } from 'lucide-react';
import { getEmoji, randomEmoji } from '../data/emojiData.js';
import { pushRecentEmoji } from '../utils/storage.js';
import EmojiPicker from './EmojiPicker.jsx';
import { mixEmojis, mixId, shareUrl } from '../utils/mixer.js';
import { pushRecent } from '../utils/storage.js';
import ResultCard from './ResultCard.jsx';

export default function Mixer({ initialA = '😂', initialB = '🔥', onMixChange }) {
  const [emojiA, setEmojiA] = useState(initialA);
  const [emojiB, setEmojiB] = useState(initialB);
  const [activeSlot, setActiveSlot] = useState(1);
  const [mixing, setMixing] = useState(false);
  const [result, setResult] = useState(null);
  const [pulse, setPulse] = useState(0);
  const timer = useRef(null);

  const doMix = useCallback((a, b, opts = {}) => {
    const mix = mixEmojis(a, b);
    if (!mix) return;
    const id = mixId(a, b);
    pushRecent({ id, a, b, title: mix.title });
    pushRecentEmoji(a);
    pushRecentEmoji(b);
    setResult(mix);
    onMixChange?.(mix);
    if (!opts.silent) {
      try {
        const url = new URL(window.location.origin + '/mix');
        url.searchParams.set('emoji1', a);
        url.searchParams.set('emoji2', b);
        window.history.replaceState(null, '', url.toString());
      } catch { /* ignore */ }
    }
  }, [onMixChange]);

  // initial mix on mount / when deep-linked
  useEffect(() => {
    doMix(emojiA, emojiB, { silent: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const scheduleMix = useCallback((a, b, delay = 600) => {
    setMixing(true);
    setPulse((p) => p + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      doMix(a, b);
      setMixing(false);
    }, delay);
  }, [doMix]);

  // live auto-mix: any selection/swap change re-mixes after a short pause
  const firstChange = useRef(true);
  useEffect(() => {
    if (firstChange.current) {
      firstChange.current = false;
      return;
    }
    scheduleMix(emojiA, emojiB, 700);
  }, [emojiA, emojiB, scheduleMix]);

  const handleMixClick = () => {
    scheduleMix(emojiA, emojiB, 650);
  };

  const handleRandom = () => {
    const a = randomEmoji().char;
    const b = randomEmoji([a]).char;
    setEmojiA(a);
    setEmojiB(b);
    scheduleMix(a, b, 550);
  };

  const handlePick = (char) => {
    if (activeSlot === 1) {
      setEmojiA(char);
      setActiveSlot(2);
    } else {
      setEmojiB(char);
      setActiveSlot(1);
    }
    pushRecentEmoji(char);
  };

  const swap = () => {
    setEmojiA(emojiB);
    setEmojiB(emojiA);
  };

  const metaA = getEmoji(emojiA);
  const metaB = getEmoji(emojiB);

  const shareHref = useMemo(() => {
    try { return shareUrl(emojiA, emojiB); } catch { return ''; }
  }, [emojiA, emojiB]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:items-start">
      {/* Mixer card */}
      <section
        aria-labelledby="mixer-heading"
        className="glass rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-2xl shadow-violet-500/15 sm:p-7 dark:border-white/10 dark:bg-white/[0.07]"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id="mixer-heading" className="font-display text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
            Emoji Mixer
          </h2>
          <button
            type="button"
            onClick={swap}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-600 transition hover:rotate-180 hover:border-violet-300 hover:text-violet-600 active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            aria-label="Swap emojis"
            style={{ transition: 'transform .3s' }}
          >
            <ArrowLeftRight size={14} aria-hidden /> Swap
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveSlot(1)}
            aria-label={`Select emoji 1, currently ${metaA?.name}`}
            aria-pressed={activeSlot === 1}
            className={`group rounded-3xl border-2 p-4 text-center transition sm:p-6 ${
              activeSlot === 1
                ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/20 dark:bg-violet-500/15'
                : 'border-slate-200 bg-white hover:border-violet-300 dark:border-white/10 dark:bg-white/5'
            }`}
          >
            <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase dark:text-slate-400">Emoji 1</span>
            <span key={`a-${emojiA}-${pulse}`} className="animate-pop-in mx-auto mt-1 block text-6xl sm:text-7xl" aria-hidden>
              {emojiA}
            </span>
            <span className="mt-2 block truncate text-xs font-bold text-slate-500 dark:text-slate-300">{metaA?.name}</span>
          </button>

          <div className="grid place-items-center" aria-hidden>
            <span className="font-display grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl font-black text-white shadow-lg shadow-fuchsia-500/40">+</span>
          </div>

          <button
            type="button"
            onClick={() => setActiveSlot(2)}
            aria-label={`Select emoji 2, currently ${metaB?.name}`}
            aria-pressed={activeSlot === 2}
            className={`group rounded-3xl border-2 p-4 text-center transition sm:p-6 ${
              activeSlot === 2
                ? 'border-fuchsia-500 bg-fuchsia-50 shadow-lg shadow-fuchsia-500/20 dark:bg-fuchsia-500/15'
                : 'border-slate-200 bg-white hover:border-fuchsia-300 dark:border-white/10 dark:bg-white/5'
            }`}
          >
            <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase dark:text-slate-400">Emoji 2</span>
            <span key={`b-${emojiB}-${pulse}`} className="animate-pop-in mx-auto mt-1 block text-6xl sm:text-7xl" aria-hidden>
              {emojiB}
            </span>
            <span className="mt-2 block truncate text-xs font-bold text-slate-500 dark:text-slate-300">{metaB?.name}</span>
          </button>
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={handleMixClick}
            disabled={mixing}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-fuchsia-500/30 transition hover:scale-[1.02] active:scale-95 disabled:cursor-wait disabled:opacity-80"
          >
            {mixing ? <Loader2 size={20} className="animate-spin" aria-hidden /> : <Wand2 size={20} aria-hidden />}
            {mixing ? 'Mixing…' : 'Mix Emojis'}
          </button>
          <button
            type="button"
            onClick={handleRandom}
            disabled={mixing}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-800 transition hover:scale-[1.02] hover:border-violet-300 active:scale-95 disabled:opacity-70 dark:border-white/15 dark:bg-white/10 dark:text-white"
          >
            <Shuffle size={18} aria-hidden /> Random
          </button>
        </div>

        <div className="mt-5">
          <EmojiPicker activeSlot={activeSlot} onPick={handlePick} selectedA={emojiA} selectedB={emojiB} />
        </div>
      </section>

      {/* Result */}
      <div className="lg:sticky lg:top-24">
        {result && <ResultCard mix={result} shareHref={shareHref} mixing={mixing} onRemix={handleRandom} />}
      </div>
    </div>
  );
}
