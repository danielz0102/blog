import { useId } from 'react'

import Input from '~/components/atoms/Input'
import FormField from '../FormField'

export function UsernameField() {
  const id = useId()
  return (
    <FormField>
      <label htmlFor={id}>Username</label>
      <Input
        type="text"
        id={id}
        name="username"
        placeholder="@john_doe123"
        required
      />
    </FormField>
  )
}
