/// <reference types="vitest" />

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import banner from "vite-plugin-banner";
import Inspect from "vite-plugin-inspect";
import dts from "vite-plugin-dts";

import copy from "rollup-plugin-copy";

/* import analyze from 'rollup-plugin-analyzer'
 */ /* import { visualizer } from 'rollup-plugin-visualizer' */
import { resolve } from "pathe";

import { lightGreen, gray, bold, blue } from "kolorist";

import pkg from "./package.json";

// eslint-disable-next-line no-console
console.log(
  `${lightGreen("🎉")} ${gray("💌")} ${bold(blue("Vue Email"))} v${pkg.version}`
);
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174
  },
  plugins: [
    vue({
      isProduction: false
    }),
    dts({
      insertTypesEntry: true
    }),
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
    Inspect()
  ],
  test: {
    environment: "jsdom",
    globals: true,
    threads: false
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue-email",
      fileName: "vue-email"
    },
    watch: {
      include: [resolve(__dirname, "src")]
    },
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: "src/types/vue-email-components.d.ts", dest: "dist/types" }
          ]
        })
        /*   analyze(), */
        /*    visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }), */
      ],

      external: ["vue", "isomorphic-dompurify"],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          "isomorphic-dompurify": "isomorphic-dompurify"
          // '@vueuse/core': 'VueUseCore',
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["vue"]
  }
});
