import { NavLink } from 'react-router-dom';
import { Home, Shuffle, Trophy, Heart } from 'lucide-react';

export default function BottomNav() {
  const cls = ({ isActive }) =>
    `flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-2 text-[10px] font-extrabold transition ${
      isActive ? 'text-violet-600 dark:text-violet-300' : 'text-slate-400 dark:text-slate-500'
    }`;
  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-slate-200/70 bg-white/90 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#12121c]/90"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-1 p-1.5">
        <NavLink to="/" className={cls} aria-label="Home">
          <Home size={20} aria-hidden /> Home
        </NavLink>
        <NavLink to="/mixer" className={cls} aria-label="Mixer">
          <Shuffle size={20} aria-hidden /> Mix
        </NavLink>
        <NavLink to="/community" className={cls} aria-label="Top 10">
          <Trophy size={20} aria-hidden /> Top 10
        </NavLink>
        <NavLink to="/favorites" className={cls} aria-label="Favorites">
          <Heart size={20} aria-hidden /> Saved
        </NavLink>
      </div>
    </nav>
  );
}
