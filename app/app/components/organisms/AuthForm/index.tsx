import { useFetcher } from 'react-router'
import { useEffect, useId, useRef } from 'react'
import { PasswordInput } from '~/components/atoms/PasswordInput'

type AuthFormProps = {
  forLogin?: boolean
  onSuccess?: () => void
}

export function AuthForm({
  forLogin = false,
  onSuccess = () => {}
}: AuthFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher<{ error: string; success: boolean }>()
  const loading = fetcher.state === 'submitting'
  const error = fetcher.data?.error
  const success = fetcher.data?.success
  const passwordId = useId()
  const confirmPasswordId = useId()

  useEffect(() => {
    if (success) {
      formRef.current?.reset()
      onSuccess()
    }
  }, [success, onSuccess])

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      action={`/auth/${forLogin ? 'login' : 'register'}`}
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
