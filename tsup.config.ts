import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/compiler/index.ts'],
  clean: true,
  splitting: false,
  format: 'esm',
  target: 'es2022',
  dts: {
    entry: ['src/index.ts', 'src/compiler/index.ts'],
  },
  external: ['#app', '#imports'],
  noExternal: ['node-html-parser'],
})
