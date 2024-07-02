import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import NextAuth from 'next-auth';
import { locales } from '../i18n.config';
import { authConfig } from '../auth.config';

// Define the next-intl middleware
const intlMiddleware = createMiddleware({
  defaultLocale: 'en-us',
  locales,
  localeDetection: false,
});

// Define the NextAuth middleware
const authMiddleware = NextAuth(authConfig);

// Function to combine middlewares
async function combinedMiddleware(req: NextRequest) {
  // Run the next-intl middleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // Run the NextAuth middleware
  const authResponse = NextAuth(authConfig).auth;
  if (authResponse) return authResponse;

  // Return NextResponse.next() if neither middleware returns a response
  return NextResponse.next();
}

export default combinedMiddleware;

// Combine the matchers
export const config = {
  matcher: [
    // Combine the matchers from both middlewares
    '/((?!api|_next|_vercel|_next/static|_next/image|.*\\.png$|.*\\..*).*)',
  ],
};
