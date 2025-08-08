import { useId } from 'react'

import { PASSWORD_PATTERN } from '~/lib/consts'

import Input from '~/components/atoms/Input'
import FormField from '../FormField'

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
    <FormField>
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        type="password"
        name={name}
        required
        placeholder="••••••••"
        pattern={!strong ? undefined : PASSWORD_PATTERN}
        {...props}
      />
    </FormField>
  )
}
