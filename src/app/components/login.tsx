'use client';

import { authenticate } from '@/app/lib/actions';
import { useLocale, useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { Locale } from '../../../i18n.config';
 
export default function LoginForm() {
    const t = useTranslations('common');
    const [errorMessage, formAction, isPending] = useFormState(
        authenticate,
        undefined,
    );
    const locale = useLocale() as Locale;
  
  return (
    <form action={formAction}>
      {errorMessage && <p>{t('error', {error: errorMessage})}</p>}
      <input id="callbackUrl" type="hidden" name="callbackUrl" value={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/profile`} />
      <input id="redirectTo" type="hidden" name="redirectTo" value={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/profile`} />
      <input
        id="username"
        type="username"
        name="username"
        placeholder={t('username')}
        required
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder={t('password')}
        required
      />
      <button type="submit" disabled={isPending}>{t('submit')}</button>
    </form>
  );
}