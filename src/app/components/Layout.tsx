import { Outlet, Link, useLocation } from 'react-router';
import { Home, Bell, Settings, Dices } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function Layout() {
  const location = useLocation();
  const { settings } = useApp();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`h-screen w-screen max-w-md mx-auto flex flex-col relative ${
      settings.darkMode
        ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950'
        : 'bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50'
    }`}>
      <header className={`p-4 shadow-lg flex-shrink-0 ${
        settings.darkMode
          ? 'bg-gradient-to-r from-purple-900 via-fuchsia-900 to-rose-900'
          : 'bg-gradient-to-r from-pink-500 via-orange-500 to-red-500'
      }`}>
        <h1 className="text-white text-center">{t('appName')}</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <nav className={`border-t-2 flex items-center justify-around p-3 shadow-lg flex-shrink-0 safe-area-inset-bottom ${
        settings.darkMode
          ? 'bg-purple-950 border-purple-800'
          : 'bg-white border-orange-300'
      }`}>
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/')
              ? settings.darkMode ? 'bg-violet-800 text-violet-300' : 'bg-orange-100 text-orange-600'
              : settings.darkMode ? 'text-purple-300 hover:bg-purple-900' : 'text-gray-600 hover:bg-orange-50'
          }`}
        >
          <Home size={24} />
          <span className="text-xs">{t('home')}</span>
        </Link>

        <Link
          to="/spin"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/spin')
              ? settings.darkMode ? 'bg-fuchsia-800 text-fuchsia-300' : 'bg-pink-100 text-pink-600'
              : settings.darkMode ? 'text-purple-300 hover:bg-purple-900' : 'text-gray-600 hover:bg-pink-50'
          }`}
        >
          <Dices size={24} />
          <span className="text-xs">{t('spin')}</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/notifications')
              ? settings.darkMode ? 'bg-rose-800 text-rose-300' : 'bg-red-100 text-red-600'
              : settings.darkMode ? 'text-purple-300 hover:bg-purple-900' : 'text-gray-600 hover:bg-red-50'
          }`}
        >
          <Bell size={24} />
          <span className="text-xs">{t('deals')}</span>
        </Link>

        <Link
          to="/settings"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/settings') || isActive('/preferences') || isActive('/profile')
              ? settings.darkMode ? 'bg-blue-800 text-blue-300' : 'bg-yellow-100 text-yellow-700'
              : settings.darkMode ? 'text-purple-300 hover:bg-purple-900' : 'text-gray-600 hover:bg-yellow-50'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs">{t('settings')}</span>
        </Link>
      </nav>
    </div>
  );
}
