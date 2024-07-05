'use client'
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PlayerNameChange from "@/app/components/PlayerNameComponent";

export default function Page() {
    const t = useTranslations('common');
    const [playerName, setPlayerName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayerName = async () => {
            try {
                const response = await fetch('/api/player');
                if (response.ok) {
                    const data = await response.json();
                    setPlayerName(data.foundPlayer.username);
                }
            } catch (err) {
                console.error(t('playerNameFetchFailed'), err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayerName();
    });

    const handlePlayerNameChange = (newName: string) => {
        setPlayerName(newName);
    };

    if (isLoading) {
        return (
            <main className={styles.main}>
                <p className={styles.loading}>{t('loading')}...</p>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <p>
                {t('loggedIn')} <b>{playerName}</b>
            </p>
            <PlayerNameChange onPlayerNameChange={handlePlayerNameChange}/>
        </main>
    );
}