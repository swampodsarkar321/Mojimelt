import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BottomNav from './components/BottomNav.jsx';
import Home from './pages/Home.jsx';
import MixerPage from './pages/MixerPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import { PrivacyPage, TermsPage, NotFoundPage } from './pages/StaticPages.jsx';
import { getFavorites, removeFavorite, getTheme, setTheme } from './utils/storage.js';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname, search]);
  return null;
}

// Backward compatibility: old shared links looked like /#/mix?emoji1=..&emoji2=..
function HashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith('#/')) {
      navigate(h.slice(1), { replace: true });
    }
  }, [navigate]);
  return null;
}

const PAGE_SEO = {
  '/': {
    title: 'Mojimelt – Mix Emojis & Create Unique Emoji Combinations',
    desc: 'Mix two emojis together and create fun, unique emoji combinations. Try random mixes, save favorites, download PNGs and share your creations.',
  },
  '/mixer': {
    title: 'Emoji Mixer – Combine Two Emojis Into One | Mojimelt',
    desc: 'Pick two emojis and fuse their eyes, mouths, colors and accessories into original artwork. Download PNGs, copy and share your mix.',
  },
  '/mix': {
    title: 'Emoji Mixer – Combine Two Emojis Into One | Mojimelt',
    desc: 'Pick two emojis and fuse their eyes, mouths, colors and accessories into original artwork. Download PNGs, copy and share your mix.',
  },
  '/community': {
    title: 'Community Top 10 – Most Loved Emoji Mixes | Mojimelt',
    desc: 'Post your emoji mixes, collect likes and climb the weekly Top 10 leaderboard on Mojimelt.',
  },
  '/favorites': {
    title: 'My Favorite Emoji Mixes | Mojimelt',
    desc: 'Your saved emoji mixes, stored privately in your browser. Download, remix and share them.',
  },
  '/privacy': {
    title: 'Privacy Policy | Mojimelt',
    desc: 'How Mojimelt handles your data: everything stays in your browser. No accounts, no trackers.',
  },
  '/terms': {
    title: 'Terms of Use | Mojimelt',
    desc: 'Terms for using Mojimelt and its original emoji artwork.',
  },
};

function PageSeo() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const seo = PAGE_SEO[pathname] || PAGE_SEO['/'];
    document.title = seo.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', seo.desc);
    const ogTag = document.querySelector('meta[property="og:title"]');
    if (ogTag) ogTag.setAttribute('content', seo.title);
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    const canonicalUrl =
      pathname === '/mix'
        ? window.location.origin + pathname + search
        : window.location.origin + pathname;
    canon.setAttribute('href', canonicalUrl);
  }, [pathname, search]);
  return null;
}

function Shell() {
  const location = useLocation();
  const [theme, setThemeState] = useState(() => {
    const saved = getTheme();
    if (saved) return saved;
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [recentTick, setRecentTick] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    setTheme(theme);
  }, [theme]);

  // refresh favorites whenever we visit the page (or storage changes elsewhere)
  useEffect(() => {
    if (location.pathname === '/favorites') setFavorites(getFavorites());
  }, [location.pathname]);

  useEffect(() => {
    const onStorage = () => setFavorites(getFavorites());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleMixChange = useCallback(() => {
    setRecentTick((t) => t + 1);
  }, []);

  const handleRemoveFav = useCallback((id) => {
    setFavorites(removeFavorite(id));
  }, []);

  // keep favorites fresh after a heart is toggled in ResultCard
  useEffect(() => {
    setFavorites(getFavorites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentTick]);

  return (
    <div className="flex min-h-dvh flex-col bg-[#fafaff] text-slate-900 transition-colors dark:bg-[#0b0b14] dark:text-slate-100">
      <ScrollToTop />
      <HashRedirect />
      <PageSeo />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div className="flex-1 pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Home recentTick={recentTick} />} />
          <Route path="/mixer" element={<MixerPage onMixChange={handleMixChange} recentTick={recentTick} />} />
          <Route path="/mix" element={<MixerPage onMixChange={handleMixChange} recentTick={recentTick} />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} onRemove={handleRemoveFav} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
