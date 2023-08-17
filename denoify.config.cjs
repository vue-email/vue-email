// @ts-check

/** @type { import('denoify/lib/config/parseParams').DenoifyParams } */
const config = {
  index: 'src/compiler/deno/index.ts',
  includes: ['src/compiler/agnostic/**/*.ts', 'src/compiler/deno/**/*.ts', '!src/compiler/index.txt', '!src/compiler/node/index.txt'],
  out: './dist/tests',
}

module.exports = config
