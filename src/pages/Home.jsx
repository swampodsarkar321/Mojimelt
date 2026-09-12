import Hero from '../components/Hero.jsx';
import RecentMixes from '../components/RecentMixes.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight, Dices, Heart, Download, Share2, Layers, Shuffle, Sparkles } from 'lucide-react';

const STEPS = [
  { icon: <Shuffle size={20} aria-hidden />, title: '1. Pick two emojis', text: 'Search 70+ emojis across 9 categories, or use your recents.' },
  { icon: <Layers size={20} aria-hidden />, title: '2. We blend the layers', text: 'Eyes, mouths, horns, crowns, fire, frost — fused into original art.' },
  { icon: <Share2 size={20} aria-hidden />, title: '3. Share anywhere', text: 'Download a transparent PNG or send a link that re-creates the mix.' },
];

export default function Home({ recentTick }) {
  return (
    <main className="no-x-scroll">
      <Hero />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mt-4 grid gap-3 rounded-[2rem] border border-slate-200/70 bg-white/70 p-5 shadow-xl backdrop-blur sm:grid-cols-3 sm:p-6 dark:border-white/10 dark:bg-white/[0.06]">
          {STEPS.map((s) => (
            <div key={s.title} className="flex gap-3 rounded-2xl p-2">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg">
                {s.icon}
              </span>
              <span>
                <span className="font-display block font-extrabold text-slate-900 dark:text-white">{s.title}</span>
                <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">{s.text}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 p-6 text-center shadow-2xl shadow-fuchsia-500/30 sm:flex-row sm:p-8 sm:text-left">
          <div>
            <p className="font-display text-2xl font-black text-white sm:text-3xl">Feeling lucky?</p>
            <p className="mt-1 text-sm font-medium text-white/85">One tap. Two random emojis. Zero regrets (probably).</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/mixer?random=1" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-900 shadow-lg transition hover:scale-105 active:scale-95">
              <Dices size={17} aria-hidden /> Surprise Me
            </Link>
            <Link to="/mixer" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/50 px-6 py-3.5 text-sm font-black text-white transition hover:scale-105 hover:bg-white/10 active:scale-95">
              Open Mixer <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: <Download size={18} aria-hidden />, t: 'Transparent PNGs', d: 'Crisp 1024px exports with transparent backgrounds.' },
            { icon: <Heart size={18} aria-hidden />, t: 'Favorites + recents', d: 'Saved locally in your browser. No account needed.' },
            { icon: <Sparkles size={18} aria-hidden />, t: 'Original art engine', d: 'Layered SVG faces — eyes, mouths, effects, accessories.' },
          ].map((f) => (
            <div key={f.t} className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-white/[0.06]">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">{f.icon}</span>
              <p className="font-display mt-3 font-extrabold text-slate-900 dark:text-white">{f.t}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pb-4">
        <RecentMixes refreshKey={recentTick} />
      </div>
    </main>
  );
}
