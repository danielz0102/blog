import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Header } from '.'
import { UserProvider } from '@providers/UserProvider'

test('renders Header component', () => {
  render(
    <UserProvider>
      <Header />
    </UserProvider>,
  )

  expect(screen.getByRole('banner')).toBeInTheDocument()
})
