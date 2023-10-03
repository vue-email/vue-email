import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  entries: [
    {
      input: 'src/index.ts',
      outDir: 'dist',
    },
  ],
  externals: ['vue'],
})
