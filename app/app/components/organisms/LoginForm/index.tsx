import { useId } from 'react'

import { CustomForm } from '../CustomForm'
import { PasswordInput } from '~/components/atoms/PasswordInput'
import { UsernameField } from '~/components/molecules/UsernameField'

export function LoginForm({ onSuccess = () => {} }) {
  const passwordId = useId()

  return (
    <CustomForm method="post" action="/auth/login" onSuccess={onSuccess}>
      <h2>Login</h2>
      <UsernameField />
      <label htmlFor={passwordId}>Password</label>
      <PasswordInput id={passwordId} />
    </CustomForm>
  )
}
