import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

import { URLSearchParams } from 'node:url'

expect.extend(matchers)

// Replacing JSDOM implementation to avoid issues with React Router
// https://github.com/vitest-dev/vitest/issues/7906
globalThis.URLSearchParams =
  URLSearchParams as typeof globalThis.URLSearchParams

afterEach(() => {
  cleanup()
})
