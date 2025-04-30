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
  const [modalType, setModalType] = useState<'transliteration' | 'translation' | null>(null);

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

  // Close modal function
  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className={`mb-6 rounded-xl shadow-lg transition-transform duration-300 hover:shadow-2xl 
      ${isCompleted ? 'bg-emerald-50 dark:bg-emerald-900' : 'bg-white dark:bg-gray-800'} 
      border ${isCompleted ? 'border-emerald-200 dark:border-emerald-600' : 'border-gray-200 dark:border-gray-700'}`}>
      
      <div className="px-6 py-5 space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
            {dhikr.title[preferences.language]}
          </h3>
          {dhikr.faedah && (
            <button 
              onClick={() => setShowFaedah(!showFaedah)}
              className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              aria-label={showFaedah ? (preferences.language === 'en' ? "Hide virtues" : "Sembunyikan keutamaan") : (preferences.language === 'en' ? "Show virtues" : "Lihat keutamaan")}
            >
              <Info size={24} />
            </button>
          )}
        </div>
        
        {dhikr.source && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{dhikr.source}</p>
        )}
        
        {showFaedah && dhikr.faedah && (
          <div className="p-4 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-600 rounded-lg shadow-md">
            <p className="text-sm text-gray-700 dark:text-gray-300">{dhikr.faedah[preferences.language]}</p>
          </div>
        )}
        
        <div>
          <p className="text-right font-serif text-3xl leading-relaxed text-gray-900 dark:text-gray-100 mb-2">
            {dhikr.arabic}
          </p>

          <div className="flex justify-between mb-2">
            <button 
              onClick={() => setModalType('transliteration')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              {preferences.language === 'en' ? "Show Transliteration" : "Lihat Transliterasi"}
            </button>

            <button 
              onClick={() => setModalType('translation')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              {preferences.language === 'en' ? "Show Translation" : "Lihat Terjemahan"}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleDecrement}
              disabled={currentCount === 0}
              className={`flex items-center p-2 bg-gray-200 rounded-full text-gray-600 transition-colors duration-200 
                ${currentCount === 0 ? 'cursor-not-allowed' : 'hover:bg-red-200'}`}
              aria-label={preferences.language === 'en' ? "Decrease count" : "Kurangi hitungan"}
              title={preferences.language === 'en' ? "Decrease count" : "Kurangi hitungan"}
            >
              <MinusCircle size={24} />
            </button>
            
            <div className="flex items-center justify-center w-16 h-10 bg-gray-100 dark:bg-gray-700 rounded-full">
              <span className="font-bold text-lg text-gray-800 dark:text-gray-200">{currentCount}</span>
            </div>
            
            <button 
              onClick={handleIncrement}
              disabled={currentCount >= dhikr.repetition}
              className={`flex items-center p-2 bg-gray-200 rounded-full text-gray-600 transition-colors duration-200 
                ${currentCount >= dhikr.repetition ? 'cursor-not-allowed' : 'hover:bg-emerald-200'}`}
              aria-label={preferences.language === 'en' ? "Increase count" : "Tambah hitungan"}
              title={preferences.language === 'en' ? "Increase count" : "Tambah hitungan"}
            >
              <PlusCircle size={24} />
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">{currentCount}/{dhikr.repetition}</span>
            {isCompleted && <CheckCircle size={20} className="text-emerald-500 dark:text-emerald-400" />}
          </div>
        </div>
      </div>

      {/* Modal for Transliteration and Translation */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white dark:bg-gray-800 w-full rounded-t-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                {modalType === 'transliteration' ? (preferences.language === 'en' ? "Transliteration" : "Transliterasi") : (preferences.language === 'en' ? "Translation" : "Terjemahan")}
              </h4>
              <button onClick={closeModal} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {modalType === 'transliteration' && dhikr.transliteration
                ? dhikr.transliteration
                : modalType === 'translation' && dhikr.translation[preferences.language]
                ? dhikr.translation[preferences.language]
                : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DhikrCard;