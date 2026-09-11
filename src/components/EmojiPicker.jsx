import { useMemo, useState } from 'react';
import { Search, Clock } from 'lucide-react';
import { EMOJI_CATEGORIES, EMOJIS, emojisByCategory, searchEmojis } from '../data/emojiData.js';
import { getRecentEmojis } from '../utils/storage.js';

export default function EmojiPicker({ activeSlot, onPick, selectedA, selectedB }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('smileys');
  const [recentTick, setRecentTick] = useState(0);

  const recentChars = useMemo(() => (recentTick >= 0 ? getRecentEmojis() : []), [recentTick]);
  const recentEmojis = useMemo(
    () => recentChars.map((c) => EMOJIS.find((e) => e.char === c)).filter(Boolean),
    [recentChars]
  );

  const results = useMemo(() => {
    if (query.trim()) return searchEmojis(query);
    if (tab === 'recent') return recentEmojis;
    return emojisByCategory(tab);
  }, [query, tab, recentEmojis]);

  const handlePick = (char) => {
    onPick(char);
    setRecentTick((t) => t + 1);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="border-b border-slate-100 p-4 dark:border-white/10">
        <label className="relative block">
          <Search size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emojis… try “cat”, “fire”, “love”"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:bg-black/50"
            aria-label="Search emojis"
          />
        </label>
        <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400" role="status">
          {activeSlot === 1 ? 'Picking for' : 'Picking for'}{' '}
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-700 dark:bg-violet-500/25 dark:text-violet-100">
            Emoji {activeSlot}
          </span>{' '}
          · tap any emoji to place it
        </p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto px-4 py-3 nice-scroll" role="tablist" aria-label="Emoji categories">
        {EMOJI_CATEGORIES.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={tab === c.id && !query}
            type="button"
            onClick={() => { setTab(c.id); setQuery(''); }}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold whitespace-nowrap transition ${
              tab === c.id && !query
                ? 'bg-slate-900 text-white shadow dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15'
            }`}
          >
            {c.id === 'recent' && <Clock size={13} aria-hidden />}
            {c.label}
          </button>
        ))}
      </div>

      <div
        className="nice-scroll grid max-h-[320px] grid-cols-6 gap-1 overflow-y-auto p-3 sm:grid-cols-8"
        role="grid"
        aria-label={query ? `Results for ${query}` : `${tab} emojis`}
      >
        {results.length === 0 && (
          <div className="col-span-full rounded-2xl bg-slate-50 px-4 py-10 text-center dark:bg-white/5">
            <p className="text-3xl" aria-hidden>🫗</p>
            <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">
              {tab === 'recent' ? 'No recent emojis yet — tap something tasty below.' : `No emojis found for “${query}”.`}
            </p>
          </div>
        )}
        {results.map((e) => {
          const isSel = e.char === selectedA || e.char === selectedB;
          return (
            <button
              key={e.char}
              type="button"
              role="gridcell"
              title={`${e.name} ${e.char}`}
              aria-label={`Select ${e.name}`}
              onClick={() => handlePick(e.char)}
              className={`emoji-btn grid aspect-square place-items-center rounded-2xl text-2xl sm:text-[1.7rem] ${
                isSel
                  ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30'
                  : 'bg-transparent hover:bg-violet-50 dark:hover:bg-white/10'
              }`}
            >
              <span aria-hidden>{e.char}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
