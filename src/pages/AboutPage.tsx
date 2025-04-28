import React from 'react';
import { Github, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Info Aplikasi</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
              <Heart size={32} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Daily Dzikr</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Versi 1.0.0</p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
            Aplikasi untuk membantu Muslim menjalankan dzikir pagi dan petang dengan mudah
          </p>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Tentang Aplikasi</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Daily Dzikr adalah aplikasi yang dibuat untuk memudahkan Muslim untuk membaca dzikir pagi dan petang sesuai 
              dengan sunnah Rasulullah ﷺ. Aplikasi ini menyediakan teks dzikir dalam bahasa Arab, transliterasi, dan 
              terjemahan, serta dilengkapi dengan penjelasan tentang keutamaan (faedah) dari setiap dzikir.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Aplikasi ini dibuat dengan niat untuk menyebarkan kebaikan dan memudahkan umat Islam dalam beribadah. 
              Semoga bermanfaat dan menjadi amal jariyah bagi semua yang terlibat dalam pembuatan dan penggunaan aplikasi ini.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Referensi</h4>
          <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
            <li>• Hisnul Muslim (Benteng Muslim) karya Sa'id bin Ali bin Wahf Al-Qahthani</li>
            <li>• Dzikir Pagi Petang Sesuai Sunnah Nabi ﷺ</li>
          </ul>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Pengembang</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Aplikasi ini dikembangkan sebagai proyek open-source untuk memudahkan ibadah sehari-hari umat Islam.
            </p>
            
            <a 
              href="https://github.com/vektormuhammadlutfi/DailyDzikr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 mt-2"
            >
              <Github size={16} className="mr-1" />
              <span>Lihat di GitHub</span>
            </a>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Catatan Penting</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Aplikasi ini berusaha menyajikan dzikir-dzikir yang sesuai dengan sunnah, tetapi jika ada kesalahan, 
              itu murni karena kekhilafan pengembang. Silakan berikan masukan atau koreksi jika menemukan kesalahan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;