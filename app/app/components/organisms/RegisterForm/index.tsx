import { CustomForm } from '../CustomForm'
import { UsernameField } from '~/components/molecules/UsernameField'
import { PasswordField } from '~/components/molecules/PasswordField'

export function RegisterForm({ onSuccess = () => {} }) {
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const form = event.target.form

    if (!form) {
      throw new Error('Form not found')
    }

    const confirmPassword = event.target
    const passwordField = form.querySelector<HTMLInputElement>(
      'input[name="password"]'
    )

    if (!passwordField) {
      throw new Error('Password field not found')
    }

    confirmPassword.setCustomValidity(
      confirmPassword.value !== passwordField.value
        ? 'Passwords do not match'
        : ''
    )
  }

  return (
    <CustomForm method="post" action="/auth/register" onSuccess={onSuccess}>
      <h2 className="text-3xl font-medium">Register</h2>
      <details className="rounded p-2 text-zinc-400">
        <summary>Password must contain at least...</summary>
        <ul className="list-disc pl-5">
          <li>8 characters</li>
          <li>1 lowercase letter</li>
          <li>1 uppercase letter</li>
          <li>1 number</li>
          <li>1 special character</li>
        </ul>
      </details>
      <UsernameField />
      <PasswordField strong />
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        onChange={handleConfirmPasswordChange}
      />
    </CustomForm>
  )
}
