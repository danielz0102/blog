import { defineConfig } from 'eslint/config'
import astro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.strict,

  astro.configs.recommended,
  astro.configs['jsx-a11y-strict'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  {
    ignores: ['.astro/', '.dist/'],
  },
])
