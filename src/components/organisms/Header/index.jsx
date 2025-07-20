import { useContext } from 'react'
import { UserContext } from '@providers/contexts'
import { useLoaderData } from 'react-router'
import { Link } from 'react-router'

export function Header() {
  const { logout } = useContext(UserContext)
  const user = useLoaderData()
  const isLoggedIn = Boolean(user)

  return (
    <header>
      <h1>
        <Link to="/">My Blog</Link>
      </h1>
      <nav>
        {isLoggedIn ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
