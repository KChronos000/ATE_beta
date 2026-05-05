import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Save, LogOut, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useApp();
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
    logout();
    navigate('/login');
  };

  return (
    <div className="size-full overflow-auto p-4">
      <div className="w-full">
        <div className="text-center mb-6">
          <h2 className="text-orange-600 mb-1">Profile</h2>
          <p className="text-gray-600 text-sm">Manage your account information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-orange-200">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl">
                {name.charAt(0).toUpperCase() || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-orange-300 hover:bg-orange-50 transition-colors">
                <Camera size={16} className="text-orange-600" />
              </button>
            </div>
            <h3 className="text-gray-800">{name || 'User'}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-orange-500" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-orange-500" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-orange-500" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter your city or zip code"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-yellow-200">
          <h3 className="text-yellow-700 mb-4">Account Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-pink-50 p-3 rounded-xl">
              <p className="text-2xl text-pink-600">24</p>
              <p className="text-xs text-gray-600">Favorites</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
              <p className="text-2xl text-orange-600">12</p>
              <p className="text-xs text-gray-600">Reviews</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl">
              <p className="text-2xl text-yellow-600">8</p>
              <p className="text-xs text-gray-600">Deals Used</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2 border-2 border-red-200"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
