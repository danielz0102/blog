import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import netlify from '@astrojs/netlify'

export default defineConfig({
  output: 'server',
  integrations: [react()],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      API_URL: envField.string({ context: 'server', access: 'public' }),
      TOKEN_SECRET: envField.string({ context: 'server', access: 'secret' }),
      TINYMCE_API_KEY: envField.string({ context: 'client', access: 'public' })
    }
  }
})
