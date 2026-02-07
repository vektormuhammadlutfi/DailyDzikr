import React, { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { useDhikrProgress } from '../context/DhikrProgressContext';
import { useStreak } from '../context/StreakContext';
import { useDailyReading } from '../context/DailyReadingContext';
import { Moon, Sun, Type, Bell, Globe, Trash2, RotateCcw, Info, AlertTriangle, User, Target } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  const { resetProgress } = useDhikrProgress();
  const { resetStreak } = useStreak();
  const { setDailyTarget } = useDailyReading();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userName, setUserName] = useState(preferences.userName || '');
  const [dailyTarget, setDailyTargetInput] = useState(preferences.dailyReadingTarget?.toString() || '10');
  
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updatePreferences({ fontSize: size });
    toast.success('Ukuran huruf diubah');
  };

  const handleSaveUserName = () => {
    updatePreferences({ userName: userName.trim() || undefined });
    toast.success('Nama berhasil disimpan!');
  };

  const handleSaveDailyTarget = () => {
    const target = parseInt(dailyTarget) || 10;
    const validTarget = Math.max(1, Math.min(target, 604)); // 1-604 pages
    updatePreferences({ dailyReadingTarget: validTarget });
    setDailyTarget(validTarget);
    toast.success(`Target harian diubah menjadi ${validTarget} halaman!`);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    toast.success('Progress dzikir berhasil direset!');
  };

  const handleDeleteAllData = () => {
    resetProgress();
    resetStreak();
    localStorage.removeItem('userPreferences');
    localStorage.removeItem('installPromptDismissed');
    setShowDeleteConfirm(false);
    toast.success('Semua data berhasil dihapus!');
    setTimeout(() => window.location.reload(), 1000);
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Browser tidak mendukung notifikasi');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      toast.success('Notifikasi diaktifkan!');
    } else {
      toast.error('Notifikasi ditolak');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <span className="mr-2">⚙️</span>
        Pengaturan
      </h2>
      
      {/* Profil & Target */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-bold text-gray-800 dark:text-white">Profil & Target</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Nama Pengguna */}
          <div className="px-4 py-4">
            <div className="flex items-center mb-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-lg mr-3">
                <User size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Nama Anda</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Akan ditampilkan di halaman utama</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none"
              />
              <button
                onClick={handleSaveUserName}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>

          {/* Target Harian */}
          <div className="px-4 py-4">
            <div className="flex items-center mb-3">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-lg mr-3">
                <Target size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Target Membaca Harian</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Jumlah halaman Al-Qur'an per hari (1-604)</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="number"
                value={dailyTarget}
                onChange={(e) => setDailyTargetInput(e.target.value)}
                min="1"
                max="604"
                placeholder="10"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={handleSaveDailyTarget}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tampilan */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-bold text-gray-800 dark:text-white">Tampilan</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Mode Gelap/Terang */}
          <div className="px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-lg mr-3">
                {preferences.darkMode ? <Moon size={20} className="text-amber-600 dark:text-amber-400" /> : <Sun size={20} className="text-amber-600 dark:text-amber-400" />}
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Mode Tampilan</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pilih tema aplikasi</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => { updatePreferences({ darkMode: false }); toast.success('Mode terang diaktifkan'); }}
                className={`px-3 py-2 rounded-lg transition-all ${
                  !preferences.darkMode 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Sun size={18} />
              </button>
              <button
                onClick={() => { updatePreferences({ darkMode: true }); toast.success('Mode gelap diaktifkan'); }}
                className={`px-3 py-2 rounded-lg transition-all ${
                  preferences.darkMode 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Moon size={18} />
              </button>
            </div>
          </div>

          {/* Ukuran Font */}
          <div className="px-4 py-4">
            <div className="flex items-center mb-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-lg mr-3">
                <Type size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Ukuran Huruf Arab</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sesuaikan ukuran teks Arab</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleFontSizeChange('small')}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  preferences.fontSize === 'small' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Kecil
              </button>
              <button
                onClick={() => handleFontSizeChange('medium')}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  preferences.fontSize === 'medium' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Sedang
              </button>
              <button
                onClick={() => handleFontSizeChange('large')}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  preferences.fontSize === 'large' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Besar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-bold text-gray-800 dark:text-white">Konten</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Transliterasi */}
          <div className="px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg mr-3">
                <Type size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Transliterasi</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tampilkan cara baca latin</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.showTransliteration}
                onChange={() => {
                  updatePreferences({ showTransliteration: !preferences.showTransliteration });
                  toast.success(preferences.showTransliteration ? 'Transliterasi disembunyikan' : 'Transliterasi ditampilkan');
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Terjemahan */}
          <div className="px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-lg mr-3">
                <Globe size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Terjemahan</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tampilkan terjemahan Indonesia</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.showTranslation}
                onChange={() => {
                  updatePreferences({ showTranslation: !preferences.showTranslation });
                  toast.success(preferences.showTranslation ? 'Terjemahan disembunyikan' : 'Terjemahan ditampilkan');
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-bold text-gray-800 dark:text-white">Notifikasi</h3>
        </div>
        
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-lg mr-3">
                <Bell size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-white font-medium">Pengingat Dzikir</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Aktifkan notifikasi pengingat</p>
              </div>
            </div>
            
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors shadow-sm"
            >
              Aktifkan
            </button>
          </div>
        </div>
      </div>

      {/* Data & Reset */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-red-200 dark:border-red-900 overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 px-4 py-3 border-b border-red-200 dark:border-red-900">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center">
            <AlertTriangle size={18} className="text-red-600 dark:text-red-400 mr-2" />
            Zona Bahaya
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Reset Progress */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2.5 rounded-lg mr-3">
                  <RotateCcw size={20} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-gray-800 dark:text-white font-medium">Reset Progress</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hapus semua progress dzikir hari ini</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors shadow-sm"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Hapus Semua Data */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-2.5 rounded-lg mr-3">
                  <Trash2 size={20} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="text-gray-800 dark:text-white font-medium">Hapus Semua Data</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hapus progress, streak, dan pengaturan</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Aplikasi */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-bold text-gray-800 dark:text-white">Info Aplikasi</h3>
        </div>
        
        <div className="px-4 py-4">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-2.5 rounded-lg mr-3">
              <Info size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-800 dark:text-white font-medium">Daily Dzikr</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Versi 1.0.0</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">© 2025 Daily Dzikr. Semoga bermanfaat.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Reset Progress?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Semua progress dzikir hari ini akan dihapus. Streak tidak akan terpengaruh.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleResetProgress}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center mb-3">
              <AlertTriangle className="text-red-500 mr-2" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Hapus Semua Data?</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>Peringatan:</strong> Semua data termasuk progress, streak, dan pengaturan akan dihapus permanen. Tindakan ini tidak dapat dibatalkan!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAllData}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
