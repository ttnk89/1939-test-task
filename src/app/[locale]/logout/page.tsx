import { signOut } from "@/auth";
import { useLocale } from "next-intl";
import { Locale } from "../../../../i18n.config";
export default function Page() {
    const locale = useLocale() as Locale;
    signOut({redirectTo:`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/`, redirect: true});
}