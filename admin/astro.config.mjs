import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      API_URL: envField.string({ context: 'server', access: 'public' }),
      TOKEN_SECRET: envField.string({ context: 'server', access: 'secret' }),
      TINYMCE_API_KEY: envField.string({ context: 'client', access: 'public' }),
    },
  },
})
