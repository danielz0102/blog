import { Outlet } from 'react-router'
import { Header } from '~/components/organisms/Header'
import { getUser } from '~/services/getUser'
import type { Route } from './+types/MainLayout'

export function clientLoader() {
  return getUser()
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header isLoggedIn={!!loaderData} />
      <Outlet />
    </>
  )
}
