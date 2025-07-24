import { Link } from 'react-router'

export function UnexpectedError() {
  return (
    <main>
      <h1>Unexpected Error</h1>
      <p>An unexpected error occurred. Please try again later.</p>
      <Link to="/">Go to Home</Link>
    </main>
  )
}
