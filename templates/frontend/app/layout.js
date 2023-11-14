import { Inter } from 'next/font/google';
import { NextAuthProvider } from './Providers';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
