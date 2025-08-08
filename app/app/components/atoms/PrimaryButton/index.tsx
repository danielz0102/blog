import type { ButtonHTMLAttributes } from 'react'

export default function PrimaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className, ...otherProps } = props
  return (
    <button
      className={`w-fit cursor-pointer self-center rounded bg-white px-8 py-2 font-medium text-black outline-0 transition-[scale,opacity] hover:opacity-50 focus-visible:scale-105 ${className}`}
      {...otherProps}
    />
  )
}
