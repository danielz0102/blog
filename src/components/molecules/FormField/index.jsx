import { useState, useId } from 'react'

export function FormField({ label, inputAttributes, getErrorMessage }) {
  const [error, setError] = useState('')
  const id = useId()

  function handleInvalid(event) {
    setError(
      getErrorMessage ? getErrorMessage(event) : event.target.validationMessage
    )
  }

  function handleInput() {
    setError('')
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        onInvalid={handleInvalid}
        onInput={handleInput}
        {...inputAttributes}
      />
      <span>{error}</span>
    </div>
  )
}
