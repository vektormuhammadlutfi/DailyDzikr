import React from 'react';
import { Flame, Trophy, Calendar, AlertTriangle } from 'lucide-react';
import { useStreak } from '../context/StreakContext';

const StreakDisplay: React.FC = () => {
  const { streakData, getStreakStatus } = useStreak();
  const status = getStreakStatus();

  const getStreakColor = () => {
    if (status === 'broken') return 'text-gray-400';
    if (status === 'at-risk') return 'text-orange-500';
    return 'text-emerald-500';
  };

  const getStreakBgColor = () => {
    if (status === 'broken') return 'bg-gray-100 dark:bg-gray-800';
    if (status === 'at-risk') return 'bg-orange-50 dark:bg-orange-900/20';
    return 'bg-emerald-50 dark:bg-emerald-900/20';
  };

  const getStreakBorderColor = () => {
    if (status === 'broken') return 'border-gray-200 dark:border-gray-700';
    if (status === 'at-risk') return 'border-orange-200 dark:border-orange-800';
    return 'border-emerald-200 dark:border-emerald-800';
  };

  const getStreakMessage = () => {
    if (status === 'broken') {
      return 'Ayo mulai streak baru!';
    }
    if (status === 'at-risk') {
      return '⚠️ Dzikir hari ini untuk melanjutkan streak!';
    }
    if (streakData.currentStreak >= 100) {
      return '💎 Streak Level Master!';
    }
    if (streakData.currentStreak >= 30) {
      return '⭐ Streak Luar Biasa!';
    }
    if (streakData.currentStreak >= 7) {
      return '🔥 Tetap Semangat!';
    }
    return '✨ Pertahankan!';
  };

  return (
    <div className={`rounded-lg p-5 border ${getStreakBgColor()} ${getStreakBorderColor()} shadow-sm`}>
      {/* Status Warning */}
      {status === 'at-risk' && (
        <div className="mb-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-300 dark:border-orange-700">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={20} className="text-orange-600 dark:text-orange-400" />
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
              Streak Anda dalam bahaya! Segera dzikir untuk mempertahankan streak.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Streak Dzikir
        </h3>
        <div className={`flex items-center space-x-1 ${getStreakColor()}`}>
          <Flame size={24} />
          <span className="text-2xl font-bold">{streakData.currentStreak}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {getStreakMessage()}
      </p>

      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-1">
            <Flame size={18} className={getStreakColor()} />
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {streakData.currentStreak}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Hari ini</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-1">
            <Trophy size={18} className="text-yellow-500" />
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {streakData.longestStreak}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Terlama</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-1">
            <Calendar size={18} className="text-blue-500" />
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {streakData.totalDaysCompleted}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
        </div>
      </div>

      {/* Progress to Milestones */}
      {streakData.currentStreak < 100 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress ke milestone berikutnya</span>
            <span className="font-semibold">
              {streakData.currentStreak < 7 && `7 hari (${7 - streakData.currentStreak} lagi)`}
              {streakData.currentStreak >= 7 && streakData.currentStreak < 30 && `30 hari (${30 - streakData.currentStreak} lagi)`}
              {streakData.currentStreak >= 30 && streakData.currentStreak < 100 && `100 hari (${100 - streakData.currentStreak} lagi)`}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                status === 'at-risk' ? 'bg-orange-500' : 'bg-emerald-500'
              }`}
              style={{
                width: `${
                  streakData.currentStreak < 7
                    ? (streakData.currentStreak / 7) * 100
                    : streakData.currentStreak < 30
                    ? ((streakData.currentStreak - 7) / 23) * 100
                    : ((streakData.currentStreak - 30) / 70) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Achievement Badges */}
      {streakData.currentStreak >= 7 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {streakData.longestStreak >= 7 && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
              🏆 7 Hari
            </span>
          )}
          {streakData.longestStreak >= 30 && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
              ⭐ 30 Hari
            </span>
          )}
          {streakData.longestStreak >= 100 && (
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
              💎 100 Hari
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StreakDisplay;
