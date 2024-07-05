import { Inter } from 'next/font/google';
import Header from '../components/header';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string, session: Session };
}>) {
  const messages = await getMessages();
  const session = await auth();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
             <Header session={session}/>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}