import { useFetcher, type FetcherFormProps } from 'react-router'
import { useEffect, useRef } from 'react'

export interface AuthFormProps extends FetcherFormProps {
  onSuccess?: () => void
  children: React.ReactNode
}

export function CustomForm({
  onSuccess = () => {},
  children,
  ...attributes
}: AuthFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher<{ error: string; success: boolean }>()
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
    <fetcher.Form ref={formRef} {...attributes}>
      {error && <p>{error}</p>}
      {children}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </fetcher.Form>
  )
}
