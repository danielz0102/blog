import { Link } from 'react-router'

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <nav>
      <Link to="/">My Blog</Link>
      {isLoggedIn ? (
        <button type="button">Log out</button>
      ) : (
        <>
          <button type="button">Log in</button>
          <button type="button">Register</button>
        </>
      )}
    </nav>
  )
}
