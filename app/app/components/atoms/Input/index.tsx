import type { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="rounded border border-zinc-600 bg-zinc-700 px-4 py-2 ring-zinc-400 outline-0 transition-shadow focus-visible:ring-2"
      {...props}
    />
  )
}
