import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  entries: ['src/index.ts', 'src/compiler.ts'],
  externals: ['vue'],
})
