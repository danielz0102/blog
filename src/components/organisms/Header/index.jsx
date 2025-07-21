import { useLoaderData, useFetcher } from 'react-router'
import { Link } from 'react-router'

export function Header() {
  const fetcher = useFetcher()
  const loading = fetcher.state === 'submitting'
  const user = useLoaderData()
  const isLoggedIn = Boolean(user)

  return (
    <header>
      <h1>
        <Link to="/">My Blog</Link>
      </h1>
      <nav>
        {isLoggedIn ? (
          <fetcher.Form method="post" action="/logout" aria-label="Log out">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging out...' : 'Log out'}
            </button>
          </fetcher.Form>
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
