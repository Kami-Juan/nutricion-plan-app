"use client";

import { cn } from "@k-health/ui";
import { Heart, Home, Salad } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/landing-page/theme-toggle";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-4">
      <div className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Salad className="h-6 w-6 text-primary" />
          <span className="font-semibold md:hidden">KamiHealth</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary/10",
              pathname === "/" && "bg-primary/10 text-primary"
            )}
          >
            <Home className="h-5 w-5" />
            <span className="hidden md:block">Inicio</span>
          </Link>
          <Link
            href="/favorites"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary/10",
              pathname === "/favorites" && "bg-primary/10 text-primary"
            )}
          >
            <Heart className="h-5 w-5" />
            <span className="hidden md:block">Favoritos</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
