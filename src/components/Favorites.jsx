import { Link } from 'react-router-dom';
import { Heart, Download, Trash2, Shuffle, HeartCrack } from 'lucide-react';
import { useRef, useState } from 'react';
import { mixEmojis } from '../utils/mixer.js';
import EmojiArt from './EmojiArt.jsx';
import { downloadSvgAsPng } from '../utils/download.js';

function FavCard({ fav, onRemove }) {
  const mix = mixEmojis(fav.a, fav.b);
  const svgHolder = useRef(null);
  const [busy, setBusy] = useState(false);

  if (!mix) return null;

  const onDownload = async () => {
    const svg = svgHolder.current?.querySelector('svg');
    if (!svg) return;
    setBusy(true);
    try {
      await downloadSvgAsPng(svg, `mojimelt-${fav.id.replace('+', '-')}.png`, 1024);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="group rounded-3xl border border-slate-200/70 bg-white p-4 shadow-lg shadow-rose-500/5 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]">
      <div ref={svgHolder} className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-3 dark:from-white/10 dark:to-white/5">
        <EmojiArt spec={mix.spec} size={110} title={mix.title} />
      </div>
      <p className="mt-3 text-center text-lg font-black text-slate-800 dark:text-white" aria-hidden>
        {fav.a} <span className="text-rose-500">+</span> {fav.b}
      </p>
      <p className="truncate text-center text-sm font-extrabold text-slate-500 dark:text-slate-300">{fav.title || mix.title}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Link
          to={`/mix?emoji1=${encodeURIComponent(fav.a)}&emoji2=${encodeURIComponent(fav.b)}`}
          className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-2 py-2 text-xs font-extrabold text-white transition hover:scale-105 dark:bg-white dark:text-slate-900"
          aria-label={`Remix ${fav.a} and ${fav.b}`}
        >
          <Shuffle size={13} aria-hidden /> Remix
        </Link>
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-extrabold text-slate-600 transition hover:scale-105 disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
          aria-label={`Download ${mix.title} as PNG`}
        >
          <Download size={13} aria-hidden /> {busy ? '…' : 'PNG'}
        </button>
        <button
          type="button"
          onClick={() => onRemove(fav.id)}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2 py-2 text-xs font-extrabold text-rose-600 transition hover:scale-105 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
          aria-label={`Remove ${fav.a} plus ${fav.b} from favorites`}
        >
          <Trash2 size={13} aria-hidden /> Remove
        </button>
      </div>
    </article>
  );
}

export default function FavoritesGrid({ favorites, onRemove }) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-[2rem] border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center dark:border-white/15 dark:bg-white/5">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 text-rose-500 dark:from-rose-500/20 dark:to-pink-500/20 dark:text-rose-300">
          <HeartCrack size={30} aria-hidden />
        </span>
        <h2 className="font-display mt-4 text-2xl font-black text-slate-900 dark:text-white">No favorites yet</h2>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          Start mixing something awesome!
        </p>
        <Link
          to="/mixer"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:scale-105"
        >
          <Heart size={16} aria-hidden /> Start mixing
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {favorites.map((f) => (
        <FavCard key={f.id} fav={f} onRemove={onRemove} />
      ))}
    </div>
  );
}
