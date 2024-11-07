import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartButton } from '@/components/cart-button';
import { UserMenu } from '@/components/user-menu';
import { MobileNav } from '@/components/mobile-nav';
import { LogoComponent } from '@/components/logo';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Laser Wood Art', path: '/category/laser-wood' },
  { name: 'Neon Lights', path: '/category/neon-lights' },
  { name: '3D Prints', path: '/category/3d-prints' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center px-8">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <LogoComponent />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="transition-colors hover:text-primary text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <CartButton />
            <UserMenu />
            <MobileNav items={navItems} />
          </nav>
        </div>
      </div>
    </nav>
  );
}
