import type { Options } from '../types/compiler'

/**
 * Checks if item is an object.
 *
 * @param item
 */
function isObject(item: unknown): boolean {
  return !!item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merges two objects.
 *
 * @param target
 * @param sources
 */

function deepmerge<T extends Record<string, any>>(target: T, ...sources: T[]): T {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepmerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepmerge(target, ...sources)
}

class MissingConfigurationOptionError extends Error {
  constructor(missing: (keyof Options)[]) {
    super(`The following required configuration options are missing: ${missing.join(', ')}`)

    this.name = 'MissingConfiguration'
  }
}

export function createInitConfig(options: Options) {
  const config = deepmerge<Options>(
    {
      dir: options.dir,
      verbose: true,
      options: options.options,
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
