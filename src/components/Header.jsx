import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Code2, Dices, Smartphone } from 'lucide-react';
import Logo from './Logo.jsx';
import { randomEmoji } from '../data/emojiData.js';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/mixer', label: 'Emoji Mixer' },
  { to: '/community', label: 'Top 10' },
  { to: '/favorites', label: 'Favorites' },
];

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [installEvt, setInstallEvt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [iosHint, setIosHint] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const mq = window.matchMedia('(display-mode: standalone)');
      const check = () => setInstalled(mq.matches || window.navigator.standalone === true);
      check();
      mq.addEventListener?.('change', check);
      const onPrompt = (e) => {
        e.preventDefault();
        setInstallEvt(e);
      };
      const onInstalled = () => {
        setInstalled(true);
        setInstallEvt(null);
      };
      window.addEventListener('beforeinstallprompt', onPrompt);
      window.addEventListener('appinstalled', onInstalled);
      return () => {
        mq.removeEventListener?.('change', check);
        window.removeEventListener('beforeinstallprompt', onPrompt);
        window.removeEventListener('appinstalled', onInstalled);
      };
    } catch {
      return undefined;
    }
  }, []);

  const isIos = (() => {
    try {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
    } catch {
      return false;
    }
  })();
  const showInstall = !installed && (installEvt || isIos);

  const onInstall = async () => {
    if (installEvt) {
      installEvt.prompt();
      try {
        await installEvt.userChoice;
      } catch {
        /* ignore */
      }
      setInstallEvt(null);
    } else {
      setIosHint((v) => !v);
    }
  };

  const surprise = () => {
    const a = randomEmoji();
    let b = randomEmoji([a.char]);
    navigate(`/mix?emoji1=${encodeURIComponent(a.char)}&emoji2=${encodeURIComponent(b.char)}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-violet-100/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b14]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Mojimelt home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={surprise}
            className="hidden items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:scale-[1.03] active:scale-95 dark:bg-white dark:text-slate-900 sm:inline-flex"
            aria-label="Random mix"
          >
            <Dices size={16} aria-hidden /> Surprise
          </button>
          {showInstall && (
            <span className="relative">
              <button
                type="button"
                onClick={onInstall}
                className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-105 active:scale-95"
                aria-label="Install Mojimelt app on your device"
                aria-expanded={iosHint}
              >
                <Smartphone size={18} aria-hidden />
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
                </span>
              </button>
              {iosHint && !installEvt && (
                <span className="absolute top-12 right-0 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-600 shadow-2xl dark:border-white/10 dark:bg-[#1b1b2b] dark:text-slate-300">
                  iPhone-e install korte: Safari-r <strong>Share ⬆️</strong> → <strong>Add to Home Screen</strong> chap dao 📲
                </span>
              )}
            </span>
          )}
          <button
            type="button"
            onClick={onToggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:scale-105 hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-amber-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:scale-105 hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            aria-label="Mojimelt on GitHub"
          >
            <Code2 size={18} />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#0b0b14]/95" aria-label="Mobile">
          <div className="grid gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-base font-bold transition ${
                    isActive
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={surprise}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-base font-bold text-white dark:bg-white dark:text-slate-900"
            >
              <Dices size={18} aria-hidden /> Surprise me
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
