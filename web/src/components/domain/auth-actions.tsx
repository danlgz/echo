import { SlashIcon } from 'lucide-react';
import { Link } from '@/components/ui/link';
import { useAuth } from '@/context/auth';
import UserMenu from './user-menu';

export default function AuthActions() {
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="flex gap-2 items-center">
      <Link to="/auth/login" className="text-white">
        Login
      </Link>
      <SlashIcon className="text-white/80 inline" size={10} />
      <Link to="/auth/register" className="text-white">
        Register
      </Link>
    </div>
  );
}
