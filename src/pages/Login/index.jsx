import { useContext } from 'react'
import { useAsyncCallback } from 'react-async-hook'

import { UserContext } from '@providers/contexts'

import { redirect } from 'react-router'

export function Login() {
  const { login } = useContext(UserContext)

  const { execute: handleSubmit, error } = useAsyncCallback((event) => {
    event.preventDefault()

    const { username, password } = Object.fromEntries(
      new FormData(event.target)
    )

    return login({ username, password }).then(() => {
      redirect('/')
    })
  })

  return (
    <form aria-label="Login Form" onSubmit={handleSubmit}>
      {error && (
        <p>
          {error.data?.error ??
            'An unexpected error occurred. Please, try again later.'}
        </p>
      )}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="myusername123"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="******"
        required
        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}"
        title="Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
      />
      <button type="submit">Login</button>
    </form>
  )
}
