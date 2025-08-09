import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
}

export default function Input({ ref, ...props }: InputProps) {
  const { className, ...rest } = props

  return (
    <input
      ref={ref}
      className={`rounded border border-zinc-600 bg-zinc-700 px-4 py-2 ring-zinc-400 outline-0 transition-shadow focus-visible:ring-2 ${className}`}
      {...rest}
    />
  )
}
