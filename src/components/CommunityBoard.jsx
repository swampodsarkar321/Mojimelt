import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shuffle, Crown, Trophy, Clock3, User, Flag } from 'lucide-react';
import EmojiArt from './EmojiArt.jsx';
import { mixEmojis } from '../utils/mixer.js';
import { getTop10, getLatest, getMyPosts, getMyTotalLikes, toggleLike, reportPost, timeAgo } from '../utils/community.js';

const RANK_STYLE = [
  'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 shadow-amber-500/40',
  'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 shadow-slate-400/40',
  'bg-gradient-to-br from-orange-300 to-amber-600 text-orange-950 shadow-orange-500/40',
];

function PostCard({ post, rank, onLike, onReport, reportArmed, onArmReport }) {
  const mix = mixEmojis(post.a, post.b);
  if (!mix) return null;
  const armed = reportArmed === post.id;
  return (
    <article
      className={`relative flex items-center gap-3 rounded-3xl border bg-white p-3 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:gap-4 sm:p-4 dark:bg-white/[0.06] ${
        rank != null && rank <= 3
          ? 'border-amber-300/70 dark:border-amber-400/30'
          : 'border-slate-200/70 dark:border-white/10'
      }`}
    >
      {rank != null && (
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-base font-black shadow-lg sm:h-12 sm:w-12 sm:text-xl ${
            rank <= 3 ? RANK_STYLE[rank - 1] : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300'
          }`}
          aria-label={`Rank ${rank}`}
        >
          {rank <= 3 ? <Crown size={rank === 1 ? 22 : 18} aria-hidden /> : `#${rank}`}
        </span>
      )}

      <Link
        to={`/mix?emoji1=${encodeURIComponent(post.a)}&emoji2=${encodeURIComponent(post.b)}`}
        className="shrink-0 rounded-2xl bg-gradient-to-br from-violet-50 to-amber-50 p-1.5 transition hover:scale-105 dark:from-white/10 dark:to-white/5"
        aria-label={`Remix ${mix.title}`}
      >
        <EmojiArt spec={mix.spec} size={64} title={mix.title} />
      </Link>

      <div className="min-w-0 flex-1">
        <p className="font-display truncate text-base font-extrabold text-slate-900 sm:text-lg dark:text-white">
          {mix.title}
        </p>
        <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">
          <span aria-hidden>{post.a} + {post.b}</span>
          <span className="sr-only">{mix.nameA} plus {mix.nameB}</span>
          {' · '}{timeAgo(post.createdAt)}
        </p>
        <Link
          to={`/mix?emoji1=${encodeURIComponent(post.a)}&emoji2=${encodeURIComponent(post.b)}`}
          className="mt-1 inline-flex items-center gap-1 text-xs font-extrabold text-violet-600 hover:underline dark:text-violet-300"
        >
          <Shuffle size={12} aria-hidden /> Remix this
        </Link>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={() => onLike(post.id)}
        aria-pressed={post.likedByMe}
        aria-label={post.likedByMe ? `Unlike ${mix.title}` : `Like ${mix.title}`}
        className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition active:scale-90 ${
          post.likedByMe
            ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 animate-heart-pop'
            : 'bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-rose-500/20'
        }`}
      >
        <Heart size={20} fill={post.likedByMe ? 'currentColor' : 'none'} aria-hidden />
        <span className="text-sm font-black tabular-nums">{post.likes}</span>
      </button>
      <button
        type="button"
        onClick={() => (armed ? onReport(post.id) : onArmReport(post.id))}
        aria-label={armed ? `Confirm report for ${mix.title}` : `Report ${mix.title}`}
        title="Report this post"
        className={`rounded-full px-2 py-1 text-[10px] font-extrabold transition active:scale-90 ${
          armed
            ? 'bg-red-500 text-white shadow'
            : 'text-slate-300 hover:bg-red-50 hover:text-red-400 dark:text-slate-600 dark:hover:bg-red-500/10 dark:hover:text-red-400'
        }`}
      >
        {armed ? 'Sure?' : <Flag size={13} aria-hidden />}
      </button>
      </div>
    </article>
  );
}

export default function CommunityBoard() {
  const [top10, setTop10] = useState(() => getTop10());
  const [latest, setLatest] = useState(() => getLatest());
  const [mine, setMine] = useState(() => getMyPosts());
  const [myLikes, setMyLikes] = useState(() => getMyTotalLikes());
  const [reportArmed, setReportArmed] = useState(null);

  const refresh = () => {
    setTop10(getTop10());
    setLatest(getLatest());
    setMine(getMyPosts());
    setMyLikes(getMyTotalLikes());
  };

  const onLike = (id) => {
    toggleLike(id);
    refresh();
  };

  const onReport = (id) => {
    reportPost(id);
    setReportArmed(null);
    refresh();
  };

  return (
    <div>
      {mine.length > 0 && (
        <section aria-labelledby="mine-heading" className="mb-10 rounded-[2rem] border-2 border-violet-300/60 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-4 sm:p-5 dark:border-violet-500/30 dark:from-violet-500/10 dark:to-fuchsia-500/10">
          <h2 id="mine-heading" className="flex items-center gap-2 font-display text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30">
              <User size={18} aria-hidden />
            </span>
            My Posts
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-3.5 py-1.5 text-sm font-black text-white shadow">
              <Heart size={14} fill="currentColor" aria-hidden /> {myLikes} likes earned
            </span>
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Watch your likes grow live right here!
          </p>
          <div className="mt-4 grid gap-3">
            {mine.map((p) => (
              <PostCard key={p.id} post={p} rank={null} onLike={onLike} onReport={onReport} reportArmed={reportArmed} onArmReport={setReportArmed} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="top10-heading">
        <h2 id="top10-heading" className="flex items-center gap-2 font-display text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-orange-500/30">
            <Trophy size={18} aria-hidden />
          </span>
          Top 10 — This Week
        </h2>
        <div className="mt-4 grid gap-3">
          {top10.map((p, i) => (
            <PostCard key={p.id} post={p} rank={i + 1} onLike={onLike} onReport={onReport} reportArmed={reportArmed} onArmReport={setReportArmed} />
          ))}
        </div>
      </section>

      <section aria-labelledby="latest-heading" className="mt-10">
        <h2 id="latest-heading" className="flex items-center gap-2 font-display text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
            <Clock3 size={18} aria-hidden />
          </span>
          Fresh from the Lab
        </h2>
        <div className="mt-4 grid gap-3">
          {latest.map((p) => (
            <PostCard key={p.id} post={p} rank={null} onLike={onLike} onReport={onReport} reportArmed={reportArmed} onArmReport={setReportArmed} />
          ))}
        </div>
      </section>
    </div>
  );
}
