/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  test: {
    environment: 'happy-dom',
    include: ['./packages/**/tests/**/*.spec.ts'],
  },
})
