import React from 'react';
import { Target, Rocket } from 'lucide-react';
import { useDailyReading } from '../context/DailyReadingContext';

const DailyTarget: React.FC = () => {
  const { todayReading } = useDailyReading();
  const { pagesRead, target } = todayReading;
  
  const percentage = Math.min((pagesRead / target) * 100, 100);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getMotivationalMessage = () => {
    if (pagesRead === 0) {
      return 'Ayo mulai membaca! Setiap halaman berharga!';
    } else if (pagesRead < target / 2) {
      return 'Bagus! Terus membaca! Setiap halaman berharga!';
    } else if (pagesRead < target) {
      return 'Hampir sampai target! Semangat!';
    } else {
      return 'Masya Allah! Target tercapai! 🎉';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
          <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="ml-3 text-lg font-bold text-gray-800 dark:text-white">
          Target Hari Ini
        </h3>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          <svg className="transform -rotate-90 w-64 h-64">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-orange-500 dark:text-orange-400 transition-all duration-500 ease-in-out"
              strokeLinecap="round"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-800 dark:text-white">
              {pagesRead}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              dari {target} halaman
            </span>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center">
          <Rocket className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0" />
          <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
            {getMotivationalMessage()}
          </p>
          <Rocket className="h-5 w-5 text-orange-500 dark:text-orange-400 ml-3 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default DailyTarget;
