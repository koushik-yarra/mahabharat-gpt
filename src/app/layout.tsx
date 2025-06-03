/**
 * @fileOverview Root layout for the Gita Insights application.
 * This component sets up the basic HTML structure, includes global CSS,
 * and wraps the application with necessary providers (Theme, TextSize, Bookmarks).
 * It also defines global metadata for the application.
 */
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { TextSizeProvider } from '@/providers/text-size-provider';
import { BookmarkProvider } from '@/providers/bookmark-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Mahabharat GPT',
  description: 'Chat with Mahabharat GPT to find wisdom from the epic Mahabharata.',
};

/**
 * RootLayout component.
 * @param {Readonly<{ children: React.ReactNode }>} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TextSizeProvider>
            <BookmarkProvider>
              <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </BookmarkProvider>
          </TextSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
