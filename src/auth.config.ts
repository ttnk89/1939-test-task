import type { NextAuthConfig } from 'next-auth';
 
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

            // redirect unauthenticated users to login page
            return false; 
          } else if (isLoggedIn) {
            return Response.redirect(new URL(`/profile`, nextUrl));
          }
          return true;
        },
      },
      providers: [],
} satisfies NextAuthConfig;