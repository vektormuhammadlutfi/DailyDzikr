import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, differenceInDays, parseISO, isToday, isYesterday } from 'date-fns';
import { toast } from 'sonner';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  totalDaysCompleted: number;
  streakHistory: { date: string; completed: boolean }[];
}

interface StreakContextType {
  streakData: StreakData;
  checkDhikrCompletion: (type: 'morning' | 'evening') => void;
  resetStreak: () => void;
  getStreakStatus: () => 'active' | 'at-risk' | 'broken';
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

const INITIAL_STREAK_DATA: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  totalDaysCompleted: 0,
  streakHistory: [],
};

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [streakData, setStreakData] = useState<StreakData>(() => {
    const saved = localStorage.getItem('dhikrStreak');
    return saved ? JSON.parse(saved) : INITIAL_STREAK_DATA;
  });

  const [dailyCompletion, setDailyCompletion] = useState<{
    morning: boolean;
    evening: boolean;
  }>(() => {
    const saved = localStorage.getItem('dailyDhikrCompletion');
    const today = format(new Date(), 'yyyy-MM-dd');
    
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) {
        return { morning: data.morning, evening: data.evening };
      }
    }
    return { morning: false, evening: false };
  });

  // Save streak data to localStorage
  useEffect(() => {
    localStorage.setItem('dhikrStreak', JSON.stringify(streakData));
  }, [streakData]);

  // Save daily completion
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    localStorage.setItem('dailyDhikrCompletion', JSON.stringify({
      date: today,
      morning: dailyCompletion.morning,
      evening: dailyCompletion.evening,
    }));
  }, [dailyCompletion]);

  // Check for streak breaks every day
  useEffect(() => {
    const checkStreakStatus = () => {
      const status = getStreakStatus();
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Check if we need to reset daily completion
      const saved = localStorage.getItem('dailyDhikrCompletion');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.date !== today) {
          setDailyCompletion({ morning: false, evening: false });
        }
      }

      // Warn if streak is at risk
      if (status === 'at-risk' && streakData.currentStreak > 0) {
        const hours = new Date().getHours();
        if (hours >= 18 && hours <= 22) { // Evening reminder
          toast.warning('⚠️ Streak Hampir Hangus!', {
            description: `Streak ${streakData.currentStreak} hari akan hangus jika tidak dzikir hari ini!`,
            duration: 10000,
          });
        }
      }
    };

    checkStreakStatus();
    const interval = setInterval(checkStreakStatus, 60000 * 60); // Check every hour

    return () => clearInterval(interval);
  }, [streakData.currentStreak]);

  const getStreakStatus = (): 'active' | 'at-risk' | 'broken' => {
    if (!streakData.lastCompletedDate) return 'broken';

    const lastDate = parseISO(streakData.lastCompletedDate);

    if (isToday(lastDate)) {
      return 'active';
    } else if (isYesterday(lastDate)) {
      // If it's yesterday and we haven't completed today yet
      const hours = new Date().getHours();
      if (hours >= 18) {
        return 'at-risk'; // High risk in the evening
      }
      return 'active'; // Still have time
    } else {
      return 'broken';
    }
  };

  const checkDhikrCompletion = (type: 'morning' | 'evening') => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Update daily completion
    const newCompletion = {
      ...dailyCompletion,
      [type]: true,
    };
    setDailyCompletion(newCompletion);

    // Check if both morning and evening are completed
    if (newCompletion.morning && newCompletion.evening) {
      updateStreak(today);
    } else {
      // Show encouragement for partial completion
      const remaining = newCompletion.morning ? 'petang' : 'pagi';
      toast.info('Hampir Selesai! 🌟', {
        description: `Jangan lupa dzikir ${remaining} untuk melanjutkan streak!`,
      });
    }
  };

  const updateStreak = (completionDate: string) => {
    const lastDate = streakData.lastCompletedDate;
    let newStreak = streakData.currentStreak;
    let newLongestStreak = streakData.longestStreak;

    if (!lastDate) {
      // First time completing
      newStreak = 1;
      showStreakCelebration(1);
    } else {
      const lastCompleted = parseISO(lastDate);
      const today = parseISO(completionDate);
      const daysDiff = differenceInDays(today, lastCompleted);

      if (daysDiff === 0) {
        // Already completed today
        return;
      } else if (daysDiff === 1) {
        // Consecutive day
        newStreak += 1;
        showStreakCelebration(newStreak);
      } else {
        // Streak broken
        showStreakBroken(streakData.currentStreak);
        newStreak = 1;
      }
    }

    if (newStreak > newLongestStreak) {
      newLongestStreak = newStreak;
    }

    setStreakData({
      ...streakData,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastCompletedDate: completionDate,
      totalDaysCompleted: streakData.totalDaysCompleted + 1,
      streakHistory: [
        ...streakData.streakHistory,
        { date: completionDate, completed: true },
      ],
    });
  };

  const showStreakCelebration = (streak: number) => {
    if (streak === 1) {
      toast.success('🎉 Streak Dimulai!', {
        description: 'Alhamdulillah! Mulai perjalanan spiritual Anda.',
        duration: 5000,
      });
    } else if (streak === 7) {
      toast.success('🔥 7 Hari Beruntun!', {
        description: 'MasyaAllah! Seminggu penuh konsisten dzikir!',
        duration: 7000,
      });
    } else if (streak === 30) {
      toast.success('⭐ 30 Hari Streak!', {
        description: 'SubhanAllah! Sebulan penuh dzikir beruntun!',
        duration: 10000,
      });
    } else if (streak === 100) {
      toast.success('💎 100 HARI STREAK!', {
        description: 'Allahuakbar! Pencapaian luar biasa! Semoga istiqomah.',
        duration: 15000,
      });
    } else if (streak % 50 === 0) {
      toast.success(`🌟 ${streak} Hari Streak!`, {
        description: 'Luar biasa! Terus pertahankan konsistensi Anda!',
        duration: 8000,
      });
    } else {
      toast.success(`🔥 Streak ${streak} Hari!`, {
        description: 'Alhamdulillah! Tetap semangat!',
        duration: 4000,
      });
    }
  };

  const showStreakBroken = (lastStreak: number) => {
    if (lastStreak >= 100) {
      toast.error('💔 STREAK 100+ HARI HANGUS!', {
        description: `Ya Allah... Streak ${lastStreak} hari terputus. Semangat mulai lagi!`,
        duration: 20000,
      });
    } else if (lastStreak >= 30) {
      toast.error('😢 Streak Terputus!', {
        description: `Sayang sekali... Streak ${lastStreak} hari hangus. Yuk mulai lagi!`,
        duration: 15000,
      });
    } else if (lastStreak >= 7) {
      toast.error('😔 Streak Hangus!', {
        description: `Streak ${lastStreak} hari terputus. Jangan menyerah, mulai lagi!`,
        duration: 10000,
      });
    } else if (lastStreak > 0) {
      toast.warning('Streak Terputus', {
        description: `Streak ${lastStreak} hari hangus. Ayo bangkit lagi!`,
        duration: 8000,
      });
    }
  };

  const resetStreak = () => {
    setStreakData(INITIAL_STREAK_DATA);
    setDailyCompletion({ morning: false, evening: false });
    localStorage.removeItem('dhikrStreak');
    localStorage.removeItem('dailyDhikrCompletion');
  };

  return (
    <StreakContext.Provider value={{ streakData, checkDhikrCompletion, resetStreak, getStreakStatus }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = (): StreakContextType => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
};
