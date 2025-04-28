import React from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { Moon, Sun, Type } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updatePreferences({ fontSize: size });
  };

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Pengaturan</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                <Sun size={20} className="text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-medium">Mode Tampilan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pilih mode tampilan aplikasi</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => updatePreferences({ darkMode: false })}
                className={`px-3 py-1 rounded-l-md ${!preferences.darkMode ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Terang
              </button>
              <button
                onClick={() => updatePreferences({ darkMode: true })}
                className={`px-3 py-1 rounded-r-md ${preferences.darkMode ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Gelap
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                <Type size={20} className="text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-medium">Tampilkan Transliterasi</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tampilkan cara baca latin</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.showTransliteration}
                onChange={() => updatePreferences({ showTransliteration: !preferences.showTransliteration })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
        
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                <Type size={20} className="text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-medium">Tampilkan Terjemahan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tampilkan terjemahan bahasa Indonesia</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.showTranslation}
                onChange={() => updatePreferences({ showTranslation: !preferences.showTranslation })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
        
        <div>
          <div className="px-4 py-5">
            <div className="flex items-center mb-3">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                <Type size={20} className="text-emerald-500 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-medium">Ukuran Huruf Arabic</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sesuaikan ukuran huruf Arabic</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleFontSizeChange('small')}
                className={`px-4 py-2 rounded-md ${preferences.fontSize === 'small' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Kecil
              </button>
              <button
                onClick={() => handleFontSizeChange('medium')}
                className={`px-4 py-2 rounded-md ${preferences.fontSize === 'medium' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Sedang
              </button>
              <button
                onClick={() => handleFontSizeChange('large')}
                className={`px-4 py-2 rounded-md ${preferences.fontSize === 'large' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Besar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;