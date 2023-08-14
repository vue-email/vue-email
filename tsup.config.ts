import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: [
    'src/index.ts',
    'src/nuxt/module.ts',
    'src/compiler/index.ts',
    'src/nuxt/runtime/server/services/index.ts',
    'src/nuxt/runtime/server/services/useCompiler.ts',
    'src/nuxt/runtime/templates/vue-email.ts',
  ],
  clean: true,
  splitting: false,
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  dts: {
    entry: ['src/index.ts', 'src/nuxt/module.ts', 'src/compiler/index.ts'],
  },
  external: ['#app', '#imports'],
  noExternal: ['node-html-parser', 'jsdom'],
  banner: {
    js: "import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(import.meta.url);",
    // js: `
    // // BANNER START
    // const require = (await import("node:module")).createRequire(import.meta.url);
    // const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
    // const __dirname = (await import("node:path")).dirname(__filename);
    // // BANNER END
    //     `,
  },
})
