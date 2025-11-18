import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    const android = /android/.test(userAgent);
    const mobile = iOS || android || /mobile/.test(userAgent);
    
    setIsIOS(iOS);
    setIsMobile(mobile);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    const hasPromptBeenDismissed = localStorage.getItem('installPromptDismissed');

    // Don't show if already installed or dismissed
    if (isStandalone) {
      console.log('App already installed in standalone mode');
      return;
    }

    if (hasPromptBeenDismissed) {
      console.log('Install prompt was dismissed before');
      return;
    }

    // Handle beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show prompt after 2 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For mobile browsers (including iOS), always show install instructions after delay
    if (mobile && !isStandalone) {
      console.log('Mobile detected, will show install prompt');
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white rounded-xl shadow-2xl p-4 border-2 border-emerald-400 dark:border-emerald-500">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        <div className="flex items-start space-x-3 mb-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Download size={24} />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="font-bold text-lg mb-1">Install Daily Dzikr</h3>
            <p className="text-sm opacity-90">
              Tambahkan ke layar utama untuk akses lebih cepat & offline!
            </p>
          </div>
        </div>

        {deferredPrompt ? (
          // Android/Chrome Install Button
          <button
            onClick={handleInstallClick}
            className="w-full bg-white text-emerald-600 font-bold py-2.5 px-4 rounded-lg hover:bg-emerald-50 transition-colors shadow-md"
          >
            Install Sekarang
          </button>
        ) : isIOS ? (
          // iOS Install Instructions
          <div className="bg-white/10 rounded-lg p-3 text-sm">
            <p className="mb-2 font-semibold">📱 Cara install di iPhone/iPad:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs opacity-90">
              <li>Tap tombol <span className="font-bold">Share</span> <span className="text-lg">⎋</span> di bawah</li>
              <li>Scroll dan pilih <span className="font-bold">"Add to Home Screen"</span> <span className="text-lg">➕</span></li>
              <li>Tap <span className="font-bold">"Add"</span> di pojok kanan atas</li>
            </ol>
          </div>
        ) : isMobile ? (
          // Generic mobile instructions
          <div className="bg-white/10 rounded-lg p-3 text-sm">
            <p className="mb-2 font-semibold">📱 Cara install:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs opacity-90">
              <li>Buka <span className="font-bold">menu browser</span> (titik tiga ⋮)</li>
              <li>Pilih <span className="font-bold">"Tambahkan ke layar utama"</span> atau <span className="font-bold">"Install app"</span></li>
              <li>Tap <span className="font-bold">"Tambah"</span> atau <span className="font-bold">"Install"</span></li>
            </ol>
          </div>
        ) : (
          // Desktop fallback
          <div className="bg-white/10 rounded-lg p-3 text-sm text-center opacity-90">
            <p>Buka di browser mobile untuk install aplikasi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;
