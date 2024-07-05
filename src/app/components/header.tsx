'use client';

import LanguageSwitcher from "./LanguageSwitcherComponent";
import styles from "../[locale]/page.module.css";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Locale } from "../../../i18n.config";
import { useAuth } from "../contexts/authcontext";
import { signOut } from "next-auth/react"
import { Session } from 'next-auth';
import { User } from "../lib/definitions";

interface HeaderProps {
    session: Session | null;
  }

export default function Header({session}: HeaderProps) {
    const t = useTranslations("common");
    const locale = useLocale() as Locale;
    return (
            <header className={styles.header}>
                <nav>
                    <ul>
                        <li>
                            <a href="/">{t('home')}</a>
                        </li>
                        {session &&
                            <li>
                                <a href="/profile">{t('profile')}</a>
                            </li>
                        }
                        <li>
                            {!session ? (
                                <a href="/login">{t('login')}</a>
                            ) : (
                                   <button className={styles.button} onClick={() => signOut()}><u>
                                    {t('logout')}</u></button>
                            )}
                        </li>
                        <li>
                            <LanguageSwitcher locale={locale} />
                        </li>
                    </ul>
                </nav>
            </header>
    );
}