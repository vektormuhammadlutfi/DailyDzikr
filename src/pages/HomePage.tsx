import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, HandHeart } from 'lucide-react';
import PrayerTimeAlert from '../components/PrayerTimeAlert';
import NearbyMosques from '../components/NearbyMosques';

const HomePage: React.FC = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const isMorning = currentHour >= 4 && currentHour < 12;
  
  const suggestedDhikr = isMorning ? 'morning' : 'evening';
  const suggestedDhikrLabel = isMorning ? 'Dzikir Pagi' : 'Dzikir Petang';
  const suggestedIcon = isMorning ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />;

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/masjid-bg.jpg')` }}>
      <div className="container mx-auto px-4 py-8 mb-16">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            Daily Dzikr
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            Aplikasi Dzikir Pagi dan Petang untuk membantu Anda mengingat Allah di pagi dan petang hari
          </p>
        </div>

        {/* Prayer Time Alert Box */}
        <div className="mb-6">
          <PrayerTimeAlert />
        </div>

        {/* Nearby Mosques Map */}
        <div className="mb-8">
          <NearbyMosques />
        </div>
          
        <div className="w-full max-w-3xl mx-auto bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800 mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Berdasarkan waktu saat ini, kami menyarankan:
          </p>
          <Link 
            to={`/${suggestedDhikr}`}
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-md transition-colors duration-200 w-full"
          >
            {suggestedIcon}
            <span>{suggestedDhikrLabel}</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/morning" 
            className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
          >
            <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-800 p-3 rounded-full">
              <Sun className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Dzikir Pagi</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dibaca setelah Sholat Subuh hingga terbit matahari</p>
            </div>
          </Link>
          
          <Link 
            to="/evening" 
            className="flex items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
          >
            <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
              <Moon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Dzikir Petang</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dibaca setelah Sholat Ashar hingga terbenam matahari</p>
            </div>
          </Link>
          
          <Link 
            to="/after-prayer" 
            className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-800 p-3 rounded-full">
              <HandHeart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Dzikir Setelah Shalat</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dibaca setiap selesai shalat fardhu (5 waktu)</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Tentang Dzikir</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Dzikir adalah bentuk mengingat Allah. Dalam Al-Qur'an, Allah berfirman:
          </p>
          <blockquote className="italic border-l-4 border-emerald-500 pl-4 py-2 mb-4 text-gray-700 dark:text-gray-300">
            "Karena itu, ingatlah kamu kepada-Ku niscaya Aku ingat (pula) kepadamu, dan bersyukurlah kepada-Ku, dan janganlah kamu mengingkari (nikmat)-Ku." (Al-Baqarah: 152)
          </blockquote>
          <p className="text-gray-600 dark:text-gray-400">
            Rasulullah ﷺ juga mengajarkan dzikir sebagai bentuk ibadah yang besar pahalanya dan mudah dilaksanakan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
