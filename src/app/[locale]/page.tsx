import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";
interface HomeProps {
  session: Session | null;
}
export default function Page({session}: HomeProps) {
  const t = useTranslations('common');
  console.log(session);
  return (
    <main className={styles.main}>
      <h1>{t('welcome')}</h1>
    </main>
  );
}
