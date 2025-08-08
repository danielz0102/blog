import { useFetcher, type FetcherFormProps } from 'react-router'
import { useEffect, useRef } from 'react'

import PrimaryButton from '~/components/atoms/PrimaryButton'

export interface CustomFormProps extends FetcherFormProps {
  onSuccess?: () => void
  children: React.ReactNode
}

export function CustomForm({
  onSuccess = () => {},
  children,
  ...attributes
}: CustomFormProps) {
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
    <fetcher.Form ref={formRef} {...attributes} className="flex flex-col gap-4">
      {error && <p>{error}</p>}
      {children}
      <PrimaryButton type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </PrimaryButton>
    </fetcher.Form>
  )
}
