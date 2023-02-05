import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslingPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslingPlugin()],
});
