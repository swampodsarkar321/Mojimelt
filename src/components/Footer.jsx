import { Link } from 'react-router-dom';
import { Code2, Heart } from 'lucide-react';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <p className="flex items-center gap-2">
              <Logo markSize={36} />
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              Melt it. Mix it. Share it.
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              Made with <Heart size={12} className="text-rose-500" aria-hidden /> and 100% original artwork
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm font-bold sm:grid-cols-3" aria-label="Footer">
            <Link to="/" className="text-slate-600 hover:text-violet-600 dark:text-slate-300">Home</Link>
            <Link to="/mixer" className="text-slate-600 hover:text-violet-600 dark:text-slate-300">Mixer</Link>
            <Link to="/community" className="text-slate-600 hover:text-violet-600 dark:text-slate-300">Top 10</Link>            <Link to="/favorites" className="text-slate-600 hover:text-violet-600 dark:text-slate-300">Favorites</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-violet-600 dark:text-slate-300">Privacy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-violet-600 dark:text-slate-300">Terms</Link>
          </nav>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:scale-105 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
          >
            <Code2 size={16} aria-hidden /> GitHub
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200/70 pt-6 text-xs font-medium text-slate-400 sm:flex-row dark:border-white/10 dark:text-slate-500">
          <p>© 2026 Mojimelt. All rights reserved.</p>
          <p>All emoji artwork on this site is original — not affiliated with Google or Emoji Kitchen.</p>
        </div>
      </div>
    </footer>
  );
}
