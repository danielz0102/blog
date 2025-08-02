import { useFetcher } from 'react-router'
import { useId } from 'react'
import { PasswordInput } from '~/components/atoms/PasswordInput'

export function AuthForm({ forLogin = false }: { forLogin?: boolean }) {
  const fetcher = useFetcher<{ error: string }>()
  const loading = fetcher.state === 'submitting'
  const error = fetcher.data?.error
  const passwordId = useId()
  const confirmPasswordId = useId()

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
      <label htmlFor={passwordId}>Password</label>
      <PasswordInput id={passwordId} strong={!forLogin} />
      {!forLogin && (
        <>
          <label htmlFor={confirmPasswordId}>Confirm Password</label>
          <PasswordInput id={confirmPasswordId} name="confirmPassword" strong />
        </>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </fetcher.Form>
  )
}
