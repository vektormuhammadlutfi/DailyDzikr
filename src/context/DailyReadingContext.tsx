import React, { createContext, useContext, useState, useEffect } from 'react';
import { DailyReading } from '../types';

interface DailyReadingContextType {
  todayReading: DailyReading;
  updatePagesRead: (pages: number) => void;
  incrementPages: () => void;
  setDailyTarget: (target: number) => void;
}

const DailyReadingContext = createContext<DailyReadingContextType | undefined>(undefined);

export const DailyReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [todayReading, setTodayReading] = useState<DailyReading>(() => {
    const saved = localStorage.getItem('dailyReading');
    const todayStr = getTodayString();
    
    if (saved) {
      const parsed: DailyReading = JSON.parse(saved);
      // If it's a new day, reset the reading
      if (parsed.date !== todayStr) {
        return {
          date: todayStr,
          pagesRead: 0,
          target: parsed.target || 10
        };
      }
      return parsed;
    }
    
    return {
      date: todayStr,
      pagesRead: 0,
      target: 10
    };
  });

  useEffect(() => {
    localStorage.setItem('dailyReading', JSON.stringify(todayReading));
  }, [todayReading]);

  const updatePagesRead = (pages: number) => {
    setTodayReading(prev => ({
      ...prev,
      pagesRead: Math.max(0, Math.min(pages, 604)) // Max 604 pages (Al-Quran)
    }));
  };

  const incrementPages = () => {
    setTodayReading(prev => ({
      ...prev,
      pagesRead: Math.min(prev.pagesRead + 1, 604)
    }));
  };

  const setDailyTarget = (target: number) => {
    setTodayReading(prev => ({
      ...prev,
      target: Math.max(1, Math.min(target, 604))
    }));
  };

  return (
    <DailyReadingContext.Provider value={{ 
      todayReading, 
      updatePagesRead, 
      incrementPages,
      setDailyTarget 
    }}>
      {children}
    </DailyReadingContext.Provider>
  );
};

export const useDailyReading = (): DailyReadingContextType => {
  const context = useContext(DailyReadingContext);
  if (context === undefined) {
    throw new Error('useDailyReading must be used within a DailyReadingProvider');
  }
  return context;
};
