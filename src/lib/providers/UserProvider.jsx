import { useUser } from '@hooks/useUser'
import { UserContext } from './contexts'

export function UserProvider({ children }) {
  const { user, logout } = useUser()

  return <UserContext value={{ user, logout }}>{children}</UserContext>
}
