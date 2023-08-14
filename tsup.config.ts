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
  format: 'esm',
  target: 'es2022',
  dts: {
    entry: ['src/index.ts', 'src/nuxt/module.ts', 'src/compiler/index.ts'],
  },
  external: ['#app', '#imports'],
  noExternal: ['node-html-parser'],
})
