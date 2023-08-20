import { defineBuildConfig } from 'unbuild'

export const config = defineBuildConfig([
  {
    name: 'main',
    declaration: true,
    clean: true,
    failOnWarn: false,
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
      },
      {
        input: 'src/compiler/deno/index.ts',
        outDir: 'dist',
        name: 'compiler.deno',
        format: 'esm',
        ext: 'ts',
      },
    ],
    externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', '@nuxt/kit', '@nuxt/schema', 'vue-email', '@swc/core'],
  },
  {
    name: 'deno-test',
    clean: true,
    declaration: true,
    rollup: {
      inlineDependencies: true,
    },
    failOnWarn: false,
    entries: [
      {
        input: 'src/compiler/deno/index.ts',
        outDir: 'dist',
        name: 'compiler.deno',
        format: 'esm',
        ext: 'ts',
      },
    ],
    externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', '@nuxt/kit', '@nuxt/schema', 'vue-email', '@swc/core'],
  },
])
