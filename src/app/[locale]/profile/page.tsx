

import styles from "../page.module.css";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT"
import { useEffect, useState } from "react";
import LoginForm from "../../components/login";
import { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/authcontext";
import PlayerName from "@/app/components/playername";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
// const fetchPlayerName = async () => {
//     const playerResponse = await fetch('/api/player');
//     const playerData = await playerResponse.json();
//     return playerData.name;
// };
  
// const PlayerName = () => {
// const [name, setName] = useState('');

// useEffect(() => {
//     const getName = async () => {
//     const playerName = await fetchPlayerName();
//     setName(playerName);
//     };
//     getName();
// }, []);

//     return <h1>{name}</h1>;
// };


export default function Page() {
    const t = useTranslations('common');
    return (
        <main className={styles.main}>
            <a>hello</a>
            {/* <PlayerName /> */}
        </main>
    );
}