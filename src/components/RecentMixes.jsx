import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowRight } from 'lucide-react';
import { getRecents } from '../utils/storage.js';
import { mixEmojis } from '../utils/mixer.js';
import EmojiArt from './EmojiArt.jsx';

export default function RecentMixes({ refreshKey = 0 }) {
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    setRecents(getRecents());
  }, [refreshKey]);

  if (recents.length === 0) return null;

  return (
    <section aria-labelledby="recent-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
          <History size={18} aria-hidden />
        </span>
        <h2 id="recent-heading" className="font-display text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          Recently Mixed
        </h2>
      </div>
      <div className="nice-scroll mt-4 flex gap-3 overflow-x-auto pb-2">
        {recents.map((r) => {
          const mix = mixEmojis(r.a, r.b);
          if (!mix) return null;
          return (
            <Link
              key={r.id + r.mixedAt}
              to={`/mix?emoji1=${encodeURIComponent(r.a)}&emoji2=${encodeURIComponent(r.b)}`}
              className="group flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200/70 bg-white py-2 pr-4 pl-2 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.06]"
              aria-label={`Remix ${r.a} and ${r.b}: ${mix.title}`}
            >
              <span className="rounded-xl bg-gradient-to-br from-violet-50 to-amber-50 p-1 dark:from-white/10 dark:to-white/5">
                <EmojiArt spec={mix.spec} size={52} title={mix.title} />
              </span>
              <span>
                <span className="block text-base font-black text-slate-800 dark:text-white" aria-hidden>
                  {r.a} + {r.b}
                </span>
                <span className="block max-w-[10rem] truncate text-xs font-bold text-slate-500 dark:text-slate-400">
                  {mix.title}
                </span>
              </span>
              <ArrowRight size={15} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-500" aria-hidden />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
