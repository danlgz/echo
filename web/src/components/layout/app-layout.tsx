import { SlashIcon } from 'lucide-react';
import { Outlet } from 'react-router';
import { Link } from '../ui/link';

export function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-black">
      <div className="flex flex-row justify-between items-center w-full px-4 h-24">
        <h1 className="text-white">Echo</h1>

        <div className="flex gap-2 items-center">
          <Link to="/auth/login" className="text-white">
            Login
          </Link>
          <SlashIcon className="text-white/80 inline" size={10} />
          <Link to="/auth/register" className="text-white">
            Register
          </Link>
        </div>
      </div>
      <div className="bg-white w-full rounded-t-3xl px-6 pt-8">
        <Outlet />
      </div>
    </div>
  );
}
