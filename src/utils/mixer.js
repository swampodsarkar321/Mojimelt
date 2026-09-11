import { getEmoji } from '../data/emojiData.js';
import { findRule } from '../data/combinationRules.js';

// ── Generative fallback blender ─────────────────────────────────────────────
// Merges trait tags from both emojis into one coherent art spec.

const EYE_PRIORITY = ['alien', 'robot', 'devil', 'cool', 'laughing', 'crying', 'starry', 'hearts', 'frog', 'pleading', 'angry', 'surprised'];
const MOUTH_PRIORITY = ['laugh-open', 'cry-open', 'clown', 'dino', 'cat', 'kiss', 'grin', 'smirk'];

function pickEye(t1, t2) {
  for (const e of EYE_PRIORITY) {
    if (t1.eyes === e || t2.eyes === e) return e;
  }
  return t1.eyes || 'happy';
}

function pickMouth(t1, t2) {
  for (const m of MOUTH_PRIORITY) {
    if (t1.mouth === m || t2.mouth === m) return m;
  }
  return t1.mouth || 'smile';
}

function mergeUnique(...lists) {
  const seen = new Set();
  const out = [];
  for (const l of lists) {
    for (const x of l || []) {
      if (!seen.has(x)) {
        seen.add(x);
        out.push(x);
      }
    }
  }
  return out.slice(0, 5);
}

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const FUN_TITLES = [
  'Certified Chaos', 'Double Trouble', 'Mashup Magic', 'Forbidden Fusion',
  'Cuteness Overload', 'Beautiful Accident', 'Lab Experiment', 'Unhinged Cutie',
];

export function mixEmojis(charA, charB) {
  const e1 = getEmoji(charA);
  const e2 = getEmoji(charB);
  if (!e1 || !e2) return null;

  const rule = findRule(charA, charB);
  if (rule) {
    return {
      a: charA,
      b: charB,
      title: rule.title,
      blurb: rule.blurb,
      spec: { ...rule.spec },
      curated: true,
      nameA: e1.name,
      nameB: e2.name,
    };
  }

  const t1 = e1.traits;
  const t2 = e2.traits;

  // Base: prefer the more "exotic" base; yellow is the neutral default.
  const exotic = (b) =>
    ['lava', 'ice', 'alien', 'robot', 'poop', 'ghost', 'midnight', 'donut', 'cyan', 'blue', 'green', 'purple', 'pink', 'red', 'panda', 'bone', 'brown', 'lavender', 'gold'].includes(b) ? 1 : 0;
  let base = t1.base;
  if (exotic(t2.base) > exotic(t1.base)) base = t2.base;
  else if (exotic(t1.base) === exotic(t2.base)) {
    base = hashStr(charA + charB) % 2 === 0 ? t1.base : t2.base;
  }
  if (t1.base === 'yellow' && t2.base === 'yellow') base = 'blend';

  const eyes = pickEye(t1, t2);
  const mouth = pickMouth(t1, t2);
  const extras = mergeUnique(t1.extras, t2.extras);
  const effects = mergeUnique(t1.effects, t2.effects);

  const h = hashStr(charA + 'x' + charB);
  const title = FUN_TITLES[h % FUN_TITLES.length];

  return {
    a: charA,
    b: charB,
    title,
    blurb: `${e1.name} meets ${e2.name.toLowerCase()} — a brand-new original creation.`,
    spec: { base, eyes, mouth, extras, effects },
    curated: false,
    nameA: e1.name,
    nameB: e2.name,
  };
}

export function mixId(a, b) {
  return [a, b].sort().join('+');
}

export function shareUrl(a, b) {
  const url = new URL(window.location.origin + '/mix');
  url.searchParams.set('emoji1', a);
  url.searchParams.set('emoji2', b);
  return url.toString();
}
