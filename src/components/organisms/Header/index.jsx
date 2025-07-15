import { useContext } from 'react'
import { UserContext } from '@providers/contexts'

export function Header() {
  const { user } = useContext(UserContext)
  const isLoggedIn = Boolean(user)

  return (
    <header>
      <h1>
        <a href="/">My Blog</a>
      </h1>
      <nav>
        <ul>
          {isLoggedIn ? (
            <li>
              <a href="/logout">Logout</a>
            </li>
          ) : (
            <>
              <li>
                <a href="/login">Login</a>
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
