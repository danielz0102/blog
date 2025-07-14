import { useContext } from 'react'
import { UserContext } from '@providers/contexts'

export function Header() {
  const { user } = useContext(UserContext)

  console.log({ user })

  return (
    <header>
      <h1>My Blog</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
