import { auth } from "@/auth"
import { useTranslations } from "next-intl";
 
export default async function Page() {
    const t = useTranslations('common');
  const session = await auth()
  if (!session) return <div>{t('Not authenticated')}</div>
 
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}