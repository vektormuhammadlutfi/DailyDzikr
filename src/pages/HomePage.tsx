import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, HandHeart } from 'lucide-react';
import PrayerTimeAlert from '../components/PrayerTimeAlert';
import NearbyMosques from '../components/NearbyMosques';
import StreakDisplay from '../components/StreakDisplay';
import InstallPrompt from '../components/InstallPrompt';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* PWA Install Prompt */}
      <InstallPrompt />
      
      <div className="container mx-auto px-4 py-8 mb-16">

        {/* Prayer Time Alert Box */}
        <div className="mb-6">
          <PrayerTimeAlert />
        </div>

        {/* Nearby Mosques Map */}
        <div className="mb-8">
          <NearbyMosques />
        </div>

        {/* Streak Display */}
        <div className="mb-8">
          <StreakDisplay />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/morning" 
            className="group flex items-center p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Dzikir Pagi</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Dibaca setelah Sholat Subuh hingga terbit matahari</p>
            </div>
          </Link>
          
          <Link 
            to="/evening" 
            className="group flex items-center p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <Moon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Dzikir Petang</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Dibaca setelah Sholat Ashar hingga terbenam matahari</p>
            </div>
          </Link>
          
          <Link 
            to="/after-prayer" 
            className="group flex items-center p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <HandHeart className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Dzikir Setelah Shalat</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Dibaca setiap selesai shalat fardhu (5 waktu)</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="mr-2">\ud83d\udcda</span>
            Tentang Dzikir
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Dzikir adalah bentuk mengingat Allah. Dalam Al-Qur'an, Allah berfirman:
          </p>
          <blockquote className="italic border-l-4 border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 pl-4 pr-3 py-3 mb-4 rounded-r-lg text-gray-700 dark:text-gray-300">
            "Karena itu, ingatlah kamu kepada-Ku niscaya Aku ingat (pula) kepadamu, dan bersyukurlah kepada-Ku, dan janganlah kamu mengingkari (nikmat)-Ku." (Al-Baqarah: 152)
          </blockquote>
          <p className="text-gray-700 dark:text-gray-300">
            Rasulullah ﷺ juga mengajarkan dzikir sebagai bentuk ibadah yang besar pahalanya dan mudah dilaksanakan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
