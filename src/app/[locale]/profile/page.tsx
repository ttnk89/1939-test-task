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

    return (
        <main className={styles.main}>
            <a>hello</a>
        </main>
    );
}