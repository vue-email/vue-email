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
      name: 'index',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/index.ts',
      outDir: 'dist',
      name: 'index',
      format: 'cjs',
      ext: 'js',
    }
  ],
  externals: ['vue'],
  dependencies: ['@vue-email/utils', '@flowko/tw-to-css', 'isomorphic-dompurify'],
})
