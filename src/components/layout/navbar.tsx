
"use client";

import Link from 'next/link';
import { FluteIcon } from '@/components/icons/flute-icon'; // Changed import
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { TextSizeSelector } from '@/components/text-size-selector';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Bookmark } from 'lucide-react'; // Added Bookmark back temporarily for example
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Chat', icon: <Home className="h-4 w-4" /> },
    { href: '/overview', label: 'Overview', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/bookmarks', label: 'Bookmarks', icon: <Bookmark className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <FluteIcon className="h-8 w-8 text-primary" /> {/* Changed component */}
          <span className="font-headline text-xl font-bold">Mahabharat GPT</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-1">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "h-9 px-3 text-muted-foreground hover:text-foreground",
                pathname === link.href && "text-primary font-semibold bg-accent hover:bg-accent/90 hover:text-primary"
              )}
            >
              <Link href={link.href}>
                {link.icon}
                <span className="ml-2 hidden sm:inline-block">{link.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <TextSizeSelector />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
