import { App } from '@/App'
import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

it('renders the app component', () => {
  render(<App />)
  const heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
})
