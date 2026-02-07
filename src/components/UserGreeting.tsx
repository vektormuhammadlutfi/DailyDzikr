import React from 'react';
import { Flame, Trophy, Lock } from 'lucide-react';
import { useStreak } from '../context/StreakContext';
import { usePreferences } from '../context/PreferencesContext';

const UserGreeting: React.FC = () => {
  const { streakData } = useStreak();
  const { preferences } = usePreferences();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Assalamu\'alaikum';
    if (hour < 15) return 'Siang yang penuh berkah';
    if (hour < 18) return 'Sore yang barakah';
    return 'Malam penuh rahmat';
  };

  const userName = preferences.userName || 'Saudaraku';

  return (
    <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-700 rounded-2xl p-6 shadow-lg mb-6">
      {/* Greeting and Streak */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white text-sm md:text-base mb-1 opacity-90">
            {getGreeting()},
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            {userName}
          </h1>
        </div>
        
        <div className="flex gap-2">
          {/* Streak Counter */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <Flame className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-lg">{streakData.currentStreak}</span>
          </div>
          
          {/* Trophy Icon */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Trophy className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center">
        <div className="bg-white/20 rounded-lg p-2 mr-3">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <div className="flex items-center">
          <span className="text-white font-medium text-sm md:text-base mr-2">Statistik</span>
          <span className="text-white text-xs md:text-sm opacity-75">✨</span>
          <span className="text-white font-semibold text-sm md:text-base ml-2">
            Istiqomah {streakData.currentStreak} hari!
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserGreeting;
