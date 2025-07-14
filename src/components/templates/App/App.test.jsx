import { App } from '@/components/templates/App'
import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet"></div>,
}))

vi.mock('@organisms/Header', () => ({
  Header: () => <div data-testid="header"></div>,
}))

test('renders the header component', () => {
  render(<App />)
  const header = screen.getByTestId('header')
  expect(header).toBeInTheDocument()
})

test('renders the outlet component', () => {
  render(<App />)
  const outlet = screen.getByTestId('outlet')
  expect(outlet).toBeInTheDocument()
})
