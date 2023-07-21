// vite.config.ts
import { defineConfig } from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/vite@4.4.4_@types+node@20.2.3/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.4_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import banner from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/vite-plugin-banner@0.7.0/node_modules/vite-plugin-banner/dist/index.mjs";
import Inspect from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/vite-plugin-inspect@0.7.33_vite@4.4.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import dts from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/vite-plugin-dts@3.3.1_@types+node@20.2.3_typescript@5.0.4_vite@4.4.4/node_modules/vite-plugin-dts/dist/index.mjs";
import copy from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/rollup-plugin-copy@3.4.0/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { resolve } from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import { lightGreen, gray, bold, blue } from "file:///C:/Users/youne/Documents/coding/projects/vue-email/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";

// package.json
var package_default = {
  name: "vue-email",
  version: "0.5.0",
  description: "\u{1F48C} Write email templates with Vue",
  author: "David Arenas <davejs136@gmail.com> (https://github.com/Dave136/)",
  keywords: [
    "vue",
    "vue 3",
    "email",
    "components",
    "html",
    "template"
  ],
  maintainers: [
    {
      name: "Dave136",
      email: "davejs136@gmail.com",
      url: "https://github.com/Dave136"
    },
    {
      name: "Flowko",
      email: "younesbarraddev@gmail.com",
      url: "https://github.com/Flowko"
    }
  ],
  packageManager: "pnpm@8.6.7",
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/vue-email.js",
      require: "./dist/vue-email.umd.cjs"
    },
    "./components": {
      types: "./dist/components/index.d.ts"
    },
    "./composables": {
      types: "./dist/composables/index.d.ts"
    },
    "./types": {
      types: "./dist/types/index.d.ts"
    },
    "./utils": {
      types: "./dist/utils/index.d.ts"
    },
    "./*": "./*"
  },
  type: "module",
  main: "./dist/vue-email.umd.cjs",
  module: "./dist/vue-email.js",
  types: "./dist/index.d.ts",
  files: [
    "dist/**"
  ],
  sideEffects: false,
  publishConfig: {
    access: "public"
  },
  scripts: {
    dev: "vite build --watch",
    build: "vite build",
    test: "vitest",
    "test:ci": "vitest run",
    "test:ui": "vitest --ui",
    release: "release-it",
    coverage: "vitest run --coverage",
    lint: "eslint . --ext .js,.jsx,.ts,.tsx,.vue"
  },
  peerDependencies: {
    "@nuxt/kit": "^3.6.3",
    vue: "^3.3.4"
  },
  peerDependenciesMeta: {
    "@nuxt/kit": {
      optional: true
    }
  },
  devDependencies: {
    "@release-it/conventional-changelog": "^7.0.0",
    "@types/html-to-text": "^9.0.1",
    "@types/node": "^20",
    "@types/pretty": "^2.0.1",
    "@typescript-eslint/eslint-plugin": "^6.1.0",
    "@typescript-eslint/parser": "^6.1.0",
    "@vitest/coverage-c8": "^0.33.0",
    "@vitest/ui": "^0.33.0",
    "@vue/test-utils": "^2.4.0",
    eslint: "^8.45.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-vue": "^9.15.1",
    "html-to-text": "^9.0.5",
    "isomorphic-dompurify": "^1.8.0",
    jsdom: "^22.1.0",
    pretty: "^2.0.0",
    "release-it": "^16.1.3",
    "rollup-plugin-analyzer": "^4.0.0",
    "rollup-plugin-copy": "^3.4.0",
    "rollup-plugin-visualizer": "^5.9.2",
    "tw-to-css": "^0.0.11",
    vite: "^4.4.4",
    "vite-plugin-banner": "^0.7.0",
    "vite-plugin-dts": "3.3.1",
    "vite-plugin-inspect": "^0.7.33",
    "vite-plugin-require-transform": "^1.0.21",
    vitest: "^0.33.0",
    vue: "^3.3.4"
  },
  bugs: {
    url: "https://github.com/Dave136/vue-email/issues"
  },
  homepage: "https://vue-email.vercel.app/",
  license: "MIT",
  repository: {
    type: "git",
    url: "git+https://github.com/Dave136/vue-email.git"
  },
  dependencies: {
    "@iconify/vue": "^4.1.1"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\youne\\Documents\\coding\\projects\\vue-email\\packages\\vue-email";
console.log(
  `${lightGreen("\u{1F389}")} ${gray("\u{1F48C}")} ${bold(blue("Vue Email"))} v${package_default.version}`
);
var vite_config_default = defineConfig({
  plugins: [
    vue({
      isProduction: false
    }),
    dts({
      insertTypesEntry: true
    }),
    banner({
      content: `/**
 * name: ${package_default.name}
 * version: v${package_default.version}
 * (c) ${(/* @__PURE__ */ new Date()).getFullYear()}
 * description: ${package_default.description}
 * maintainers: ${package_default.maintainers.map(
        ({ name, email, url }) => `${name} (${email})${url ? ` - ${url}` : ""}`
      ).join(", ") || "none"}
 */`
    }),
    Inspect()
  ],
  test: {
    environment: "jsdom",
    globals: true,
    threads: false
  },
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "vue-email",
      fileName: "vue-email"
    },
    watch: {
      include: [resolve(__vite_injected_original_dirname, "src")]
    },
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: "./nuxt.mjs", dest: "./dist/" }
          ]
        })
      ],
      external: ["vue", "isomorphic-dompurify", "html-to-text", "pretty"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "isomorphic-dompurify": "isomorphic-dompurify",
          "html-to-text": "html-to-text",
          "pretty": "pretty"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceW91bmVcXFxcRG9jdW1lbnRzXFxcXGNvZGluZ1xcXFxwcm9qZWN0c1xcXFx2dWUtZW1haWxcXFxccGFja2FnZXNcXFxcdnVlLWVtYWlsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5b3VuZVxcXFxEb2N1bWVudHNcXFxcY29kaW5nXFxcXHByb2plY3RzXFxcXHZ1ZS1lbWFpbFxcXFxwYWNrYWdlc1xcXFx2dWUtZW1haWxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3lvdW5lL0RvY3VtZW50cy9jb2RpbmcvcHJvamVjdHMvdnVlLWVtYWlsL3BhY2thZ2VzL3Z1ZS1lbWFpbC92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IGJhbm5lciBmcm9tIFwidml0ZS1wbHVnaW4tYmFubmVyXCI7XHJcbmltcG9ydCBJbnNwZWN0IGZyb20gXCJ2aXRlLXBsdWdpbi1pbnNwZWN0XCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5cclxuaW1wb3J0IGNvcHkgZnJvbSBcInJvbGx1cC1wbHVnaW4tY29weVwiO1xyXG5cclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoZVwiO1xyXG5cclxuaW1wb3J0IHsgbGlnaHRHcmVlbiwgZ3JheSwgYm9sZCwgYmx1ZSB9IGZyb20gXCJrb2xvcmlzdFwiO1xyXG5cclxuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbmNvbnNvbGUubG9nKFxyXG4gIGAke2xpZ2h0R3JlZW4oXCJcdUQ4M0NcdURGODlcIil9ICR7Z3JheShcIlx1RDgzRFx1REM4Q1wiKX0gJHtib2xkKGJsdWUoXCJWdWUgRW1haWxcIikpfSB2JHtwa2cudmVyc2lvbn1gXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIGlzUHJvZHVjdGlvbjogZmFsc2VcclxuICAgIH0pLFxyXG4gICAgZHRzKHtcclxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgYmFubmVyKHtcclxuICAgICAgY29udGVudDogYC8qKlxcbiAqIG5hbWU6ICR7cGtnLm5hbWV9XFxuICogdmVyc2lvbjogdiR7XHJcbiAgICAgICAgcGtnLnZlcnNpb25cclxuICAgICAgfVxcbiAqIChjKSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1cXG4gKiBkZXNjcmlwdGlvbjogJHtcclxuICAgICAgICBwa2cuZGVzY3JpcHRpb25cclxuICAgICAgfVxcbiAqIG1haW50YWluZXJzOiAke1xyXG4gICAgICAgIHBrZy5tYWludGFpbmVyc1xyXG4gICAgICAgICAgLm1hcChcclxuICAgICAgICAgICAgKHsgbmFtZSwgZW1haWwsIHVybCB9KSA9PlxyXG4gICAgICAgICAgICAgIGAke25hbWV9ICgke2VtYWlsfSkke3VybCA/IGAgLSAke3VybH1gIDogXCJcIn1gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAuam9pbihcIiwgXCIpIHx8IFwibm9uZVwiXHJcbiAgICAgIH1cXG4gKi9gXHJcbiAgICB9KSxcclxuICAgIEluc3BlY3QoKVxyXG4gIF0sXHJcbiAgdGVzdDoge1xyXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcclxuICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICB0aHJlYWRzOiBmYWxzZVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzbmV4dCcsXHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcclxuICAgICAgbmFtZTogXCJ2dWUtZW1haWxcIixcclxuICAgICAgZmlsZU5hbWU6IFwidnVlLWVtYWlsXCJcclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBpbmNsdWRlOiBbcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpXVxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIGNvcHkoe1xyXG4gICAgICAgICAgdGFyZ2V0czogW1xyXG4gICAgICAgICAgICB7IHNyYzogXCIuL251eHQubWpzXCIsIGRlc3Q6IFwiLi9kaXN0L1wiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICBdLFxyXG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwiaXNvbW9ycGhpYy1kb21wdXJpZnlcIiwgJ2h0bWwtdG8tdGV4dCcsICdwcmV0dHknXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLFxyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIHZ1ZTogXCJWdWVcIixcclxuICAgICAgICAgIFwiaXNvbW9ycGhpYy1kb21wdXJpZnlcIjogXCJpc29tb3JwaGljLWRvbXB1cmlmeVwiLFxyXG4gICAgICAgICAgJ2h0bWwtdG8tdGV4dCc6ICdodG1sLXRvLXRleHQnLFxyXG4gICAgICAgICAgJ3ByZXR0eSc6ICdwcmV0dHknXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbiIsICJ7XG4gIFwibmFtZVwiOiBcInZ1ZS1lbWFpbFwiLFxuICBcInZlcnNpb25cIjogXCIwLjUuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiXHVEODNEXHVEQzhDIFdyaXRlIGVtYWlsIHRlbXBsYXRlcyB3aXRoIFZ1ZVwiLFxuICBcImF1dGhvclwiOiBcIkRhdmlkIEFyZW5hcyA8ZGF2ZWpzMTM2QGdtYWlsLmNvbT4gKGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZlMTM2LylcIixcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ2dWVcIixcbiAgICBcInZ1ZSAzXCIsXG4gICAgXCJlbWFpbFwiLFxuICAgIFwiY29tcG9uZW50c1wiLFxuICAgIFwiaHRtbFwiLFxuICAgIFwidGVtcGxhdGVcIlxuICBdLFxuICBcIm1haW50YWluZXJzXCI6IFtcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJEYXZlMTM2XCIsXG4gICAgICBcImVtYWlsXCI6IFwiZGF2ZWpzMTM2QGdtYWlsLmNvbVwiLFxuICAgICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vRGF2ZTEzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJGbG93a29cIixcbiAgICAgIFwiZW1haWxcIjogXCJ5b3VuZXNiYXJyYWRkZXZAZ21haWwuY29tXCIsXG4gICAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9GbG93a29cIlxuICAgIH1cbiAgXSxcbiAgXCJwYWNrYWdlTWFuYWdlclwiOiBcInBucG1AOC42LjdcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC92dWUtZW1haWwuanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC92dWUtZW1haWwudW1kLmNqc1wiXG4gICAgfSxcbiAgICBcIi4vY29tcG9uZW50c1wiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L2NvbXBvbmVudHMvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vY29tcG9zYWJsZXNcIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9jb21wb3NhYmxlcy9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi90eXBlc1wiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3R5cGVzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL3V0aWxzXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvdXRpbHMvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vKlwiOiBcIi4vKlwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcIm1haW5cIjogXCIuL2Rpc3QvdnVlLWVtYWlsLnVtZC5janNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvdnVlLWVtYWlsLmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3QvKipcIlxuICBdLFxuICBcInNpZGVFZmZlY3RzXCI6IGZhbHNlLFxuICBcInB1Ymxpc2hDb25maWdcIjoge1xuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGUgYnVpbGQgLS13YXRjaFwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJ0ZXN0XCI6IFwidml0ZXN0XCIsXG4gICAgXCJ0ZXN0OmNpXCI6IFwidml0ZXN0IHJ1blwiLFxuICAgIFwidGVzdDp1aVwiOiBcInZpdGVzdCAtLXVpXCIsXG4gICAgXCJyZWxlYXNlXCI6IFwicmVsZWFzZS1pdFwiLFxuICAgIFwiY292ZXJhZ2VcIjogXCJ2aXRlc3QgcnVuIC0tY292ZXJhZ2VcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWV4dCAuanMsLmpzeCwudHMsLnRzeCwudnVlXCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBudXh0L2tpdFwiOiBcIl4zLjYuM1wiLFxuICAgIFwidnVlXCI6IFwiXjMuMy40XCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzTWV0YVwiOiB7XG4gICAgXCJAbnV4dC9raXRcIjoge1xuICAgICAgXCJvcHRpb25hbFwiOiB0cnVlXG4gICAgfVxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmVsZWFzZS1pdC9jb252ZW50aW9uYWwtY2hhbmdlbG9nXCI6IFwiXjcuMC4wXCIsXG4gICAgXCJAdHlwZXMvaHRtbC10by10ZXh0XCI6IFwiXjkuMC4xXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMFwiLFxuICAgIFwiQHR5cGVzL3ByZXR0eVwiOiBcIl4yLjAuMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4xLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNi4xLjBcIixcbiAgICBcIkB2aXRlc3QvY292ZXJhZ2UtYzhcIjogXCJeMC4zMy4wXCIsXG4gICAgXCJAdml0ZXN0L3VpXCI6IFwiXjAuMzMuMFwiLFxuICAgIFwiQHZ1ZS90ZXN0LXV0aWxzXCI6IFwiXjIuNC4wXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC40NS4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguOC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIl45LjE1LjFcIixcbiAgICBcImh0bWwtdG8tdGV4dFwiOiBcIl45LjAuNVwiLFxuICAgIFwiaXNvbW9ycGhpYy1kb21wdXJpZnlcIjogXCJeMS44LjBcIixcbiAgICBcImpzZG9tXCI6IFwiXjIyLjEuMFwiLFxuICAgIFwicHJldHR5XCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyZWxlYXNlLWl0XCI6IFwiXjE2LjEuM1wiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1hbmFseXplclwiOiBcIl40LjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1jb3B5XCI6IFwiXjMuNC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS45LjJcIixcbiAgICBcInR3LXRvLWNzc1wiOiBcIl4wLjAuMTFcIixcbiAgICBcInZpdGVcIjogXCJeNC40LjRcIixcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiMy4zLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWluc3BlY3RcIjogXCJeMC43LjMzXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1yZXF1aXJlLXRyYW5zZm9ybVwiOiBcIl4xLjAuMjFcIixcbiAgICBcInZpdGVzdFwiOiBcIl4wLjMzLjBcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjMuNFwiXG4gIH0sXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vRGF2ZTEzNi92dWUtZW1haWwvaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vdnVlLWVtYWlsLnZlcmNlbC5hcHAvXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9EYXZlMTM2L3Z1ZS1lbWFpbC5naXRcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAaWNvbmlmeS92dWVcIjogXCJeNC4xLjFcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBRWhCLE9BQU8sVUFBVTtBQUVqQixTQUFTLGVBQWU7QUFFeEIsU0FBUyxZQUFZLE1BQU0sTUFBTSxZQUFZOzs7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QUMsQ0FBQyxLQUFLLGdCQUFJLE9BQU87QUFDOUU7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFdBQWlCLGdCQUFJLElBQUk7QUFBQSxlQUNoQyxnQkFBSSxPQUNOO0FBQUEsVUFBWSxvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDO0FBQUEsa0JBQ2xDLGdCQUFJLFdBQ047QUFBQSxrQkFDRSxnQkFBSSxZQUNEO0FBQUEsUUFDQyxDQUFDLEVBQUUsTUFBTSxPQUFPLElBQUksTUFDbEIsR0FBRyxJQUFJLEtBQUssS0FBSyxJQUFJLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFBRTtBQUFBLE1BQy9DLEVBQ0MsS0FBSyxJQUFJLEtBQUssTUFDbkI7QUFBQTtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsUUFBUSxrQ0FBVyxLQUFLLENBQUM7QUFBQSxJQUNyQztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1AsS0FBSztBQUFBLFVBQ0gsU0FBUztBQUFBLFlBQ1AsRUFBRSxLQUFLLGNBQWMsTUFBTSxVQUFVO0FBQUEsVUFDdkM7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxVQUFVLENBQUMsT0FBTyx3QkFBd0IsZ0JBQWdCLFFBQVE7QUFBQSxNQUNsRSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCx3QkFBd0I7QUFBQSxVQUN4QixnQkFBZ0I7QUFBQSxVQUNoQixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
