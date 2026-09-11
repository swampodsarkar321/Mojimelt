// ── LocalStorage helpers ────────────────────────────────────────────────────

const KEYS = {
  favorites: 'mojimelt:favorites:v1',
  recents: 'mojimelt:recents:v1',
  recentEmojis: 'mojimelt:recent-emojis:v1',
  theme: 'mojimelt-theme',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / private mode — ignore */
  }
}

export function getFavorites() {
  return read(KEYS.favorites, []);
}

export function isFavorite(a, b) {
  const id = [a, b].sort().join('+');
  return getFavorites().some((f) => f.id === id);
}

export function toggleFavorite(entry) {
  const favs = getFavorites();
  const idx = favs.findIndex((f) => f.id === entry.id);
  let next;
  if (idx >= 0) next = favs.filter((f) => f.id !== entry.id);
  else next = [{ ...entry, savedAt: Date.now() }, ...favs].slice(0, 200);
  write(KEYS.favorites, next);
  return next;
}

export function removeFavorite(id) {
  const next = getFavorites().filter((f) => f.id !== id);
  write(KEYS.favorites, next);
  return next;
}

export function getRecents() {
  return read(KEYS.recents, []);
}

export function pushRecent(entry) {
  const recents = getRecents().filter((r) => r.id !== entry.id);
  const next = [{ ...entry, mixedAt: Date.now() }, ...recents].slice(0, 10);
  write(KEYS.recents, next);
  return next;
}

export function getRecentEmojis() {
  return read(KEYS.recentEmojis, []);
}

export function pushRecentEmoji(char) {
  const list = [char, ...getRecentEmojis().filter((c) => c !== char)].slice(0, 12);
  write(KEYS.recentEmojis, list);
  return list;
}

export function getTheme() {
  try {
    return localStorage.getItem(KEYS.theme) || null;
  } catch {
    return null;
  }
}

export function setTheme(mode) {
  try {
    localStorage.setItem(KEYS.theme, mode);
  } catch {
    /* ignore */
  }
}
