import React from 'react';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "EventEase",
  description: "Effortlessly streamline your event bookings with intuitive design.",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="layout-container">
            <h1 className="headline">Transform Your Event Bookings with Ease and Style</h1>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;