import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import MainLayout from './MainLayout'

vi.mock('~/components/Header', () => ({
  Header: () => <div data-testid="header">Header</div>
}))

vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>
}))

test('renders Header and Outlet', () => {
  const { queryByTestId } = render(<MainLayout />)

  expect(queryByTestId('header')).toBeInTheDocument()
  expect(queryByTestId('outlet')).toBeInTheDocument()
})
