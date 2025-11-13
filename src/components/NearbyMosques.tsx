import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom mosque icon
const mosqueIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNTk2NjkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMnY2Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSIyIi8+PHBhdGggZD0iTTYgMTJoMTJ2NmEyIDIgMCAwIDEtMiAySDhhMiAyIDAgMCAxLTItMnYtNnoiLz48cGF0aCBkPSJNMiAxMmg0Ii8+PHBhdGggZD0iTTE4IDEyaDQiLz48L3N2Zz4=',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzI2MjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMTB2OGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMnYtOCIvPjxwYXRoIGQ9Ik0xMiAxNHYtNCIvPjxwYXRoIGQ9Ik0xMiAyYTMgMyAwIDAgMCAzIDMgMyAzIDAgMCAxIDMgM3YxYTIgMiAwIDAgMS0yIDJIMmEyIDIgMCAwIDEtMi0yVjhhMyAzIDAgMCAxIDMtMyAzIDMgMCAwIDAgMy0zeiIvPjwvc3ZnPg==',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

interface Mosque {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distance?: number;
}

// Component to recenter map when location changes
const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const NearbyMosques: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [radius, setRadius] = useState(1000); // 1km default

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Tidak dapat mengakses lokasi. Pastikan izin lokasi diaktifkan.');
          // Default to Jakarta
          setLocation({ latitude: -6.2088, longitude: 106.8456 });
        }
      );
    } else {
      setError('Browser tidak mendukung geolocation.');
      setLocation({ latitude: -6.2088, longitude: 106.8456 });
    }
  }, []);

  // Fetch nearby mosques using Overpass API
  useEffect(() => {
    if (!location) return;

    setLoading(true);
    setError('');

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${location.latitude},${location.longitude});
        way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${location.latitude},${location.longitude});
      );
      out center;
    `;

    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    })
      .then((res) => res.json())
      .then((data) => {
        const mosqueList: Mosque[] = data.elements.map((element: any) => {
          const lat = element.lat || element.center?.lat;
          const lon = element.lon || element.center?.lon;
          const name = element.tags?.name || 'Masjid';
          
          // Calculate distance
          const distance = calculateDistance(
            location.latitude,
            location.longitude,
            lat,
            lon
          );

          return {
            id: element.id.toString(),
            name,
            lat,
            lon,
            distance,
          };
        });

        // Sort by distance
        mosqueList.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        setMosques(mosqueList);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching mosques:', err);
        setError('Gagal memuat data masjid. Silakan coba lagi.');
        setLoading(false);
      });
  }, [location, radius]);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };

  if (!location) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Navigation className="animate-spin" size={20} />
          <span>Memuat lokasi...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              Masjid Terdekat ({mosques.length})
            </h3>
          </div>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value={500}>500m</option>
            <option value={1000}>1km</option>
            <option value={2000}>2km</option>
            <option value={5000}>5km</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="animate-spin mx-auto mb-2" size={24} />
            <p className="text-sm text-gray-500">Mencari masjid terdekat...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Map */}
          <div className="h-64 relative">
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap center={[location.latitude, location.longitude]} />
              
              {/* User location */}
              <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
                <Popup>
                  <strong>Lokasi Anda</strong>
                </Popup>
              </Marker>

              {/* Search radius */}
              <Circle
                center={[location.latitude, location.longitude]}
                radius={radius}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
              />

              {/* Mosques */}
              {mosques.map((mosque) => (
                <Marker key={mosque.id} position={[mosque.lat, mosque.lon]} icon={mosqueIcon}>
                  <Popup>
                    <div className="p-1">
                      <strong>{mosque.name}</strong>
                      {mosque.distance && (
                        <p className="text-xs text-gray-600 mt-1">
                          ~{mosque.distance.toFixed(2)} km
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* List of mosques */}
          <div className="p-4 max-h-64 overflow-y-auto">
            {mosques.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-4">
                Tidak ada masjid ditemukan dalam radius {radius}m
              </p>
            ) : (
              <div className="space-y-2">
                {mosques.slice(0, 5).map((mosque, index) => (
                  <div
                    key={mosque.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                        {mosque.name}
                      </p>
                      {mosque.distance && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ~{mosque.distance.toFixed(2)} km dari lokasi Anda
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NearbyMosques;
