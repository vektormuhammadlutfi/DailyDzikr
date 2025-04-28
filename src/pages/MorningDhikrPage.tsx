import React from 'react';
import DhikrCard from '../components/DhikrCard';
import ProgressBar from '../components/ProgressBar';
import { getMorningDhikr } from '../data/dhikrData';
import { useProgress } from '../context/DhikrProgressContext';
import { RotateCcw } from 'lucide-react';

const MorningDhikrPage: React.FC = () => {
  const morningDhikr = getMorningDhikr();
  const { resetProgress } = useProgress();
  
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang progress dzikir pagi?')) {
      resetProgress('morning');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800 mb-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          <span className="font-semibold">Waktu Dzikir Pagi:</span> Setelah Sholat Subuh hingga terbit matahari
        </p>
      </div>
      
      <ProgressBar dhikrList={morningDhikr} />
      
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
        {morningDhikr.map(dhikr => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
      </div>
    </div>
  );
};

export default MorningDhikrPage;
