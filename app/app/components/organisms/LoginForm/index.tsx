import { useFetcher } from 'react-router'
import { useEffect, useId, useRef } from 'react'
import { PasswordInput } from '~/components/atoms/PasswordInput'

type LoginFormProps = {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess = () => {} }: LoginFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher<{ error: string; success: boolean }>()
  const passwordId = useId()
  const loading = fetcher.state === 'submitting'
  const error = fetcher.data?.error
  const success = fetcher.data?.success

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
      action="/auth/login"
      aria-label="Login Form"
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
      <PasswordInput id={passwordId} />

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </fetcher.Form>
  )
}
