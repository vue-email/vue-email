import { deepmerge } from './deepmerge'
import { MissingConfigurationOptionError } from './errors'
import type { Options } from './types'

export function createInitConfig(options: Options) {
  const config = deepmerge<Options>(
    {
      dir: options.dir,
      verbose: true,
      input: {
        templates: {
          dir: `${options.dir}/templates`,
        },
      },
    },
    options,
  ) satisfies Options

  return config
}

export function validate(config: Options): void {
  const required: (keyof Options)[] = ['dir'] // Required options.
  const missing = required.filter((r) => !config[r])

  if (missing.length) {
    // At least one required option is missing.
    throw new MissingConfigurationOptionError(missing)
  }
}
