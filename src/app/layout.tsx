import React from 'react';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'EventEase',
  description: 'Effortlessly streamline your event bookings with intuitive design.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default Layout;