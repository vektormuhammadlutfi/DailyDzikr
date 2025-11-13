import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Bell } from 'lucide-react';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

interface PrayerTime {
  name: string;
  time: Date;
  displayName: string;
}

const PrayerTimeAlert: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [timeUntilPrayer, setTimeUntilPrayer] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [locationName, setLocationName] = useState<string>('');

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // Get location name using reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || data.address.county;
              const country = data.address.country;
              setLocationName(`${city}, ${country}`);
            })
            .catch(() => setLocationName('Lokasi Anda'));
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Jakarta if location is denied
          setLocation({ latitude: -6.2088, longitude: 106.8456 });
          setLocationName('Jakarta, Indonesia');
        }
      );
    } else {
      // Default to Jakarta
      setLocation({ latitude: -6.2088, longitude: 106.8456 });
      setLocationName('Jakarta, Indonesia');
    }
  }, []);

  // Calculate prayer times
  useEffect(() => {
    if (!location) return;

    const coordinates = new Coordinates(location.latitude, location.longitude);
    const params = CalculationMethod.MuslimWorldLeague();
    params.madhab = 'shafi'; // Set madhab to Shafi
    
    const date = new Date();
    const prayers = new PrayerTimes(coordinates, date, params);

    const times: PrayerTime[] = [
      { name: 'fajr', time: prayers.fajr, displayName: 'Subuh' },
      { name: 'dhuhr', time: prayers.dhuhr, displayName: 'Dzuhur' },
      { name: 'asr', time: prayers.asr, displayName: 'Ashar' },
      { name: 'maghrib', time: prayers.maghrib, displayName: 'Maghrib' },
      { name: 'isha', time: prayers.isha, displayName: 'Isya' },
    ];

    setPrayerTimes(times);
  }, [location]);

  // Find next prayer and update countdown
  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateNextPrayer = () => {
      const now = new Date();
      
      // Find next prayer
      let next = prayerTimes.find(prayer => prayer.time > now);
      
      // If no prayer found today, use Fajr from tomorrow
      if (!next && location) {
        const coordinates = new Coordinates(location.latitude, location.longitude);
        const params = CalculationMethod.MuslimWorldLeague();
        params.madhab = 'shafi';
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const prayers = new PrayerTimes(coordinates, tomorrow, params);
        next = { name: 'fajr', time: prayers.fajr, displayName: 'Subuh' };
      }

      if (next) {
        setNextPrayer(next);
        
        const diff = next.time.getTime() - now.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        // Show alert if less than 5 minutes
        setShowAlert(minutes < 5 && minutes >= 0);
        
        if (minutes < 0) {
          setTimeUntilPrayer('Waktu shalat telah tiba');
        } else if (minutes === 0) {
          setTimeUntilPrayer(`${seconds} detik lagi`);
        } else if (minutes < 60) {
          setTimeUntilPrayer(`${minutes} menit ${seconds} detik lagi`);
        } else {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          setTimeUntilPrayer(`${hours} jam ${mins} menit lagi`);
        }
      }
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, location]);

  if (!location || !nextPrayer) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Clock className="animate-spin" size={20} />
          <span>Memuat waktu shalat...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Alert Box - 5 minutes before prayer */}
      {showAlert && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-4 shadow-lg animate-pulse">
          <div className="flex items-start space-x-3">
            <Bell size={24} className="flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Waktu Shalat Segera Tiba!</h3>
              <p className="text-sm opacity-90">
                Shalat <span className="font-semibold">{nextPrayer.displayName}</span> akan dimulai dalam{' '}
                <span className="font-bold">{timeUntilPrayer}</span>
              </p>
              <p className="text-xs mt-2 opacity-75">Segera bersiap untuk melaksanakan shalat 🕌</p>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times Box */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin size={18} />
            <span className="text-sm opacity-90">{locationName}</span>
          </div>
          <Clock size={18} />
        </div>

        <div className="mb-6">
          <h3 className="text-sm opacity-90 mb-1">Waktu Shalat Berikutnya</h3>
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-bold">{nextPrayer.displayName}</span>
            <span className="text-2xl font-semibold">
              {nextPrayer.time.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          <p className="text-sm mt-2 opacity-90">{timeUntilPrayer}</p>
        </div>

        {/* All Prayer Times */}
        <div className="grid grid-cols-5 gap-2 pt-4 border-t border-white/20">
          {prayerTimes.map((prayer) => {
            const isNext = prayer.name === nextPrayer.name;
            return (
              <div
                key={prayer.name}
                className={`text-center p-2 rounded ${
                  isNext ? 'bg-white/20' : 'bg-white/10'
                }`}
              >
                <div className="text-xs opacity-90 mb-1">{prayer.displayName}</div>
                <div className={`text-sm font-semibold ${isNext ? 'font-bold' : ''}`}>
                  {prayer.time.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PrayerTimeAlert;
