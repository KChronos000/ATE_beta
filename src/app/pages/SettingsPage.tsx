import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Bell, MapPin, Moon, Globe, ChevronRight, Languages } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLocation } from '../context/LocationContext';
import { useLanguage, languages } from '../context/LanguageContext';
import { toast } from 'sonner';

export function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = useApp();
  const { userLocation, locationError, isLoadingLocation, requestLocation } = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // ✅ 1. เพิ่ม useEffect เพื่อควบคุมการเปิด-ปิด Dark Mode บนแท็ก <html> จริง
  useEffect(() => {
    if (localSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [localSettings.darkMode]);

  const handleToggle = (key: keyof typeof localSettings) => {
    const newSettings = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(newSettings);
    setSettings(newSettings);

    // ✅ 2. แก้ไขตรรกะให้เช็กจากค่าใหม่ (newSettings) ป้องกันบั๊กเปิดตำแหน่งซ้ำตอนกดปิด
    if (key === 'locationServices' && newSettings.locationServices) {
      requestLocation();
    }
  };

  useEffect(() => {
    if (locationError) {
      toast.error('Location Error', {
        description: locationError,
      });
    } else if (userLocation) {
      toast.success('Location Updated', {
        description: `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`,
      });
    }
  }, [locationError, userLocation]);

  const handleDistanceChange = (distance: 'km' | 'mi') => {
    const newSettings = { ...localSettings, distance };
    setLocalSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    // ✅ เพิ่ม bg-gray-50 dark:bg-gray-900 และ transition เพื่อให้เวลาเปลี่ยนธีมแล้วสีพื้นหลังนุ่มนวลขึ้น
    <div className="size-full overflow-auto p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
        >
          <Globe size={20} />
          <span className="text-sm">← {t('home')}</span>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-orange-600 dark:text-orange-500 mb-1">{t('settings')}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{t('customizeExperience')}</p>
        </div>

        <div className="space-y-4">
          {/* Profile Link */}
          <Link
            to="/profile"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-2 border-orange-100 dark:border-gray-700 flex items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-950 p-3 rounded-full">
                <Globe className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-gray-200">{t('profile')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('manageAccount')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
          </Link>

          {/* Food Preferences Link */}
          <Link
            to="/preferences"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-2 border-orange-100 dark:border-gray-700 flex items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 dark:bg-pink-950 p-3 rounded-full">
                <Globe className="text-pink-600 dark:text-pink-400" size={20} />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-gray-200">{t('foodPreferences')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('dietaryAllergies')}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
          </Link>

          {/* App Settings Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-2 border-orange-100 dark:border-gray-700">
            <h3 className="text-orange-600 dark:text-orange-400 mb-4">{t('appSettings')}</h3>

            <div className="space-y-4">
              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">{t('pushNotifications')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('getDealsUpdates')}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    localSettings.notifications ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      localSettings.notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Location Services */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <MapPin className={`${isLoadingLocation ? 'text-orange-500 animate-pulse' : 'text-gray-600 dark:text-gray-400'}`} size={20} />
                    <div>
                      <p className="text-gray-800 dark:text-gray-200">{t('locationServices')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isLoadingLocation ? t('gettingLocation') : userLocation ? `Lat: ${userLocation.lat.toFixed(2)}, Lng: ${userLocation.lng.toFixed(2)}` : t('findNearbyRestaurants')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('locationServices')}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      localSettings.locationServices ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        localSettings.locationServices ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {localSettings.locationServices && !userLocation && !isLoadingLocation && (
                  <button
                    onClick={requestLocation}
                    className="w-full text-sm bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-3 py-2 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900 transition-colors"
                  >
                    {t('enableLocationAccess')}
                  </button>
                )}
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">{t('darkMode')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('toggleDarkTheme')}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    localSettings.darkMode ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      localSettings.darkMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Distance Unit Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-2 border-orange-100 dark:border-gray-700">
            <h3 className="text-orange-600 dark:text-orange-400 mb-4">{t('distanceUnit')}</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleDistanceChange('mi')}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  localSettings.distance === 'mi'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-orange-300'
                }`}
              >
                Miles (mi)
              </button>
              <button
                onClick={() => handleDistanceChange('km')}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  localSettings.distance === 'km'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-orange-300'
                }`}
              >
                Kilometers (km)
              </button>
            </div>
          </div>

          {/* Language Selection Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-2 border-purple-100 dark:border-purple-950">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="text-purple-600 dark:text-purple-400" size={20} />
              <h3 className="text-purple-600 dark:text-purple-400">{t('language')}</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('selectLanguage')}</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    language === lang.code
                      ? 'bg-purple-500 text-white border-purple-500 shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  }`}
                >
                  <p className="text-sm font-medium">{lang.nativeName}</p>
                  <p className={`text-xs ${language === lang.code ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {lang.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* About Box */}
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-950 dark:to-orange-950 rounded-xl p-4 border-2 border-orange-200 dark:border-orange-900">
            <h4 className="text-orange-700 dark:text-orange-300 mb-2">{t('about')}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{t('version')} 1.0.0</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">© 2026 ATE! - Find your next meal</p>
          </div>
        </div>
      </div>
    </div>
  );
}