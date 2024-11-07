'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export function LogoComponent() {
  const { theme } = useTheme();

  const logoUrl =
    theme === 'dark'
      ? 'https://appwrite.codesec.me/v1/storage/buckets/67299e5e0033fb03e58e/files/672b084c000ea4c9e566/view?project=671ca959003a10a62f44&mode=admin'
      : 'https://appwrite.codesec.me/v1/storage/buckets/67299e5e0033fb03e58e/files/672b083500131d2913cb/view?project=671ca959003a10a62f44&mode=admin';

  return (
    <div className="relative w-32 h-32">
      {' '}
      {/* Increased from w-8 h-8 to w-32 h-32 */}
      <Image
        src={logoUrl}
        alt="Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
