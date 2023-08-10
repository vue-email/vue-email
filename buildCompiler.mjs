import { build } from 'unbuild'

build('.', false, {
  declaration: true,
  outDir: 'compiler',
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  entries: [
    {
      input: 'src/compiler/index.ts',
      outDir: 'compiler',
      name: 'compiler',
      format: 'esm',
      ext: 'js',
    },
    {
      input: 'src/compiler/index.ts',
      outDir: 'compiler',
      name: 'compiler',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', 'vue-email'],
}).catch(console.error)
