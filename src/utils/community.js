// ── Community Top 10 store (LocalStorage v1) ────────────────────────────────
// Architecture note: every function here is backend-shaped (get/add/toggle),
// so it can later be swapped for Supabase/Firebase without touching the UI.

const POSTS_KEY = 'mojimelt:community-posts:v1';
const LIKED_KEY = 'mojimelt:community-liked:v1';
const OWN_KEY = 'mojimelt:community-own:v1';
const SEASON_KEY = 'mojimelt:community-season:v1';
const REPORTED_KEY = 'mojimelt:community-reported:v1';

const HOUR = 3600_000;

function seedPosts() {
  const now = Date.now();
  const rows = [
    { a: '😂', b: '😈', author: 'Rafi', likes: 248, hoursAgo: 30 },
    { a: '🔥', b: '👽', author: 'Mim', likes: 231, hoursAgo: 55 },
    { a: '🐸', b: '👑', author: 'Tanvir', likes: 205, hoursAgo: 80 },
    { a: '😭', b: '😎', author: 'Priya', likes: 189, hoursAgo: 12 },
    { a: '🦄', b: '💩', author: 'Siam', likes: 176, hoursAgo: 100 },
    { a: '😍', b: '🦄', author: 'Diya', likes: 158, hoursAgo: 8 },
    { a: '🎅', b: '🥶', author: 'Arif', likes: 141, hoursAgo: 140 },
    { a: '🐶', b: '👑', author: 'Nusrat', likes: 127, hoursAgo: 20 },
    { a: '🦸', b: '🔥', author: 'Fahim', likes: 112, hoursAgo: 45 },
    { a: '🐱', b: '🍩', author: 'Orpa', likes: 98, hoursAgo: 5 },
    { a: '🦈', b: '🌊', author: 'Hridoy', likes: 87, hoursAgo: 70 },
    { a: '💔', b: '🧁', author: 'Tania', likes: 76, hoursAgo: 3 },
  ];
  return rows.map((r, i) => ({
    id: `seed-${i}`,
    a: r.a,
    b: r.b,
    author: r.author,
    likes: r.likes,
    createdAt: now - r.hoursAgo * HOUR,
    seed: true,
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

function ensureSeason() {
  const season = currentSeasonId();
  let posts = read(POSTS_KEY, null);
  if (!Array.isArray(posts)) posts = seedPosts();

  if (read(SEASON_KEY, null) !== season) {
    // new week → fresh board, fresh race
    posts = seedPosts();
    write(POSTS_KEY, posts);
    write(LIKED_KEY, []);
    write(OWN_KEY, []);
    write(SEASON_KEY, season);
  }
  return posts;
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

export function getPosts() {
  const posts = ensureSeason();
  const liked = new Set(read(LIKED_KEY, []));
  const reported = new Set(read(REPORTED_KEY, []));
  return posts
    .filter((p) => !reported.has(p.id))
    .map((p) => ({ ...p, likedByMe: liked.has(p.id) }));
}

export function reportPost(id) {
  const reported = new Set(read(REPORTED_KEY, []));
  reported.add(id);
  write(REPORTED_KEY, [...reported]);
}

export function getTop10() {
  return [...getPosts()].sort((x, y) => y.likes - x.likes).slice(0, 10);
}

export function getLatest(limit = 12) {
  return [...getPosts()].sort((x, y) => y.createdAt - x.createdAt).slice(0, limit);
}

export function addPost({ a, b }) {
  const posts = ensureSeason();
  const post = {
    id: `u-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    a,
    b,
    author: 'Anonymous',
    likes: 0,
    createdAt: Date.now(),
    seed: false,
  };
  write(POSTS_KEY, [post, ...posts].slice(0, 200));
  const own = new Set(read(OWN_KEY, []));
  own.add(post.id);
  write(OWN_KEY, [...own]);
  return post;
}

export function getMyPosts() {
  const posts = ensureSeason();
  const liked = new Set(read(LIKED_KEY, []));
  const own = new Set(read(OWN_KEY, []));
  const reported = new Set(read(REPORTED_KEY, []));
  return posts
    .filter((p) => own.has(p.id) && !reported.has(p.id))
    .sort((x, y) => y.createdAt - x.createdAt)
    .map((p) => ({ ...p, likedByMe: liked.has(p.id) }));
}

export function getMyTotalLikes() {
  return getMyPosts().reduce((sum, p) => sum + p.likes, 0);
}

export function toggleLike(id) {
  const posts = ensureSeason();
  const liked = new Set(read(LIKED_KEY, []));
  const already = liked.has(id);
  const next = posts.map((p) =>
    p.id === id ? { ...p, likes: Math.max(0, p.likes + (already ? -1 : 1)) } : p
  );
  if (already) liked.delete(id);
  else liked.add(id);
  write(POSTS_KEY, next);
  write(LIKED_KEY, [...liked]);
  return { liked: !already, posts: next };
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
