import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from './components/layout/app-layout';
import AppWithSessionLayout from './components/layout/app-with-session-layout';
import AppWithoutSessionLayout from './components/layout/app-without-session-layout';
import NotFound from './components/pages/404';
import LobbyPage from './components/pages/lobby';
import LoginPage from './components/pages/login';
import RegisterPage from './components/pages/register';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Auth pages */}
          <Route path="/auth" element={<AppWithoutSessionLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* App pages */}
          <Route element={<AppWithSessionLayout />}>
            <Route path="/" element={<LobbyPage />} />
          </Route>

          {/* Not found page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
