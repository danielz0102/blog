import type { ButtonHTMLAttributes } from 'react'

export default function PrimaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className, ...otherProps } = props
  return (
    <button
      className={`w-fit cursor-pointer self-center rounded bg-white px-8 py-2 font-medium text-black transition-opacity hover:opacity-50 ${className}`}
      {...otherProps}
    />
  )
}
