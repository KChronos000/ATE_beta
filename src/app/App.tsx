import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './context/AppContext';
import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <LocationProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </LocationProvider>
      </AppProvider>
    </LanguageProvider>
  );
}