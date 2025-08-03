import { useId } from 'react'

import { CustomForm } from '../CustomForm'
import { PasswordInput } from '~/components/atoms/PasswordInput'

export function LoginForm({ onSuccess = () => {} }) {
  const passwordId = useId()

  return (
    <CustomForm method="post" action="/auth/login" onSuccess={onSuccess}>
      <label>
        Username
        <input
          type="text"
          name="username"
          required
          placeholder="@john_doe123"
        />
      </label>
      <label htmlFor={passwordId}>Password</label>
      <PasswordInput id={passwordId} />
    </CustomForm>
  )
}
