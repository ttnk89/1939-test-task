"use client";

import styles from "../[locale]/page.module.css";
import useTranslation from 'next-translate/useTranslation';

import setLanguage from 'next-translate/setLanguage'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  localeNames,
  locales,
  usePathname,
  useRouter,
  type Locale,
} from "../../../i18n.config";

export default function LanguageSwitcher({
  locale,
}: {
  locale: Locale;
}) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeLocale = (
    locale: string,
  ) => {
    const newLocale = locale as Locale;

    // ...if the user chose Arabic ("ar-eg"),
    // router.replace() will prefix the pathname
    // with this `newLocale`, effectively changing
    // languages by navigating to `/ar-eg/about`.
    router.replace(pathname, { locale: newLocale });
  };


  return (
    <>
      <button className={styles.button} onClick={() => changeLocale('en-us')} disabled={locale === 'en-us'}>English</button>
      <button className={styles.button} onClick={() => changeLocale('zh-cn')} disabled={locale === 'zh-cn'}>中文</button>
    </>
  );
}
