/// <reference types="vitest" />
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'

import { resolve } from 'pathe'

import { blue, bold, gray, lightGreen } from 'kolorist'

import pkg from './package.json'

console.warn(`${lightGreen('🎉')} ${gray('💌')} ${bold(blue('Vue Email'))} v${pkg.version}`)

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * maintainers: ${
        pkg.maintainers.map(({ name, email, url }) => `${name} (${email})${url ? ` - ${url}` : ''}`).join(', ') || 'none'
      }\n */`,
    }),
  ],
  resolve: {
    alias: {
      $src: resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['./tests/**/*.spec.ts'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-email',
      fileName: 'vue-email',
    },
    watch: {
      include: [resolve(__dirname, 'src')],
    },
    rollupOptions: {
      external: ['vue', 'html-to-text', 'pretty', 'isomorphic-dompurify', 'node-html-parser'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
