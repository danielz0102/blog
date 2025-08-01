import { PASSWORD_PATTERN } from '~/lib/consts'

type PasswordInputProps = {
  id: string
  name?: string
  strong?: boolean
}

export function PasswordInput({
  id,
  name = 'password',
  strong = false
}: PasswordInputProps) {
  return (
    <input
      id={id}
      type="password"
      name={name}
      required
      placeholder="••••••••"
      pattern={!strong ? undefined : PASSWORD_PATTERN}
    />
  )
}
