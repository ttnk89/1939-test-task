import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '../i18n.config';
import { getToken } from 'next-auth/jwt';
import { auth } from './auth';

const publicPages = ['/', '/login'];
 
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en-us'
});
 
const authMiddleware = async (req: NextRequest) => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is not defined');
  }
  // "__Secure-authjs.session-token" in production
  const token = await getToken({ req, secret: secret, salt: "authjs.session-token" });
  if (!token && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  (req as any).auth = { token };
  return NextResponse.next();
};
 
export async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const session = await auth();
  const isLoggedIn = !!session?.user;
  if (isPublicPage) {
    if (isLoggedIn && req.nextUrl.pathname.includes('/login')) {
      return Response.redirect(new URL("/profile", req.nextUrl.origin));
    } else {
      return intlMiddleware(req);
    }
  } else {
    if (!isLoggedIn && req.nextUrl.pathname.includes('/profile')) {
      return Response.redirect(new URL("/login", req.nextUrl.origin));
    } else {
      const authResponse = await authMiddleware(req);
      if (authResponse.redirected) {
        return authResponse;
      }
      return intlMiddleware(req);
    }
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};