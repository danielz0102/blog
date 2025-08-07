import type { ButtonHTMLAttributes } from 'react'

export default function HeaderItem({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="cursor-pointer transition-opacity hover:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
}
