import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { Dialog } from '.'

test('renders children insidea a dialog', () => {
  const { queryByText } = render(<Dialog>Test Dialog</Dialog>)

  expect(queryByText('Test Dialog')).toBeInTheDocument()
})
