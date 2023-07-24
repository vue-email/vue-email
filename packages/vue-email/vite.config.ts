/// <reference types="vitest" />

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import banner from "vite-plugin-banner";
import Inspect from "vite-plugin-inspect";
import dts from "vite-plugin-dts";
import vueJsx from '@vitejs/plugin-vue-jsx'

import { resolve } from "pathe";

import { lightGreen, gray, bold, blue } from "kolorist";

import pkg from "./package.json";

console.log(
  `${lightGreen("🎉")} ${gray("💌")} ${bold(blue("Vue Email"))} v${pkg.version}`
);

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${
        pkg.description
      }\n * maintainers: ${
        pkg.maintainers
          .map(
            ({ name, email, url }) =>
              `${name} (${email})${url ? ` - ${url}` : ""}`
          )
          .join(", ") || "none"
      }\n */`
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    threads: false
  },
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue-email",
      formats: ['es', 'cjs'],
      fileName: format => {
        return `[name].${format}.js`
      },
    },
    watch: {
      include: [resolve(__dirname, "src")]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        }
      }
    }
  },
});
