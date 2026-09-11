// ── Light casual-copy deterrent (production only) ────────────────────────────
// Honest note: this only discourages casual snooping. Anyone technical can
// still inspect network traffic or saved files — real secrets belong in a
// backend, never in frontend code.

export function initDevGuard() {
  if (import.meta.env.DEV) return;
  try {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return;
  } catch {
    return;
  }

  // right-click menu off
  window.addEventListener('contextmenu', (e) => e.preventDefault());

  // devtools / view-source shortcuts off
  window.addEventListener('keydown', (e) => {
    const k = (e.key || '').toLowerCase();
    if (
      e.key === 'F12' ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c', 'k'].includes(k)) ||
      ((e.ctrlKey || e.metaKey) && k === 'u')
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // friendly console notice (also proves code ownership)
  try {
    console.log(
      '%c© Mojimelt — Melt it. Mix it. Share it.\n%cThis artwork & code is original. Unauthorized copying violates our Terms.',
      'font-weight:bold;font-size:14px;color:#a855f7;',
      'font-size:11px;color:#64748b;'
    );
  } catch {
    /* ignore */
  }
}
