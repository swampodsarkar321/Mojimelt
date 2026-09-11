import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ── Firebase Realtime Database (public client config — safe in frontend) ────
// Security comes from Realtime Database Rules, NOT from hiding this key.
// Recommended: Google Cloud Console → APIs & Services → Credentials → restrict
// this key with "HTTP referrers" to mojimelt.vercel.app + localhost.

const firebaseConfig = {
  apiKey: 'AIzaSyCwpylnjqWQLBpgoiStlrE01o95aKP3JSY',
  authDomain: 'chat-2-me-c3213.firebaseapp.com',
  databaseURL: 'https://chat-2-me-c3213-default-rtdb.firebaseio.com',
  projectId: 'chat-2-me-c3213',
  storageBucket: 'chat-2-me-c3213.firebasestorage.app',
  messagingSenderId: '302872350523',
  appId: '1:302872350523:web:e2c911cecc259fc532311e',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Stable per-device id (one like per device per post)
export function getClientId() {
  try {
    let id = localStorage.getItem('mojimelt:client-id:v1');
    if (!id) {
      id = `c-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
      localStorage.setItem('mojimelt:client-id:v1', id);
    }
    return id;
  } catch {
    return `c-fallback-${Math.floor(Math.random() * 1e9).toString(36)}`;
  }
}
