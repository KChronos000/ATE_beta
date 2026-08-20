import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Save, LogOut, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, logout, settings, setPreferences } = useApp();
  const { t } = useLanguage();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [location, setLocation] = useState(user.location || '');

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate('/login');
    }
  }, [user.isLoggedIn, navigate]);

  const handleSave = () => {
    setUser({
      ...user,
      name,
      email,
      phone,
      location,
    });
  };

  const handleLogout = () => {
    // รวมลอจิกการเคลียร์ค่า Preferences เมื่อสั่ง Sign Out
    setPreferences({
      dietary: [],
      allergies: [],
      cuisines: [],
      priceRange: [1, 2, 3],
      priceMin: 5,
      priceMax: 50
    });
    logout();
    navigate('/login');
  };

  return (
    <div className="size-full overflow-auto p-4">
      <div className="w-full">
        <button
          onClick={() => navigate(-1)}
          className={`mb-4 flex items-center gap-2 transition-colors ${
            settings.darkMode
              ? 'text-violet-400 hover:text-violet-300'
              : 'text-orange-600 hover:text-orange-700'
          }`}
        >
          <User size={20} />
          <span className="text-sm">← {t('goBack')}</span>
        </button>

        <div className="text-center mb-6">
          <h2 className={settings.darkMode ? 'text-violet-300 mb-1' : 'text-orange-600 mb-1'}>{t('profile')}</h2>
          <p className={`text-sm ${settings.darkMode ? 'text-purple-300' : 'text-gray-600'}`}>{t('manageAccountInfo')}</p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 mb-6 border-2 ${
          settings.darkMode
            ? 'bg-purple-900 border-purple-700'
            : 'bg-white border-orange-200'
        }`}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl ${
                settings.darkMode
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600'
                  : 'bg-gradient-to-br from-pink-400 to-orange-400'
              }`}>
                {name.charAt(0).toUpperCase() || 'U'}
              </div>
              <button className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg border-2 transition-colors ${
                settings.darkMode
                  ? 'bg-purple-950 border-purple-600 hover:bg-purple-900'
                  : 'bg-white border-orange-300 hover:bg-orange-50'
              }`}>
                <Camera size={16} className={settings.darkMode ? 'text-violet-400' : 'text-orange-600'} />
              </button>
            </div>
            <h3 className={settings.darkMode ? 'text-purple-100' : 'text-gray-800'}>{name || 'User'}</h3>
            <p className={`text-sm ${settings.darkMode ? 'text-purple-300' : 'text-gray-500'}`}>{email}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block mb-2 flex items-center gap-2 ${settings.darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                <User size={16} className={settings.darkMode ? 'text-violet-400' : 'text-orange-500'} />
                {t('fullName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  settings.darkMode
                    ? 'bg-purple-950 border-purple-700 text-purple-100 focus:border-violet-500'
                    : 'border-orange-200 focus:border-orange-500'
                }`}
                placeholder={t('enterName')}
              />
            </div>

            <div>
              <label className={`block mb-2 flex items-center gap-2 ${settings.darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                <Mail size={16} className={settings.darkMode ? 'text-violet-400' : 'text-orange-500'} />
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  settings.darkMode
                    ? 'bg-purple-950 border-purple-700 text-purple-100 focus:border-violet-500'
                    : 'border-orange-200 focus:border-orange-500'
                }`}
                placeholder={t('enterEmail')}
              />
            </div>

            <div>
              <label className={`block mb-2 flex items-center gap-2 ${settings.darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                <Phone size={16} className={settings.darkMode ? 'text-violet-400' : 'text-orange-500'} />
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  settings.darkMode
                    ? 'bg-purple-950 border-purple-700 text-purple-100 focus:border-violet-500'
                    : 'border-orange-200 focus:border-orange-500'
                }`}
                placeholder={t('phoneNumber')}
              />
            </div>

            <div>
              <label className={`block mb-2 flex items-center gap-2 ${settings.darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                <MapPin size={16} className={settings.darkMode ? 'text-violet-400' : 'text-orange-500'} />
                {t('location')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  settings.darkMode
                    ? 'bg-purple-950 border-purple-700 text-purple-100 focus:border-violet-500'
                    : 'border-orange-200 focus:border-orange-500'
                }`}
                placeholder={t('location')}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`w-full mt-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 text-white ${
              settings.darkMode
                ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600'
                : 'bg-gradient-to-r from-pink-500 via-orange-500 to-red-500'
            }`}
          >
            <Save size={20} />
            {t('saveChanges')}
          </button>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 mb-6 border-2 ${
          settings.darkMode
            ? 'bg-purple-900 border-blue-700'
            : 'bg-white border-yellow-200'
        }`}>
          <h3 className={settings.darkMode ? 'text-blue-300 mb-4' : 'text-yellow-700 mb-4'}>{t('accountStats')}</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className={`p-3 rounded-xl ${settings.darkMode ? 'bg-fuchsia-900' : 'bg-pink-50'}`}>
              <p className={`text-2xl ${settings.darkMode ? 'text-fuchsia-300' : 'text-pink-600'}`}>24</p>
              <p className={`text-xs ${settings.darkMode ? 'text-purple-300' : 'text-gray-600'}`}>{t('favorites')}</p>
            </div>
            <div className={`p-3 rounded-xl ${settings.darkMode ? 'bg-violet-900' : 'bg-orange-50'}`}>
              <p className={`text-2xl ${settings.darkMode ? 'text-violet-300' : 'text-orange-600'}`}>12</p>
              <p className={`text-xs ${settings.darkMode ? 'text-purple-300' : 'text-gray-600'}`}>{t('reviews')}</p>
            </div>
            <div className={`p-3 rounded-xl ${settings.darkMode ? 'bg-blue-900' : 'bg-yellow-50'}`}>
              <p className={`text-2xl ${settings.darkMode ? 'text-blue-300' : 'text-yellow-600'}`}>8</p>
              <p className={`text-xs ${settings.darkMode ? 'text-purple-300' : 'text-gray-600'}`}>{t('dealsUsed')}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={`w-full py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border-2 ${
            settings.darkMode
              ? 'bg-rose-950 text-rose-300 hover:bg-rose-900 border-rose-800'
              : 'bg-red-100 text-red-600 hover:bg-red-200 border-red-200'
          }`}
        >
          <LogOut size={20} />
          {t('signOut')}
        </button>
      </div>
    </div>
  );
}
