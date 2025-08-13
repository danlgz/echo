import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from './components/layout/app-layout';
import NotFound from './components/pages/404';
import LobbyPage from './components/pages/lobby';
import LoginPage from './components/pages/login';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AppLayout />}>
          <Route path="login" element={<LoginPage />} />
          {/*<Route path="register" element={<RegisterPage />} />*/}
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LobbyPage />} />
        </Route>
        <Route path="*" element={<AppLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
