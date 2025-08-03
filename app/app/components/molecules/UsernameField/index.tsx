import { useId } from 'react'

export function UsernameField() {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>Username</label>
      <input
        id={id}
        type="text"
        name="username"
        placeholder="@john_doe123"
        required
      />
    </>
  )
}
