import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true,
      },
      imports: ['vue'],
    }),
    Components({
      /* options */
    }),
    UnoCSS({
      /* options */
    }),
  ],
  resolve: {
    alias: {
      'vue-email': resolve(__dirname, '../packages/vue-email/src/index.ts')
    }
  }
})
