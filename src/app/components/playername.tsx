import { auth } from "@/auth"

export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <a>{session.user.name}</a>
    </div>
  )
}