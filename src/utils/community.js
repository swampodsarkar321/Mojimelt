import { ref, get, set, push, update, remove, onValue, runTransaction } from 'firebase/database';
import { db, getClientId } from './firebase.js';

// ── Community Top 10 store — Firebase Realtime Database (shared online!) ─────
// Likes & posts sync live across ALL devices. LocalStorage only remembers:
// which posts YOU liked / posted / reported on this device.

const LIKED_KEY = 'mojimelt:community-liked:v1';
const OWN_KEY = 'mojimelt:community-own:v1';
const REPORTED_KEY = 'mojimelt:community-reported:v1';

const HOUR = 3600_000;

export function seedPosts() {
  const now = Date.now();
  const season = currentSeasonId();
  const rows = [
    { a: '😂', b: '😈', likes: 248, hoursAgo: 30 },
    { a: '🔥', b: '👽', likes: 231, hoursAgo: 55 },
    { a: '🐸', b: '👑', likes: 205, hoursAgo: 80 },
    { a: '😭', b: '😎', likes: 189, hoursAgo: 12 },
    { a: '🦄', b: '💩', likes: 176, hoursAgo: 100 },
    { a: '😍', b: '🦄', likes: 158, hoursAgo: 8 },
    { a: '🎅', b: '🥶', likes: 141, hoursAgo: 140 },
    { a: '🐶', b: '👑', likes: 127, hoursAgo: 20 },
    { a: '🦸', b: '🔥', likes: 112, hoursAgo: 45 },
    { a: '🐱', b: '🍩', likes: 98, hoursAgo: 5 },
    { a: '🦈', b: '🌊', likes: 87, hoursAgo: 70 },
    { a: '💔', b: '🧁', likes: 76, hoursAgo: 3 },
  ];
  return rows.map((r, i) => ({
    id: `seed-${i}`,
    a: r.a,
    b: r.b,
    likes: r.likes,
    createdAt: now - r.hoursAgo * HOUR,
    season,
    seed: true,
    likedByMe: false,
  }));
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function getOwnIds() {
  return new Set(read(OWN_KEY, []));
}

export function getReportedIds() {
  return new Set(read(REPORTED_KEY, []));
}

function applyLocalFlags(posts) {
  const liked = new Set(read(LIKED_KEY, []));
  const reported = new Set(read(REPORTED_KEY, []));
  return posts
    .filter((p) => !reported.has(p.id))
    .map((p) => ({ ...p, likedByMe: liked.has(p.id) }));
}

// Idempotent weekly seeds: fixed ids, only written when this week has none.
async function ensureCloudSeeds() {
  const season = currentSeasonId();
  const snap = await get(ref(db, 'posts'));
  const val = snap.val() || {};
  const hasCurrent = Object.values(val).some((p) => p && p.season === season);
  if (hasCurrent) return;
  const updates = {};
  for (const s of seedPosts()) {
    const { id, likedByMe, ...rest } = s;
    updates[`posts/${id}`] = rest;
  }
  await update(ref(db), updates);
}

let seededOnce = false;
function ensureSeededOnce() {
  if (seededOnce) return;
  seededOnce = true;
  ensureCloudSeeds().catch(() => {
    seededOnce = false; // retry next time
  });
}

/**
 * Live-subscribe to all posts. Callback receives the enriched list.
 * Returns an unsubscribe function. onError fires if offline / rules deny.
 */
export function subscribePosts(onData, onError) {
  ensureSeededOnce();
  const postsRef = ref(db, 'posts');
  const off = onValue(
    postsRef,
    (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, p]) => ({ id, ...p }));
      onData(applyLocalFlags(list));
    },
    () => onError?.()
  );
  return () => off();
}

export async function addPost({ a, b }) {
  const postRef = await push(ref(db, 'posts'), {
    a,
    b,
    likes: 0,
    createdAt: Date.now(),
    season: currentSeasonId(),
  });
  const own = new Set(read(OWN_KEY, []));
  own.add(postRef.key);
  write(OWN_KEY, [...own]);
  return { id: postRef.key, a, b, likes: 0, createdAt: Date.now() };
}

export async function toggleLike(id) {
  const liked = new Set(read(LIKED_KEY, []));
  const already = liked.has(id);
  const clientId = getClientId();

  // atomic counter + one-like-per-device record
  await runTransaction(ref(db, `posts/${id}/likes`), (n) =>
    Math.max(0, (typeof n === 'number' ? n : 0) + (already ? -1 : 1))
  );
  if (already) {
    liked.delete(id);
    await remove(ref(db, `postLikes/${id}/${clientId}`)).catch(() => {});
  } else {
    liked.add(id);
    await set(ref(db, `postLikes/${id}/${clientId}`), true).catch(() => {});
  }
  write(LIKED_KEY, [...liked]);
  return !already;
}

export function reportPost(id) {
  const reported = new Set(read(REPORTED_KEY, []));
  reported.add(id);
  write(REPORTED_KEY, [...reported]);
}

// ── derived selectors (pure — use on the subscribed list) ────────────────────
export function top10Of(posts) {
  const season = currentSeasonId();
  return posts
    .filter((p) => (p.season || season) === season)
    .sort((x, y) => y.likes - x.likes)
    .slice(0, 10);
}

export function latestOf(posts, limit = 12) {
  const season = currentSeasonId();
  return posts
    .filter((p) => (p.season || season) === season)
    .sort((x, y) => y.createdAt - x.createdAt)
    .slice(0, limit);
}

export function myPostsOf(posts) {
  const own = getOwnIds();
  const season = currentSeasonId();
  return posts
    .filter((p) => own.has(p.id) && (p.season || season) === season)
    .sort((x, y) => y.createdAt - x.createdAt);
}

export function currentSeasonId() {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - onejan) / 86400_000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

export function seasonResetInfo() {
  const now = new Date();
  const next = new Date(now);
  next.setDate(now.getDate() + (((8 - now.getDay()) % 7) || 7));
  next.setHours(0, 0, 0, 0);
  const ms = Math.max(0, next - now);
  return {
    week: currentSeasonId().split('-W')[1],
    days: Math.floor(ms / 86400_000),
    hours: Math.floor((ms % 86400_000) / 3600_000),
  };
}

export function timeAgo(ts) {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}
