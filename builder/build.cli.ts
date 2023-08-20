#!/usr/bin/env node

/* eslint-disable n/prefer-global/process */
import { build } from 'unbuild'
import { defineCommand, runMain } from 'citty'
import consola from 'consola'
import { resolve } from 'pathe'
import pkg from '../package.json' assert { type: 'json' }
import { config } from '../builder.config'

const { name, version, description } = pkg

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    name: {
      type: 'string',
      description: 'The name of the build',
      required: true,
    },
    dir: {
      type: 'positional',
      description: 'The directory to build',
      required: false,
    },
    stub: {
      type: 'boolean',
      description: 'Stub build',
    },
    minify: {
      type: 'boolean',
      description: 'Minify build',
    },
    sourcemap: {
      type: 'boolean',
      description: 'Generate sourcemaps (experimental)',
    },
  },
  async run({ args }) {
    const rootDir = resolve(process.cwd(), args.dir || '.')
    const filteredConfig = (args.name && config.filter((c) => c.name === args.name)) || config

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(filteredConfig, null, 2))

    if (filteredConfig.length === 0) {
      consola.error(`No build config found for ${args.name}`)
      return
    }

    try {
      const builds = filteredConfig.map((c) => {
        return build(rootDir, args.stub, {
          sourcemap: args.sourcemap,
          rollup: {
            esbuild: {
              minify: args.minify,
            },
          },
          ...c,
        })
      })
      await Promise.all(builds)
    } catch (error) {
      consola.error(`Error building ${rootDir}: ${error}`)
      throw error
    }
  },
})

export default config

runMain(main)
