import React from 'react';
import DhikrCard from '../components/DhikrCard';
import ProgressBar from '../components/ProgressBar';
import { getEveningDhikr } from '../data/dhikrData';
import { useProgress } from '../context/DhikrProgressContext';
import { RotateCcw } from 'lucide-react';

const EveningDhikrPage: React.FC = () => {
  const eveningDhikr = getEveningDhikr();
  const { resetProgress } = useProgress();
  
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang progress dzikir petang?')) {
      resetProgress('evening');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800 mb-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          <span className="font-semibold">Waktu Dzikir Petang:</span> Setelah Sholat Ashar hingga terbenam matahari
        </p>
      </div>
      
      <ProgressBar dhikrList={eveningDhikr} />
      
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
        {eveningDhikr.map(dhikr => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
      </div>
    </div>
  );
};

export default EveningDhikrPage;