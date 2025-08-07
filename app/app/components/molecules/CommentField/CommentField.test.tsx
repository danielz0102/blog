import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import CommentField from '.'

test('renders a field to write a comment', () => {
  const { getByLabelText } = render(<CommentField />)

  const textarea = getByLabelText(/comment/i)

  expect(textarea).toBeRequired()
  expect(textarea).toHaveAttribute('name', 'comment')
})
