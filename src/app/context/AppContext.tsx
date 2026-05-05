import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserPreferences {
  dietary: string[];
  allergies: string[];
  cuisines: string[];
  priceRange: number[];
}

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  phone?: string;
  location?: string;
}

interface AppSettings {
  notifications: boolean;
  locationServices: boolean;
  darkMode: boolean;
  distance: 'km' | 'mi';
}

interface AppContextType {
  user: User;
  preferences: UserPreferences;
  settings: AppSettings;
  setUser: (user: User) => void;
  setPreferences: (preferences: UserPreferences) => void;
  setSettings: (settings: AppSettings) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(() => {
    const saved = localStorage.getItem('ate_user');
    return saved ? JSON.parse(saved) : { name: '', email: '', isLoggedIn: false };
  });

  const [preferences, setPreferencesState] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('ate_preferences');
    return saved ? JSON.parse(saved) : { dietary: [], allergies: [], cuisines: [], priceRange: [1, 3] };
  });

  const [settings, setSettingsState] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('ate_settings');
    return saved ? JSON.parse(saved) : { notifications: true, locationServices: true, darkMode: false, distance: 'mi' };
  });

  useEffect(() => {
    localStorage.setItem('ate_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ate_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('ate_settings', JSON.stringify(settings));
  }, [settings]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const setPreferences = (newPreferences: UserPreferences) => {
    setPreferencesState(newPreferences);
  };

  const setSettings = (newSettings: AppSettings) => {
    setSettingsState(newSettings);
  };

  const logout = () => {
    setUserState({ name: '', email: '', isLoggedIn: false });
    localStorage.removeItem('ate_user');
  };

  return (
    <AppContext.Provider value={{ user, preferences, settings, setUser, setPreferences, setSettings, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
