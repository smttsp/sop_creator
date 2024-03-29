import { Inter } from 'next/font/google';
import { NextAuthProvider } from './Providers';
import Header from '@/components/Header/Header';
import Footer from '@/components/LandingPage/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
