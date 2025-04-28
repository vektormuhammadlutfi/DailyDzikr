import React, { useState } from 'react';
import { Dhikr } from '../types';
import { usePreferences } from '../context/PreferencesContext';
import { useProgress } from '../context/DhikrProgressContext';
import { PlusCircle, MinusCircle, Info, CheckCircle } from 'lucide-react';

interface DhikrCardProps {
  dhikr: Dhikr;
}

const DhikrCard: React.FC<DhikrCardProps> = ({ dhikr }) => {
  const { preferences } = usePreferences();
  const { progress, updateProgress } = useProgress();
  const [showFaedah, setShowFaedah] = useState(false);
  
  const currentCount = progress[dhikr.id]?.count || 0;
  const isCompleted = currentCount >= dhikr.repetition;
  
  const handleIncrement = () => {
    if (currentCount < dhikr.repetition) {
      updateProgress(dhikr.id, currentCount + 1);
    }
  };
  
  const handleDecrement = () => {
    if (currentCount > 0) {
      updateProgress(dhikr.id, currentCount - 1);
    }
  };

  return (
    <div className={`mb-6 rounded-lg shadow-md overflow-hidden transition-all duration-300 
      ${isCompleted ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-white dark:bg-gray-800'} 
      border ${isCompleted ? 'border-emerald-200 dark:border-emerald-700' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="px-5 py-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            {dhikr.title[preferences.language]}
          </h3>
          {dhikr.faedah && (
            <button 
              onClick={() => setShowFaedah(!showFaedah)}
              className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              aria-label={showFaedah ? 
                preferences.language === 'en' ? "Hide virtues" : "Sembunyikan keutamaan" : 
                preferences.language === 'en' ? "Show virtues" : "Lihat keutamaan"
              }
            >
              <Info size={20} />
            </button>
          )}
        </div>
        
        {dhikr.source && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{dhikr.source}</p>
        )}
        
        {showFaedah && dhikr.faedah && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">{dhikr.faedah[preferences.language]}</p>
          </div>
        )}
        
        <div className="mb-4">
          <p className="text-right font-['Amiri'] text-xl leading-relaxed mb-2 text-gray-900 dark:text-gray-100">
            {dhikr.arabic}
          </p>
          
          {preferences.showTransliteration && dhikr.transliteration && (
            <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-2">{dhikr.transliteration}</p>
          )}
          
          {preferences.showTranslation && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">{dhikr.translation[preferences.language]}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleDecrement}
              disabled={currentCount === 0}
              className={`p-1 rounded-full transition-colors ${currentCount === 0 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'}`}
              aria-label={preferences.language === 'en' ? "Decrease count" : "Kurangi hitungan"}
            >
              <MinusCircle size={24} />
            </button>
            
            <div className="flex items-center justify-center w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{currentCount}</span>
            </div>
            
            <button 
              onClick={handleIncrement}
              disabled={currentCount >= dhikr.repetition}
              className={`p-1 rounded-full transition-colors ${currentCount >= dhikr.repetition ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400'}`}
              aria-label={preferences.language === 'en' ? "Increase count" : "Tambah hitungan"}
            >
              <PlusCircle size={24} />
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{currentCount}/{dhikr.repetition}</span>
            {isCompleted && <CheckCircle size={20} className="text-emerald-500 dark:text-emerald-400" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DhikrCard;
