import type { ButtonHTMLAttributes } from 'react'

export default function HeaderItem({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="cursor-pointer outline-0 transition-opacity hover:opacity-50 focus-visible:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
}
