import { useRef } from 'react'

import { Link } from 'react-router'
import { Dialog } from '~/components/molecules/Dialog'
import { AuthForm } from '../AuthForm'

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const loginDialogRef = useRef<HTMLDialogElement>(null)
  const registerDialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <nav>
        <Link to="/">My Blog</Link>
        {isLoggedIn ? (
          <button type="button">Log out</button>
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
        <AuthForm forLogin />
      </Dialog>
      <Dialog ref={registerDialogRef}>
        <h2>Register</h2>
        <AuthForm />
      </Dialog>
    </>
  )
}
