import { useFetcher } from 'react-router'
import { useRef } from 'react'

import { Link } from 'react-router'
import { Dialog } from '~/components/molecules/Dialog'
import { AuthForm } from '../AuthForm'
import { LoginForm } from '../LoginForm'

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const fetcher = useFetcher()
  const loginDialogRef = useRef<HTMLDialogElement>(null)
  const registerDialogRef = useRef<HTMLDialogElement>(null)

  const handleLogout = () => {
    fetcher.submit(null, { method: 'post', action: '/logout' })
  }

  return (
    <>
      <nav>
        <Link to="/">My Blog</Link>
        {isLoggedIn ? (
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => loginDialogRef.current?.showModal()}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => registerDialogRef.current?.showModal()}
            >
              Register
            </button>
          </>
        )}
      </nav>
      <Dialog ref={loginDialogRef}>
        <h2>Log in</h2>
        <LoginForm onSuccess={() => loginDialogRef.current?.close()} />
      </Dialog>
      <Dialog ref={registerDialogRef}>
        <h2>Register</h2>
        <AuthForm onSuccess={() => registerDialogRef.current?.close()} />
      </Dialog>
    </>
  )
}
