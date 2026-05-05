import { Outlet, Link, useLocation } from 'react-router';
import { Home, Bell, Settings, Dices } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen w-screen max-w-md mx-auto flex flex-col bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 relative">
      <header className="bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 p-4 shadow-lg flex-shrink-0">
        <h1 className="text-white text-center">ATE!</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <nav className="bg-white border-t-2 border-orange-300 flex items-center justify-around p-3 shadow-lg flex-shrink-0 safe-area-inset-bottom">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/') ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-orange-50'
          }`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/spin"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/spin') ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-pink-50'
          }`}
        >
          <Dices size={24} />
          <span className="text-xs">Spin</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/notifications') ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-red-50'
          }`}
        >
          <Bell size={24} />
          <span className="text-xs">Deals</span>
        </Link>

        <Link
          to="/settings"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/settings') || isActive('/preferences') || isActive('/profile') ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-yellow-50'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
