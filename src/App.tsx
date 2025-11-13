import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PreferencesProvider } from './context/PreferencesContext';
import { DhikrProgressProvider } from './context/DhikrProgressContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import MorningDhikrPage from './pages/MorningDhikrPage';
import EveningDhikrPage from './pages/EveningDhikrPage';
import AfterPrayerDhikrPage from './pages/AfterPrayerDhikrPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <PreferencesProvider>
      <DhikrProgressProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Header />
            <main className="pb-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/morning" element={<MorningDhikrPage />} />
                <Route path="/evening" element={<EveningDhikrPage />} />
                <Route path="/after-prayer" element={<AfterPrayerDhikrPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Navigation />
          </div>
        </Router>
      </DhikrProgressProvider>
    </PreferencesProvider>
  );
}

export default App;
