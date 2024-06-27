'use client';

import styles from "./page.module.css";
import { useState } from 'react';
import LoginForm from './components/LoginComponent';
import PlayerName from './components/PlayerNameComponent';
import LanguageSwitcher from './components/LanguageSwitcherComponent';
import useTranslation from 'next-translate/useTranslation';
import Header from "./components/header";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations('common');
  const [playerName, setPlayerName] = useState('');

  return (
    <main className={styles.main}>
      <h1>{t('welcome')}</h1>
    </main>
  );
}
