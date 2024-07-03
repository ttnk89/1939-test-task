
import styles from "../page.module.css";
import LoginForm from "../../components/login";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations('common');

    return (
        <main className={styles.main}>
            <LoginForm />
        </main>
    );
}