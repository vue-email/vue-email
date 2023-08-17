import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  entries: [
    // Plugin
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
      ext: 'cjs',
    },
    // Nuxt
    {
      input: 'src/nuxt/module.ts',
      outDir: 'dist',
      name: 'nuxt',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/nuxt/module.ts',
      outDir: 'dist',
      name: 'nuxt',
      format: 'cjs',
      ext: 'cjs',
    },
    // Copy runtime folder with mkdist
    {
      builder: 'mkdist',
      input: 'src/nuxt/runtime',
      outDir: 'dist/runtime',
      declaration: true,
    },
    // Compiler
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
    // Node Compiler
    {
      input: 'src/compiler/node/index.ts',
      outDir: 'dist',
      name: 'compiler.node',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/compiler/node/index.ts',
      outDir: 'dist',
      name: 'compiler.node',
      format: 'cjs',
      ext: 'cjs',
    },
    // Deno Compiler
    {
      input: 'src/compiler/deno/index.ts',
      outDir: 'dist',
      name: 'compiler.deno',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/compiler/deno/index.ts',
      outDir: 'dist',
      name: 'compiler.deno',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', '@nuxt/kit', '@nuxt/schema', 'vue-email'],
})
