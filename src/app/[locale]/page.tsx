import styles from "./page.module.css";
import PlayerName from '../components/playername';
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations('common');
  return (
    <main className={styles.main}>
      <h1>{t('welcome')}</h1>
      <PlayerName />
    </main>
  );
}
