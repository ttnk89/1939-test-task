import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/header';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '../contexts/authcontext';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
// app/Layout.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLinkProps } from 'next/navigation';

import { login, isLoggedIn, logout } from '../utils/auth';
import '../styles/globals.css';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
    }
  }, []);

  const handleLogin = () => {
    login('your-auth-token');
    router.push('/');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const linkProps = useLinkProps('/login');

  return (
    <html lang="en">
      <head>
        {/* Add head elements like meta tags, title, stylesheets, etc. }
        <title>Login App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header>
          <nav>
            <ul>
              <li><Link href="/"><a>Home</a></Link></li>
              {isLoggedIn() ? (
                <>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><button onClick={handleLogin}>Login</button></li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>
          {/* Footer content }
        </footer>
      </body>
    </html>
  );
};

export default Layout;

*/