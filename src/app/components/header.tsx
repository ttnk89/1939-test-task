"use client";

import LanguageSwitcher from "./LanguageSwitcherComponent";
import styles from "../[locale]/page.module.css";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Locale } from "../../../i18n.config";
import { useAuth } from "../contexts/authcontext";
import { signOut } from "../../../auth";


export default function Header() {
    const t = useTranslations("common");
    const locale = useLocale() as Locale;
    const { loggedIn, logout } = useState();

    return (
            <header className={styles.header}>
                <nav>
                    <ul>
                        <li>
                            <a href="/">{t('home')}</a>
                        </li>
                        {loggedIn &&
                            <li>
                                <a href="/profile">{t('profile')}</a>
                            </li>
                        }
                        <li>
                            {!loggedIn ? (
                                <a href="/login">{t('login')}</a>
                            ) : (
                                   <a onClick={async () => await signOut()}>
                                    {t('logout')}</a>
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