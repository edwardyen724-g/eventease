import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: ['/protected/:path*'], // Protected routes
};

export default withAuth((req) => {
  return NextResponse.next();
});