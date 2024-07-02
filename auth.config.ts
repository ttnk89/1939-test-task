import type { NextAuthConfig } from 'next-auth';
import { Locale } from './i18n.config';
import { useLocale } from 'next-intl';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const locale = useLocale() as Locale;
          const isOnDashboard = nextUrl.pathname.startsWith(`/${locale}/profile`);
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL(`${locale}/profile`, nextUrl));
          }
          return true;
        },
      },
      providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;