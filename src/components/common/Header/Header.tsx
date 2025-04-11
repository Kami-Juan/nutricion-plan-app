import { Salad } from 'lucide-react';

import { ThemeToggle } from '@/components/common/ThemeToggle/ThemeToggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="flex h-14 items-center justify-between md:justify-end">
        <div className="flex items-center gap-2 md:hidden">
          <Salad className="h-6 w-6 text-primary" />
          <span className="font-semibold">KamiHealth</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
