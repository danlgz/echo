import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/auth';

export default function AppWithoutSessionLayout() {
  const { user, loading } = useAuth();

  if (user !== null && !loading) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
