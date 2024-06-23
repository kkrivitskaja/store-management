'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  [key: string]: any;
}

const NavLink: React.FC<NavLinkProps> = ({ href, ...rest }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return <Link href={href} {...rest} className={`hover:underline font-bold ${isActive ? 'text-red-600' : ''}`}></Link>;
};
export default NavLink;
