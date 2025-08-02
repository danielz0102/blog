import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Dialog } from '.'

test('is hidden by default', () => {
  const { queryByText } = render(<Dialog>Test Dialog</Dialog>)

  expect(queryByText('Test Dialog')).not.toBeVisible()
})

test('renders children within a dialog when is open', () => {
  const { queryByText } = render(<Dialog open>Test Dialog</Dialog>)

  expect(queryByText('Test Dialog')).toBeVisible()
})

test('has a button to close', async () => {
  const user = userEvent.setup()
  const { getByRole } = render(<Dialog open>Test Dialog</Dialog>)
  const dialog = getByRole('dialog')
  const button = getByRole('button', { name: /close/i })

  await user.click(button)

  expect(dialog).not.toBeVisible()
})
