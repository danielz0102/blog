import { useUser } from '@hooks/useUser'
import { UserContext } from './contexts'

export function UserProvider({ children }) {
  const { user, login, signUp, logout } = useUser()

  return (
    <UserContext value={{ user, login, signUp, logout }}>
      {children}
    </UserContext>
  )
}
