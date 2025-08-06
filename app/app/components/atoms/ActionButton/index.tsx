import { useFetcher } from 'react-router'

export interface ActionButtonProps {
  actionUrl: string
  children: React.ReactNode
  className?: React.HTMLAttributes<HTMLButtonElement>['className']
  onClick?: () => void
}

export default function ActionButton({
  actionUrl,
  children,
  className,
  onClick = () => {}
}: ActionButtonProps) {
  const fetcher = useFetcher()

  const handleClick = () => {
    fetcher.submit(null, { method: 'post', action: actionUrl })
    onClick()
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
