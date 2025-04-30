import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface DhikrProgress {
  [id: string]: {
    count: number;
    lastUpdated: string;
  };
}

interface ProgressContextType {
  progress: DhikrProgress;
  updateProgress: (id: string, count: number) => void;
  resetProgress: (time?: 'morning' | 'evening') => void;
  checkAndResetDaily: () => void;
}

const DhikrProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const DhikrProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<DhikrProgress>(() => {
    const savedProgress = localStorage.getItem('dhikrProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  const checkAndResetDaily = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const lastReset = localStorage.getItem('lastProgressReset');

    if (lastReset !== today) {
      resetProgress();
      localStorage.setItem('lastProgressReset', today);
      toast.info('Progress dzikir telah diperbarui untuk hari ini', {
        description: 'Mari mulai hari dengan dzikir pagi 🌅'
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('dhikrProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    checkAndResetDaily();
    
    // Set up smart reminders based on time
    const now = new Date();
    const hours = now.getHours();

    if (hours === 5) {
      toast.info('Waktu dzikir pagi telah tiba', {
        description: 'Yuk, mulai hari dengan dzikir pagi 🌅'
      });
    } else if (hours === 15) {
      toast.info('Waktu dzikir petang telah tiba', {
        description: 'Jangan lupa dzikir petang hari ini 🌅'
      });
    }
  }, []);

  const updateProgress = (id: string, count: number) => {
    setProgress(prev => ({
      ...prev,
      [id]: {
        count,
        lastUpdated: new Date().toISOString()
      }
    }));

    // Show encouraging messages
    if (count === 33) {
      toast.success('Alhamdulillah! Sepertiga dzikir selesai 🌟');
    } else if (count === 66) {
      toast.success('MasyaAllah! Dua pertiga dzikir selesai ✨');
    } else if (count === 99) {
      toast.success('Subhanallah! Hampir selesai, semangat! 💫');
    } else if (count === 100) {
      toast.success('Alhamdulillah! Dzikir selesai 🎉', {
        description: 'Semoga Allah menerima amal ibadah kita'
      });
    }
  };

  const resetProgress = (time?: 'morning' | 'evening') => {
    if (time) {
      const newProgress = { ...progress };
      Object.keys(newProgress).forEach(key => {
        // Define the data object and type for dzikr
        const data = {
          dzikr: [
            { id: 1, time: 'morning' },
            { id: 2, time: 'evening' }
          ]
        };
        
                if (data.dzikr.find((d: { id: number; time: string }) => d.id.toString() === key && d.time === time)) {
          delete newProgress[key];
        }
      });
      setProgress(newProgress);
    } else {
      setProgress({});
    }
  };

  return (
    <DhikrProgressContext.Provider value={{ progress, updateProgress, resetProgress, checkAndResetDaily }}>
      {children}
    </DhikrProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(DhikrProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a DhikrProgressProvider');
  }
  return context;
};
