import { useId } from 'react'

import { CustomForm } from '../CustomForm'
import { UsernameField } from '~/components/molecules/UsernameField'
import { PasswordInput } from '~/components/atoms/PasswordInput'

export function RegisterForm({ onSuccess = () => {} }) {
  const passwordId = useId()
  const confirmPasswordId = useId()

  return (
    <CustomForm method="post" action="/auth/register" onSuccess={onSuccess}>
      <h2>Register</h2>
      <details>
        <summary>Password must contain at least...</summary>
        <ul>
          <li>8 characters</li>
          <li>1 lowercase letter</li>
          <li>1 uppercase letter</li>
          <li>1 number</li>
          <li>1 special character</li>
        </ul>
      </details>
      <UsernameField />
      <label htmlFor={passwordId}>Password</label>
      <PasswordInput id={passwordId} strong />
      <label htmlFor={confirmPasswordId}>Confirm Password</label>
      <PasswordInput id={confirmPasswordId} name="confirmPassword" />
    </CustomForm>
  )
}
