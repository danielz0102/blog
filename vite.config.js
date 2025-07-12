import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@atoms': '/src/components/atoms',
      '@molecules': '/src/components/molecules',
      '@organisms': '/src/components/organisms',
      '@templates': '/src/components/templates',
      '@hooks': '/src/lib/hooks',
      '@services': '/src/services',
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
