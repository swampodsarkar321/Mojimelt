import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Mixer from '../components/Mixer.jsx';
import RecentMixes from '../components/RecentMixes.jsx';
import { getEmoji, randomEmoji } from '../data/emojiData.js';

function pickInitial(searchParams) {
  if (searchParams.get('random') === '1') {
    const a = randomEmoji().char;
    const b = randomEmoji([a]).char;
    return { a, b };
  }
  const e1 = searchParams.get('emoji1');
  const e2 = searchParams.get('emoji2');
  const a = e1 && getEmoji(e1) ? e1 : '😂';
  const b = e2 && getEmoji(e2) ? e2 : '😈';
  return { a, b };
}

export default function MixerPage({ onMixChange, recentTick }) {
  const [searchParams] = useSearchParams();
  const initial = useMemo(() => pickInitial(searchParams), [searchParams]);
  const key = `${initial.a}-${initial.b}-${searchParams.get('random') ?? ''}`;

  return (
    <main className="mx-auto max-w-6xl px-4 pt-6 pb-4 sm:px-6 sm:pt-10">
      <p className="text-center text-xs font-extrabold tracking-[0.25em] text-violet-600 uppercase dark:text-violet-300">
        The Lab
      </p>
      <h1 className="font-display mt-1 text-center text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
        Mix Two Emojis. <span className="text-gradient">Create Something Weird.</span>
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500 sm:text-base dark:text-slate-400">
        Pick two emojis below — our original art engine fuses their eyes, mouths, colors and accessories.
      </p>
      <div className="mt-6">
        <Mixer key={key} initialA={initial.a} initialB={initial.b} onMixChange={onMixChange} />
      </div>
      <div className="mt-10">
        <RecentMixes refreshKey={recentTick} />
      </div>
    </main>
  );
}
