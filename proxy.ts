import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow login and auth routes without authentication
  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/auth'
  ) {
    return NextResponse.next();
  }

  // Check for valid session cookie
  const sessionCookie = request.cookies.get('admin_session')?.value;
  const adminPass = process.env.ADMIN_PASS;

  if (!sessionCookie || sessionCookie !== adminPass) {
    // Redirect to login for page routes
    if (!pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Return 401 for API routes
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}
