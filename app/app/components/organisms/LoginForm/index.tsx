import { CustomForm } from '../CustomForm'
import { PasswordField } from '~/components/molecules/PasswordField'
import { UsernameField } from '~/components/molecules/UsernameField'

export function LoginForm({ onSuccess = () => {} }) {
  return (
    <CustomForm method="post" action="/auth/login" onSuccess={onSuccess}>
      <h2>Login</h2>
      <UsernameField />
      <PasswordField />
    </CustomForm>
  )
}
