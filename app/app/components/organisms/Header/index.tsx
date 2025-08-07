import { useFetcher, Link } from 'react-router'
import { useRef } from 'react'

import HeaderItem from '~/components/atoms/HeaderItem'
import { Dialog } from '~/components/molecules/Dialog'
import { LoginForm } from '../LoginForm'
import { RegisterForm } from '../RegisterForm'

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const fetcher = useFetcher()
  const loginDialogRef = useRef<HTMLDialogElement>(null)
  const registerDialogRef = useRef<HTMLDialogElement>(null)

  const handleLogout = () => {
    fetcher.submit(null, { method: 'post', action: '/logout' })
  }

  return (
    <>
      <nav className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">My Blog</Link>
        </h1>
        {isLoggedIn ? (
          <HeaderItem onClick={handleLogout}>Log out</HeaderItem>
        ) : (
          <div className="flex gap-4">
            <HeaderItem onClick={() => loginDialogRef.current?.showModal()}>
              Log in
            </HeaderItem>
            <HeaderItem onClick={() => registerDialogRef.current?.showModal()}>
              Register
            </HeaderItem>
          </div>
        )}
      </nav>
      <Dialog ref={loginDialogRef}>
        <LoginForm onSuccess={() => loginDialogRef.current?.close()} />
      </Dialog>
      <Dialog ref={registerDialogRef}>
        <RegisterForm onSuccess={() => registerDialogRef.current?.close()} />
      </Dialog>
    </>
  )
}
