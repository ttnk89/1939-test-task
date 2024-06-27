"use client";

import LanguageSwitcher from "./LanguageSwitcherComponent";
import styles from "../page.module.css";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Locale } from "../../../../i18n.config";


export default function Header() {
    const t = useTranslations("common");
    const locale = useLocale() as Locale;
    const [loggedIn, setLoggedIn] = useState(false);

    return (
            <header className={styles.header}>
                <nav>
                    <ul>
                        <li>
                            <a href="/">{t('home')}</a>
                        </li>
                        <li>
                            {!loggedIn ? (
                                <a href="/login">{t('login')}</a>
                            ) : (
                                <a href="/login">{t('logout')}</a>
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