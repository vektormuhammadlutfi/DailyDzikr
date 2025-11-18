import React from 'react';
import { Moon, Sun, Settings, Languages } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  const location = useLocation();
  
  const toggleDarkMode = () => {
    updatePreferences({ darkMode: !preferences.darkMode });
  };

  const toggleLanguage = () => {
    updatePreferences({ language: preferences.language === 'en' ? 'id' : 'en' });
  };
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (preferences.language === 'en') {
      if (path === '/') return 'Home';
      if (path === '/morning') return 'Morning Dhikr';
      if (path === '/evening') return 'Evening Dhikr';
      if (path === '/settings') return 'Settings';
      if (path === '/about') return 'About';
      return 'Home';
    } else {
      if (path === '/') return 'Home';
      if (path === '/morning') return 'Dzikir Pagi';
      if (path === '/evening') return 'Dzikir Petang';
      if (path === '/settings') return 'Pengaturan';
      if (path === '/about') return 'Info Aplikasi';
      return 'Home';
    }
  };

  return (
    <header className="sticky top-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 shadow-md border-b border-emerald-100 dark:border-gray-700 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-emerald-600 dark:text-emerald-400 font-bold text-xl flex items-center space-x-2">
              <span className="text-2xl">🕌</span>
              <span>Daily Dzikr</span>
            </Link>
          </div>
          
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            {getPageTitle()}
          </h1>
          
          <div className="flex items-center space-x-2">
            <button
              id="toggle-language"
              onClick={toggleLanguage}
              className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/50 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-all shadow-sm hover:shadow"
              aria-label={preferences.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
            >
              <Languages size={20} />
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/50 text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-all shadow-sm hover:shadow"
              aria-label={preferences.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {preferences.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link 
              to="/settings"
              className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/50 text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/30 transition-all shadow-sm hover:shadow" 
              aria-label="Settings"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
