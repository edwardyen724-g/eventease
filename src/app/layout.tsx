import React from 'react';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EventEase - Streamlined Booking Management',
  description: 'Effortlessly Manage Your Cultural Events with Multilingual Booking!',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>EventEase</h1>
          <p>Streamlined booking management tools tailored for cultural and community events.</p>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} EventEase. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;