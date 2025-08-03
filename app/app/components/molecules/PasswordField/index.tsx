import { useId } from 'react'

import { PASSWORD_PATTERN } from '~/lib/consts'

export interface PasswordFieldProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string
  name?: string
  strong?: boolean
}

export function PasswordField({
  label = 'Password',
  name = 'password',
  strong = false,
  ...props
}: PasswordFieldProps) {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="password"
        name={name}
        required
        placeholder="••••••••"
        pattern={!strong ? undefined : PASSWORD_PATTERN}
        {...props}
      />
    </>
  )
}
