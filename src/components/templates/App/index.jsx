import { Outlet } from 'react-router'
import { Header } from '@organisms/Header'
import { UserProvider } from '@providers/UserProvider'

export function App() {
  return (
    <UserProvider>
      <Header />
      <Outlet />
    </UserProvider>
  )
}

export default App
