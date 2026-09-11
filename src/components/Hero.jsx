import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Dices, Download, Heart, Share2, Wand2 } from 'lucide-react';
import { useMemo } from 'react';
import { mixEmojis } from '../utils/mixer.js';
import EmojiArt from './EmojiArt.jsx';

const EXAMPLES = [
  { a: '😂', b: '😈' },
  { a: '🔥', b: '👽' },
  { a: '🥶', b: '😎' },
  { a: '🐸', b: '👑' },
];

export default function Hero() {
  const navigate = useNavigate();
  const mixes = useMemo(() => EXAMPLES.map(({ a, b }) => ({ a, b, mix: mixEmojis(a, b) })), []);

  const random = () => {
    navigate('/mixer?random=1');
  };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-300/50 via-fuchsia-300/50 to-amber-200/60 blur-3xl dark:from-violet-900/50 dark:via-fuchsia-900/40 dark:to-amber-900/30" />
        <div className="absolute top-40 -left-20 h-64 w-64 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-900/30" />
        <div className="absolute top-40 -right-20 h-64 w-64 rounded-full bg-pink-200/60 blur-3xl dark:bg-pink-900/30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 text-center sm:px-6 sm:pt-20">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-4 py-1.5 text-xs font-bold tracking-wide text-violet-700 uppercase shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-violet-200">
          <Wand2 size={14} aria-hidden /> 100% original artwork · no copies
        </p>
        <h1 id="hero-heading" className="font-display mx-auto mt-5 max-w-3xl text-4xl leading-[1.05] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          Mix Two Emojis. <br />
          Create Something <span className="text-gradient">Weird.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
          Combine your favorite emojis and create unique, shareable emoji creations.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/mixer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-7 py-3.5 text-base font-extrabold text-white shadow-xl shadow-fuchsia-500/30 transition hover:scale-[1.03] hover:shadow-2xl active:scale-95 sm:w-auto"
          >
            Start Mixing
            <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={random}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white/80 px-7 py-3.5 text-base font-extrabold text-slate-800 backdrop-blur transition hover:scale-[1.03] hover:border-violet-300 hover:bg-white active:scale-95 sm:w-auto dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          >
            <Dices size={19} aria-hidden /> Random Mix
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur dark:bg-white/10"><Download size={13} aria-hidden /> PNG export</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur dark:bg-white/10"><Heart size={13} aria-hidden /> Favorites</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur dark:bg-white/10"><Share2 size={13} aria-hidden /> Shareable links</span>
        </div>

        {/* floating examples */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" role="list" aria-label="Example combinations">
          {mixes.map(({ a, b, mix }, i) => (
            <Link
              key={`${a}${b}`}
              to={`/mix?emoji1=${encodeURIComponent(a)}&emoji2=${encodeURIComponent(b)}`}
              role="listitem"
              className={`group rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl shadow-violet-500/10 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.07] ${i % 2 ? 'animate-float-slow' : 'animate-float'}`}
              style={{ animationDelay: `${i * 0.7}s` }}
              aria-label={`Try ${a} plus ${b}: ${mix?.title}`}
            >
              <div className="mx-auto w-fit transition-transform group-hover:scale-110">
                <EmojiArt spec={mix.spec} size={96} title={mix.title} />
              </div>
              <p className="mt-2 text-lg font-black text-slate-800 dark:text-white" aria-hidden>
                {a} <span className="text-violet-500">+</span> {b}
              </p>
              <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">{mix.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
