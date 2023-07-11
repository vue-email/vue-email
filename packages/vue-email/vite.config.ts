/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue-email",
      formats: ["es", "cjs"],
      fileName: (format) => {
        return `[name].${format}.js`;
      },
    },
    rollupOptions: {
      // preserveModules: true,
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
});
