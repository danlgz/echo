import { Outlet } from 'react-router';
import AuthActions from '../domain/auth-actions';

export function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-black">
      <div className="flex flex-row justify-between items-center w-full max-w-6xl mx-auto px-4 h-24">
        <h1 className="text-white">Echo</h1>
        <AuthActions />
      </div>

      <div className="flex justify-center w-full mx-auto rounded-t-3xl bg-white">
        <div className="w-full max-w-6xl px-6 pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
