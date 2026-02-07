import React from 'react';
import { BookOpen } from 'lucide-react';
import { getVerseOfTheDay } from '../data/dailyVerses';

const VerseOfTheDay: React.FC = () => {
  const verse = getVerseOfTheDay();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
          <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="ml-3 text-lg font-bold text-gray-800 dark:text-white">
          Ayat Hari Ini
        </h3>
      </div>
      
      <div className="text-center">
        {/* Arabic Text */}
        <p className="text-2xl md:text-3xl font-arabic text-gray-800 dark:text-gray-100 mb-4 leading-loose">
          {verse.arabic}
        </p>
        
        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-4"></div>
        
        {/* Translation */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic mb-3">
          {verse.translation}
        </p>
        
        {/* Source */}
        <p className="text-sm font-semibold text-orange-500 dark:text-orange-400">
          {verse.source}
        </p>
      </div>
    </div>
  );
};

export default VerseOfTheDay;
