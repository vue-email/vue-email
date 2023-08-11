import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  entries: [
    {
      input: 'src/compiler/index.ts',
      outDir: 'dist',
      name: 'compiler',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/compiler/index.ts',
      outDir: 'dist',
      name: 'compiler',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', 'vue-email'],
})
