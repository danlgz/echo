import type { NavLinkProps } from 'react-router';
import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';

type Props = NavLinkProps & React.RefAttributes<HTMLAnchorElement>;

export function Link({ to, children, className, ...props }: Props) {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        cn('text-sm opacity-80', className, {
          underline: isActive,
          'opacity-100': isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
}
