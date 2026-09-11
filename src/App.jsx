import { useCallback, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
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
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
