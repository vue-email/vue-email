import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  entries: ['src/index.ts', 'src/compiler.ts', 'src/nuxt.ts'],
  externals: ['vue'],
})
