import { CustomForm } from '../CustomForm'
import { UsernameField } from '~/components/molecules/UsernameField'
import { PasswordField } from '~/components/molecules/PasswordField'

export function RegisterForm({ onSuccess = () => {} }) {
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
      <PasswordField strong />
      <PasswordField label="Confirm Password" name="confirmPassword" />
    </CustomForm>
  )
}
