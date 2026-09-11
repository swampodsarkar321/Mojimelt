import FavoritesGrid from '../components/Favorites.jsx';
import { Heart } from 'lucide-react';

export default function FavoritesPage({ favorites, onRemove }) {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-6 pb-4 sm:px-6 sm:pt-10">
      <p className="flex items-center justify-center gap-2 text-center text-xs font-extrabold tracking-[0.25em] text-rose-600 uppercase dark:text-rose-300">
        <Heart size={14} aria-hidden /> Your collection
      </p>
      <h1 className="font-display mt-1 text-center text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
        Favorites
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500 sm:text-base dark:text-slate-400">
        Everything you heart is stored privately in this browser — no account, no cloud.
      </p>
      <div className="mt-6">
        <FavoritesGrid favorites={favorites} onRemove={onRemove} />
      </div>
    </main>
  );
}
