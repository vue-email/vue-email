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
      name: 'compiler',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/index.ts',
      outDir: 'dist',
      name: 'compiler',
      format: 'cjs',
      ext: 'js',
    },
  ],
  dependencies: ['esbuild'],
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', 'vue-email', 'vue-i18n'],
})
