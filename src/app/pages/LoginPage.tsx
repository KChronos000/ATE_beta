import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUser({
      name: name || email.split('@')[0],
      email,
      isLoggedIn: true
    });

    if (isSignUp) {
      navigate('/preferences');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="size-full flex items-center justify-center p-4">
      <div className="w-full">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
        >
          <Mail size={20} />
          <span className="text-sm">← {t('home')}</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-200">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 text-white text-4xl p-4 rounded-full mb-4">
              🍽️
            </div>
            <h2 className="text-orange-600 mb-2">
              {isSignUp ? t('joinAte') : t('welcomeBackLogin')}
            </h2>
            <p className="text-gray-500">
              {isSignUp ? t('createAccount') : t('signInContinue')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-gray-700 mb-2">{t('fullName')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder={t('enterName')}
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder={t('enterEmail')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder={t('enterPassword')}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 text-white py-3 rounded-xl hover:shadow-lg transition-shadow"
            >
              {isSignUp ? t('createAccount') : t('signInContinue')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 hover:text-orange-700 underline"
            >
              {isSignUp ? t('alreadyHaveAccount') : t('noAccount')}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              {t('skipForNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
