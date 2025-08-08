import { useFetcher, type FetcherFormProps } from 'react-router'
import { useEffect, useRef } from 'react'

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
      <button
        type="submit"
        disabled={loading}
        className="w-fit cursor-pointer self-center rounded bg-white px-8 py-2 font-medium text-black transition-opacity hover:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </fetcher.Form>
  )
}
