import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      target: 'es2020',
    },
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
      declaration: false,
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
  ],
  externals: [
    'vue',
    'vue/compiler-sfc',
    'vue/server-renderer',
    'vue-email',
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt3',
    'nuxt',
    'vue',
    'defu',
    'html-to-text',
    'pretty',
    'isomorphic-dompurify',
    'node-html-parser',
    'ufo',
    '@vue/compiler-core',
    'tw-to-css',
    'deepmerge',
  ],
})
