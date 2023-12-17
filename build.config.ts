import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      define: {
        'process.env.DEBUG': 'undefined',
        'process.env.JEST_WORKER_ID': '1',
        'process.env.ENGINE': 'stable',
        'process.env.OXIDE': 'undefined',
        '__OXIDE__': 'undefined',
        '__dirname': '"/"',
      },
      supported: {
        'nullish-coalescing': false,
        'optional-chain': false,
      },
    },
  },
  externals: [],
})
