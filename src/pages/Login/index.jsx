import { login } from '@services/auth'
import { redirect } from 'react-router'

export function Login() {
  function handleSubmit(event) {
    event.preventDefault()

    const { username, password } = Object.fromEntries(
      new FormData(event.target),
    )

    login({ username, password })
      .then(() => {
        redirect('/')
      })
      .catch((error) => {
        console.error('Login failed:', error)
      })
  }

  return (
    <form aria-label="Login Form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Login</button>
    </form>
  )
}
