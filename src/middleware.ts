import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '../i18n.config';
import { authConfig } from './auth.config';
import { auth } from './auth';
import { getToken } from 'next-auth/jwt';

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
  const token = await getToken({ req, secret: secret, salt: "authjs.session-token" }); // "__Secure-authjs.session-token" in production
  if (!token && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  (req as any).auth = { token };
  return NextResponse.next();
};
 
export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    const authResponse = await authMiddleware(req);
    if (authResponse.redirected) {
      return authResponse;
    }
    return intlMiddleware(req);
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};