import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from './app/lib/definitions';
import { useTranslations } from 'next-intl';
 
async function getUser(username: string, password: string): Promise<User | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const loginResponse = await fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!loginResponse.ok) {
            console.error('login failed');
            throw new Error('login failed');
        }

        const loginData = await loginResponse.json();

        if (loginData.status === 'login_ok') {
            const playerResponse = await fetch(`${baseUrl}/api/player`);
            const playerData = await playerResponse.json();
            return playerData;
        } else {
            console.error(loginData.status);
            throw new Error(loginData.status);
        }
    } catch (err) {
        console.error('login failed', err);
        throw new Error('login failed');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(4), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
            const user = await getUser(username, password);
        if (!user) return null;
           //user.password would be returned as hashed in practice
           const hashedPassword = await bcrypt.hash(user.password, 10);
           const passwordsMatch = await bcrypt.compare(password, hashedPassword);

           if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});