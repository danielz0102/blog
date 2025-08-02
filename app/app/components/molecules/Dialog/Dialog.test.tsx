import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { useRef } from 'react'

import { Dialog } from '.'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDialogElement>(null)

  return <Dialog ref={ref}>{children}</Dialog>
}

test('is hidden by default', () => {
  const { queryByText } = render(<Wrapper>Test Dialog</Wrapper>)

  expect(queryByText('Test Dialog')).not.toBeVisible()
})

test('renders children within a dialog', () => {
  const { queryByText } = render(<Wrapper>Test Dialog</Wrapper>)

  expect(queryByText('Test Dialog')).toBeInTheDocument()
})

test('has a button to close', async () => {
  const { queryByRole } = render(<Wrapper>Test Dialog</Wrapper>)

  expect(
    queryByRole('button', { name: /close/i, hidden: true })
  ).toBeInTheDocument()
})
