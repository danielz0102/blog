import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@atoms': '/src/components/atoms',
      '@molecules': '/src/components/molecules',
      '@organisms': '/src/components/organisms',
      '@templates': '/src/components/templates',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './tests/setup.js',
  },
})
