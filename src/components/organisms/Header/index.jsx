import { useContext } from 'react'
import { UserContext } from '@providers/contexts'

export function Header() {
  const { user, logout } = useContext(UserContext)
  const isLoggedIn = Boolean(user)

  return (
    <header>
      <h1>
        <a href="/">My Blog</a>
      </h1>
      <nav>
        <ul>
          {isLoggedIn ? (
            <button onClick={logout}>Log out</button>
          ) : (
            <>
              <li>
                <a href="/login">Log in</a>
              </li>
              <li>
                <a href="/sign-up">Sign Up</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
