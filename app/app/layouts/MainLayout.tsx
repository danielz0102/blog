import { Outlet } from 'react-router'
import { Header } from '~/components/organisms/Header'
import { getUser } from '~/services/getUser'
import type { Route } from './+types/MainLayout'

export function clientLoader() {
  return getUser()
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn={!!loaderData} />
      <Outlet />
    </div>
  )
}
