import { useNavigation, useActionData } from 'react-router'

import { Form } from 'react-router'
import { FormField } from '@molecules/FormField'

export function AuthForm({ signUp = false }) {
  const navigation = useNavigation()
  const loading = navigation.state === 'submitting'
  const data = useActionData()

  function handleConfirmPasswordInput(event) {
    const $confirmPassword = event.target
    const $password = event.target.form.password

    $confirmPassword.setCustomValidity(
      $password.value !== $confirmPassword.value ? 'Passwords do not match' : ''
    )
  }

  return (
    <Form
      method="post"
      action={`/${signUp ? 'sign-up' : 'login'}`}
      aria-label={`${signUp ? 'Sign Up' : 'Login'} Form`}
    >
      {data?.error && <p>{data.error}</p>}
      <FormField
        label="Username"
        inputAttributes={{
          type: 'text',
          name: 'username',
          placeholder: 'myusername123',
          required: true
        }}
      />
      <FormField
        label="Password"
        inputAttributes={{
          type: 'password',
          name: 'password',
          placeholder: '******',
          required: true,
          pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}',
          title:
            'Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
        }}
        getErrorMessage={(event) => {
          const { validity } = event.target

          if (validity.patternMismatch) {
            return event.target.title
          }

          return event.target.validationMessage
        }}
      />
      {signUp && (
        <FormField
          label="Confirm password"
          inputAttributes={{
            type: 'password',
            name: 'confirmPassword',
            placeholder: '******',
            required: true,
            onInput: handleConfirmPasswordInput
          }}
        />
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  )
}
