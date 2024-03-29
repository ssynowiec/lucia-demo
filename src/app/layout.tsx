import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/ui/nav';
import { Footer } from '@/components/ui/footer';

export const metadata: Metadata = {
  title: 'Lucia auth demo',
  description: 'Lucia auth demo app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className='flex min-h-screen flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Nav />
          <main className='flex flex-1'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
