
"use client";

import Link from 'next/link';
import { OmIcon } from '@/components/icons/om-icon';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { TextSizeSelector } from '@/components/text-size-selector';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Bookmark, LogIn, LogOut, UserPlus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged out successfully." });
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({ variant: "destructive", title: "Logout Failed", description: "Could not log out. Please try again." });
    }
  };

  const navLinks = [
    { href: '/', label: 'Chat', icon: <Home className="h-4 w-4" /> },
    { href: '/overview', label: 'Overview', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/bookmarks', label: 'Bookmarks', icon: <Bookmark className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <OmIcon className="h-8 w-8 text-primary" />
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
          {!loading && (
            <>
              {user ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
