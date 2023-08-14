import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: false,
  rollup: {
    emitCJS: true,
  },
  entries: [
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
    {
      builder: 'mkdist',
      input: 'src/nuxt/runtime',
      outDir: 'dist/runtime',
      declaration: true,
    },
  ],
  externals: ['@nuxt/kit', '@nuxt/schema', 'pathe', 'ufo', 'vue-email', 'nuxt', 'vue', 'defu'],
})
