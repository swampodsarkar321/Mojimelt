import { Link } from 'react-router-dom';
import { Trophy, Shuffle, CalendarClock } from 'lucide-react';
import CommunityBoard from '../components/CommunityBoard.jsx';
import { seasonResetInfo } from '../utils/community.js';

export default function CommunityPage() {
  const season = seasonResetInfo();
  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-4 sm:px-6 sm:pt-10">
      <p className="flex items-center justify-center gap-2 text-center text-xs font-extrabold tracking-[0.25em] text-amber-600 uppercase dark:text-amber-300">
        <Trophy size={14} aria-hidden /> Community leaderboard
      </p>
      <h1 className="font-display mt-1 text-center text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
        Top 10 Mixes
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500 sm:text-base dark:text-slate-400">
        Cook an emoji, post it, collect likes. The most loved mixes climb to the top!
      </p>
      <p className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-4 py-1.5 text-xs font-extrabold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        <CalendarClock size={14} aria-hidden />
        Week {season.week} · board refreshes Monday · resets in {season.days}d {season.hours}h
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <Link
          to="/mixer"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          <Shuffle size={16} aria-hidden /> Cook &amp; Post a Mix
        </Link>
      </div>
      <div className="mt-6">
        <CommunityBoard />
      </div>
    </main>
  );
}
