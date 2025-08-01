import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const isTestEnv = process.env.VITEST

export default defineConfig({
  // React Router is not designed to work with Vitest
  // https://github.com/remix-run/react-router/discussions/12655
  plugins: [tailwindcss(), !isTestEnv && reactRouter(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  }
})
