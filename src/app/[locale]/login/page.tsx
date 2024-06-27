'use client';

import styles from "../page.module.css";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT"
import { useState } from "react";
import LoginForm from "../components/LoginComponent";
import PlayerName from "../components/PlayerNameComponent";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { lang: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const t = await getT(params.lang, "common")

    return {
        title: t`login-page-title`,
        description: t`login-page-description`,
    };
}

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [playerName, setPlayerName] = useState('');
    
    const handleLogin = (name: string) => {
        setLoggedIn(true);
        setPlayerName(name);
    };

    const handleChangePlayerName = (newName: string) => {
        setPlayerName(newName);
    };
    return (
        <main className={styles.main}>
            {!loggedIn ? (
                    <LoginForm onLogin={handleLogin} />
                ) : (
                    <PlayerName playerName={playerName} onChangePlayerName={handleChangePlayerName} />
                )}
        </main>
    );
}