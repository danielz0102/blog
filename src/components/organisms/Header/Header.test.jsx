import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '.'

test('renders Header component', () => {
  render(<Header />)

  expect(screen.getByRole('banner')).toBeInTheDocument()
})
