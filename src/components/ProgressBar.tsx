import React from 'react';
import { useProgress } from '../context/DhikrProgressContext';
import { Dhikr } from '../types';

interface ProgressBarProps {
  dhikrList: Dhikr[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ dhikrList }) => {
  const { progress } = useProgress();
  
  // Calculate total progress
  const completedCount = dhikrList.filter(dhikr => 
    (progress[dhikr.id] || 0) >= dhikr.repetition
  ).length;
  
  const totalCount = dhikrList.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Progress
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {completedCount}/{totalCount} ({Math.round(progressPercentage)}%)
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-emerald-500 dark:bg-emerald-400 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;