import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Bell, MapPin, Moon, Globe, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleToggle = (key: keyof typeof localSettings) => {
    const newSettings = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(newSettings);
    setSettings(newSettings);
  };

  const handleDistanceChange = (distance: 'km' | 'mi') => {
    const newSettings = { ...localSettings, distance };
    setLocalSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <div className="size-full overflow-auto p-4">
      <div className="w-full">
        <div className="text-center mb-6">
          <h2 className="text-orange-600 mb-1">Settings</h2>
          <p className="text-gray-600 text-sm">Customize your ATE! experience</p>
        </div>

        <div className="space-y-4">
          <Link
            to="/profile"
            className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <Globe className="text-orange-600" size={20} />
              </div>
              <div>
                <h4 className="text-gray-800">Profile</h4>
                <p className="text-sm text-gray-500">Manage your account</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </Link>

          <Link
            to="/preferences"
            className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-3 rounded-full">
                <Globe className="text-pink-600" size={20} />
              </div>
              <div>
                <h4 className="text-gray-800">Food Preferences</h4>
                <p className="text-sm text-gray-500">Dietary & allergies</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </Link>

          <div className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100">
            <h3 className="text-orange-600 mb-4">App Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-600" size={20} />
                  <div>
                    <p className="text-gray-800">Push Notifications</p>
                    <p className="text-xs text-gray-500">Get deals and updates</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    localSettings.notifications ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      localSettings.notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-600" size={20} />
                  <div>
                    <p className="text-gray-800">Location Services</p>
                    <p className="text-xs text-gray-500">Find nearby restaurants</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('locationServices')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    localSettings.locationServices ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      localSettings.locationServices ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="text-gray-600" size={20} />
                  <div>
                    <p className="text-gray-800">Dark Mode</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  disabled
                  className={`relative w-14 h-8 rounded-full transition-colors opacity-50 cursor-not-allowed ${
                    localSettings.darkMode ? 'bg-orange-500' : 'bg-gray-300'
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

          <div className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-100">
            <h3 className="text-orange-600 mb-4">Distance Unit</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleDistanceChange('mi')}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  localSettings.distance === 'mi'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                Miles (mi)
              </button>
              <button
                onClick={() => handleDistanceChange('km')}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  localSettings.distance === 'km'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                Kilometers (km)
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
            <h4 className="text-orange-700 mb-2">About ATE!</h4>
            <p className="text-sm text-gray-700 mb-2">Version 1.0.0</p>
            <p className="text-xs text-gray-600">© 2026 ATE! - Find your next meal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
