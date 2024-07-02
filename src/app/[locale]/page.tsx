'use client';

import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginComponent';
import PlayerName from '../components/PlayerNameComponent';
import LanguageSwitcher from '../components/LanguageSwitcherComponent';
import useTranslation from 'next-translate/useTranslation';
import Header from "../components/header";
import { useTranslations } from "next-intl";
import { useAuth } from "../contexts/authcontext";

export default function Page() {
  const { loggedIn } = useState();
  const t = useTranslations('common');
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
      const fetchPlayerName = async () => {
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/player`);
              if (response.ok) {
                  const data = await response.json();
                  setPlayerName(data.playerName);
              } else {
                  console.error('Failed to fetch player name');
              }
          } catch (error) {
              console.error('Error fetching player name:', error);
          }
      };

      if (loggedIn) {
        fetchPlayerName();
      }
  }, []);

  return (
    <main className={styles.main}>
      <h1>{t('welcome')}</h1>
      {playerName &&
        <h2>{playerName}</h2>
      }
    </main>
  );
}
