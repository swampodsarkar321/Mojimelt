import { useEffect } from 'react';
import { useState } from 'react';
import { X, Trophy } from 'lucide-react';
import EmojiArt from './EmojiArt.jsx';
import { addPost } from '../utils/community.js';

export default function PostToCommunity({ mix, onClose, onPosted }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const post = await addPost({ a: mix.a, b: mix.b });
      onPosted?.(post);
    } catch {
      setError('Posting failed — check your internet and try again.');
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Post mix to community top 10"
        className="animate-pop-in relative w-full max-w-sm rounded-[2rem] bg-white p-6 text-center shadow-2xl dark:bg-[#151524]"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-orange-500/30">
          <Trophy size={26} aria-hidden />
        </span>
        <h2 className="font-display mt-3 text-2xl font-black text-slate-900 dark:text-white">
          Post to Top 10?
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          Only your emoji mix gets posted — no text, no name. Pure emoji!
        </p>

        <div className="mx-auto mt-3 w-fit rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-3 dark:from-white/10 dark:to-white/5">
          <EmojiArt spec={mix.spec} size={130} title={`${mix.title} (${mix.a} plus ${mix.b})`} />
        </div>
        <p className="mt-2 text-lg font-black text-slate-800 dark:text-white" aria-hidden>
          {mix.a} + {mix.b}
        </p>
        {error && (
          <p role="alert" className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-600 transition hover:scale-[1.02] active:scale-95 dark:border-white/15 dark:bg-white/10 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            autoFocus
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            <Trophy size={15} aria-hidden /> Post it!
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
