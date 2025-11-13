import React from 'react';
import DhikrCard from '../components/DhikrCard';
import ProgressBar from '../components/ProgressBar';
import { getAfterPrayerDhikr } from '../data/dhikrData';
import { useProgress } from '../context/DhikrProgressContext';
import { RotateCcw } from 'lucide-react';

const AfterPrayerDhikrPage: React.FC = () => {
  const afterPrayerDhikr = getAfterPrayerDhikr();
  const { resetProgress } = useProgress();
  
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang progress dzikir setelah shalat?')) {
      resetProgress('after-prayer');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800 mb-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          <span className="font-semibold">Dzikir Setelah Shalat:</span> Dibaca setiap selesai shalat fardhu (5 waktu)
        </p>
      </div>
      
      <ProgressBar dhikrList={afterPrayerDhikr} />
      
      <div className="flex justify-end mb-4">
        <button
          onClick={handleReset}
          className="flex items-center text-sm text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        >
          <RotateCcw size={16} className="mr-1" />
          Reset Progress
        </button>
      </div>
      
      <div className="space-y-4">
        {afterPrayerDhikr.map(dhikr => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
      </div>
    </div>
  );
};

export default AfterPrayerDhikrPage;
