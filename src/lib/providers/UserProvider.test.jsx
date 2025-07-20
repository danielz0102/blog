import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'

import { UserProvider } from '@providers/UserProvider'
import { useContext } from 'react'
import { UserContext } from '@providers/contexts'

const mockResult = {
  user: { username: 'test', id: 1 }
}

vi.mock('@hooks/useUser', () => ({
  useUser: () => mockResult
}))

test('renders children', () => {
  const { getByTestId } = render(
    <UserProvider>
      <div data-testid="test-child">Test Child</div>
    </UserProvider>
  )

  expect(getByTestId('test-child')).toBeInTheDocument()
})

test('provides useUser result as value', () => {
  const Child = () => {
    const result = useContext(UserContext)
    return <div data-testid="test-child">{JSON.stringify(result)}</div>
  }

  const { getByTestId } = render(
    <UserProvider>
      <Child />
    </UserProvider>
  )

  expect(getByTestId('test-child')).toHaveTextContent(
    JSON.stringify(mockResult)
  )
})
