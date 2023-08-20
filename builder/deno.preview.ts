import build from 'https://esm.sh/v131/build'
import { dirname, fromFileUrl, join, resolve } from 'https://deno.land/std@0.177.0/path/mod.ts'
import { createGraph } from 'https://deno.land/x/deno_graph@0.52.0/mod.ts'

const verbose = Deno.args.includes('--verbose')

function verboseLog(...args: unknown[]) {
  if (verbose) {
    console.log(...args)
  }
}

const __filename = fromFileUrl(import.meta.url)
const __dirname = resolve(dirname(__filename))

const relativeModule = '../dist/compiler.deno.mjs'
const relativeTypes = '../dist/compiler.deno.d.ts'
const absoluteModule = join(__dirname, relativeModule)
const absoluteTypes = join(__dirname, relativeTypes)

const code = await Deno.readTextFile(absoluteModule)
const types = await Deno.readTextFile(absoluteTypes)

verboseLog('Building preview...')

const { url } = await build({
  types,
  code,
})

const graph = await createGraph(url)

verboseLog('Import graph: ')
await new Promise((resolve) => setTimeout(resolve, 1000))
verboseLog(graph)

verboseLog('Snapshot: ', url)

await Deno.writeTextFile(
  join(__dirname, '../dist/compiler.deno.preview.ts'),
  `
export * from '${url}'
`,
)

verboseLog('Local: ', join(__dirname, './compiler.deno.ts'))

verboseLog('ALL DONE.')
