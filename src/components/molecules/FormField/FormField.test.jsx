import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormField } from '.'

test('renders input with correct attributes', () => {
  const { getByPlaceholderText } = render(
    <FormField
      label="Test Label"
      inputAttributes={{
        placeholder: 'Enter text here',
        required: true
      }}
    />
  )
  const input = getByPlaceholderText('Enter text here')

  expect(input).toBeInTheDocument()
  expect(input).toBeRequired()
})

test('shows an error message when input is invalid', async () => {
  const user = userEvent.setup()
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  const { getByLabelText, getByRole } = render(
    <form action="" onSubmit={handleSubmit}>
      <FormField
        label="Test Label"
        inputAttributes={{
          placeholder: 'Enter text here',
          required: true,
          pattern: '[a-zA-Z]{3,}'
        }}
        getErrorMessage={() => 'Please match the requested format.'}
      />
      <button type="submit">Submit</button>
    </form>
  )
  const input = getByLabelText('Test Label')
  const span = input.nextElementSibling
  const submitButton = getByRole('button', { name: 'Submit' })

  await user.type(input, 'ab')

  expect(span).toBeInTheDocument()
  expect(span).toHaveTextContent('')

  await user.click(submitButton)

  expect(span).toHaveTextContent('Please match the requested format.')

  await user.clear(input)
  await user.type(input, 'abc')
  await user.click(submitButton)

  expect(span).toHaveTextContent('')
})
