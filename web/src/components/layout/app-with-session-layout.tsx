import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/auth';
import LoadingPage from '../pages/loading';

export default function AppWithSessionLayout() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingPage />;

  if (user === null) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
