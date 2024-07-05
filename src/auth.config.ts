import type { NextAuthConfig } from 'next-auth';
import { Locale } from '../i18n.config';
import { useLocale } from 'next-intl';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnProfilePage = nextUrl.pathname.includes('/profile');
          if (isOnProfilePage) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL(`/profile`, nextUrl));
          }
          return true;
        },
      },
      providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;