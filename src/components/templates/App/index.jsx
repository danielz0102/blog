import { Outlet } from 'react-router'
import { Header } from '@organisms/Header'

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
