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
      if (path === '/') return 'Daily Dzikr';
      if (path === '/morning') return 'Morning Dhikr';
      if (path === '/evening') return 'Evening Dhikr';
      if (path === '/settings') return 'Settings';
      if (path === '/about') return 'About';
      return 'Daily Dzikr';
    } else {
      if (path === '/') return 'Daily Dzikr';
      if (path === '/morning') return 'Dzikir Pagi';
      if (path === '/evening') return 'Dzikir Petang';
      if (path === '/settings') return 'Pengaturan';
      if (path === '/about') return 'Info Aplikasi';
      return 'Daily Dzikr';
    }
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
              Daily Dzikr
            </Link>
          </div>
          
          <h1 className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {getPageTitle()}
          </h1>
          
          <div className="flex items-center space-x-4">
            <button
              id="toggle-language"
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              aria-label={preferences.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
            >
              <Languages size={20} />
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400 transition-colors"
              aria-label={preferences.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {preferences.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link 
              to="/settings"
              className="p-2 rounded-full text-gray-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors" 
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
