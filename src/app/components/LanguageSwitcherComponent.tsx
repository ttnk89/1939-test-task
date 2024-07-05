"use client";

import styles from "../[locale]/page.module.css";
import { useSearchParams } from 'next/navigation';
import { useTranslations } from "next-intl";
import {
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
      <button className={styles.button} onClick={() => changeLocale('ja-jp')} disabled={locale === 'ja-jp'}>日本語</button>
    </>
  );
}
