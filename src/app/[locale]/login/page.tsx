'use client';

import styles from "../page.module.css";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT"
import { useEffect, useState } from "react";
import LoginForm from "../../components/login";
import PlayerName from "../../components/PlayerNameComponent";
import { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/authcontext";

export default function Page() {
    const t = useTranslations('common');
    // const { loggedIn, playerName, login, logout } = useAuth();
    const [newPlayerName, setNewPlayerName] = useState('');
    const router = useRouter();
    
    // const handleLogin = async (name: string) => {
    //     login(name);

    //     // Save player name to the backend
    //     await fetch('/api/player', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ newName: name }),
    //     });

    //     router.push('/');
    // };

    const handleChangePlayerName = (newName: string) => {
        setNewPlayerName(newName);
        localStorage.setItem('username', newName);
    };

    // useEffect(() => {
    //     if (loggedIn) {
    //         router.push('/');
    //     }
    // }, [loggedIn, router]);

    return (
        <main className={styles.main}>
            <LoginForm />
        </main>
    );
}