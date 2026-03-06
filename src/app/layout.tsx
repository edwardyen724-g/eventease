import React from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'EventEase',
  description: 'Effortless Event Scheduling for Local Planners',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;