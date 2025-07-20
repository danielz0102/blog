import { useNavigation } from 'react-router'
import { useActionData } from 'react-router'

import { Form } from 'react-router'
import { FormField } from '@molecules/FormField'

export function Login() {
  const navigation = useNavigation()
  const data = useActionData()
  const loading = navigation.state === 'submitting'

  return (
    <Form method="post" aria-label="Login Form">
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
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </Form>
  )
}
