import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const middleware = withAuth({
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});

export const config = {
  matcher: ['/protected/:path*', '/dashboard/:path*'],
};

export default middleware;