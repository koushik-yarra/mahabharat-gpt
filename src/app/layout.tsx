import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { TextSizeProvider } from '@/providers/text-size-provider';
import { BookmarkProvider } from '@/providers/bookmark-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Gita GPT',
  description: 'Chat with Gita GPT to find wisdom from the Bhagavad Gita.',
};

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
