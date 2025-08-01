import { useFetcher } from 'react-router'

export function AuthForm({ forLogin = true }: { forLogin?: boolean }) {
  const fetcher = useFetcher<{ error: string }>()
  const loading = fetcher.state === 'submitting'
  const error = fetcher.data?.error

  return (
    <fetcher.Form
      method="post"
      action={forLogin ? '/login' : '/register'}
      aria-label={forLogin ? 'Login Form' : 'Registration Form'}
    >
      {error && <p>{error}</p>}
      <label>
        Username
        <input
          type="text"
          name="username"
          required
          placeholder="@john_doe123"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••"
          pattern={
            forLogin
              ? undefined
              : '(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}'
          }
        />
      </label>
      {!forLogin && (
        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="••••••••"
            pattern={
              forLogin
                ? undefined
                : '(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}'
            }
          />
        </label>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </fetcher.Form>
  )
}
