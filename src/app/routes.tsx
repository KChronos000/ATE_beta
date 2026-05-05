import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PreferencesPage } from "./pages/PreferencesPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SpinWheelPage } from "./pages/SpinWheelPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "preferences", Component: PreferencesPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "spin", Component: SpinWheelPage },
      { path: "settings", Component: SettingsPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
