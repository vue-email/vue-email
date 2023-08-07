import { deepmerge } from './deepmerge'
import { MissingConfigurationOptionError } from './errors'
import type { Options } from './types'

export function createInitConfig(options: Options) {
  const config = deepmerge<Options>(
    {
      dir: options.dir,
      verbose: false,
      input: {
        templates: {
          dir: `${options.dir}/templates`,
        },
      },
      output: {
        auto: true,
        dir: `${options.dir}/.vuemail`,
      },
    },
    options,
  ) as Options

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
